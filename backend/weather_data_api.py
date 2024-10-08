import openmeteo_requests
import datetime
from datetime import datetime as dt

import requests_cache
from retry_requests import retry
import pandas as pd

from os import listdir, remove
from os.path import isfile, join

import bisect

place_list = []
download_path = "downloads/"

LOW_VIS_THRESH = 1000
MED_VIS_THRESH = 5000

DAY = 60 * 60 * 24
THREE_DAYS = 60 * 60 * 24 * 3

HOURLY_PARAMS = ["precipitation_probability", "weather_code", "visibility", "wind_speed_180m", "wind_direction_180m",
                 "temperature_180m"]
HOURLY_PARAMS_INDICES = [2, 6]
DATA_LOOKUP = ["hours"] + HOURLY_PARAMS


def convert_time(t):
    # format time as 12-hour time
    now = dt.now()
    t = (int(t) + now.hour) % 24
    suffix = " AM" if t < 12 else " PM"
    minus = 12 if t > 12 else 0
    ret = ""
    if t == 0:
        ret = "12:00"
    else:
        ret = f"{t - minus}:00"
    return ret + suffix


def convert_visibility(vis):
    # categorise visibility as low, medium, high
    if vis < LOW_VIS_THRESH:
        return "Low"
    if vis < MED_VIS_THRESH:
        return "Medium"
    return "High"


def convert_direction(direction):
    # convert angle to compass direction
    i = int((int(direction) % 360) / 22.5 + 0.5)
    lookup = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
    return lookup[i]


class _Place:
    def __init__(self, csvline):
        self.name, lt, lg = csvline.split(",")
        self.lat = float(lt)
        self.long = float(lg)
        self.hourly_weather = None

    def __eq__(self, string):
        return string == self.name

    def __lt__(self, other):
        if type(other) is _Place:
            return self.name < other.name
        return self.name < other

    def __repr__(self):
        return self.name

    def __str__(self):
        return self.name

    def get_filename(self):
        return f"{self.name.replace(' ', '_')}_weather_data.txt"

    def download(self):
        with open(download_path + self.get_filename(), "w") as file:
            file.write(','.join(DATA_LOOKUP) + "\n")
            for i in range(len(self.hourly_weather[0])):
                file.write(','.join([str(self.hourly_weather[j][i]) for j in range(len(DATA_LOOKUP))]) + "\n")

    def load_weather_from_file(self):
        with open(download_path + self.get_filename()) as file:
            lines = file.read().split("\n")[1:]
        data = [[] for _ in range(len(DATA_LOOKUP))]
        for line in lines:
            for i, d in enumerate(line.split(",")):
                if d == '':
                    break
                data[i].append(float(d))
        self.hourly_weather = data


def get_api_data(name):
    place = get_place(name)
    cache_session = requests_cache.CachedSession('.cache', expire_after=3600)
    retry_session = retry(cache_session, retries=5, backoff_factor=0.2)
    openmeteo = openmeteo_requests.Client(session=retry_session)

    # Make sure all required weather variables are listed here
    # The order of variables in hourly or daily is important to assign them correctly below
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": place.lat,
        "longitude": place.long,
        "hourly": HOURLY_PARAMS,
        "timezone": "Europe/London",
        "past_days": 5
    }
    responses = openmeteo.weather_api(url, params=params)

    # Process first location. Add a for-loop for multiple locations or weather models
    response = responses[0]

    # Process hourly data. The order of variables needs to be the same as requested.
    hourly = response.Hourly()
    hours = [i for i in range(hourly.Time(), hourly.TimeEnd(), hourly.Interval())]
    place.hourly_weather = [hours] + [hourly.Variables(i).ValuesAsNumpy() for i in range(6)]


def load_file(filename):
    with open(filename) as file:
        lines = file.read().split("\n")[1:]
    return [_Place(line) for line in lines]


def on_load():
    global place_list
    place_list = load_file("climbing_spots.csv")
    onlyfiles = set([f for f in listdir(download_path) if isfile(join(download_path, f))])
    # print(onlyfiles)
    now = datetime.datetime.now().timestamp()
    for place in place_list:
        fname = place.get_filename()
        if fname in onlyfiles:
            place.load_weather_from_file()
            min_diff = float("inf")
            for ut in place.hourly_weather[0]:
                min_diff = min(abs(now - ut), min_diff)
            if min_diff > THREE_DAYS:
                remove(place.get_filename())
                place.hourly_weather = None
    place_list.sort()


def get_place(name):
    index = bisect.bisect_left(place_list, name)
    if index < 0 or index >= len(place_list):
        return "error getting place name"
    place = place_list[bisect.bisect_left(place_list, name)]
    if place.name != name:
        return "error getting place name"
    return place


def get_formatted_hourly_weather(name, day_offset):
    if name is None: name = "Ben Nevis"
    place = get_place(name)
    if place.hourly_weather is None:
        get_api_data(place)
    today = datetime.datetime.now().day + day_offset

    hours_today = []
    for i in range(len(place.hourly_weather[0])):
        ts = datetime.datetime.fromtimestamp(place.hourly_weather[0][i])
        day = ts.day
        if day == today:
            data = {}
            data["time"] = ts.hour
            for j,param in enumerate(HOURLY_PARAMS):
                data[param] = place.hourly_weather[j+1][i]
            hours_today.append(data)
    for dic in hours_today:
        dic["time"] = convert_time(dic["time"])
    # time, and then hourly_params
    df = pd.DataFrame(hours_today)
    hours_today_json = df.to_json(orient='records')
    hours_today_obj = pd.read_json(hours_today_json, orient='records').to_dict(orient='records')
    return hours_today_obj


def get_current_weather(name, day_offset):
    if name is None: name = "Ben Nevis"  # if no name passed in default to Ben Nevis
    # returns the data for current weather for frontend
    # dictionary with hourly_params as keys
    place = get_place(name)
    if place.hourly_weather is None:
        get_api_data(place)
    now_hour = datetime.datetime.now().hour
    today = datetime.datetime.now().day + day_offset
    for i in range(len(place.hourly_weather[0])):
        ts = datetime.datetime.fromtimestamp(place.hourly_weather[0][i])
        hour = ts.hour
        day = ts.day
        if hour == now_hour and day == today:
            data = {}
            for j,param in enumerate(HOURLY_PARAMS):
                data[param] = place.hourly_weather[j+1][i]
            # just hourly params as keys
            data["visibility"] = convert_visibility(data["visibility"])
            data["wind_direction_180m"] = convert_direction(data["wind_direction_180m"])
            df = pd.DataFrame([data])
            current_json = df.to_json(orient='records')
            current_obj = pd.read_json(current_json, orient='records').to_dict(orient='records')
            return current_obj[0]
    print("error getting current weather")


def download_from_name(name):
    place = get_place(name)
    place.download()


if __name__ == "__main__":
    on_load()
    # bn = None
    # print(len(place_list))
    # for p in place_list:
    #     if p.name.lower() == "ben nevis":
    #         bn = p
    #         break
    # a = get_formatted_hourly_weather("Ben Nevis")
    # c = get_current_weather("Ben Nevis", 0)
    # b = get_current_weather("Ben Nevis", 1)
    # print(c)
    # print(b)
    # get_api_data("Ben Nevis")
    # download_from_name('Ben Nevis')
    print('done')

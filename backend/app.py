from flask import Flask, jsonify, request
from flask_cors import CORS
import weather_data_api

app = Flask(__name__)
CORS(app)

@app.route('/api/data', methods=['GET'])
# api endpoint to just send weather data
def get_data():
    try:
        data = {'temperature': 30, 'location': 'Not Ben Nevis', 'descr': 'sun'} # temporary data
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/hourly_weather', methods=['POST'])
# api endpoint to receive request for hourly weather data
# return hourly weather data for given location
def hourly_weather_data():
    try:
        data = request.json
        location_name = (data['locationName'])
        day_offset = (data['dayOffset'])
        weather_data_api.on_load()
        hourly_weather = weather_data_api.get_formatted_hourly_weather(location_name, day_offset)
        print(hourly_weather)
        return jsonify(hourly_weather), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/current_weather', methods=['POST'])
def current_weather_data():
    try:
        data = request.json
        location_name = (data['locationName'])
        day_offset = (data['dayOffset'])
        weather_data_api.on_load()
        current_weather = weather_data_api.get_current_weather(location_name, day_offset)
        print(current_weather)
        return jsonify(current_weather), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/download_weather', methods=['POST'])
def download_weather_data():
    try:
        data = request.json
        location_name = (data['locationName'])
        weather_data_api.download_from_name(location_name)
        print('downloaded!')
        return jsonify({'status': 'data downloaded'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

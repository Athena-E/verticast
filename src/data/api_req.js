// API fetch/post methods

const fetchReq = async () => {
  // fetch request to custom API endpoint
  try {
    const response = await fetch('http://10.0.2.2:5000/api/data'); // MUST use 10.0.2.2 android localhost
    const responseData = await response.json();
    return {
      temperature: responseData.temperature,
      name: responseData.location,
      description: responseData.descr,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const postHourlyReq = async location => {
  // post request to return hourly weather data
  try {
    const response = await fetch('http://10.0.2.2:5000/api/hourly_weather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locationName: location,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error sending data:', error);
  }
};

const postCurrentReq = async location => {
  // post request to return current weather data
  try {
    const response = await fetch('http://10.0.2.2:5000/api/current_weather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locationName: location,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error sending data:', error);
  }
};

const postDownloadReq = async location => {
  // post request to download weather data to local files
  try {
    const response = await fetch('http://10.0.2.2:5000/api/download_weather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locationName: location,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error sending data:', error);
  }
};

export const sendHourlyWeatherReq = location => postHourlyReq(location);
export const fetchWeatherData = () => fetchReq();
export const sendCurrentWeatherReq = location => postCurrentReq(location);
export const sendDownloadReq = location => postDownloadReq(location);

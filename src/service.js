
const API_KEY = "27b38ed5bc6c40a4e6de0c7adeb3038f";

const makeIconURL = (iconId,size) =>

`https://th.bing.com/th/id/R.770b805d5c99c7931366c2e84e88f251?rik=khgO%2bY1Hh3BT9w&riu=http%3a%2f%2fpurepng.com%2fpublic%2fuploads%2flarge%2fpurepng.com-weather-iconsymbolsiconsapple-iosiosios-8-iconsios-8-721522596142qx4ep.png&ehk=6msbAydV7X6D4bO8zvLC664aXwKOdBU17dwrHcKxaAg%3d&risl=&pid=ImgRaw&r=0${iconId}.png&size=${size}`;



const getFormattedWeatherData = async (city, units = "metric") => {
const URL=`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${units}`;

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.weather || !data.main || !data.wind || !data.sys || !data.name) {
      throw new Error("Invalid data structure in the API response");
    }

    const {
      weather,
      main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
      wind: { speed },
      sys: { country },
      name,
    } = data;

    const { description, icon } = weather[0];

    return {
      description,
      iconURL: makeIconURL(icon),
      temp,
      feels_like,
      temp_min,
      temp_max,
      pressure,
      humidity,
      speed,
      country,
      name,
    };
  } catch (error) {
    console.error("Error fetching or formatting weather data:", error);
    // Handle the error appropriately, e.g., by returning a default object or rethrowing the error
    throw error;
  }
};

export { getFormattedWeatherData };

import { useState } from 'react';
import './App.css'
import Search from './components/search/search'
import CurrentWeather from './components/currentWeather/currentWeather'
import Forecast from './components/forecast/forecast';
import { WEATHER_API_URL, WEATHER_API_KEY } from "./apiKeys";

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);

  const handleOnSearchChange = async (searchData) => {
    const [latitude, longitude] = searchData.value.split(" ");

    try {
      const weatherResponse = await fetch(`${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`).then(res => res.json());
      const forecastResponse = await fetch(`${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`).then(res => res.json());

      setCurrentWeather({ city: searchData.label, ...weatherResponse });
      setForecastWeather({ city: searchData.label, ...forecastResponse });
    } catch (error) {
      console.error("Failed to fetch weather data", error);
    }
  }

  return (
    <div className='app-container'>
      <Search onChangeSearch={handleOnSearchChange}></Search>
      <div className="weather">
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecastWeather && <Forecast data={forecastWeather} />}
      </div>
    </div>
  )
}

export default App;

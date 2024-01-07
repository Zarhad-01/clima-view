import { useState, useEffect } from 'react';
import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/currentWeather/currentWeather';
import Forecast from './components/forecast/forecast';
import { WEATHER_API_URL, WEATHER_API_KEY } from "./apiKeys";
import Splash from './components/splash/splash';

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const [iconClass, setIconClass] = useState('');

  useEffect(() => {
    if (currentWeather && currentWeather.weather && currentWeather.weather.length > 0) {
      const iconCode = currentWeather.weather[0].icon;
      setIconClass(`bg${iconCode}`);
    }
  }, [currentWeather]);  // This effect depends on currentWeather

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
    <div className={`background ${iconClass}`}>
      <div className='app-container'>
        <Search onChangeSearch={handleOnSearchChange} />
        <div className="weather">
          {currentWeather ? <CurrentWeather data={currentWeather} /> : null}
          {forecastWeather ? <Forecast data={forecastWeather} /> : null}
          {!currentWeather && !forecastWeather && <Splash />}
        </div>
      </div>
    </div>
  )
}

export default App;

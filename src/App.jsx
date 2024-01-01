import { useState } from 'react';
import './App.css'
import Search from './components/search/search'
import CurrentWeather from './components/currentWeather/currentWeather'
import Forecast from './components/forecast/forecast';
import { WEATHER_API_URL, WEATHER_API_KEY} from "./apiKeys";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [latitude, longitude] = searchData.value.split(" ");
    
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`);
    const currentForecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, currentForecastFetch])
    .then(async (response) => {
      const weatherResponse = await response[0].json();
      const forecastResponse = await response[1].json();

      setCurrentWeather({city: searchData.label, ...weatherResponse});
      setForecastWeather({city: searchData.label, ...forecastResponse});
    })
    .catch(console.log);

    console.log(currentWeather);
    console.log(forecastWeather);
  }


  return (
    <div className='app-container'>
      <Search onChangeSearch={handleOnSearchChange}></Search>
      <div className="weather">
      {currentWeather && <CurrentWeather data ={currentWeather} />}
      <Forecast />
      </div>
    </div>
  )
}

export default App;

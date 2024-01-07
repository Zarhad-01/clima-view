import { memo } from "react";
import "./currentWeather.css"

const ParameterRow = ({ label, value }) => (
    <div className="parameter-row">
        <span className="label">{label}</span>
        <span className="value">{value}</span>
    </div>
);

const CurrentWeather = ({ data }) => {
    const capitalize = (str) => str && str[0].toUpperCase() + str.slice(1);

    return (
        <div className="weather-current">
            <div className="city-info">
                <p className="city">{data.city}</p>
                <p className="weather-descriptions">
                    {/* Make weather description uppercase */}
                    {capitalize(data.weather[0].description)}
                </p>
            </div>
            <div className="weather-img">
                <img
                    src={`src/assets/weather-icons/${data.weather[0].icon}.png`}
                    alt="weather"
                    className="weather-icon"
                />
            </div>


            <p className="temp">{Math.round(data.main.temp)}°C</p>
            <div className="weather-details">
                <ParameterRow label="Details" value="" />
                <ParameterRow label="Feels Like" value={`${Math.round(data.main.feels_like)}°C`} />
                <ParameterRow label="Wind" value={`${data.wind.speed} m/s`} />
                <ParameterRow label="Humidity" value={`${data.main.humidity}%`} />
                <ParameterRow label="Pressure" value={`${data.main.pressure} hPa`} />
            </div>

        </div>
    );
}

export default memo(CurrentWeather);
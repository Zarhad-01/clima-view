import { useState, useCallback, useMemo, memo } from "react";
import "./forecast.css"

const Forecast = ({ data }) => {
    const [activeTab, setActiveTab] = useState(0);

    const toggleTab = useCallback((index) => {
        setActiveTab(index);
    }, []);

    const dailyForecast = useMemo(() => orderDataByDay(data), [data]);

    return (
        <div className="forecasts">
            <ul className="bloc-tabs">
                {dailyForecast.map((forecast, index) => {
                    // Only render if forecast data is not empty.
                    if (forecast.length > 0) {
                        const isActive = activeTab === index;
                        const iconUrl = `assets/weather-icons/${findCommonWeatherIcon(forecast).slice(0, 2)}d.png`;
                        return (
                            <li className={isActive ? "tab active-tab" : "tab"} onClick={() => toggleTab(index)} key={index}>
                                <div className="tag-content">
                                    <p className="date">{formatDate(forecast)}</p>
                                    <div className="daily-container">
                                        <div className="img-desc">
                                            <img src={iconUrl} alt="weather" className="daily-weather-icon" />
                                        </div>
                                        <div className="daily-temps">
                                            <p className="weather-description">{summarizeWeatherConditions(forecast)}</p>
                                            <p className="high">{calculateHighs(forecast)}°C</p>
                                            <p className="low">{calculateLows(forecast)}°C</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    }
                    return null;  // Render nothing if the condition is not met
                })}
            </ul>

            {dailyForecast.map((dayForecast, index) => {
                const isActive = activeTab === index;
                return (
                    <div className={isActive ? "content active-content" : "content"} key={index}>
                        <table id={`day${index}`} className="forecast-table">
                            <thead>
                                <tr className="step-time">
                                    <th className="screen-reader-only" scope="row"><span>Time</span></th>
                                    {dayForecast.map((forecast, forecastIndex) => (
                                        <th key={`time-${index}-${forecastIndex}`} scope="col">
                                            {formatTime(forecast.dt_txt)}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {renderWeatherRows(dayForecast)}
                            </tbody>
                        </table>
                    </div>
                );
            })}

        </div>
    )
}
export default memo(Forecast);

// Utility Functions for Formatting (Commonly used)
const formatDate = (dayForecasts) => {
    const datetime = dayForecasts[0].dt_txt;
    const date = new Date(datetime);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
};

const formatTime = (datetime) => {
    const date = new Date(datetime);
    return date.toTimeString().substring(0, 5);
};

// Core Forecasting Functions
const orderDataByDay = (weatherData) => {
    const dailyForecast = Array.from({ length: 6 }, () => []);

    weatherData.list.forEach((item) => {
        const dateStr = item.dt_txt.split(' ')[0];
        const date = new Date(dateStr);
        const dayIndex = date.getDate() - new Date(weatherData.list[0].dt_txt).getDate();

        if (dayIndex >= 0 && dayIndex < dailyForecast.length) {
            dailyForecast[dayIndex].push(item);
        }
    });

    return dailyForecast;
};

const calculateHighs = (dayForecasts) => {
    let high = -Infinity;

    dayForecasts.forEach(({ main: { temp } }) => {
        high = Math.max(high, temp);
    });

    return Math.round(high);
};

const calculateLows = (dayForecasts) => {
    let low = Infinity;

    dayForecasts.forEach(({ main: { temp } }) => {
        low = Math.min(low, temp);
    });

    return Math.round(low);
};

const summarizeWeatherConditions = (dayForecasts) => {
    const weatherConditions = dayForecasts.reduce((acc, { weather }) => {
        const description = weather[0].description;
        acc[description] = (acc[description] || 0) + 1;
        return acc;
    }, {});

    const mostFrequentCondition = Object.keys(weatherConditions).reduce(
        (a, b) => weatherConditions[a] > weatherConditions[b] ? a : b, ''
    );

    // Capitalize the first letter of the most frequent condition
    return mostFrequentCondition.charAt(0).toUpperCase() + mostFrequentCondition.slice(1);
};

const findCommonWeatherIcon = (dayForecasts) => {
    const weatherIconFrequency = dayForecasts.reduce((acc, { weather }) => {
        const icon = weather[0].icon;
        acc[icon] = (acc[icon] || 0) + 1;
        return acc;
    }, {});

    const mostFrequentIcon = Object.keys(weatherIconFrequency).reduce(
        (a, b) => weatherIconFrequency[a] > weatherIconFrequency[b] ? a : b, ''
    );

    return mostFrequentIcon;
};

const getColorForTemperature = (temperature) => {
    if (temperature < 10) return '#ADD8E6'; // Light Blue
    if (temperature >= 10 && temperature < 20) return '#FFFF99'; // Light Yellow
    if (temperature >= 20 && temperature < 30) return '#FFA07A'; // Light Coral
    if (temperature >= 30) return '#FF6347'; // Tomato
    return '#FFFFFF'; // Default color
};

const getHeightForTemperature = (temperature) => {
    const minHeight = 20; // minimum height in pixels
    const heightPerDegree = 2; // height increase per degree
    return `${minHeight + (temperature * heightPerDegree)}px`; // calculate height based on temperature
};

// Render Helper Functions
const renderWeatherRows = (dayForecast) => {
    const rows = [
        { type: "symbol", label: "Weather Symbols", renderCell: renderWeatherSymbol },
        { type: "temp", label: "Temperature (°C)", renderCell: renderTemperature },
        { type: "humidity", label: "Humidity (%)", renderCell: renderHumidity },
        { type: "wind", label: "Wind speed (m/s)", renderCell: renderWindSpeed },
        { type: "gust", label: "Wind gust (m/s)", renderCell: renderWindGust },
    ];

    return rows.map(({ type, label, renderCell }) => (
        <tr className={`step-${type}`} data-type={type} key={type}>
            <th className="screen-reader-only" scope="row"><span>{label}</span></th>
            {dayForecast.map((forecast, index) => (
                <td key={`${type}-${index}`} className="forecast-temp-cell">
                    {renderCell(forecast)}
                </td>
            ))}
        </tr>
    ));
};

const renderWeatherSymbol = (forecast) => (
    <img
        className="forecast-icon"
        src={`assets/weather-icons/${forecast.weather[0].icon}.png`}
        alt={`${forecast.weather[0].main}`}
    />
);

const renderTemperature = (forecast) => {
    const temp = Math.round(forecast.main.temp);
    const backgroundColor = getColorForTemperature(temp);
    const barHeight = getHeightForTemperature(temp);
    return (
        <div className="forecast-temp-container" style={{ height: '100px' /* Max height of the bar */ }}>
            <div className="forecast-temp-bar" style={{ backgroundColor, flex: `0 0 ${barHeight}` }}>
                <span className="forecast-temp-label">
                    {temp}°
                </span>
            </div>
        </div>
    );
};

const renderHumidity = (forecast) => <p className="forecast-temp">{Math.round(forecast.main.humidity)}</p>;

const renderWindSpeed = (forecast) => <p className="forecast-temp">{forecast.wind.speed}</p>;

const renderWindGust = (forecast) => <p className="forecast-temp">{forecast.wind.gust}</p>;
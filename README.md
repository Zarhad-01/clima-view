# Clima-View

## Project Description

Clima-View is a weather application that exemplifies the integration of reactive programming with real-time API data, showcasing front-end development techniques.

Leveraging modern React hooks, Clima-View maintains nimble state management and optimizes performance with minimal re-renders. Here's a snapshot of the React features in action:
- `useState`: Effortlessly tracks component states across renders.
- `useCallback`: Ensures efficiency by memorizing callback functions.
- `useMemo`: Astutely computes and caches expensive operations.

## How It Works

Clima-View's architecture is a symphony of modular React components, each serving a distinct purpose:

- `App`: The orchestrator component where the core application logic resides, deftly managing API interactions.
- `Search`: A user-centric component that gracefully handles location input and fetches corresponding coordinates via the GeoDB Cities API.
- `CurrentWeather`: A display component that renders real-time weather conditions, sourced from the OpenWeatherMap API, attuned to the user's location choice.
- `Forecast`: A forward-looking component that renders a dynamic five-day weather forecast, adapting to changes in location with responsive design patterns.

Each component exemplifies React best practices, utilizing hooks to manage state and effects, while compartmentalizing the user interface into reusable, testable units. Clima-View is a testament to the harmonious integration of API data within a React-driven framework, demonstrating not only technical prowess but also an eye for elegant design.

## Installation

To get started with Clima-View on your local machine, follow these steps:

1. Clone the repository to your local machine.
```
git clone https://github.com/your-username/clima-view.git
```

2. Navigate to the project directory.
```
cd clima-view
```

3. Install the necessary dependencies.
```
npm install
```

4. Update the API keys in `src/apiKeys.js` with your keys obtained from the respective API providers. Visit [GeoDB Cities API](https://rapidapi.com/wirefreethought/api/geodb-cities/details) and [OpenWeatherMap API](https://rapidapi.com/wirefreethought/api/geodb-cities) to obtain your API keys.


```
export const geoApiOptions = {
method: 'GET',
headers: {
 'X-RapidAPI-Key': 'PLACE API KEY HERE',
 'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
}
};
export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions";

export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
export const WEATHER_API_KEY = "PLACE API KEY HERE";
```

4. Start the development server.
```
npm run dev
```

5. Open your browser and navigate to `http://localhost:PORT`.

# Usage

After installation, run the application and use the search bar to enter a location. The app will display the current weather and a detailed forecast for that location.

## File Structure

The clean and modular file structure is as follows:

```
clima-view/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── currentWeather/
│   │   ├── forecast/
│   │   └── search/
│   ├── App.css
│   ├── App.jsx
│   ├── apiKeys.js
│   ├── index.css
│   └── main.jsx
├── .gitattributes
├── .gitignore
├── index.html
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

## License

Clima-View is open-sourced under the MIT License. For more details, see the LICENSE file in the project repository.

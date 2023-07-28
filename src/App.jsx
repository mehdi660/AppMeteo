import { useEffect, useState } from "react";
import loader from "./assets/loader.svg";
import browser from "./assets/browser.svg";
import "./App.css";
const APIKEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [weatherData, setWheatherData] = useState(null);
  const [errorInfo, SetErrorInfo] = useState(null);

  useEffect(() => {
    fetch(`http://api.airvisual.com/v2/nearest_city?key=${APIKEY}`)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData);
        setWheatherData({
          city: responseData.data.city,
          country: responseData.data.country,
          iconId: responseData.data.current.weather.ic,
          temperature: responseData.data.current.weather.tp,
        });
      });
  }, []);

  return (
    <main>
      <div className={`loader-container ${!weatherData && "active"}`}>
        <img src={loader} alt="loading icon" />
      </div>

      {weatherData && (
        <>
          <p className="city-name">{weatherData.city}</p>
          <p className="country-name">{weatherData.country}</p>
          <p className="temperature">{weatherData.temperature} °</p>
          <div className="info-icon-container">
            <img
              src="/icons/01d.svg"
              className="info-icon"
              alt="weather icon"
            />
          </div>
        </>
      )}

      {errorInfo && !weatherData && (
        <>
          <p className="error-information">
            {errorInfo.msg}
            <img src={browser} alt="error icon" />
          </p>
        </>
      )}
    </main>
  );
}

export default App;

import React, { useState } from "react";
import { FaSearch, FaWind } from "react-icons/fa";
import "./Weather.css";
import { MdLocationOn } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";

function Weather() {
  const [city, setCity] = useState("delhi");
  const [weather, setWeather] = useState();
  const [err, setErr] = useState("");
  const API_KEY = "009e85174d4343873da3acf7ad98147b";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  function handleOnChange(e) {
    setCity(e.target.value);
  }
  async function fetchdata() {
    try {
      let response = await fetch(url);
      let output = await response.json();
      if (response.ok) {
        setWeather(output);
        console.log(output);
        setErr("");
      } else {
        setErr("Please enter the correct city name, No Data Found");
      }
    } catch (err) {}
  }

  return (
    <div className="container">
      {/* <video
        src="assets/video.mp4"
        className="video"
        autoPlay
        loop
        muted
      ></video> */}
      <div className="city">
        <input
          type="text"
          value={city}
          onChange={handleOnChange}
          placeholder="Enter city name?"
        />
        <button onClick={() => fetchdata()}>
          <FaSearch></FaSearch>
        </button>
      </div>
      {err && <p className="error-message">{err}</p>}
      {weather && weather.weather && (
        <div className="content">
          <div className="weather-image">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt=""
            />
            <h3 className="desc">{weather.weather[0].description}</h3>
          </div>

          <div className="weather-temp">
            <h2>{weather.main.temp}&deg;C</h2>
          </div>
          <div className="weather-city">
            <div className="location">
              <MdLocationOn />
            </div>
            <p>
              {weather.name},<span>{weather.sys.country}</span>
            </p>
          </div>
          <div className="weather-stats">
            <div className="wind">
              <div className="wind-icon">
                <FaWind></FaWind>
              </div>
              <h3 className="wind-speed">
                {weather.wind.speed}
                <span>km/h</span>
              </h3>
              <h3 className="wind-heading">Wind Speed</h3>
            </div>
            <div className="humidity">
              <div className="humidity-icon">
                <WiHumidity />
              </div>
              <h3 className="humidity-percent">
                {weather.main.humidity}
                <span>%</span>
              </h3>
              <h3 className="humidity-heading">Humidity</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;

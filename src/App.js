import './App.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";

import WeatherDisplay from "./WeatherDisplay";

function App() {
  const [openWeather, setOpenWeather] = useState(null);
  const [userData, setUserData] = useState({ name: "Casey Harding", age: 74, bestInstructor: true });

  useEffect(() => {
    const func = (pos) => {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=ce309858c9580a2f86ac0e0f45374afb`)
        .then(res => {
          const normalizedTemp = ((9/5) * (res.data.main.temp - 273) + 32).toFixed(2);
          const weather = {
            icon: res.data.weather[0].icon,
            cityName: res.data.name,
            cityTemp: normalizedTemp
          }
          setOpenWeather(weather);
        }).catch(err => console.error(err))
      }
    navigator.geolocation.getCurrentPosition(func)
  }, [])

  return (
    <div>
      { openWeather && <WeatherDisplay openWeather={openWeather} userData={userData} /> }
    </div>
  );
}

export default App;

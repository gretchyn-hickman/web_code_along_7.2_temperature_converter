import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function App() {
  const [openWeather, setOpenWeather] = useState(null);
  const [tempType, setTempType] = useState("f");

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

  const convertF = () => {
     const currentTemp = openWeather.cityTemp;
     const convertTemp = currentTemp * 1.8 + 32;
     setOpenWeather({ ...openWeather, cityTemp: convertTemp.toFixed(2) });
     setTempType("f");
  }

  const convertC = () => {
    const currentTemp = openWeather.cityTemp;
    const convertTemp = (currentTemp - 32) * (5/9);
    setOpenWeather({ ...openWeather, cityTemp: convertTemp.toFixed(2) });
    setTempType("c");
  }
    
  return (
    <div>
      <h1>Current weather!</h1>
      { openWeather ? (
        <>
          <img src={`http://openweathermap.org/img/wn/${openWeather.icon}@2x.png`} alt="Weather" />
          <h2>{openWeather.cityName}</h2>
          <p>{openWeather.cityTemp}{tempType}</p>
          <button onClick={tempType === "f" ? convertC : convertF }>Celsius / Farhenheit</button>
        </>
      ) : "weather data coming soon!"}
    </div>
  );
}

export default App;

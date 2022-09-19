import React, { useState, useEffect } from "react";
import axios from "axios";

import WeatherDisplay from "./WeatherDisplay";
import Error from "./Error";

function App() {
  const [openWeather, setOpenWeather] = useState(null);
  const [userData, setUserData] = useState({ name: "Anne", age: 20, bestInstructor: true });
  const [error, setError] = useState(null);
  const [tempType, setTempType] = useState("f")

  const convertC = () => {
    const currentTemp = openWeather.cityTemp
    const convertTemp = (currentTemp - 32) * (5/9);
    setOpenWeather({ ...openWeather, cityTemp: convertTemp.toFixed(2)})
    setTempType("c")
  }
  const convertF = () => {
    const currentTemp = openWeather.cityTemp
    const convertTemp = currentTemp * 1.8 + 32;
    setOpenWeather({ ...openWeather, cityTemp: convertTemp.toFixed(2)})
    setTempType("f")
  }

  
useEffect(() => {
  const pos = {
      coords: {
        latitude: '56',
        longitude: '75',
      }
    }

      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=a5c066049d03f3d14ea65347ef184bc9`)
        .then(res => {
          const normalizedTemp = ((9/5) * (res.data.main.temp - 273) + 32).toFixed(2);
          const weather = {
            icon: res.data.weather[0].icon,
            cityName: res.data.name,
            cityTemp: normalizedTemp
          }
          setOpenWeather(weather);
        }).catch(err => setError("Check back soon, our engineers are working around the clock to restore service!"))
  }, [])

  return (
    <div>
      { error ? <Error error={error} /> : 
        openWeather ? <WeatherDisplay openWeather={openWeather} userData={userData} /> : <p>Weather data coming soon!</p>
      }
      <button onClick={tempType === 'f'? convertC : convertF}>Convert to {tempType === "f"? "Celsius" : "Farenheit"}</button>
    </div>
    )
}

export default App;

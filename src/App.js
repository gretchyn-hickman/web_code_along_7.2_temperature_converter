import React, { useState, useEffect } from "react";
import axios from "axios";

import WeatherDisplay from "./WeatherDisplay";
import Error from "./Error";

function App() {
  const [openWeather, setOpenWeather] = useState(null);
  const [userData, setUserData] = useState({ name: "Casey Harding", age: 74, bestInstructor: true });
  const [error, setError] = useState(null);

  useEffect(() => {
    const func = (pos) => {
      axios.get(`https://api.openweatherma.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=4ade206763c0f24a2dcbe10b1d355375`)
        .then(res => {
          const normalizedTemp = ((9/5) * (res.data.main.temp - 273) + 32).toFixed(2);
          const weather = {
            icon: res.data.weather[0].icon,
            cityName: res.data.name,
            cityTemp: normalizedTemp
          }
          setOpenWeather(weather);
        }).catch(err => setError("Check back soon, our engineers are working around the clock to restore service!"))
    }
    navigator.geolocation.getCurrentPosition(func)
  }, [])

  return (
    <div>
      { error ? <Error error={error} /> : 
            openWeather ? <WeatherDisplay openWeather={openWeather} userData={userData} /> : <p>Weather data coming soon!</p>
      }
    </div>
  )
}

export default App;

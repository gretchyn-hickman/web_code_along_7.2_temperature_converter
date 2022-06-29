import React from "react";

function WeatherDisplay(props) {
  return (
    <>
      <p>Hello, {props.userData.name}. You are {props.userData.age}.</p>
      <p>According to our recent polling, you are {props.userData.bestInstructor 
                                                      ? "the best instructor!" 
                                                      : "...at least you're not the worst!"}
      </p>
      <img src={`http://openweathermap.org/img/wn/${props.openWeather.icon}@2x.png`} alt="Weather" />
      <h2>{props.openWeather.cityName}</h2>
      <p>{props.openWeather.cityTemp}</p>    
    </>
  )
}

export default WeatherDisplay;
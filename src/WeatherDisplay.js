function WeatherDisplay(props) {
  return (
    <>
      <p>Hello, {props.userData.name}. You are {props.userData.age}.</p>
      <p>According to our recent polling, you are {props.userData.bestInstructor 
					      ? "the best instructor!" 
					      : "...at least you're not the worst!"}
      </p>
    </>
  )
}

export default WeatherDisplay;
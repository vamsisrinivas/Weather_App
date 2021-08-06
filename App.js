import React, { useState } from 'react'


const App = () => {
  const [city, setCity] = useState("")
  const [result, setResult] = useState("")
  const [extra, setExtra] = useState("")

  const changeHandler = e => {
    setCity(e.target.value)
  }

  const submitHandler = e => {
    e.preventDefault()
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d885aa1d783fd13a55050afeef620fcb`)
      .then(response => response.json())
      .then(data => {
        const kelvin = data.main.temp
        const celsius = kelvin - 273.15
        setResult("Temperature at " + city + " " + Math.round(celsius) + "°C")

        if (Math.round(celsius) > 10 && Math.round(celsius) <= 20) {
          setExtra(city + " Temperature is Normal")
        }
        else if (Math.round(celsius) > 25) {
          setExtra(city + " Temp is bit Hot")
        }
        setCity("")
      }).catch(error => console.log(error))



  }

  return (
    <center>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Weather App</h2>
          <form onSubmit={submitHandler}>
            <input type="text" name="city" value={city} onChange={changeHandler} />
            <br />
            <br />
            <br />
            <input type="submit" value="Get Temperature" onChange={changeHandler} />

            <h6>{extra}</h6>
          </form>
          <h1>{result}</h1>
          <br />

        </div>
      </div>
    </center>
  );
}

export default App;
// ).then(data=>{
  //   const kelvin=data.main.temp
  //   const celsius=kelvin-273.5
  //   console.log(celsius)
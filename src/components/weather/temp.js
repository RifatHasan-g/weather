import React, { useState, useEffect } from "react";
import Weathercard from "./weathercard";
import "./style.css";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("Dhaka, BD");
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
    

      let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid={(api key)}`);
      let data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
    
  };
  useEffect(() => {
    getWeatherInfo();
  }, []);

 

  return (
    <>
      <div className="container">
        
        <div className="search">
          
          <input
            type="search"
            placeholder="Enter location"
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(l) => setSearchValue(l.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>

      {/* temp card  */}
      <Weathercard {...tempInfo} />
    </>
  );
};

export default Temp;


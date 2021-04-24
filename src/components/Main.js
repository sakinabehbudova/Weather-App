import React, { useState } from "react";
import Header from "./Header.js";
import Content from "./Content.js";
import axios from "axios";
import WeatherSearch from "./WeatherSearch.js";
import WeatherData from "./WeatherData.js";
import Context from "../Context.js";
import Error from "./Error.js";
import DateTime from './DateTime.js'
import Title from "./Title.js";
import Footer from "./Footer.js";

const Main = () => {
  const [weather, setWeather] = useState();
  const [city, setCity] = useState();
  const [error, setError] = useState();
  const api_call = async (e) => {
    e.preventDefault();
    const API_key = "9c3cb98520f309bd159e77512e8e5e28";
    const location = e.target.elements.location.value;
    if (!location) return setError("Plaese enter the name of city."), setWeather(null)
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_key}&units=metric`;
    const request = axios.get(url);
    const response = await request;
    setWeather(response.data.main);
    setCity(response.data.name);
    setError(null)
  };
  weather && console.log("weather", weather);
  return (
    <div className="main">
      <Header></Header>

      <Content>
      <DateTime/>
      <Title/>
        <Context.Provider value={{ api_call, weather, city, error }}>
          <WeatherSearch />
          {weather && <WeatherData />}
          {error && <Error></Error>}
        </Context.Provider>
      </Content>
      <Footer/>
    </div>
  );
};
export default Main;

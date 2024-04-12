import React, { useState } from 'react'
import './WeatherApp.css'

import search_icon from '../Assets/search.png'
import humidity_icon from '../Assets/humidity.png'
import wind_icon from '../Assets/wind.png'
import clear_sky from '../Assets/clear_sky.png'
import few_clouds from '../Assets/few_clouds.png'
import scat_cloud from '../Assets/scat_cloud.png'
import broken_cl from '../Assets/broken_cl.png'
import shower_rain from '../Assets/shower_rain.png'
import rain from '../Assets/rain.png'
import thunder from '../Assets/thunder.png'
import snow from '../Assets/snow.png'
import mist from '../Assets/mist.png'
import feels_like from '../Assets/feels_like.png'
import vis from '../Assets/vis.png'

const WeatherApp = () => {
    let api_key=process.env.REACT_APP_API_KEY

    console.log(process.env.API_KEY)
    const [wicon,setWicon]=useState(few_clouds);
    
    const search =async ()=>{
        const element=document.getElementsByClassName("cityInput")
        if(element[0].value==="")
        {
            return 0;

        }
        let url= `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
        let response =await fetch(url);
        let data= await response.json();

        if (response.status === 404) {
            alert('City not found. Please enter a valid city name :(');
            return;
        }
        const feels=document.getElementsByClassName("feels-like")
        const vis=document.getElementsByClassName("visibility")
        const humidity=document.getElementsByClassName("humidity-percent");
        const wind=document.getElementsByClassName("wind-rate");
        const temperature=document.getElementsByClassName("weather-temp");
        const location=document.getElementsByClassName("weather-location");

        feels[0].innerHTML=Math.floor(data.main.feels_like)+"°C";
        vis[0].innerHTML=(data.visibility/1000)+" Km";
        humidity[0].innerHTML =data.main.humidity+" %";
        wind[0].innerHTML=Math.floor(data.wind.speed)+" Km/Hr";
        temperature[0].innerHTML=Math.floor(data.main.temp)+"°C";
        location[0].innerHTML=data.name;

        if (data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
            setWicon(clear_sky);
        }
        else if (data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
            setWicon(few_clouds);
        }
        else if (data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
            setWicon(scat_cloud);
        }
        else if (data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
            setWicon(broken_cl);
        }
        else if (data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
            setWicon(shower_rain);
        }
        else if (data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
            setWicon(rain);
        }
        else if (data.weather[0].icon==="11d" || data.weather[0].icon==="11n"){
            setWicon(thunder);
        }
        else if (data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
            setWicon(snow);
        }
        else if (data.weather[0].icon==="50d" || data.weather[0].icon==="50n"){
            setWicon(mist);
        }
            

    }

  return (
    <div className='container'>
        <div className="top-bar">
          <input type="text" className="cityInput" placeholder='search'/>
            <div className="search-icon" onClick={()=>search()}>
                <img src={search_icon} alt=""/>
            </div>  
        </div>

        <div className="weather-img">
            <img src={wicon} alt="" />
        </div>


        <div className="weather-temp">15°C</div>
        <div className="weather-location">New York</div>
        <div className="data-container">
            <div className="element">
                <img src={feels_like} alt="" className="icon" />
                <div className="data">
                    <div className="feels-like">16°C</div>
                    <div className="text">Feels like</div>
                </div>
            </div>
            <div className="element">
                <img src={vis} alt="" className="icon" />
                <div className="data">
                    <div className="visibility">9 Km</div>
                    <div className="text">Visibility</div>
                </div>
            </div>
            <div className="element">
                <img src={humidity_icon} alt="" className="icon" />
                <div className="data">
                    <div className="humidity-percent">44%</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={wind_icon} alt="" className="icon" />
                <div className="data">
                    <div className="wind-rate">7 km/hr</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div>

      
    </div>
  )
}

export default WeatherApp

// Select Elements
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.getElementsByClassName.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

//Set User's Position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
    const mymap = L.map('map').setView([latitude, longitude], 10);
    
    const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibWFyb2NlYW5ib3kiLCJhIjoiY2s3bm9vcjhyMDB3dDNmcGcyeTZ1MWI5eSJ9.Isol_Faoey_pLj1NBovsiQ'
    }).addTo(mymap);
}





// Show Error When There Is An Issue With Geolocation Service
function showError(error){
    notificationElement.getElementsByClassName.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}
// App Data
const weather = {};

weather.temperature = {
    unit : "celcius"
}

// App Constants and Vars
const KELVIN = 273;
//API Key
const key = "82005d27a116c2880c8f0fcb866998a0";

// Check if Browser Supports Geolcation

// Get Weather From API Provider
function getWeather(latitude, longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
    .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather.description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
    }
    
    // Display Weather To UI
    function displayWeather(){
        iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        descElement.innerHTML = weather.description;
        locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    }
    
    // C To F
    function celciusToFahrenheit(temperature){
        return (temperature * 9/5) + 32;
    }
    
    // When User Click On Temperature Element
    tempElement.addEventListener("click", function(){
        if(weather.temperature.value === undefined) return;
        
        if(weather.temperature.unit === "celcius"){
            let fahrenheit = celciusToFahrenheit(weather.temperature.value);
            fahrenheit = Math.floor(fahrenheit);
            
            tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
            weather.temperature.unit = "fahrenheit";
        }else{
            tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
            weather.temperature.unit = "celcius";
        }
    });
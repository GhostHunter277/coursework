
const API_key = 'e6f9e1aa5b8e6b6cae6796b1b9450b5e';
const API_url = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_key}`;

const nameElement = document.querySelector("#main-name");
const iconElement = document.querySelector("#main-weather-icon");
const tempElement = document.querySelector("#main-weather-degree");

const windElement = document.querySelector("#weather-details-wind");
const cloudElement = document.querySelector("#weather-details-cloud");
const pressureElement = document.querySelector("#weather-details-pressure");
const humidityElement = document.querySelector("#weather-details-humidity");
const coordinateElement = document.querySelector("#weather-details-coordinates");

const weather = {};

function convertDeg(deg) {
    const val = Math.floor((deg / 22.5) + 0.5);
    const arr = ["North", "North-east", "East", "South-east", "South", "South-west", "West", "North-west",];
    return arr[(val % 8)];
}

setDefaultPosition();

function  updateCurrentGeolocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(setPosition, showError);
    } else {
        navigator.geolocation.getCurrentPosition(setDefaultPosition, showError);
    }
}

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeatherByCoordinate(latitude, longitude);
}

function setDefaultPosition(position){
    let latitude = 54.771648;
    let longitude = 56.026932;

    getWeatherByCoordinate(latitude, longitude);
}

function showError(error){
    console.log(error.message);
}

function getWeatherByCoordinate(latitude, longitude){
    fetch(`${API_url}&lat=${latitude}&lon=${longitude}`)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then((data) => {
            console.log(data);
            return data;
        })
        .then(function(data){
        weather.city = data.name;
        weather.iconId = data.weather[0].icon;
        weather.temperature = Math.floor(data.main.temp);

        weather.wind = data.wind.speed;
        weather.deg = convertDeg(data.wind.deg);
        weather.cloud = data.weather[0].description;
        weather.pressure = data.main.pressure;
        weather.humidity = data.main.humidity;
        weather.lat = data.coord.lat;
        weather.lon = data.coord.lon;
        })
        .then(function(){
            console.log(weather);
            return weather;
        })
        .then(function(){
            displayWeather();
        });
}

function displayWeather(){
    nameElement.innerHTML = `${weather.city}`;
    iconElement.innerHTML = `<img src=" http://openweathermap.org/img/wn/${weather.iconId}@2x.png" width="160px"/>`;
    tempElement.innerHTML = `${weather.temperature}°C`;
    windElement.innerHTML = `${weather.wind} m/s, ${weather.deg}`;
    cloudElement.innerHTML = `${weather.cloud}`;
    pressureElement.innerHTML = `${weather.pressure} hpa`;
    humidityElement.innerHTML = `${weather.humidity}%`;
    coordinateElement.innerHTML = `[${weather.lat.toFixed(2)}, ${weather.lon.toFixed(2)}]`;
}

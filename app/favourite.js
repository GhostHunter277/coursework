
const list = document.querySelector("#favourite-weather-cities");

function addCityCard(name, isInit) {

   return getWeatherByName(name)
        .then((data) => {
            const cityFromStorage = getCitiesLocalStorage().find(item => item === data.name);
            if (!isInit) {
                if (cityFromStorage) {
                    throw new Error("Error: Такой город уже существует 2");
                } else {
                    addCityToLocalStorage(data.name)
                }
            }
        return data;
        })
        .then((data) => createCityCard(data))
        .catch((error) => alert(error))
}

function addCityByName(name){
    let cityName = name || document.getElementById('#city-search').value;
    addCityCard(cityName);
}

async function getWeatherByName(cityName){
    return fetch(`${API_url}&q=${cityName}`)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then((data) => {
            console.log(data);
            return data;
        })
}

function createCitiesList() {
    const citiesStorage = getCitiesLocalStorage();

    const promiseArray = [];
    for (let i = 0; i < citiesStorage.length; i++) {
        promiseArray.push(getWeatherByName(citiesStorage[i]));
    }
    Promise.all(promiseArray)
        .then((array) => array.forEach(item => {
            console.log(array);
            createCityCard(item)
        }))
        .catch((error) => alert(error))
}

function createCityCard(data) {
    console.log(data);
    const div = document.createElement("div");
    div.id = "favourite-weather-city-" + `${data.name}`;

    const degNESW = convertDeg(data.wind.deg);

    const temp = `
            <div class="favourite-weather-city">
                <h4>${data.name}</h4>
                <div class="favourite-weather-degree">${Math.floor(data.main.temp)}°C</div>
                <div class="favourite-weather-icon">
                <img src=" http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" width="80px"/>
                </div>
                <div class="cross-button-block">
                    <button onclick="deleteCityCard(this.id)" id="${data.name}" class="cross-button">&times</button>
                </div>
            </div>
            <ul class="favourite-weather-info-list">
                <li class="favourite-weather-info">
                    <div class="weather-info">Ветер</div>
                    <div class="weather-details">${data.wind.speed} m/s, ${degNESW}</div>
                </li>
                <li class="favourite-weather-info">
                    <div class="weather-info">Облачность</div>
                    <div class="weather-details">${data.weather[0].description}</div>
                </li>
                <li class="favourite-weather-info">
                    <div class="weather-info">Давление</div>
                    <div class="weather-details">${data.main.pressure} hpa</div>
                </li>
                <li class="favourite-weather-info">
                    <div class="weather-info">Влажность</div>
                    <div class="weather-details">${data.main.humidity}%</div>
                </li>
                <li class="favourite-weather-info">
                    <div class="weather-info">Координаты</div>
                    <div class="weather-details">[${Number(data.coord.lat).toFixed(2)}, ${Number(data.coord.lon).toFixed(2)}]</div>
                </li>
            </ul>`;

    div.innerHTML = temp;
    list.appendChild(div);
}

function deleteCityCard(cityName) {
    const city = document.getElementById("favourite-weather-city-" + cityName)
    list.removeChild(city);
    deleteCityFromLocalStorage(cityName);
}

createCitiesList();



const citiesLocalStorageKey = "favourite-cities";
const localStorage = window.localStorage;
const defaultLocalStorage = ['Moscow', 'Tokyo', 'Stockholm', 'Seoul'];

function setCitiesLocalStorage(cities){
    localStorage.setItem(citiesLocalStorageKey, JSON.stringify(cities));
}

function getCitiesLocalStorage() {
    const citiesStorage = JSON.parse(localStorage.getItem(citiesLocalStorageKey));
    if(!citiesStorage) {
        localStorage.setItem(citiesLocalStorageKey, JSON.stringify(defaultLocalStorage));
    }
    return JSON.parse(localStorage.getItem(citiesLocalStorageKey));
}

function addCityToLocalStorage(city) {
    if (city) {
        const citiesStorage = getCitiesLocalStorage();
        if(citiesStorage.includes(city)){
            throw Error('Error: Такой город уже существует 1');
        }
        citiesStorage.push(city);
        setCitiesLocalStorage(citiesStorage);
    }
}

function deleteCityFromLocalStorage(city) {
    if (city) {
        const citiesStorage = getCitiesLocalStorage();

        // const newCitiesStorage = [];
        // for (let i = 0; i < citiesStorage.length; i++) {
        //     if (citiesStorage[i] !== city) {
        //         newCitiesStorage.push(citiesStorage[i]);
        //     }
        // }
        const newCitiesStorage = citiesStorage.filter((item) => item !== city);
        setCitiesLocalStorage(newCitiesStorage);
    }
}

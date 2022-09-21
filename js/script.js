var root = document.querySelector("#root");
var searchBar = document.querySelector("#searchbar");
var cityName = ""
var dropdown = document.querySelector('.dropdown');
var dropdownMatch = document.querySelector('.match');
var countryMatchUnderscored = ""
var createDivValue = ""
var foundLocations = [];


// todo 2 function, 1 fetch (nagy városlista), 1 other
var fetchImage = async (selectedCity) => {
    var imageResponse = await fetch(`https://api.pexels.com/v1/search?query=${selectedCity}`, {
        headers: { 'Authorization': '563492ad6f91700001000001db09f2c3ac4e4d88b42ba73ba3e0e687' }
    })
    var gottenImage = await imageResponse.json()
    console.log(gottenImage);
    var body = document.querySelector('body');
    body.style.background = `url(${gottenImage.photos[0].src.landscape})`
    body.style.backgroundPosition = 'center'
    body.style.backgroundRepeat = 'no-repeat'
    body.style.backgroundSize = 'cover'

}




var showInfos = async (event) => {
    var selectedCity = foundLocations[event.target.getAttribute("value")].city;
    var fetchWeather = await fetch(`https://api.weatherapi.com/v1/current.json?key=e6be19e096224376bf9100012221909&q=${foundLocations[event.target.getAttribute("value")].city}+${foundLocations[event.target.getAttribute("value")].country}`)
    var fetchWeatherContent = await fetchWeather.json();
    console.log(fetchWeatherContent);
    searchBar.value = foundLocations[event.target.getAttribute("value")].city + ", " + foundLocations[event.target.getAttribute("value")].country;
    fetchImage(selectedCity)
    var cardContainer = document.querySelector('#card-container');
    var cardCity = document.getElementById('card-city')
    var cardIcon = document.getElementById('card-icon')
    var cardTemp = document.getElementById('card-temp')
    var cardDate = document.getElementById('card-date')
    cardCity.textContent = selectedCity;
    console.log(`${fetchWeatherContent.current.condition.icon.slice(2, fetchWeatherContent.current.condition.length)}`);
    var iconLink = `http://${fetchWeatherContent.current.condition.icon.slice(2, fetchWeatherContent.current.condition.length)}`
    cardIcon.setAttribute('src', iconLink)

    cardTemp.textContent = fetchWeatherContent.current.temp_c + '°C';
    cardDate.textContent = `Last updated: ${fetchWeatherContent.current.last_updated}`;

    cardContainer.style.display = "flex";



}


const cityFinder = async () => {

    var fetchCity = await fetch('https://countriesnow.space/api/v0.1/countries')
    var fetchCityContent = await fetchCity.json();
    foundLocations = [];


    for (let i = 0; i < fetchCityContent.data.length; i++) {
        for (let j = 0; j < fetchCityContent.data[i].cities.length; j++) {
            if (fetchCityContent.data[i].cities[j].startsWith(cityName)) {

                var cityMatch = fetchCityContent.data[i].cities[j];
                var countryMatch = fetchCityContent.data[i].country;
                foundLocations.push({ city: `${cityMatch}`, country: `${countryMatch}` });

            }
        }
    }
    console.log(foundLocations);
    return divGenerator();
}


const divGenerator = async () => {
    dropdown.innerHTML = "";
    for (let i = 0; i < foundLocations.length; i++) {
        var divTemplate = document.createElement("div");
        divTemplate.classList.add("match");
        divTemplate.setAttribute("value", i);
        divTemplate.innerHTML = `${foundLocations[i].city}, ${foundLocations[i].country}`;
        divTemplate.addEventListener("click", showInfos);
        divTemplate.addEventListener("click", () => { dropdown.style.display = 'none' });
        dropdown.appendChild(divTemplate)
    }
}

// ? függvény, ami az input mező value-ját összehasonlítjuk minden ország minden városnevével

const searchCity = () => {


    if (searchBar.value.length >= 3) {
        dropdown.style.display = "flex";
        dropdown.style.flexDirection = "column";
        dropdown.style.zIndex = 11
        cityName = searchBar.value.charAt(0).toUpperCase() + searchBar.value.slice(1, searchBar.value.length);
        cityFinder();
    } else {
        dropdown.style.display = "none";
    }
}

searchBar.addEventListener("input", searchCity);

searchBar.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        console.log("anyád");
        showInfos();
    } else if (event.keycode == "Space") {

        for (let i = 0; i < searchBar.value.length; i++) {
            if (i == ' ') {
                searchBar.value.charAt(i + 1).toUpperCase();
                console.log("sajt");
            }
        }
    }
});




// Weather API

const currentWeather = async () => {
    const fetchWeather = await fetch(`https://api.weatherapi.com/v1/current.json?key=af7dd8b769394e619f6134652222009&q=${cityName}+${countryMatchUnderscored}`)
    const weatherJSON = await fetchWeather.json()
    console.log(weatherJSON)
}

currentWeather()



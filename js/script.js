var root = document.querySelector("#root");
var searchBar = document.querySelector("#searchbar");
var cityName = ""
var dropdown = document.querySelector('.dropdown');
var dropdownMatch = document.querySelector('.match');
var countryMatchUnderscored = ""
var createDivValue = ""
var foundLocations = [];

// todo 2 function, 1 fetch (nagy városlista), 1 other

var showInfos = async (event) => {
    var fetchWeather = await fetch(`https://api.weatherapi.com/v1/current.json?key=e6be19e096224376bf9100012221909&q=${foundLocations[event.target.getAttribute("value")].city}+${foundLocations[event.target.getAttribute("value")].country}`)
    var fetchWeatherContent = await fetchWeather.json();
    console.log(fetchWeatherContent);
    searchBar.value = foundLocations[event.target.getAttribute("value")].city + ", " + foundLocations[event.target.getAttribute("value")].country;
}


const cityFinder = async () => {
   
    var fetchCity = await fetch ('https://countriesnow.space/api/v0.1/countries')
    var fetchCityContent = await fetchCity.json();
    foundLocations = [];
    
    
    for (let i=0; i<fetchCityContent.data.length; i++) {
        for (let j=0; j<fetchCityContent.data[i].cities.length; j++) {
            if (fetchCityContent.data[i].cities[j].startsWith(cityName)) {

                var cityMatch = fetchCityContent.data[i].cities[j];
                var countryMatch = fetchCityContent.data[i].country;
                foundLocations.push({city: `${cityMatch}`, country: `${countryMatch}` });

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
    dropdown.appendChild(divTemplate)
    }
} 

// ? függvény, ami az input mező value-ját összehasonlítjuk minden ország minden városnevével

const searchCity = () => {
    console.clear()
    
    if (searchBar.value.length>=3) {
        dropdown.style.display = "flex";
        dropdown.style.flexDirection = "column";
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
    }
});




// Weather API

const currentWeather = async () => {
    const fetchWeather = await fetch(`https://api.weatherapi.com/v1/current.json?key=af7dd8b769394e619f6134652222009&q=${cityName}+${countryMatchUnderscored}`)
    const weatherJSON = await fetchWeather.json()
    console.log(weatherJSON)
}

currentWeather()




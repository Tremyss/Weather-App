var root = document.querySelector("#root");
var searchBar = document.querySelector("#searchbar");
var cityName = ""
var dropdown = document.querySelector('.dropdown');
var dropdownMatch = document.querySelector('.match');
var countryMatchUnderscored = ""
var createDivValue = ""

// todo 2 function, 1 fetch (nagy városlista), 1 other

const cityFinder = async () => {
    // ? a cityname mindig a keresőmező értékével lesz egyenlő, majd + fg-ben karakterletésenként frissítsük az értékét, ez lehet keypress után
    var fetchCity = await fetch ('https://countriesnow.space/api/v0.1/countries')
    var fetchCityContent = await fetchCity.json();
    // console.log(fetchCityContent.data)
    // ? 2 for loop, 1 a datán megy, 1 pedig az adott országhoz tartozó város i-edik tagján
    for (let i=0; i<fetchCityContent.data.length; i++) {
        for (let j=0; j<fetchCityContent.data[i].cities.length; j++) {
            if (fetchCityContent.data[i].cities[j].startsWith(cityName)) {
                var cityMatch = fetchCityContent.data[i].cities[j];
                var countryMatch = fetchCityContent.data[i].country;
                var createDiv = document.createElement("div");
                countryMatchUnderscored = countryMatch.replace(/ /g, "_")
                
                console.log(countryMatchUnderscored)

                
                createDiv.classList.add("match");
                createDiv.innerHTML = `${cityMatch}, ${countryMatch}`;
                dropdown.appendChild(createDiv);
                // console.log(cityMatch, countryMatch);
                dropdown.style.display = "block";
                // dropdown.style.flexDirection = "column"
                // console.log(fetchCityContent.data[i].cities[j], fetchCityContent.data[i].country);
                createDiv.addEventListener("click", () => {
                    console.log(createDiv.textContent);
                });
                
                

            }
        }
    }

    
    /* console.log(fetchCityContent.data[0].cities[0]);
    // ez a fenti kód hozza elő az adott (i) ország adott (j) városát

    console.log(fetchCityContent);
    // ez meg a full objektumot */
}



// ? függvény, ami az input mező value-ját összehasonlítjuk minden ország minden városnevével

const searchCity = () => {
    console.clear()
    dropdown.innerHTML = "";
    if (searchBar.value.length>=3) {
        cityName = searchBar.value.charAt(0).toUpperCase() + searchBar.value.slice(1, searchBar.value.length);
        cityFinder();
    }
}

searchBar.addEventListener("input", searchCity);




// Weather API

const currentWeather = async () => {
    const fetchWeather = await fetch(`https://api.weatherapi.com/v1/current.json?key=af7dd8b769394e619f6134652222009&q=${cityName}+${countryMatchUnderscored}`)
    const weatherJSON = await fetchWeather.json()
    console.log(weatherJSON)
}

currentWeather()


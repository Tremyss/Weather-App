var root = document.querySelector("#root");
var searchBar = document.querySelector("#searchbar");
var cityName = ""
var dropdown = document.querySelector('.dropdown');
var dropdownMatch = document.querySelector('.match');

// todo 2 function, 1 fetch (nagy városlista), 1 other

const cityFinder = async () => {
    // ? a cityname mindig a keresőmező értékével lesz egyenlő, majd + fg-ben karakterletésenként frissítsük az értékét, ez lehet keypress után
    var fetchCity = await fetch ('https://countriesnow.space/api/v0.1/countries')
    var fetchCityContent = await fetchCity.json();
    /* console.log(fetchCityContent.data[0].cities[1]) */
    // ? 2 for loop, 1 a datán megy, 1 pedig az adott országhoz tartozó város i-edik tagján
    for (let i=0; i<fetchCityContent.data.length; i++) {
        for (let j=0; j<fetchCityContent.data[i].cities.length; j++) {
            if (fetchCityContent.data[i].cities[j].startsWith(cityName)) {
                var cityMatch = fetchCityContent.data[i].cities[j];
                var countryMatch = fetchCityContent.data[i].country;

                var createDiv = document.createElement("div");
                createDiv.classList.add("match");
                createDiv.innerHTML = `${cityMatch}, ${countryMatch}`;
                dropdown.appendChild(createDiv);
                console.log(cityMatch, countryMatch);
                dropdown.style.display = "flex";
                dropdown.style.flexDirection = "column"
                console.log(fetchCityContent.data[i].cities[j], fetchCityContent.data[i].country);
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
    dropdown.innerHTML = "";
    if (searchBar.value.length>=3) {
        console.log(".............ahoy.........");
        cityName = searchBar.value;
        cityFinder();
    }
}

searchBar.addEventListener("input", searchCity);

const teszt = (event) => {
    console.log(event.target.value);
}


dropdownMatch.addEventListener("click", teszt);
let weatherIcon = document.getElementById("weatherIcon");
let temp = document.getElementById("temp");
let country = document.getElementById("country");
let wspeed = document.getElementById("wspeed");
let humidity = document.getElementById("humidity");
let btn = document.getElementById("btn");
let input = document.getElementById("input");

let placeName = 'India';

btn.addEventListener('click', (e)=>{
    e.preventDefault();
    placeName = input.value;
    weather();
});

let makeUrl = (placeName) => {
    let url = 'http://api.weatherapi.com/v1/current.json?key=36b354a44cf84b23841142542240102&q=';
    return url + placeName;
}

let weather = async () => {

    const url = makeUrl(placeName);

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'fcb7a373bcmsh9b006567009d784p13150ajsn0af3136f5f33',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };

    try {

        const response = await fetch(url, options);

        const result = await response.json();

        console.log(result);

        let humidity = result.current.humidity,
            wind_speed = result.current.wind_kph,
            icon = result.current.condition.icon,
            temp_c = result.current.temp_c,
            countryName = result.location.country,
            regionName = result.location.name;

        addItems(temp_c,icon,humidity,wind_speed,regionName,countryName);

    } 
    catch (error) {
        console.error(error);
    }
}

let addItems = (temp_c, icon, humdthy,wind_speed,regionName,countryName) => {
    
    weatherIcon.src = icon;

    temp.innerHTML = `
        ${temp_c} <sup>o</sup>C
    `;

    country.innerHTML = `
    ${regionName}, ${countryName}.
    `;

    humidity.innerHTML = `
        ${humdthy}%
    `;

    wspeed.innerHTML = `
        ${wind_speed} km/h
    `;
}

weather();


const descriptionEl = document.querySelector('#description');
const maxTempEl = document.querySelector('#max-temp');
const minTempEl = document.querySelector('#min-temp');
const humidityEl = document.querySelector('#humidity');
const snowEl = document.querySelector('#snow')
const windSpeedEl = document.querySelector('#wind-speed');
const farenheitBtn = document.querySelector('#farenheit-btn');
const celsiusBtn = document.querySelector('#celsius-btn');
const searchBtn = document.querySelector('#search');
const locationInputEl = document.querySelector('#location');
const locationTextEl = document.querySelector('#location-text');
const unitBtns = document.querySelector('#unit-btns')
const API_KEY = '4DGSAFVN7L66XA4JLE8BMG8CQ';

let celsius = true;


searchBtn.addEventListener('click', () => {
    getWeatherData(locationInputEl.value);
    locationTextEl.textContent = `Weather Today in ${locationInputEl.value.toUpperCase()}`;
    locationInputEl.value = ''
})



async function getWeatherData(location){
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}
        `);
        const data = await response.json();
        
        const weatherDataToday = processData(data).days[0];
        console.log(weatherDataToday);
        displayWeatherData(weatherDataToday);
        unitBtns.style.display = 'block';
        farenheitBtn.addEventListener('click', () => {
            celsius = false;
            console.log(celsius);
            displayWeatherData(weatherDataToday);
        });
        celsiusBtn.addEventListener('click', () => {
            celsius = true;
            displayWeatherData(weatherDataToday);
        })
    } catch (error) {
        locationTextEl.textContent = 'Please try again later';
    }
    
}


const processData = (data) => {
    const { days } = data;

    const weatherData = {
        days
    }
    
    return weatherData;
}

const displayWeatherData = (weatherDataToday) => {
    descriptionEl.textContent = weatherDataToday.description;
    maxTempEl.textContent = `Max Temp: ${celsius ? weatherDataToday.tempmax : (weatherDataToday.tempmax * 9/5 + 32).toFixed(1)} ${celsius ? 'C' : 'F'}`;
    minTempEl.textContent = `Min Temp: ${celsius ? weatherDataToday.tempmin : (weatherDataToday.tempmin * 9/5 + 32).toFixed(1)} ${celsius ? 'C' : 'F'}`;
    humidityEl.innerHTML = `Humdiity: ${weatherDataToday.humidity} g/m<sup>3</sup>`;
    snowEl.textContent = `Snow: ${celsius ? weatherDataToday.snow : (weatherDataToday.snow * 0.03937).toFixed(2)} ${celsius ? 'mm' : 'in'}`;
    windSpeedEl.textContent = `Wind Speed: ${celsius ? weatherDataToday.windspeed : (weatherDataToday.windspeed * 0.621371).toFixed(1)} ${celsius ? 'kph' : 'mph'}`;
}


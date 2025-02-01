const API_KEY = '';

async function getWeatherData(location){
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}
    `);
    const data = await response.json();
    
    const currentConditions = processData(data);
    console.log(currentConditions);
}

getWeatherData('london')

const processData = (data) => {
    const currentConditions = data.currentConditions;
    return currentConditions;
}
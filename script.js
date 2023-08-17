const apiKey = '0ee680da93ea354680ce7412626d824b';

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    const response = await fetch(apiUrl); 
    const data = await response.json();
    return data;
}

async function displayWeather(city) {
    const weatherInfo = document.getElementById('weather-info');
    
    try {
        const data = await getWeatherData(city);
        const description = data.weather[0].description;
        const temperature = data.main.temp;
        const weatherIcon = data.weather[0].icon;
        
        const weatherDataHTML = `
            <h2>Weather in ${city}</h2>
            <img class="weather-icon" src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">
            <p>Description: ${description}</p>
            <p>Temperature: ${temperature}°C</p>
        `;

        const weatherDataElement = document.createElement('div');
        weatherDataElement.className = 'weather-data';
        weatherDataElement.innerHTML = weatherDataHTML;

        weatherInfo.appendChild(weatherDataElement);
    } catch (error) {
        weatherInfo.innerHTML = 'Error fetching weather data.';
        console.error(error);
    }
}

// Search button functionality
const searchButton = document.getElementById('search-btn');
searchButton.addEventListener('click', () => {
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value;
    if (city.trim() !== '') {
        displayWeather(city);
        cityInput.value = ''; // Clear the input after fetching weather
    }
});

// Refresh button functionality
const refreshButton = document.getElementById('refresh-btn');
refreshButton.addEventListener('click', () => {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = ''; // Clear existing weather data
    cities.forEach(city => {
        displayWeather(city);
    });
});

const cities = ['Toronto', 'Kathmandu'];

// Initial display of weather information
cities.forEach(city => {
    displayWeather(city);
});

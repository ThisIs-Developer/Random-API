document.addEventListener('DOMContentLoaded', function () {
    const searchBtn = document.getElementById('searchBtn');
    const locationInput = document.getElementById('locationInput');
    const timeSelect = document.getElementById('time');
    const serverSelect = document.getElementById('server');
    const weatherDisplay = document.getElementById('weatherDisplay');

    searchBtn.addEventListener('click', function () {
        const location = locationInput.value.trim();
        const timeFrame = timeSelect.value;
        const server = serverSelect.value;

        if (location === '') {
            alert('Please enter a location.');
            return;
        }

        let apiKey = '';
        if (server === 'server1') {
            apiKey = 'QRBER4ECEN8MN23V5S9SAMEA4';
        } else if (server === 'server2') {
            apiKey = '6DHFPDMG6GP6XW534CRB6LTTG';
        } else if (server === 'server3') {
            apiKey = '7NUJJNVH7CF9K6X2XUCZUWMJH';
        } else if (server === 'server4') {
            apiKey = '6DMQXFJSJVWY4B2L2ZAYFQR75';
        }

        const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${timeFrame}?unitGroup=metric&key=${apiKey}&contentType=json`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherDisplay.innerHTML = '<p>Server is busy. Please change the server or try again later.</p>';
            });
    });

    function displayWeather(weatherData) {
        const { resolvedAddress, latitude, longitude, timezone, description, days } = weatherData;
        let weatherHTML = `   
            <div class="weather-card">   
            <img src="../assets/partly-cloudy-day.png" alt="Weather Icon" class="weather-icon" /> 
            <P><strong>Address:</strong> <span id="address">${resolvedAddress}</span></P>
            <p><strong>Latitude:</strong> <span id="latitude">${latitude}</span></p>
            <p><strong>Longitude:</strong> <span id="longitude">${longitude}</span></p>
            <p><strong>Timezone:</strong> <span id="timezone">${timezone}</span></p>
            <p><strong>Description:</strong> <span id="description">${description}</span></p>
            </div>
        `;

        if (days && days.length > 0) {
            weatherHTML += '<h1>Weather Forecast</h1>';
            weatherHTML += '<div class="weather-grid">';

            days.forEach(day => {
                const { datetime, tempmax, tempmin, temp, precip, feelslike, 
                        windspeed, humidity, uvindex, conditions, sunrise, 
                        sunset, dew, snow, pressure, visibility, cloudcover, windgust} = day;
                weatherHTML += `
                    <div class="weather-card">
                    <h3><strong>Date and Time:</strong> <span id="datetime">${datetime}</span></h3>
                    <p><strong>Max Temp:</strong> <span id="tempmax">${tempmax}</span>°C</p>
                    <p><strong>Min Temp:</strong> <span id="tempmin">${tempmin}</span>°C</p>
                    <p><strong>Temperature:</strong> <span id="temp">${temp}</span>°C</p>
                    <p><strong>Precipitation:</strong> <span id="precip">${precip}</span></p>
                    <p><strong>Feels Like:</strong> <span id="feelslike">${feelslike}</span>°C</p>
                    <p><strong>Wind Speed:</strong> <span id="windspeed">${windspeed}</span></p>
                    <p><strong>Humidity:</strong> <span id="humidity">${humidity}</span></p>
                    <p><strong>UV Index:</strong> <span id="uvindex">${uvindex}</span></p>
                    <p><strong>Conditions:</strong> <span id="conditions">${conditions}</span></p>
                    <p><strong>Sunrise:</strong> <span id="sunrise">${sunrise}</span></p>
                    <p><strong>Sunset:</strong> <span id="sunset">${sunset}</span></p>
                    <p><strong>Dew Point:</strong> <span id="dew">${dew}</span></p>
                    <p><strong>Snow:</strong> <span id="snow">${snow}</span></p>
                    <p><strong>Pressure:</strong> <span id="pressure">${pressure}</span></p>
                    <p><strong>Visibility:</strong> <span id="visibility">${visibility}</span></p>
                    <p><strong>Cloud Cover:</strong> <span id="cloudcover">${cloudcover}</span></p>
                    <p><strong>Wind Gust:</strong> <span id="windgust">${windgust}</span></p>
                    
                        <p><strong>More Details:</strong> <a href="https://www.visualcrossing.com/weather-history/${resolvedAddress}/${datetime}" target="_blank">Click here</a></p>
                    </div>
                `;
            });

            weatherHTML += '</div>'; // Close weather-grid div
        }

        weatherDisplay.innerHTML = weatherHTML;
    }
});

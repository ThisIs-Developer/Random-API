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
        } 

        const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${timeFrame}?unitGroup=metric&key=${apiKey}&contentType=json`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherDisplay.innerHTML = '<p>Server is busy. Please try again later.</p>';
            });
    });

    function displayWeather(weatherData) {
        const { resolvedAddress, timezone, description, days } = weatherData;
        let weatherHTML = `
            <h2>${resolvedAddress}</h2>
            <p><strong>Timezone:</strong> ${timezone}</p>
            <p><strong>Description:</strong> ${description}</p>
        `;

        if (days && days.length > 0) {
            weatherHTML += '<h3>Weather Forecast</h3>';
            weatherHTML += '<div class="weather-grid">';

            days.forEach(day => {
                const { datetime, tempmax, tempmin, description } = day;
                weatherHTML += `
                    <div class="weather-card">
                        <p><strong>Date:</strong> ${datetime}</p>
                        <p><strong>Max Temp:</strong> ${tempmax}°C</p>
                        <p><strong>Min Temp:</strong> ${tempmin}°C</p>
                        <p><strong>Description:</strong> ${description}</p>
                        <p><strong>More Details:</strong> <a href="https://www.visualcrossing.com/weather-history/${resolvedAddress}/${datetime}" target="_blank">Click here</a></p>
                    </div>
                `;
            });

            weatherHTML += '</div>'; // Close weather-grid div
        }

        weatherDisplay.innerHTML = weatherHTML;
    }
});

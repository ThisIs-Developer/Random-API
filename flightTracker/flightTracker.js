document.addEventListener("DOMContentLoaded", function () {
    const flightForm = document.getElementById("flightForm");
    const flightResults = document.getElementById("flightResults");

    flightForm.addEventListener("submit", function (event) {
        event.preventDefault();
        fetchFlightData();
    });

    function fetchFlightData() {
        const flightNumber = document.getElementById("flightNumber").value;
        const icao24 = document.getElementById("icao24").value;

        // Constructing the API URL based on ICAO24
        const apiUrl = `https://opensky-network.org/api/states/all?icao24=${icao24}`;

        // Show loading spinner while fetching data
        flightResults.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        `;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data && data.states) {
                    displayFlightData(data.states);
                } else {
                    flightResults.innerHTML = '<p class="text-center w-100">No flight data found.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching flight data:', error);
                flightResults.innerHTML = '<p class="text-center w-100">Failed to fetch flight data. Please try again later.</p>';
            });
    }

    function displayFlightData(flights) {
        flightResults.innerHTML = '';

        if (flights.length === 0) {
            flightResults.innerHTML = '<p class="text-center w-100">No flight data found.</p>';
            return;
        }

        flights.forEach(flight => {
            const flightCard = document.createElement('div');
            flightCard.className = 'flight-card col-md-4';

            // Extract relevant fields from the flight data
            const [icao24, callsign, origin_country, time_position, last_contact, 
                   longitude, latitude, baro_altitude, on_ground, velocity, 
                   true_track, vertical_rate, sensors, geo_altitude, squawk, 
                   spi, position_source, category] = flight;

            // Constructing the HTML content for the flight card
            flightCard.innerHTML = `
                <h3>Flight: ${callsign || 'N/A'}</h3>
                <p><strong>ICAO24:</strong> ${icao24}</p>
                <p><strong>Origin Country:</strong> ${origin_country}</p>
                <p><strong>Last Position:</strong> ${latitude || 'N/A'}, ${longitude || 'N/A'}</p>
                <p><strong>Barometric Altitude:</strong> ${baro_altitude ? baro_altitude + ' m' : 'N/A'}</p>
                <p><strong>On Ground:</strong> ${on_ground ? 'Yes' : 'No'}</p>
                <p><strong>Velocity:</strong> ${velocity ? velocity + ' m/s' : 'N/A'}</p>
                <p><strong>True Track:</strong> ${true_track ? true_track + '°' : 'N/A'}</p>
                <p><strong>Vertical Rate:</strong> ${vertical_rate ? vertical_rate + ' m/s' : 'N/A'}</p>
                <p><strong>Geometric Altitude:</strong> ${geo_altitude ? geo_altitude + ' m' : 'N/A'}</p>
                <p><strong>Squawk:</strong> ${squawk || 'N/A'}</p>
                <p><strong>Position Source:</strong> ${positionSourceToString(position_source)}</p>
                <p><strong>Aircraft Category:</strong> ${aircraftCategoryToString(category)}</p>
            `;

            flightResults.appendChild(flightCard);
        });
    }

    function positionSourceToString(source) {
        switch(source) {
            case 0: return 'ADS-B';
            case 1: return 'ASTERIX';
            case 2: return 'MLAT';
            case 3: return 'FLARM';
            default: return 'Unknown';
        }
    }

    function aircraftCategoryToString(category) {
        const categories = [
            'No information',
            'No ADS-B Emitter Category Information',
            'Light (< 15500 lbs)',
            'Small (15500 to 75000 lbs)',
            'Large (75000 to 300000 lbs)',
            'High Vortex Large (e.g., B-757)',
            'Heavy (> 300000 lbs)',
            'High Performance (> 5g acceleration and 400 kts)',
            'Rotorcraft',
            'Glider / Sailplane',
            'Lighter-than-air',
            'Parachutist / Skydiver',
            'Ultralight / Hang-glider / Paraglider',
            'Reserved',
            'Unmanned Aerial Vehicle',
            'Space / Trans-atmospheric vehicle',
            'Surface Vehicle – Emergency Vehicle',
            'Surface Vehicle – Service Vehicle',
            'Point Obstacle (includes tethered balloons)',
            'Cluster Obstacle',
            'Line Obstacle'
        ];

        return categories[category] || 'Unknown';
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const fetchBtn = document.getElementById("fetchBtn");
    const factDisplay = document.getElementById("factDisplay");
    const helpBtn = document.getElementById('helpBtn');
    const gotoBtn = document.getElementById('gotoBtn');
    const closeHelp = document.getElementById('closeHelp');
    const closeHelpBtn = document.getElementById('closeHelpBtn');
    const about = document.getElementById('about');

    helpBtn.addEventListener('click', function () {
        helpBox.style.display = 'flex';
    });

    closeHelp.addEventListener('click', function () {
        helpBox.style.display = 'none';
    });

    closeHelpBtn.addEventListener('click', function () {
        helpBox.style.display = 'none';
    });

    gotoBtn.addEventListener('click', function () {
        window.open('https://cors-anywhere.herokuapp.com/corsdemo', '_blank');
    });

    fetchBtn.addEventListener("click", function () {
        fetchPetFoodFact();
    });

    function fetchPetFoodFact() {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const apiUrl = 'https://api.thecatapi.com/v1/breeds';

        fetch(proxyUrl + apiUrl)
            .then(response => response.json())
            .then(data => {
                const randomFact = data[Math.floor(Math.random() * data.length)];
                about.style.display = 'none';
                displayFact(randomFact);
            })
            .catch(error => {
                Toastify({
                    text: "Go to Help and enable CORS to fetch data.",
                    duration: 5000,
                    close: true,
                    gravity: "bottom",
                    position: "center",
                    backgroundColor: "red",
                    style: {
                      margin: '20px',
                    },
                  }).showToast();
                factDisplay.innerHTML = '<p>Failed to fetch pet food facts. Please try again later.</p>';
            });
    }

    function displayFact(fact) {
        factDisplay.innerHTML = `
            <h2>${fact.name}</h2>
            <p><strong>Description:</strong> ${fact.description}</p>
            <p><strong>Origin:</strong> ${fact.origin}</p>
            <p><strong>Weight (imperial):</strong> ${fact.weight.imperial}</p>
            <p><strong>Weight (metric):</strong> ${fact.weight.metric}</p>
            <p><strong>Life Span:</strong> ${fact.life_span} years</p>
            <p><strong>Temperament:</strong> ${fact.temperament}</p>
            <p><strong>Country Code:</strong> ${fact.country_code}</p>
            <p><strong>Adaptability:</strong> ${fact.adaptability}/5</p>
            <p><strong>Affection Level:</strong> ${fact.affection_level}/5</p>
            <p><strong>Child Friendly:</strong> ${fact.child_friendly}/5</p>
            <p><strong>Dog Friendly:</strong> ${fact.dog_friendly}/5</p>
            <p><strong>Energy Level:</strong> ${fact.energy_level}/5</p>
            <p><strong>Grooming:</strong> ${fact.grooming}/5</p>
            <p><strong>Health Issues:</strong> ${fact.health_issues}/5</p>
            <p><strong>Intelligence:</strong> ${fact.intelligence}/5</p>
            <p><strong>Shedding Level:</strong> ${fact.shedding_level}/5</p>
            <p><strong>Social Needs:</strong> ${fact.social_needs}/5</p>
            <p><strong>Stranger Friendly:</strong> ${fact.stranger_friendly}/5</p>
            <p><strong>Vocalisation:</strong> ${fact.vocalisation}/5</p>
            <p><strong>Wikipedia URL:</strong> <a href="${fact.wikipedia_url}" target="_blank">${fact.name} on Wikipedia</a></p>
        `;
    }
    
});

document.addEventListener("DOMContentLoaded", function () {
    const fetchBtn = document.getElementById("fetchBtn");
    const adviceDisplay = document.getElementById("adviceDisplay");

    fetchBtn.addEventListener("click", function () {
        fetchAdvice();
    });

    function fetchAdvice() {
        const apiUrl = 'https://api.adviceslip.com/advice';

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayAdvice(data.slip.advice);
            })
            .catch(error => {
                console.error('Error fetching advice:', error);
                adviceDisplay.innerHTML = '<p>Failed to fetch advice. Please try again later.</p>';
            });
    }

    function displayAdvice(advice) {
        adviceDisplay.innerHTML = `<p>${advice}</p>`;
    }
});

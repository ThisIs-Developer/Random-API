document.addEventListener("DOMContentLoaded", () => {
    const jokeContainer = document.getElementById("jokeContainer");
    const englishBtn = document.getElementById("englishBtn");
    const hindiBtn = document.getElementById("hindiBtn");

    englishBtn.addEventListener("click", () => {
        getJoke("english");
    });

    hindiBtn.addEventListener("click", () => {
        getJoke("hindi");
    });

    function getJoke(language) {
        let apiUrl = "";
        if (language === "english") {
            apiUrl = "https://official-joke-api.appspot.com/random_joke";
        } else if (language === "hindi") {
            apiUrl = "https://hindi-jokes-api.onrender.com/jokes?api_key=5aaa7b4e84fd18a10bd5191422c7";
        }

        jokeContainer.innerHTML = "Please wait..."; // Show "Please wait" message

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (language === "english") {
                    jokeContainer.innerHTML = `<p><strong>Setup:</strong> ${data.setup}</p>
                                               <p><strong>Punchline:</strong> ${data.punchline}</p>`;
                } else if (language === "hindi") {
                    jokeContainer.innerHTML = `<p>${data.jokeContent}</p>`;
                }
            })
            .catch(error => {
                console.error("Error fetching joke:", error);
                jokeContainer.innerHTML = "<p>Failed to fetch joke. Please try again later.</p>";
            });
    }
});

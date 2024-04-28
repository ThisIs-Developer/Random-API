document.addEventListener("DOMContentLoaded", () => {
    const factText = document.getElementById("factText");
    const getFactBtn = document.getElementById("getFactBtn");
    const loadingMessage = document.getElementById("loadingMessage");
    const copyFactBtn = document.getElementById("copyFactBtn");

    getFactBtn.addEventListener("click", () => {
        // Display "Please wait" message
        loadingMessage.style.display = "block";
        copyFactBtn.style.display = "none"; // Hide the copy button while fetching

        fetch("https://catfact.ninja/fact")
            .then(response => response.json())
            .then(data => {
                factText.innerText = data.fact;
                copyFactBtn.style.display = "inline-block"; // Show the copy button after fact is fetched
            })
            .catch(error => {
                factText.innerText = "Error fetching data.";
                console.error("Error fetching data:", error);
            })
            .finally(() => {
                loadingMessage.style.display = "none";
            });
    });

    copyFactBtn.addEventListener('click', function () {
        const textToCopy = factText.innerText;
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                copyFactBtn.innerText = 'Copied!';
            setTimeout(() => {
                copyFactBtn.innerText = 'Copy';
            }, 3000);
            })
            .catch(err => {
            console.error('Failed to copy: ', err);
            });
    });
});

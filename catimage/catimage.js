document.addEventListener("DOMContentLoaded", function() {
    const getCatBtn = document.getElementById("getCatBtn");
    const downloadBtn = document.getElementById("downloadBtn");
    const waitMessage = document.getElementById("waitMessage");
    const catImageContainer = document.getElementById("catImageContainer");

    if (getCatBtn) {
        getCatBtn.addEventListener("click", fetchRandomCat);
    }

    function fetchRandomCat() {
        waitMessage.style.display = "block";
        downloadBtn.style.display = "none";
        catImageContainer.innerHTML = "";

        fetch("https://api.thecatapi.com/v1/images/search")
            .then(response => response.json())
            .then(data => {
                const catImageUrl = data[0].url;

                const img = document.createElement("img");
                img.src = catImageUrl;
                img.alt = "Random Cat";
                
                catImageContainer.appendChild(img);
                waitMessage.style.display = "none";
                downloadBtn.style.display = "inline-block";

                downloadBtn.onclick = () => downloadImage(catImageUrl);
            })
            .catch(error => {
                console.error("Error fetching cat image:", error);
                waitMessage.style.display = "none";
                catImageContainer.innerHTML = "<p>Failed to load cat image. Please try again.</p>";
            });
    }

    function downloadImage(url) {
        const a = document.createElement("a");
        a.href = url;
        a.download = "random_cat.jpg";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
});

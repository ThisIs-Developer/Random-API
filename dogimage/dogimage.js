document.addEventListener("DOMContentLoaded", () => {
    const dogImageContainer = document.getElementById("dogImageContainer");
    const getDogBtn = document.getElementById("getDogBtn");
    const waitMessage = document.getElementById("waitMessage");
    const downloadBtn = document.getElementById("downloadBtn");

    getDogBtn.addEventListener("click", () => {
        waitMessage.style.display = "block"; // Show "Please wait" message
        downloadBtn.style.display = "none"; // Hide download button while fetching

        fetch("https://dog.ceo/api/breeds/image/random")
            .then(response => response.json())
            .then(data => {
                waitMessage.style.display = "none"; // Hide "Please wait" message

                if (data.status === "success") {
                    const imageUrl = data.message;
                    const imageElement = document.createElement("img");
                    imageElement.src = imageUrl;
                    imageElement.alt = "Random Dog";
                    dogImageContainer.innerHTML = "";
                    dogImageContainer.appendChild(imageElement);

                    downloadBtn.style.display = "inline-block";
                    downloadBtn.addEventListener("click", () => {
                        downloadImage(imageUrl);
                    });
                } else {
                    throw new Error("Failed to fetch dog image.");
                }
            })
            .catch(error => {
                console.error("Error fetching dog image:", error);
                waitMessage.style.display = "none";
                dogImageContainer.innerHTML = "<p>Failed to fetch dog image. Please try again later.</p>";
            });
    });

    function downloadImage(imageUrl) {
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = "random_dog_image.jpg";
        link.target = "_blank"
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});

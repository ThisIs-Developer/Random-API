document.addEventListener("DOMContentLoaded", function () {
    const fetchBtn = document.getElementById("fetchBtn");
    const comicImg = document.getElementById("comicImg");
    const comicTitle = document.getElementById("comicTitle");
    const loading = document.getElementById("loading");
    const slogan = document.querySelector(".slogan");

    fetchBtn.addEventListener("click", function () {
        fetchRandomComic();
    });

    function fetchRandomComic() {
        loading.style.display = "block";
        comicImg.style.display = "none";
        comicTitle.style.display = "none";
        slogan.style.display = "none";

        const proxyUrl = 'https://api.allorigins.win/get?url=';
        const latestComicUrl = 'https://xkcd.com/info.0.json';

        fetch(proxyUrl + encodeURIComponent(latestComicUrl))
            .then(response => response.json())
            .then(data => {
                const latestComic = JSON.parse(data.contents);
                const maxNum = latestComic.num;
                const randomNum = Math.floor(Math.random() * maxNum) + 1;
                return fetch(proxyUrl + encodeURIComponent(`https://xkcd.com/${randomNum}/info.0.json`));
            })
            .then(response => response.json())
            .then(data => {
                const comic = JSON.parse(data.contents);
                displayComic(comic);
                loading.style.display = "none";
            })
            .catch(error => {
                console.error('Error fetching comic:', error);
                comicTitle.innerHTML = '<p>Failed to fetch comic. Please try again later.</p>';
                comicImg.src = '';
                comicImg.alt = '';
                loading.style.display = "none";
            });
    }

    function displayComic(comic) {
        comicImg.src = comic.img;
        comicImg.alt = comic.alt;
        comicTitle.innerHTML = `<strong>${comic.safe_title}</strong>`;
        comicImg.style.display = "block";
        comicTitle.style.display = "block";
    }
});

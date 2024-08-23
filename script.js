document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
      document.querySelector(".preloader").classList.add("fade-out");
  }, 1500);
  setTimeout(function () {
    document.querySelector(".fixed-header").style.display = "flex";
      document.querySelector(".preloader").style.display = "none";
  }, 1500);
});
  
  document.getElementById('colorBtn').addEventListener('click', () => {
    window.open('color/color.html', '_blank');
  });
  
  document.getElementById('catFactBtn').addEventListener('click', () => {
    window.open('catfact/catfact.html', '_blank');
  });
  
  document.getElementById('dogImageBtn').addEventListener('click', () => {
    window.open('dogimage/dogimage.html', '_blank');
  });
  
  document.getElementById('activityBtn').addEventListener('click', () => {
    window.open('activity/activity.html', '_blank');
  });
  
  document.getElementById('jokesBtn').addEventListener('click', () => {
    window.open('jokes/jokes.html', '_blank');
  });
  
  document.getElementById('rollDiceBtn').addEventListener('click', () => {
    window.open('diceRoller/diceRoller.html', '_blank');
  });

  document.getElementById('passwordBtn').addEventListener('click', () => {
    window.open('passwordGen/passwordGen.html', '_blank');
  });

  document.getElementById('weatherBtn').addEventListener('click', () => {
    window.open('weather/weather.html', '_blank');
  });

  document.getElementById('universityBtn').addEventListener('click', () => {
    window.open('university/university.html', '_blank');
  });

  document.getElementById('petfinderBtn').addEventListener('click', () => {
    window.open('petfinder/petfinder.html', '_blank');
  });

  document.getElementById('catImageBtn').addEventListener('click', () => {
    window.open('catimage/catimage.html', '_blank');
  });

  document.getElementById('booklibraryBtn').addEventListener('click', () => {
    window.open('library/library.html', '_blank');
  });

  document.getElementById('spacexBtn').addEventListener('click', () => {
    window.open('spacex-launches/spacex-launches.html', '_blank');
  });

  document.getElementById('cryptoBtn').addEventListener('click', () => {
    window.open('cryptocurrency/cryptocurrency.html', '_blank');
  });

  document.getElementById('adviceBtn').addEventListener('click', () => {
    window.open('advice/advice.html', '_blank');
  });

  document.getElementById('comicBtn').addEventListener('click', () => {
    window.open('comics/comics.html', '_blank');
  });

  document.getElementById('pokemonBtn').addEventListener('click', () => {
    window.open('pokemon/pokemon.html', '_blank');
  });

  document.getElementById('recipeBtn').addEventListener('click', () => {
    window.open('recipeFinder/recipeFinder.html', '_blank');
  });
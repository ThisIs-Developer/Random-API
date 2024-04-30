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
document.addEventListener("DOMContentLoaded", () => {
    const dice = document.getElementById("dice");
    const rollBtn = document.getElementById("rollBtn");

    rollBtn.addEventListener("click", () => {
        dice.style.animation = "none";
        void dice.offsetWidth;
        dice.style.animation = "rollAnimation 1s ease-out forwards";

        setTimeout(() => {
            const randomNumber = Math.floor(Math.random() * 6) + 1;
            updateDiceNumber(randomNumber);
        }, 1000);
    });

    function updateDiceNumber(number) {
        const numberElements = dice.querySelectorAll('.number');
        numberElements.forEach(element => {
            element.textContent = number;
        });
    }
});

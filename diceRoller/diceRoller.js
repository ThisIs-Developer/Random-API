document.addEventListener("DOMContentLoaded", () => {
    const dice = document.getElementById("dice");
    const rollBtn = document.getElementById("rollBtn");

    rollBtn.addEventListener("click", () => {
        dice.style.animation = "none";
        void dice.offsetWidth;
        dice.style.animation = "rollAnimation 1s ease-out forwards";

        fetch("https://www.random.org/integers/?num=1&min=1&max=6&col=1&base=10&format=plain&rnd=new")
            .then(response => response.text())
            .then(randomNumber => {
                const parsedNumber = parseInt(randomNumber.trim());
                if (!isNaN(parsedNumber) && parsedNumber >= 1 && parsedNumber <= 6) {
                    updateDiceNumber(parsedNumber);
                } else {
                    throw new Error("Invalid random number received");
                }
            })
            .catch(error => {
                console.error("Error fetching random number:", error);
                // Fallback to local random number generation
                const localRandomNumber = Math.floor(Math.random() * 6) + 1;
                updateDiceNumber(localRandomNumber);
                showToast("Failed to fetch random number. Using local random number instead.", "error");
            });
    });

    function updateDiceNumber(number) {
        const numberElements = dice.querySelectorAll('.number span');
        numberElements.forEach(element => {
            element.textContent = number;
        });
    }

    function showToast(message, type) {
        Toastify({
            text: message,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            backgroundColor: type === "error" ? "red" : "green"
        }).showToast();
    }
});

const btn = document.querySelector('.btn');
const copyBtn = document.querySelector('.btn1');
const resetBtn = document.querySelector('.btn2');

btn.addEventListener('click', function () {
    const h2 = document.querySelector('h2');
    let randomColor = getRandomColor();
    h2.innerText = randomColor;

    copyBtn.addEventListener('click', function () {
        const textToCopy = h2.innerText;
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
            copyBtn.innerText = 'Copied!';
            setTimeout(() => {
                copyBtn.innerText = 'Copy';
            }, 3000);
            })
            .catch(err => {
            console.error('Failed to copy: ', err);
            });
    });

    resetBtn.addEventListener('click', function () {
        window.location.reload();
    });

    const div = document.querySelector('div');
    div.style.backgroundColor = randomColor;
}); 

function getRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}
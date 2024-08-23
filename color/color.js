const btn = document.querySelector('.btn');
const copyBtns = document.querySelectorAll('.copyBtn');
const resetBtn = document.querySelector('.btn2');
const colourbox = document.querySelector('.colourbox');
const rgbColor = document.getElementById('rgbColor');
const hexColor = document.getElementById('hexColor');
const hslColor = document.getElementById('hslColor');
const hslaColor = document.getElementById('hslaColor');
const rgbaColor = document.getElementById('rgbaColor');

btn.addEventListener('click', function () {
    let randomColor = getRandomColor();
    updateColorDisplay(randomColor);
});

resetBtn.addEventListener('click', function () {
    window.location.reload();
});

copyBtns.forEach((copyBtn) => {
    copyBtn.addEventListener("click", function () {
      const textToCopy = this.previousElementSibling.innerText;
      if (textToCopy) {
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            this.innerText = "Copied!";
            setTimeout(() => {
              this.innerText = "Copy " + this.dataset.format.toUpperCase();
            }, 3000);
          })
          .catch((err) => {
            console.error("Failed to copy: ", err);
          });
      }
    });
  });

function getRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}

function updateColorDisplay(color) {
    colourbox.style.backgroundColor = color;
    rgbColor.innerText = color;
    hexColor.innerText = rgbToHex(color);
    hslColor.innerText = rgbToHsl(color);
    hslaColor.innerText = rgbToHsla(color);
    rgbaColor.innerText = color.replace('rgb', 'rgba').replace(')', ', 1)');
}

function rgbToHex(rgb) {
    const [r, g, b] = rgb.match(/\d+/g);
    return '#' + ((1 << 24) + (+r << 16) + (+g << 8) + +b).toString(16).slice(1);
}

function rgbToHsl(rgb) {
    const [r, g, b] = rgb.match(/\d+/g).map(Number);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    
    return `hsl(${h}, ${s}%, ${l}%)`;
}

function rgbToHsla(rgb) {
    const hsl = rgbToHsl(rgb);
    return hsl.replace('hsl', 'hsla').replace(')', ', 1)');
}

document.addEventListener('DOMContentLoaded', function() {
    const helpBtn = document.getElementById('helpBtn');
    const overlay = document.getElementById('overlay');
    const closeBtn = overlay.querySelector('.close');

    helpBtn.addEventListener('click', function() {
        overlay.style.display = 'block';
    });

    closeBtn.addEventListener('click', function() {
        overlay.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === overlay) {
            overlay.style.display = 'none';
        }
    });
});

/* Variables */
const alphaSlider = document.querySelector('#alpha input[type="range"]');
const alphaValue = document.querySelector('#alpha output');
const alphaImage = document.querySelector('#alpha-img');
const betaSlider = document.querySelector('#beta input[type="range"]');
const betaValue = document.querySelector('#beta output');
const betaImage = document.querySelector('#beta-img');
const gammaSlider = document.querySelector('#gamma input[type="range"]');
const gammaValue = document.querySelector('#gamma output');
const gammaImage = document.querySelector('#gamma-img');
const statusMsg = document.querySelector('#status');

const roboImage = document.querySelector('#robo-image');
const wordInput = document.querySelector('#word-input');

/* Functions */
function error() {
    statusMsg.textContent = "Device orientation API is not supported by your browser.";
}

function fetchRoboImage(word) {
    fetch(`https://robohash.org/${word}.png`)
        .then(response => {
            if (response.ok) {
                return response.blob();
            }
            throw new Error('Network response was not ok.');
        })
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);
            roboImage.src = imageUrl;
            roboImage.style.display = 'block';
        })
        .catch(error => {
            console.error('There was a problem with fetching the image:', error);
        });
}

/* Script Logic */
if (!window.DeviceOrientationEvent) {
    error();
} else {
    window.addEventListener("deviceorientation", function (event) {
        alphaValue.textContent = Math.round(event.alpha) + "°";
        alphaSlider.value = Math.round(event.alpha);
        
        betaValue.textContent = Math.round(event.beta) + "°";
        betaSlider.value = Math.round(event.beta);
        
        gammaValue.textContent = Math.round(event.gamma) + "°";
        gammaSlider.value = Math.round(event.gamma);
    });
}

// Listen for input events on the word input field
wordInput.addEventListener('input', (event) => {
    const word = event.target.value.trim();
    if (word.length > 0 && !word.includes(' ')) {
        fetchRoboImage(word);
    } else {
        roboImage.style.display = 'none';
    }
});

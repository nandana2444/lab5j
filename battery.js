/* Variables */
const chargeStatus = document.querySelector('#battery dd:nth-of-type(1)');
const chargeLevel = document.querySelector('#battery dd:nth-of-type(2) output');
const chargeMeter = document.querySelector('#battery dd:nth-of-type(2) progress');
const roboImage = document.querySelector('#robo-image');
const wordInput = document.querySelector('#word-input');

/* Functions */
function updateBatteryStatus(battery) {
    // Update charging status
    if (battery.charging === true) {
        chargeStatus.textContent = "Charging...";
    } else {
        chargeStatus.textContent = "Discharging...";
    }
    
    // Update charge level
    const percentage = (battery.level * 100).toFixed(0);
    chargeLevel.textContent = percentage + "%";
    chargeMeter.value = percentage;
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

navigator.getBattery().then(battery => {
    updateBatteryStatus(battery);
    
    // Event listeners for changes to the charging status and charge level
    battery.addEventListener("chargingchange", () => {
        updateBatteryStatus(battery);
    });
    
    battery.addEventListener("levelchange", () => {
        updateBatteryStatus(battery);
    });
});

// Listen for input events on the word input field
wordInput.addEventListener('input', (event) => {
    const word = event.target.value.trim();
    if (word.length > 0 && !word.includes(' ')) {
        fetchRoboImage(word);
    } else {
        roboImage.style.display = 'none';
    }
});

/* Device Orientation Logic */
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

function error() {
    statusMsg.textContent = "Device orientation API is not supported by your browser.";
}

if (!window.DeviceOrientationEvent) {
    error();
} else {
    window.addEventListener("deviceorientation", function (event) {
        alphaValue.textContent = Math.round(event.alpha) + "°";
        alphaSlider.value = Math.round(event.alpha);
        alphaImage.style.transform = `rotate(${event.alpha}deg)`;
        
        betaValue.textContent = Math.round(event.beta) + "°";
        betaSlider.value = Math.round(event.beta);
        betaImage.style.transform = `rotate(${event.beta}deg)`;
        
        gammaValue.textContent = Math.round(event.gamma) + "°";
        gammaSlider.value = Math.round(event.gamma);
        gammaImage.style.transform = `rotate(${event.gamma}deg)`;
    });
}

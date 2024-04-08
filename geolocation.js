/* Variables */
const latitude = document.querySelector('#latlong dd:nth-of-type(1)');
const longitude = document.querySelector('#latlong dd:nth-of-type(2)');
const statusMsg = document.querySelector('#status');
const mapLink = document.querySelector('#mapLink');
const wordInput = document.querySelector('#word-input');
const wordImage = document.querySelector('#word-image');

/* Functions */
function success(position) {
    statusMsg.textContent = "We found you!";
    console.log(position);
    
    // Display latitude and longitude
    latitude.textContent = position.coords.latitude + "°";
    longitude.textContent = position.coords.longitude + "°";
    
    // Build the link to OpenStreetMap
    const url = `https://www.openstreetmap.org/#map=18/${position.coords.latitude}/${position.coords.longitude}`;
    mapLink.setAttribute("href", url);
    mapLink.setAttribute("target", "_blank");
    mapLink.textContent = "Open on Map";
}

function error() {
    // Display error message if geolocation fails
    statusMsg.textContent = "Sorry! Not able to find your location.";
}

function fetchWordImage(word) {
    fetch(`https://robohash.org/${word}.png`)
        .then(response => {
            if (response.ok) {
                return response.blob();
            }
            throw new Error('Network response was not ok.');
        })
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);
            console.log('Image URL:', imageUrl);
            wordImage.src = imageUrl;
            console.log('Image source:', wordImage.src);
        })
        .catch(error => {
            console.error('There was a problem with fetching the image:', error);
        });
}

/* Script Logic */
if (!navigator.geolocation) {
    // Geolocation not supported
    statusMsg.textContent = "Geolocation is not supported by your browser!";
} else {
    // Geolocation is supported
    statusMsg.textContent = "Loading...";
    navigator.geolocation.getCurrentPosition(success, error);
}

// Listen for input events on the word input field
wordInput.addEventListener('input', (event) => {
    const word = event.target.value.trim();
    if (word.length > 0 && !word.includes(' ')) {
        console.log('Fetching image for word:', word);
        fetchWordImage(word);
    } else {
        wordImage.src = ''; // Clear the image if the input is invalid
    }
});

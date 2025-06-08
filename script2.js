let isSpeaking = false; // Track whether the speech synthesis is currently active
         
function readTextAloud() {
    if (isSpeaking) {
        window.speechSynthesis.cancel(); // Stop any ongoing speech
        isSpeaking = false; // Update the state to not speaking
    } else {
        const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span,a, button,span');
        const utterance = new SpeechSynthesisUtterance();
        
        // Combine text content of selected elements into a single string
        utterance.text = Array.prototype.map.call(textElements, (element) => element.textContent).join(' ');
        utterance.voice = window.speechSynthesis.getVoices()[0]; // Set the voice (default)
        utterance.lang = 'en-US'; // Set language

        // Event listener to update the speaking state when the speech starts or ends
        utterance.onstart = function() {
            isSpeaking = true; // Update state to speaking
        };
        
        utterance.onend = function() {
            isSpeaking = false; // Update state to not speaking when finished
        };

        // Start speaking
        window.speechSynthesis.speak(utterance);
    }
}

// Event listener for the screen reader button
const screenReaderButton = document.getElementById('screen-reader-button');
screenReaderButton.addEventListener('click', readTextAloud);
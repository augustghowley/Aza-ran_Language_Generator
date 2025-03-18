// Load words from data_words.json
let words = {};
fetch('data_words.json')
    .then(response => response.json())
    .then(data => words = data)
    .catch(error => console.error('Error loading words:', error));

// Select the necessary NPC elements
const npcImage = document.getElementById('npcImage'); // Assuming this image is dynamic if you're using it
const npcContainer = document.getElementById('npc');
const greetingText = "Greetings! My name is Lah-psah. My pronouns are Aknah, Aknath, and Aknadd. I am your guide for creating the Aza'ran language, and hearing how words are pronounced!";

// Function to speak text with different frequencies
function speak(text, mood) {
    const utterance = new SpeechSynthesisUtterance(text);
    let voices = speechSynthesis.getVoices();

    if (!voices.length) {
        speechSynthesis.onvoiceschanged = () => {
            voices = speechSynthesis.getVoices();
            utterance.voice = voices.find(voice => voice.name.includes('Google US English') || voice.name.includes('Androgynous')); // Choose an appropriate voice
            setUtteranceProperties(utterance, mood);
            speechSynthesis.speak(utterance);
        };
    } else {
        utterance.voice = voices.find(voice => voice.name.includes('Google US English') || voice.name.includes('Androgynous')); // Choose an appropriate voice
        setUtteranceProperties(utterance, mood);
        speechSynthesis.speak(utterance);
    }
}

function setUtteranceProperties(utterance, mood) {
    // Set pitch and rate based on mood
    switch(mood) {
        case 'happy':
            utterance.pitch = 1.5;
            utterance.rate = 1.2;
            break;
        case 'sad':
            utterance.pitch = 0.8;
            utterance.rate = 0.9;
            break;
        case 'neutral':
            utterance.pitch = 1;
            utterance.rate = 1;
            break;
        case 'excited':
            utterance.pitch = 1.8;
            utterance.rate = 1.3;
            break;
        default:
            utterance.pitch = 1;
            utterance.rate = 1;
    }
}

// Function to greet the player
function greet() {
    speak(greetingText, 'neutral'); // Use neutral mood for greeting
}

// Idle animations function
function performIdleAnimation() {
    const animations = ['sneeze', 'scratch', 'giggle', 'wave', 'blowKiss', 'shiftWeight', 'lookBored'];
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
            
    npcContainer.classList.add(randomAnimation);
    setTimeout(() => {
        npcContainer.classList.remove(randomAnimation);
    }, 2000); // Animation duration
}

// Set greeting and idle animation on load
window.onload = () => {
    greet();
    setInterval(() => {
        performIdleAnimation();
    }, 5000); // Change animation every 5 seconds
};
// Fetch and use data from data_words.json
fetch('data_words.json')
    .then(response => response.json())
    .then(data => {
        const talkButton = document.getElementById('talkButton');
        let currentPhrase = "";

        // Function to speak a random phrase
        function speakRandomPhrase() {
            const phrases = data.phrases;
            currentPhrase = phrases[Math.floor(Math.random() * phrases.length)];
            const utterance = new SpeechSynthesisUtterance(currentPhrase);
            utterance.voice = speechSynthesis.getVoices().find(voice => voice.name === 'Google US English');
            speechSynthesis.speak(utterance);
        }

        // Event listener for the talk button
        talkButton.addEventListener('click', speakRandomPhrase);
    })
    .catch(error => {
        console.error('Error loading data_words.json:', error);
    });
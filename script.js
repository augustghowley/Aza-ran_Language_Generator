// Wait for the document to load
document.addEventListener('DOMContentLoaded', function () {
    // Load necessary files
    loadFiles();

    // Setup modules (placeholders)
    setupModules();
});

// Function to load necessary files (data files and CSS)
function loadFiles() {
    // Load CSS file dynamically
    loadCSS('style.css');

    // Load JSON files dynamically
    Promise.all([
        loadJSON('data_alphabet.json'),
        loadJSON('data_rules.json'),
        loadJSON('data_words.json')
    ])
    .then(data => {
        console.log('Data loaded successfully');
        // Use the data as needed here (alphabetData, rulesData, wordsData)
    })
    .catch((error) => {
        console.error('Error loading JSON data:', error);
        alert('An error occurred while loading the data files. Please try again later.');
    });
}

// Function to dynamically load a CSS file
function loadCSS(filePath) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = filePath;
    link.type = 'text/css';
    document.head.appendChild(link);
}

// Function to load a JSON file
function loadJSON(filePath) {
    return new Promise((resolve, reject) => {
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    reject('Failed to load ' + filePath);
                } else {
                    response.json().then(resolve).catch(reject);
                }
            })
            .catch(reject);
    });
}
document.addEventListener('DOMContentLoaded', function () {
    // Setup the starry sky elements
    setupStarrySky();

    // Setup modules (placeholders)
    setupModules();
});

// Function to setup the starry sky background
function setupStarrySky() {
    const starContainer = document.querySelector('.star-container');
    if (starContainer) {
        // Create multiple stars
        createStars(starContainer);

        // Create shooting stars at intervals
        setInterval(() => createShootingStar(starContainer), 5000);

        // Create comets
        setInterval(() => createComet(starContainer), 8000);
    }
}

// Function to create random stars
function createStars(container) {
    const numberOfStars = 100; // Number of stars to create
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        // Set random position for each star
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${Math.random() * 2 + 2}s`; // Random twinkle speed
        container.appendChild(star);
    }
}

// Function to create a shooting star
function createShootingStar(container) {
    const shootingStar = document.createElement('div');
    shootingStar.classList.add('shooting-star');
    shootingStar.style.top = `${Math.random() * 50}vh`;
    shootingStar.style.left = `-${Math.random() * 20}vw`; // Start from left offscreen
    container.appendChild(shootingStar);

    // Remove the shooting star after animation completes
    setTimeout(() => shootingStar.remove(), 2000);
}

// Function to create a comet
function createComet(container) {
    const comet = document.createElement('div');
    comet.classList.add('comet');
    comet.style.top = `${Math.random() * 100}vh`;
    comet.style.left = `100vw`; // Start offscreen to the right
    container.appendChild(comet);

    // Remove the comet after animation completes
    setTimeout(() => comet.remove(), 4000);
}
// Function to setup the module placeholders
function setupModules() {
    createHeadingModule();
    createVideoModule();
    createAudioModule();
    createWordGeneratorModule();
    createDictionaryModule();
    createFooterModule();
}

// Function to create Heading Module
function createHeadingModule() {
    const heading = document.querySelector('div.header');
    if (heading) {
        heading.innerHTML = `
            <h1>Aza'ran Fantasy Language Generator</h1>
            <h2>About the Project</h2>
            <p>Help me generate a dictionary using my generator and be a part of a creative project!</p>
        `;
    } else {
        console.error('Header module not found.');
    }
}

// Function to create Video Module
function createVideoModule() {
    const videoModule = document.querySelector('.video-module');
    if (videoModule) {
        videoModule.innerHTML = `
            <h3>Welcome to Aza'ran</h3>
            <video controls>
                <source src="npc.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <div class="subtitles">
                <p>Aza'ran Greeting: 𐡍𐡀𐡌𐡍𐡀! 𐡇𐡉 𐡋𐡀𐡑𐡎𐡀 𐡉𐡇𐡋 𐡉𐡊𐡓 𐡏𐡊𐡍𐡀.</p>
                <p>𐡇𐡉 𐡏𐡊𐡍𐡀 𐡉𐡇𐡋 𐡏𐡊𐡍𐡀, 𐡏𐡊𐡍𐡀𐡕, 𐡏𐡊𐡍𐡀𐡑.</p>
                <p>English Translation: "Greetings! My name is Lah-psah. My pronouns are Aknah (subject), Aknath (object), and Aknadd (possessive)."</p>
            </div>
        `;
    } else {
        console.error('Video module not found.');
    }
}

// Create Audio Module
function createAudioModule() {
    const audioModule = document.querySelector('.audio-module');
    if (audioModule) {
        audioModule.innerHTML = `
            <h3>Audio Module</h3>
            <p>Click on any word in the dictionary to hear its pronunciation.</p>
            <div class="audio-controls">
                <button onclick="stopOscillator()">Stop Sound</button>
            </div>
        `;
    } else {
        console.error('Audio module not found.');
    }
}

// Store the oscillator instance globally
let oscillator;
let audioContext;

// Function to stop the current oscillator sound
function stopOscillator() {
    if (oscillator) {
        oscillator.stop();
        oscillator = null;
    }
    if (audioContext) {
        audioContext.close();
        audioContext = null;
    }
}

// Function to play audio for the selected Aza'ran word and its English meaning
function playAudio(azaWord, englishMeaning, category) {
    // Start the audio context and oscillator for pronunciation
    audioContext = new (window.AudioContext)();

    // Set up oscillator frequency for the word's category
    const frequency = wordTypeFrequencies[category].frequency;
    oscillator = audioContext.createOscillator();
    oscillator.type = wordTypeFrequencies[category].type; // Sine, Square, etc.
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // Set frequency

    // Start the oscillator
    oscillator.start();

    // Set the oscillator to stop after 1.5 seconds (representing the word's pronunciation)
    oscillator.stop(audioContext.currentTime + 1.5);

    // Pronounce the word with a delay for the oscillator
    setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(azaWord);
        utterance.rate = 0.8; // Slow pronunciation
        speechSynthesis.speak(utterance);

        // After the Aza'ran word is pronounced, say the English meaning
        utterance.onend = () => {
            const meaningUtterance = new SpeechSynthesisUtterance(englishMeaning);
            meaningUtterance.rate = 0.9; // Slightly faster for meaning
            speechSynthesis.speak(meaningUtterance);
        };
    }, 1500); // Delay for the pronunciation
}

// Function to create Dictionary Module
function createDictionaryModule() {
    const dictionaryModule = document.querySelector('.dictionary-module');
    if (dictionaryModule) {
        dictionaryModule.innerHTML = `
            <h3 class="moduleHead">Dictionary Module</h3>
            <div class="dictionary-box">
                <div class="filterButtons">
                    <button onclick="loadWords('adjectives')">Adjectives</button>
                    <button onclick="loadWords('adverbs')">Adverbs</button>
                    <button onclick="loadWords('conjunctions')">Conjunctions</button>
                    <button onclick="loadWords('interjections')">Interjections</button>
                    <button onclick="loadWords('nouns')">Nouns</button>
                    <button onclick="loadWords('prepositions')">Prepositions</button>
                    <button onclick="loadWords('pronouns_and_genders')">Pronouns & Genders</button>
                    <button onclick="loadWords('verbs')">Verbs</button>
                </div>
                <div class="wordList" id="wordList">
                    <ul id="wordListContent">
                        <!-- Dynamic content will be loaded here -->
                    </ul>
                </div>
            </div>
        `;
    } else {
        console.error('Dictionary module not found.');
    }
}

// Function to load words based on category
function loadWords(category) {
    // Fetch words from data_words.json for the selected category
    fetch('data_words.json')
        .then(response => response.json())
        .then(() => {
            const words = data[category] || [];
            const wordListContent = document.getElementById('wordListContent');
            wordListContent.innerHTML = ''; // Clear the current list
            
            words.sort((a, b) => a.word.localeCompare(b.word)); // Sort words in Aza'ran alphabetical order

            // Display words in list
            words.forEach(word => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <span class="word" onclick="playAudio('${word.word}', '${word.english}', '${word.category}')">
                        <strong>${word.category}:</strong> ${word.word} (${word.english})
                    </span>
                `;
                wordListContent.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error loading words:', error));
}

// Example of word category frequencies (already provided)
const wordTypeFrequencies = {
    adjectives: { type: 'sine', frequency: 200 },
    adverbs: { type: 'triangle', frequency: 220 },
    conjunctions: { type: 'square', frequency: 240 },
    interjections: { type: 'sawtooth', frequency: 260 },
    nouns: { type: 'sine', frequency: 280 },
    prepositions: { type: 'triangle', frequency: 300 },
    pronouns_and_genders: { type: 'sawtooth', frequency: 270 },
    verbs: { type: 'sawtooth', frequency: 340 },
};

// CSS code moved to a separate file

// Function to create Word Generator Module
function createWordGeneratorModule() {
    const wordGeneratorModule = document.querySelector('.word-generator-module');
    if (wordGeneratorModule) {
        wordGeneratorModule.innerHTML = `
            <h3>Auto-Generate Words for Aza'ran Dictionary</h3>
            <p class="instructions">Click a button to generate a new word in the selected category:</p>
            <button class="category-button" id="generateAdjective">Generate Adjective</button>
            <button class="category-button" id="generateAdverb">Generate Adverb</button>
            <button class="category-button" id="generateConjunction">Generate Conjunction</button>
            <button class="category-button" id="generateInterjection">Generate Interjection</button>
            <button class="category-button" id="generateNoun">Generate Noun</button>
            <button class="category-button" id="generatePreposition">Generate Preposition</button>
            <button class="category-button" id="generateVerb">Generate Verb</button>
            <p class="note">*Note: Generated words will be added to the corresponding category in the dictionary and must be unique, based on rules from data_rules.json. Please refer to data_alphabet.json for the alphabetical order during generation.*</p>
        `;

        // Attach event listeners to category buttons
        document.getElementById('generateAdjective').addEventListener('click', () => generateWord('adjectives'));
        document.getElementById('generateAdverb').addEventListener('click', () => generateWord('adverbs'));
        document.getElementById('generateConjunction').addEventListener('click', () => generateWord('conjunctions'));
        document.getElementById('generateInterjection').addEventListener('click', () => generateWord('interjections'));
        document.getElementById('generateNoun').addEventListener('click', () => generateWord('nouns'));
        document.getElementById('generatePreposition').addEventListener('click', () => generateWord('prepositions'));
        document.getElementById('generateVerb').addEventListener('click', () => generateWord('verbs'));
    } else {
        console.error('Word generator module not found.');
    }
}

// Function to generate a new word based on the selected category
function generateWord(category) {
    // Fetch data from data_alphabet.json, data_rules.json, and data_words.json
    Promise.all([
        fetch('data_alphabet.json').then(response => response.json()),
        fetch('data_rules.json').then(response => response.json()),
        fetch('data_words.json').then(response => response.json())
    ])
    .then(([alphabetData, rulesData, wordsData]) => {
        // Get the available letters for the category from data_alphabet.json
        const availableLetters = alphabetData[category];
        const wordRules = rulesData[category];
        const existingWords = wordsData[category] || [];
        
        // Generate a new word based on the available letters and rules
        const newWord = generateNewWord(availableLetters, wordRules);

        // Check if the generated word already exists
        if (existingWords.some(word => word.word === newWord)) {
            alert('This word already exists. Generating a new one.');
            return generateWord(category); // Retry if duplicate
        }

        // Add the new word to the dictionary
        const newWordData = {
            word: newWord,
            category: category,
            english: wordRules[newWord].english,  // Fetch corresponding English meaning from rulesData
        };

        // Sort the category alphabetically and add the new word
        existingWords.push(newWordData);
        existingWords.sort((a, b) => a.word.localeCompare(b.word));

        // Update data_words.json with the new word
        wordsData[category] = existingWords;

        // Save the updated dictionary to the server (or local storage)
        saveWordsData(wordsData);

        // Update the dictionary module UI with the new word
        updateDictionaryModule(category, existingWords);
    })
    .catch(error => console.error('Error generating word:', error));
}

// Function to generate a new word based on available letters and rules
function generateNewWord(availableLetters, wordRules) {
    const randomLetter = availableLetters[Math.floor(Math.random() * availableLetters.length)];
    const randomSyllable = wordRules[randomLetter];  // Use the rules to form a valid word

    // Combine syllables or letters to form the word (adjust based on your rule structure)
    const word = randomSyllable[0] + randomSyllable[1];  // Example: simple two-syllable combination

    return word;
}

// Function to save the updated data to the server or storage
function saveWordsData(updatedData) {
    fetch('save_words.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => response.json())
    .then(() => {
        console.log('Words data updated successfully');
    })
    .catch(error => console.error('Error saving words data:', error));
}

// Function to update the dictionary module with the new word
function updateDictionaryModule(category, wordsList) {
    const dictionaryList = document.getElementById('wordListContent');

    // Clear the current list and repopulate it
    const filteredWords = wordsList.filter(word => word.category === category);
    filteredWords.sort((a, b) => a.word.localeCompare(b.word));

    dictionaryList.innerHTML = '';
    filteredWords.forEach(word => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="word" onclick="playAudio('${word.word}', '${word.english}')">
                <strong>${word.category}:</strong> ${word.word} (${word.english})
            </span>
        `;
        dictionaryList.appendChild(listItem);
    });
}

// Function to play audio for the selected word
function playAudio(azaWord, englishMeaning) {
    const audio = new Audio(`path/to/audio/${azaWord}.mp3`); // Path to the audio file for the Aza'ran word
    audio.play();

    // Optionally, you can have a callback after audio ends to show the English meaning
    audio.onended = function() {
        alert(`The meaning of the word is: ${englishMeaning}`);
    };
}

// Function to create Dictionary Module
function createDictionaryModule() {
    const dictionaryModule = document.querySelector('.dictionary-module');
    if (dictionaryModule) {
        dictionaryModule.innerHTML = `
            <h3 class="moduleHead">Dictionary Module</h3>
            <div class="dictionary-box">
                <div class="filterButtons">
                    <button onclick="loadWords('adjectives')">Adjectives</button>
                    <button onclick="loadWords('adverbs')">Adverbs</button>
                    <button onclick="loadWords('conjunctions')">Conjunctions</button>
                    <button onclick="loadWords('interjections')">Interjections</button>
                    <button onclick="loadWords('nouns')">Nouns</button>
                    <button onclick="loadWords('prepositions')">Prepositions</button>
                    <button onclick="loadWords('pronouns_and_genders')">Pronouns & Genders</button>
                    <button onclick="loadWords('verbs')">Verbs</button>
                </div>
                <div class="wordList" id="wordList">
                    <ul id="wordListContent">
                        <!-- Dynamic content will be loaded here -->
                    </ul>
                </div>
            </div>
        `;
    } else {
        console.error('Dictionary module not found.');
    }
}

// Function to load words based on category
function loadWords(category) {
    // Fetch words from data_words.json for the selected category
    fetch('data_words.json')
        .then(response => response.json())
        .then(data => {
            const words = data[category] || [];
            const wordListContent = document.getElementById('wordListContent');
            wordListContent.innerHTML = ''; // Clear the current list
            
            words.sort((a, b) => a.word.localeCompare(b.word)); // Sort words in Aza'ran alphabetical order

            // Display words in list
            words.forEach(word => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <span class="word" onclick="playAudio('${word.word}', '${word.english}')">
                        <strong>${word.category}:</strong> ${word.word} (${word.english})
                    </span>
                `;
                wordListContent.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error loading words:', error));
}

// Function to play audio for the selected word
function playAudio(azaWord, englishMeaning) {
    const audio = new Audio(`path/to/audio/${azaWord}.mp3`); // Path to the audio file for the Aza'ran word
    audio.play();

    // Optionally, you can have a callback after audio ends to show the English meaning
    audio.onended = function() {
        alert(`The meaning of the word is: ${englishMeaning}`);
    };
}

// Function to handle adding new words and updating data_words.json
function addNewWord(word, category, englishMeaning) {
    // Fetch the current data_words.json
    fetch('data_words.json')
        .then(response => response.json())
        .then(data => {
            // Check if word already exists
            if (data[category].some(existingWord => existingWord.word === word)) {
                alert('This word already exists!');
                return;
            }

            // Add the new word
            const newWord = { word, category, english: englishMeaning };
            data[category].push(newWord);

            // Sort the category list alphabetically
            data[category].sort((a, b) => a.word.localeCompare(b.word));

            // Save the updated data back to data_words.json
            fetch('save_words.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(() => {
                alert('Word added successfully!');
                loadWords(category); // Reload words for the current category
            })
            .catch(error => console.error('Error saving new word:', error));
        })
        .catch(error => console.error('Error loading data:', error));
}

// Function to create Footer Module
function createFooterModule() {
    const footer = document.querySelector('.footer');
    if (footer) {
        footer.innerHTML = `
            <h3>About Me</h3>
            <p>My name is August G Howley, I am a trans storyteller blending inclusive world-building, sci-fi fantasy, and immersive language systems across novels and interactive game development.</p>
            <button class="button" onclick="window.open('https://linktr.ee/augustghowley', '_blank')">Visit My Linktree</button>
            <p>&copy; 2025 Aza'ran Language Project. All rights reserved.</p>
            <p><a href="README.md" style="color: cyan;">Read the Documentation</a></p>
        `;
    } else {
        console.error('Footer module not found.');
    }
}

// Example of function to load words (for the dictionary)
function loadWords(category) {
    console.log('Loading words for category:', category);
    // Logic to load words based on the category from the data
}

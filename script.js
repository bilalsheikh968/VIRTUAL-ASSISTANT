let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-GB";
    window.speechSynthesis.speak(text_speak);
    content.innerText = text; // Display spoken text in the content area
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good morning Sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good afternoon Sir");
    } else {
        speak("Good Night Sir");
    }
}

window.addEventListener('load', () => {
    wishMe();
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();
recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";
    
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello sir, what can I help you with?");
    } else if (message.includes("who are you")) {
        speak("I am a virtual assistant, created by Bilal Sheikh.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube");
        window.open("https://www.youtube.com/", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google");
        window.open("https://www.google.com/", "_blank");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook");
        window.open("https://www.facebook.com/", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram");
        window.open("https://www.instagram.com/", "_blank");
    } else if (message.includes("open calculator")) {
        speak("Opening calculator");
        window.open("calculator://");
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp");
        window.open("WhatsApp://");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"});
        speak(`The time is ${time}`);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, {day: "numeric", month: "short"});
        speak(`Today's date is ${date}`);
    } 
    // New command for weather information
    else if (message.includes("weather")) {
        let weatherInfo = "Currently, it's sunny with a temperature of 25 degrees Celsius.";
        speak(weatherInfo);
    } 
    // New command for news
    else if (message.includes("news")) {
        let newsUpdate = "Here is the latest news: The stock market has seen a rise today with major indices in green.";
        speak(newsUpdate);
    } 

    else if (message.includes("imran khan")) {
        let imranKhanInfo = "Imran Ahmed Khan Niazi, born on October 5, 1952, is a Pakistani politician and former cricketer who served as the 22nd Prime Minister of Pakistan from August 2018 until April 2022. He founded and led the Pakistan Tehreek-e-Insaf political party from 1996 to 2023 and was the captain of Pakistan's national cricket team in the 1980s and early 1990s.";
        
        speak(imranKhanInfo); // Speak the information
        content.innerText = imranKhanInfo; // Display it in the content area
    }
    
    // New command for location
    else if (message.includes("location")) {
        let locationInfo = "You are currently in New York, USA.";
        speak(locationInfo);
    }
    else {
        let finalText = "Searching on Google for " + message;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
    }
}

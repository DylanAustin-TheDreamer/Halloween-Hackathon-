// Array of riddle objects
const riddles = [
  {
    question: "What has keys but can't open locks?",
    answer: "keyboard",
    options: ["piano", "keyboard", "map", "clock"],
  },
  {
    question: "What has a face and two hands but no arms or legs?",
    answer: "clock",
    options: ["clock", "watch", "calendar", "mirror"],
  },
  {
    question: "What has one eye but can't see?",
    answer: "needle",
    options: ["needle", "storm", "cyclops", "button"],
  },
  {
    question:
      "What runs but never walks, has a mouth but never talks, has a head but never weeps, and has a bed but never sleeps?",
    answer: "river", options: ["river", "car", "dog", "clock"]
  },
  { question: "What breaks as soon as you say its name?", answer: "silence", options: ["silence", "glass", "egg", "secret"] },
  { question: "What goes up but never comes down?", answer: "age", options: ["age", "balloon", "temperature", "kite"] },
  {
    question: "What can travel around the world while staying in a corner?",
    answer: "stamp", options: ["stamp", "airplane", "postcard", "clock"]
  },
  { question: "What has to be broken before you can use it?", answer: "egg", options: ["egg", "glass", "door", "phone"] },
  {
    question:
      "I am tall when I am young, and I am short when I am old. What am I?",
    answer: "candle", options: ["candle", "tree", "shadow", "pencil"]
  },
  {
    question: "What is full of holes but still holds water?",
    answer: "sponge", options: ["sponge", "bucket", "net", "bottle"]
  },
  {
    question:
      "I speak without a mouth and hear without ears. I have nobody, but I come alive with the wind. What am I?",
    answer: "echo", options: ["echo", "wind", "shadow", "whistle"]
  },
  { question: "What can you catch but not throw?", answer: "cold", options: ["cold", "ball", "fish", "frisbee"] },
  { question: "What comes down but never goes up?", answer: "Rain", options: ["rain", "balloon", "kite", "leaf"] },
];

let currentRiddleIndex = 0;
let attemptsLeft = 3;
let timer;
let timeLeft = 30;

// Magda's variables for riddle elements
const questionEl = document.getElementById("riddle-question");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const feedbackEl = document.getElementById("feedback");
const attemptsLeftEl = document.getElementById("attempts-left");
const timerEl = document.getElementById("timer");

// Dylan's variables for buttons and images
const modal = document.getElementById('modal');
const ghostImg = document.getElementById('ghost');
const button = document.getElementById('animate-ghost');
const buttonPumpkin = document.getElementById('animate-pumpkin');
const pumpkinImg = document.getElementById('pumpkin');
// declare and load audio files and volume settings
let backgroundMusic = new Audio('assets/sounds/main-theme.mp3');
let dungeonMusic = new Audio('assets/sounds/dungeon-sound.mp3');
let deathMusic = new Audio('assets/sounds/dead-sound.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;
dungeonMusic.loop = true;
dungeonMusic.volume = 0.5;
deathMusic.loop = false;
deathMusic.volume = 0.7;
const mute = document.getElementById('mute-button');
// state variables for player states
let death = false;
let dungeon = false;
// for starting game
const buttonPlay = document.getElementById('start-button');

// function for animating pumpkin - For getting a riddle wrong. Zoomes in, zooms out
function animatePumpkin() {
    pumpkinImg.classList.remove('ghost');
    pumpkinImg.classList.add('ghost-visible');
    death = true;
    stopAllMusic();
    console.log('Ghost button clicked: playing deathMusic');
    checkStates();
}
// function to activate ghost and change music
function animateGhosts() {
    ghostImg.classList.remove('ghost');
    ghostImg.classList.add('ghost-visible');
    death = true;
    stopAllMusic();
    console.log('Ghost button clicked: playing deathMusic');
    checkStates();
}

// stop all music function
function stopAllMusic() {
    backgroundMusic.pause();
    dungeonMusic.pause();
    deathMusic.pause();
    console.log('All music paused');
}
// here we check our state after stop all music function - hand in hand
function checkStates() {
    if (death) {
        deathMusic.currentTime = 0;
        deathMusic.play();
        console.log('Death state: deathMusic playing');
    } else if (dungeon) {
        dungeonMusic.currentTime = 0;
        dungeonMusic.play();
        console.log('Dungeon state: dungeonMusic playing');
    }
}

// Timer functions - Magda's part
// below everything else for beginning game states and changing variables

function startTimer() {
  clearInterval(timer); 
  timeLeft = 30;
  timerEl.textContent = `Time left: ${timeLeft} seconds`;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time left: ${timeLeft} seconds`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      disableOptions();
      feedbackEl.textContent =
        "Time is up! The correct answer was: " +
        riddles[currentRiddleIndex].answer;
      nextBtn.style.display = "inline";
      
      // Trigger pumpkin animation and music change
      animatePumpkin();
      modal.classList.remove('fade-out');
    }
  }, 1000);
}


function stopTimer() {
  clearInterval(timer);
}

// Load current riddle
function loadRiddle() {
  const riddle = riddles[currentRiddleIndex];
  questionEl.textContent = riddle.question;
  feedbackEl.textContent = "";
  attemptsLeft = 3;
  attemptsLeftEl.textContent = `Attempts left: ${attemptsLeft}`;
  nextBtn.style.display = "none";
  

  // Clear previous options
  optionsContainer.innerHTML = "";

  // Create buttons for each option
  riddle.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.className = "btn btn-secondary w-50 mx-auto d-block mb-4";
    btn.addEventListener("click", () => checkAnswer(option, btn));
    optionsContainer.appendChild(btn);
  });

  startTimer();
}


// Check answer
function checkAnswer(selectedOption, btn) {
  if (attemptsLeft === 0) return; // No tries left, ignore clicks

  const riddle = riddles[currentRiddleIndex];

  if (selectedOption.toLowerCase() === riddle.answer.toLowerCase()) {
    stopTimer();
    feedbackEl.textContent = "Correct! Well done 👏.";
    disableOptions();
    nextBtn.style.display = "inline";

  } else {
    attemptsLeft--;
    attemptsLeftEl.textContent = `Attempts left: ${attemptsLeft}`;
    feedbackEl.textContent = "Incorrect, try again.";

    // Disable this wrong option to prevent reselecting
    btn.disabled = true;


    if (attemptsLeft === 0) {
      stopTimer();
      feedbackEl.textContent = `No attempts left! The correct answer was: ${riddle.answer}`;
      disableOptions();
      nextBtn.style.display = "none";
      // Trigger ghost animation and music change
      animateGhosts();
      modal.classList.remove('fade-out');
    }
  }
}

function disableOptions() {
  const buttons = optionsContainer.querySelectorAll("button");
  buttons.forEach((button) => (button.disabled = true));
}

nextBtn.addEventListener("click", () => {
  currentRiddleIndex = (currentRiddleIndex + 1) % riddles.length;
  loadRiddle();
});

// Next riddle
function nextRiddle() {
  currentRiddleIndex = (currentRiddleIndex + 1) % riddles.length;
  loadRiddle();
}

// Event listeners
nextBtn.addEventListener("click", nextRiddle);

// Initialize
buttonPlay.addEventListener('click', startGame);
function startGame() {
    buttonPlay.style.display = 'none';
    dungeonMusic.currentTime = 0;
    dungeonMusic.play();
    document.getElementById('modal').classList.add('fade-out');
    loadRiddle();
}

mute.addEventListener('click', () => {
    if (backgroundMusic.volume > 0 || dungeonMusic.volume > 0 || deathMusic.volume > 0) {
        backgroundMusic.volume = 0;
        dungeonMusic.volume = 0;
        deathMusic.volume = 0;
    } else {
        backgroundMusic.volume = 0.5;
        dungeonMusic.volume = 0.5;
        deathMusic.volume = 0.7;
        if (death) {
          deathMusic.play();
        }
        else{
          dungeonMusic.play();
        }
    }
});

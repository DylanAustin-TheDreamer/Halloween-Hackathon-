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
const cupImg = document.getElementById('cup');
let message = document.getElementById('message');
// declare and load audio files and volume settings
// Custom input volume styling
const inputRange = document.querySelector('.custom-input');

    inputRange.addEventListener('input', function () {
    const progress = (inputRange.value - inputRange.min) / (inputRange.max - inputRange.min) * 100;
    inputRange.style.background = `linear-gradient(...)`;
    // Update all audio volumes
    const newVolume = inputRange.value / 100;
    backgroundMusic.volume = newVolume;
    dungeonMusic.volume = newVolume;
    deathMusic.volume = newVolume;
    successMusic.volume = newVolume;
});
// ---------------------------
let backgroundMusic = new Audio('assets/sounds/main-theme.mp3');
let dungeonMusic = new Audio('assets/sounds/dungeon-sound.mp3');
let deathMusic = new Audio('assets/sounds/dead-sound.mp3');
let successMusic = new Audio('assets/sounds/trumpets.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = inputRange.value / 100;
dungeonMusic.loop = true;
dungeonMusic.volume = inputRange.value / 100;
deathMusic.loop = false;
deathMusic.volume = inputRange.value / 100;
successMusic.loop = false;
successMusic.volume = inputRange.value / 100;
const mute = document.getElementById('mute-button');

// state variables for player states
let death = false;
let fail = false;
let dungeon = false;
let complete = false;
// for starting game
const buttonPlay = document.getElementById('start-button');

// function for animating pumpkin - For getting a riddle wrong. Zoomes in, zooms out
function animatePumpkin() {
    deathMusic = new Audio('assets/sounds/fail-trumpet.mp3');
    deathMusic.volume = inputRange.value / 100;
    pumpkinImg.classList.remove('ghost');
    pumpkinImg.classList.add('ghost-visible');
    dungeon = false;
    death = false;
    fail = true;
    stopAllMusic();
    console.log('Ghost button clicked: playing deathMusic');
    checkStates();
    message.style.display = "block";
    message.innerText = "Oh no! You ran out of time!";
    returnToGame();
}
// function to activate ghost and change music
function animateGhosts() {
    deathMusic = new Audio('assets/sounds/dead-sound.mp3');
    deathMusic.volume = inputRange.value / 100;
    ghostImg.classList.remove('ghost');
    ghostImg.classList.add('ghost-visible');
    fail = false;
    dungeon = false;
    death = true;
    stopAllMusic();
    console.log('Ghost button clicked: playing deathMusic');
    checkStates();
    message.style.display = "block";
    message.innerText = "Oh no! You got it wrong!";
    returnToGame();
}
function animateCup(){
    cupImg.classList.remove('ghost');
    cupImg.classList.add('ghost-visible');
    dungeon = false;
    death = false;
    fail = false;
    complete = true;
    stopAllMusic();
    console.log('Cup animation triggered: playing successMusic');
    checkStates();
    confetti();
    message.style.display = "block";
    message.innerText = "Congratulations! You solved the riddle!";
    returnToGame();
}

// stop all music function
function stopAllMusic() {
    backgroundMusic.pause();
    dungeonMusic.pause();
    deathMusic.pause();
    successMusic.pause();
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
    } else if (complete) {
        successMusic.currentTime = 0;
        successMusic.play();
        console.log('Complete state: successMusic playing');
    } else if (fail) {
        deathMusic.currentTime = 0;
        deathMusic.play();
        console.log('Fail state: deathMusic playing');
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
    // Trigger cup animation and music change
    animateCup();
    modal.classList.remove('fade-out');

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
    modal.classList.add('fade-out');
    loadRiddle();
}

mute.addEventListener('click', () => {
    if (backgroundMusic.volume > 0 || dungeonMusic.volume > 0 || deathMusic.volume > 0 || successMusic.volume > 0) {
        backgroundMusic.volume = 0;
        dungeonMusic.volume = 0;
        deathMusic.volume = 0;
        successMusic.volume = 0;
    } else {
        backgroundMusic.volume = inputRange.value / 100;
        dungeonMusic.volume = inputRange.value / 100;
        deathMusic.volume = inputRange.value / 100;
        successMusic.volume = inputRange.value / 100;
        if (death) {
          deathMusic.play();
        } else if (complete){
          successMusic.play();
        }
        else{
          dungeonMusic.play();
        }
    }
});


const canvases = document.getElementsByTagName('canvas');
for (let canvas of canvases) {
  canvas.style.zIndex = '1000';
}

confetti({
  particleCount: 500,
  spread: 120,
  origin: { y: 0.6 },
  colors: ['#ff430aff', '#ff7b47ff', '#ffb570ff', '#ff1e00ff', '#ff0040ff']
});


// Here is for dealing with after in game animation states.
function returnToGame() {
  if(death){
  deathMusic.addEventListener('timeupdate', function() {
    if (deathMusic.currentTime >= deathMusic.duration / 2.5){
      message.innerText = "";
      message.style.display = "none";
    death = false;
    complete = false;
    ghostImg.classList.remove('ghost-visible');
    ghostImg.classList.add('ghost');
    stopAllMusic();
    dungeon = true;
    checkStates();
    modal.classList.add('fade-out');
    nextRiddle();
    }
  });
    } else if(complete){
  successMusic.addEventListener('ended', function() {
      message.innerText = "";
      message.style.display = "none";
    death = false;
    complete = false;
    cupImg.classList.remove('ghost-visible');
    cupImg.classList.add('ghost');
    stopAllMusic();
    dungeon = true;
    checkStates();
    modal.classList.add('fade-out');
    nextRiddle();
  });
  } else if(fail){
  deathMusic.addEventListener('ended', function() {
      message.innerText = "";
      message.style.display = "none";
      death = false;
      complete = false;
      pumpkinImg.classList.remove('ghost-visible');
      pumpkinImg.classList.add('ghost');
      stopAllMusic();
      dungeon = true;
      checkStates();
      modal.classList.add('fade-out');
      nextRiddle();
  });
  }
}

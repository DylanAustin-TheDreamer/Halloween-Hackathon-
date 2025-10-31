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

const questionEl = document.getElementById("riddle-question");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const feedbackEl = document.getElementById("feedback");
const attemptsLeftEl = document.getElementById("attempts-left");
const timerEl = document.getElementById("timer");

function startTimer() {
  clearInterval(timer);
  timeLeft = 30;
  timerEl.textContent = `Time left: ${timeLeft} seconds`;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time left: ${timeLeft} seconds`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      feedbackEl.textContent =
        "Time is up! The correct answer was: " +
        riddles[currentRiddleIndex].answer;
      answerInput.disabled = true;
      submitBtn.style.display = "none";
      nextBtn.style.display = "inline";
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
      nextBtn.style.display = "inline";
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
loadRiddle();




// Ok, so I created basic functionality for our riddle game,  with 4 answers, 3 attempts, timer 30s,  for now with a text when answer is correct or incorrect, but this will be replaced with candies, pumpkin.... we can start from here when HTML is ready, then add on, remove or change.

// Examples of riddles:

// {
//     question: "What has keys but can't open locks?",
//     answer: "keyboard",
//     options: ["piano", "keyboard", "map", "clock"],
//   },
//   {
//     question: "What has a face and two hands but no arms or legs?",
//     answer: "clock",
//     options: ["clock", "watch", "calendar", "mirror"],
//   },
//   {
//     question: "What has one eye but can't see?",
//     answer: "needle",
//     options: ["needle", "storm", "cyclops", "button"],
//   },
//   {
//     question:
//       "What runs but never walks, has a mouth but never talks, has a head but never weeps, and has a bed but never sleeps?",
//     answer: "river", options: ["river", "car", "dog", "clock"]
//   },
//   { question: "What breaks as soon as you say its name?", answer: "silence", options: ["silence", "glass", "egg", "secret"] },
//   { question: "What goes up but never comes down?", answer: "age", options: ["age", "balloon", "temperature", "kite"] },
//   {
//     question: "What can travel around the world while staying in a corner?",
//     answer: "stamp", options: ["stamp", "airplane", "postcard", "clock"]
//   },
//   { question: "What has to be broken before you can use it?", answer: "egg", options: ["egg", "glass", "door", "phone"] },
//   {
//     question:
//       "I am tall when I am young, and I am short when I am old. What am I?",
//     answer: "candle", options: ["candle", "tree", "shadow", "pencil"]
//   },
//   {
//     question: "What is full of holes but still holds water?",
//     answer: "sponge", options: ["sponge", "bucket", "net", "bottle"]
//   },
//   {
//     question:
//       "I speak without a mouth and hear without ears. I have nobody, but I come alive with the wind. What am I?",
//     answer: "echo", options: ["echo", "wind", "shadow", "whistle"]
//   },
//   { question: "What can you catch but not throw?", answer: "cold", options: ["cold", "ball", "fish", "frisbee"] },
//   { question: "What comes down but never goes up?", answer: "Rain", options: ["rain", "balloon", "kite", "leaf"] },
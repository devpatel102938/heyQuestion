// --- Element References ---
const topicSelect    = document.getElementById("topic-select");
const startButton    = document.getElementById("start-btn");
const topicSelector  = document.querySelector(".topic-selector");
const quizContainer  = document.querySelector(".quiz-container");
const questionElement = document.getElementById("question");
const optionsElement  = document.getElementById("options");
const nextButton      = document.getElementById("next-btn");
const restartButton   = document.getElementById("restart-btn");
const scoreElement    = document.getElementById("score");

// --- State Variables ---
let questions = [];
let currentQuestion = 0;
let score = 0;

// --- Question Bank by Topic ---
const questionBank = {
  srs: [
    {
      question: "What does SRS stand for in software engineering?",
      options: ["Software Requirements Specification", "System Resource Scheduler", "Structured Requirement Sheet", "Software Review Summary"],
      answer: "Software Requirements Specification"
    },
    {
      question: "Which part of an SRS defines non-functional requirements?",
      options: ["Performance metrics", "Use case diagrams", "Source code", "Test plans"],
      answer: "Performance metrics"
    },
    {
      question: "Which of the following is included in an SRS?",
      options: ["Functional requirements", "Source code", "Deployment script", "Wireframes"],
      answer: "Functional requirements"
    },
    {
      question: "SRS should be written by:",
      options: ["System analysts", "Testers", "Developers", "Clients"],
      answer: "System analysts"
    },
    {
      question: "What is the main purpose of SRS?",
      options: ["Define system requirements", "Design the UI", "Write test cases", "Develop database"],
      answer: "Define system requirements"
    }
  ],
  history: [
    {
      question: "Who was the first President of India?",
      options: ["Mahatma Gandhi", "Dr. Rajendra Prasad", "Sardar Patel", "Nehru"],
      answer: "Dr. Rajendra Prasad"
    },
    {
      question: "When did India gain independence?",
      options: ["1947", "1950", "1930", "1962"],
      answer: "1947"
    },
    {
      question: "Which empire built the Red Fort?",
      options: ["Mughals", "Mauryas", "Guptas", "British"],
      answer: "Mughals"
    },
    {
      question: "The Battle of Plassey was fought in:",
      options: ["1757", "1857", "1764", "1800"],
      answer: "1757"
    },
    {
      question: "Who was known as the Iron Man of India?",
      options: ["Nehru", "Sardar Vallabhbhai Patel", "Rajendra Prasad", "Bose"],
      answer: "Sardar Vallabhbhai Patel"
    }
  ],
  science: [
    {
      question: "What planet is known as the Red Planet?",
      options: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars"
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["O2", "H2O", "CO2", "HO2"],
      answer: "H2O"
    },
    {
      question: "Which gas do plants absorb from the atmosphere?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      answer: "Carbon Dioxide"
    },
    {
      question: "The speed of light is approximately:",
      options: ["300,000 km/s", "150,000 km/s", "1,000 km/s", "3,000 km/s"],
      answer: "300,000 km/s"
    },
    {
      question: "Which part of the plant conducts photosynthesis?",
      options: ["Leaf", "Root", "Stem", "Flower"],
      answer: "Leaf"
    }
  ],
  sports: [
    {
      question: "How many players are there in a football team?",
      options: ["9", "10", "11", "12"],
      answer: "11"
    },
    {
      question: "Which country won the 2011 Cricket World Cup?",
      options: ["India", "Australia", "England", "Sri Lanka"],
      answer: "India"
    },
    {
      question: "Which sport uses a shuttlecock?",
      options: ["Badminton", "Tennis", "Squash", "Hockey"],
      answer: "Badminton"
    },
    {
      question: "How many rings are there on the Olympic flag?",
      options: ["3", "4", "5", "6"],
      answer: "5"
    },
    {
      question: "In which game is the term ‘Love’ used?",
      options: ["Tennis", "Football", "Cricket", "Basketball"],
      answer: "Tennis"
    }
  ],
  current: [
    {
      question: "Who is the current Prime Minister of India (2024)?",
      options: ["Rahul Gandhi", "Narendra Modi", "Amit Shah", "Yogi Adityanath"],
      answer: "Narendra Modi"
    },
    {
      question: "Which city hosted the G20 Summit 2023?",
      options: ["Delhi", "Mumbai", "Bangalore", "Ahmedabad"],
      answer: "Delhi"
    },
    {
      question: "Who won the 2023 Cricket World Cup?",
      options: ["India", "Australia", "England", "Pakistan"],
      answer: "Australia"
    },
    {
      question: "Which country recently landed on the moon’s south pole?",
      options: ["USA", "Russia", "India", "China"],
      answer: "India"
    },
    {
      question: "Who is the President of the USA in 2024?",
      options: ["Joe Biden", "Donald Trump", "Barack Obama", "Kamala Harris"],
      answer: "Joe Biden"
    }
  ]
};


// --- Start Quiz on Topic Selection ---
startButton.onclick = () => {
  const topic = topicSelect.value;
  if (!topic || !questionBank[topic]) {
    alert("Please select a valid topic.");
    return;
  }

  // Pick 10 random questions
  questions = questionBank[topic]
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);

  // Show quiz, hide selector
  topicSelector.style.display = "none";
  quizContainer.style.display = "block";
  initQuiz();
};

// --- Initialize Quiz State ---
function initQuiz() {
  currentQuestion = 0;
  score = 0;
  scoreElement.textContent = "";
  nextButton.style.display = "none";
  restartButton.style.display = "none";
  showQuestion();
}

// --- Show Current Question ---
function showQuestion() {
  const q = questions[currentQuestion];
  questionElement.textContent = `Q${currentQuestion + 1}. ${q.question}`;
  optionsElement.innerHTML = "";

  // Shuffle and render options
  q.options
    .sort(() => Math.random() - 0.5)
    .forEach(opt => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.onclick = () => checkAnswer(btn, q.answer);
      optionsElement.appendChild(btn);
    });
}

// --- Handle Answer Checking ---
function checkAnswer(btn, correct) {
  // disable all right away
  optionsElement.querySelectorAll("button").forEach(b => b.disabled = true);

  if (btn.textContent === correct) {
    btn.classList.add("correct");
    score++;
  } else {
    btn.classList.add("wrong");
    // highlight the correct one
    optionsElement.querySelectorAll("button").forEach(b => {
      if (b.textContent === correct) b.classList.add("correct");
    });
  }

  nextButton.style.display = "inline-block";
}

// --- Next Question Handler ---
nextButton.onclick = () => {
  currentQuestion++;
  nextButton.style.display = "none";

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
};

// --- Show Final Score ---
function showScore() {
  questionElement.textContent = "Quiz Finished!";
  optionsElement.innerHTML = "";
  scoreElement.textContent = `You scored ${score} out of ${questions.length}.`;
  restartButton.style.display = "inline-block";
}

// --- Restart (back to topic selection) ---
restartButton.onclick = () => {
  quizContainer.style.display = "none";
  topicSelector.style.display = "block";
};

// Selecting elements from the DOM
const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');

// Make an array of objects that stores question, choices of question and answer
const quiz = [
  {
    question: 'Q. Which of the following is not a CSS box model property?',
    choices: ['margin', 'padding', 'border-radius', 'border-collapse'],
    answer: 'border-collapse',
  },
  {
    question:
      'Q. Which of the following is not a valid way to declare a function in JavaScript?',
    choices: [
      'function myFunction() {}',
      ' let myFunction = function() {};',
      'myFunction: function() {}',
      'const myFunction = () => {};',
    ],
    answer: 'myFunction: function() {}',
  },
  {
    question: 'Q. Which of the following is not a JavaScript data type?',
    choices: ['string', 'boolean', 'object', 'float'],
    answer: 'float',
  },
  {
    question: 'Q. What is the purpose of the this keyword in JavaScript?',
    choices: [
      'It refers to the current function.',
      'It refers to the current object.',
      'It refers to the parent object.',
      ' It is used for comments.',
    ],
    answer: 'It refers to the current object.',
  },
  {
    question:
      'Q. What is the purpose of the spread syntax (...) in JavaScript?',
    choices: [
      'To concatenate multiple arrays into a single array.',
      'To clone an object or array.',
      'To convert an array-like object into an array.',
      'To access the prototype of an object.',
    ],
    answer: 'To clone an object or array.',
  },
  {
    question: 'Q. What is the purpose of the Array.map() method in JavaScript?',
    choices: [
      'To add new elements to an array.',
      'To remove elements from an array.',
      'To transform each element of an array and create a new array.',
      'To sort the elements of an array.',
    ],
    answer: 'To transform each element of an array and create a new array.',
  },
  {
    question:
      'Q. What is the purpose of the Array.filter() method in JavaScript?',
    choices: [
      'To add new elements to an array.',
      'To remove elements from an array.',
      'To transform each element of an array and create a new array.',
      'To check if any element of an array satisfies a given condition.',
    ],
    answer: 'To check if any element of an array satisfies a given condition.',
  },
  {
    question:
      'Q. What is the purpose of the Array.reduce() method in JavaScript?',
    choices: [
      'To add new elements to an array.',
      'To remove elements from an array.',
      'To transform each element of an array and create a new array.',
      'To reduce the array to a single value based on a callback function.',
    ],
    answer:
      'To reduce the array to a single value based on a callback function.',
  },
  {
    question:
      'Q. What is the purpose of the Array.forEach() method in JavaScript?',
    choices: [
      'To add new elements to an array.',
      'To remove elements from an array.',
      'To iterate over each element of an array and perform a callback function.',
      'To sort the elements of an array.',
    ],
    answer:
      'To iterate over each element of an array and perform a callback function.',
  },
  {
    question:
      'Q. What is the purpose of the Array.includes() method in JavaScript?',
    choices: [
      'To check if an array contains a specific element.',
      'To add new elements to an array.',
      'To remove elements from an array.',
      'To transform each element of an array and create a new array.',
    ],
    answer: 'To check if an array contains a specific element.',
  },
];

// Initializing variables
let currentQuestionIndex = 0; // Index of the current question
let score = 0; // User's score
let quizOver = false; // Flag to check if the quiz is over
let timeLeft = 15; // Time left for each question
let timerID = null; // ID of the timer interval

// Arrow Function to Show Questions
const showQuestions = () => {
  // Get the question details from the quiz array based on the current question index
  const questionDetails = quiz[currentQuestionIndex];
  // Set the question text in the questionBox element
  questionBox.textContent = questionDetails.question;
  // Clear the choicesBox element
  choicesBox.textContent = '';
  // Loop through each choice in the questionDetails.choices array

  for (let i = 0; i < questionDetails.choices.length; i++) {
    const currentChoice = questionDetails.choices[i];
    // Create a new div element for the choice

    const choiceDiv = document.createElement('div');
    // Set the choice text in the choiceDiv element

    choiceDiv.textContent = currentChoice;
    // Add the 'choice' class to the choiceDiv element

    choiceDiv.classList.add('choice');
    // Append the choiceDiv element to the choicesBox element

    choicesBox.appendChild(choiceDiv);
    // Add click event listener to each choiceDiv element

    choiceDiv.addEventListener('click', () => {
      // Check if the choiceDiv is already selected

      if (choiceDiv.classList.contains('selected')) {
        // If selected, remove the 'selected' class

        choiceDiv.classList.remove('selected');
      } else {
        // If not selected, add the 'selected' class

        choiceDiv.classList.add('selected');
      }
    });
  }
  // Check if there are more questions in the quiz

  if (currentQuestionIndex < quiz.length) {
    startTimer();
  }
};

// Function to check answers
const checkAnswer = () => {
  // Get the selected choice element
  const selectedChoice = document.querySelector('.choice.selected');
  // Check if the selected choice matches the correct answer
  if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
    // alert("Correct Answer!");
    // If correct, increment the score and display a correct answer alert
    displayAlert('Correct Answer!');
    score++;
  } else {
    // alert("Wrong answer");
    // If wrong, display a wrong answer alert with the correct answer
    displayAlert(
      `Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`
    );
  }
  // Reset the time left and move to the next question
  timeLeft = 15;
  currentQuestionIndex++;
  // Check if there are more questions or the quiz is over
  if (currentQuestionIndex < 10) {
    // If there are more questions, show the next question
    showQuestions();
  } else {
    // If the quiz is over, stop the timer and show the final score
    stopTimer();
    showScore();
  }
};

// Function to show score
const showScore = () => {
  // Clear the question and choices
  questionBox.textContent = '';
  choicesBox.textContent = '';
  // Display the score
  scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
  // Display quiz completion alert
  displayAlert('You have completed this quiz!');
  // Change the text of the nextBtn to 'Play Again'
  nextBtn.textContent = 'Play Again';
  // Set the quizOver flag to true
  quizOver = true;
  // Hide the timer
  timer.style.display = 'none';
};

// Function to Show Alert
const displayAlert = (msg) => {
  // Display the alert message
  alert.style.display = 'block';
  alert.textContent = msg;
  // Hide the alert after 2 seconds
  setTimeout(() => {
    alert.style.display = 'none';
  }, 2000);
};

// Function to Start Timer
const startTimer = () => {
  clearInterval(timerID); // Check for any exist timers
  timer.textContent = timeLeft;
  const countDown = () => {
    timeLeft--;
    timer.textContent = timeLeft;
    // Check if time is up
    if (timeLeft === 0) {
      const confirmUser = confirm(
        'Time Up!!! Do you want to play the quiz again'
      );
      if (confirmUser) {
        timeLeft = 15;
        startQuiz();
      } else {
        startBtn.style.display = 'block';
        container.style.display = 'none';
        return;
      }
    }
  };
  timerID = setInterval(countDown, 1000);
};

// Function to Stop Timer
const stopTimer = () => {
  clearInterval(timerID);
};

// Function to shuffle question
const shuffleQuestions = () => {
  for (let i = quiz.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
  }
  currentQuestionIndex = 0;
  showQuestions();
};

// Function to Start Quiz
const startQuiz = () => {
  timeLeft = 15;
  timer.style.display = 'flex';
  shuffleQuestions();
};

// Adding Event Listener to Start Button
startBtn.addEventListener('click', () => {
  startBtn.style.display = 'none';
  container.style.display = 'block';
  startQuiz();
});

nextBtn.addEventListener('click', () => {
  const selectedChoice = document.querySelector('.choice.selected');
  if (!selectedChoice && nextBtn.textContent === 'Next') {
    // alert("Select your answer");
    displayAlert('Select your answer');
    return;
  }
  if (quizOver) {
    nextBtn.textContent = 'Next';
    scoreCard.textContent = '';
    currentQuestionIndex = 0;
    quizOver = false;
    score = 0;
    startQuiz();
  } else {
    checkAnswer();
  }
});

//defining questions

const questions = [
  {
    question: `Six students in a maths class have just completed a quiz, and Piyush Sir announces a twist for grading: each student must exchange their quiz paper with a classmate, ensuring that no one receives their own paper back. The students start passing their papers around, trying to find all the possible ways to meet this rule.
In how many distinct ways can they exchange their papers so that no student ends up with their own?`,
    answers: [
      { text: "265", correct: true },
      { text: "256", correct: false },
      { text: "44", correct: false },
      { text: "720", correct: false },
    ],
    explanation: `To solve this problem, we need to determine the number of derangements of a set of 6 elements. A derangement is a permutation where no element appears in its original position.

The formula for the number of derangements (denoted as D(n)) of n objects is given by:

D(n) = n! * (1 - 1/1! + 1/2! - 1/3! + ... + (-1)^n/n!)

For n = 6, we calculate D(6) as follows:

D(6) = 6! * (1 - 1/1! + 1/2! - 1/3! + 1/4! - 1/5! + 1/6!)

Calculating each term:

1/1! = 1
1/2! = 0.5
1/3! = 1/6
1/4! = 1/24
1/5! = 1/120
1/6! = 1/720

Substituting these values back into the formula:

D(6) = 720 * (1 - 1 + 0.5 - 1/6 + 1/24 - 1/120 + 1/720)
D(6) = 720 * (0.5 - 1/6 + 1/24 - 1/120 + 1/720)
D(6) = 720 * (0.5 - 0.1667 + 0.0417 - 0.0083 + 0.0014)
D(6) = 720 * (0.3667)
D(6) = 265

Thus, the number of distinct ways the students can exchange their papers so that no student ends up with their own is 265.`,
  },
  {
    question: `Nikhil is building a webpage for his personal blog. He wants the name of his blog to appear on the Browser Tab.

Which HTML tag should Nikhil use to set the text that appears on the Browser Tab?`,
    answers: [
      { text: "&lt;title&gt;", correct: true },
      { text: "&lt;h1&gt;", correct: false },
      { text: "&lt;div&gt;", correct: false },
      { text: "&lt;p&gt;", correct: false },
    ],
    explanation: `The &lt;title&gt; tag is used in HTML to set the text that appears on the browser tab. It is placed within the &lt;head&gt; section of the HTML document. When a user bookmarks a webpage, the text specified in the &lt;title&gt; tag is displayed as the bookmark label.`,
  },
  {
    question: `Aryan is learning how to use the echo command in the terminal to create and manage text files. He discovers that > and >> are used to redirect output, but he wants to understand the difference between the two.

If Aryan runs the following commands in the terminal:

<pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">
<span style="color: #0066cc;">echo</span> <span style="color: #009900;">"Hello, World!"</span> <span style="color: #ff0000;">>></span> greetings.txt
<span style="color: #0066cc;">echo</span> <span style="color: #009900;">"Welcome to the coding class!"</span> <span style="color: #ff0000;">></span> greetings.txt
</pre>

What will be the contents of the greetings.txt file after executing these commands?`,
    answers: [
      { text: "Hello, World!", correct: false },
      { text: "Welcome to the coding class!", correct: true },
      { text: "Hello, World!<br>Welcome to the coding class!", correct: false },
      { text: "Welcome to the coding class!Hello, World!", correct: false },
    ],
    explanation: `The >> operator appends the output to the existing contents of the file, while the > operator overwrites the contents of the file. In this case, the first command appends "Hello, World!" to the file, and the second command overwrites the contents of the file with "Welcome to the coding class!". Therefore, the contents of the greetings.txt file will be "Welcome to the coding class!"`,
  },
  {
    question: `Anant is developing a messaging app where each message must be delivered reliably and in order.

Which of the following protocols would be most suitable for this requirement?`,
    answers: [
      { text: "TCP", correct: true },
      { text: "UDP", correct: false },
      { text: "HTTP", correct: false },
      { text: "SMTP", correct: false },
    ],
    explanation: `TCP (Transmission Control Protocol) is the most suitable protocol for Anant's messaging app. TCP ensures reliable and ordered delivery of messages by providing a connection-oriented service. It establishes a connection between the sender and receiver, and uses acknowledgments and retransmissions to guarantee that each message is delivered correctly and in the correct order. This makes TCP ideal for applications where message integrity and order are crucial, such as messaging apps.`,
  },
];

//defining variables

const questionElement = document.getElementById("question"); //defining question
const answerButtons = document.getElementById("answer-buttons"); //defining answer buttons
const nextButtons = document.getElementById("nxt-btn"); //defining next button

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButtons.innerHTML = "Next";
  showQuestion();
}
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question; //displaying question

  currentQuestion.answers.forEach((answer) => {
    //displaying answers
    const button = document.createElement("button");
    button.innerHTML = answer.text; //displaying text of answer
    button.classList.add("btn"); //adding class to button
    answerButtons.appendChild(button); //adding button to answer buttons, displaying answers in the div
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButtons.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  const currentQuestion = questions[currentQuestionIndex];
  
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  
  const explanation = document.createElement("div");
  explanation.classList.add("explanation");
  explanation.innerHTML = currentQuestion.explanation;
  questionElement.appendChild(explanation);
  nextButtons.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButtons.innerHTML = "Play Again";
  nextButtons.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButtons.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();



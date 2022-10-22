var startButton = document.querySelector(".start-button");
var timerElement = document.querySelector(".timer-count");
var optionList = document.querySelector("#option-list");
var studentList = document.querySelector("#studentlist");

var timerCount;
var pageindex;
var totalScore;
var submitButton;
var goBackButton;
var cleanScoreButton;

var studentListArray = [];

// list of all questions, choices, and answers
var questions = [
  {
    title: 'Commonly used data types DO NOT include:',
    choices: ['strings', 'booleans', 'alerts', 'numbers'],
    answer: 'alerts',
  },
  {
    title: 'The condition in an if / else statement is enclosed within ____.',
    choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
    answer: 'parentheses',
  },
  {
    title: 'Arrays in JavaScript can be used to store ____.',
    choices: [
      'numbers and strings',
      'other arrays',
      'booleans',
      'all of the above',
    ],
    answer: 'all of the above',
  },
  {
    title:
      'String values must be enclosed within ____ when being assigned to variables.',
    choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
    answer: 'quotes',
  },
  {
    title:
      'A very useful tool used during development and debugging for printing content to the debugger is:',
    choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
    answer: 'console.log',
  },
];

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;
      if (timerCount >= 0) {
        //Do nothing at the moment
        //createPage(pageindex);
        //pageindex++;
        //createPage(1);
      }
      //console.log("Timer comes");
      // Tests if time has run out
      if (timerCount === 0) {
        // Clears interval
        clearInterval(timer);
        console.log("Stop Timer");
        showSummaryPage();
        //loseGame();
      }
    }, 1000);
}

function buttonClicked(event)
{
  //console.log(event);
  //event.stopPropagation();

  /*
  event.target.setAttribute(
    "style",
    "background-color: #601A4A"
  );
  */
  var textvalue = event.target.getAttribute("className");
  //console.log(textvalue);
}

function createPage(index)
{
    optionList.innerHTML = "";

    var e = optionList.querySelector("div");
    if (e)
    {
      e.remove();
    }

    optionList.querySelectorAll("#userSelectionButton").forEach(e => e.remove());

    var tag = document.createElement("div");

      // Adds text content to created tag
    tag.textContent = questions[index].title;

    var choices = questions[index].choices;
  
    // Appends tag as child of document body
    //document.body.appendChild(tag);

    for (var i = 0; i < choices.length; i++)
    {
      var element = document.createElement("BUTTON");
      element.id = "userSelectionButton";
      element.textContent = choices[i];
      element.className = index;
      //element.addEventListener("click", buttonClicked);
      //document.body.appendChild(element);
      tag.appendChild(element);
    }
     
    optionList.appendChild(tag);
}

function SaveScore(score, name)
{
  var studentGrade = {
    userName: name,
    grade: score
  };

  // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
  localStorage.setItem("studentGrade", JSON.stringify(studentGrade));
}

function showSummaryPage()
{
  optionList.innerHTML = "";

  var e = optionList.querySelector("div");
  if (e)
  {
    e.remove();
  }

  optionList.querySelectorAll("#userSelectionButton").forEach(e => e.remove());

  var li = document.createElement("div");
  li.textContent = "All done";
  li.id = "AllDoneId";
  var paragraphResult = document.createElement("p");
  paragraphResult.id = "Score";
  paragraphResult.textContent = "Your final Score is " + totalScore;

  var label = document.createElement("LABEL");
  label.textContent = "Enter Your Name";
  label.id = "LABEL"
  var inputBox = document.createElement("INPUT");
  inputBox.id = "InputBox";

  submitButton = document.createElement("BUTTON");
  submitButton.id = "submitButton";
  submitButton.textContent = "submit";

  li.appendChild(paragraphResult);
  li.appendChild(label);
  li.appendChild(inputBox);
  li.appendChild(submitButton);
  
  optionList.appendChild(li);

  submitButton.addEventListener("click", listScorePage);
}

function backToBegin(event)
{
  studentList.innerHTML = "";
  var child = studentList.lastElementChild; 
  while (child) {
    studentList.removeChild(child);
    child = studentList.lastElementChild;
  }

  startButton.style.display = "block";
}

function cleanResult(event)
{
  resultElementList = document.querySelectorAll("li");

  for (var i = 0; i < resultElementList.length; i++)
  {
    if (resultElementList[i].hasAttribute('data-index')) 
    {
      resultElementList[i].remove();
    }
  }

  while(studentListArray.length > 0) 
  {
    studentListArray.pop();
  }
}

function listScorePage(event)
{
  event.stopPropagation();

  var userNameElement = document.getElementById("InputBox");

  console.log("The userName " + userNameElement.value);

  SaveScore(totalScore, userNameElement.value)

  optionList.innerHTML = "";

  var lastGrade = JSON.parse(localStorage.getItem("studentGrade"));
  if (lastGrade)
  {
    console.log("The saved score is " + lastGrade.grade);
    console.log("The saved username is " + lastGrade.userName);
  }

  studentListArray.push(lastGrade);

  console.log(studentListArray);

  studentList.innerHTML = "";

  var pageContent = document.createElement("p");
  pageContent.id = "Final Full Result List";
  pageContent.textContent = "High Scores";

  goBackButton = document.createElement("BUTTON");
  goBackButton.id = "goBackButton";
  goBackButton.textContent = "GoBack";

  goBackButton.addEventListener("click", backToBegin);

  cleanScoreButton = document.createElement("BUTTON");
  cleanScoreButton.id = "cleanResultButton";
  cleanScoreButton.textContent = "CleanResult";

  cleanScoreButton.addEventListener("click", cleanResult);

  studentList.appendChild(pageContent);

  // Render a new li for each todo
  for (var i = 0; i < studentListArray.length; i++) {
    var student = studentListArray[i];

    var li = document.createElement("li");
    li.textContent = student.userName;
    li.setAttribute("data-index", i);

    var score = document.createElement("li");
    score.textContent = student.grade;

    li.appendChild(score);
    studentList.appendChild(li);
  }

  studentList.appendChild(goBackButton);
  studentList.appendChild(cleanScoreButton);

}

function showNextQuestion()
{
  pageindex++

  console.log("pageindex is " + pageindex);
  if (pageindex <= questions.length - 1)
  {
    console.log("current pageindex is " + pageindex);
    console.log("current questions.length is " + questions.length);
    createPage(pageindex);
  }
  else
  {
    if (timerCount != 0)
    {
      clearInterval(timer);
      console.log("Stop Timer ");
    }
    
    showSummaryPage();
  }
}

optionList.addEventListener("click", function(event) {
  var element = event.target;

  if (element.matches("button") === true) {

      var e = optionList.querySelector("p");
      if (e)
      {
        e.remove();
      }

      console.log(element.className);
      var question = questions[element.className];
      var result = document.createElement("p");
      if (element.textContent != question.answer)
      {
        result.textContent = "Wrong";
      }
      else
      {
        result.textContent = "Correct";
        totalScore += 20;
      }

      optionList.appendChild(result);

      setTimeout(showNextQuestion, 200);
  }
});

function init() 
{
  timerCount = 30;
  pageindex = 0;
  totalScore = 0;

  studentList.innerHTML = "";
}

function startGame()
{
    startButton.style.display = "none";
    startTimer();
    init();
    totalScore = 0;
    createPage(pageindex);
    console.log(questions);
}

init();

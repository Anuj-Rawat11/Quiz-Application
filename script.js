const questions=[
    {
        question:"Which is largest animal in the world?",
        answers:[
            {
                text:"Shark",
                correct:false
            },
            {
                text:"Blue Whale",
                correct:true
            },
            {
                text:"Elephant",
                correct:false
            },
            {
                text:"Giraffe",
                correct:false
            }
        ]
    },
    {
        question:"Which is the smallest country in the world?",
        answers:[
            {
                text:"Vatical City",
                correct:true
            },
            {
                text:"Bhutan",
                correct:false
            },
            {
                text:"Nepal",
                correct:false
            },
            {
                text:"Sri Lanka",
                correct:false
            }
        ]
    },
    {
        question:"Which is largest desert in the world?",
        answers:[
            {
                text:"Kalahari",
                correct:false
            },
            {
                text:"Gobi",
                correct:false
            },
            {
                text:"Sahara",
                correct:false
            },
            {
                text:"Antarctica",
                correct:true
            }
        ]
    },
    {
        question:"Which is smallest continent in the world?",
        answers:[
            {
                text:"Asia",
                correct:false
            },
            {
                text:"Australia",
                correct:true
            },
            {
                text:"Arctic",
                correct:false
            },
            {
                text:"Africa",
                correct:false
            }
        ]
    }     

];

// Selecting the element in which the question is displayed 
const questionElement=document.getElementById("question");
// Selecting the container which contains the answer buttons
const answerButtons=document.getElementById("answer-buttons");
// Selecting the next button element
const nextButton=document.getElementById("next-btn");
// Index of the current question in questions array
let currentQuestionIndex=0;
// Variable for counting the score of the player
let score=0;


// innerText returns all text contained by an element and all its child elements
// innerHTML returns all text,including html tags,that is contained by an element

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
   resetState();   //Resets previous question and options
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
    const button=document.createElement("button");
    button.innerHTML=answer.text;
    button.classList.add("btn");
    //element.classList.add() is a method in JavaScript that adds one or more class names to the specified element.It takes one or more arguments(class names) and adds them to the class attribute of the element.
    answerButtons.appendChild(button);
    if(answer.correct){
        button.dataset.correct=answer.correct;
    }
    button.addEventListener("click",selectAnswer);
});
}

// firstChild returns the first child node(an element node,a text node or a comment node).Whitespace between elements are also text nodes.

// firstElementChild returns the first child element(not text and comment nodes).


function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    // In JavaScript,the target property of Event object identifies the element that initiated an event.
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    // Array.from() static method creates a new,shallow-copied Array instance from an iterable or array-like object.
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}|`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();
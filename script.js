const quiz=document.getElementById("quiz");
const answerEls=document.querySelectorAll(".answer");

const questionEl=document.getElementById("question");
const a_text=document.getElementById("a_text");
const b_text=document.getElementById("b_text");
const c_text=document.getElementById("c_text");
const d_text=document.getElementById("d_text");

const submitBtn=document.getElementById("submit");

let quizData=[];
let currentQuiz=0;
let score=0;

async function getQuiz(){
    const res=await fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple");
    const data=await res.json();

    quizData=data.results;
    loadQuiz();
}

getQuiz();

function loadQuiz(){
    deselectAnswers();

    const currentData=quizData[currentQuiz];
    questionEl.innerHTML=currentData.question;

    const optn=[...currentData.incorrect_answers,currentData.incorrect_answers]

    a_text.innerText=optn[0];
    b_text.innerText=optn[1];
    c_text.innerText=optn[2];
    d_text.innerText=optn[3];

    correctAns=currentData.correct_answer;
}

function deselectAnswers(){
    answerEls.forEach((el)=>(el.checked = false));
}

function getSelected(){
    let answer= undefined;
    answerEls.forEach((el)=>{
        if(el.checked){
            answer= el.nextElementSibling.innerText;
        }
    })
    return answer;
}

let correctAns="";

submitBtn.addEventListener("click",()=>{
    const selected= getSelected();
    if(selected=== correctAns){
        score++;
    }
    currentQuiz++;

    if(currentQuiz<quizData.length){
        loadQuiz();
    }else{
        quiz.innerHTML=`<h2>You answered ${score}/${quizData.length}correctly<h2>`;
    }
})
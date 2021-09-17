const quizData = [
    {
        question: "In the IPL 2015, which bowler won the Purple Cap?",
        a: "Lasith Malinga",
        b: "Bhuvneshwar Kumar",
        c: "Ashish Nehra",
        d: "Dwayne Bravo",
        correct: "d",
    },
    {
        question: "Who among the following teams did not reach the semi finals of IPL 2008?",
        a: "Delhi Daredevils",
        b: "Mumbai Indians",
        c: "Rajasthan Royals",
        d: "Chennai Super Kings",
        correct: "b",
    },
    {
        question: "Who was the first batsman to score a century in the IPL?",
        a: "Brendon McCullum",
        b: "Sachin Tendulkar",
        c: "Virendra Sehwag",
        d: "Shane Watson",
        correct: "a",
    },
    {
        question: "IPL 2021 Phase 2 starts on?",
        a: "19th September",
        b: "20th September",
        c: "21st September",
        d: "none of the above",
        correct: "a",
    },
];

const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')

let currentQuiz = 0
let score = 0

loadQuiz()

function loadQuiz() {
    deselectAnswers()

    const currentQuizData = quizData[currentQuiz]

    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let answer

    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })

    return answer
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    
    if(answer) {
        if(answer === quizData[currentQuiz].correct) {
            score+= 4
        } else {
            score-= 1
        }

        currentQuiz++

        if(currentQuiz < quizData.length) {
            loadQuiz()
        } else{
            quiz.innerHTML = `
                <h2>You scored ${score}/${quizData.length * 4}</h2>
                <button id="submit" onclick="location.reload()">Play Again?</button>
            `
        }
    }
})
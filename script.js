// 1. 문제 은행 (문제를 10개~20개 정도 넉넉히 적어두시면 더 좋습니다!)
const quizData = [
    {
        question: "1. 다음 중 맞춤법이 올바른 문장은 무엇일까요?",
        options: ["참 어의없는 일이다.", "참 어이없는 일이다."],
        correct: "참 어이없는 일이다."
    },
    {
        question: "2. 다음 단어 중 '품사'가 다른 하나는?",
        options: ["먹다", "달리다", "입다", "예쁘다"],
        correct: "예쁘다"
    },
    {
        question: "3. '설마가 사람 잡는다'는 속담의 뜻으로 가장 알맞은 것은?",
        options: ["사람을 쉽게 믿어서는 안 된다.", "요행을 바라지 말고 성실해야 한다.", "그럴 리 없다고 마음을 놓는 데서 탈이 난다."],
        correct: "그럴 리 없다고 마음을 놓는 데서 탈이 난다."
    },
    // 필요에 따라 문제를 계속 추가하세요!
];

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const scoreEl = document.getElementById('score');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

let currentQuiz = 0;
let score = 0;

startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', () => {
    currentQuiz = 0;
    score = 0;
    startQuiz();
});

// 퀴즈 시작 함수
function startQuiz() {
    // 🌟 핵심 1: 퀴즈 시작할 때 문제 순서를 무작위로 섞기
    quizData.sort(() => Math.random() - 0.5);

    startScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    loadQuiz();
}

// 문제를 화면에 띄우는 함수
function loadQuiz() {
    optionsEl.innerHTML = ''; 
    const currentQuizData = quizData[currentQuiz];
    
    // 문제를 섞었기 때문에 앞의 "1. " 같은 번호는 빼고 출력하거나 질문만 남기는 것이 좋습니다.
    questionEl.innerText = currentQuizData.question;

    // 🌟 핵심 2: 보기(선택지) 순서도 무작위로 섞기
    const shuffledOptions = [...currentQuizData.options].sort(() => Math.random() - 0.5);

    // 섞인 보기들로 버튼 생성하기
    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.addEventListener('click', () => selectAnswer(option, currentQuizData.correct));
        optionsEl.appendChild(button);
    });
}

// 정답을 확인하고 점수를 계산하는 함수
function selectAnswer(selected, correct) {
    if (selected === correct) {
        score += 100 / quizData.length; 
    }
    
    currentQuiz++;

    if (currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        showResult();
    }
}

// 최종 결과를 보여주는 함수
function showResult() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    scoreEl.innerText = Math.round(score); 
}

// 💡 선생님, 여기서 문제를 수정하고 추가하세요!
const quizData = [
    {
        question: "1. 다음 중 맞춤법이 올바른 문장은 무엇일까요?",
        options: ["참 어의없는 일이다.", "참 어이없는 일이다."],
        correct: "참 어이없는 일이다."
    },
    {
        question: "2. 다음 단어 중 '품사'가 다른 하나는?",
        options: ["먹다", "달리다", "입다", "예쁘다"],
        correct: "예쁘다" // 해설: 예쁘다(형용사), 나머지는 모두 동사
    },
    {
        question: "3. '설마가 사람 잡는다'는 속담의 뜻으로 가장 알맞은 것은?",
        options: ["사람을 쉽게 믿어서는 안 된다.", "요행을 바라지 말고 성실해야 한다.", "그럴 리 없다고 마음을 놓는 데서 탈이 난다."],
        correct: "그럴 리 없다고 마음을 놓는 데서 탈이 난다."
    }
];

// HTML 요소들을 자바스크립트로 불러오기
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

// 시작 버튼과 다시 풀기 버튼 이벤트 설정
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', () => {
    currentQuiz = 0;
    score = 0;
    startQuiz();
});

// 퀴즈 시작 함수
function startQuiz() {
    startScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    loadQuiz();
}

// 문제를 화면에 띄우는 함수
function loadQuiz() {
    optionsEl.innerHTML = ''; // 이전 보기 초기화
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;

    // 보기 버튼들 생성하기
    currentQuizData.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        // 보기를 클릭했을 때 정답을 확인하는 이벤트 추가
        button.addEventListener('click', () => selectAnswer(option, currentQuizData.correct));
        optionsEl.appendChild(button);
    });
}

// 정답을 확인하고 점수를 계산하는 함수
function selectAnswer(selected, correct) {
    if (selected === correct) {
        // 문제 개수에 따라 100점 만점으로 계산
        score += 100 / quizData.length; 
    }
    
    currentQuiz++;

    // 다음 문제가 남아있으면 다음 문제로, 아니면 결과 창으로 이동
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
    scoreEl.innerText = Math.round(score); // 소수점이 나올 경우 반올림
}

// Inisialisasi variabel
let targetNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 5;
let level = 1;
let timeLeft = 30; // waktu awal untuk level 1
let timerInterval;

const guessInput = document.getElementById('guess-input');
const submitBtn = document.getElementById('submit-btn');
const resultDisplay = document.getElementById('result');
const triesLeftDisplay = document.getElementById('tries-left');
const resetBtn = document.getElementById('reset-btn');
const timerDisplay = document.getElementById('timer');
const levelDisplay = document.getElementById('level-display');
const winSound = document.getElementById('win-sound');
const loseSound = document.getElementById('lose-sound');

// Menampilkan jumlah kesempatan dan level
triesLeftDisplay.textContent = `Kesempatan tersisa: ${attempts}`;
levelDisplay.textContent = `Level: ${level}`;

// Fungsi untuk memulai ulang game
function resetGame() {
    level = 1;
    timeLeft = 30;
    startNewLevel();
}

// Fungsi untuk memulai level baru
function startNewLevel() {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 6 - level; // semakin tinggi level, semakin sedikit kesempatan
    timeLeft = 30 - (level * 5); // semakin tinggi level, semakin sedikit waktu
    if (timeLeft < 5) timeLeft = 5; // minimum waktu 5 detik
    resultDisplay.textContent = '';
    triesLeftDisplay.textContent = `Kesempatan tersisa: ${attempts}`;
    levelDisplay.textContent = `Level: ${level}`;
    guessInput.value = '';
    resetBtn.style.display = 'none';
    submitBtn.style.display = 'inline-block';

    // Mulai timer
    clearInterval(timerInterval);
    timerDisplay.textContent = `Waktu tersisa: ${timeLeft} detik`;
    timerInterval = setInterval(countdown, 1000);
}

// Fungsi timer untuk menghitung mundur
function countdown() {
    timeLeft--;
    timerDisplay.textContent = `Waktu tersisa: ${timeLeft} detik`;

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        loseGame();
    }
}

// Fungsi untuk memproses tebakan
function checkGuess() {
    const userGuess = parseInt(guessInput.value);
    
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        resultDisplay.textContent = 'Tolong masukkan angka antara 1 dan 100.';
        return;
    }
    
    attempts--;
    triesLeftDisplay.textContent = `Kesempatan tersisa: ${attempts}`;
    
    if (userGuess === targetNumber) {
        winGame();
    } else if (attempts === 0) {
        loseGame();
    } else if (userGuess < targetNumber) {
        resultDisplay.textContent = 'Terlalu rendah!';
    } else {
        resultDisplay.textContent = 'Terlalu tinggi!';
    }
}

// Fungsi jika menang
function winGame() {
    resultDisplay.textContent = `Selamat! Kamu menebak dengan benar! Angkanya adalah ${targetNumber}.`;
    resultDisplay.classList.add('win');
    winSound.play();
    endGame(true);
}

// Fungsi jika kalah
function loseGame() {
    resultDisplay.textContent = `Kesempatan habis! Angka yang benar adalah ${targetNumber}.`;
    resultDisplay.classList.add('lose');
    loseSound.play();
    endGame(false);
}

// Fungsi untuk mengakhiri game
function endGame(isWin) {
    clearInterval(timerInterval);
    submitBtn.style.display = 'none';
    resetBtn.style.display = 'inline-block';
    if (isWin) {
        level++;
        setTimeout(startNewLevel, 3000); // Mulai level baru setelah 3 detik
    }
}

// Event listener untuk tombol "Tebak"
submitBtn.addEventListener('click', checkGuess);

// Event listener untuk tombol "Mulai Lagi"
resetBtn.addEventListener('click', resetGame);

// Mulai game pertama kali
startNewLevel();

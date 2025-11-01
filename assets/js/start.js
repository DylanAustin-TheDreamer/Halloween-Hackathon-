const buttonWizard = document.getElementById('enter-library');
const modal = document.getElementById('modal');
let backgroundMusic = new Audio('assets/sounds/main-theme.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;

buttonWizard.addEventListener('click', startGame);
function startGame() {
    buttonWizard.style.display = 'none';
    modal.classList.add('fade-out');
    backgroundMusic.play();
}
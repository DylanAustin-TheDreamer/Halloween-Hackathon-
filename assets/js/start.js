const buttonWizard = document.getElementById('enter-library');
const modal = document.getElementById('modal');
let backgroundMusic = new Audio('assets/sounds/main-theme.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;
const mute = document.getElementById('mute-button');

buttonWizard.addEventListener('click', startGame);
function startGame() {
    buttonWizard.style.display = 'none';
    modal.classList.add('fade-out');
    backgroundMusic.play();
}

mute.addEventListener('click', () => {
    if (backgroundMusic.volume > 0 ) {
        backgroundMusic.volume = 0;
    } else {
        backgroundMusic.volume = 0.5;
        backgroundMusic.play();
    }
});
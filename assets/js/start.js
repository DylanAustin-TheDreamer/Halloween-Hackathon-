const buttonWizard = document.getElementById('enter-library');
const audioCheckbox = document.getElementById('audio-checkbox');
const submitButton = document.getElementById('submit');
const modal = document.getElementById('enable-sound');
// declare and load audio files and volume settings
// Custom input volume styling
const inputRange = document.querySelector('.custom-input');

    inputRange.addEventListener('input', function () {
    const progress = (inputRange.value - inputRange.min) / (inputRange.max - inputRange.min) * 100;
    inputRange.style.background = `linear-gradient(...)`;
    // Update all audio volumes
    const newVolume = inputRange.value / 100;
    backgroundMusic.volume = newVolume;
    dungeonMusic.volume = newVolume;
    deathMusic.volume = newVolume;
    successMusic.volume = newVolume;
});
let backgroundMusic = new Audio('assets/sounds/main-theme.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = inputRange.value / 100;
const mute = document.getElementById('mute-button');

submitButton.addEventListener('click', startGame);
function startGame() {
    buttonWizard.classList.remove('enter-library');
    buttonWizard.style.display = 'none';
    if (audioCheckbox.checked) {
  			backgroundMusic.play();
			} else {
  			backgroundMusic.pause();
			}
    modal.classList.add('fade-out');
}

mute.addEventListener('click', () => {
    if (backgroundMusic.volume > 0 ) {
        backgroundMusic.volume = 0;
    } else {
        backgroundMusic.volume = inputRange.value / 100;
        backgroundMusic.play();
    }
});
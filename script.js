// Back to top button
const backToTopBtn = document.getElementById('backToTopBtn');

window.onscroll = function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
};

backToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Background audio setup
const bgAudio = document.getElementById('bgAudio');
const volumeSlider = document.getElementById('volumeSlider');
const muteBtn = document.getElementById('muteBtn');

// Play on user interaction
function playAudioOnce() {
    bgAudio.play().catch(err => console.warn('Autoplay blocked:', err));
    document.removeEventListener('click', playAudioOnce);
}
document.addEventListener('click', playAudioOnce);

// Volume control
volumeSlider.addEventListener('input', () => {
    bgAudio.volume = volumeSlider.value;
    if (bgAudio.volume == 0) {
        bgAudio.muted = true;
        muteBtn.textContent = '🔇';
    } else {
        bgAudio.muted = false;
        muteBtn.textContent = '🔊';
    }
});

// Mute toggle
muteBtn.addEventListener('click', () => {
    bgAudio.muted = !bgAudio.muted;
    muteBtn.textContent = bgAudio.muted ? '🔇' : '🔊';
    volumeSlider.value = bgAudio.muted ? 0 : bgAudio.volume;
});

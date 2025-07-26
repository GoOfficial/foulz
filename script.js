// BACK TO TOP BUTTON FUNCTIONALITY
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

// BACKGROUND AUDIO CONTROLS
const bgAudio = document.getElementById('bgAudio');
const volumeSlider = document.getElementById('volumeSlider');
const muteBtn = document.getElementById('muteBtn');

// Try to autoplay audio when page loads
window.addEventListener('DOMContentLoaded', () => {
    try {
        bgAudio.muted = false;
        bgAudio.volume = parseFloat(volumeSlider.value);
        const playPromise = bgAudio.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Audio autoplayed successfully.');
            }).catch((err) => {
                console.warn('Autoplay was blocked:', err);
            });
        }
    } catch (e) {
        console.error('Autoplay setup failed:', e);
    }
});

// VOLUME SLIDER CONTROL
volumeSlider.addEventListener('input', () => {
    const volume = parseFloat(volumeSlider.value);
    bgAudio.volume = volume;

    if (volume === 0) {
        bgAudio.muted = true;
        muteBtn.textContent = '🔇';
    } else {
        bgAudio.muted = false;
        muteBtn.textContent = '🔊';
    }
});

// MUTE / UNMUTE TOGGLE BUTTON
muteBtn.addEventListener('click', () => {
    bgAudio.muted = !bgAudio.muted;

    if (bgAudio.muted) {
        muteBtn.textContent = '🔇';
        volumeSlider.value = 0;
    } else {
        muteBtn.textContent = '🔊';
        if (bgAudio.volume === 0) {
            bgAudio.volume

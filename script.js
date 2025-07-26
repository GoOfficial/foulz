const bgAudio = document.getElementById('bgAudio');
const volumeSlider = document.getElementById('volumeSlider');
const muteBtn = document.getElementById('muteBtn');

// Try to unmute and play (will only work if browser allows)
window.addEventListener('DOMContentLoaded', () => {
    bgAudio.muted = false;
    bgAudio.volume = volumeSlider.value;
    bgAudio.play().catch(err => {
        console.warn('Autoplay blocked:', err);
    });
});

// Volume slider control
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

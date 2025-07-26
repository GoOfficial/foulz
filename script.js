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

// SAFELY AUTOPLAY WITH FADE-IN
window.addEventListener('DOMContentLoaded', () => {
    bgAudio.volume = 0; // Start silent

    const tryPlay = bgAudio.play();

    if (tryPlay !== undefined) {
        tryPlay
            .then(() => {
                console.log('Autoplay worked.');

                // Fade in volume
                let vol = 0;
                const targetVol = parseFloat(volumeSlider.value); // 1 by default
                const fadeInterval = setInterval(() => {
                    if (vol < targetVol) {
                        vol += 0.05;
                        bgAudio.volume = vol;
                        volumeSlider.value = vol;
                    } else {
                        clearInterval(fadeInterval);
                        bgAudio.volume = targetVol;
                    }
                }, 100);
            })
            .catch((err) => {
                console.warn('Autoplay blocked:', err);
                muteBtn.textContent = '🔇';
            });
    }
});

// VOLUME SLIDER CONTROL
volumeSlider.addEventListener('input', () => {
    const volume = parseFloat(volumeSlider.value);
    bgAudio.volume = volume;

    if (volume === 0) {
        muteBtn.textContent = '🔇';
    } else {
        muteBtn.textContent = '🔊';
    }
});

// MUTE / UNMUTE TOGGLE BUTTON
muteBtn.addEventListener('click', () => {
    if (bgAudio.volume > 0) {
        bgAudio.dataset.prevVolume = bgAudio.volume;
        bgAudio.volume = 0;
        volumeSlider.value = 0;
        muteBtn.textContent = '🔇';
    } else {
        const previous = parseFloat(bgAudio.dataset.prevVolume || 1);
        bgAudio.volume = previous;
        volumeSlider.value = previous;
        muteBtn.textContent = '🔊';
    }
});

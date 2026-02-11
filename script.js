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

const bgAudio = document.getElementById('bgAudio');
const volumeSlider = document.getElementById('volumeSlider');
const muteBtn = document.getElementById('muteBtn');
const audioPrompt = document.getElementById('audioPrompt');

bgAudio.volume = 0;

window.addEventListener('DOMContentLoaded', () => {
    const playPromise = bgAudio.play();

    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                console.log('Autoplay success');
                fadeInVolume(parseFloat(volumeSlider.value || 1));
            })
            .catch((err) => {
                console.warn('Autoplay blocked:', err);
                if (audioPrompt) audioPrompt.style.display = 'flex';
            });
    }
});

function fadeInVolume(targetVol) {
    let vol = 0;
    const fadeInterval = setInterval(() => {
        vol = Math.min(vol + 0.05, targetVol);
        bgAudio.volume = vol;
        volumeSlider.value = vol;
        if (vol >= targetVol) clearInterval(fadeInterval);
    }, 100);
}

if (audioPrompt) {
    audioPrompt.addEventListener('click', () => {
        bgAudio.muted = false;
        bgAudio.volume = 0;
        bgAudio.play().then(() => {
            fadeInVolume(parseFloat(volumeSlider.value || 1));
            audioPrompt.style.display = 'none';
        });
    });
}

volumeSlider.addEventListener('input', () => {
    const volume = parseFloat(volumeSlider.value);
    bgAudio.volume = volume;

    if (volume === 0) {
        muteBtn.textContent = '🔇';
    } else {
        muteBtn.textContent = '🔊';
    }
});

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

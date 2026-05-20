(() => {
    const audio = document.getElementById('bgaudio');
    const muteBtn = document.getElementById('muteBtn');
    const slider = document.getElementById('volumeSlider');
    const loader = document.getElementById('loader');
    const enterBtn = document.getElementById('loaderEnter');

    if (!audio) return;

    const storedVol = parseFloat(localStorage.getItem('foulz_vol'));
    const storedMute = localStorage.getItem('foulz_muted') === '1';
    const initialVol = isNaN(storedVol) ? 0.25 : storedVol;

    audio.volume = storedMute ? 0 : initialVol;
    if (slider) slider.value = storedMute ? 0 : initialVol;

    const speakerOn = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>';
    const speakerOff = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>';

    const renderMute = () => {
        const muted = audio.volume === 0;
        muteBtn.innerHTML = muted ? speakerOff : speakerOn;
        muteBtn.classList.toggle('muted', muted);
    };

    let lastVol = initialVol > 0 ? initialVol : 0.5;
    let dismissed = false;

    const dismissLoader = () => {
        if (dismissed) return;
        dismissed = true;
        loader.classList.add('gone');
        audio.play().catch(() => {});
        setTimeout(() => {
            loader.remove();
        }, 900);
    };

    enterBtn.addEventListener('click', dismissLoader);
    loader.addEventListener('click', (e) => {
        if (e.target === loader || e.target.classList.contains('loader-inner') || e.target.classList.contains('loader-mark')) {
            dismissLoader();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!dismissed && (e.key === 'Enter' || e.key === ' ')) {
            dismissLoader();
        }
    });

    slider.addEventListener('input', () => {
        const v = parseFloat(slider.value);
        audio.volume = v;
        if (v > 0) lastVol = v;
        localStorage.setItem('foulz_vol', v);
        localStorage.setItem('foulz_muted', v === 0 ? '1' : '0');
        renderMute();
    });

    muteBtn.addEventListener('click', () => {
        if (audio.volume > 0) {
            lastVol = audio.volume;
            audio.volume = 0;
            slider.value = 0;
            localStorage.setItem('foulz_muted', '1');
        } else {
            audio.volume = lastVol;
            slider.value = lastVol;
            localStorage.setItem('foulz_muted', '0');
            localStorage.setItem('foulz_vol', lastVol);
        }
        renderMute();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'm' || e.key === 'M') {
            if (!loader.classList.contains('gone')) return;
            muteBtn.click();
        }
    });

    renderMute();
})();

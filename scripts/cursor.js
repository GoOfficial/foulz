(() => {
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    const glow = document.getElementById('cursorGlow');
    const grid = document.querySelector('.bg-grid');
    const particles = document.querySelector('.bg-particles');

    if (!dot || !ring || !glow) return;

    const isTouch = window.innerWidth < 720 && matchMedia('(hover: none)').matches;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let dotX = mouseX;
    let dotY = mouseY;
    let glowX = mouseX;
    let glowY = mouseY;

    const ringEase = 0.16;
    const dotEase = 0.16;
    const glowEase = 0.16;

    if (isTouch) {
        dot.style.display = 'none';
        ring.style.display = 'none';
    }

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    const setVar = (el, x, y) => {
        el.style.setProperty('--mx', x + 'px');
        el.style.setProperty('--my', y + 'px');
    };

    const tick = () => {
        ringX += (mouseX - ringX) * ringEase;
        ringY += (mouseY - ringY) * ringEase;
        dotX += (mouseX - dotX) * dotEase;
        dotY += (mouseY - dotY) * dotEase;
        glowX += (mouseX - glowX) * glowEase;
        glowY += (mouseY - glowY) * glowEase;

        if (!isTouch) {
            ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
            dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
        }

        setVar(glow, glowX, glowY);

        const w = window.innerWidth;
        const h = window.innerHeight;
        const offX = (glowX / w - 0.5) * 2;
        const offY = (glowY / h - 0.5) * 2;

        if (grid) {
            grid.style.translate = `${offX * 12}px ${offY * 12}px`;
        }

        if (particles) {
            particles.style.translate = `${offX * 6}px ${offY * 6}px`;
        }

        requestAnimationFrame(tick);
    };

    tick();

    const interactiveSelector = 'a, button, input, .glass-card, .link-card, .chip-link, .tabs a, .audio-btn, .loader-enter, .back-top, .brand';
    document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.addEventListener('mouseenter', () => {
            ring.classList.add('hover');
            dot.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            ring.classList.remove('hover');
            dot.classList.remove('hover');
        });
    });

    if (!isTouch) {
        document.querySelectorAll('.glass-card, .proj-card').forEach((card) => {
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'transform 0.18s var(--ease), box-shadow 0.55s var(--ease)';
            });
            card.addEventListener('mousemove', (e) => {
                const r = card.getBoundingClientRect();
                const x = e.clientX - r.left;
                const y = e.clientY - r.top;
                card.style.setProperty('--mx', x + 'px');
                card.style.setProperty('--my', y + 'px');
                const rx = ((y / r.height) - 0.5) * -2.4;
                const ry = ((x / r.width) - 0.5) * 2.4;
                card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transition = '';
                card.style.transform = '';
            });
        });
    }

    document.addEventListener('mouseleave', () => {
        ring.style.opacity = '0';
        dot.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        ring.style.opacity = '1';
        dot.style.opacity = '1';
    });
})();

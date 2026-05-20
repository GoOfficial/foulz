(() => {
    const yr = document.getElementById('year');
    if (yr) yr.textContent = new Date().getFullYear();

    const particles = document.getElementById('bgParticles');
    if (particles) {
        const count = window.innerWidth < 720 ? 22 : 48;
        const frag = document.createDocumentFragment();
        for (let i = 0; i < count; i++) {
            const p = document.createElement('span');
            const size = 1 + Math.random() * 2.2;
            const dur = 18 + Math.random() * 24;
            p.style.left = (Math.random() * 100) + '%';
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            p.style.opacity = (0.25 + Math.random() * 0.45).toFixed(2);
            p.style.animationDuration = dur.toFixed(2) + 's';
            p.style.animationDelay = (-Math.random() * dur).toFixed(2) + 's';
            const shade = Math.random();
            if (shade < 0.4) {
                p.style.background = '#ffffff';
                p.style.boxShadow = '0 0 4px rgba(255, 230, 240, 0.5)';
            } else if (shade < 0.75) {
                p.style.background = '#ffd6e6';
            } else {
                p.style.background = '#ffafd3';
                p.style.boxShadow = '0 0 6px rgba(255, 175, 211, 0.55)';
            }
            frag.appendChild(p);
        }
        particles.appendChild(frag);
    }

    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    reveals.forEach((el) => revealObserver.observe(el));

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const backBtn = document.getElementById('backTop');
    if (backBtn) {
        const toggleBack = () => {
            backBtn.classList.toggle('show', window.scrollY > 600);
        };
        window.addEventListener('scroll', toggleBack, { passive: true });
        backBtn.addEventListener('click', () => {
            const start = window.scrollY;
            const dur = 900;
            const t0 = performance.now();
            const step = (now) => {
                const t = Math.min((now - t0) / dur, 1);
                window.scrollTo(0, start * (1 - easeOutQuart(t)));
                if (t < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const loader = document.getElementById('loader');
            if (loader && !loader.classList.contains('gone')) {
                document.getElementById('loaderEnter')?.click();
            }
        }
    });

    document.addEventListener('contextmenu', (e) => e.preventDefault());

    document.addEventListener('keydown', (e) => {
        const k = (e.key || '').toUpperCase();
        if (k === 'F12') { e.preventDefault(); return; }
        if (e.ctrlKey && e.shiftKey && (k === 'I' || k === 'J' || k === 'C')) { e.preventDefault(); return; }
        if (e.ctrlKey && (k === 'U' || k === 'S')) { e.preventDefault(); return; }
        if ((e.metaKey || e.ctrlKey) && e.altKey && (k === 'I' || k === 'J' || k === 'C')) { e.preventDefault(); return; }
    });

    document.addEventListener('dragstart', (e) => {
        if (e.target.tagName === 'IMG' || e.target.closest('a')) e.preventDefault();
    });

    document.querySelectorAll('[data-href]').forEach((el) => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const url = el.dataset.href;
            const blank = el.dataset.target === '_blank';
            if (blank) {
                window.open(url, '_blank', 'noopener,noreferrer');
            } else {
                window.location.href = url;
            }
        });
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                el.click();
            }
        });
    });
})();

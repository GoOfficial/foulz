(() => {
    const nav = document.getElementById('topnav');
    const tabs = document.querySelectorAll('[data-tab]');
    const sections = document.querySelectorAll('section[id]');

    if (!nav) return;

    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const smoothScrollTo = (targetY, duration = 900) => {
        if (window.__foulzSyncScroll) window.__foulzSyncScroll();
        const startY = window.scrollY;
        const dist = targetY - startY;
        const startT = performance.now();

        const step = (now) => {
            const elapsed = now - startT;
            const t = Math.min(elapsed / duration, 1);
            const eased = easeInOutCubic(t);
            window.scrollTo(0, startY + dist * eased);
            if (t < 1) {
                requestAnimationFrame(step);
            } else if (window.__foulzSyncScroll) {
                window.__foulzSyncScroll();
            }
        };
        requestAnimationFrame(step);
    };

    const scrollToTab = (id) => {
        const target = document.getElementById(id);
        if (!target) return;
        const navH = nav.offsetHeight;
        const y = target.getBoundingClientRect().top + window.scrollY - navH - 30;
        smoothScrollTo(y, 1000);
    };

    tabs.forEach((tab) => {
        tab.addEventListener('click', (e) => {
            const id = tab.dataset.tab;
            if (!id) return;
            e.preventDefault();
            scrollToTab(id);
        });
        tab.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                tab.click();
            }
        });
    });

    const setActive = (id) => {
        document.querySelectorAll('.tabs [data-tab]').forEach((a) => {
            a.classList.toggle('active', a.dataset.tab === id);
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setActive(entry.target.id);
            }
        });
    }, {
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0
    });

    sections.forEach((s) => observer.observe(s));

    let lastScroll = 0;
    let ticking = false;

    const updateNav = () => {
        const y = window.scrollY;
        if (y > 80 && y > lastScroll + 4) {
            nav.classList.add('hidden');
        } else if (y < lastScroll - 4 || y < 80) {
            nav.classList.remove('hidden');
        }
        lastScroll = y;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNav);
            ticking = true;
        }
    }, { passive: true });
})();

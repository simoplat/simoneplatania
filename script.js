document.addEventListener('DOMContentLoaded', () => {

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'light' ? 'dark' : 'light';
            if (next === 'dark') {
                document.documentElement.removeAttribute('data-theme');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
            }
            localStorage.setItem('theme', next);
        });
    }

    // Globe Dropdown Language Selector
    const langDropdownWrapper = document.getElementById('lang-dropdown-wrapper');
    const langDropdownBtn = document.getElementById('lang-dropdown-btn');

    if (langDropdownBtn && langDropdownWrapper) {
        langDropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = langDropdownWrapper.classList.toggle('open');
            langDropdownBtn.setAttribute('aria-expanded', isOpen);
        });

        document.addEventListener('click', (e) => {
            if (!langDropdownWrapper.contains(e.target)) {
                langDropdownWrapper.classList.remove('open');
                langDropdownBtn.setAttribute('aria-expanded', 'false');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                langDropdownWrapper.classList.remove('open');
                langDropdownBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }


    // Set current year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isActive = hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });

        // Ensure scrolling is re-enabled if window is resized above mobile breakpoint
        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) {
                if (navLinks.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            }
        });
    }

    // ── Hero Dot-Grid Canvas ─────────────────────────────────────────────────
    const heroCanvas = document.getElementById('hero-canvas');
    if (heroCanvas) {
        const hCtx = heroCanvas.getContext('2d');
        const SPACING = 36;       // grid cell size
        const DOT_R = 1.6;       // base dot radius
        const FORCE = 140;       // repulsion radius (increased)
        const STRENGTH = 0.45;    // repulsion strength (increased)
        let hMouse = { x: -9999, y: -9999 };
        let dots = [];
        let hW, hH;

        function buildGrid() {
            hW = heroCanvas.offsetWidth;
            hH = heroCanvas.offsetHeight;
            heroCanvas.width = hW;
            heroCanvas.height = hH;
            dots = [];
            const cols = Math.ceil(hW / SPACING) + 1;
            const rows = Math.ceil(hH / SPACING) + 1;
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    dots.push({
                        ox: c * SPACING,   // origin X
                        oy: r * SPACING,   // origin Y
                        x: c * SPACING,   // current X
                        y: r * SPACING,   // current Y
                        vx: 0,
                        vy: 0,
                    });
                }
            }
        }

        heroCanvas.addEventListener('mousemove', e => {
            const rect = heroCanvas.getBoundingClientRect();
            hMouse.x = e.clientX - rect.left;
            hMouse.y = e.clientY - rect.top;
        });
        heroCanvas.addEventListener('mouseleave', () => {
            hMouse.x = -9999;
            hMouse.y = -9999;
        });

        // Forward mouse events from the section (since canvas is pointer-events:none we listen on the section)
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.addEventListener('mousemove', e => {
                const rect = heroCanvas.getBoundingClientRect();
                hMouse.x = e.clientX - rect.left;
                hMouse.y = e.clientY - rect.top;
            });
            heroSection.addEventListener('mouseleave', () => {
                hMouse.x = -9999;
                hMouse.y = -9999;
            });
        }

        let hFrame = 0;
        function animateHero() {
            hCtx.clearRect(0, 0, hW, hH);
            hFrame++;

            dots.forEach(d => {
                // Idle wave
                const waveY = Math.sin(hFrame * 0.02 + d.ox * 0.025 + d.oy * 0.02) * 3.8;
                const waveX = Math.cos(hFrame * 0.015 + d.ox * 0.02 + d.oy * 0.025) * 2.5;

                // Cursor repulsion
                const dx = d.ox - hMouse.x;
                const dy = d.oy - hMouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                let tx = d.ox + waveX, ty = d.oy + waveY;
                if (dist < FORCE && dist > 0) {
                    const push = (1 - dist / FORCE) * STRENGTH * FORCE;
                    tx += (dx / dist) * push;
                    ty += (dy / dist) * push; // waveX/Y are already added to tx/ty
                }

                // Spring towards target
                d.vx += (tx - d.x) * 0.12;
                d.vy += (ty - d.y) * 0.12;
                d.vx *= 0.72;
                d.vy *= 0.72;
                d.x += d.vx;
                d.y += d.vy;

                // Draw dot — brighter when displaced
                const disp = Math.sqrt((d.x - d.ox) ** 2 + (d.y - d.oy) ** 2);
                const alpha = 0.35 + Math.min(disp / 60, 1) * 0.50;
                const radius = DOT_R + Math.min(disp / 38, 1) * 1.6;
                hCtx.beginPath();
                hCtx.arc(d.x, d.y, radius, 0, Math.PI * 2);
                hCtx.fillStyle = `rgba(14, 165, 233, ${alpha})`;
                hCtx.fill();
            });

            requestAnimationFrame(animateHero);
        }

        buildGrid();
        animateHero();
        window.addEventListener('resize', buildGrid);
    }
    // ────────────────────────────────────────────────────────────────────────

    // Navbar Scrolled State
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

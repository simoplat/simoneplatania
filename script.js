const i18n = {
    it: {
        nav_about: "Chi Sono",
        nav_work: "Progetti",
        nav_contact: "Contatti",
        nav_edu: "Istruzione",
        hero_greeting: "Ciao, sono",
        hero_subtitle: "Ingegnere Informatico & Software Developer",
        hero_desc: "Laureato in Ingegneria Informatica con passione per lo sviluppo software, reti e telecomunicazioni, agenti AI, IoT, sistemi embedded, sicurezza informatica e cybersecurity.",
        btn_contact: "Contattami",
        btn_work: "I Miei Progetti",
        about_title: "Chi Sono",
        about_p1: "Laureato in Ingegneria Informatica (L-8) presso l'Università degli Studi di Catania, con solide competenze nell'ingegneria del software, reti di calcolatori e sviluppo moderno.",
        about_p2: "Nel percorso di Laurea Magistrale mi sono occupato in dettaglio di sicurezza informatica e cybersecurity, progettazione del software e applicazione di design pattern architetturali, reti di automazione industriale e per l'automotive (standard PROFINET, CAN bus, Automotive Ethernet), nonché di architetture di rete avanzate fino al 5G.",
        about_p3: "Appassionato di sistemi software scalabili e complessi, elaborazione del segnale, agenti AI e applicazioni web reattive e performanti.",
        skills_title: "Competenze Tecniche",
        skill_ai: "Agenti AI",
        edu_title: "Istruzione",
        edu0_degree: "Laurea Magistrale in Ingegneria Informatica",
        edu0_date: "2025 — In corso",
        edu0_school: "Università degli Studi di Catania",
        edu1_degree: "Laurea Triennale in Ingegneria Informatica (L-8)",
        edu1_date: "2022 — 2025",
        edu1_school: "Università degli Studi di Catania",
        edu1_desc: "Voto: 105/110.<br>Tesi di laurea su tecniche di Deep Learning applicate alla previsione e analisi del Rischio Idrogeologico.",
        edu2_degree: "Diploma di Maturità Scientifica",
        edu2_date: "2015 — 2020",
        edu2_school: "Liceo Scientifico Concetto Marchesi",
        edu2_desc: "Voto: 100/100.",
        work_title: "Progetti Realizzati",
        btn_view_proj: "Vedi su GitHub",
        badge_thesis: "Tesi di Laurea",
        proj_thesis_cat: "Deep Learning & AI",
        proj_thesis_title: "Tesi: Deep Learning per il Rischio Idrogeologico",
        proj_thesis_desc: "Studio e applicazione di architetture di Deep Learning per l'elaborazione di dati geo-ambientali, analisi del territorio e modelli predittivi per la stima e mitigazione del rischio idrogeologico.",
        proj_youtube_cat: "Sviluppo Web Full-Stack",
        proj_youtube_title: "YouTube Clone & Social Platform",
        proj_youtube_desc: "Piattaforma social video con interfaccia grafica ispirata a YouTube, interazione dinamica frontend-backend, gestione video e database; inizialmente sviluppata in PHP e MySQL, successivamente portata su framework Laravel.",
        proj_sweng_cat: "Ingegneria del Software",
        proj_sweng_title: "Progetto Ingegneria del Software",
        proj_sweng_desc: "Progetto software completo sviluppato seguendo pattern architetturali, principi di clean code, testing e controllo di versione con GitHub.",
        proj_gnuradio_cat: "Sistemi DSP & SDR",
        proj_gnuradio_title: "GNU Radio Signal Processing",
        proj_gnuradio_desc: "Flowgraph Software Defined Radio per elaborazione digitale dei segnali, analisi spettrale, modulazione/demodulazione e comunicazioni RF.",
        proj_omnet_cat: "Simulazione di Reti",
        proj_omnet_title: "OMNeT++ Network Simulator",
        proj_omnet_desc: "Simulazioni ad eventi discreti per l'analisi di instradamento pacchetti, congestione di rete, topologie complesse e metriche di prestazione.",
        proj_esp32_cat: "IoT & Sistemi Embedded",
        proj_esp32_title: "ESP32 Smart Home Automation",
        proj_esp32_desc: "Sistema di automazione domestica basato su microcontrollore ESP32, sensori ambientali (temperatura, umidità, illuminazione), controllo relè e telemetria wireless via MQTT / Web Server.",
        contact_title: "Creiamo qualcosa insieme.",
        contact_desc: "Disponibile per nuove opportunità professionali, collaborazioni e progetti software.",
        footer_rights: "Tutti i diritti riservati.",
        footer_note: "Progettato con precisione."
    },
    ...(typeof window !== 'undefined' && window.externalTranslations ? window.externalTranslations : {})
};

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
    const langCurrentLabel = document.getElementById('lang-current-label');
    const langOptions = document.querySelectorAll('.lang-option');
    const i18nElements = document.querySelectorAll('[data-i18n]');

    const setLanguage = (lang) => {
        if (!i18n[lang]) return;
        document.documentElement.lang = lang;
        if (langCurrentLabel) {
            langCurrentLabel.textContent = lang.toUpperCase();
        }

        langOptions.forEach(opt => {
            if (opt.getAttribute('data-lang') === lang) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });

        i18nElements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (i18n[lang] && i18n[lang][key]) {
                el.innerHTML = i18n[lang][key];
            }
        });

        localStorage.setItem('lang', lang);
    };

    if (langDropdownBtn && langDropdownWrapper) {
        langDropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = langDropdownWrapper.classList.toggle('open');
            langDropdownBtn.setAttribute('aria-expanded', isOpen);
        });

        langOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const selectedLang = option.getAttribute('data-lang');
                setLanguage(selectedLang);
                langDropdownWrapper.classList.remove('open');
                langDropdownBtn.setAttribute('aria-expanded', 'false');
            });
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

        // Initialize language: default to English for first-time visitors
        const savedLang = localStorage.getItem('lang');
        if (savedLang && i18n[savedLang]) {
            setLanguage(savedLang);
        } else {
            setLanguage('en');
        }
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

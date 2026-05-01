const i18n = {
    en: {
        nav_about: "About",
        nav_exp: "Experience",
        nav_work: "Work",
        nav_contact: "Contact",
        hero_greeting: "Hello, I am",
        hero_subtitle: "Creative Developer & Designer",
        hero_desc: "I craft elevated digital experiences with a focus on minimalist design, clean code, and user-centric interactions.",
        btn_contact: "Get in Touch",
        btn_work: "View My Work",
        about_title: "About Me",
        about_p1: "With a passion for aesthetics and functionality, I build digital products that not only look beautiful but perform flawlessly. My approach combines strategic thinking with modern web technologies.",
        about_p2: "I specialize in creating responsive, accessible, and highly interactive websites that leave a lasting impression.",
        skills_title: "Core Skills",
        exp_title: "Experience",
        exp1_role: "Senior Developer",
        exp1_date: "2021 — Present",
        exp1_desc: "Led the frontend development team in building scalable web applications. Mentored junior developers and established design system guidelines.",
        exp2_role: "UI/UX Designer & Developer",
        exp2_date: "2018 — 2021",
        exp2_desc: "Designed and implemented high-end portfolios, e-commerce platforms, and interactive campaigns for international clients.",
        nav_edu: "Education",
        edu_title: "Education",
        edu1_degree: "Bachelor's Degree in Computer Engineering",
        edu1_date: "2022 — 2025",
        edu1_school: "University",
        edu1_desc: "Focus on software development, computer systems, and engineering principles.",
        edu2_degree: "Scientific High School Diploma",
        edu2_date: "2015 — 2020",
        edu2_school: "Scientific High School",
        edu2_desc: "Final Grade: 100/100.",
        work_title: "Selected Work",
        proj1_cat: "E-Commerce",
        proj2_cat: "SaaS Platform",
        btn_view_proj: "View Project",
        contact_title: "Let's create something together.",
        contact_desc: "Currently available for freelance opportunities and full-time roles.",
        footer_rights: "All rights reserved.",
        footer_note: "Designed with precision."
    },
    it: {
        nav_about: "Chi Sono",
        nav_exp: "Esperienza",
        nav_work: "Progetti",
        nav_contact: "Contatti",
        hero_greeting: "Ciao, sono",
        hero_subtitle: "Sviluppatore Creativo & Designer",
        hero_desc: "Creo esperienze digitali di alto livello con un focus sul design minimalista, codice pulito e interazioni centrate sull'utente.",
        btn_contact: "Contattami",
        btn_work: "I Miei Lavori",
        about_title: "Chi Sono",
        about_p1: "Con una passione per l'estetica e la funzionalità, costruisco prodotti digitali che non sono solo belli da vedere, ma che funzionano alla perfezione. Il mio approccio combina pensiero strategico e tecnologie web moderne.",
        about_p2: "Mi specializzo nella creazione di siti web responsivi, accessibili e altamente interattivi che lasciano un'impressione duratura.",
        skills_title: "Competenze Principali",
        exp_title: "Esperienza",
        exp1_role: "Sviluppatore Senior",
        exp1_date: "2021 — Presente",
        exp1_desc: "Ho guidato il team di sviluppo frontend nella creazione di applicazioni web scalabili. Ho fatto da mentore a sviluppatori junior e stabilito linee guida per il design system.",
        exp2_role: "UI/UX Designer & Sviluppatore",
        exp2_date: "2018 — 2021",
        exp2_desc: "Ho progettato e implementato portfolio di alta gamma, piattaforme e-commerce e campagne interattive per clienti internazionali.",
        nav_edu: "Istruzione",
        edu_title: "Istruzione",
        edu1_degree: "Laurea Triennale in Ingegneria Informatica",
        edu1_date: "2022 — 2025",
        edu1_school: "Università",
        edu1_desc: "Focus sullo sviluppo software, sistemi informatici e principi di ingegneria.",
        edu2_degree: "Diploma di Maturità Scientifica",
        edu2_date: "2015 — 2020",
        edu2_school: "Liceo Scientifico",
        edu2_desc: "Voto: 100/100.",
        work_title: "Lavori Selezionati",
        proj1_cat: "E-Commerce",
        proj2_cat: "Piattaforma SaaS",
        btn_view_proj: "Vedi Progetto",
        contact_title: "Creiamo qualcosa insieme.",
        contact_desc: "Attualmente disponibile per opportunità freelance e ruoli full-time.",
        footer_rights: "Tutti i diritti riservati.",
        footer_note: "Progettato con precisione."
    }
};

class Particle {
    constructor(x, y, canvas, ctx) {
        this.x = x;
        this.y = y;
        this.canvas = canvas;
        this.ctx = ctx;
        // Dimensione molto più varia (molte piccole, alcune molto grandi)
        this.size = (Math.random() * Math.random()) * 7 + 0.5;

        // Movimento più caotico e veloce
        this.speedX = Math.random() * 2.5 - 1.25;
        this.speedY = Math.random() * 2.5 - 1.25;

        // Opacità iniziale casuale per ogni particella
        const alpha = Math.random() * 0.5 + 0.2; // tra 0.2 e 0.7
        this.color = `rgba(139, 92, 246, ${alpha})`;

        // Velocità di rimpicciolimento molto variabile
        this.shrinkRate = Math.random() * 0.07 + 0.015;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > this.shrinkRate) {
            this.size -= this.shrinkRate;
        } else {
            this.size = 0;
        }
    }
    draw() {
        if (this.size <= 0) return;
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Canvas Background Particles
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        }
        window.addEventListener('resize', resize);
        resize();

        let particlesArray = [];
        let mouse = { x: null, y: null };
        let isMouseMoving = false;
        let mouseTimeout;

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            isMouseMoving = true;

            clearTimeout(mouseTimeout);
            mouseTimeout = setTimeout(() => {
                isMouseMoving = false;
            }, 100);

            // Aggiungi particelle al movimento del mouse solo se non siamo sulla sezione hero e non sulla navbar
            if (!e.target.closest('#hero') && !e.target.closest('#navbar')) {
                for (let i = 0; i < 2; i++) {
                    particlesArray.push(new Particle(mouse.x, mouse.y, canvas, ctx));
                }
            }
        });

        function handleParticles() {
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
                if (particlesArray[i].size <= 0) {
                    particlesArray.splice(i, 1);
                    i--;
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            handleParticles();
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

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


    const langToggle = document.getElementById('lang-toggle');
    const i18nElements = document.querySelectorAll('[data-i18n]');

    if (langToggle) {
        const activeLabel = langToggle.querySelector('.lang-active-label');
        const inactiveLabel = langToggle.querySelector('.lang-inactive-label');

        const setLanguage = (lang) => {
            langToggle.setAttribute('data-lang', lang);
            const otherLang = lang === 'en' ? 'it' : 'en';
            activeLabel.textContent = lang.toUpperCase();
            inactiveLabel.textContent = otherLang.toUpperCase();

            i18nElements.forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (i18n[lang] && i18n[lang][key]) {
                    el.textContent = i18n[lang][key];
                }
            });
            localStorage.setItem('lang', lang);
        };

        // Initialize language
        const savedLang = localStorage.getItem('lang');
        if (savedLang) {
            if (savedLang === 'it') setLanguage('it');
        } else {
            const browserLang = navigator.language || navigator.userLanguage;
            if (browserLang && browserLang.toLowerCase().startsWith('it')) {
                setLanguage('it');
            }
        }

        langToggle.addEventListener('click', () => {
            const currentLang = langToggle.getAttribute('data-lang');
            const newLang = currentLang === 'en' ? 'it' : 'en';
            setLanguage(newLang);
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
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Ensure scrolling is re-enabled if window is resized above mobile breakpoint
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                if (navLinks.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
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
                hCtx.fillStyle = `rgba(160, 100, 255, ${alpha})`;
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

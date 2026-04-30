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
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * 1.5 - 0.75;
        this.color = 'rgba(139, 92, 246, 0.5)';
        this.life = 100;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 2;
        if (this.size > 0.1) this.size -= 0.02;
    }
    draw() {
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

            // Add particles on mouse move
            for (let i = 0; i < 2; i++) {
                particlesArray.push(new Particle(mouse.x, mouse.y, canvas, ctx));
            }
        });

        function handleParticles() {
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
                if (particlesArray[i].life <= 0) {
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

        langToggle.addEventListener('click', () => {
            const currentLang = langToggle.getAttribute('data-lang');
            const newLang = currentLang === 'en' ? 'it' : 'en';
            langToggle.setAttribute('data-lang', newLang);

            // Swap labels: active shows new language, inactive shows old
            activeLabel.textContent = newLang.toUpperCase();
            inactiveLabel.textContent = currentLang.toUpperCase();

            i18nElements.forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (i18n[newLang] && i18n[newLang][key]) {
                    el.textContent = i18n[newLang][key];
                }
            });
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
    }

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

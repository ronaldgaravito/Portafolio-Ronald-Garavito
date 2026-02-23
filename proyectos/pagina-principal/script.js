// NAVBAR MENU TOGGLE
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });
}

const navLinksArray = document.querySelectorAll(".nav-link");
navLinksArray.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("active");
    // Active link update is handled by scroll listener
  });
});

// LANGUAGE TOGGLE
const langToggle = document.getElementById("lang-toggle");
const langIcon = document.querySelector(".theme-icon");

const translations = {
  es: {
    "nav-home": "Inicio",
    "nav-about": "Sobre Mí",
    "nav-soft-skills": "Habilidades Blandas",
    "nav-skills": "Habilidades",
    "nav-projects": "Proyectos",
    "nav-contact": "Contacto",
    "hero-greeting": "Hola, soy <span class=\"highlight-text\">Ronald</span>",
    "hero-title": "Ingeniero de Sistemas",
    "hero-description": "Apasionado por el desarrollo y la resolución de problemas. Buscando contribuir a proyectos innovadores que hagan un impacto real.",
    "hero-cv": "📄 Descargar CV",
    "hero-contact": "Contáctame",
    "about-h2": "Sobre Mí",
    "about-p1": "Soy estudiante de Ingeniería de Sistemas con pasión por el desarrollo de software. Durante mi formación académica, he adquirido sólidos conocimientos en programación, y solucion de problemas.",
    "about-p2": "Me especializo en crear metodos y eficientes que resuelven problemas reales. Me encanta aprender nuevas tecnologías.",
    "about-p3": "Busco una oportunidad para aplicar mis conocimientos en un equipo dinámico donde pueda contribuir al desarrollo de software de calidad y continuar creciendo profesionalmente.",
    "certs-h2": "Certificaciones",
    "stat-projects": "Proyectos",
    "stat-years": "Años de Estudio",
    "stat-commitment": "Compromiso",
    "timeline-title": "Ingeniería de Sistemas",
    "timeline-date": "Actualidad",
    "timeline-description": "Estudiante activo, enfocado en desarrollo de software y arquitectura de sistemas.",
    "soft-skills-h2": "Habilidades Blandas",
    "soft-skill-1": "Comunicación Efectiva",
    "soft-skill-2": "Trabajo en Equipo",
    "soft-skill-3": "Resolución de Problemas",
    "soft-skill-4": "Gestión del Tiempo",
    "soft-skill-5": "Pensamiento Crítico",
    "skills-h2": "Habilidades Técnicas",
    "skill-cat-1": "Lenguajes de Programación",
    "skill-cat-2": "Frontend",
    "skill-cat-3": "Backend & Bases de Datos",
    "skill-cat-4": "Herramientas & DevOps",
    "projects-h2": "Proyectos Destacados",
    "filter-all": "Todos",
    "filter-java": "Java / Backend",
    "filter-web": "Web / Frontend",
    "proj1-title": "Sistema de Gestión de Inventarios",
    "proj1-desc": "Aplicación web completa para gestionar inventarios con base de datos, reportes y autenticación de usuarios.",
    "proj2-title": "Aplicación Web de Tareas",
    "proj2-desc": "Gestor de tareas intuitivo con JavaScript vanilla, almacenamiento local y interfaz responsiva.",
    "proj3-title": "Aplicación del Clima",
    "proj3-desc": "Consulta el clima de cualquier ciudad en tiempo real utilizando una API externa. Interfaz dinámica y moderna.",
    "proj3-link": "Ver Proyecto →",
    "proj-details": "Ver Detalles →",
    "contact-h2": "Ponte en Contacto",
    "contact-p": "¿Tienes un proyecto en mente o deseas colaborar? ¡Me encantaría escucharte!",
    "placeholder-name": "Tu nombre",
    "placeholder-email": "Tu email",
    "placeholder-message": "Tu mensaje",
    "contact-button": "Enviar Mensaje",
    "copyright": "© 2025 Ronald Garavito. Todos los derechos reservados.",
    "footer-tagline": "Estudiante de Ingeniería de Sistemas.",
    "typing-texts": ["Ronald", "Sistemas", "Software"]
  },
  en: {
    "nav-home": "Home",
    "nav-about": "About Me",
    "nav-soft-skills": "Soft Skills",
    "nav-skills": "Skills",
    "nav-projects": "Projects",
    "nav-contact": "Contact",
    "hero-greeting": "Hi, I'm <span class=\"highlight-text\">Ronald</span>",
    "hero-title": "Systems Engineer",
    "hero-description": "Passionate about software development and problem solving. Looking to contribute to innovative projects that make a real impact.",
    "hero-cv": "📄 Download CV",
    "hero-contact": "Contact Me",
    "about-h2": "About Me",
    "about-p1": "I am a Systems Engineering student with a passion for software development. During my academic training, I have acquired solid knowledge in programming and problem solving.",
    "about-p2": "I specialize in creating efficient methods that solve real problems. I love learning new technologies.",
    "about-p3": "I am looking for an opportunity to apply my knowledge in a dynamic team where I can contribute to quality software development and continue growing professionally.",
    "certs-h2": "Certifications",
    "stat-projects": "Projects",
    "stat-years": "Years of Study",
    "stat-commitment": "Commitment",
    "timeline-title": "Systems Engineering",
    "timeline-date": "Present",
    "timeline-description": "Active student, focused on software development and systems architecture.",
    "soft-skills-h2": "Soft Skills",
    "soft-skill-1": "Effective Communication",
    "soft-skill-2": "Teamwork",
    "soft-skill-3": "Problem Solving",
    "soft-skill-4": "Time Management",
    "soft-skill-5": "Critical Thinking",
    "skills-h2": "Technical Skills",
    "skill-cat-1": "Programming Languages",
    "skill-cat-2": "Frontend",
    "skill-cat-3": "Backend & Databases",
    "skill-cat-4": "Tools & DevOps",
    "projects-h2": "Featured Projects",
    "filter-all": "All",
    "filter-java": "Java / Backend",
    "filter-web": "Web / Frontend",
    "proj1-title": "Inventory Management System",
    "proj1-desc": "Complete web application to manage inventories with database, reports, and user authentication.",
    "proj2-title": "Task Web App",
    "proj2-desc": "Intuitive task manager with vanilla JavaScript, local storage, and responsive interface.",
    "proj3-title": "Weather App",
    "proj3-desc": "Check the weather of any city in real time using an external API. Dynamic and modern interface.",
    "proj3-link": "View Project →",
    "proj-details": "View Details →",
    "contact-h2": "Get in Touch",
    "contact-p": "Do you have a project in mind or want to collaborate? I'd love to hear from you!",
    "placeholder-name": "Your name",
    "placeholder-email": "Your email",
    "placeholder-message": "Your message",
    "contact-button": "Send Message",
    "copyright": "© 2025 Ronald Garavito. All rights reserved.",
    "footer-tagline": "Systems Engineering Student.",
    "typing-texts": ["Ronald", "Systems", "Software"]
  }
};

let currentLang = localStorage.getItem("language") || "es";

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("language", lang);

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translations[lang][key]) {
      element.innerHTML = translations[lang][key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    if (translations[lang][key]) {
      element.placeholder = translations[lang][key];
    }
  });

  // Update flag icon
  if (langIcon) {
    langIcon.textContent = lang === "es" ? "🇺🇸" : "🇨🇴";
  }

  // Sync Theme with Language
  if (lang === "en") {
    document.body.classList.add("light-mode");
  } else {
    document.body.classList.remove("light-mode");
  }

  // Update typing effect texts
  if (typeof updateTypingTexts === 'function') {
    updateTypingTexts(translations[lang]["typing-texts"]);
  }
}

if (langToggle) {
  langToggle.addEventListener("click", () => {
    const newLang = currentLang === "es" ? "en" : "es";
    setLanguage(newLang);
  });
}

// Initial language set
document.addEventListener("DOMContentLoaded", () => {
    setLanguage(currentLang);
});

// ===== ACTIVE LINK ON SCROLL =====
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute("id");
    const sectionLink = document.querySelector(
      `.nav-link[data-section="${sectionId}"]`,
    );

    if (sectionLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        sectionLink.classList.add("active");
      } else {
        sectionLink.classList.remove("active");
      }
    }
  });
}
window.addEventListener("scroll", scrollActive);

// ===== TYPING EFFECT =====
const textElement = document.querySelector(".highlight-text");
let texts = translations[currentLang]["typing-texts"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";
let typingTimeout;

function updateTypingTexts(newTexts) {
    texts = newTexts;
    count = 0;
    index = 0;
    clearTimeout(typingTimeout);
    type();
}

function type() {
  if (!textElement) return;

  if (count === texts.length) {
    count = 0;
  }
  currentText = texts[count];
  letter = currentText.slice(0, ++index);

  textElement.textContent = letter;
  if (letter.length === currentText.length) {
    count++;
    index = 0;
    typingTimeout = setTimeout(type, 2000); // Wait before typing next word
  } else {
    typingTimeout = setTimeout(type, 150);
  }
}

type();

// ===== SCROLL ANIMATIONS (Intersection Observer) =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, observerOptions);

const elementsToAnimate = document.querySelectorAll(
  ".skill-card, .project-card, .habilidad, .about-text, .hero-image",
);
elementsToAnimate.forEach((el) => observer.observe(el));

// Contact Form Handler
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Gracias por tu mensaje. Pronto me pondré en contacto contigo.");
    this.reset();
  });
}

// ===== BACK TO TOP BUTTON =====
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== STATS ANIMATION =====
const statsSection = document.getElementById('stats');
const statNumbers = document.querySelectorAll('.stat-number');
let started = false; // Function started ? No

function startCount(el) {
    const target = parseInt(el.dataset.target);
    const count = +el.innerText;
    const increment = target / 200; // Adjust speed

    if (count < target) {
        el.innerText = Math.ceil(count + increment);
        setTimeout(() => startCount(el), 20);
    } else {
        el.innerText = target;
    }
}

if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !started) {
            statNumbers.forEach(num => startCount(num));
            started = true;
        }
    });
    statsObserver.observe(statsSection);
}

// ===== PROJECT FILTERS =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.classList.remove('hidden');
                // Trigger animation reset
                card.style.animation = 'none';
                card.offsetHeight; /* trigger reflow */
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ===== PARTICLES BACKGROUND =====
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = getComputedStyle(document.documentElement).getPropertyValue('--accent');
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.01; // Fade out
            if (this.size <= 0.2) {
                 this.x = Math.random() * canvas.width;
                 this.y = Math.random() * canvas.height;
                 this.size = Math.random() * 3 + 1;
            }
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        particlesArray = [];
        for (let i = 0; i < 50; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }
    
    // Resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    init();
    animateParticles();
}

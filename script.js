
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // LOADER
    // ========================================
    setTimeout(function() {
        const loader = document.querySelector('.loader');
        loader.classList.add('hidden');
    }, 1500);

    // ========================================
    // SCROLL SUAVE
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // NAVBAR SCROLL
    // ========================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.padding = '1rem 5%';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.padding = '1.5rem 5%';
            navbar.style.boxShadow = 'none';
        }
    });

    // ========================================
    // LINKS ATIVOS NA NAVBAR
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            
            if (navLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-links a').forEach(link => {
                        link.classList.remove('active');
                    });
                    navLink.classList.add('active');
                }
            }
        });
    });

    // ========================================
    // HABILIDADES - ANIMAÇÃO DE PROGRESSO
    // ========================================
    const skillCards = document.querySelectorAll('.skill-card');
    
    const animateSkills = () => {
        skillCards.forEach(card => {
            const progress = card.querySelector('.progress');
            if (progress) {
                const targetWidth = progress.getAttribute('data-progress');
                progress.style.width = targetWidth;
            }
        });
    };

    // Observer para animacao das habilidades
    const skillsSection = document.querySelector('#skills');
    
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(skillsSection);
    }

    // ========================================
    // FILTRO DE PROJETOS
    // ========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active de todos os botoes
            filterBtns.forEach(b => b.classList.remove('active'));
            // Adiciona active no botao clicado
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || filter === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ========================================
    // BACK TO TOP
    // ========================================
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // FORMULARIO DE CONTATO
    // ========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obter dados do formulario
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simular envio (aqui voce pode integrar com backend)
            console.log('Dados do formulario:', data);
            
            // Mostrar mensagem de sucesso
            alert('Obrigado pela sua mensagem! Em breve entrarei em contato.');
            
            // Limpar formulario
            this.reset();
        });
    }

    // ========================================
    // ANIMAÇÃO DE REVELAÇÃO AO SCROLL
    // ========================================
    const revealElements = document.querySelectorAll('.about-content, .contact-content, .projects-grid');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        revealObserver.observe(el);
    });

    // ========================================
    // EFEITO DE DIGITAÇÃO NO HERO
    // ========================================
    const professionElement = document.querySelector('.profession');
    
    if (professionElement) {
        const professions = ['Desenvolvedor Web', 'Designer', 'Programador', 'Criador'];
        let professionIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;
        
        function typeEffect() {
            const currentProfession = professions[professionIndex];
            
            if (isDeleting) {
                professionElement.textContent = currentProfession.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                professionElement.textContent = currentProfession.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentProfession.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pausa no final
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                professionIndex = (professionIndex + 1) % professions.length;
                typeSpeed = 500;
            }
            
            setTimeout(typeEffect, typeSpeed);
        }
        
        // Iniciar efeito de digitacao
        setTimeout(typeEffect, 2000);
    }

    // ========================================
    // EFEITO PARALLAX NO HERO
    // ========================================
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            const heroImageElement = heroImage.querySelector('.image-container');
            
            if (scrollY < window.innerHeight) {
                heroImageElement.style.transform = `translateY(${scrollY * 0.2}px)`;
            }
        });
    }

    // ========================================
    // CONTADOR DE ANIMAÇÃO
    // ========================================
    const animateCounter = (element, target, duration) => {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + '+';
            }
        }, 16);
    };

    // ========================================
    // EFEITO MAGNÉTICO NOS BOTÕES
    // ========================================
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--mouse-x', `${x}px`);
            this.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // ========================================
    // MENSAGEM DE BOAS-VINDAS
    // ========================================
    console.log('%c Olá! 👋', 'font-size: 24px; color: #6c63ff; font-weight: bold;');
    console.log('%c Obrigado por visitar meu portfólio!', 'font-size: 14px; color: #b3b3b3;');
    console.log('%c Se você está vendo isso, provavelmente é um desenvolvedor também! 😄', 'font-size: 12px; color: #666;');

});

// ========================================
// FUNÇÕES AUXILIARES
// ========================================

// Funcao para debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Funcao para throttle
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}


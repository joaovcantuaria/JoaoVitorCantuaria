// ========================================
// NAVEGAÇÃO E MENU MOBILE
// ========================================

// Elementos do DOM
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.getElementById('header');

// Toggle Menu Mobile
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Fechar menu ao clicar em um link (mobile)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Rolagem Suave para as Seções
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header com efeito ao rolar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(255, 215, 0, 0.2)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(255, 215, 0, 0.1)';
    }
});

// ========================================
// CARROSSEL DE PORTFÓLIO
// ========================================

const portfolioTrack = document.getElementById('portfolioTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const carouselIndicators = document.getElementById('carouselIndicators');

let currentIndex = 0;
let itemsToShow = 3;
let portfolioItems = [];

// Função para atualizar o número de itens visíveis baseado na largura da tela
function updateItemsToShow() {
    const width = window.innerWidth;
    if (width <= 768) {
        itemsToShow = 1;
    } else if (width <= 1024) {
        itemsToShow = 2;
    } else {
        itemsToShow = 3;
    }
}

// Inicializar Carrossel de Portfólio
function initPortfolioCarousel() {
    portfolioItems = document.querySelectorAll('.portfolio-item');
    const totalItems = portfolioItems.length;
    
    updateItemsToShow();
    
    // Criar indicadores
    carouselIndicators.innerHTML = '';
    const totalPages = Math.ceil(totalItems / itemsToShow);
    
    for (let i = 0; i < totalPages; i++) {
        const indicator = document.createElement('button');
        indicator.classList.add('carousel-indicator');
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(i));
        carouselIndicators.appendChild(indicator);
    }
    
    updateCarousel();
}

// Atualizar posição do carrossel
function updateCarousel() {
    const itemWidth = portfolioItems[0].offsetWidth;
    const offset = -currentIndex * itemWidth * itemsToShow;
    portfolioTrack.style.transform = `translateX(${offset}px)`;
    
    // Atualizar indicadores
    const indicators = carouselIndicators.querySelectorAll('.carousel-indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

// Ir para um slide específico
function goToSlide(index) {
    const totalItems = portfolioItems.length;
    const maxIndex = Math.ceil(totalItems / itemsToShow) - 1;
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    updateCarousel();
}

// Próximo slide
function nextSlide() {
    const totalItems = portfolioItems.length;
    const maxIndex = Math.ceil(totalItems / itemsToShow) - 1;
    if (currentIndex < maxIndex) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateCarousel();
}

// Slide anterior
function prevSlide() {
    const totalItems = portfolioItems.length;
    const maxIndex = Math.ceil(totalItems / itemsToShow) - 1;
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = maxIndex;
    }
    updateCarousel();
}

// Event Listeners
if (prevBtn) prevBtn.addEventListener('click', prevSlide);
if (nextBtn) nextBtn.addEventListener('click', nextSlide);

// Redimensionar carrossel ao mudar tamanho da janela
window.addEventListener('resize', () => {
    updateItemsToShow();
    currentIndex = 0;
    initPortfolioCarousel();
});

// Inicializar quando a página carregar
if (portfolioTrack) {
    initPortfolioCarousel();
}

// Autoplay opcional (descomente para ativar)
// setInterval(nextSlide, 5000);

// ========================================
// CARROSSEL DE DEPOIMENTOS
// ========================================

const testimonialsTrack = document.getElementById('testimonialsTrack');
const prevTestimonial = document.getElementById('prevTestimonial');
const nextTestimonial = document.getElementById('nextTestimonial');

let currentTestimonial = 0;
let testimonialCards = [];

// Inicializar Carrossel de Depoimentos
function initTestimonialsCarousel() {
    testimonialCards = document.querySelectorAll('.testimonial-card');
    updateTestimonialsCarousel();
}

// Atualizar posição do carrossel de depoimentos
function updateTestimonialsCarousel() {
    if (testimonialCards.length === 0) return;
    
    const cardWidth = testimonialCards[0].offsetWidth;
    const offset = -currentTestimonial * cardWidth;
    testimonialsTrack.style.transform = `translateX(${offset}px)`;
}

// Próximo depoimento
function nextTestimonialSlide() {
    if (currentTestimonial < testimonialCards.length - 1) {
        currentTestimonial++;
    } else {
        currentTestimonial = 0;
    }
    updateTestimonialsCarousel();
}

// Depoimento anterior
function prevTestimonialSlide() {
    if (currentTestimonial > 0) {
        currentTestimonial--;
    } else {
        currentTestimonial = testimonialCards.length - 1;
    }
    updateTestimonialsCarousel();
}

// Event Listeners
if (prevTestimonial) prevTestimonial.addEventListener('click', prevTestimonialSlide);
if (nextTestimonial) nextTestimonial.addEventListener('click', nextTestimonialSlide);

// Redimensionar ao mudar tamanho da janela
window.addEventListener('resize', updateTestimonialsCarousel);

// Inicializar
if (testimonialsTrack) {
    initTestimonialsCarousel();
}

// Autoplay para depoimentos
setInterval(nextTestimonialSlide, 6000);

// ========================================
// FORMULÁRIO DE CONTATO
// ========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obter valores do formulário
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Criar mensagem para WhatsApp
        const whatsappMessage = `Olá! Meu nome é ${name}.%0A%0AE-mail: ${email}%0A%0AMensagem: ${message}`;
        const whatsappURL = `https://wa.me/5538999209694?text=${whatsappMessage}`;
        
        // Abrir WhatsApp em nova aba
        window.open(whatsappURL, '_blank');
        
        // Limpar formulário
        contactForm.reset();
        
        // Mensagem de sucesso (opcional)
        alert('Redirecionando para o WhatsApp...');
    });
}

// ========================================
// BOTÃO SCROLL TO TOP
// ========================================

const scrollTopBtn = document.getElementById('scrollTopBtn');

// Mostrar/Ocultar botão baseado na rolagem
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

// Rolar para o topo ao clicar
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// ANIMAÇÕES AO ROLAR (Intersection Observer)
// ========================================

// Função para animar elementos quando entram na viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .contact-info-item');

animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ========================================
// PREVENÇÃO DE CLIQUE DIREITO EM IMAGENS (Opcional)
// ========================================

// Descomente se quiser proteger as imagens do portfólio
/*
const portfolioImages = document.querySelectorAll('.portfolio-image img');
portfolioImages.forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
});
*/

// ========================================
// LOADING INICIAL (Opcional)
// ========================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

console.log('Site João V. Cantuária carregado com sucesso! 🎨📸');

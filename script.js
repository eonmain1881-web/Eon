// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.padding = '0.8rem 0';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    } else {
        header.style.padding = '1rem 0';
        header.style.boxShadow = 'none';
    }
});

// Product card hover effect enhancement
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Newsletter form submission
const newsletterForm = document.querySelector('footer form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        if (emailInput.value && isValidEmail(emailInput.value)) {
            alert('EON güncellemelerine abone olduğunuz için teşekkür ederiz!');
            emailInput.value = '';
        } else {
            alert('Lütfen geçerli bir e-posta adresi girin.');
        }
    });
}

// Email validation helper
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Simple animation for elements when they come into view
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.product-card, .about-text, .about-image');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animated elements
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.product-card, .about-text, .about-image');
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger animations on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial check in case elements are already in view
    animateOnScroll();
    
    // Initialize slider
    initSlider();
    
    // Initialize sidebar
    initSidebar();
    
    // Initialize search
    initSearch();
});

// ===== SLIDER FUNCTIONALITY =====
function initSlider() {
    const slides = document.querySelectorAll('.hero-slider .slide');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    const sliderContainer = document.querySelector('.hero-slider');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    let autoSlideInterval;
    let isDragging = false;
    let startX = 0;
    let threshold = 50;
    
    // Show slide function
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // Auto slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Button events
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }
    
    // Touch/Drag events
    if (sliderContainer) {
        // Mouse events
        sliderContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
        });
        
        sliderContainer.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
        });
        
        sliderContainer.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            const diff = e.clientX - startX;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    prevSlide();
                } else {
                    nextSlide();
                }
                stopAutoSlide();
                startAutoSlide();
            }
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            isDragging = false;
        });
        
        // Touch events
        sliderContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        sliderContainer.addEventListener('touchend', (e) => {
            const diff = e.changedTouches[0].clientX - startX;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    prevSlide();
                } else {
                    nextSlide();
                }
                stopAutoSlide();
                startAutoSlide();
            }
        });
    }
    
    // Start auto slide
    startAutoSlide();
}

// ===== SIDEBAR FUNCTIONALITY =====
function initSidebar() {
    const menuBtn = document.getElementById('menuBtn');
    const closeBtn = document.getElementById('closeBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    function openSidebar() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (menuBtn) {
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openSidebar();
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeSidebar);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }
    
    // Sidebar search
    const sidebarSearchInput = document.getElementById('sidebarSearchInput');
    const sidebarSearchBtn = document.getElementById('sidebarSearchBtn');
    
    if (sidebarSearchBtn) {
        sidebarSearchBtn.addEventListener('click', () => {
            performSearch(sidebarSearchInput.value);
        });
    }
    
    if (sidebarSearchInput) {
        sidebarSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch(sidebarSearchInput.value);
            }
        });
    }
}

// ===== SEARCH FUNCTIONALITY =====
function initSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const searchModal = document.getElementById('searchModal');
    const searchCloseBtn = document.getElementById('searchCloseBtn');
    const searchInput = document.getElementById('searchInput');
    const searchSubmitBtn = document.getElementById('searchSubmitBtn');
    const searchResults = document.getElementById('searchResults');
    
    function openSearch() {
        searchModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => searchInput.focus(), 100);
    }
    
    function closeSearch() {
        searchModal.classList.remove('active');
        document.body.style.overflow = '';
        searchInput.value = '';
        searchResults.innerHTML = '';
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openSearch();
        });
    }
    
    if (searchCloseBtn) {
        searchCloseBtn.addEventListener('click', closeSearch);
    }
    
    if (searchModal) {
        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) {
                closeSearch();
            }
        });
    }
    
    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchModal.classList.contains('active')) {
            closeSearch();
        }
    });
    
    if (searchSubmitBtn) {
        searchSubmitBtn.addEventListener('click', () => {
            performSearch(searchInput.value);
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }
}

// Sample products data for search
const products = [
    { name: 'Essential White Shirt', category: 'unisex', price: '$120' },
    { name: 'Minimalist Blazer', category: 'erkek', price: '$240' },
    { name: 'Evening Dress', category: 'kadin', price: '$180' },
    { name: 'Tailored Trousers', category: 'erkek', price: '$150' },
    { name: 'Casual T-Shirt', category: 'unisex', price: '$60' },
    { name: 'Summer Dress', category: 'kadin', price: '$95' },
    { name: 'Denim Jacket', category: 'unisex', price: '$175' },
    { name: 'Wool Coat', category: 'erkek', price: '$320' },
];

function performSearch(query) {
    const searchResults = document.getElementById('searchResults');
    if (!query.trim()) {
        searchResults.innerHTML = '<p style="color: white; text-align: center;">Lütfen bir arama terimi girin.</p>';
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    
    if (filteredProducts.length === 0) {
        searchResults.innerHTML = '<p style="color: white; text-align: center;">Sonuç bulunamadı.</p>';
    } else {
        searchResults.innerHTML = filteredProducts.map(product => `
            <div class="search-result-item">
                <strong>${product.name}</strong>
                <span style="float: right;">${product.price}</span>
                <br><small style="color: #666;">${product.category.toUpperCase()}</small>
            </div>
        `).join('');
    }
}
// Specials Rotator with fade
const specials = [
    "2-for-1 Pizza at Bella's",
    "Free coffee with breakfast at Sunrise Café",
    "20% off burgers at GrillMaster",
    "Happy Hour: 4-6 PM at TapHouse"
];

let specialIndex = 0;
function rotateSpecials() {
    const specialsDiv = document.getElementById('specials-rotator');
    if (specialsDiv) {
        specialsDiv.style.opacity = 0; // start fade-out
        setTimeout(() => {
            specialsDiv.textContent = specials[specialIndex];
            specialsDiv.style.opacity = 1; // fade-in new text
            specialIndex = (specialIndex + 1) % specials.length;
        }, 500);
    }
}
setInterval(rotateSpecials, 3000);
rotateSpecials();

// Sticky Navigation Effect
function handleStickyNav() {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Add scroll event listener for sticky nav
window.addEventListener('scroll', handleStickyNav);

// Smooth scrolling for navigation links (if they link to sections on same page)
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize expandable cards
    initializeExpandableCards();
});

// Expandable Card Functionality
let expandedCard = null;
let isAnimating = false;

function handleCardClick(card) {
    if (isAnimating) return;
    
    const restaurantId = card.dataset.restaurant;
    
    if (expandedCard === restaurantId) {
        // Collapse the current card
        isAnimating = true;
        card.classList.add('animating');
        
        setTimeout(() => {
            card.classList.remove('expanded');
            card.classList.remove('animating');
            expandedCard = null;
            isAnimating = false;
        }, 400);
    } else {
        // Collapse any currently expanded card
        if (expandedCard) {
            const currentExpanded = document.querySelector(`[data-restaurant="${expandedCard}"]`);
            if (currentExpanded) {
                currentExpanded.classList.remove('expanded');
            }
        }
        
        // Expand the new card
        isAnimating = true;
        card.classList.add('animating');
        
        setTimeout(() => {
            card.classList.add('expanded');
            card.classList.remove('animating');
            expandedCard = restaurantId;
            isAnimating = false;
        }, 400);
    }
}

// Initialize expandable cards
function initializeExpandableCards() {
    const expandableCards = document.querySelectorAll('.expandable-card');
    
    expandableCards.forEach(card => {
        card.addEventListener('click', function() {
            handleCardClick(this);
        });
    });
}

// Active navigation link highlighting
function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage || 
            (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Call on page load
document.addEventListener('DOMContentLoaded', updateActiveNav);

// Fade-in on scroll for cards
const faders = document.querySelectorAll('.card');
const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => {
    fader.classList.add('fade-in');
    appearOnScroll.observe(fader);
});

// Search Functionality (Home Page) - Updated to work with expandable cards
const searchInput = document.getElementById('search');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('.card').forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
                // If hiding an expanded card, collapse it
                if (card.classList.contains('expanded')) {
                    card.classList.remove('expanded');
                    if (expandedCard === card.dataset.restaurant) {
                        expandedCard = null;
                    }
                }
            }
        });
    });
}

// Filter Functionality (Listings Page)
const filterButtons = document.querySelectorAll('#filters button');
if (filterButtons) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            document.querySelectorAll('#restaurant-list .card').forEach(card => {
                if (category === 'all' || card.textContent.toLowerCase().includes(category)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Lightbox for Gallery
const galleryImages = document.querySelectorAll('.gallery img');
if (galleryImages) {
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            const lightbox = document.createElement('div');
            lightbox.style.position = 'fixed';
            lightbox.style.top = 0;
            lightbox.style.left = 0;
            lightbox.style.width = '100%';
            lightbox.style.height = '100%';
            lightbox.style.background = 'rgba(0,0,0,0.8)';
            lightbox.style.display = 'flex';
            lightbox.style.alignItems = 'center';
            lightbox.style.justifyContent = 'center';
            lightbox.style.zIndex = '2000';
            lightbox.innerHTML = `<img src="${img.src}" style="max-width:90%; max-height:90%; border-radius:8px;">`;
            lightbox.addEventListener('click', () => document.body.removeChild(lightbox));
            document.body.appendChild(lightbox);
        });
    });
}

// Contact Form Validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Message sent successfully!');
        contactForm.reset();
    });
}

// Scroll to top functionality (optional)
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top on logo click
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.nav-name');
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToTop();
        });
        logo.style.cursor = 'pointer';
    }
});
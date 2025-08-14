// Specials Rotator
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
        specialsDiv.textContent = specials[specialIndex];
        specialIndex = (specialIndex + 1) % specials.length;
    }
}
setInterval(rotateSpecials, 3000);
rotateSpecials();

// Search Functionality (Home Page)
const searchInput = document.getElementById('search');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('.card').forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(query) ? 'block' : 'none';
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
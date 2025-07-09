// Handle smooth scrolling for navigation links
document.querySelectorAll('nav a, .hero-buttons a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const mainContent = document.querySelector('.main-content');
        const headerOffset = document.querySelector('header').offsetHeight;
        
        mainContent.scrollTo({
            top: targetSection.offsetTop - headerOffset,
            behavior: 'smooth'
        });
    });
});

// Add active state to nav links based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');
const mainContent = document.querySelector('.main-content');

function setActiveLink() {
    const headerHeight = document.querySelector('header').offsetHeight;
    const scroll = mainContent.scrollTop;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 10;
        const sectionHeight = section.offsetHeight;

        if (scroll >= sectionTop && scroll < sectionTop + sectionHeight) {
            const targetId = '#' + section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === targetId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Handle scroll events with debounce for better performance
let scrollTimeout;
mainContent.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(setActiveLink, 50);
});

// Add animation class to project cards
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// EmailJS initialization and form handling
(function() {
    emailjs.init('YOUR_USER_ID');
})();

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const statusDiv = document.getElementById('formStatus');
    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        to_email: 'ttajeswarrao27544@gmail.com'
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
        .then(function() {
            statusDiv.className = 'success';
            statusDiv.textContent = 'Message sent successfully!';
            document.getElementById('contactForm').reset();
        })
        .catch(function(error) {
            statusDiv.className = 'error';
            statusDiv.textContent = 'Failed to send message. Please try again.';
            console.error('EmailJS error:', error);
        })
        .finally(function() {
            submitButton.disabled = false;
        });
});
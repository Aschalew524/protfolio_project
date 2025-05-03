// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Update theme icon
function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Navigation
    nav.classList.toggle('active');

    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Burger Animation
    burger.classList.toggle('toggle');
});

// Typing Animation
const typed = document.querySelector('.typed');
const words = [ 'Backend Developer', 'CSE student', 'A2SVian','Mobile app Developer',  'Flutter Expert'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typed.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typed.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 100 : 200);
    }
}

// Start typing animation
type();

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            nav.classList.remove('active');
            burger.classList.remove('toggle');
        }
    });
});

const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);


// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});


// Form Submission
const contactForm = document.querySelector('.contact-form');

// Success and Error Popups
const successPopup = document.createElement('div');
successPopup.classList.add('popup', 'success-popup');
successPopup.textContent = "Message sent!";

const errorPopup = document.createElement('div');
errorPopup.classList.add('popup', 'error-popup');
errorPopup.textContent = "Something went wrong. Please try again.";

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Clear any previous popups
        successPopup.remove();
        errorPopup.remove();

        fetch('https://script.google.com/macros/s/AKfycbzNdr39SEgmMVEVyS1BhlKprYJLhAIDlEBhJEy8uTy3pmD9_lJH2NdlwxbJygWECxZX/exec', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: contactForm.name.value,
                email: contactForm.email.value,
                message: contactForm.message.value
            }),
            mode: 'no-cors' // <-- only for testing
        })
        .then(() => {
            // Display success popup
            document.body.insertBefore(successPopup, document.body.firstChild);
            setTimeout(() => {
                successPopup.remove();
            }, 3000);  // Auto remove after 3 seconds
            contactForm.reset();
        })
        .catch(err => {
            // Display error popup
            document.body.insertBefore(errorPopup, document.body.firstChild);
            setTimeout(() => {
                errorPopup.remove();
            }, 3000);  // Auto remove after 3 seconds
            console.error('Error:', err);
        });
    });
}
// Add CSS animation for fade-in effect
const style = document.createElement('style');
style.textContent = `
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .toggle .line1 {
        transform: rotate(-45deg) translate(-5px, 6px);
    }

    .toggle .line2 {
        opacity: 0;
    }

    .toggle .line3 {
        transform: rotate(45deg) translate(-5px, -6px);
    }

    section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    section.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Project card hover effects
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 15px 25px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
});

// Update page title with current section
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight/3)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    if (currentSection) {
        document.title = `Aschalew Abayneh | ${currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}`;
    } else {
        document.title = 'Aschalew Abayneh - Portfolio';
    }
});
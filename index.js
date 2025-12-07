
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        document.getElementById("preloader").classList.add("opacity-0");
        setTimeout(() => {
            document.getElementById("preloader").style.display = "none";
            document.getElementById("content").classList.remove("hidden");
        }, 700); // Matches transition duration
    }, 3000); // Animation runs for 3 seconds before hiding
});
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll("#navbar a");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("bg-white", "shadow-lg");
            navbar.classList.remove("bg-transparent");

            navLinks.forEach(link => {
                link.classList.remove("text-white");
                link.classList.add("text-gray-700", "hover:text-gray-900");
            });
        } else {
            navbar.classList.add("bg-transparent");
            navbar.classList.remove("bg-white", "shadow-lg");

            navLinks.forEach(link => {
                link.classList.remove("text-gray-700", "hover:text-gray-900");
                link.classList.add("text-white");
            });
        }
    });
});
window.addEventListener("load", function () {
    // Remove Preloader
    // document.getElementById("preloader").style.display = "none";

    // Add Animation Classes
    document.getElementById("hero-title").classList.add("animate-gentle-left");
    document.getElementById("hero-subtitle").classList.add("animate-gentle-right");
});

document.addEventListener("DOMContentLoaded", function () {
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.2 // Trigger when 20% of element is visible
    };

    const elements = document.querySelectorAll(".fade-left, .fade-right");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target); // Stop observing once shown
            }
        });
    }, observerOptions);

    elements.forEach(element => {
        observer.observe(element);
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const leftCards = document.querySelectorAll(".hidden-left");
    const rightCards = document.querySelectorAll(".hidden-right");

    const observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
        });
    },
      { threshold: 0.3 } // Adjust for when to trigger the animation
    );

    leftCards.forEach((card) => observer.observe(card));
    rightCards.forEach((card) => observer.observe(card));
});

// carousel functionality
let currentSlide = 0;
const totalSlides = 3;
let autoplayInterval;

const textSlides = document.querySelectorAll('.carousel-slide-text');
const imageSlides = document.querySelectorAll('.carousel-slide-image');
const dots = document.querySelectorAll('.carousel-dot');

function showSlide(index) {
    // Hide all slides
    textSlides.forEach(slide => {
        slide.style.opacity = '0';
        slide.style.transform = 'translateX(-20px)';
    });
    imageSlides.forEach(slide => {
        slide.style.opacity = '0';
        slide.style.transform = 'scale(1.1)';
    });        
    // Update dots
    dots.forEach(dot => {
        dot.classList.remove('bg-white');
        dot.classList.add('bg-white', 'bg-opacity-40');
    });        
    // Show current slide
    textSlides[index].style.opacity = '1';
    textSlides[index].style.transform = 'translateX(0)';
    imageSlides[index].style.opacity = '1';
    imageSlides[index].style.transform = 'scale(1)';        
    // Update active dot
    dots[index].classList.remove('bg-opacity-40');
    dots[index].classList.add('bg-white');
}
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}
function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
}
function stopAutoplay() {
    clearInterval(autoplayInterval);
}

// Event listeners
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        stopAutoplay();
        currentSlide = index;
        showSlide(currentSlide);
        startAutoplay();
    });
});

 // Touch swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;
        
const section = document.querySelector('section');
        
section.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    });

section.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});
        
function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
    // Swipe left
    stopAutoplay();
    nextSlide();
    startAutoplay();
    }
    if (touchEndX > touchStartX + 50) {
    // Swipe right
    stopAutoplay();
    prevSlide();
    startAutoplay();
    }
}


// Pause hover on desktop
if (window.matchMedia("(min-width: 1024px)").matches) {
    section.addEventListener('mouseenter', stopAutoplay);
    section.addEventListener('mouseleave', startAutoplay);
} 

// Initialize
showSlide(0);
startAutoplay();

// Adjust layout on resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        showSlide(currentSlide);
        }, 250);
});
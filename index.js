

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
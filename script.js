document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll
  const navLinks = document.querySelectorAll(".navbar a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Only apply to internal links
      if (this.getAttribute("href").startsWith("#")) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Highlight active navigation item based on scroll position
  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;

    // Add header shadow on scroll
    const header = document.querySelector(".header");
    if (scrollPosition > 50) {
      header.style.boxShadow = "0 5px 20px rgba(0, 43, 73, 0.5)";
      header.style.background = "rgba(0, 42, 73, 0.95)";
    } else {
      header.style.boxShadow = "none";
      header.style.background = "#002a49";
    }
  });

  // Add typing effect to the subtitle
  const subtitle = document.querySelector(".content h3");
  const originalText = subtitle.textContent;
  subtitle.textContent = "";

  // Function to simulate typing
  function typeSubtitle(text, i = 0) {
    if (i < text.length) {
      subtitle.textContent += text.charAt(i);
      setTimeout(() => typeSubtitle(text, i + 1), 100);
    }
  }

  // Start typing effect after h1 animation (2s + small delay)
  setTimeout(() => {
    typeSubtitle(originalText);
  }, 2500);

  // Parallax effect for background
  window.addEventListener("mousemove", function (e) {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    document.body.style.backgroundPosition = `${x * 20}px ${y * 20}px`;
  });

  // Add hover effects to all buttons
  const buttons = document.querySelectorAll(".btn-box a");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
      this.style.boxShadow = "0 5px 15px rgba(0, 171, 240, 0.4)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.boxShadow = "";
    });
  });

  // Add particle background effect
  createParticles();
});

// Function to create floating particles in the background
function createParticles() {
  const particleContainer = document.createElement("div");
  particleContainer.className = "particle-container";
  particleContainer.style.position = "fixed";
  particleContainer.style.top = "0";
  particleContainer.style.left = "0";
  particleContainer.style.width = "100%";
  particleContainer.style.height = "100%";
  particleContainer.style.overflow = "hidden";
  particleContainer.style.zIndex = "-1";
  document.body.appendChild(particleContainer);

  // Create particles
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.position = "absolute";
    particle.style.width = Math.random() * 5 + 1 + "px";
    particle.style.height = particle.style.width;
    particle.style.background =
      "rgba(0, 171, 240, " + Math.random() * 0.5 + ")";
    particle.style.borderRadius = "50%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animation =
      "float " + (Math.random() * 10 + 5) + "s infinite ease-in-out";

    // Set random animation delay
    particle.style.animationDelay = Math.random() * 5 + "s";

    particleContainer.appendChild(particle);
  }

  // Add keyframe animation for particles
  const style = document.createElement("style");
  style.innerHTML = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0) translateX(0);
            }
            25% {
                transform: translateY(-30px) translateX(15px);
            }
            50% {
                transform: translateY(-15px) translateX(30px);
            }
            75% {
                transform: translateY(-30px) translateX(15px);
            }
        }
    `;
  document.head.appendChild(style);
}

// Add preloader
window.addEventListener("load", function () {
  // Create preloader
  const preloader = document.createElement("div");
  preloader.className = "preloader";
  preloader.style.position = "fixed";
  preloader.style.top = "0";
  preloader.style.left = "0";
  preloader.style.width = "100%";
  preloader.style.height = "100%";
  preloader.style.background = "linear-gradient(to top,#032e57,#00192b)";
  preloader.style.display = "flex";
  preloader.style.justifyContent = "center";
  preloader.style.alignItems = "center";
  preloader.style.zIndex = "9999";

  const spinner = document.createElement("div");
  spinner.style.width = "50px";
  spinner.style.height = "50px";
  spinner.style.border = "5px solid rgba(0, 171, 240, 0.3)";
  spinner.style.borderTopColor = "#00abf0";
  spinner.style.borderRadius = "50%";
  spinner.style.animation = "spin 1s infinite linear";

  const styleEl = document.createElement("style");
  styleEl.innerHTML = `
        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }
    `;
  document.head.appendChild(styleEl);

  preloader.appendChild(spinner);
  document.body.prepend(preloader);

  // Hide preloader after content loads
  setTimeout(function () {
    preloader.style.opacity = "0";
    preloader.style.transition = "opacity 0.5s ease";
    setTimeout(function () {
      preloader.remove();
    }, 500);
  }, 1000);
});

// Add image reveal effect
const profileImage = document.querySelector(".img-fluid");
if (profileImage) {
  profileImage.style.opacity = "0";
  profileImage.style.transition = "opacity 1.5s ease, transform 1.5s ease";

  // Reveal image with slight delay after page load
  setTimeout(() => {
    profileImage.style.opacity = "1";
    profileImage.style.transform = "scale(1.02)";
    setTimeout(() => {
      profileImage.style.transform = "scale(1)";
    }, 500);
  }, 3800);
}
document.addEventListener("DOMContentLoaded", addThemeToggle);

function toggleMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
}

// Close menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (!navbar.contains(e.target)) {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  }
});

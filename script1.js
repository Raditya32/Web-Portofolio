document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".navbar a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Only apply smooth scroll for same-page links
      const targetId = this.getAttribute("href");
      if (targetId.startsWith("#")) {
        e.preventDefault();
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

  // Add typing effect to the h1 Biodata title
  const bioTitle = document.querySelector(".content h1");
  if (bioTitle && bioTitle.textContent === "Biodata") {
    const originalText = bioTitle.textContent;
    bioTitle.textContent = "";

    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < originalText.length) {
        bioTitle.textContent += originalText.charAt(i);
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, 100);
  }

  // Add animated background effect
  const body = document.querySelector("body");
  const bgCanvas = document.createElement("canvas");
  bgCanvas.style.position = "fixed";
  bgCanvas.style.top = "0";
  bgCanvas.style.left = "0";
  bgCanvas.style.width = "100%";
  bgCanvas.style.height = "100%";
  bgCanvas.style.zIndex = "-1";
  bgCanvas.style.opacity = "0.3";
  body.appendChild(bgCanvas);

  const ctx = bgCanvas.getContext("2d");

  function resizeCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Create particles
  const particles = [];
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * bgCanvas.width,
      y: Math.random() * bgCanvas.height,
      size: Math.random() * 3 + 1,
      speedX: Math.random() * 1 - 0.5,
      speedY: Math.random() * 1 - 0.5,
      color: "#00abf0",
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      // Update position
      p.x += p.speedX;
      p.y += p.speedY;

      // Bounce off edges
      if (p.x < 0 || p.x > bgCanvas.width) {
        p.speedX *= -1;
      }

      if (p.y < 0 || p.y > bgCanvas.height) {
        p.speedY *= -1;
      }

      // Draw connections
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const distance = Math.sqrt(
          Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2)
        );

        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 171, 240, ${0.8 - distance / 100})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(drawParticles);
  }

  drawParticles();

  // Add hover effects to skill items
  const skillItems = document.querySelectorAll(".content h3");

  skillItems.forEach((item) => {
    item.addEventListener("mouseover", function () {
      this.style.transform = "translateX(10px)";
      this.style.color = "#00abf0";
      this.style.transition = "all 0.3s ease";
    });

    item.addEventListener("mouseout", function () {
      this.style.transform = "translateX(0)";
      this.style.color = "#ededed";
    });
  });

  // Add parallax effect to the profile image
  const profileImg = document.querySelector(".img-fluid");
  if (profileImg) {
    window.addEventListener("mousemove", function (e) {
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;

      profileImg.style.transform = `translate(${mouseX * 10}px, ${
        mouseY * 10
      }px)`;
    });
  }

  // Add pulse animation to social media icons
  const socialIcons = document.querySelectorAll(".sci a i");
  socialIcons.forEach((icon) => {
    setInterval(() => {
      icon.style.transform = "scale(1.2)";
      setTimeout(() => {
        icon.style.transform = "scale(1)";
      }, 500);
    }, 2000);
  });

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

  // Add scroll reveal effect
  const revealElements = document.querySelectorAll(
    ".content h1, .content h3, .btn-box, .card"
  );

  function checkScroll() {
    const triggerBottom = window.innerHeight * 0.8;

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < triggerBottom) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  // Initial check on page load
  checkScroll();

  // Check on scroll
  window.addEventListener("scroll", checkScroll);
});

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

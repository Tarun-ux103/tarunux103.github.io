// WAIT UNTIL DOM LOADS (VERY IMPORTANT)
document.addEventListener("DOMContentLoaded", function () {

  // ================= AOS =================
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: true,
    });
  }

  // ================= TYPING EFFECT =================
  const typingElement = document.getElementById('typing');

  if (typingElement) {
    const phrases = ['a Developer', 'an AI Enthusiast', 'a Problem Solver', 'a Creator'];
    let phraseIndex = 0;
    let letterIndex = 0;
    let deleting = false;

    function typeWriter() {
      const currentText = phrases[phraseIndex];
      const updateText = deleting
        ? currentText.substring(0, letterIndex - 1)
        : currentText.substring(0, letterIndex + 1);

      typingElement.textContent = updateText;

      if (!deleting && letterIndex < currentText.length) {
        letterIndex++;
        setTimeout(typeWriter, 90);
      } else if (deleting && letterIndex > 0) {
        letterIndex--;
        setTimeout(typeWriter, 50);
      } else {
        deleting = !deleting;
        if (!deleting) {
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
        setTimeout(typeWriter, deleting ? 400 : 1400);
      }
    }

    typeWriter();
  }

  // ================= NAV MENU TOGGLE =================
  const menuButton = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuButton && navMenu) {
    menuButton.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

  // CLOSE MENU ON LINK CLICK (MOBILE)
  const navLinks = document.querySelectorAll('.nav-menu a');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });

  // ================= SCROLL ACTIVE LINK =================
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // ================= PARTICLES =================
  const canvas = document.getElementById('particles');

  if (canvas) {
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 1 + Math.random() * 2,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
    }));

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 247, 255, 0.18)';
        ctx.fill();
      });

      requestAnimationFrame(drawParticles);
    }

    drawParticles();
  }

  // ================= CONTACT FORM =================
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (form && status) {
    form.addEventListener('submit', event => {
      event.preventDefault();

      const name = document.getElementById('name')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const message = document.getElementById('message')?.value.trim();

      if (!name || !email || !message) {
        status.textContent = 'Please fill in all fields before sending.';
        status.style.color = '#ff6b6b';
        return;
      }

      status.textContent = 'Message sent successfully!';
      status.style.color = '#a8f7cc';

      form.reset();
    });
  }

  // ================= VANILLA TILT =================
  if (typeof VanillaTilt !== "undefined") {
    VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
      max: 12,
      speed: 400,
      glare: true,
      "max-glare": 0.2,
    });
  }

});
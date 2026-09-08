document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     CONFIGURATION
     Replace these EmailJS placeholders after creating EmailJS
  ========================================================= */

  const EMAILJS_PUBLIC_KEY = "YOUR_EMAILJS_PUBLIC_KEY";

  const EMAILJS_SERVICE_ID = "YOUR_EMAILJS_SERVICE_ID";

  const EMAILJS_TEMPLATE_ID = "YOUR_EMAILJS_TEMPLATE_ID";


  /* =========================================================
     AOS ANIMATIONS
  ========================================================= */

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  if (
    typeof AOS !== "undefined" &&
    !prefersReducedMotion
  ) {

    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 80
    });

  }


  /* =========================================================
     TYPING EFFECT
  ========================================================= */

  const typingElement =
    document.getElementById("typing");


  if (typingElement) {

    const phrases = [
      "a Developer",
      "an AI Enthusiast",
      "a Problem Solver",
      "a Creator"
    ];


    if (prefersReducedMotion) {

      typingElement.textContent = phrases[0];

    } else {

      let phraseIndex = 0;
      let letterIndex = 0;
      let deleting = false;


      function typeWriter() {

        const currentText =
          phrases[phraseIndex];


        if (!deleting) {

          letterIndex++;

          typingElement.textContent =
            currentText.substring(
              0,
              letterIndex
            );


          if (
            letterIndex === currentText.length
          ) {

            deleting = true;

            setTimeout(
              typeWriter,
              1600
            );

            return;
          }

        } else {

          letterIndex--;

          typingElement.textContent =
            currentText.substring(
              0,
              letterIndex
            );


          if (letterIndex === 0) {

            deleting = false;

            phraseIndex =
              (phraseIndex + 1) %
              phrases.length;
          }

        }


        const typingSpeed =
          deleting ? 55 : 100;


        setTimeout(
          typeWriter,
          typingSpeed
        );

      }


      typeWriter();

    }

  }


  /* =========================================================
     MOBILE NAVIGATION
  ========================================================= */

  const navToggle =
    document.querySelector(".nav-toggle");


  const navMenu =
    document.querySelector(".nav-menu");


  const navLinks =
    document.querySelectorAll(
      ".nav-menu a"
    );


  function closeNavigation() {

    if (!navToggle || !navMenu) {
      return;
    }


    navMenu.classList.remove("open");

    navToggle.classList.remove("active");

    navToggle.setAttribute(
      "aria-expanded",
      "false"
    );

  }


  if (navToggle && navMenu) {

    navToggle.addEventListener(
      "click",
      () => {

        const isOpen =
          navMenu.classList.toggle("open");


        navToggle.classList.toggle(
          "active",
          isOpen
        );


        navToggle.setAttribute(
          "aria-expanded",
          String(isOpen)
        );

      }
    );


    navLinks.forEach((link) => {

      link.addEventListener(
        "click",
        closeNavigation
      );

    });


    document.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "Escape"
        ) {

          closeNavigation();

        }

      }
    );


    document.addEventListener(
      "click",
      (event) => {

        if (
          navMenu.classList.contains("open") &&
          !navMenu.contains(event.target) &&
          !navToggle.contains(event.target)
        ) {

          closeNavigation();

        }

      }
    );

  }


  /* =========================================================
     ACTIVE NAVIGATION LINK
  ========================================================= */

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );


  if (
    "IntersectionObserver" in window
  ) {

    const sectionObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                entry.isIntersecting
              ) {

                const sectionId =
                  entry.target.id;


                navLinks.forEach(
                  (link) => {

                    link.classList.toggle(
                      "active",
                      link.getAttribute("href") ===
                        `#${sectionId}`
                    );

                  }
                );

              }

            }
          );

        },
        {
          rootMargin:
            "-35% 0px -55% 0px",

          threshold: 0
        }
      );


    sections.forEach(
      (section) => {

        sectionObserver.observe(section);

      }
    );

  }


  /* =========================================================
     VANILLA TILT
  ========================================================= */

  const isTouchDevice =
    window.matchMedia(
      "(hover: none)"
    ).matches;


  if (
    typeof VanillaTilt !== "undefined" &&
    !isTouchDevice &&
    !prefersReducedMotion
  ) {

    VanillaTilt.init(
      document.querySelectorAll(
        "[data-tilt]"
      ),
      {
        max: 5,
        speed: 400,
        glare: true,
        "max-glare": 0.12
      }
    );

  }


  /* =========================================================
     PARTICLE BACKGROUND
  ========================================================= */

  const canvas =
    document.getElementById("particles");


  if (
    canvas &&
    !prefersReducedMotion
  ) {

    const context =
      canvas.getContext("2d");


    let particles = [];


    let animationFrameId;


    let isPageVisible = true;


    function resizeCanvas() {

      canvas.width =
        window.innerWidth;


      canvas.height =
        window.innerHeight;


      createParticles();

    }


    function createParticles() {

      const particleCount =
        window.innerWidth < 768
          ? 35
          : 75;


      particles = [];


      for (
        let i = 0;
        i < particleCount;
        i++
      ) {

        particles.push({
          x:
            Math.random() *
            canvas.width,

          y:
            Math.random() *
            canvas.height,

          size:
            Math.random() * 1.8 + 0.5,

          speedX:
            (Math.random() - 0.5) *
            0.35,

          speedY:
            (Math.random() - 0.5) *
            0.35,

          opacity:
            Math.random() * 0.5 + 0.15
        });

      }

    }


    function drawParticles() {

      if (!isPageVisible) {
        return;
      }


      context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );


      particles.forEach(
        (particle) => {

          particle.x +=
            particle.speedX;


          particle.y +=
            particle.speedY;


          if (
            particle.x < 0 ||
            particle.x > canvas.width
          ) {

            particle.speedX *= -1;

          }


          if (
            particle.y < 0 ||
            particle.y > canvas.height
          ) {

            particle.speedY *= -1;

          }


          context.beginPath();


          context.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
          );


          context.fillStyle =
            `rgba(
              0,
              247,
              255,
              ${particle.opacity}
            )`;


          context.fill();

        }
      );


      animationFrameId =
        requestAnimationFrame(
          drawParticles
        );

    }


    function handleVisibilityChange() {

      isPageVisible =
        !document.hidden;


      if (isPageVisible) {

        cancelAnimationFrame(
          animationFrameId
        );


        drawParticles();

      }

    }


    window.addEventListener(
      "resize",
      resizeCanvas
    );


    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );


    resizeCanvas();


    drawParticles();

  }


  /* =========================================================
     EMAILJS CONTACT FORM
  ========================================================= */

  const contactForm =
    document.getElementById(
      "contact-form"
    );


  const formStatus =
    document.getElementById(
      "form-status"
    );


  const submitButton =
    document.getElementById(
      "submit-button"
    );


  if (
    typeof emailjs !== "undefined" &&
    EMAILJS_PUBLIC_KEY !==
      "YOUR_EMAILJS_PUBLIC_KEY"
  ) {

    emailjs.init({
      publicKey:
        EMAILJS_PUBLIC_KEY
    });

  }


  if (contactForm) {

    contactForm.addEventListener(
      "submit",
      async (event) => {

        event.preventDefault();


        if (
          !formStatus ||
          !submitButton
        ) {
          return;
        }


        /* -----------------------------------------
           CHECK EMAILJS CONFIGURATION
        ----------------------------------------- */

        if (
          EMAILJS_PUBLIC_KEY ===
            "YOUR_EMAILJS_PUBLIC_KEY" ||

          EMAILJS_SERVICE_ID ===
            "YOUR_EMAILJS_SERVICE_ID" ||

          EMAILJS_TEMPLATE_ID ===
            "YOUR_EMAILJS_TEMPLATE_ID"
        ) {

          formStatus.textContent =
            "Contact form setup is not complete yet.";

          formStatus.className =
            "form-status error";

          return;
        }


        if (
          typeof emailjs ===
          "undefined"
        ) {

          formStatus.textContent =
            "Email service could not be loaded. Please try again later.";

          formStatus.className =
            "form-status error";

          return;
        }


        const originalButtonText =
          submitButton.textContent;


        submitButton.disabled =
          true;


        submitButton.textContent =
          "Sending...";


        formStatus.textContent =
          "";


        formStatus.className =
          "form-status";


        try {

          await emailjs.sendForm(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            contactForm
          );


          formStatus.textContent =
            "Message sent successfully! I will get back to you soon.";

          formStatus.className =
            "form-status success";


          contactForm.reset();


        } catch (error) {

          console.error(
            "EmailJS Error:",
            error
          );


          formStatus.textContent =
            "Something went wrong. Please try again or contact me directly by email.";

          formStatus.className =
            "form-status error";

        } finally {

          submitButton.disabled =
            false;


          submitButton.textContent =
            originalButtonText;

        }

      }
    );

  }


  /* =========================================================
     CURRENT YEAR
  ========================================================= */

  const currentYear =
    document.getElementById(
      "current-year"
    );


  if (currentYear) {

    currentYear.textContent =
      new Date().getFullYear();

  }

});
/**
 * ============================================================================
 * DOAA MOHAMED SALAH — PERSONAL PORTFOLIO JAVASCRIPT
 * Senior Frontend Developer & UI/UX Standards
 * Vanilla JavaScript (Zero External Dependencies)
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     0. ELEGANT PRELOADER CONTROLLER (DMS.dev)
     ========================================================================== */
  const preloader = document.getElementById('preloader');
  const preloaderBar = document.getElementById('preloaderBar');
  const preloaderStatus = document.getElementById('preloaderStatusText');

  const startTime = Date.now();
  const MIN_PRELOADER_TIME = 1000; // minimum time for aesthetic brand presentation
  let progress = 15;
  let isLoaded = false;

  if (preloaderBar) preloaderBar.style.width = '15%';

  // Smoothly increment progress
  const progressInterval = setInterval(() => {
    if (progress < 90 && !isLoaded) {
      progress += Math.floor(Math.random() * 14) + 6;
      if (progress > 90) progress = 90;
      if (preloaderBar) preloaderBar.style.width = `${progress}%`;
    }
  }, 100);

  function finishPreloader() {
    if (isLoaded) return;
    isLoaded = true;
    clearInterval(progressInterval);

    if (preloaderBar) preloaderBar.style.width = '100%';
    if (preloaderStatus) preloaderStatus.textContent = 'Welcome!';

    const elapsed = Date.now() - startTime;
    const remainingTime = Math.max(0, MIN_PRELOADER_TIME - elapsed);

    setTimeout(() => {
      if (preloader) {
        preloader.classList.add('preloader-hidden');
        document.body.classList.add('page-loaded');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 700);
      }
    }, remainingTime);
  }

  // Hide when window fully finishes loading
  window.addEventListener('load', finishPreloader);
  // Failsafe in case window load event is delayed by external fonts or icons
  setTimeout(finishPreloader, 2200);

  /* ==========================================================================
     0.1. CONSTANTS & CONFIGURATION
     ========================================================================== */
  
  /**
   * Official WhatsApp Phone Number (configured with country code +20 for Egypt)
   * Local: 01115137318 -> International: 201115137318
   */
  const WHATSAPP_PHONE = "201115137318"; 
  const WHATSAPP_DEFAULT_MSG = "Hi Doaa, I saw your portfolio and would love to connect with you regarding an opportunity!";

  // Set the dynamic WhatsApp link immediately
  const whatsappBtn = document.getElementById('whatsappContactBtn');
  if (whatsappBtn) {
    const encodedMsg = encodeURIComponent(WHATSAPP_DEFAULT_MSG);
    whatsappBtn.href = `https://wa.me/${WHATSAPP_PHONE.replace(/[^0-9]/g, '')}?text=${encodedMsg}`;
  }

  // Dynamic Current Year for Footer Copyright
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     1. TYPING EFFECT (Hero Section)
     ========================================================================== */
  const typedPhrases = [
    "Web Developer",
    "Data Engineer",
    "Team Leader",
    "Problem Solver"
  ];

  const typedElement = document.getElementById('typedElement');
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeText() {
    if (!typedElement) return;

    const currentPhrase = typedPhrases[phraseIndex];

    if (isDeleting) {
      typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at end of word
      isDeleting = true;
      typingSpeed = 1800;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % typedPhrases.length;
      typingSpeed = 450;
    }

    setTimeout(typeText, typingSpeed);
  }

  typeText();

  /* ==========================================================================
     2. NAVBAR SCROLL EFFECT & ACTIVE LINK HIGHLIGHTING
     ========================================================================== */
  const navbarWrapper = document.querySelector('.navbar-wrapper');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id], header[id]');

  function handleNavbarScroll() {
    const scrollPos = window.scrollY;

    // Sticky glass border and background depth change
    if (navbarWrapper) {
      if (scrollPos > 40) {
        navbarWrapper.classList.add('scrolled');
      } else {
        navbarWrapper.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
      }
    }

    // Determine current section for active navbar link
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // Smooth Back to Top click
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     3. MOBILE DRAWER NAVIGATION (Accessible Hamburger & Trap)
     ========================================================================== */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    mobileDrawer.classList.add('active');
    drawerBackdrop.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    drawerBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Lock background scroll
  }

  function closeMobileMenu() {
    mobileDrawer.classList.remove('active');
    drawerBackdrop.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    drawerBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', openMobileMenu);
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeMobileMenu);
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeMobileMenu);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  /* ==========================================================================
     4. SCROLL REVEAL (IntersectionObserver)
     ========================================================================== */
  const revealElements = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  /* ==========================================================================
     5. ANIMATED STAT COUNTERS (About Section)
     ========================================================================== */
  const statCounters = document.querySelectorAll('.stat-counter');
  let countersAnimated = false;

  function animateCounters() {
    statCounters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1600; // milliseconds
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease-out cubic animation formula
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(easeOutProgress * target);

        counter.textContent = currentValue;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  const aboutSection = document.getElementById('about');
  if (aboutSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          animateCounters();
          countersAnimated = true;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    statsObserver.observe(aboutSection);
  }

  /* ==========================================================================
     6. ACCESSIBLE SKILLS TABS
     ========================================================================== */
  const tabButtons = document.querySelectorAll('.skill-tab-btn');
  const tabPanels = document.querySelectorAll('.skill-tab-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetPanelId = button.getAttribute('aria-controls');

      // Update button states
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      // Update panel visibility
      tabPanels.forEach(panel => {
        if (panel.id === targetPanelId) {
          panel.classList.add('active');
          panel.removeAttribute('hidden');
        } else {
          panel.classList.remove('active');
          panel.setAttribute('hidden', '');
        }
      });
    });

    // Keyboard Arrow Navigation for Tabs
    button.addEventListener('keydown', (e) => {
      const tabsArray = Array.from(tabButtons);
      const currentIndex = tabsArray.indexOf(button);

      let nextIndex = null;
      if (e.key === 'ArrowRight') {
        nextIndex = (currentIndex + 1) % tabsArray.length;
      } else if (e.key === 'ArrowLeft') {
        nextIndex = (currentIndex - 1 + tabsArray.length) % tabsArray.length;
      }

      if (nextIndex !== null) {
        tabsArray[nextIndex].focus();
        tabsArray[nextIndex].click();
      }
    });
  });

  /* ==========================================================================
     7. PROJECTS MODAL DATA & CONTROLLER (Challenge → Action → Result)
     Strictly NO bullet lists anywhere!
     ========================================================================== */
  const projectsData = {
    shifa: {
      category: "Graduation Project • Web App • Team Leader",
      title: "Shifa – Clinic Appointments & Nearby Pharmacies Web App",
      tags: ["C#", "ASP.NET Core MVC", "SQL Server", "ADO.NET", "HTML5", "CSS3", "JavaScript", "Figma", "Git & GitHub"],
      bannerIcon: "fa-solid fa-graduation-cap",
      bannerText: "Graduation Project Distinctions • Architectural Documentation & Presentation",
      challenge: "Patients in Egypt consistently encounter severe friction when scheduling healthcare consultations: lack of verified specialist schedules, opaque pricing, double-booked appointments, and the frustrating difficulty of finding open nearby pharmacies holding prescribed medications immediately after leaving the clinic.",
      action: "As Team Leader and Web Developer, I steered the entire team throughout the system lifecycle. I formulated comprehensive systems analysis documents including Use Case models, Activity workflows, and Entity-Relationship Diagrams (ERD). I architected a normalized relational database spanning patients, doctors, appointment slots, reviews, and pharmacy inventories with foreign-key constraints. Utilizing ASP.NET Core MVC, C#, and ADO.NET, I engineered the core scheduling engine, authentication, and responsive user interfaces coordinated with Figma designs.",
      result: "Delivered a unified, high-performing clinic and pharmacy web ecosystem that successfully automated patient appointment booking and geolocation-based pharmacy search. The project earned distinction during academic presentation for its exceptional relational database normalization, comprehensive architectural documentation, and seamless team collaboration.",
      github: "https://github.com/doaamhmdxo-21"
    },
    sales: {
      category: "NTI AI Ambassadors Final Project • Power BI",
      title: "Sales Performance Intelligence Dashboard",
      tags: ["Power BI", "DAX", "Power Query", "Data Modeling", "ETL", "Excel"],
      bannerIcon: "fa-solid fa-award",
      bannerText: "NTI AI Ambassadors Program Final Capstone • Verified High Distinction",
      challenge: "Retail business executives lacked clear visibility into regional sales velocities, fluctuating profitability margins, and inventory performance across six primary Egyptian governorates, relying on fragmented spreadsheets that delayed strategic decisions.",
      action: "Extracted, cleaned, and standardized disparate transaction records using Power Query. Designed an efficient star-schema data model linking sales facts with calendar, regional geography, and product dimension tables. Authored advanced DAX measures to calculate dynamic month-over-month variances, cumulative annual revenue, and profit contribution percentages.",
      result: "Constructed an executive interactive dashboard tracking Total Sales exceeding 95K+ EGP and Net Profit surpassing 36K+ EGP. Equipped business stakeholders with multi-dimensional slicers, automated KPI variance cards, and actionable forecasting views that cut operational reporting turnaround by over 60%.",
      github: "https://github.com/doaamhmdxo-21"
    },
    clinic: {
      category: "Desktop Application • Systems Architecture",
      title: "Clinic Management System (Java & SQL)",
      tags: ["Java (OOP)", "NetBeans IDE", "Oracle Database", "MySQL", "SQL", "Relational Modeling"],
      bannerIcon: "fa-solid fa-shield-halved",
      bannerText: "Relational Schema Integrity & Desktop Architecture Execution",
      challenge: "Private medical practices needed an offline-first, tamper-proof clinic workstation capable of registering patients, booking doctor consultations, and maintaining strict audit histories without risk of duplicate entries or record corruption.",
      action: "Implemented an Object-Oriented software architecture in Java using NetBeans. Designed fully normalized relational schemas across Oracle and MySQL with referential constraints, primary/foreign keys, and data validation triggers. Integrated a responsive desktop UI communicating with the database via JDBC connections.",
      result: "Successfully established a reliable, error-free clinic desktop software that eliminates booking overlaps, secures patient medical histories against unauthorized tampering, and provides instant lookup of doctor availability.",
      github: "https://github.com/doaamhmdxo-21"
    },
    gpa: {
      category: "Academic Web Utility • Dynamic Algorithms",
      title: "Student GPA & Honors Classification Calculator",
      tags: ["JavaScript (ES6+)", "Algorithms", "CSS3 Glassmorphism", "HTML5", "Responsive UI"],
      bannerIcon: "fa-solid fa-calculator",
      bannerText: "Weighted Academic Credit-Hour Algorithm Implementation",
      challenge: "University students in credit-hour systems struggled with calculating accurate cumulative GPAs, forecasting graduation honors standing, and evaluating how retaking specific courses would influence their overall academic ranking.",
      action: "Developed a clean, client-side web utility applying institutional credit-hour weighted math. Created an intuitive dynamic table allowing users to add, update, and remove courses in real-time, instantly recalculating cumulative grade points, semester indices, and honors criteria using pure JavaScript.",
      result: "Provided university peers with a fast, zero-latency calculation engine featuring an engaging glassmorphic UI, helping students accurately model academic projections and graduation honors standing.",
      github: "https://github.com/doaamhmdxo-21"
    }
  };

  const projectModal = document.getElementById('projectModal');
  const projectModalBackdrop = document.getElementById('projectModalBackdrop');
  const closeProjectModalBtn = document.getElementById('closeProjectModalBtn');
  const modalDismissBtn = document.getElementById('modalDismissBtn');

  const modalCategory = document.getElementById('modalProjectCategory');
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalTags = document.getElementById('modalProjectTags');
  const modalBanner = document.getElementById('modalProjectBanner');
  const modalChallengeText = document.getElementById('modalChallengeText');
  const modalActionText = document.getElementById('modalActionText');
  const modalResultText = document.getElementById('modalResultText');
  const modalGithubLink = document.getElementById('modalGithubLink');

  function openProjectModal(projectKey) {
    const data = projectsData[projectKey];
    if (!data) return;

    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    
    // Tech tags
    modalTags.innerHTML = '';
    data.tags.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'tech-tag';
      span.textContent = tag;
      modalTags.appendChild(span);
    });

    // Banner
    modalBanner.innerHTML = `
      <div class="banner-visual-box">
        <i class="${data.bannerIcon}"></i>
        <span>${data.bannerText}</span>
      </div>
    `;

    // Narrative CAR texts
    modalChallengeText.textContent = data.challenge;
    modalActionText.textContent = data.action;
    modalResultText.textContent = data.result;

    if (modalGithubLink) {
      modalGithubLink.href = data.github;
    }

    projectModal.classList.add('active');
    projectModalBackdrop.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    projectModalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Trap focus on close button
    if (closeProjectModalBtn) closeProjectModalBtn.focus();
  }

  function closeProjectModal() {
    projectModal.classList.remove('active');
    projectModalBackdrop.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    projectModalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Attach event listeners to all "View Details" buttons
  const viewDetailsButtons = document.querySelectorAll('.btn-view-details');
  viewDetailsButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectKey = btn.getAttribute('data-project');
      openProjectModal(projectKey);
    });
  });

  if (closeProjectModalBtn) closeProjectModalBtn.addEventListener('click', closeProjectModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeProjectModal);
  if (projectModalBackdrop) projectModalBackdrop.addEventListener('click', closeProjectModal);

  /* ==========================================================================
     8. PRICING PLAN MODAL CONTROLLER
     ========================================================================== */
  const openPricingBtn = document.getElementById('openPricingBtn');
  const pricingModal = document.getElementById('pricingModal');
  const pricingModalBackdrop = document.getElementById('pricingModalBackdrop');
  const closePricingModalBtn = document.getElementById('closePricingModalBtn');
  const selectPkgButtons = document.querySelectorAll('.select-pkg-btn');

  function openPricingModal() {
    pricingModal.classList.add('active');
    pricingModalBackdrop.classList.add('active');
    pricingModal.setAttribute('aria-hidden', 'false');
    pricingModalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closePricingModalBtn) closePricingModalBtn.focus();
  }

  function closePricingModal() {
    pricingModal.classList.remove('active');
    pricingModalBackdrop.classList.remove('active');
    pricingModal.setAttribute('aria-hidden', 'true');
    pricingModalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (openPricingBtn) openPricingBtn.addEventListener('click', openPricingModal);
  if (closePricingModalBtn) closePricingModalBtn.addEventListener('click', closePricingModal);
  if (pricingModalBackdrop) pricingModalBackdrop.addEventListener('click', closePricingModal);

  selectPkgButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      closePricingModal();
      const pkgName = btn.getAttribute('data-pkg');
      const messageTextarea = document.getElementById('senderMessage');
      if (messageTextarea) {
        messageTextarea.value = `Hi Doaa, I would like to inquire about the ${pkgName} package for my project.`;
        messageTextarea.focus();
      }
    });
  });

  /* ==========================================================================
     8.1 CERTIFICATE LIGHTBOX MODAL CONTROLLER
     ========================================================================== */
  const certLightboxModal = document.getElementById('certLightboxModal');
  const certLightboxBackdrop = document.getElementById('certLightboxBackdrop');
  const closeCertLightboxBtn = document.getElementById('closeCertLightboxBtn');
  const certLightboxImage = document.getElementById('certLightboxImage');
  const certLightboxTitle = document.getElementById('certLightboxTitle');
  const certLightboxIssuer = document.getElementById('certLightboxIssuer');
  const certLightboxTriggers = document.querySelectorAll('.cert-lightbox-trigger');

  function openCertLightbox(imgSrc, title, issuer) {
    if (!certLightboxModal || !certLightboxImage) return;

    certLightboxImage.src = imgSrc;
    certLightboxImage.alt = title;
    if (certLightboxTitle) certLightboxTitle.textContent = title;
    if (certLightboxIssuer) certLightboxIssuer.textContent = issuer;

    certLightboxModal.classList.add('active');
    certLightboxBackdrop.classList.add('active');
    certLightboxModal.setAttribute('aria-hidden', 'false');
    certLightboxBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (closeCertLightboxBtn) closeCertLightboxBtn.focus();
  }

  function closeCertLightbox() {
    if (!certLightboxModal) return;
    certLightboxModal.classList.remove('active');
    certLightboxBackdrop.classList.remove('active');
    certLightboxModal.setAttribute('aria-hidden', 'true');
    certLightboxBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  certLightboxTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const imgSrc = trigger.getAttribute('data-cert-img');
      const title = trigger.getAttribute('data-cert-title');
      const issuer = trigger.getAttribute('data-cert-issuer');
      if (imgSrc) {
        openCertLightbox(imgSrc, title, issuer);
      }
    });
  });

  if (closeCertLightboxBtn) closeCertLightboxBtn.addEventListener('click', closeCertLightbox);
  if (certLightboxBackdrop) certLightboxBackdrop.addEventListener('click', closeCertLightbox);

  /* ==========================================================================
     9. ESCAPE KEY MODAL DISMISSAL & ACCESSIBILITY
     ========================================================================== */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (certLightboxModal && certLightboxModal.classList.contains('active')) {
        closeCertLightbox();
      }
      if (projectModal && projectModal.classList.contains('active')) {
        closeProjectModal();
      }
      if (pricingModal && pricingModal.classList.contains('active')) {
        closePricingModal();
      }
      if (mobileDrawer && mobileDrawer.classList.contains('active')) {
        closeMobileMenu();
      }
    }
  });

  /* ==========================================================================
     10. CONTACT FORM CLIENT-SIDE VALIDATION & FEEDBACK
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const senderName = document.getElementById('senderName');
  const senderEmail = document.getElementById('senderEmail');
  const senderMessage = document.getElementById('senderMessage');
  const formSuccessMessage = document.getElementById('formSuccessMessage');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  if (contactForm) {
    // Real-time input clearing
    [senderName, senderEmail, senderMessage].forEach(input => {
      if (!input) return;
      input.addEventListener('input', () => {
        input.classList.remove('is-invalid');
        const errSpan = document.getElementById(`${input.name}Error`);
        if (errSpan) errSpan.classList.remove('active');
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      if (!senderName.value.trim() || senderName.value.trim().length < 2) {
        senderName.classList.add('is-invalid');
        nameError.classList.add('active');
        isValid = false;
      } else {
        senderName.classList.remove('is-invalid');
        nameError.classList.remove('active');
      }

      // Validate Email
      if (!validateEmail(senderEmail.value.trim())) {
        senderEmail.classList.add('is-invalid');
        emailError.classList.add('active');
        isValid = false;
      } else {
        senderEmail.classList.remove('is-invalid');
        emailError.classList.remove('active');
      }

      // Validate Message
      if (!senderMessage.value.trim() || senderMessage.value.trim().length < 10) {
        senderMessage.classList.add('is-invalid');
        messageError.classList.add('active');
        isValid = false;
      } else {
        senderMessage.classList.remove('is-invalid');
        messageError.classList.remove('active');
      }

      if (isValid) {
        // Front-end success simulation
        const submitBtn = document.getElementById('formSubmitBtn');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending...</span>`;
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span class="btn-text">Send Message</span> <i class="fa-solid fa-paper-plane btn-icon"></i>`;
          }

          if (formSuccessMessage) {
            formSuccessMessage.classList.add('active');
          }

          contactForm.reset();

          // Automatically hide success notification after 7 seconds
          setTimeout(() => {
            if (formSuccessMessage) {
              formSuccessMessage.classList.remove('active');
            }
          }, 7000);
        }, 600);
      }
    });
  }

  /* ==========================================================================
     11. DESKTOP CUSTOM CURSOR
     ========================================================================== */
  const customCursor = document.getElementById('customCursor');
  const cursorFollower = document.getElementById('customCursorFollower');

  if (window.matchMedia('(pointer: fine)').matches && customCursor && cursorFollower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      customCursor.style.opacity = '1';
      cursorFollower.style.opacity = '1';

      customCursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    });

    function animateFollower() {
      // Smooth interpolation
      followerX += (mouseX - followerX) * 0.18;
      followerY += (mouseY - followerY) * 0.18;

      cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover scale effect over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .glass-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%) scale(1.6)`;
        cursorFollower.style.borderColor = 'rgba(236, 72, 153, 0.9)';
      });
      el.addEventListener('mouseleave', () => {
        cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%) scale(1)`;
        cursorFollower.style.borderColor = 'rgba(236, 72, 153, 0.6)';
      });
    });

    document.addEventListener('mouseleave', () => {
      customCursor.style.opacity = '0';
      cursorFollower.style.opacity = '0';
    });
  }

  /* ==========================================================================
     12. THEME TOGGLE (Light / Dark with localStorage)
     ========================================================================== */
  const themeToggle = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or system preference
  const savedTheme = localStorage.getItem('dms_theme') || 'light';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('dms_theme', newTheme);
    });
  }

  /* ==========================================================================
     13. EN / AR LANGUAGE TOGGLE WITH RTL SUPPORT
     ========================================================================== */
  const langToggle = document.getElementById('langToggle');
  const langLabel = document.getElementById('langLabel');

  const translations = {
    en: {
      langBtn: "AR",
      heroGreeting: "Available for Opportunities",
      heroHeadlinePrefix: "Passionate ",
      heroTagline: "\"Building data pipelines and modern web applications, from raw data to working products.\"",
      heroSubtext: "Business Information Systems (BIS) graduate combining solid software engineering fundamentals with data modeling, relational databases, ETL pipelines, and interactive analytics.",
      exploreWork: "Explore My Work",
      downloadCv: "Download CV",
      aboutTag: "My Journey",
      aboutTitle: "Behind the Code & Data",
      aboutSubtitle: "Bridging business intelligence, relational architecture, and modern web applications.",
      storyTitle: "From BIS Foundations to Impactful Solutions",
      storyP1: "I am a Web Developer, Data Engineer, and Business Information Systems (BIS) graduate from the Faculty of Commerce & Business Administration. My academic journey provided a comprehensive grounding in systems analysis & design (crafting use case diagrams, activity workflows, ERD, and normalized relational schemas), object-oriented programming in Java, relational database engineering, and business intelligence.",
      storyP2: "As a project leader, I spearheaded the end-to-end development of Shifa — a modern web application for booking clinic appointments and locating nearby pharmacies. Complementing this, I completed rigorous certifications including the Microsoft Data Engineer (MSDE) track through DEPI (200 hours) and the AI Ambassadors program through NTI (80 hours).",
      storyP3: "I thrive at the intersection where clean, maintainable web products meet high-performance data models and automated data pipelines. I am actively open to Web Developer, Data Engineering, or Data Analyst roles.",
      languagesTitle: "Language Proficiency",
      langAr: "Arabic",
      langArLevel: "Native",
      langEn: "English",
      langEnLevel: "Upper-Intermediate (B2)",
      coreCompetencies: "Core Competencies & Discipline",
      statProjects: "Featured Projects",
      statPrograms: "Training Programs",
      statDE: "Data Engineering Training",
      statAI: "AI Training (NTI)",
      eduTag: "Academic Foundation",
      eduTitle: "Education & Specialization",
      eduSubtitle: "Solid grounding combining business commerce strategy with advanced information technology.",
      graduated: "Graduated",
      degreeTitle: "Bachelor's Degree in Business Information Systems (BIS)",
      facultyName: "Faculty of Commerce & Business Administration",
      eduDesc: "A specialized dual-discipline curriculum marrying organizational operations, financial workflows, and business strategy with computer science, software engineering architectures, database management systems, and analytical intelligence.",
      coreFocusAreas: "Core Focus Areas & Applied Knowledge",
      certTag: "Credentials",
      certTitle: "Professional Certifications & Training",
      certSubtitle: "Intensive hands-on programs delivered by top governmental initiatives and industry leaders.",
      skillsTag: "Technical Arsenal",
      skillsTitle: "Skills & Competencies",
      skillsSubtitle: "Real brand logos, categorized into intuitive tabs to maintain visual clarity.",
      tabTechnical: "Technical Skills",
      tabTools: "Development Tools",
      tabSoft: "Soft Skills",
      tabLanguages: "Languages",
      projectsTag: "Crafted Work",
      projectsTitle: "Featured Projects",
      projectsSubtitle: "A curated selection of web applications, business intelligence dashboards, and software systems.",
      servicesTag: "What I Deliver",
      servicesTitle: "Services & Offerings",
      servicesSubtitle: "Tailored digital engineering and analytics solutions crafted to drive measurable value.",
      viewPricing: "View Pricing Plans & Packages",
      testTag: "Endorsements",
      testTitle: "Testimonials & Peer Feedback",
      testSubtitle: "Reflections from academic supervisors and project team colleagues.",
      contactTag: "Let's Connect",
      contactTitle: "Get In Touch",
      contactSubtitle: "Have a project, role opening, or collaboration in mind? Reach out directly.",
      directChannels: "Direct Communication",
      channelsDesc: "Choose the communication channel that works best for you. I respond promptly to all messages.",
      sendMessage: "Send a Message",
      sendDesc: "Fill in the form below and I will get back to you within 24 hours.",
      formName: "Your Full Name",
      formEmail: "Email Address",
      formMessage: "Your Message",
      btnSend: "Send Message",
      thankYou: "Thank you for your message!",
      msgSentNotice: "Your message has been received. I look forward to connecting with you shortly!",
      footerBannerQuote: "Building data pipelines and modern web applications, from raw data to working products.",
      footerNav: "Quick Navigation",
      footerConnect: "Connect"
    },
    ar: {
      langBtn: "EN",
      heroGreeting: "متاحة لفرص العمل والمشاريع",
      heroHeadlinePrefix: "شغوفة بـ ",
      heroTagline: "\"بناء خطوط معالجة وتدفق البيانات وتطبيقات الويب الحديثة، من البيانات الأولية إلى منتجات رقمية متكاملة.\"",
      heroSubtext: "خريجة نظم معلومات الأعمال (BIS) أجمع بين أساسيات هندسة البرمجيات الحديثة وهندسة ونمذجة وتدفق البيانات وقواعد البيانات العلائقية والتحليلات التفاعلية.",
      exploreWork: "استكشف أعمالي",
      downloadCv: "تحميل السيرة الذاتية",
      aboutTag: "مسيرتي المهنية",
      aboutTitle: "ما وراء الكود وهندسة البيانات",
      aboutSubtitle: "الربط بين ذكاء الأعمال وهندسة وتدفق البيانات العلائقية وتطبيقات الويب الحديثة.",
      storyTitle: "من أساسيات نظم المعلومات إلى حلول وهندسة برمجية وبيانية واقعية",
      storyP1: "مطورة ويب ومهندسة بيانات (Data Engineer) وخريجة نظم معلومات الأعمال (BIS) من كلية التجارة وإدارة الأعمال. منحتني دراستي أساساً راسخاً في تحليل وتصميم النظم، والبرمجة كائنية التوجه، وتصميم قواعد البيانات العلائقية، وخطوط معالجة وتدفق البيانات (ETL Pipelines)، وذكاء الأعمال.",
      storyP2: "قدت كقائدة للفريق مشروع 'شفاء' — منصة متكاملة لحجز مواعيد العيادات واستكشاف الصيدليات القريبة متصلة بقواعد بيانات SQL Server عبر ADO.NET. بالإضافة لذلك، أتممت مسار Microsoft Data Engineer (MSDE) عبر مبادرة رواد مصر الرقمية DEPI (200 ساعة) وسفراء الذكاء الاصطناعي عبر معهد NTI (80 ساعة).",
      storyP3: "أتميز في نقطة الالتقاء التي تجمع بين واجهات الويب النظيفة وسريعة الاستجابة وخطوط معالجة ونمذجة البيانات عالية الكفاءة. أبحث عن فرص في تطوير الويب، هندسة البيانات (Data Engineering)، أو تحليل البيانات.",
      languagesTitle: "اللغات المتقنة",
      langAr: "العربية",
      langArLevel: "اللغة الأم",
      langEn: "الإنجليزية",
      langEnLevel: "فوق المتوسط (B2)",
      coreCompetencies: "المهارات والركائز الأساسية",
      statProjects: "مشاريع متميزة",
      statPrograms: "برامج تدريبية",
      statDE: "تدريب هندسة البيانات",
      statAI: "تدريب الذكاء الاصطناعي (NTI)",
      eduTag: "المؤهل الأكاديمي",
      eduTitle: "التعليم والتخصص",
      eduSubtitle: "تكامل استراتيجي بين إدارة الأعمال والعلوم التجارية وأحدث تقنيات تكنولوجيا المعلومات.",
      graduated: "تم التخرج",
      degreeTitle: "بكالوريوس نظم معلومات الأعمال (BIS)",
      facultyName: "كلية التجارة وإدارة الأعمال",
      eduDesc: "مناهج متخصصة تجمع بين العمليات المؤسسية والاستراتيجيات التجارية وهندسة البرمجيات وأنظمة إدارة قواعد البيانات والتحليلات الذكية.",
      coreFocusAreas: "المجالات والتطبيقات الأساسية",
      certTag: "الشهادات والاعتمادات",
      certTitle: "الشهادات والبرامج التدريبية المعتمدة",
      certSubtitle: "برامج مكثفة معتمدة من أبرز المبادرات الوطنية والمعاهد المتخصصة.",
      skillsTag: "الترسانة التقنية",
      skillsTitle: "المهارات والكفاءات",
      skillsSubtitle: "شعارات العلامات التجارية الحقيقية، موزعة على تبويبات لتجربة بصرية مريحة.",
      tabTechnical: "المهارات التقنية",
      tabTools: "أدوات التطوير",
      tabSoft: "المهارات الشخصية",
      tabLanguages: "اللغات",
      projectsTag: "أعمالي",
      projectsTitle: "المشاريع المميزة",
      projectsSubtitle: "مجموعة مختارة من تطبيقات الويب، لوحات ذكاء الأعمال، والأنظمة البرمجية.",
      servicesTag: "ما أقدمه",
      servicesTitle: "الخدمات والحلول",
      servicesSubtitle: "حلول رقمية وتحليلية مصممة خصيصاً لتحقيق نتائج ملموسة وقيمة مضافة.",
      viewPricing: "عرض خطط وباقات الأسعار",
      testTag: "التوصيات والآراء",
      testTitle: "شهادات المشرفين والزملاء",
      testSubtitle: "آراء موثقة من المشرفين الأكاديميين وزملاء فرق العمل الهندسية.",
      contactTag: "تواصل معي",
      contactTitle: "ابدأ محادثة",
      contactSubtitle: "هل لديك فكرة مشروع، شاغر وظيفي، أو فرصة تعاون؟ تواصل معي مباشرة.",
      directChannels: "قنوات التواصل المباشر",
      channelsDesc: "اختر القناة الأنسب لك. أرد بسرعة على كافة الرسائل والاستفسارات.",
      sendMessage: "أرسل رسالة",
      sendDesc: "املأ النموذج وسأتواصل معك في أقرب وقت خلال 24 ساعة.",
      formName: "الاسم بالكامل",
      formEmail: "البريد الإلكتروني",
      formMessage: "رسالتك",
      btnSend: "إرسال الرسالة",
      thankYou: "شكراً لرسالتك!",
      msgSentNotice: "تم استلام رسالتك بنجاح، وسأتواصل معك قريباً جداً!",
      footerBannerQuote: "تحويل البيانات إلى رؤى قابلة للتنفيذ والأفكار إلى حلول رقمية.",
      footerNav: "روابط سريعة",
      footerConnect: "التواصل"
    }
  };

  let currentLang = localStorage.getItem('dms_lang') || 'en';

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('dms_lang', lang);

    const isRtl = lang === 'ar';
    htmlRoot.setAttribute('lang', lang);
    htmlRoot.setAttribute('dir', isRtl ? 'rtl' : 'ltr');

    if (langLabel) {
      langLabel.textContent = translations[lang].langBtn;
    }

    // Replace all data-i18n elements
    const i18nElements = document.querySelectorAll('[data-i18n]');
    i18nElements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
  }

  // Initial language application
  applyLanguage(currentLang);

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const nextLang = currentLang === 'en' ? 'ar' : 'en';
      applyLanguage(nextLang);
    });
  }

});

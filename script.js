/**
 * MOINUDDIN RAZA QADRI — Interactive Hero, Bento Tab Switcher & Modal Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const parallaxText = document.getElementById('parallaxText');
  const parallaxActor = document.getElementById('parallaxActor');
  const infoModal = document.getElementById('infoModal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  // 1. Top-Right Glowing Pill Toggle Switch (Toggles Full Color / Noir Monochrome)
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      themeToggle.classList.toggle('switched');
      document.body.classList.toggle('mono-noir');
      const isSwitched = themeToggle.classList.contains('switched');
      themeToggle.setAttribute('aria-pressed', String(!isSwitched));
    });
  }

  // 2. Subtle 3D Mouse Parallax + Liquid Glass Specular Glare Tracking
  const modalCard = document.querySelector('.modal-card');
  window.addEventListener('mousemove', (e) => {
    const xNorm = (e.clientX / window.innerWidth - 0.5) * 2;
    const yNorm = (e.clientY / window.innerHeight - 0.5) * 2;

    if (parallaxText) {
      parallaxText.style.transform = `translate3d(${xNorm * -5}px, ${yNorm * -3}px, 0)`;
    }
    if (parallaxActor) {
      parallaxActor.style.transform = `translate3d(calc(-50% + ${xNorm * 7}px), ${yNorm * 3}px, 0)`;
    }
    if (modalCard && infoModal && infoModal.classList.contains('open')) {
      const rect = modalCard.getBoundingClientRect();
      const relX = ((e.clientX - rect.left) / rect.width) * 100;
      const relY = ((e.clientY - rect.top) / rect.height) * 100;
      modalCard.style.setProperty('--mouse-x', `${relX}%`);
      modalCard.style.setProperty('--mouse-y', `${relY}%`);
    }
  });

  // 3. Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('visible'));
  }

  // 4. Interactive Bento Showcase Cards
  const bentoContentMap = {
    portfolio: {
      title1: 'DRIVEN',
      title2: 'BY EDUCATION &',
      title3: 'BIGGER DREAMS',
      desc: '<strong>Education:</strong> Currently pursuing <strong>B.Tech in Computer Science &amp; Engineering (CSE)</strong> at <strong>Anjuman College of Engineering and Technology (ACET)</strong>, mastering core software engineering, algorithms, and modern web technologies.',
      dream: '<strong>My Dream:</strong> To become a top-tier <strong>Software Engineer &amp; Tech Innovator</strong> — creating impactful digital products used by millions, mastering future-ready technology, and turning relentless hard work into a legacy of success.',
      tag1: '#BTECH_CSE',
      tag2: '#DEVELOPER'
    },
    education: {
      title1: 'DRIVEN',
      title2: 'BY EDUCATION &',
      title3: 'BIGGER DREAMS',
      desc: '<strong>Education:</strong> Currently pursuing <strong>B.Tech in Computer Science &amp; Engineering (CSE)</strong> at <strong>Anjuman College of Engineering and Technology (ACET)</strong>, mastering core software engineering, algorithms, and modern web technologies.',
      dream: '<strong>My Dream:</strong> To become a top-tier <strong>Software Engineer &amp; Tech Innovator</strong> — creating impactful digital products used by millions, mastering future-ready technology, and turning relentless hard work into a legacy of success.',
      tag1: '#BTECH_CSE',
      tag2: '#DEVELOPER'
    },
    experience: {
      title1: 'DRIVEN',
      title2: 'BY EDUCATION &',
      title3: 'BIGGER DREAMS',
      desc: '<strong>Education:</strong> Currently pursuing <strong>B.Tech in Computer Science &amp; Engineering (CSE)</strong> at <strong>Anjuman College of Engineering and Technology (ACET)</strong>, mastering core software engineering, algorithms, and modern web technologies.',
      dream: '<strong>My Dream:</strong> To become a top-tier <strong>Software Engineer &amp; Tech Innovator</strong> — creating impactful digital products used by millions, mastering future-ready technology, and turning relentless hard work into a legacy of success.',
      tag1: '#BTECH_CSE',
      tag2: '#DEVELOPER'
    }
  };

  const bentoTitle1 = document.getElementById('bentoTitle1');
  const bentoTitle2 = document.getElementById('bentoTitle2');
  const bentoTitle3 = document.getElementById('bentoTitle3');
  const bentoDesc = document.getElementById('bentoDesc');
  const subTag1 = document.getElementById('subTag1');
  const subTag2 = document.getElementById('subTag2');
  const bentoTabs = document.querySelectorAll('.bento-tab');

  function activateBentoTab(key) {
    const data = bentoContentMap[key];
    if (!data) return;

    bentoTabs.forEach((t) => {
      t.classList.toggle('active', t.getAttribute('data-bento-tab') === key);
    });

    if (bentoTitle1) bentoTitle1.textContent = data.title1;
    if (bentoTitle2) bentoTitle2.textContent = data.title2;
    if (bentoTitle3) bentoTitle3.textContent = data.title3;
    if (bentoDesc) bentoDesc.innerHTML = data.desc;
    if (subTag1) subTag1.textContent = data.tag1;
    if (subTag2) subTag2.textContent = data.tag2;
  }

  bentoTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      activateBentoTab(tab.getAttribute('data-bento-tab'));
    });
  });

  document.querySelectorAll('[data-bento-select]').forEach((card) => {
    card.addEventListener('click', () => {
      activateBentoTab(card.getAttribute('data-bento-select'));
    });
  });

  // 5. Navigation Links (Home / About / Contact Modals)
  const modalTemplates = {
    about: `
      <div class="about-grid">
        <div class="about-photo-wrap">
          <img src="assets/about-photo.jpg" alt="Moinuddin Raza Qadri" class="about-photo" />
          <div class="about-photo-badge">B.Tech CSE • ACET</div>
        </div>

        <div class="about-content">
          <span class="about-eyebrow">Computer Science &amp; Engineering</span>
          <h2 id="modalTitle">MOINUDDIN RAZA QADRI</h2>
          <p>
            I am a driven <strong>B.Tech in Computer Science &amp; Engineering (CSE)</strong> undergraduate at
            <strong>Anjuman College of Engineering and Technology (ACET)</strong>. Passionate about modern software
            development, web architecture, and emerging technologies, I focus on crafting clean, high-impact digital
            experiences with strong engineering fundamentals.
          </p>

          <div class="about-info-cards">
            <div class="about-info-item">
              <span class="about-info-label">Degree &amp; Specialization</span>
              <span class="about-info-value">Bachelor of Technology (B.Tech) — Computer Science &amp; Engineering (CSE)</span>
            </div>
            <div class="about-info-item">
              <span class="about-info-label">Institution</span>
              <span class="about-info-value">Anjuman College of Engineering and Technology</span>
            </div>
          </div>

          <div class="about-skill-tags">
            <span class="about-skill-tag">Computer Science</span>
            <span class="about-skill-tag">Software Engineering</span>
            <span class="about-skill-tag">Web Development</span>
            <span class="about-skill-tag">Problem Solving</span>
          </div>

          <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
            <a href="https://www.instagram.com/moinuddin_khan_25?srtk=cHhwaXNsZ2xqdDRn" target="_blank" rel="noopener noreferrer" class="modal-cta">
              Connect on Instagram &rarr;
            </a>
            <a href="https://www.snapchat.com/add/moinuddin7830?share_id=PAuw2stwk-w&locale=en-IN" target="_blank" rel="noopener noreferrer" class="modal-cta secondary">
              Add on Snapchat &rarr;
            </a>
          </div>
        </div>
      </div>
    `,
    contact: `
      <span class="about-eyebrow">Get In Touch</span>
      <h2 id="modalTitle">CONTACT MOINUDDIN RAZA QADRI</h2>
      <p>
        Interested in tech collaborations, academic projects, or connecting directly? Reach out through my official
        social profiles below:
      </p>
      <div class="about-info-cards">
        <div class="about-info-item">
          <span class="about-info-label">Academic Affiliation</span>
          <span class="about-info-value">B.Tech CSE — Anjuman College of Engineering and Technology</span>
        </div>
      </div>
      <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
        <a href="https://www.instagram.com/moinuddin_khan_25?srtk=cHhwaXNsZ2xqdDRn" target="_blank" rel="noopener noreferrer" class="modal-cta">
          Instagram (@moinuddin_khan_25) &rarr;
        </a>
        <a href="https://www.snapchat.com/add/moinuddin7830?share_id=PAuw2stwk-w&locale=en-IN" target="_blank" rel="noopener noreferrer" class="modal-cta secondary">
          Snapchat (@moinuddin7830) &rarr;
        </a>
      </div>
    `
  };

  document.querySelectorAll('[data-modal]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('data-modal');
      if (target === 'about' || target === 'contact') {
        e.preventDefault();
        modalBody.innerHTML = modalTemplates[target];
        infoModal.classList.add('open');
        infoModal.setAttribute('aria-hidden', 'false');
      } else if (target === 'home') {
        e.preventDefault();
        infoModal.classList.remove('open');
        infoModal.setAttribute('aria-hidden', 'true');
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      infoModal.classList.remove('open');
      infoModal.setAttribute('aria-hidden', 'true');
    });
  }

  if (infoModal) {
    infoModal.addEventListener('click', (e) => {
      if (e.target === infoModal) {
        infoModal.classList.remove('open');
        infoModal.setAttribute('aria-hidden', 'true');
      }
    });
  }
});

(function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('open');
      document.body.classList.toggle('no-scroll', !expanded);
    });

    navMenu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('no-scroll');
        }
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id && id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  const filterButtons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.catalog-item');
  if (filterButtons.length && items.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter') || 'all';
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        items.forEach((item) => {
          const category = item.getAttribute('data-category');
          const show = filter === 'all' || category === filter;
          item.style.display = show ? '' : 'none';
        });
        const firstVisible = Array.from(items).find((it) => it.style.display !== 'none');
        if (firstVisible) firstVisible.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const name = (formData.get('name') || '').toString().trim();
      const phone = (formData.get('phone') || '').toString().trim();
      const message = (formData.get('message') || '').toString().trim();
      if (!name || !phone || !message) {
        alert('Будь ласка, заповніть усі поля форми.');
        return;
      }
      alert('Дякуємо! Ми зв’яжемося з вами найближчим часом.');
      contactForm.reset();
    });
  }
})();

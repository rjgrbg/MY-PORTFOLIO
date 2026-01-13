// Main client-side JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // Burger Menu Toggle
  const burgerMenu = document.querySelector('.burger-menu');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');

  burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
    // Disable body scroll when menu is open
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      burgerMenu.classList.remove('active');
      navMenu.classList.remove('active');
      // Re-enable body scroll
      document.body.style.overflow = '';
    });
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Add subtle parallax effect to circles on mouse move
  document.addEventListener('mousemove', (e) => {
    const circles = document.querySelectorAll('.circle');
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    
    circles.forEach((circle, index) => {
      const speed = (index + 1) * 5;
      const currentRotation = parseFloat(circle.style.transform?.match(/rotate\(([^)]+)\)/)?.[1] || 0);
      circle.style.transform = `translate(calc(-50% + ${x * speed}px), calc(-50% + ${y * speed}px))`;
    });
  });

  // Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    }

    else {
      navbar.classList.remove('scrolled');
    }
  });


  // Active Navbar
  const navLinksAll = document.querySelectorAll('.nav-menu a'); 

  navLinksAll.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));

      if (!target) return; 
      target.scrollIntoView({ behavior: 'smooth', block: 'start'});
      navLinksAll.forEach(l => l.classList.remove('active')); 
      link.classList.add('active');
    });
  });

  const observerOptions = {
    root: null,
    rootMargin: '-80px 0px 0px 0px',
    threshold: 0.25
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id ? `#${entry.target.id}` : null;
      if (!id) return;
      const link = document.querySelector(`.nav-menu a[href="${id}"]`);

      if (entry.isIntersecting) {
        navLinksAll.forEach(l => l.classList.remove('active'));
        link && link.classList.add('active');
      }
    });
  }, observerOptions);

  navLinksAll.forEach(link => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) observer.observe(target);
  });
});

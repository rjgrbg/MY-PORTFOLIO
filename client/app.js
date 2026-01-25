// Main client-side JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // Burger Menu Toggle
  const burgerMenu = document.querySelector('.burger-menu');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

  burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
    mobileMenuOverlay.classList.toggle('active');
    
    // Better body scroll control
    if (navMenu.classList.contains('active')) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  });

  // Close menu when clicking on overlay
  mobileMenuOverlay.addEventListener('click', () => {
    burgerMenu.classList.remove('active');
    navMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    
    // Restore scroll
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  });

  // Close menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      burgerMenu.classList.remove('active');
      navMenu.classList.remove('active');
      mobileMenuOverlay.classList.remove('active');
      
      // Restore scroll
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
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
 
  // Modal Contact
const contactBtn = document.getElementById('contact-btn');
const contactModal = document.getElementById('contact-modal');
const closebtn = document.getElementById('close-btn');

contactBtn.addEventListener('click', () => {
  contactModal.style.display = 'flex';
});

closebtn.addEventListener('click', () => {
  contactModal.style.display = 'none';
});

contactModal.addEventListener('click', (event) => {
  if (event.target === contactModal) {
    contactModal.style.display = 'none';
  }
});

const openContactModalBtns = document.querySelectorAll('.btn-hiring, #contact-btn');

openContactModalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    contactModal.style.display = 'flex';
  });
});


// Email Handling form 
const contactForm = document.querySelector('#contact-modal form');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({ name, email, message })
    });

    const data = await response.json();

    if (data.success) {
      alert('Message sent successfully');
      contactForm.reset();
      contactModal.style.display = 'none';
    } else {
      alert('Failed to send message, Please try again.');
    }
  }

  catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again');
  }

});


});



const textInfo = document.getElementById("text-info");
const btn = document.getElementById("seeMoreBtn");

function checkTextOverflow() {
  // If full height fits inside collapsed height
  if (textInfo.scrollHeight <= textInfo.clientHeight) {
    btn.style.display = "none";
  }
}

function toggleText() {
  textInfo.classList.toggle("expanded");
  btn.textContent = textInfo.classList.contains("expanded")
    ? "See less"
    : "See more";
}

// Run on load
window.addEventListener("load", checkTextOverflow);







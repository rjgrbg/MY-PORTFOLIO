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

// Case Study Modal
const caseStudyModal = document.getElementById('case-study-modal');
const csCloseBtn = document.getElementById('cs-close-btn');
const caseStudyLinks = document.querySelectorAll('.proj-case-study');

// Case study data for each project
const caseStudyData = {
  lakbay: {
    title: 'Lakbay',
    overview: 'A comprehensive travel website that provides information about tourist destinations, travel guides, and booking services. Built with modern web technologies to offer an intuitive user experience.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    challenges: 'Creating a responsive design that works across all devices while maintaining performance and user experience.',
    solutions: 'Implemented mobile-first design approach with CSS Grid and Flexbox for flexible layouts.',
    learnings: 'Improved understanding of responsive web design and the importance of user-centered design in travel applications.',
    screenshots: ['./assets/lakbay.png'],
    demoLink: 'https://gbgarj.github.io/Lakbay-group6/'
  },
  lms: {
    title: 'LMS Contemporary',
    overview: 'A learning management system website designed for contemporary education, providing tools for online learning and course management.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Web APIs'],
    challenges: 'Integrating various educational features while maintaining a clean and intuitive interface.',
    solutions: 'Used modular JavaScript architecture and CSS components for maintainable code.',
    learnings: 'Gained experience in building educational platforms and understanding user learning patterns.',
    screenshots: ['./assets/lms1.png'],
    demoLink: 'https://contemporary-world-eta.vercel.app/'
  },
  pms: {
    title: 'PMS Celestia Hotel',
    overview: 'A collaborative team project that produced a property management system for hotel operations. I contributed as a front-end developer, building user interfaces and coordinating with teammates on backend integration and testing.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL', 'Backend Integration'],
    challenges: 'Coordinating work across teammates, merging code, and ensuring consistency in data handling while maintaining security.',
    solutions: 'Established Git workflows for collaboration, designed a modular PHP backend with shared coding standards, and added input validation across forms.',
    learnings: 'Gained experience in team development, version control, and the importance of clear communication in group projects.',
    screenshots: ['./assets/pms.png'],
    demoLink: '#'
  }
};

// Function to populate modal content
function populateCaseStudyModal(projectKey) {
  const data = caseStudyData[projectKey];
  if (!data) return;
  
  document.getElementById('cs-project-title').textContent = data.title;
  document.getElementById('cs-overview').textContent = data.overview;
  document.getElementById('cs-challenges').textContent = data.challenges;
  document.getElementById('cs-solutions').textContent = data.solutions;
  document.getElementById('cs-learnings').textContent = data.learnings;
  document.getElementById('cs-demo-link').href = data.demoLink;
  
  // populate screenshots
  const screenshotDiv = document.getElementById('cs-screenshots');
  screenshotDiv.innerHTML = '';
  if (data.screenshots && data.screenshots.length) {
    data.screenshots.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `${data.title} screenshot`;
      screenshotDiv.appendChild(img);
    });
  }
  
  // Populate technologies list
  const techList = document.getElementById('cs-technologies');
  techList.innerHTML = '';
  data.technologies.forEach(tech => {
    const li = document.createElement('li');
    li.textContent = tech;
    techList.appendChild(li);
  });
}

// Event listeners for case study links
caseStudyLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const projectCard = link.closest('.grid-project');
    
    // Determine which project based on class or data attribute
    let projectKey = '';
    if (projectCard.classList.contains('project-1')) {
      projectKey = 'lakbay';
    } else if (projectCard.classList.contains('project-2')) {
      projectKey = 'lms';
    } else if (projectCard.classList.contains('project-3')) {
      projectKey = 'pms';
    }
    
    if (projectKey) {
      populateCaseStudyModal(projectKey);
      caseStudyModal.style.display = 'flex';
    }
  });
});

// Close modal
csCloseBtn.addEventListener('click', () => {
  caseStudyModal.style.display = 'none';
});

caseStudyModal.addEventListener('click', (event) => {
  if (event.target === caseStudyModal) {
    caseStudyModal.style.display = 'none';
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







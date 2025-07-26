// 🔧 GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// 🔹 Navigation scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// 🔸 Scroll progress indicator
window.addEventListener('scroll', () => {
  const scrollProgress = document.getElementById('scrollProgress');
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (window.scrollY / scrollHeight) * 100;
  scrollProgress.style.width = scrolled + '%';
});

// 🔹 Section animations
gsap.utils.toArray('.section').forEach((section, index) => {
  // Fade in animation
  gsap.from(section.children, {
    opacity: 0,
    y: 100,
    duration: 1.2,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });

  // Parallax effect for alternating sections
  if (index % 2 === 0) {
    gsap.to(section, {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }
});

// 🔸 Skill cards animation
gsap.utils.toArray('.skill-card').forEach((card, index) => {
  gsap.from(card, {
    scale: 0.8,
    rotation: -10,
    duration: 0.8,
    delay: index * 0.1,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: card,
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  });
});

// 🔹 Project cards animation
gsap.utils.toArray('.project-card').forEach((card, index) => {
  gsap.from(card, {
    x: index % 2 === 0 ? -100 : 100,
    opacity: 0,
    duration: 1,
    delay: index * 0.15,
    ease: "power2.out",
    scrollTrigger: {
      trigger: card,
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  });
});

// 🔸 Contact form animation
gsap.from('.contact-form > *', {
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: '.contact-form',
    start: 'top 85%',
    toggleActions: 'play none none reverse'
  }
});

// 🔹 Hero text animation
gsap.timeline()
  .from('#home h1', {
    scale: 0.5,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out"
  })
  .from('#home .hero-subtitle', {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  }, "-=0.8")
  .from('#home p:not(.hero-subtitle)', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  }, "-=0.6")
  .from('#home .cta-button', {
    scale: 0.8,
    opacity: 0,
    duration: 0.6,
    ease: "back.out(1.7)"
  }, "-=0.4");

// 🔸 Floating elements
function createFloatingElements() {
  const container = document.getElementById('floatingElements');
  for (let i = 0; i < 15; i++) {
    const element = document.createElement('div');
    element.className = 'floating-element';
    element.style.left = Math.random() * 100 + '%';
    element.style.animationDelay = Math.random() * 8 + 's';
    element.style.animationDuration = (Math.random() * 4 + 6) + 's';
    container.appendChild(element);
  }
}

// 🔹 Menu toggle function
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  const hamburger = document.getElementById("hamburger");
  
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
}

// 🔸 Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Close mobile menu if open
      document.getElementById("navLinks").classList.remove("active");
      document.getElementById("hamburger").classList.remove("active");
    }
  });
});

// 🔹 3D Model interaction
const modelViewer = document.querySelector('model-viewer');
if (modelViewer) {
  ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: self => {
      const rotation = self.progress * 360;
      modelViewer.cameraOrbit = `${rotation}deg 75deg 4m`;
    }
  });
}

// 🔸 Initialize
document.addEventListener('DOMContentLoaded', () => {
  createFloatingElements();
  
  // Add loading animation
  gsap.from('body', {
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });
});

// 🔹 Contact form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Animate button
  const button = this.querySelector('button');
  const originalText = button.textContent;
  
  gsap.to(button, {
    scale: 0.95,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
    ease: "power2.inOut"
  });
  
  button.textContent = 'Sending...';
  
  // Simulate form submission
  setTimeout(() => {
    button.textContent = 'Message Sent!';
    button.style.background = 'linear-gradient(45deg, #00ff00, #00aa00)';
    
    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = 'linear-gradient(45deg, #00ffff, #ff00ff)';
      this.reset();
    }, 2000);
  }, 1000);
});

// 🔸 Additional 3D Model Effects
document.addEventListener('DOMContentLoaded', () => {
  const modelViewer = document.querySelector('model-viewer');
  
  if (modelViewer) {
    // Add glow effect on model load
    modelViewer.addEventListener('load', () => {
      gsap.to(modelViewer, {
        opacity: 1,
        duration: 2,
        ease: "power2.out"
      });
    });

    // Mouse parallax effect
    document.addEventListener('mousemove', (e) => {
      const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      
      gsap.to(modelViewer, {
        rotationY: mouseX * 5,
        rotationX: mouseY * 5,
        duration: 1,
        ease: "power2.out"
      });
    });
  }
});

// 🔹 Performance optimization
window.addEventListener('load', () => {
  // Lazy load animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.skill-card, .project-card').forEach(el => {
    observer.observe(el);
  });
});

// 🔸 Advanced hover effects
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mouseenter', (e) => {
    gsap.to(card, {
      scale: 1.05,
      rotationY: 10,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  card.addEventListener('mouseleave', (e) => {
    gsap.to(card, {
      scale: 1,
      rotationY: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  });
});

// 🔹 Project card advanced interactions
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', (e) => {
    gsap.to(card, {
      scale: 1.02,
      rotationX: 5,
      z: 50,
      duration: 0.4,
      ease: "power3.out"
    });
  });

  card.addEventListener('mouseleave', (e) => {
    gsap.to(card, {
      scale: 1,
      rotationX: 0,
      z: 0,
      duration: 0.4,
      ease: "power3.out"
    });
  });
});

// 🔸 Dynamic background particles
function createBackgroundParticles() {
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = Math.random() * 3 + 1 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = `rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, ${Math.random() * 0.5 + 0.2})`;
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '-1';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    document.body.appendChild(particle);
    
    gsap.to(particle, {
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
      rotation: 360,
      duration: Math.random() * 10 + 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }
}

// 🔹 Text reveal animation
function addTextRevealAnimation() {
  const textElements = document.querySelectorAll('h1, h2, h3, p');
  
  textElements.forEach(element => {
    const text = element.textContent;
    element.innerHTML = '';
    
    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      element.appendChild(span);
      
      gsap.to(span, {
        opacity: 1,
        y: 0,
        duration: 0.05,
        delay: index * 0.02,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  });
}

// 🔸 Enhanced 3D model controls
function enhance3DModelControls() {
  const modelViewer = document.querySelector('model-viewer');
  
  if (modelViewer) {
    // Add dynamic lighting based on scroll
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: self => {
        const progress = self.progress;
        const exposure = 0.5 + (progress * 1.5);
        modelViewer.exposure = exposure;
        
        // Change camera orbit based on scroll
        const orbitY = 75 + (progress * 30);
        const orbitRadius = 4 + (progress * 2);
        modelViewer.cameraOrbit = `${progress * 360}deg ${orbitY}deg ${orbitRadius}m`;
      }
    });

    // Add click interaction
    modelViewer.addEventListener('click', () => {
      gsap.to(modelViewer, {
        scale: 1.1,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    });
  }
}

// 🔹 Initialize all enhanced features
document.addEventListener('DOMContentLoaded', () => {
  // Call all initialization functions
  createFloatingElements();
  createBackgroundParticles();
  enhance3DModelControls();
  
  // Add entrance animation
  gsap.timeline()
    .from('nav', {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    })
    .from('.scroll-indicator', {
      scaleX: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5");
});

// 🔸 Cursor trail effect
let mouseX = 0;
let mouseY = 0;
const trail = [];

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  // Create trail dot
  const dot = document.createElement('div');
  dot.className = 'cursor-trail';
  dot.style.cssText = `
    position: fixed;
    width: 4px;
    height: 4px;
    background: rgba(0, 255, 255, 0.6);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    left: ${mouseX}px;
    top: ${mouseY}px;
    transform: translate(-50%, -50%);
  `;
  
  document.body.appendChild(dot);
  
  gsap.to(dot, {
    scale: 0,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    onComplete: () => {
      dot.remove();
    }
  });
});

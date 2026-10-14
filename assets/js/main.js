/**
 * SRB Logistic - High-Tech Interactive Web Application Logic
 * Headquartered at Narnaul, Haryana | Hotline: 8955917201
 */



// Temperature Zone Simulator Switcher
function selectTempZone(zone) {
  const deepBtn = document.getElementById('btn-zone-deep');
  const chilledBtn = document.getElementById('btn-zone-chilled');
  const ambientBtn = document.getElementById('btn-zone-ambient');

  const displayTemp = document.getElementById('zone-temp-value');
  const displayTitle = document.getElementById('zone-title');
  const displayItems = document.getElementById('zone-items');
  const displaySpecs = document.getElementById('zone-specs');

  // Reset classes
  [deepBtn, chilledBtn, ambientBtn].forEach(btn => {
    if (btn) {
      btn.classList.remove('border-orange-500', 'bg-orange-500/20', 'text-orange-400');
      btn.classList.add('border-white/10', 'text-slate-300');
    }
  });

  if (zone === 'deep') {
    deepBtn.classList.add('border-orange-500', 'bg-orange-500/20', 'text-orange-400');
    displayTemp.innerHTML = `<span class="text-blue-400 font-mono">-18°C</span> to <span class="text-blue-400 font-mono">-25°C</span>`;
    displayTitle.innerText = 'Deep Freeze Logistic & Cold Chain';
    displayItems.innerHTML = `
      <li class="flex items-center gap-2 text-slate-300"><i class="fa-solid fa-check text-green-400 text-xs"></i> Ice Creams, Frozen Foods & Seafood</li>
      <li class="flex items-center gap-2 text-slate-300"><i class="fa-solid fa-check text-green-400 text-xs"></i> Fresh Butter, Paneer & Frozen Meat</li>
      <li class="flex items-center gap-2 text-slate-300"><i class="fa-solid fa-check text-green-400 text-xs"></i> Ultra-cold Biotech & Plasma Enzymes</li>
    `;
    displaySpecs.innerText = 'Dual-compressor Carrier/ThermoKing units, continuous continuous telematics log, thermal backup for 12 hours.';
  } else if (zone === 'chilled') {
    chilledBtn.classList.add('border-orange-500', 'bg-orange-500/20', 'text-orange-400');
    displayTemp.innerHTML = `<span class="text-cyan-400 font-mono">+2°C</span> to <span class="text-cyan-400 font-mono">+8°C</span>`;
    displayTitle.innerText = 'Chilled & Dairy Transport';
    displayItems.innerHTML = `
      <li class="flex items-center gap-2 text-slate-300"><i class="fa-solid fa-check text-green-400 text-xs"></i> Fresh Milk, Dairy products & Cheeses</li>
      <li class="flex items-center gap-2 text-slate-300"><i class="fa-solid fa-check text-green-400 text-xs"></i> Temperature-sensitive Vaccines & Insulin</li>
      <li class="flex items-center gap-2 text-slate-300"><i class="fa-solid fa-check text-green-400 text-xs"></i> Fresh Fruits, Berries & Exotic Vegetables</li>
    `;
    displaySpecs.innerText = 'Micro-controller sensor grid, automated humidity regulation, anti-frost airflow circulation.';
  } else if (zone === 'ambient') {
    ambientBtn.classList.add('border-orange-500', 'bg-orange-500/20', 'text-orange-400');
    displayTemp.innerHTML = `<span class="text-amber-400 font-mono">+15°C</span> to <span class="text-amber-400 font-mono">+25°C</span>`;
    displayTitle.innerText = 'Controlled Ambient & Pharma Logistic';
    displayItems.innerHTML = `
      <li class="flex items-center gap-2 text-slate-300"><i class="fa-solid fa-check text-green-400 text-xs"></i> Chocolates, Confectionery & Baked Goods</li>
      <li class="flex items-center gap-2 text-slate-300"><i class="fa-solid fa-check text-green-400 text-xs"></i> Finished Pharmaceuticals & Medical Devices</li>
      <li class="flex items-center gap-2 text-slate-300"><i class="fa-solid fa-check text-green-400 text-xs"></i> Premium Cosmetics & Chemicals</li>
    `;
    displaySpecs.innerText = 'Insulated chamber, GPS geofencing, remote lock controls, multi-point digital data loggers.';
  }
}

// Mobile Nav Menu Toggle
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) {
    menu.classList.toggle('hidden');
  }
}

// Counter animation
function animateCounters() {
  const counters = document.querySelectorAll('.counter-val');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const speed = 25;
    const updateCount = () => {
      const current = +counter.innerText.replace(/[^0-9]/g, '');
      const inc = Math.ceil(target / speed);
      if (current < target) {
        counter.innerText = (current + inc).toLocaleString();
        setTimeout(updateCount, 40);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };
    updateCount();
  });
}


// Header Navigation ScrollSpy & Progress Tracker
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('nav .nav-link');
  const mobileLinks = document.querySelectorAll('#mobile-menu a[href^="#"]');
  const progressBar = document.getElementById('scroll-progress-bar');

  function updateActiveLink() {
    const scrollPos = window.scrollY + 140; // offset for sticky top bar + header

    // Update top progress bar
    if (progressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }

    let activeId = '';
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        activeId = section.getAttribute('id');
      }
    });

    // If near the top, default to first section (home)
    if (window.scrollY < 80 && sections.length > 0) {
      activeId = sections[0].getAttribute('id');
    }

    if (activeId) {
      desktopLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${activeId}`) {
          link.classList.add('text-srbOrange', 'active-nav-link');
          link.classList.remove('text-slate-300');
        } else {
          link.classList.remove('text-srbOrange', 'active-nav-link');
          link.classList.add('text-slate-300');
        }
      });

      mobileLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${activeId}`) {
          link.classList.add('text-srbOrange', 'font-bold');
          link.classList.remove('text-slate-200');
        } else {
          link.classList.remove('text-srbOrange', 'font-bold');
          link.classList.add('text-slate-200');
        }
      });
    }
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  window.addEventListener('resize', updateActiveLink, { passive: true });
  updateActiveLink();

  // Smooth scroll handler for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const targetId = href.substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = 90;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });

        // Close mobile dropdown if open
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
      }
    });
  });
}

// Light / Dark Theme Switcher
function initTheme() {
  const savedTheme = localStorage.getItem('srb_theme');
  if (savedTheme === 'light') {
    document.documentElement.classList.add('light-theme');
    updateThemeToggleUI('light');
  } else {
    document.documentElement.classList.remove('light-theme');
    updateThemeToggleUI('dark');
  }
}

function toggleTheme() {
  const isLight = document.documentElement.classList.toggle('light-theme');
  const currentTheme = isLight ? 'light' : 'dark';
  localStorage.setItem('srb_theme', currentTheme);
  updateThemeToggleUI(currentTheme);
}

function updateThemeToggleUI(theme) {
  const sunIcons = document.querySelectorAll('.theme-icon-sun');
  const moonIcons = document.querySelectorAll('.theme-icon-moon');
  const themeLabels = document.querySelectorAll('.theme-toggle-label');
  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');

  if (theme === 'light') {
    sunIcons.forEach(icon => icon.classList.add('hidden'));
    moonIcons.forEach(icon => icon.classList.remove('hidden'));
    themeLabels.forEach(label => { label.textContent = 'Dark'; });
    toggleBtns.forEach(btn => {
      btn.setAttribute('title', 'Switch to Dark Mode');
      btn.setAttribute('aria-label', 'Switch to Dark Mode');
    });
  } else {
    sunIcons.forEach(icon => icon.classList.remove('hidden'));
    moonIcons.forEach(icon => icon.classList.add('hidden'));
    themeLabels.forEach(label => { label.textContent = 'Light'; });
    toggleBtns.forEach(btn => {
      btn.setAttribute('title', 'Switch to Light Mode');
      btn.setAttribute('aria-label', 'Switch to Light Mode');
    });
  }
}

// Initializer
document.addEventListener('DOMContentLoaded', () => {

  // Initialize Theme
  initTheme();

  // Initialize ScrollSpy
  initScrollSpy();

  // Check if counters are in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    });
  }, { threshold: 0.2 });

  const statsSection = document.getElementById('stats-section') || document.getElementById('about');
  if (statsSection) {
    observer.observe(statsSection);
  }

  // Set default temp zone
  if (document.getElementById('btn-zone-deep')) {
    selectTempZone('deep');
  }
});

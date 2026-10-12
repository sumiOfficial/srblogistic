/**
 * SRB Logistic - High-Tech Interactive Web Application Logic
 * Headquartered at Narnaul, Haryana | Hotline: 8955917201
 */

// City Distances Matrix (Distance in km from key freight centers in India)
const cityCoordinates = {
  'Narnaul': { state: 'Haryana', lat: 28.0444, lng: 76.1070 },
  'Delhi-NCR': { state: 'Delhi', lat: 28.6139, lng: 77.2090 },
  'Mumbai': { state: 'Maharashtra', lat: 19.0760, lng: 72.8777 },
  'Bengaluru': { state: 'Karnataka', lat: 12.9716, lng: 77.5946 },
  'Pune': { state: 'Maharashtra', lat: 18.5204, lng: 73.8567 },
  'Jaipur': { state: 'Rajasthan', lat: 26.9124, lng: 75.7873 },
  'Ahmedabad': { state: 'Gujarat', lat: 23.0225, lng: 72.5714 },
  'Hyderabad': { state: 'Telangana', lat: 17.3850, lng: 78.4867 },
  'Chennai': { state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707 },
  'Kolkata': { state: 'West Bengal', lat: 22.5726, lng: 88.3639 },
  'Chandigarh': { state: 'Punjab/Haryana', lat: 30.7333, lng: 76.7794 },
  'Surat': { state: 'Gujarat', lat: 21.1702, lng: 72.8311 }
};

// Distance approximation table (in km)
const distanceMatrix = {
  'Narnaul': { 'Delhi-NCR': 140, 'Jaipur': 155, 'Mumbai': 1280, 'Bengaluru': 1980, 'Pune': 1360, 'Ahmedabad': 840, 'Hyderabad': 1490, 'Chennai': 2080, 'Kolkata': 1550, 'Chandigarh': 320, 'Surat': 1050 },
  'Delhi-NCR': { 'Narnaul': 140, 'Jaipur': 270, 'Mumbai': 1420, 'Bengaluru': 2150, 'Pune': 1490, 'Ahmedabad': 940, 'Hyderabad': 1580, 'Chennai': 2200, 'Kolkata': 1500, 'Chandigarh': 240, 'Surat': 1180 },
  'Mumbai': { 'Narnaul': 1280, 'Delhi-NCR': 1420, 'Jaipur': 1150, 'Bengaluru': 980, 'Pune': 150, 'Ahmedabad': 530, 'Hyderabad': 710, 'Chennai': 1330, 'Kolkata': 1950, 'Chandigarh': 1650, 'Surat': 280 },
  'Bengaluru': { 'Narnaul': 1980, 'Delhi-NCR': 2150, 'Jaipur': 1950, 'Mumbai': 980, 'Pune': 840, 'Ahmedabad': 1490, 'Hyderabad': 570, 'Chennai': 345, 'Kolkata': 1870, 'Chandigarh': 2390, 'Surat': 1260 },
  'Pune': { 'Narnaul': 1360, 'Delhi-NCR': 1490, 'Jaipur': 1220, 'Mumbai': 150, 'Bengaluru': 840, 'Ahmedabad': 660, 'Hyderabad': 560, 'Chennai': 1190, 'Kolkata': 1850, 'Chandigarh': 1720, 'Surat': 410 },
  'Jaipur': { 'Narnaul': 155, 'Delhi-NCR': 270, 'Mumbai': 1150, 'Bengaluru': 1950, 'Pune': 1220, 'Ahmedabad': 670, 'Hyderabad': 1420, 'Chennai': 2040, 'Kolkata': 1520, 'Chandigarh': 510, 'Surat': 890 },
  'Ahmedabad': { 'Narnaul': 840, 'Delhi-NCR': 940, 'Jaipur': 670, 'Mumbai': 530, 'Bengaluru': 1490, 'Pune': 660, 'Hyderabad': 1210, 'Chennai': 1840, 'Kolkata': 1980, 'Chandigarh': 1160, 'Surat': 260 },
  'Hyderabad': { 'Narnaul': 1490, 'Delhi-NCR': 1580, 'Jaipur': 1420, 'Mumbai': 710, 'Bengaluru': 570, 'Pune': 560, 'Ahmedabad': 1210, 'Chennai': 630, 'Kolkata': 1480, 'Chandigarh': 1820, 'Surat': 960 },
  'Chennai': { 'Narnaul': 2080, 'Delhi-NCR': 2200, 'Jaipur': 2040, 'Mumbai': 1330, 'Bengaluru': 345, 'Pune': 1190, 'Ahmedabad': 1840, 'Hyderabad': 630, 'Kolkata': 1660, 'Chandigarh': 2440, 'Surat': 1600 },
  'Kolkata': { 'Narnaul': 1550, 'Delhi-NCR': 1500, 'Jaipur': 1520, 'Mumbai': 1950, 'Bengaluru': 1870, 'Pune': 1850, 'Ahmedabad': 1980, 'Hyderabad': 1480, 'Chennai': 1660, 'Chandigarh': 1720, 'Surat': 2050 },
  'Chandigarh': { 'Narnaul': 320, 'Delhi-NCR': 240, 'Jaipur': 510, 'Mumbai': 1650, 'Bengaluru': 2390, 'Pune': 1720, 'Ahmedabad': 1160, 'Hyderabad': 1820, 'Chennai': 2440, 'Kolkata': 1720, 'Surat': 1420 },
  'Surat': { 'Narnaul': 1050, 'Delhi-NCR': 1180, 'Jaipur': 890, 'Mumbai': 280, 'Bengaluru': 1260, 'Pune': 410, 'Ahmedabad': 260, 'Hyderabad': 960, 'Chennai': 1600, 'Kolkata': 2050, 'Chandigarh': 1420 }
};

// Freight Calculator Logic
function calculateFreight() {
  const origin = document.getElementById('calc-origin').value;
  const destination = document.getElementById('calc-destination').value;
  const cargoType = document.getElementById('calc-cargo').value;
  const vehicle = document.getElementById('calc-vehicle').value;

  if (origin === destination) {
    alert('Origin and Destination cannot be the same city.');
    return;
  }

  // Get distance
  let distance = 650; // fallback
  if (distanceMatrix[origin] && distanceMatrix[origin][destination]) {
    distance = distanceMatrix[origin][destination];
  } else if (distanceMatrix[destination] && distanceMatrix[destination][origin]) {
    distance = distanceMatrix[destination][origin];
  }

  // Multipliers based on vehicle & cargo
  let baseRatePerKm = 52; // INR per km baseline
  let vehicleName = '20 Ft Reefer';
  let payloadCapacity = '8 - 10 Metric Tons';

  if (vehicle === '32ft-reefer') {
    baseRatePerKm = 88;
    vehicleName = '32 Ft Multi-Axle Reefer (Super-Insulated)';
    payloadCapacity = '16 - 18 Metric Tons';
  } else if (vehicle === '24ft-reefer') {
    baseRatePerKm = 68;
    vehicleName = '24 Ft Medium Reefer';
    payloadCapacity = '12 - 14 Metric Tons';
  } else if (vehicle === '20ft-reefer') {
    baseRatePerKm = 56;
    vehicleName = '20 Ft BharatBenz Reefer';
    payloadCapacity = '8 - 10 Metric Tons';
  } else if (vehicle === '14ft-reefer') {
    baseRatePerKm = 42;
    vehicleName = '14 Ft City / Regional Reefer';
    payloadCapacity = '4 - 5 Metric Tons';
  } else if (vehicle === '32ft-dry') {
    baseRatePerKm = 62;
    vehicleName = '32 Ft MXL Container (Dry FTL)';
    payloadCapacity = '15 - 18 Metric Tons';
  }

  // Cargo temperature surcharge factor
  let tempFactor = 1.0;
  let tempZoneDesc = 'Controlled Environment';
  if (cargoType === 'deep-freeze') {
    tempFactor = 1.18;
    tempZoneDesc = 'Deep Freeze (-25°C to -18°C)';
  } else if (cargoType === 'chilled') {
    tempFactor = 1.10;
    tempZoneDesc = 'Chilled (2°C to 8°C)';
  } else if (cargoType === 'pharma') {
    tempFactor = 1.15;
    tempZoneDesc = 'Pharma GDP Compliant (15°C to 25°C with Dual Data-Logger)';
  } else {
    tempFactor = 1.0;
    tempZoneDesc = 'Standard Ambient Full Truckload';
  }

  const estimatedCost = Math.round(distance * baseRatePerKm * tempFactor);
  // Average truck speed on Indian expressways + halt/fueling: 45 km/h
  const estHours = Math.round(distance / 42) + 2;
  const estDays = (estHours / 24).toFixed(1);

  // Update UI Elements
  document.getElementById('res-route').innerText = `${origin} ➔ ${destination}`;
  document.getElementById('res-distance').innerText = `${distance.toLocaleString()} km`;
  document.getElementById('res-time').innerText = `~${estHours} Hours (${estDays} Days)`;
  document.getElementById('res-vehicle').innerText = vehicleName;
  document.getElementById('res-cargo').innerText = tempZoneDesc;
  document.getElementById('res-capacity').innerText = payloadCapacity;
  document.getElementById('res-estimate').innerText = `₹${(Math.round(estimatedCost * 0.95)).toLocaleString()} - ₹${(Math.round(estimatedCost * 1.08)).toLocaleString()}`;

  // WhatsApp payload construction
  const waMessage = encodeURIComponent(
    `Hello SRB Logistic Team!\nI want to book/request a quote:\n\n` +
    `• Route: ${origin} to ${destination}\n` +
    `• Distance: ~${distance} km\n` +
    `• Cargo: ${tempZoneDesc}\n` +
    `• Vehicle: ${vehicleName} (${payloadCapacity})\n` +
    `• Estimated Transit: ~${estHours} Hours\n\n` +
    `Please confirm vehicle availability and lowest quote for this consignment.`
  );
  document.getElementById('wa-quote-btn').href = `https://wa.me/918955917201?text=${waMessage}`;

  // Show result box with animation
  const resultBox = document.getElementById('calc-results');
  resultBox.classList.remove('hidden');
  resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Consignment Tracking Simulation
function trackConsignment(event) {
  if (event) event.preventDefault();
  const inputElem = document.getElementById('tracking-input');
  const code = (inputElem.value || 'SRB-9842-DL').trim().toUpperCase();

  const trackResult = document.getElementById('tracking-result-modal');
  
  // Set dynamic details based on code
  document.getElementById('modal-tracking-id').innerText = code;
  
  if (code.includes('MH') || code.includes('MUMBAI')) {
    document.getElementById('modal-origin').innerText = 'Mumbai JNPT Port, Maharashtra';
    document.getElementById('modal-dest').innerText = 'Narnaul Cold Hub, Haryana';
    document.getElementById('modal-current-loc').innerText = 'Near Vadodara Highway (NH-48), Gujarat';
    document.getElementById('modal-temp').innerText = '-21.2°C (Optimal Deep Freeze)';
    document.getElementById('modal-temp-status').innerText = 'LOCKED & VERIFIED';
    document.getElementById('modal-temp-status').className = 'text-green-400 font-bold';
    document.getElementById('modal-eta').innerText = '14 Hours 20 Mins';
    document.getElementById('modal-driver').innerText = 'Rajesh Kumar (+91 98XXX-XX711)';
    document.getElementById('modal-truck').innerText = 'BharatBenz 32Ft Reefer (HR-35-B-4921)';
    document.getElementById('modal-progress').style.width = '64%';
  } else if (code.includes('BLR') || code.includes('BANGALORE')) {
    document.getElementById('modal-origin').innerText = 'Narnaul Logistic Center, Haryana';
    document.getElementById('modal-dest').innerText = 'Bengaluru Electronic City, Karnataka';
    document.getElementById('modal-current-loc').innerText = 'Crossing Hyderabad Outer Ring Road (NH-44)';
    document.getElementById('modal-temp').innerText = '+4.1°C (Pharma Cold Chain)';
    document.getElementById('modal-temp-status').innerText = 'GDP CERTIFIED ACTIVE';
    document.getElementById('modal-temp-status').className = 'text-cyan-400 font-bold';
    document.getElementById('modal-eta').innerText = '9 Hours 45 Mins';
    document.getElementById('modal-driver').innerText = 'Surender Yadav (+91 87XXX-XX230)';
    document.getElementById('modal-truck').innerText = 'Volvo FH Reefer Express (HR-35-C-8819)';
    document.getElementById('modal-progress').style.width = '82%';
  } else {
    // Default demo: Delhi-NCR to Mumbai
    document.getElementById('modal-origin').innerText = 'Delhi-NCR Central Hub, Kundli';
    document.getElementById('modal-dest').innerText = 'Bhiwandi Cold Logistic Park, Mumbai';
    document.getElementById('modal-current-loc').innerText = 'Passing Jaipur Bypass Expressway (NH-48)';
    document.getElementById('modal-temp').innerText = '-18.4°C (Dairy & Frozen Confectionery)';
    document.getElementById('modal-temp-status').innerText = 'ACTIVE IOT SENSORS LOCKED';
    document.getElementById('modal-temp-status').className = 'text-green-400 font-bold';
    document.getElementById('modal-eta').innerText = '18 Hours 10 Mins';
    document.getElementById('modal-driver').innerText = 'Vikram Singh (+91 94XXX-XX892)';
    document.getElementById('modal-truck').innerText = 'BharatBenz 24Ft Heavy Reefer (HR-35-A-6602)';
    document.getElementById('modal-progress').style.width = '48%';
  }

  // Open modal
  trackResult.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
}

function closeTrackingModal() {
  const modal = document.getElementById('tracking-result-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

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

// Client Filter Logic
function filterClients(category) {
  const cards = document.querySelectorAll('.client-item');
  const tabs = document.querySelectorAll('.client-filter-tab');

  tabs.forEach(tab => {
    if (tab.getAttribute('data-filter') === category) {
      tab.classList.remove('bg-white/5', 'text-slate-400', 'border-white/10');
      tab.classList.add('bg-srbOrange', 'text-white', 'border-srbOrange');
    } else {
      tab.classList.remove('bg-srbOrange', 'text-white', 'border-srbOrange');
      tab.classList.add('bg-white/5', 'text-slate-400', 'border-white/10');
    }
  });

  cards.forEach(card => {
    if (category === 'all' || card.getAttribute('data-category').includes(category)) {
      card.style.display = 'flex';
      card.style.opacity = '1';
    } else {
      card.style.display = 'none';
    }
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

  if (theme === 'light') {
    sunIcons.forEach(icon => icon.classList.add('hidden'));
    moonIcons.forEach(icon => icon.classList.remove('hidden'));
    themeLabels.forEach(label => { label.textContent = 'Dark'; });
  } else {
    sunIcons.forEach(icon => icon.classList.remove('hidden'));
    moonIcons.forEach(icon => icon.classList.add('hidden'));
    themeLabels.forEach(label => { label.textContent = 'Light'; });
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

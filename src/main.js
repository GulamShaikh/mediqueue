import './styles.css';
import { HOSPITALS, SPECIALTIES, AMBULANCE_SERVICES, generateTimeSlots, getAvailabilityStatus, getAvailabilityText } from './data.js';
import { isLoggedIn, getCurrentUser, login, signup, logout, getUserBookings, addBooking, cancelBooking } from './auth.js';

// Application state
let currentPage = 'landing';
let selectedHospital = null;
let selectedDate = null;
let selectedTimeSlot = null;
let searchQuery = '';
let selectedSpecialty = 'all';
let mobileMenuOpen = false;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  // Check if user is logged in and redirect to dashboard
  if (isLoggedIn() && window.location.hash === '') {
    navigateTo('dashboard');
  } else {
    navigateTo('landing');
  }

  // Handle browser back/forward
  window.addEventListener('hashchange', handleHashChange);
});

// Handle hash changes
function handleHashChange() {
  const hash = window.location.hash.slice(1);
  mobileMenuOpen = false; // Always close menu on hash change
  if (hash) {
    navigateTo(hash);
  }
}

// Navigation
function navigateTo(page) {
  currentPage = page;
  window.location.hash = page;
  closeMobileMenu(); // Always close menu on navigation
  render();
}

// Toggle mobile menu
function toggleMobileMenu() {
  mobileMenuOpen = !mobileMenuOpen;
  render();
}

function closeMobileMenu() {
  if (mobileMenuOpen) {
    mobileMenuOpen = false;
  }
}

// Toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Initialize dark mode from localStorage
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
}

// Main render function
function render() {
  const app = document.getElementById('app');

  if (currentPage === 'landing') {
    app.innerHTML = `
      ${renderLandingPage()}
      ${renderFooter()}
    `;
  } else {
    app.innerHTML = `
      ${renderNavbar()}
      ${renderPageContent()}
      ${renderFooter()}
    `;
  }

  attachEventListeners();
}

// Render navbar
function renderNavbar() {
  const user = getCurrentUser();

  return `
    <nav class="navbar">
      <div class="navbar-content">
        <div class="logo" onclick="window.app.navigateTo('${isLoggedIn() ? 'dashboard' : 'landing'}')" style="display: flex; align-items: center; gap: 0.5rem;">
          <img src="/logo.png" alt="MediQueue" style="width: 32px; height: 32px;" />
          <span>MediQueue</span>
        </div>
        
        <button class="mobile-menu-btn" onclick="window.app.toggleMobileMenu()">
          ${mobileMenuOpen ? '✕' : '☰'}
        </button>
        
        ${mobileMenuOpen ? '<div class="mobile-menu-overlay" onclick="window.app.closeMobileMenu(); window.app.render();"></div>' : ''}
        
        <div class="nav-links ${mobileMenuOpen ? 'active' : ''}">
          ${isLoggedIn() ? `
            <a class="nav-link ${currentPage === 'dashboard' ? 'active' : ''}" onclick="window.app.navigateTo('dashboard')">Dashboard</a>
            <a class="nav-link ${currentPage === 'appointments' ? 'active' : ''}" onclick="window.app.navigateTo('appointments')">My Appointments</a>
            <a class="nav-link ${currentPage === 'ambulance' ? 'active' : ''}" onclick="window.app.navigateTo('ambulance')">Ambulance</a>
            <button class="theme-toggle" onclick="window.app.toggleDarkMode()" title="Toggle dark mode">
              ${document.body.classList.contains('dark-mode') ? '☀️' : '🌙'}
            </button>
            <div style="padding: 0 1rem; color: var(--text-secondary); display: flex; align-items: center; gap: 0.5rem;">
              <span style="width: 32px; height: 32px; background: var(--primary-gradient); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">${user.name.charAt(0).toUpperCase()}</span>
              <span>${user.name}</span>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="window.app.handleLogout()">Logout</button>
          ` : `
            <button class="theme-toggle" onclick="window.app.toggleDarkMode()" title="Toggle dark mode">
              ${document.body.classList.contains('dark-mode') ? '☀️' : '🌙'}
            </button>
            <button class="btn btn-primary btn-sm" onclick="window.app.showAuthModal('login')">Login</button>
            <button class="btn btn-outline btn-sm" onclick="window.app.showAuthModal('signup')">Sign Up</button>
          `}
        </div>
      </div>
    </nav>
  `;
}

// Render page content
function renderPageContent() {
  switch (currentPage) {
    case 'dashboard':
      return renderDashboard();
    case 'appointments':
      return renderAppointments();
    case 'ambulance':
      return renderAmbulance();
    case 'booking':
      return renderBooking();
    default:
      return renderDashboard();
  }
}

// Render landing page
function renderLandingPage() {
  return `
    <div class="hero">
      <div class="hero-content container">
        <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 1rem;">
          <img src="/logo.png" alt="MediQueue Logo" style="width: 60px; height: 60px;" />
          <h1 style="margin: 0;">MediQueue</h1>
        </div>
        <p>Smart Hospital Queue Management</p>
        <p style="font-size: 1rem; margin-bottom: 2rem;">
          Book appointments at nearby hospitals, check real-time availability, and access emergency services - all in one place.
        </p>
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-accent btn-lg" onclick="window.app.showAuthModal('signup')">Get Started</button>
          <button class="btn btn-outline btn-lg" onclick="window.app.showAuthModal('login')" style="border-color: white; color: white;">Login</button>
        </div>
        <div style="margin-top: 2rem; font-size: 0.9rem; opacity: 0.9;">
          Demo: demo@mediqueue.com / demo123
        </div>
      </div>
    </div>
    
    <div class="section">
      <div class="container">
        <h2 class="text-center mb-4">Why Choose MediQueue?</h2>
        <div class="grid grid-3">
          <div class="card feature-card">
            <div class="feature-icon"><img src="/icon-quick.png" alt="Quick Booking" /></div>
            <h3>Quick Booking</h3>
            <p class="text-secondary">Book appointments in seconds. No more waiting in long queues.</p>
          </div>
          <div class="card feature-card">
            <div class="feature-icon"><img src="/icon-nearby.png" alt="Nearby Hospitals" /></div>
            <h3>Nearby Hospitals</h3>
            <p class="text-secondary">Find hospitals and clinics near you with real-time availability.</p>
          </div>
          <div class="card feature-card">
            <div class="feature-icon"><img src="/icon-emergency.png" alt="Emergency Services" /></div>
            <h3>Emergency Services</h3>
            <p class="text-secondary">Quick access to ambulance services when you need them most.</p>
          </div>
          <div class="card feature-card">
            <div class="feature-icon"><img src="/icon-mobile.png" alt="Mobile Friendly" /></div>
            <h3>Mobile Friendly</h3>
            <p class="text-secondary">Access from anywhere, anytime on your mobile device.</p>
          </div>
          <div class="card feature-card">
            <div class="feature-icon"><img src="/icon-notifications.png" alt="Smart Notifications" /></div>
            <h3>Smart Notifications</h3>
            <p class="text-secondary">Get reminders for your upcoming appointments.</p>
          </div>
          <div class="card feature-card">
            <div class="feature-icon"><img src="/icon-verified.png" alt="Verified Hospitals" /></div>
            <h3>Verified Hospitals</h3>
            <p class="text-secondary">All hospitals are verified and rated by patients.</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="section" style="background: var(--bg-primary);">
      <div class="container text-center">
        <h2 class="mb-3">Ready to Save Time?</h2>
        <p class="text-secondary mb-4">Join thousands of patients managing their healthcare efficiently</p>
        <button class="btn btn-primary btn-lg" onclick="window.app.showAuthModal('signup')">Start Booking Now</button>
      </div>
    </div>
  `;
}

// Render dashboard
function renderDashboard() {
  if (!isLoggedIn()) {
    navigateTo('landing');
    return '';
  }

  const filteredHospitals = HOSPITALS.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || hospital.specialties.includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  return `
    <div class="section">
      <div class="container">
        <h1 class="mb-3">Find Hospitals & Clinics</h1>
        <p class="text-secondary mb-4">Search and book appointments at nearby healthcare facilities in Mumbai</p>
        
        <div class="search-bar">
          <input 
            type="text" 
            class="input-field search-input" 
            placeholder="Search hospitals by name or location..."
            value="${searchQuery}"
            oninput="window.app.handleSearch(this.value)"
          />
          <select class="select-field" onchange="window.app.handleSpecialtyFilter(this.value)" style="min-width: 200px;">
            <option value="all">All Specialties</option>
            ${SPECIALTIES.map(s => `<option value="${s}" ${selectedSpecialty === s ? 'selected' : ''}>${s}</option>`).join('')}
          </select>
        </div>
        
        ${filteredHospitals.length === 0 ? `
          <div class="empty-state">
            <div class="empty-state-icon">🏥</div>
            <h3>No hospitals found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ` : `
          <div class="grid grid-2">
            ${filteredHospitals.map(hospital => renderHospitalCard(hospital)).join('')}
          </div>
        `}
      </div>
    </div>
  `;
}

// Render hospital card
function renderHospitalCard(hospital) {
  const availabilityStatus = getAvailabilityStatus(hospital.availableSlots);
  const availabilityText = getAvailabilityText(hospital.availableSlots);

  return `
    <div class="card hospital-card" onclick="window.app.selectHospital(${hospital.id})">
      <div class="hospital-image" style="width: 100%; height: 180px; border-radius: var(--radius-lg); overflow: hidden; margin-bottom: var(--spacing-md);">
        <img src="${hospital.image}" alt="${hospital.name}" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
      <div class="hospital-header">
        <div>
          <div class="hospital-name">${hospital.name}</div>
          <div class="hospital-address">📍 ${hospital.address}</div>
          <div class="text-muted" style="font-size: 0.875rem; margin-top: 0.25rem;">
            ⭐ ${hospital.rating} • ${hospital.distance}
          </div>
        </div>
      </div>
      
      <div class="specialties">
        ${hospital.specialties.map(s => `<span class="badge badge-primary">${s}</span>`).join('')}
      </div>
      
      <div class="availability-indicator">
        <span class="availability-dot ${availabilityStatus}"></span>
        <span class="text-secondary">${availabilityText}</span>
      </div>
      
      <button class="btn btn-primary" style="width: 100%; margin-top: 1rem;" onclick="event.stopPropagation(); window.app.selectHospital(${hospital.id})">
        Book Appointment
      </button>
    </div>
  `;
}

// Render booking page
function renderBooking() {
  if (!selectedHospital) {
    navigateTo('dashboard');
    return '';
  }

  const hospital = HOSPITALS.find(h => h.id === selectedHospital);
  const timeSlots = generateTimeSlots();

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return `
    <div class="section">
      <div class="container" style="max-width: 800px;">
        <button class="btn btn-secondary mb-3" onclick="window.app.navigateTo('dashboard')">
          ← Back to Hospitals
        </button>
        
        <div class="card">
          <h2 class="mb-3">${hospital.name}</h2>
          <p class="text-secondary mb-4">📍 ${hospital.address}</p>
          
          <div class="specialties mb-4">
            ${hospital.specialties.map(s => `<span class="badge badge-primary">${s}</span>`).join('')}
          </div>
          
          <div class="form-group">
            <label class="form-label">Select Date</label>
            <input 
              type="date" 
              class="input-field" 
              min="${today}"
              max="${maxDateStr}"
              value="${selectedDate || today}"
              onchange="window.app.handleDateSelect(this.value)"
            />
          </div>
          
          <div class="form-group">
            <label class="form-label">Select Time Slot</label>
            <div class="time-slots-grid">
              ${timeSlots.map(slot => `
                <div 
                  class="time-slot ${slot.isBooked ? 'disabled' : ''} ${selectedTimeSlot === slot.time ? 'selected' : ''}"
                  onclick="${slot.isBooked ? '' : `window.app.handleTimeSlotSelect('${slot.time}', '${slot.displayTime}')`}"
                >
                  ${slot.displayTime}
                  ${slot.isBooked ? '<div style="font-size: 0.7rem; color: var(--error);">Booked</div>' : ''}
                </div>
              `).join('')}
            </div>
          </div>
          
          ${selectedTimeSlot ? `
            <div class="card-glass" style="padding: 1rem; margin-top: 1.5rem;">
              <h4 class="mb-2">Booking Summary</h4>
              <p><strong>Hospital:</strong> ${hospital.name}</p>
              <p><strong>Date:</strong> ${new Date(selectedDate || today).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p><strong>Time:</strong> ${timeSlots.find(s => s.time === selectedTimeSlot)?.displayTime}</p>
            </div>
            
            <button class="btn btn-primary btn-lg" style="width: 100%; margin-top: 1.5rem;" onclick="window.app.confirmBooking()">
              Confirm Booking
            </button>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

// Render appointments page
function renderAppointments() {
  if (!isLoggedIn()) {
    navigateTo('landing');
    return '';
  }

  const bookings = getUserBookings();
  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
  const pastBookings = bookings.filter(b => b.status !== 'upcoming');

  return `
    <div class="section">
      <div class="container">
        <h1 class="mb-4">My Appointments</h1>
        
        ${bookings.length === 0 ? `
          <div class="empty-state">
            <div class="empty-state-icon">📅</div>
            <h3>No appointments yet</h3>
            <p>Book your first appointment to get started</p>
            <button class="btn btn-primary mt-3" onclick="window.app.navigateTo('dashboard')">
              Find Hospitals
            </button>
          </div>
        ` : `
          <div class="tabs">
            <button class="tab active">Upcoming (${upcomingBookings.length})</button>
            <button class="tab">Past (${pastBookings.length})</button>
          </div>
          
          <div class="grid grid-2">
            ${upcomingBookings.map(booking => renderBookingCard(booking)).join('')}
          </div>
        `}
      </div>
    </div>
  `;
}

// Render booking card
function renderBookingCard(booking) {
  const hospital = HOSPITALS.find(h => h.id === booking.hospitalId);

  return `
    <div class="card">
      <div class="flex-between mb-3">
        <h3>${hospital.name}</h3>
        <span class="badge badge-${booking.status === 'upcoming' ? 'success' : booking.status === 'cancelled' ? 'error' : 'warning'}">
          ${booking.status}
        </span>
      </div>
      
      <p class="text-secondary mb-2">📍 ${hospital.address}</p>
      <p class="mb-2"><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <p class="mb-3"><strong>Time:</strong> ${booking.timeDisplay}</p>
      
      ${booking.status === 'upcoming' ? `
        <button class="btn btn-accent btn-sm" onclick="window.app.handleCancelBooking(${booking.id})">
          Cancel Appointment
        </button>
      ` : ''}
    </div>
  `;
}

// Render ambulance page
function renderAmbulance() {
  if (!isLoggedIn()) {
    navigateTo('landing');
    return '';
  }

  return `
    <div class="section">
      <div class="container">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
          <img src="/ambulance.png" alt="Ambulance" style="width: 48px; height: 48px;" />
          <h1 style="margin: 0;">Emergency Ambulance Services</h1>
        </div>
        <p class="text-secondary mb-4">Quick access to ambulance services in Mumbai</p>
        
        <div class="card-glass" style="padding: 1.5rem; margin-bottom: 2rem; background: rgba(239, 68, 68, 0.1); border-color: var(--error);">
          <h3 style="color: var(--error); margin-bottom: 0.5rem;">⚠️ Emergency Helpline</h3>
          <p style="font-size: 2rem; font-weight: bold; color: var(--error); margin: 0;">102 / 108</p>
          <p class="text-secondary" style="margin-top: 0.5rem;">National Emergency Ambulance Number</p>
        </div>
        
        <div class="grid grid-2">
          ${AMBULANCE_SERVICES.map(service => `
            <div class="card">
              <div class="flex-between mb-3">
                <h3>${service.name}</h3>
                <span class="badge badge-${service.type === 'Government' ? 'success' : service.type === 'Private' ? 'primary' : 'warning'}">
                  ${service.type}
                </span>
              </div>
              
              <p class="mb-2"><strong>📞 Phone:</strong> <a href="tel:${service.phone}" style="color: var(--primary-dark); font-weight: 600;">${service.phone}</a></p>
              <p class="mb-2"><strong>⏱️ Response Time:</strong> ${service.responseTime}</p>
              <p class="mb-3"><strong>🕐 Availability:</strong> ${service.available24x7 ? '24x7 Available' : 'Limited Hours'}</p>
              
              <a href="tel:${service.phone}" class="btn btn-accent" style="width: 100%; text-decoration: none;">
                📞 Call Now
              </a>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// Event handlers
function handleSearch(query) {
  searchQuery = query;
  render();
}

function handleSpecialtyFilter(specialty) {
  selectedSpecialty = specialty;
  render();
}

function selectHospital(hospitalId) {
  selectedHospital = hospitalId;
  selectedDate = new Date().toISOString().split('T')[0];
  selectedTimeSlot = null;
  navigateTo('booking');
}

function handleDateSelect(date) {
  selectedDate = date;
  selectedTimeSlot = null;
  render();
}

function handleTimeSlotSelect(time, displayTime) {
  selectedTimeSlot = time;
  render();
}

function confirmBooking() {
  const booking = addBooking({
    hospitalId: selectedHospital,
    date: selectedDate,
    time: selectedTimeSlot,
    timeDisplay: generateTimeSlots().find(s => s.time === selectedTimeSlot)?.displayTime
  });

  showModal('Success!', `Your appointment has been booked successfully for ${new Date(selectedDate).toLocaleDateString('en-IN')} at ${booking.timeDisplay}.`, () => {
    navigateTo('appointments');
  });
}

function handleCancelBooking(bookingId) {
  showModal('Cancel Appointment', 'Are you sure you want to cancel this appointment?', () => {
    cancelBooking(bookingId);
    render();
  }, true);
}

function handleLogout() {
  logout();
  navigateTo('landing');
}

// Show auth modal
function showAuthModal(mode = 'login') {
  const modalHtml = `
    <div class="modal-overlay" onclick="window.app.closeModal(event)">
      <div class="modal-content" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h2>${mode === 'login' ? 'Login' : 'Sign Up'}</h2>
          <button class="modal-close" onclick="window.app.closeModal()">✕</button>
        </div>
        
        <div class="tabs mb-3">
          <button class="tab ${mode === 'login' ? 'active' : ''}" onclick="window.app.showAuthModal('login')">Login</button>
          <button class="tab ${mode === 'signup' ? 'active' : ''}" onclick="window.app.showAuthModal('signup')">Sign Up</button>
        </div>
        
        <form onsubmit="window.app.handleAuth(event, '${mode}')">
          ${mode === 'signup' ? `
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" name="name" class="input-field" required />
            </div>
          ` : ''}
          
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" name="email" class="input-field" value="${mode === 'login' ? 'demo@mediqueue.com' : ''}" required />
          </div>
          
          ${mode === 'signup' ? `
            <div class="form-group">
              <label class="form-label">Phone</label>
              <input type="tel" name="phone" class="input-field" placeholder="+91-XXXXXXXXXX" required />
            </div>
          ` : ''}
          
          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" name="password" class="input-field" value="${mode === 'login' ? 'demo123' : ''}" required />
          </div>
          
          ${mode === 'login' ? `
            <div class="card-glass" style="padding: 0.75rem; margin-bottom: 1rem; font-size: 0.875rem;">
              💡 <strong>Demo Account:</strong><br/>
              Email: demo@mediqueue.com<br/>
              Password: demo123
            </div>
          ` : ''}
          
          <button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">
            ${mode === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  `;

  const modalDiv = document.createElement('div');
  modalDiv.innerHTML = modalHtml;
  document.body.appendChild(modalDiv);
}

// Close modal
function closeModal(event) {
  if (event && event.target.classList.contains('modal-overlay') === false) return;
  const modal = document.querySelector('.modal-overlay');
  if (modal) modal.remove();
}

// Handle auth
function handleAuth(event, mode) {
  event.preventDefault();
  const formData = new FormData(event.target);

  let result;
  if (mode === 'login') {
    result = login(formData.get('email'), formData.get('password'));
  } else {
    result = signup(
      formData.get('name'),
      formData.get('email'),
      formData.get('phone'),
      formData.get('password')
    );
  }

  if (result.success) {
    closeModal();
    navigateTo('dashboard');
  } else {
    alert(result.error);
  }
}

// Show generic modal
function showModal(title, message, onConfirm, showCancel = false) {
  const modalHtml = `
    <div class="modal-overlay" onclick="window.app.closeModal(event)">
      <div class="modal-content" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h2>${title}</h2>
          <button class="modal-close" onclick="window.app.closeModal()">✕</button>
        </div>
        <p>${message}</p>
        <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
          ${showCancel ? `<button class="btn btn-secondary" style="flex: 1;" onclick="window.app.closeModal()">Cancel</button>` : ''}
          <button class="btn btn-primary" style="flex: 1;" onclick="window.app.handleModalConfirm()">
            ${showCancel ? 'Confirm' : 'OK'}
          </button>
        </div>
      </div>
    </div>
  `;

  window.modalConfirmCallback = onConfirm;
  const modalDiv = document.createElement('div');
  modalDiv.innerHTML = modalHtml;
  document.body.appendChild(modalDiv);
}

function handleModalConfirm() {
  if (window.modalConfirmCallback) {
    window.modalConfirmCallback();
  }
  closeModal();
}

// Attach event listeners
function attachEventListeners() {
  // Event listeners are handled via onclick attributes in the HTML
}

// Expose functions to window for onclick handlers
window.app = {
  navigateTo,
  toggleMobileMenu,
  toggleDarkMode,
  handleSearch,
  handleSpecialtyFilter,
  selectHospital,
  handleDateSelect,
  handleTimeSlotSelect,
  confirmBooking,
  handleCancelBooking,
  handleLogout,
  showAuthModal,
  closeModal,
  handleAuth,
  handleModalConfirm,
  closeMobileMenu
};


// Render Footer
function renderFooter() {
  const currentYear = new Date().getFullYear();
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <div class="footer-logo">
              <img src="/logo.png" alt="MediQueue" style="width: 32px; height: 32px;" />
              <span>MediQueue</span>
            </div>
            <p class="footer-description">Smart hospital queue management system for booking appointments and managing healthcare visits in Mumbai.</p>
          </div>
          
          <div class="footer-section">
            <h4>Quick Links</h4>
            <ul class="footer-links">
              <li><a onclick="window.app.navigateTo('${isLoggedIn() ? 'dashboard' : 'landing'}')">Home</a></li>
              ${isLoggedIn() ? `
                <li><a onclick="window.app.navigateTo('dashboard')">Find Hospitals</a></li>
                <li><a onclick="window.app.navigateTo('appointments')">My Appointments</a></li>
                <li><a onclick="window.app.navigateTo('ambulance')">Emergency Services</a></li>
              ` : `
                <li><a onclick="window.app.showAuthModal('login')">Login</a></li>
                <li><a onclick="window.app.showAuthModal('signup')">Sign Up</a></li>
              `}
            </ul>
          </div>
          
          <div class="footer-section">
            <h4>Contact</h4>
            <ul class="footer-links">
              <li>📧 support@mediqueue.com</li>
              <li>📞 +91-22-12345678</li>
              <li>📍 Mumbai, Maharashtra</li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4>Emergency</h4>
            <ul class="footer-links">
              <li>🚑 Ambulance: 102</li>
              <li>🏥 Emergency: 108</li>
              <li>⚕️ Medical Helpline: 104</li>
            </ul>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; ${currentYear} MediQueue by GD. All rights reserved.</p>
          <p>Made with ❤️ for better healthcare access</p>
        </div>
      </div>
    </footer>
  `;
}

// Initial render
render();

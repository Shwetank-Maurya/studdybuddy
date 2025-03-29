// UI initialization and shared functionality
import { icons } from './icons.js';

// Navigation items
const navItems = [
  { icon: 'layoutDashboard', label: 'Dashboard', path: '/dashboard' },
  { icon: 'fileText', label: 'Notes', path: '/notes' },
  { icon: 'listTodo', label: 'Tasks', path: '/tasks' },
  { icon: 'brainCircuit', label: 'Quiz Generator', path: '/quiz' },
  { icon: 'bookOpen', label: 'Study Resources', path: '/resources' },
  { icon: 'users', label: 'Friend Circle', path: '/friends' },
  { icon: 'folder', label: 'My Library', path: '/library' },
  { icon: 'helpCircle', label: 'Help & Support', path: '/help' },
  { icon: 'settings', label: 'Settings', path: '/settings' }
];

// Initialize the basic UI structure
export function initializeUI() {
  const root = document.getElementById('root');
  
  // Create app structure
  root.innerHTML = `
    <div class="app-container">
      <nav class="navbar">
        <h1 class="navbar-logo">StudentSparkle</h1>
        
        <div class="navbar-search">
          <span class="navbar-search-icon">${icons.search}</span>
          <input type="text" placeholder="Search for notes, quizzes, resources..." />
        </div>
        
        <div class="navbar-actions">
          <button class="icon-button">${icons.bell}</button>
          <button class="icon-button">${icons.moon}</button>
          <button class="icon-button">${icons.user}</button>
        </div>
      </nav>
      
      <aside class="sidebar">
        <div class="sidebar-nav">
          ${navItems.slice(0, 7).map(item => `
            <a href="${item.path}" class="sidebar-nav-item" data-path="${item.path}">
              ${icons[item.icon]}
              ${item.label}
            </a>
          `).join('')}
        </div>
        
        <div class="sidebar-footer">
          ${navItems.slice(7).map(item => `
            <a href="${item.path}" class="sidebar-nav-item" data-path="${item.path}">
              ${icons[item.icon]}
              ${item.label}
            </a>
          `).join('')}
        </div>
      </aside>
      
      <button class="sidebar-toggle" id="sidebar-toggle">
        ${icons.menu}
      </button>
      
      <main class="main-content">
        <div class="content-wrapper" id="content">
          <!-- Page content will be loaded here -->
        </div>
      </main>
    </div>
  `;
  
  // Set up sidebar toggle for mobile
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
  
  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('open') && 
        !sidebar.contains(e.target) && 
        e.target !== sidebarToggle) {
      sidebar.classList.remove('open');
    }
  });
  
  // Update active navigation item
  updateActiveNav();
}

// Update the active navigation item based on current path
export function updateActiveNav() {
  const currentPath = window.location.pathname;
  
  // Remove active class from all items
  document.querySelectorAll('.sidebar-nav-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // Add active class to current item
  let activeItem;
  
  if (currentPath === '/') {
    activeItem = document.querySelector(`.sidebar-nav-item[data-path="/dashboard"]`);
  } else {
    activeItem = document.querySelector(`.sidebar-nav-item[data-path="${currentPath}"]`);
  }
  
  if (activeItem) {
    activeItem.classList.add('active');
  }
}

// Utility function to create a card with title and icon
export function createCard(title, icon, content, className = '') {
  return `
    <div class="card ${className}">
      ${title ? `
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-title-icon">${icons[icon]}</span>
            ${title}
          </h2>
        </div>
      ` : ''}
      <div class="card-content">
        ${content}
      </div>
    </div>
  `;
}

// Utility to format dates
export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// Tab component
export function createTabs(tabsId, tabItems, defaultTab) {
  const tabsHTML = `
    <div class="tabs" id="${tabsId}">
      <div class="tab-list">
        ${tabItems.map(tab => `
          <div class="tab ${tab.id === defaultTab ? 'active' : ''}" data-tab="${tab.id}">
            ${tab.label}
          </div>
        `).join('')}
      </div>
      ${tabItems.map(tab => `
        <div class="tab-content ${tab.id === defaultTab ? 'active' : ''}" data-tab-content="${tab.id}">
          ${tab.content}
        </div>
      `).join('')}
    </div>
  `;
  
  // Set up tab switching after rendering
  setTimeout(() => {
    const tabsContainer = document.getElementById(tabsId);
    if (tabsContainer) {
      const tabs = tabsContainer.querySelectorAll('.tab');
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          // Deactivate all tabs
          tabs.forEach(t => t.classList.remove('active'));
          tabsContainer.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
          });
          
          // Activate selected tab
          tab.classList.add('active');
          const tabContent = tabsContainer.querySelector(`.tab-content[data-tab-content="${tab.dataset.tab}"]`);
          if (tabContent) {
            tabContent.classList.add('active');
          }
        });
      });
    }
  }, 0);
  
  return tabsHTML;
}
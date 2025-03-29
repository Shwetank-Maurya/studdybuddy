import { router } from './router.js';
import { initializeUI } from './ui.js';
import { loadDashboard } from './pages/dashboard.js';
import { loadNotes } from './pages/notes.js';
import { loadTasks } from './pages/tasks.js';
import { loadQuizGenerator } from './pages/quiz.js';
import { loadResources } from './pages/resources.js';
import { loadFriends } from './pages/friends.js';
import { loadHome } from './pages/home.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Set up the basic UI structure
  initializeUI();
  
  // Set up routes
  router.addRoute('/', loadHome);
  router.addRoute('/dashboard', loadDashboard);
  router.addRoute('/notes', loadNotes);
  router.addRoute('/tasks', loadTasks);
  router.addRoute('/quiz', loadQuizGenerator);
  router.addRoute('/resources', loadResources);
  router.addRoute('/friends', loadFriends);
  
  // Start the router
  router.navigate(window.location.pathname);
  
  // Handle navigation
  document.addEventListener('click', (e) => {
    // Find closest anchor tag
    const anchor = e.target.closest('a');
    if (anchor && anchor.href) {
      // Check if it's an internal link
      const url = new URL(anchor.href);
      if (url.origin === window.location.origin) {
        e.preventDefault();
        router.navigate(url.pathname);
      }
    }
  });
});

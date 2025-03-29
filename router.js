// Simple client-side router
export const router = {
    routes: {},
    
    // Add a route with its handler
    addRoute(path, handler) {
      this.routes[path] = handler;
    },
    
    // Navigate to a specific path
    navigate(path) {
      let matchedRoute = this.routes[path];
      
      // If route not found, use 404 handler or default to home
      if (!matchedRoute) {
        console.error('404 Error: User attempted to access non-existent route:', path);
        path = '/';
        matchedRoute = this.routes[path];
      }
      
      // Update browser history
      window.history.pushState(null, '', path);
      
      // Execute the route handler
      matchedRoute();
    }
  };
  
  // Handle browser back/forward navigation
  window.addEventListener('popstate', () => {
    router.navigate(window.location.pathname);
  });
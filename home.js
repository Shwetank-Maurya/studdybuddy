// Home page
import { icons } from '../icons.js';
import { updateActiveNav } from '../ui.js';

// Features for the landing page
const features = [
  {
    title: "Dashboard",
    description: "View your academic progress, upcoming tasks, and recent notes at a glance.",
    icon: "layoutDashboard",
    path: "/dashboard"
  },
  {
    title: "Notes",
    description: "Create, organize, and access your study notes in one place with rich formatting.",
    icon: "fileText",
    path: "/notes"
  },
  {
    title: "Tasks",
    description: "Track assignments, project deadlines, and study goals with task management.",
    icon: "listTodo",
    path: "/tasks"
  },
  {
    title: "Quiz Generator",
    description: "Create customized quizzes to test your knowledge on any subject.",
    icon: "brainCircuit",
    path: "/quiz"
  },
  {
    title: "Study Resources",
    description: "Access a collection of study materials, references, and educational content.",
    icon: "bookOpen",
    path: "/resources"
  },
  {
    title: "Friend Circle",
    description: "Connect with classmates, join study groups, and collaborate on projects.",
    icon: "users",
    path: "/friends"
  }
];

export function loadHome() {
  const content = document.getElementById('content');
  
  content.innerHTML = `
    <div class="min-h-screen bg-gray-50">
      <!-- Hero Section -->
      <section class="hero-section">
        <h1 class="hero-title">
          Your Study Journey <span class="text-student-primary">Made Simple</span>
        </h1>
        <p class="hero-subtitle">
          The all-in-one platform to organize your studies, track progress, create quizzes, and connect with friends.
        </p>
        <div class="hero-actions">
          <a href="/dashboard" class="btn btn-primary">
            Get Started
          </a>
          <a href="/resources" class="btn btn-outline">
            Explore Resources
          </a>
        </div>
        
        <div class="welcome-card fade-in">
          <h2>Good ${getGreeting()}, Student!</h2>
          <p>Here's an overview of your academic progress and upcoming tasks</p>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-section">
        <h2 class="section-title">
          Everything You Need to Excel
        </h2>
        
        <div class="grid grid-cols-1 grid-cols-2-md grid-cols-3-lg gap-4">
          ${features.map(feature => `
            <a href="${feature.path}" class="card feature-card">
              <div class="feature-icon-wrapper">
                ${icons[feature.icon]}
              </div>
              <h3 class="feature-title">${feature.title}</h3>
              <p class="feature-description">${feature.description}</p>
            </a>
          `).join('')}
        </div>
      </section>

      <!-- Testimonial Section -->
      <section class="testimonial-section">
        <h2 class="section-title">
          What Students Say
        </h2>
        
        <div class="grid grid-cols-1 grid-cols-3-md gap-4">
          <div class="card">
            <div class="card-content">
              <p class="text-gray-600 mb-4">
                "This platform transformed how I study. The quiz generator helped me ace my midterms!"
              </p>
              <p class="font-medium">- Alex Chen, Engineering Student</p>
            </div>
          </div>
          
          <div class="card">
            <div class="card-content">
              <p class="text-gray-600 mb-4">
                "The note organization system is incredible. I can finally find all my class notes in one place."
              </p>
              <p class="font-medium">- Sophia Williams, Medical Student</p>
            </div>
          </div>
          
          <div class="card">
            <div class="card-content">
              <p class="text-gray-600 mb-4">
                "The friend circle feature made group projects so much easier to coordinate."
              </p>
              <p class="font-medium">- Marcus Johnson, Business Major</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">
          Ready to Transform Your Study Experience?
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Join thousands of students who've improved their academic performance with our platform.
        </p>
        <a href="/dashboard" class="btn btn-primary">
          Get Started Now
        </a>
      </section>
    </div>
  `;
  
  updateActiveNav();
}

// Helper to get time-based greeting
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  return 'evening';
}

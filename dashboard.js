import { icons } from '../icons.js';
import { createCard, updateActiveNav, formatDate } from '../ui.js';

// Sample data for the dashboard
const tasks = [
  {
    id: '1',
    title: 'Complete Math Assignment',
    dueDate: '2023-05-20',
    completed: false,
    subject: 'Mathematics'
  },
  {
    id: '2',
    title: 'Study for Physics Quiz',
    dueDate: '2023-05-22',
    completed: false,
    subject: 'Physics'
  },
  {
    id: '3',
    title: 'Research Paper Outline',
    dueDate: '2023-05-25',
    completed: false,
    subject: 'History'
  },
];

const notes = [
  {
    id: '1',
    title: 'Calculus - Integration Techniques',
    subject: 'Mathematics',
    lastUpdated: '2023-05-18'
  },
  {
    id: '2',
    title: 'Newton\'s Laws of Motion',
    subject: 'Physics',
    lastUpdated: '2023-05-17'
  },
  {
    id: '3',
    title: 'The French Revolution',
    subject: 'History',
    lastUpdated: '2023-05-15'
  },
];

export function loadDashboard() {
  const content = document.getElementById('content');
  
  const hour = new Date().getHours();
  let greeting = 'Good evening';
  
  if (hour < 12) {
    greeting = 'Good morning';
  } else if (hour < 18) {
    greeting = 'Good afternoon';
  }
  
  content.innerHTML = `
    <div class="fade-in">
      <!-- Welcome Card -->
      <div class="welcome-card mb-6">
        <h2>${greeting}, Student!</h2>
        <p>Here's an overview of your academic progress and upcoming tasks</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 grid-cols-2-md grid-cols-4-lg gap-4 mb-6">
        ${createStatCard('Study Hours', '24', 'bookOpen', 'This week')}
        ${createStatCard('Tasks Completed', '12/15', 'calendar', '85% completion rate')}
        ${createStatCard('Current GPA', '3.8', 'award', 'Top 10% of class')}
        ${createStatCard('Quiz Score Avg', '92%', 'brainCircuit', 'Last 5 quizzes')}
      </div>

      <!-- Tasks and Notes Cards -->
      <div class="grid grid-cols-1 grid-cols-2-lg gap-6 mb-6">
        ${createTaskCard(tasks)}
        ${createNotesCard(notes)}
      </div>
      
      <!-- Quiz CTA Card -->
      <div class="card bg-student-accent">
        <div class="card-content p-4">
          <div class="flex flex-col md:flex-row items-center justify-between">
            <div class="text-center md:text-left mb-4 md:mb-0">
              <h3 class="text-xl font-bold text-gray-800">Ready to test your knowledge?</h3>
              <p class="text-gray-600">Create a custom quiz on any subject to practice and improve.</p>
            </div>
            <a href="/quiz" class="btn btn-primary">
              Generate Quiz
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
  
  updateActiveNav();
  
  // Add event listeners for task completion
  document.querySelectorAll('.task-checkbox').forEach(checkbox => {
    checkbox.addEventListener('click', function() {
      // Toggle completed state
      this.classList.toggle('completed');
      const taskItem = this.closest('.task-item');
      if (taskItem) {
        taskItem.querySelector('.task-title').classList.toggle('completed');
        taskItem.querySelector('.task-description').classList.toggle('completed');
      }
    });
  });
}

// Helper function to create stat cards
function createStatCard(title, value, icon, description) {
  return `
    <div class="card stat-card">
      <div class="stat-card-header">
        <div>
          <p class="stat-card-title">${title}</p>
          <h3 class="stat-card-value">${value}</h3>
        </div>
        <div class="stat-card-icon">
          ${icons[icon]}
        </div>
      </div>
      ${description ? `<p class="stat-card-description">${description}</p>` : ''}
    </div>
  `;
}

// Helper function to create the tasks card
function createTaskCard(tasks) {
  const taskItems = tasks.map(task => `
    <div class="item-card">
      <div class="item-icon">
        ${icons.listTodo}
      </div>
      <div class="item-content">
        <p class="item-title">${task.title}</p>
        <p class="item-subtitle">${task.subject} • Due ${formatDate(task.dueDate)}</p>
      </div>
      <button class="item-action task-checkbox">
        ${icons.checkCircle2}
      </button>
    </div>
  `).join('');

  return createCard('Upcoming Tasks', 'clock', `
    <div class="item-list">
      ${tasks.length > 0 
        ? taskItems 
        : '<p class="text-center py-3 text-gray-500">No upcoming tasks</p>'
      }
    </div>
    <a href="/tasks" class="btn btn-link w-full mt-2">View All Tasks</a>
  `);
}

// Helper function to create the notes card
function createNotesCard(notes) {
  const noteItems = notes.map(note => `
    <div class="item-card">
      <div class="item-icon">
        ${icons.fileText}
      </div>
      <div class="item-content">
        <p class="item-title">${note.title}</p>
        <p class="item-subtitle">${note.subject} • Updated ${formatDate(note.lastUpdated)}</p>
      </div>
      <button class="item-action">
        ${icons.folderOpen}
      </button>
    </div>
  `).join('');

  return createCard('Recent Notes', 'fileText', `
    <div class="item-list">
      ${notes.length > 0 
        ? noteItems 
        : '<p class="text-center py-3 text-gray-500">No recent notes</p>'
      }
    </div>
    <a href="/notes" class="btn btn-link w-full mt-2">View All Notes</a>
  `);
}

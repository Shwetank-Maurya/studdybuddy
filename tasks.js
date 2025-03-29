// Tasks page
import { icons } from '../icons.js';
import { updateActiveNav, createTabs, formatDate } from '../ui.js';

// Sample data for tasks
const tasks = [
  {
    id: '1',
    title: 'Complete Math Assignment',
    description: 'Pages 45-48, problems 1-15, show all work',
    dueDate: '2023-05-20',
    subject: 'Mathematics',
    priority: 'high',
    completed: false
  },
  {
    id: '2',
    title: 'Study for Physics Quiz',
    description: 'Focus on chapters 5-7, kinematics and forces',
    dueDate: '2023-05-22',
    subject: 'Physics',
    priority: 'high',
    completed: false
  },
  {
    id: '3',
    title: 'Research Paper Outline',
    description: 'Create detailed outline for the French Revolution paper',
    dueDate: '2023-05-25',
    subject: 'History',
    priority: 'medium',
    completed: false
  },
  {
    id: '4',
    title: 'Read Hamlet Act III',
    description: 'Read and annotate, prepare discussion questions',
    dueDate: '2023-05-21',
    subject: 'Literature',
    priority: 'medium',
    completed: false
  },
  {
    id: '5',
    title: 'Biology Lab Report',
    description: 'Complete analysis and conclusion sections',
    dueDate: '2023-05-19',
    subject: 'Biology',
    priority: 'high',
    completed: false
  },
  {
    id: '6',
    title: 'Chemistry Practice Problems',
    description: 'Complete practice set on stoichiometry',
    dueDate: '2023-05-23',
    subject: 'Chemistry',
    priority: 'low',
    completed: false
  }
];

export function loadTasks() {
  const content = document.getElementById('content');
  
  content.innerHTML = `
    <div class="fade-in">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Tasks & Assignments</h1>
        <button class="btn btn-primary">
          ${icons.plus}
          <span class="ml-2">New Task</span>
        </button>
      </div>

      ${createTabs('tasks-tabs', [
        {
          id: 'all',
          label: 'All Tasks',
          content: createTasksList(tasks)
        },
        {
          id: 'today',
          label: 'Today',
          content: createEmptyState('Today\'s Tasks', 'Tasks due today will appear here.', 'clock')
        },
        {
          id: 'upcoming',
          label: 'Upcoming',
          content: createEmptyState('Upcoming Tasks', 'Tasks due in the coming days will appear here.', 'calendar')
        },
        {
          id: 'completed',
          label: 'Completed',
          content: createEmptyState('Completed Tasks', 'Your completed tasks will be listed here.', 'checkCircle2')
        }
      ], 'all')}
    </div>
  `;
  
  updateActiveNav();
  
  // Add event listeners for task completion
  setupTaskInteractions();
}

// Add interactions for task items
function setupTaskInteractions() {
  // Wait for DOM to be fully loaded
  setTimeout(() => {
    document.querySelectorAll('.task-checkbox-inner').forEach(checkbox => {
      checkbox.addEventListener('click', function() {
        // Toggle completed state
        this.classList.toggle('checked');
        
        const taskItem = this.closest('.task-item');
        
        if (taskItem) {
          const taskTitle = taskItem.querySelector('.task-title');
          const taskDescription = taskItem.querySelector('.task-description');
          
          taskTitle.classList.toggle('completed');
          if (taskDescription) {
            taskDescription.classList.toggle('completed');
          }
        }
      });
    });
  }, 100);
}

// Helper function to create tasks list
function createTasksList(tasks) {
  return `
    <div class="space-y-4">
      ${tasks.map(task => createTaskItem(task)).join('')}
    </div>
  `;
}

// Helper function to create task item
function createTaskItem(task) {
  const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;
  
  return `
    <div class="card task-item ${task.completed ? 'bg-gray-50' : ''}">
      <div class="flex items-start">
        <div class="task-checkbox mr-3 mt-1">
          <div class="task-checkbox-inner ${task.completed ? 'checked' : ''}">
            ${task.completed ? icons.checkCircle2 : ''}
          </div>
        </div>
        <div class="flex-1">
          <div class="task-header">
            <h3 class="task-title ${task.completed ? 'completed' : ''}">
              ${task.title}
            </h3>
            <span class="task-priority priority-${task.priority}">
              ${task.priority}
            </span>
          </div>
          <p class="task-description ${task.completed ? 'completed' : ''}">
            ${task.description}
          </p>
          <div class="task-meta">
            <div class="task-subject">
              ${icons.tag}
              <span class="ml-1">${task.subject}</span>
            </div>
            <div class="task-due ${isOverdue ? 'overdue' : ''}">
              ${icons.calendar}
              <span class="ml-1">
                Due ${formatDate(task.dueDate)}
                ${isOverdue ? ' (Overdue)' : ''}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Helper function to create empty state
function createEmptyState(title, description, iconName) {
  return `
    <div class="card empty-state">
      <div class="empty-state-icon">${icons[iconName]}</div>
      <h3 class="empty-state-title">${title}</h3>
      <p class="empty-state-description">${description}</p>
    </div>
  `;
}

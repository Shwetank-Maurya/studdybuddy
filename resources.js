// Resources page
import { icons } from '../icons.js';
import { updateActiveNav, createTabs, formatDate } from '../ui.js';

// Sample data for resources
const resources = [
  {
    id: '1',
    title: 'Khan Academy - Calculus',
    description: 'Free video tutorials and practice problems for calculus concepts.',
    url: 'https://www.khanacademy.org/math/calculus-1',
    type: 'website',
    subject: 'Mathematics',
    dateAdded: '2023-05-10'
  },
  {
    id: '2',
    title: 'MIT OpenCourseWare - Physics',
    description: 'Free lecture notes, exams, and videos from MIT physics courses.',
    url: 'https://ocw.mit.edu/courses/physics/',
    type: 'website',
    subject: 'Physics',
    dateAdded: '2023-05-12'
  },
  {
    id: '3',
    title: 'Pride and Prejudice - Jane Austen',
    description: 'Classic novel by Jane Austen, essential reading for literature class.',
    type: 'ebook',
    subject: 'Literature',
    dateAdded: '2023-05-15'
  },
  {
    id: '4',
    title: 'Computer Science',
    description: 'Browse courses and find out the best course for you. Its free!',
    url: 'https://www.codewithharry.com/',
    type: 'website',
    subject: 'Computer Science',
    dateAdded: '2023-05-18'
  },
  {
    id: '5',
    title: 'Crash Course - World History',
    description: 'Video series covering major historical events and periods.',
    url: 'https://www.youtube.com/playlist?list=PLBDA2E52FB1EF80C9',
    type: 'website',
    subject: 'History',
    dateAdded: '2023-05-20'
  },
  {
    id: '6',
    title: 'Electronics and Communication',
    description: 'Neso Academy offers world-class learning resources on engineering courses, school syllabus, competitive exams, and many more.',
    url: 'https://www.nesoacademy.org/ec/05-digital-electronics',
    type: 'document',
    subject: 'Digital Electronics',
    dateAdded: '2023-05-22'
  }
];

export function loadResources() {
  const content = document.getElementById('content');
  
  content.innerHTML = `
    <div class="fade-in">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Study Resources</h1>
        <button class="btn btn-primary">
          ${icons.plus}
          <span class="ml-2">Add Resource</span>
        </button>
      </div>

      <div class="mb-6 flex gap-4 items-center">
        <div class="relative flex-1">
          ${icons.search}
          <input
            type="text"
            placeholder="Search resources by title, description or subject..."
            class="form-input pl-10"
          />
        </div>
        <select class="form-select">
          <option value="">All Subjects</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Physics">Physics</option>
          <option value="Literature">Literature</option>
          <option value="Chemistry">Chemistry</option>
          <option value="History">History</option>
          <option value="Biology">Biology</option>
        </select>
      </div>

      ${createTabs('resources-tabs', [
        {
          id: 'all',
          label: 'All Resources',
          content: createResourcesGrid(resources)
        },
        {
          id: 'websites',
          label: 'Websites',
          content: createResourcesGrid(resources.filter(r => r.type === 'website'))
        },
        {
          id: 'ebooks',
          label: 'E-Books',
          content: createResourcesGrid(resources.filter(r => r.type === 'ebook'))
        },
        {
          id: 'documents',
          label: 'Documents',
          content: createResourcesGrid(resources.filter(r => r.type === 'document'))
        }
      ], 'all')}
    </div>
  `;
  
  updateActiveNav();
}

// Helper function to create resources grid
function createResourcesGrid(resources) {
  return `
    <div class="grid grid-cols-1 grid-cols-2-md grid-cols-3-lg gap-4">
      ${resources.map(resource => createResourceCard(resource)).join('')}
    </div>
  `;
}

// Helper function to create resource card
function createResourceCard(resource) {
  // Get the appropriate icon for the resource type
  const getTypeIcon = (type) => {
    switch (type) {
      case 'website':
        return icons.globe;
      case 'ebook':
        return icons.book;
      case 'document':
        return icons.file;
      default:
        return icons.folderOpen;
    }
  };

  return `
    <div class="card resource-card resource-type-${resource.type}">
      <div class="note-card-header">
        <div class="note-card-info">
          <div class="item-icon resource-icon mr-3">
            ${getTypeIcon(resource.type)}
          </div>
          <div>
            <p class="font-medium text-gray-800">${resource.subject}</p>
            <p class="text-xs text-gray-500">Added ${formatDate(resource.dateAdded)}</p>
          </div>
        </div>
        <button class="item-action">
          ${icons.moreVertical}
        </button>
      </div>
      <div class="note-card-content">
        <h3 class="note-card-title">${resource.title}</h3>
        <p class="note-card-preview">${resource.description}</p>
        ${resource.url ? `
          <a 
            href="${resource.url}" 
            target="_blank" 
            rel="noopener noreferrer"
            class="resource-card-link"
          >
            ${icons.link}
            <span class="ml-1">Visit Resource</span>
          </a>
        ` : ''}
      </div>
    </div>
  `;
}
// Notes page
import { icons } from '../icons.js';
import { updateActiveNav, createTabs, formatDate } from '../ui.js';

// Sample data for notes
const notes = [
  {
    id: '1',
    title: 'Calculus - Integration Techniques',
    preview: 'Integration by parts, substitution method, partial fractions...',
    date: '2023-05-18',
    subject: 'Mathematics',
    tags: ['calculus', 'integration']
  },
  {
    id: '2',
    title: 'Newton\'s Laws of Motion',
    preview: 'First law: An object at rest stays at rest, and an object in motion...',
    date: '2023-05-17',
    subject: 'Physics',
    tags: ['mechanics', 'newton']
  },
  {
    id: '3',
    title: 'The French Revolution',
    preview: 'Causes: Social inequality, financial crisis, Enlightenment ideas...',
    date: '2023-05-15',
    subject: 'History',
    tags: ['revolution', 'france']
  },
  {
    id: '4',
    title: 'Literary Analysis - Shakespeare',
    preview: 'Themes in Hamlet: Revenge, madness, mortality, corruption...',
    date: '2023-05-14',
    subject: 'Literature',
    tags: ['shakespeare', 'hamlet']
  },
  {
    id: '5',
    title: 'Cell Structure and Function',
    preview: 'Eukaryotic cells contain membrane-bound organelles, including a nucleus...',
    date: '2023-05-10',
    subject: 'Biology',
    tags: ['cells', 'organelles']
  },
  {
    id: '6',
    title: 'Organic Chemistry - Alkanes',
    preview: 'Alkanes are saturated hydrocarbons with single bonds between carbon atoms...',
    date: '2023-05-08',
    subject: 'Chemistry',
    tags: ['organic', 'alkanes']
  }
];

export function loadNotes() {
  const content = document.getElementById('content');
  
  content.innerHTML = `
    <div class="fade-in">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-gray-800">My Notes</h1>
        <button class="btn btn-primary">
          ${icons.plus}
          <span class="ml-2">New Note</span>
        </button>
      </div>

      <div class="mb-6 flex gap-4 items-center">
        <div class="relative flex-1">
          ${icons.search}
          <input
            type="text"
            placeholder="Search notes by title, content, or tags..."
            class="form-input pl-10"
          />
        </div>
        <select class="form-select">
          <option value="">All Subjects</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Physics">Physics</option>
          <option value="History">History</option>
          <option value="Literature">Literature</option>
          <option value="Biology">Biology</option>
          <option value="Chemistry">Chemistry</option>
        </select>
      </div>

      ${createTabs('notes-tabs', [
        {
          id: 'all',
          label: 'All Notes',
          content: createNotesGrid(notes)
        },
        {
          id: 'recent',
          label: 'Recent',
          content: createEmptyState('Recent Notes View', 'Switch between different views to organize your notes.')
        },
        {
          id: 'favorites',
          label: 'Favorites',
          content: createEmptyState('Favorites View', 'Your favorite notes will appear here.')
        },
        {
          id: 'shared',
          label: 'Shared',
          content: createEmptyState('Shared Notes', 'Notes shared with you will appear here.')
        }
      ], 'all')}
    </div>
  `;
  
  updateActiveNav();
}

// Helper function to create notes grid
function createNotesGrid(notes) {
  return `
    <div class="grid grid-cols-1 grid-cols-2-md grid-cols-3-lg gap-4">
      ${notes.map(note => createNoteCard(note)).join('')}
    </div>
  `;
}

// Helper function to create note card
function createNoteCard(note) {
  return `
    <div class="card note-card">
      <div class="note-card-header">
        <div class="note-card-info">
          <div class="item-icon mr-3">
            ${icons.fileText}
          </div>
          <div>
            <p class="font-medium text-gray-800">${note.subject}</p>
            <p class="text-xs text-gray-500">${formatDate(note.date)}</p>
          </div>
        </div>
        <button class="item-action">
          ${icons.moreVertical}
        </button>
      </div>
      <div class="note-card-content">
        <h3 class="note-card-title">${note.title}</h3>
        <p class="note-card-preview">${note.preview}</p>
        <div class="note-tags">
          ${note.tags.map(tag => `
            <span class="note-tag">#${tag}</span>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// Helper function to create empty state
function createEmptyState(title, description) {
  return `
    <div class="card empty-state">
      <div class="empty-state-icon">${icons.folderOpen}</div>
      <h3 class="empty-state-title">${title}</h3>
      <p class="empty-state-description">${description}</p>
    </div>
  `;
}

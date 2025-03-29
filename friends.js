// Friends page
import { icons } from '../icons.js';
import { updateActiveNav, createTabs } from '../ui.js';

// Sample data for friends
const friends = [
  {
    id: '1',
    name: 'Shivam Yadav',
    // avatar: 'https://i.pravatar.cc/150?img=1',
    status: 'online',
    major: 'Computer Science',
    year: 'Batchmate'
  },
  {
    id: '2',
    name: 'Charles Xavier',
    // avatar: 'https://i.pravatar.cc/150?img=2',
    status: 'studying',
    major: 'Data Science',
    year: 'Senior'
  },
  {
    id: '3',
    name: 'Adarsh Kumar Mishra',
    // avatar: 'https://i.pravatar.cc/150?img=3',
    status: 'offline',
    major: 'Electronica and Communication',
    year: 'Batchmate'
  },
  {
    id: '4',
    name: 'Shwetank Maurya',
    // avatar: 'https://i.pravatar.cc/150?img=4',
    status: 'online',
    major: 'Business Administration',
    year: 'Junior'
  },
  {
    id: '5',
    name: 'Shivam Vishwakarma',
    // avatar: 'https://i.pravatar.cc/150?img=5',
    status: 'studying',
    major: 'AI and ML',
    year: 'Jounior'
  },
  {
    id: '6',
    name: 'Keshav Kumar',
    // avatar: 'https://i.pravatar.cc/150?img=5',
    status: 'studying',
    major: 'Web Development',
    year: 'Batchmate'
  },
];

// Sample data for study groups
const studyGroups = [
  {
    id: '1',
    name: 'Calculus II Study Group',
    members: 12,
    subject: 'Mathematics',
    meetingTime: 'Mondays, 5-7 PM'
  },
  {
    id: '2',
    name: 'Organic Chemistry Lab Prep',
    members: 8,
    subject: 'Chemistry',
    meetingTime: 'Wednesdays, 4-6 PM'
  },
  {
    id: '3',
    name: 'Programming Project Team',
    members: 6,
    subject: 'Computer Science',
    meetingTime: 'Tuesdays & Thursdays, 7-9 PM'
  },
  {
    id: '4',
    name: 'Economics Discussion',
    members: 15,
    subject: 'Economics',
    meetingTime: 'Fridays, 3-5 PM'
  }
];

// Sample data for friend requests
const friendRequests = [
  {
    id: '1',
    name: 'Jayesh Sharma',
    // avatar: 'https://i.pravatar.cc/150?img=6',
    mutualFriends: 3,
    major: 'Engineering',
    timestamp: '2 days ago'
  },
  {
    id: '2',
    name: 'Saloni Pandey',
    // avatar: 'https://i.pravatar.cc/150?img=7',
    mutualFriends: 5,
    major: 'Education',
    timestamp: '5 days ago'
  }
];

export function loadFriends() {
  const content = document.getElementById('content');
  
  content.innerHTML = `
    <div class="fade-in">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Friend Circle</h1>
        <div class="flex gap-3">
          <button class="btn btn-outline" id="friend-requests-btn">
            ${icons.userPlus}
            <span class="ml-2">Friend Requests</span>
            ${friendRequests.length > 0 ? `
              <span class="bg-student-primary text-white rounded-full px-2 py-0.5 text-xs ml-2">
                ${friendRequests.length}
              </span>
            ` : ''}
          </button>
          <button class="btn btn-primary">
            ${icons.userPlus}
            <span class="ml-2">Add Friends</span>
          </button>
        </div>
      </div>
      
      <div class="mb-6 flex gap-4 items-center">
        <div class="relative flex-1">
          ${icons.search}
          <input
            type="text"
            placeholder="Search for friends, study groups, or classmates..."
            class="form-input pl-10"
          />
        </div>
      </div>
      
      ${createTabs('friends-tabs', [
        {
          id: 'friends',
          label: 'My Friends',
          content: createFriendsGrid(friends)
        },
        {
          id: 'groups',
          label: 'Study Groups',
          content: createStudyGroupsGrid(studyGroups)
        },
        {
          id: 'requests',
          label: `Friend Requests ${friendRequests.length > 0 ? `<span class="bg-student-primary text-white rounded-full px-2 py-0.5 text-xs ml-1">${friendRequests.length}</span>` : ''}`,
          content: createFriendRequestsList(friendRequests)
        }
      ], 'friends')}
    </div>
  `;
  
  updateActiveNav();
  
  // Set up friend requests button to switch tabs
  document.getElementById('friend-requests-btn')?.addEventListener('click', function() {
    const requestsTab = document.querySelector('.tab[data-tab="requests"]');
    if (requestsTab) {
      requestsTab.click();
    }
  });
}

// Helper function to create friends grid
function createFriendsGrid(friends) {
  return `
    <div class="grid grid-cols-1 grid-cols-2-md grid-cols-3-lg gap-4">
      ${friends.map(friend => createFriendCard(friend)).join('')}
    </div>
  `;
}

// Helper function to create friend card
function createFriendCard(friend) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'status-online';
      case 'studying': return 'status-studying';
      case 'offline': return 'status-offline';
      default: return 'status-offline';
    }
  };
  
  const getStatusLabel = (status) => {
    switch (status) {
      case 'online': return 'Online';
      case 'studying': return 'Studying';
      case 'offline': return 'Offline';
      default: return 'Offline';
    }
  };

  return `
    <div class="card friend-card">
      <div class="friend-card-header">
        <div class="friend-avatar">
          <img src="${friend.avatar}" alt="${friend.name}" class="friend-avatar-img">
          <span class="friend-status ${getStatusColor(friend.status)}"></span>
        </div>
        <div>
          <h3 class="friend-info-primary">${friend.name}</h3>
          <p class="friend-info-secondary">
            <span class="friend-status ${getStatusColor(friend.status)}" style="width: 8px; height: 8px; display: inline-block; margin-right: 4px;"></span>
            ${getStatusLabel(friend.status)}
          </p>
        </div>
      </div>
      <div class="friend-card-content">
        <div class="friend-detail">
          <span class="friend-detail-label">Major:</span> ${friend.major}
        </div>
        <div class="friend-detail">
          <span class="friend-detail-label">Year:</span> ${friend.year}
        </div>
        
        <div class="friend-actions">
          <button class="btn btn-outline flex-1">
            ${icons.messageCircle}
            <span class="ml-1">Message</span>
          </button>
          <button class="btn btn-outline flex-1">
            ${icons.calendar}
            <span class="ml-1">Study</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

// Helper function to create study groups grid
function createStudyGroupsGrid(groups) {
  return `
    <div class="grid grid-cols-1 grid-cols-2-md gap-4">
      ${groups.map(group => `
        <div class="card">
          <div class="card-content p-4">
            <h3 class="font-semibold text-lg mb-2">${group.name}</h3>
            <div class="text-sm space-y-2 mb-4">
              <div>
                <span class="font-medium">Subject:</span> ${group.subject}
              </div>
              <div>
                <span class="font-medium">Members:</span> ${group.members} students
              </div>
              <div>
                <span class="font-medium">Meeting:</span> ${group.meetingTime}
              </div>
            </div>
            
            <div class="flex gap-2">
              <button class="btn btn-primary flex-1">
                Join Group
              </button>
              <button class="btn btn-outline flex-1">
                Learn More
              </button>
            </div>
          </div>
        </div>
      `).join('')}
      
      <div class="card border-dashed border flex items-center justify-center">
        <div class="card-content p-4 text-center">
          <div class="bg-gray-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
            ${icons.users}
          </div>
          <h3 class="font-semibold text-lg mb-2">Create New Study Group</h3>
          <p class="text-sm text-gray-500 mb-4">Start a new group and invite classmates to join</p>
          <button class="btn btn-primary w-full">
            Create Group
          </button>
        </div>
      </div>
    </div>
  `;
}

// Helper function to create friend requests list
function createFriendRequestsList(requests) {
  if (requests.length === 0) {
    return `
      <div class="card empty-state">
        <div class="empty-state-icon">${icons.clock}</div>
        <h3 class="empty-state-title">No Pending Requests</h3>
        <p class="empty-state-description">You don't have any friend requests at the moment</p>
      </div>
    `;
  }
  
  return `
    <div class="space-y-4">
      ${requests.map(request => `
        <div class="card">
          <div class="card-content p-4 flex items-center justify-between">
            <div class="flex items-center">
              <div class="friend-avatar mr-4">
                <img src="${request.avatar}" alt="${request.name}" class="friend-avatar-img">
              </div>
              <div>
                <h3 class="font-semibold text-lg">${request.name}</h3>
                <p class="text-sm text-gray-500">${request.major}</p>
                <p class="text-xs text-gray-400">
                  <span class="text-student-primary font-medium">${request.mutualFriends} mutual friends</span> • ${request.timestamp}
                </p>
              </div>
            </div>
            
            <div class="flex gap-2">
              <button class="btn btn-outline">
                ${icons.x}
                <span class="ml-1">Ignore</span>
              </button>
              <button class="btn btn-primary">
                ${icons.userCheck}
                <span class="ml-1">Accept</span>
              </button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// Quiz Generator page
import { icons } from '../icons.js';
import { updateActiveNav } from '../ui.js';

export function loadQuizGenerator() {
  const content = document.getElementById('content');
  
  content.innerHTML = `
    <div class="fade-in">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Quiz Generator</h1>
      
      <div class="quiz-form">
        <h2 class="text-xl font-semibold mb-4">Create a New Quiz</h2>
        
        <div class="form-group">
          <label class="form-label" for="quiz-subject">Subject</label>
          <select class="form-select" id="quiz-subject">
            <option value="">Select a subject</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Biology">Biology</option>
            <option value="Chemistry">Chemistry</option>
            <option value="History">History</option>
            <option value="Literature">Literature</option>
            <option value="Computer Science">Computer Science</option>
          </select>
        </div>
        
        <div class="form-group">
          <label class="form-label" for="quiz-topic">Topic</label>
          <input type="text" class="form-input" id="quiz-topic" placeholder="e.g., Integration, Newton's Laws, French Revolution">
        </div>
        
        <div class="form-group">
          <label class="form-label" for="quiz-difficulty">Difficulty Level</label>
          <select class="form-select" id="quiz-difficulty">
            <option value="beginner">Beginner</option>
            <option value="intermediate" selected>Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        
        <div class="form-group">
          <label class="form-label" for="quiz-questions">Number of Questions</label>
          <select class="form-select" id="quiz-questions">
            <option value="5">5 Questions</option>
            <option value="10" selected>10 Questions</option>
            <option value="15">15 Questions</option>
            <option value="20">20 Questions</option>
          </select>
        </div>
        
        <div class="form-group">
          <label class="form-label" for="quiz-notes">Additional Notes (Optional)</label>
          <textarea class="form-textarea" id="quiz-notes" placeholder="Add specific topics or concepts you want to be included in the quiz"></textarea>
        </div>
        
        <button class="btn btn-primary w-full" id="generate-quiz-btn">
          Generate Quiz
        </button>
      </div>
      
      <div class="quiz-questions" id="quiz-questions-container" style="display: none;">
        <h2 class="text-xl font-semibold mb-4">Your Quiz</h2>
        <div id="quiz-content">
          <!-- Quiz questions will be loaded here -->
        </div>
        
        <div class="flex gap-4 justify-center mt-6">
          <button class="btn btn-outline" id="reset-quiz-btn">
            Reset
          </button>
          <button class="btn btn-primary" id="submit-quiz-btn">
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  `;
  
  updateActiveNav();
  
  // Add event listeners
  document.getElementById('generate-quiz-btn').addEventListener('click', generateQuiz);
  document.getElementById('reset-quiz-btn')?.addEventListener('click', resetQuiz);
  document.getElementById('submit-quiz-btn')?.addEventListener('click', submitQuiz);
}

// Sample question data
const sampleQuestions = {
  'Mathematics': [
    {
      question: "What is the derivative of f(x) = x²?",
      options: ["f'(x) = x", "f'(x) = 2x", "f'(x) = 2", "f'(x) = x²"],
      answer: 1
    },
    {
      question: "What is the value of π (pi) to two decimal places?",
      options: ["3.14", "3.16", "3.12", "3.18"],
      answer: 0
    },
    {
      question: "Which of the following is equivalent to sin²θ + cos²θ?",
      options: ["0", "1", "2", "It depends on θ"],
      answer: 1
    }
  ],
  'Physics': [
    {
      question: "What is Newton's First Law of Motion?",
      options: [
        "Force equals mass times acceleration",
        "For every action, there is an equal and opposite reaction",
        "An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force",
        "Energy cannot be created or destroyed, only transformed"
      ],
      answer: 2
    },
    {
      question: "What is the SI unit of electrical resistance?",
      options: ["Volt", "Ampere", "Watt", "Ohm"],
      answer: 3
    },
    {
      question: "Which of these particles has a positive charge?",
      options: ["Electron", "Neutron", "Proton", "Photon"],
      answer: 2
    }
  ],
  'Biology': [
    {
      question: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Mitochondria", "Endoplasmic Reticulum", "Golgi Apparatus"],
      answer: 1
    },
    {
      question: "Which of the following is NOT a nucleotide found in DNA?",
      options: ["Adenine", "Cytosine", "Uracil", "Guanine"],
      answer: 2
    },
    {
      question: "What process do plants use to convert light energy into chemical energy?",
      options: ["Respiration", "Photosynthesis", "Fermentation", "Transpiration"],
      answer: 1
    }
  ]
};

// Generate a quiz
function generateQuiz() {
  const subject = document.getElementById('quiz-subject').value;
  const numberOfQuestions = parseInt(document.getElementById('quiz-questions').value);
  
  if (!subject) {
    alert('Please select a subject');
    return;
  }
  
  // Show the quiz questions container
  const quizContainer = document.getElementById('quiz-questions-container');
  quizContainer.style.display = 'block';
  
  // Generate quiz content
  const quizContent = document.getElementById('quiz-content');
  
  // Get questions for the selected subject or default to Mathematics
  const questions = sampleQuestions[subject] || sampleQuestions['Mathematics'];
  
  // Build the quiz HTML
  let quizHTML = '';
  
  // Use available questions or generate placeholders
  const questionsToShow = Math.min(numberOfQuestions, questions.length);
  
  for (let i = 0; i < questionsToShow; i++) {
    const q = questions[i];
    
    quizHTML += `
      <div class="quiz-question">
        <div class="quiz-question-number">Question ${i + 1}</div>
        <div class="quiz-question-text">${q.question}</div>
        <div class="quiz-options">
          ${q.options.map((option, index) => `
            <div class="quiz-option" data-index="${index}">
              <div class="quiz-option-marker">${String.fromCharCode(65 + index)}</div>
              <div class="quiz-option-text">${option}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  // Fill remaining questions with placeholders if needed
  for (let i = questionsToShow; i < numberOfQuestions; i++) {
    quizHTML += `
      <div class="quiz-question">
        <div class="quiz-question-number">Question ${i + 1}</div>
        <div class="quiz-question-text">Sample question about ${subject}</div>
        <div class="quiz-options">
          ${['Option A', 'Option B', 'Option C', 'Option D'].map((option, index) => `
            <div class="quiz-option" data-index="${index}">
              <div class="quiz-option-marker">${String.fromCharCode(65 + index)}</div>
              <div class="quiz-option-text">${option}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  quizContent.innerHTML = quizHTML;
  
  // Add event listeners to quiz options
  document.querySelectorAll('.quiz-option').forEach(option => {
    option.addEventListener('click', function() {
      // Deselect all options in the same question
      const question = this.closest('.quiz-question');
      question.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.remove('selected');
      });
      
      // Select the clicked option
      this.classList.add('selected');
    });
  });
  
  // Scroll to the quiz
  quizContainer.scrollIntoView({ behavior: 'smooth' });
}

// Reset the quiz
function resetQuiz() {
  // Hide the quiz questions container
  document.getElementById('quiz-questions-container').style.display = 'none';
  
  // Reset the form fields
  document.getElementById('quiz-subject').selectedIndex = 0;
  document.getElementById('quiz-topic').value = '';
  document.getElementById('quiz-notes').value = '';
  
  // Scroll back to the top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Submit the quiz
function submitQuiz() {
  let score = 0;
  let totalQuestions = 0;
  
  // Get all questions
  const questions = document.querySelectorAll('.quiz-question');
  totalQuestions = questions.length;
  
  // Count correct answers
  questions.forEach((question, index) => {
    const selectedOption = question.querySelector('.quiz-option.selected');
    
    if (selectedOption) {
      const selectedIndex = parseInt(selectedOption.dataset.index);
      const subject = document.getElementById('quiz-subject').value;
      const questions = sampleQuestions[subject] || sampleQuestions['Mathematics'];
      
      // Check if the answer is correct (if we have the answer)
      if (index < questions.length && selectedIndex === questions[index].answer) {
        score++;
      }
    }
  });
  
  // Show the result
  alert(`Your score: ${score} out of ${totalQuestions}`);
}
// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');

    if (body.classList.contains('dark-theme')) {
      themeToggle.textContent = '☀️';
    } else {
      themeToggle.textContent = '🌙';
    }

    themeToggle.classList.add('rotate');
    setTimeout(() => {
      themeToggle.classList.remove('rotate');
    }, 500);

    localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
  });
}

// Greeting
const greetingElement = document.getElementById("greeting");
let userName = localStorage.getItem("userName");

if (!userName) {
  userName = prompt("Welcome! What is your name?");
  if (userName) {
    localStorage.setItem("userName", userName);
  }
}

function getTimeNow() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  else if (hour < 18) return "Good afternoon";
  else return "Good evening";
}

if (greetingElement) {
  if (userName) {
    greetingElement.textContent = `${getTimeNow()}, ${userName}!`;
  } else {
    greetingElement.textContent = "Welcome to my website!";
  }
}

// DOMContentLoaded actions
window.addEventListener('DOMContentLoaded', () => {
  // Set theme from localStorage
  if(localStorage.getItem('theme') === 'dark'){
    document.body.classList.add('dark-theme');
    if (themeToggle) themeToggle.textContent = '☀️';
  }

  // Fade in initial sections
  const sections = document.querySelectorAll('section, header');
  sections.forEach(section => {
    section.style.opacity = 1;
  });
});

// GitHub API - Projects
const githubProjectsContainer = document.getElementById("github-projects");
const githubUsername = "fatimasaad2003s";

// IntersectionObserver for fade-in
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});
fadeElements.forEach(el => observer.observe(el));

if (githubProjectsContainer) {
  fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=5`)
    .then(response => response.json())
    .then(repos => {
      if (!Array.isArray(repos)) return;

      repos.forEach(repo => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card", "fade-in");
        projectCard.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description || "No description available"}</p>
          <a href="${repo.html_url}" target="_blank">View on GitHub</a>
        `;
        githubProjectsContainer.appendChild(projectCard);

        // Observe new project card for fade-in
        observer.observe(projectCard);
      });
    })
    .catch(error => {
      githubProjectsContainer.innerHTML = "<p>Unable to fetch GitHub projects at this time.</p>";
      console.error("GitHub API Error:", error);
    });
}

// Contact form
const form = document.querySelector(".contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields before submitting");
      return;
    }

    alert("Message sent successfully!");
    form.reset();
  });
}

let allProjects = []; 

fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=5`)
  .then(response => response.json())
  .then(repos => {
    allProjects = repos.map(repo => {
      return {
        name: repo.name,
        description: repo.description || "No description available",
        url: repo.html_url,
        type: detectProjectType(repo) 
      };
    });

    displayProjects(allProjects);
  })
  .catch(error => {
    githubProjectsContainer.innerHTML = "<p>Unable to fetch GitHub projects at this time.</p>";
    console.error("GitHub API Error:", error);
  });

function displayProjects(projects) {
  githubProjectsContainer.innerHTML = "";
  projects.forEach(repo => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card", "fade-in");

    projectCard.innerHTML = `
      <h3>${repo.name}</h3>
      <p>${repo.description}</p>
      <p><strong>Type:</strong> ${repo.type}</p>
      <a href="${repo.url}" target="_blank">View on GitHub</a>
    `;

    githubProjectsContainer.appendChild(projectCard);
  });

  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(el => observer.observe(el));
}

function detectProjectType(repo) {
  if (repo.name.toLowerCase().includes("verilog")) return "Verilog";
  if (repo.name.toLowerCase().includes("logisim")) return "Logisim";
  if (repo.name.toLowerCase().includes("reservation")) return "Java";
  return "Other";
}

const filterSelect = document.getElementById("project-filter");
filterSelect.addEventListener("change", () => {
  const filterValue = filterSelect.value;
  if (filterValue === "all") displayProjects(allProjects);
  else displayProjects(allProjects.filter(p => p.type === filterValue));
});

const timerElement = document.getElementById("visit-timer");

if (timerElement) {
  let seconds = 0;
  setInterval(() => {
    seconds++;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timerElement.textContent = `Time on site ${mins}:${secs < 10 ? '0' : ''}${secs} minutes`;
  }, 1000);
}


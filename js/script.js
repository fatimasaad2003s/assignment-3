const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    themeToggle.textContent = body.classList.contains('dark-theme') ? '☀️' : '🌙';
    themeToggle.classList.add('rotate');
    setTimeout(() => themeToggle.classList.remove('rotate'), 500);
    localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
  });
}

const greetingElement = document.getElementById("greeting");
let userName = localStorage.getItem("userName");

if (!userName) {
  userName = prompt("Welcome! What is your name?");
  if (userName) localStorage.setItem("userName", userName);
}

function getTimeNow() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

if (greetingElement) {
  greetingElement.textContent = userName ? `${getTimeNow()}, ${userName}!` : "Welcome to my website!";
}

window.addEventListener('DOMContentLoaded', () => {
  if(localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    if(themeToggle) themeToggle.textContent = '☀️';
  }

  const sections = document.querySelectorAll('section, header');
  sections.forEach(section => section.style.opacity = 1);
});

const githubProjectsContainer = document.getElementById("github-projects");
const githubUsername = "fatimasaad2003s";
let allProjects = [];

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
});

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

function detectProjectType(repo) {
  const name = repo.name.toLowerCase();
  if(name.includes("verilog")) return "Verilog";
  if(name.includes("logisim")) return "Logisim";
  if(name.includes("reservation")) return "Java";
  return "Other";
}

function displayProjects(projects) {
  githubProjectsContainer.innerHTML = "";
  projects.forEach(repo => {
    const card = document.createElement("div");
    card.classList.add("project-card", "fade-in");
    card.innerHTML = `
      <h3>${repo.name}</h3>
      <p>${repo.description}</p>
      <p><strong>Type:</strong> ${repo.type}</p>
      <a href="${repo.url}" target="_blank">View on GitHub</a>
    `;
    githubProjectsContainer.appendChild(card);
    observer.observe(card);
  });
}

fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=5`)
  .then(res => res.json())
  .then(repos => {
    if(!Array.isArray(repos)) return;
    allProjects = repos.map(repo => ({
      name: repo.name,
      description: repo.description || "No description available",
      url: repo.html_url,
      type: detectProjectType(repo)
    }));
    displayProjects(allProjects);
  })
  .catch(err => {
    githubProjectsContainer.innerHTML = "<p>Unable to fetch GitHub projects at this time.</p>";
    console.error("GitHub API Error:", err);
  });

const filterSelect = document.getElementById("project-filter");
filterSelect.addEventListener("change", () => {
  const value = filterSelect.value;
  displayProjects(value === "all" ? allProjects : allProjects.filter(p => p.type === value));
});

const timerElement = document.getElementById("visit-timer");
if(timerElement){
  let seconds = 0;
  setInterval(() => {
    seconds++;
    const mins = Math.floor(seconds/60);
    const secs = seconds % 60;
    timerElement.textContent = `Time on site ${mins}:${secs < 10 ? '0':''}${secs} minutes`;
  }, 1000);
}

const form = document.querySelector(".contact-form");
const formError = document.createElement("p");
formError.style.color = "red";
form && form.appendChild(formError);

if(form){
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if(!name || !email || !message){
      formError.textContent = "Please fill in all fields before submitting";
      return;
    }

    formError.textContent = "";
    alert("Message sent successfully!");
    form.reset();
  });
}

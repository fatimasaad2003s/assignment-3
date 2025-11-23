const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

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

if (userName) {
  greetingElement.textContent = `${getTimeNow()}, ${userName}! `;
} else {
  greetingElement.textContent = "Welcome to my website! ";
}

window.addEventListener('DOMContentLoaded', () => {
  if(localStorage.getItem('theme') === 'dark'){
    document.body.classList.add('dark-theme');
    themeToggle.textContent = '☀️'; 
  }

  const sections = document.querySelectorAll('section, header');
  sections.forEach(section => {
    section.style.opacity = 1;
  });
});

const form = document.querySelector(".contact-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields before submitting ");
    return;
  }

  alert("Message sent successfully!");
  form.reset();
});





const text = [
"Computer Science Student",
"AI Enthusiast",
"Web Developer"
];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type(){

if(count === text.length){
count = 0;
}

currentText = text[count];
letter = currentText.slice(0, ++index);

document.querySelector(".typing").textContent = letter;

if(letter.length === currentText.length){
count++;
index = 0;
}

setTimeout(type,100);

const toggle = document.getElementById("modeToggle");

toggle.onclick = function(){
document.body.classList.toggle("light-mode");

})();
fetch("https://api.github.com/users/yourusername/repos")
.then(response => response.json())
.then(data => {

const container = document.getElementById("github-projects");

data.slice(0,6).forEach(repo => {

const project = document.createElement("div");

project.className = "project";

project.innerHTML = `
<h3>${repo.name}</h3>
<p>${repo.description || "No description available"}</p>
<a href="${repo.html_url}" target="_blank">View Project</a>
`;

container.appendChild(project);

});

});

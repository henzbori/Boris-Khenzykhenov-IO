// creating footer element
const footerElement = document.createElement("footer");
const body = document.getElementsByTagName("body");
document.body.append(footerElement);

// creating content for footer
let today = new Date();
let thisYear = today.getFullYear();
let footer = document.querySelector("footer");
let copyright = document.createElement("p");
copyright.innerHTML = "&copy;" + "Boris Khenzykhenov" + " " + thisYear;
footer.appendChild(copyright);

// making list of skills
let skills = ["JavaScript", "HTML", "CSS", "React", "GitHub"];
let skillsSection = document.getElementById("skills");
let skillsList = skillsSection.querySelector("ul");
for (let i = 0; i < skills.length; i ++) {
    let skill = document.createElement("li");
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
};
skillsList.className = "skillsStyle";
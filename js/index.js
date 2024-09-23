// making navbar sticky
window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.scrollY >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

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
copyright.className = "footerStyle";
footer.appendChild(copyright);

// making list of skills
let skills = ["JavaScript", "HTML", "CSS", "React", "GitHub", "Node.js", "The DOM API", "Fetch API"];
let skillsSection = document.getElementById("skills");
let skillsList = skillsSection.querySelector("ul");
for (let i = 0; i < skills.length; i ++) {
    let skill = document.createElement("li");
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
    skill.className = "skill-flex-item";
};
skillsList.className = "skillsStyle";


// making forms and event listeners
let messageForm = document.querySelector("[name='leave_message']");
let messageSection = document.getElementById('message-section');
let messageList = messageSection.querySelector('ul');
messageSection.hidden = true;

// making id for each message
let idMessageCount = 0;
function createId() {
    let id = 'message' + idMessageCount++;
    return id;
}

// save entry by id, initialize the edit form
let entryById={};

// creating new message
messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let formName = event.target.usersName.value;
    let formEmail = event.target.usersEmail.value;
    let formMessage = event.target.usersMessage.value;

    // console.log("Name:", formName);
    // console.log("Email:", formEmail);
    // console.log("Message:", formMessage);
    
    let uniqueId = createId();
    let newMessage = document.createElement('li');
    newMessage.classList.add("message-entry");

    newMessage.innerHTML = `<a href="mailto:${formEmail} ">${formName}:   </a><span> ${formMessage} </span>`;
    newMessage.setAttribute('id', uniqueId);

    entryById[uniqueId] = { usersName: formName, usersEmail: formEmail, usersMessage: formMessage };
    
    newMessage.appendChild(createEditButton());
    newMessage.appendChild(createRemoveButton());
    messageList.appendChild(newMessage);

    messageForm.reset();
    messageSection.hidden = false;
});

// remove button in parentNode
function createRemoveButton() {
    let removeButton = document.createElement('button');
    removeButton.innerHTML = '<img src="img/trashbin_logo.png" width="15px" alt="logo of trash bin for delete button" />';
    removeButton.type = "button";
    removeButton.role = "button";
    removeButton.className = "remove_button";
    removeButton.addEventListener("click", () => {
        let entry = removeButton.parentNode;
        let uniqueId1 = entry.getAttribute("id");
        delete entryById[uniqueId1];
        entry.remove();
        if (messageList.childElementCount === 0) {
            messageSection.hidden = true;
        };
    });
    return removeButton;
};

// edit button in parent node
function createEditButton() {
    let editButton = document.createElement('button');
    editButton.innerHTML = '<img src="img/edit_logo.png" width="20px" alt="logo of the edit icon to edit the message" />';
    editButton.type = "button";
    editButton.role = "button";
    editButton.className = "edit_button";
    editButton.addEventListener("click", () => {
        // to add edit button to parent node
        let entry = editButton.parentNode;
        
        // to hide previuos remove button while editing
        let lastRemoveButton = entry.querySelector("button.remove_button");
        lastRemoveButton.hidden = true;
        // to hide previuos edit button while editing
        let lastEditButton = entry.querySelector("button.edit_button");
        lastEditButton.hidden = true;

        // get unique id of the entry and use the content in the form
        let uniqueId = entry.getAttribute('id');
        let copyForm = messageForm.cloneNode(true);
        copyForm.className = "edit-form";
        copyForm.usersName.value = entryById[uniqueId].usersName;
        copyForm.usersEmail.value = entryById[uniqueId].usersEmail;
        copyForm.usersMessage.value = entryById[uniqueId].usersMessage;
        entry.appendChild(copyForm);
        copyForm.addEventListener('submit', function editMessage(event) {
            event.preventDefault();
            entryById[uniqueId].usersName = event.target.usersName.value;
            entryById[uniqueId].usersEmail = event.target.usersEmail.value;
            entryById[uniqueId].usersMessage = event.target.usersMessage.value;
            let newInput = document.createElement("li");
            newInput.classList.add("message-entry");
            newInput.setAttribute('id', uniqueId);
            newInput.innerHTML = `<a href="mailto:${entryById[uniqueId].usersEmail} ">${entryById[uniqueId].usersName}:   </a><span>  ${entryById[uniqueId].usersMessage} </span>`;
            newInput.appendChild(createEditButton());
            newInput.appendChild(createRemoveButton());
            entry.parentNode.replaceChild(newInput, entry);
        });
    });
    return editButton;
}

// fetching repositories from github account
const GITHUB_USERNAME = "henzbori";
fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch", response.status);
        }
        return response.text()
    })
    .then(data => {
        const repositories = JSON.parse(data);
        // console.log(repositories);

        // DOM Selection to select the projects section by id
        const projectSection = document.getElementById("projects");

        // DOM Selection to select the element
        let projectList = projectSection.querySelector("ul");
        
        projectList.classList = "projectsListStyle";
        for (let repo of repositories) {
            // crete new list item
            let project = document.createElement("li");
            // set the name of repo to new list item
            project.innerHTML = repo.name.toUpperCase().link(repo.html_url);
            
            project.className = "projectElement";

            // append project to the list of projects
            projectList.appendChild(project);
        }
    })
    .catch(err => {
        if (err instanceof SyntaxError) {
            console.error("Unparsable response from server");
        } else {
           console.error("Error fetching data: ", err.message);
        }
    });
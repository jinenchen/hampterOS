function updateTime() {
    var options = { hour: "numeric", minute: "2-digit" };
    var currentTime = new Date().toLocaleTimeString([], options);
    var timeText = document.querySelector("#timeElement");
    timeText.innerHTML = currentTime;
}

updateTime();
setInterval(updateTime, 1000); 

var biggestIndex = 1; 

function closeWindow(element) {
    element.style.display = "none";
}

function openWindow(element) {
    element.style.display = "block";
    biggestIndex++;
    element.style.zIndex = biggestIndex;
}

function handleWindowTap(element) {
    biggestIndex++;
    element.style.zIndex = biggestIndex;
}

var charSelect = document.querySelector("#char-select");
var charSelectClose = document.querySelector("#char-selectclose");
var charSelectOpen = document.querySelector("#char-selectopen");

charSelectClose.addEventListener("click", () => closeWindow(charSelect));
charSelectOpen.addEventListener("click", () => openWindow(charSelect));
charSelect.addEventListener("mousedown", () => handleWindowTap(charSelect));

dragElement(document.getElementById("char-select"));

var cursorStyleTag = document.createElement("style");
document.head.appendChild(cursorStyleTag);

var characterOptions = document.querySelectorAll(".character-option");

characterOptions.forEach(function(element) {
    element.addEventListener("click", function() {
        if (this.classList.contains("reset-cursor")) {
            cursorStyleTag.innerHTML = ""; 
            document.body.style.cursor = "default";
        } else {
            let newCursorSrc = this.getAttribute("data-cursor");
            cursorStyleTag.innerHTML = `* { cursor: url('${newCursorSrc}'), auto !important; }`;
        }
    });
});

var coolapp = document.querySelector("#coolapp");
var coolappClose = document.querySelector("#coolappclose");

coolappClose.addEventListener("click", () => closeWindow(coolapp));
coolapp.addEventListener("mousedown", () => handleWindowTap(coolapp));

dragElement(document.getElementById("coolapp")); 

function dragElement(element) {
    var initialX = 0, initialY = 0, currentX = 0, currentY = 0;

    if (document.getElementById(element.id + "header")) {
        document.getElementById(element.id + "header").onmousedown = startDragging;
    } else {
        element.onmousedown = startDragging;
    }

    function startDragging(e) {
        e = e || window.event;
        e.preventDefault();
        initialX = e.clientX; 
        initialY = e.clientY; 
        document.onmouseup = stopDragging;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;

        element.style.top = (element.offsetTop - currentY) + "px";
        element.style.left = (element.offsetLeft - currentX) + "px";
    }

    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

var taskbarCoolAppIcon = document.querySelector("#taskbar-coolapp-icon");

taskbarCoolAppIcon.addEventListener("click", function() {
    if (coolapp.style.display === "none" || coolapp.style.display === "") {
        openWindow(coolapp);
    } else {
        if (coolapp.style.zIndex == biggestIndex) {
            closeWindow(coolapp);
        } else {
            handleWindowTap(coolapp);
        }
    }
});

var taskbarCharIcon = document.querySelector("#taskbar-char-icon");

taskbarCharIcon.addEventListener("click", function() {
    if (charSelect.style.display === "none" || charSelect.style.display === "") {
        openWindow(charSelect);
    } else {
        if (charSelect.style.zIndex == biggestIndex) {
            closeWindow(charSelect);
        } else {
            handleWindowTap(charSelect);
        }
    }
});

var appData = [
    {
        title: "Note",
        date: "06/29/2026",
        content: "<p> Hello! This is the creation date of this note. </p>"
    }
];

var sidebar = document.querySelector("#app-sidebar");
var contentArea = document.querySelector("#app-content");

function setAppContent(index) {
    var item = appData[index];
    contentArea.innerHTML = `<h2>${item.title}</h2><p><i>${item.date}</i></p>${item.content}`;
}

function buildSidebar() {
    for (let i = 0; i < appData.length; i++) {
        var newDiv = document.createElement("div");
        newDiv.style.cursor = "pointer";
        newDiv.style.marginBottom = "10px";
        newDiv.style.padding = "5px";
        newDiv.style.backgroundColor = "#eee";
        newDiv.style.borderRadius = "5px";
        
        newDiv.innerHTML = `<b>${appData[i].title}</b><br><small>${appData[i].date}</small>`;
        
        newDiv.addEventListener("click", function() {
            setAppContent(i);
        });
        
        sidebar.appendChild(newDiv);
    }
}

buildSidebar();
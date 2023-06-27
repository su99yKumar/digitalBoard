let optionCont = document.querySelector(".options-cont");
let toolCont = document.querySelector(".tools-cont");
let penciltoolCont = document.querySelector(".pencil-tool-cont");
let erasertoolCont = document.querySelector(".eraser-tool-cont");
let stickyCont = document.querySelector(".sticky-cont")
let pencil = document.querySelector(".pencil")
let eraser = document.querySelector(".eraser")
let sticky = document.querySelector(".sticky")
let upload = document.querySelector(".upload")


let optionsFlag = true;
let pencilFlag = false;
let eraserFlag = false;


//stickyCont.style.display = "none";

//true->tools show, false->hide tools
optionCont.addEventListener("click", (e) => {
    optionsFlag = !optionsFlag;
    if (optionsFlag) openTools();
    else closeTools();
});

function openTools() {
    let iconElem = optionCont.children[0];
    iconElem.classList.remove("fa-times");
    iconElem.classList.add("fa-bars");
    toolCont.style.display = "flex";
    //stickyCont.style.display = "block";
    // penciltoolCont.style.display="flex";
    // erasertoolCont.style.display="flex";
}

function closeTools() {
    let iconElem = optionCont.children[0];
    iconElem.classList.remove("fa-bars");
    iconElem.classList.add("fa-times");
    toolCont.style.display = "none";

    penciltoolCont.style.display = "none";
    erasertoolCont.style.display = "none";
    //
}


pencil.addEventListener("click", (e) => {
    //true-> show pecil totl, false->hide pecil tool
    pencilFlag = !pencilFlag
    if (pencilFlag) penciltoolCont.style.display = "block";
    else penciltoolCont.style.display = "none";
})

eraser.addEventListener("click", (e) => {
    //true-> show pecil totl, false->hide pecil tool
    eraserFlag = !eraserFlag
    if (eraserFlag) erasertoolCont.style.display = "flex";
    else erasertoolCont.style.display = "none";
})

sticky.addEventListener("click", (e) => {
    let stickyTemplateHtml = `
    <div class="header-cont">
    <div class="minimize"></div>
    <div class="remove"></div>
    </div>
    <div class="note-cont">
    <textarea spellcheck="false"></textarea> 
    </div>
   `;
   createSticky(stickyTemplateHtml);

});

function noteActions(minimize, remove, stickyCont) {
    remove.addEventListener("click", (e) => {
        stickyCont.remove();
    })
    minimize.addEventListener("click", (e) => {
        let noteCont = stickyCont.querySelector(".note-cont");
        let display = getComputedStyle(noteCont).getPropertyValue("display");
        if (display === "none") noteCont.style.display = "block";
        else noteCont.style.display = "none";
    })

}


upload.addEventListener("click", (e) => {
    //open file explorer
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file)

        let stickyTemplateHtml = `
        <div class="header-cont">
        <div class="minimize"></div>
        <div class="remove"></div>
        </div>
        <div class="note-cont">
        <img src="${url}"/> 
        </div>
        `;
        createSticky(stickyTemplateHtml)
    })
});


function createSticky(stickyTemplateHtml) {
    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class", "sticky-cont");
    stickyCont.innerHTML = stickyTemplateHtml
    document.body.appendChild(stickyCont);

    let minimize = stickyCont.querySelector(".minimize");
    let remove = stickyCont.querySelector(".remove");
    noteActions(minimize, remove, stickyCont);

    stickyCont.onmousedown = function (event) {
        dragAndDrop(stickyCont, event)
    };

    stickyCont.ondragstart = function () {
        return false;
    };
}




function dragAndDrop(element, event) {

    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;


    moveAt(event.pageX, event.pageY);

    // moves the element at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the element on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the element, remove unneeded handlers
    element.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };

}

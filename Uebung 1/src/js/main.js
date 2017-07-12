/**
 * Created by Tronico on 27.04.2017.
 */
// global variable
var ulElement;
var liElemTemplate;

// load js-file, if page ready
window.onload = () => {
    initGlobalVar();
    initView();
    initEventHandler();
};

//############################## function ##############################################
/**
 * initialize global variable
 */
function initGlobalVar() {
    ulElement = document.getElementsByTagName("ul")[0];
    liElemTemplate = ulElement.firstElementChild;
}

/**
 * initialize view
 */
function initView() {
    //remove template item from DOM 
    liElemTemplate.parentNode.removeChild(liElemTemplate);
    ulElement.setAttribute("style", "display: block");
    
    fillView();
}

/**
 * initialize Eventhandler
 */
function initEventHandler() {
    document.getElementById("viewButton").onclick = viewButtonHandle;
    document.getElementById("addButton").onclick = addButtonHandle;
    document.getElementById("refreshButton").onclick = refreshButtonHandle;
    ulElement.onclick = listElemHandle;
}

//############################### eventHandler ##########################################

/**
 * handler for change the view with faded in/out
 *
 * @param event is click event
 */
function viewButtonHandle(event) {
    var body = document.getElementById("body");
    var main = document.getElementById("main");

    main.classList.toggle("faded");
    main.addEventListener("transitionend", function toggleFade(){
        main.classList.toggle("faded");
        body.classList.toggle("tiles");
        main.removeEventListener("transitionend", toggleFade);
    });
}

/**
 * handler for click on list element (open a dialog)
 * if clicked list element, content is title
 * if clicked option menu of list element, content is title and image url
 *
 * @param event is click event
 */
function listElemHandle(event) {
    var currentElement = event.target;
    // is true, if you click option menu button of list element
    // else false
    var optionMenuIsClicked = currentElement.className.match("liElemMenu") !== null;
    var liElement = getLiElement(currentElement);

    if(liElement) {
        var liElementTitle = liElement.getElementsByTagName("h2")[0].textContent;
        var imageUrl = liElement.getElementsByClassName("liElemAutor")[0].textContent;

        if (optionMenuIsClicked) {
            //alert("Title: " + liElementTitle + "\nURL: " + imageUrl);
            var resConfirm = confirm("Delete the following image\n\nTitle: " + liElementTitle + "\nURL: " + imageUrl);
            if(resConfirm){
                ulElement.removeChild(liElement);
            };
            
        }
        else {
            alert("Title: " + liElementTitle);
        }
    }
}

/**
 * handler for append a new list element
 *
 * @param event is click event
 */
function addButtonHandle(event) {
    var randomInt = parseInt(Math.random() * 1000, 0);
    var currentDate = new Date().toLocaleDateString();
    var randomDate = (randomInt % 30 + 1) + "." + (randomInt % 12 + 1) +".2017";
    var imgSubUrl = "http://lorempixel.com/";
    var fileList = ["100/100", "100/200", "200/100", "250/150", "300/300"];

    var jasonItem = { name: "M" + ++ulElement.childElementCount,
                      owner: "lorempixel.com",
                      added: currentDate,
                      src: imgSubUrl + fileList[randomInt % 5] };

    ulElement.appendChild(getNewListItem(jasonItem));
}

/**
 * handler refreshed the view with all elements from database
 *
 * @param event is click event
 */
function refreshButtonHandle(event) {
    ulElement.innerHTML = "";
    fillView();
}

//################################## helper ###############################################

function getLiElement(elem){
    if(elem.tagName === "UL")return null;
    else if(elem.tagName === "LI")return elem;
    else if(elem.parentNode) return getLiElement(elem.parentNode);
    else return null;
}

function getNewListItem(item){
    var newListElement = liElemTemplate.cloneNode(true);

    newListElement.getElementsByClassName("preview")[0].setAttribute("style", "background-image: url('" + item.src + "')");
    newListElement.getElementsByTagName("h2")[0].textContent = item.name;
    newListElement.getElementsByClassName("liElemAutor")[0].textContent = item.owner;
    newListElement.getElementsByClassName("liElemDate")[0].textContent = item.added;
    newListElement.getElementsByClassName("liElemCount")[0].textContent = 0;

    return newListElement;
}

/**
 * fill the view with all elements from database
 *  
 */
function fillView(){
    xhr("GET", "./data/listitems.json", null, function(xhrobj){
        var items = JSON.parse(xhrobj.responseText);
        items.forEach(function(item){
            ulElement.appendChild(getNewListItem(item));
        });
    });
}
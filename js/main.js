/**
 * Created by Tronico on 27.04.2017.
 */
// load js-file, if page ready
window.onload = () => {
    initEventHandler();
};

//############################## function ##############################################

/**
 * initilize Eventhandler
 */
function initEventHandler() {
    document.getElementById("viewButton").onclick = viewButtonHandle;
    document.getElementsByTagName("ul")[0].onclick = listElemHandle;
    document.getElementById("addButton").onclick = addButtonHandle;
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
            alert("Title: " + liElementTitle + "\nURL: " + imageUrl);
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
    var ulElement = document.getElementsByTagName("ul")[0];
    var jasonItem = { Title: "M6",
                      Autor: "lorempixel.com",
                      Date: "02.05.2017",
                      src: "./img/lorempixel_200x100.jpg" }

    ulElement.appendChild(getNewListItem(jasonItem));
}

//################################## helper ###############################################

function getLiElement(elem){
    if(elem.tagName === "UL")return null;
    else if(elem.tagName === "LI")return elem;
    else if(elem.parentNode) return getLiElement(elem.parentNode);
    else return null;
}

function getNewListItem(item){
    var ulElement = document.getElementsByTagName("ul")[0];
    var newListElement = ulElement.firstElementChild.cloneNode(true);

    newListElement.getElementsByClassName("preview")[0].setAttribute("style", "background-image: url('" + item.src + "')");
    newListElement.getElementsByTagName("h2")[0].textContent = item.Title;
    newListElement.getElementsByClassName("liElemAutor")[0].textContent = item.Autor;
    newListElement.getElementsByClassName("liElemDate")[0].textContent = item.Date;
    newListElement.getElementsByClassName("liElemCount")[0].textContent = 0;

    return newListElement;
}

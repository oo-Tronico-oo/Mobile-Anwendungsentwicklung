/**
 * Created by Tronico on 27.04.2017.
 */
window.onload = (function () {
    var viewButton = document.getElementsByClassName("view")[0];
    var ulElement = document.getElementsByTagName("ul")[0];

    // ****** change the view with faded in/out ************
    viewButton.onclick = function() {
        var body = document.getElementsByTagName("body")[0];
        var main = document.getElementsByTagName("main")[0];

        main.classList.toggle("faded");
        main.addEventListener("transitionend", function toggleFade(){
            main.classList.toggle("faded");
            body.classList.toggle("tiles");
            main.removeEventListener("transitionend", toggleFade);
        });
    };

    /* click on list element -> open dialog
     * content is title of list element
     * if clicked item = menu of list element, content = title and url
     */
    ulElement.onclick = function(event){
        var currentElement = event.target;
        // is true, if you click menu button of list element
        var isClickedElementMenu = currentElement.className.match("liElemMenu") !== null;
        var liElement = getLiElement(currentElement);

        if(liElement) {
            var liElementTitle = liElement.getElementsByTagName("h2")[0].textContent;
            var imageUrl = liElement.getElementsByClassName("liElemAutor")[0].textContent;

            if (isClickedElementMenu) {
                alert("Title: " + liElementTitle + "\nURL: " + imageUrl);
            }
            else {
                alert("Title: " + liElementTitle);
            }
        }
        // else{
        //     alert("clicked element is not a list or list child");
        // }
    };

    function getLiElement(elem){
        if(elem.tagName === "UL")return null;
        else if(elem.tagName === "LI")return elem;
        else if(elem.parentNode) return getLiElement(elem.parentNode);
        else return null;
    }
});

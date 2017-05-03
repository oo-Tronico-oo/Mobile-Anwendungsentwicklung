/**
 * Created by Tronico on 27.04.2017.
 */
window.onload = initializeView;

function initializeView() {
    var body = document.getElementsByTagName("body");
    var viewButton = document.getElementsByClassName("view");

    viewButton[0].onclick = function() {
        body[0].classList.toggle("tiles");
    };
}

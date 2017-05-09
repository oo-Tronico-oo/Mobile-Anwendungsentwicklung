/**
 * Created by Tronico on 27.04.2017.
 */
window.onload = initializeView;

function initializeView() {
    var body = document.querySelector("body");
    var main = document.querySelector("main");
    var viewButton = document.getElementsByClassName("view");

    viewButton[0].onclick = function() {
        main.classList.toggle("faded");
        main.addEventListener("transitionend", function toggleFade(){
            main.classList.toggle("faded");
            body.classList.toggle("tiles");
            main.removeEventListener("transitionend", toggleFade);
        });
    };
}

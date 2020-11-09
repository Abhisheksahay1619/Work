window.onscroll = function () { myFunction(), myFunction1() };

var header = document.getElementById("mobile");
var header1 = document.getElementById("mobile_middle");

var sticky = header.offsetTop;
var sticky1 = header1.offsetTop;

function myFunction() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}
function myFunction1() {
    if (window.pageYOffset > sticky1) {
        header1.classList.add("mobile_sticky");
    } else {
        header1.classList.remove("mobile_sticky");
    }
}
$(document).ready(function () {
    $("#menu").click(function () {
        $("#mobile").toggleClass('show')
        $(".overlay").toggleClass('show_overlay')
    });
    $(".mobile_close").click(function () {
        $("#mobile").removeClass('show')
        $(".overlay").removeClass('show_overlay')
    });
    $(".overlay").click(function () {

        $(".overlay").removeClass('show_overlay')
        $("#mobile").removeClass('show')
    });
    $("#mobile_search").click(function () {

        $("#search_bar").toggleClass('show_search')
      
    });
});
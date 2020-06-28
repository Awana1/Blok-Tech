$(function () {
    $(".toggle").on("click", function () {
        if ($(".item").hasClass("active")) {
            $(".item").removeClass("active");
            $(this).find("a").html("<i class='fas fa-bars'></i>");
        } else {
            $(".item").addClass("active");
            $(this).find("a").html("<i class='fas fa-times'></i>");
        }
    });
});

setTimeout(function () {
    that.tick();
}, delta);


// Progressive Enhancement Form

function next_step1() {
    document.getElementById("first").style.display = "none";
    document.getElementById("second").style.display = "block";
    document.getElementById("labelSecond").style.color = "red";
}
// Function that executes on click of first previous button.
function prev_step1() {
    document.getElementById("first").style.display = "block";
    document.getElementById("second").style.display = "none";
    document.getElementById("labelFirst").style.color = "red";
    document.getElementById("labelSecond").style.color = "gray";
}
// Function that executes on click of second next button.
function next_step2() {
    document.getElementById("second").style.display = "none";
    document.getElementById("third").style.display = "block";
    document.getElementById("labelThird").style.color = "red";
}
// Function that executes on click of second previous button.
function prev_step2() {
    document.getElementById("third").style.display = "none";
    document.getElementById("second").style.display = "block";
    document.getElementById("labelSecond").style.color = "red";
    document.getElementById("labelThird").style.color = "gray";
}


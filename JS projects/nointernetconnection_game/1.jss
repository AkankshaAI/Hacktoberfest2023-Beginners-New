document.addEventListener("DOMContentLoaded", function () {
    document.body.addEventListener("click", jump);
});
var character = document.getElementById("character");
var block = document.getElementById("block");

function jump() {
    if (!character.classList.contains("element")) {
        character.classList.add("element");
        setTimeout(function () {
            character.classList.remove("element");
        }, 510); // This should match the animation duration (510ms)
    }
}

document.body.addEventListener("click", jump);
var checkDead = setInterval(function () {
    var characterTop =
        parseInt(window.getComputedStyle(character).getPropertyValue("top"));
}, 10);
var blockLeft = setInterval(function () {
    var characterTop =
        parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    if (blockLeft < -20 && blockLeft > 0 && characterTop >= -20) {
        block.style.animation = "none"
        block.style.display = "none"
        alert("failed")
    }
}, 10);
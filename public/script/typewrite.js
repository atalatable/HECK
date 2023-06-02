var command = document.querySelector(".command");
    [...document.querySelectorAll(":not(header footer) [data-command-text]")].forEach((el) => {
        var i = 0;
        var txt = el.dataset.commandText;
        var speed = 30;

        el.addEventListener("mouseenter", function () {
            clearTimeout(command.dataset.timeoutId);
            command.innerHTML = "";
            typeWriter(el, txt, speed, i);
        });

        el.addEventListener("mouseleave", function () {
            clearTimeout(command.dataset.timeoutId);
            command.innerHTML = "";
        });
});

function typeWriter(el, txt, speed, i) {
    if (i < txt.length && command.innerHTML != txt) {
        command.innerHTML += txt.charAt(i);
        i++;
        command.dataset.timeoutId = setTimeout(function () {
            typeWriter(el, txt, speed, i);
        }, speed);
    }
}
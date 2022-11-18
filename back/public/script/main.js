(function () {
    var command = document.querySelector(".command");
    [...document.querySelectorAll("* [data-command-text]")].forEach((el) => {
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

    var prevScroll = 0;
    window.addEventListener('scroll', (e) => {
        const deltaY = prevScroll - window.scrollY;
        if (window.scrollY > 64) { // size of header
            if (deltaY > 0) document.querySelector('header').classList.remove('hide');
            else document.querySelector('header').classList.add('hide');
        } else document.querySelector('header').classList.remove('hide');
        prevScroll = window.scrollY;
    });

    // Accordion trigger
    [...document.querySelectorAll('.accordion')].forEach(el => {
        el.querySelector('.item').addEventListener('click', _ => {
            var content = el.querySelector('.content');
            content.style.maxHeight = content.style.maxHeight == '' ? `${content.scrollHeight}px` : '';
            el.classList.toggle('open');
        })
    })

})();

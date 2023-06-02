(function () {
    // Command writer
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

    // Navbar fading
    var prevScroll = 0;
    window.addEventListener('scroll', (e) => {
        const deltaY = prevScroll - window.scrollY;
        if (window.scrollY > 64) { // size of header
            if (deltaY > 0) document.querySelector('header').classList.remove('hide');
            else document.querySelector('header').classList.add('hide');
        } else document.querySelector('header').classList.remove('hide');
        prevScroll = window.scrollY;
    });

   // Theme toggler
    document.querySelector("#theme-toggler").addEventListener('click', (e) => {
        const button = document.querySelector("#theme-toggler");

        button.children[0].classList.toggle('fa-sun');
        button.children[0].classList.toggle('fa-moon');

        if (window.localStorage.getItem("theme") === "dark") {
            document.body.classList.add("light");

            window.localStorage.setItem("theme", "light");
        } else {
            document.body.classList.remove("light");

            window.localStorage.setItem("theme", "dark");
        }
    })

    // Mobile Menu
    let mobileNav = document.getElementById('mobile-nav');
    document.getElementById('burger-menu').addEventListener('click', () => {
        mobileNav.classList.add('show');
        const newspaperSpinning = [
            { transform: 'translateX(-100%)' },
            { transform: 'translateX(0)' }
        ];

        [...document.querySelectorAll("#mobile-nav ul li")].forEach((el, i) => el.animate(newspaperSpinning, {
            duration: 1550+i*550,
            easing: 'cubic-bezier(.59,0,.37,.99)',
            fill: 'forwards'
        }))
    })
    document.getElementById('close-mobile-menu').addEventListener('click', () => {
        mobileNav.classList.remove('show');
    })

    /* Dark and light mode logic */
    
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: light)');

    toggleDarkTheme(prefersDark.matches);

    function toggleDarkTheme(shouldAdd) {
    document.body.classList.toggle('light', shouldAdd);
    }

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));

    // Add or remove the "dark" class based on if the media query matches

    if (!window.localStorage.getItem('theme')) { window.localStorage.setItem('theme', 'dark') }
    if (window.localStorage.getItem("theme") == "light") {
        document.body.classList.add("light");
        document.querySelector("#theme-toggler").children[0].classList.remove("fa-sun");
        document.querySelector("#theme-toggler").children[0].classList.add("fa-moon");
    }

})();
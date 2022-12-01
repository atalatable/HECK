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

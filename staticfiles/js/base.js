document.addEventListener('DOMContentLoaded', function () {
    const path = window.location.pathname;

    // Desktop navigation
    const navLinks = document.querySelectorAll('header nav ul li a');

    navLinks.forEach(function (link) {
        if (link.getAttribute('href') === path) {
            link.parentNode.classList.add('active');
        }
    });

    // Mobile navigation
    const hamburgerNavLinks = document.querySelectorAll('.content .hamburger-navbar nav ul li a');

    hamburgerNavLinks.forEach(function (link) {
        if (link.getAttribute('href') === path) {
            link.parentNode.classList.add('active');
        }
    });

    // Toggle hamburger menu
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const hamburgerNavbar = document.querySelector('.content .hamburger-navbar');
    const body = document.body;

    hamburgerMenu.addEventListener('click', function () {
        this.classList.toggle('active');
        hamburgerNavbar.classList.toggle('active');
        body.classList.toggle('active');
    });

    // Function to toggle active class based on screen width and hamburgerNavbar activity
    function toggleActiveClass() {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 900 && hamburgerNavbar.classList.contains('active')) {
            hamburgerMenu.classList.add('active');
            hamburgerNavbar.classList.add('active');
            body.classList.add('active');
        } else {
            hamburgerMenu.classList.remove('active');
            hamburgerNavbar.classList.remove('active');
            body.classList.remove('active');
        }
    }

    // Initial toggle based on screen width
    toggleActiveClass();

    // Event listener for window resize
    window.addEventListener('resize', toggleActiveClass);
});

document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-navigation');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            const isActive = mainNav.classList.toggle('active'); // Toggle and check if active
            menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            // Optional: Change hamburger icon to 'X' when open
            if (isActive) {
                menuToggle.innerHTML = '✕'; // Close icon
            } else {
                menuToggle.innerHTML = '☰'; // Hamburger icon
            }
        });
    }

    // --- Active Navigation Link Highlight (Improved) ---
    const navLinks = document.querySelectorAll('.main-navigation a');
    // Get the current page filename (e.g., "index.html", "for-business.html")
    // Handle potential trailing slash or default page redirection
    let currentPage = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
    if (currentPage === '' || currentPage === '/') {
        currentPage = 'index.html'; // Treat root as index.html
    }


    navLinks.forEach(link => {
        let linkPage = link.getAttribute('href');
        // Make sure linkPage is not null or undefined before processing
        if (linkPage) {
            linkPage = linkPage.substring(linkPage.lastIndexOf('/') + 1);
            if (linkPage === '') {
                linkPage = 'index.html'; // Treat empty href or '/' as index.html for comparison
            }

            // Check if the link's target page matches the current page
            if (linkPage === currentPage) {
                link.classList.add('active');
                // Optional: Add active class to parent li if needed for styling
                if(link.parentElement.tagName === 'LI') {
                   // link.parentElement.classList.add('active-parent');
                }
            } else {
                link.classList.remove('active');
                 if(link.parentElement.tagName === 'LI') {
                   // link.parentElement.classList.remove('active-parent');
                }
            }
        }
    });


    // --- Update Copyright Year ---
     const copyrightYearSpan = document.getElementById('copyright-year');
     if (copyrightYearSpan) {
         copyrightYearSpan.textContent = new Date().getFullYear(); // Display current year directly
     }


    // --- Console Logs ---
    console.log("JavaScript for Binatek site loaded.");
    console.log("Note: Advanced features require further development.");

});

// --- Smooth Scrolling for internal links (optional, keep if needed) ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function (e) {
         const targetId = this.getAttribute('href');
         // Check if the link is just a placeholder or has a valid target
         if (targetId && targetId !== '#') {
             // Try finding the element by ID
             const targetElement = document.getElementById(targetId.substring(1)); // Remove '#'
             if (targetElement) {
                 e.preventDefault(); // Prevent default jump
                 targetElement.scrollIntoView({
                     behavior: 'smooth',
                     block: 'start' // Scroll to the top of the target element
                 });
             } else {
                 console.warn(`Smooth scroll target not found: ${targetId}`);
             }
         }
     });
});
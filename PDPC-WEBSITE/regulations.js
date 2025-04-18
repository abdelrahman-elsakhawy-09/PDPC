document.addEventListener('DOMContentLoaded', function() {
    const sidebarLinks = document.querySelectorAll('.regulations-nav-list a.regulation-link');
    const contentPanes = document.querySelectorAll('.regulations-content-display .content-pane');
    const contentTitle = document.getElementById('regulation-content-title');

    // --- Basic Check ---
    // console.log('Sidebar Links Found:', sidebarLinks.length);
    // console.log('Content Panes Found:', contentPanes.length);
    // console.log('Content Title Element:', contentTitle);
    // --- End Basic Check ---


    if (sidebarLinks.length > 0 && contentPanes.length > 0 && contentTitle) {

        function switchContent(event) {
            event.preventDefault(); // Prevent default link behavior

            const clickedLink = event.currentTarget;
            const contentId = clickedLink.getAttribute('data-content-id');
            const targetPane = document.getElementById(contentId);

            // Update Title using clicked link's text content
            // We might need to remove the icon text if it was included, but it looks like icon is separate tag
            const linkText = clickedLink.textContent.trim() || clickedLink.innerText.trim();
            // Remove potential icon text if needed, or better, target a specific span inside 'a' if you structure it that way.
            // For now, we assume textContent is clean.
            contentTitle.textContent = linkText;

            // Update Active States
            sidebarLinks.forEach(link => link.classList.remove('selected')); // Use 'selected' class for sidebar links
            contentPanes.forEach(pane => pane.classList.remove('active')); // Use 'active' class for content panes

            clickedLink.classList.add('selected');
            if (targetPane) {
                targetPane.classList.add('active');
            } else {
                console.warn("Content pane not found for ID:", contentId);
                // Fallback: Show the first pane if target is missing
                const firstPane = document.querySelector('.regulations-content-display .content-pane');
                 if(firstPane) {
                     firstPane.classList.add('active');
                     // Update title to reflect the first item if fallback happens
                     const firstLink = document.querySelector('.regulations-nav-list a.regulation-link');
                     if(firstLink) {
                         contentTitle.textContent = firstLink.textContent.trim();
                         // Remove selected from all and add to first
                         sidebarLinks.forEach(link => link.classList.remove('selected'));
                         firstLink.classList.add('selected');
                     }
                 }
            }
        }

        // Add click listener to each sidebar link
        sidebarLinks.forEach(link => {
            link.addEventListener('click', switchContent);
        });

        console.log("Regulations page JS initialized.");

        // Ensure initial state matches HTML (first item selected/active)
         const initialActiveLink = document.querySelector('.regulations-nav-list a.regulation-link.selected');
         const initialContentId = initialActiveLink ? initialActiveLink.getAttribute('data-content-id') : null;
         const initialPane = initialContentId ? document.getElementById(initialContentId) : null;

         if (initialActiveLink && initialPane) {
             contentPanes.forEach(pane => pane.classList.remove('active')); // Hide all first
             initialPane.classList.add('active'); // Show the correct one
             contentTitle.textContent = initialActiveLink.textContent.trim(); // Set initial title
         } else {
             // Fallback if HTML state is missing
             const firstLink = document.querySelector('.regulations-nav-list a.regulation-link');
             const firstPane = document.querySelector('.regulations-content-display .content-pane');
              if (firstLink && firstPane) {
                  contentPanes.forEach(pane => pane.classList.remove('active'));
                  sidebarLinks.forEach(link => link.classList.remove('selected'));
                  firstLink.classList.add('selected');
                  firstPane.classList.add('active');
                  contentTitle.textContent = firstLink.textContent.trim();
              }
         }

    } else {
         console.warn("Required elements for regulations page JS not found.");
    }
});
/**
 * File: services.js
 * Description: Handles tab switching and deep linking for the services page.
 */

document.addEventListener('DOMContentLoaded', () => {

    // Get references to the necessary elements
    const serviceLinks = document.querySelectorAll('.service-link'); // All links in the sidebar
    const contentPanes = document.querySelectorAll('.content-pane');  // All content display areas
    const serviceContentTitle = document.getElementById('service-content-title'); // The main title h2 for the content area

    // Function to activate a specific tab/pane
    function activateTab(targetPaneId) {
        let activatedPane = null; // To keep track of the pane we activated

        // Find the link corresponding to the target pane ID
        const targetLink = document.querySelector(`.service-link[data-content-id="${targetPaneId}"]`);
        const targetPane = document.getElementById(targetPaneId);

        // Only proceed if both the link and the pane exist
        if (targetLink && targetPane) {

            // 1. Deactivate all links and panes first
            serviceLinks.forEach(link => link.classList.remove('active'));
            contentPanes.forEach(pane => pane.classList.remove('active'));

            // 2. Activate the target link and pane
            targetLink.classList.add('active');
            targetPane.classList.add('active');
            activatedPane = targetPane; // Store the activated pane

            // 3. Update the main content title (using the text from the activated link)
            if (serviceContentTitle) {
                serviceContentTitle.textContent = targetLink.textContent.trim();
            }
        } else {
            console.warn(`Could not find link or pane for ID: ${targetPaneId}`);
            // Optional: Activate the default/first tab if the target is invalid
            // if (serviceLinks.length > 0 && contentPanes.length > 0) {
            //     const defaultLink = serviceLinks[0];
            //     const defaultPaneId = defaultLink.getAttribute('data-content-id');
            //     activateTab(defaultPaneId); // Be careful to avoid infinite loops
            // }
        }
        return activatedPane; // Return the DOM element of the activated pane (or null)
    }

    // --- Event Listener for Sidebar Link Clicks ---
    serviceLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor link behavior
            const paneId = link.getAttribute('data-content-id');
            activateTab(paneId);
            // Optional: Update URL hash without scrolling/reloading (for bookmarking/history)
            // history.pushState(null, null, `#${paneId}`); // Uncomment carefully, might interfere with back button expectations
        });
    });

    // --- Handle Deep Linking (URL Hash) on Page Load ---
    function handleHash() {
        const hash = window.location.hash; // Get the hash from the URL (e.g., #content-consultation)

        if (hash) {
            // Remove the '#' symbol to get the ID
            const targetPaneId = hash.substring(1);

            // Activate the tab corresponding to the hash
            const activatedPaneElement = activateTab(targetPaneId);

            // If a pane was successfully activated, scroll it into view
            if (activatedPaneElement) {
                 // Use timeout to ensure rendering is complete before scrolling, especially after activation
                setTimeout(() => {
                    activatedPaneElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100); // Small delay (100ms) often helps
            }

        } else {
            // Optional: If there's no hash, ensure the default tab (marked 'active' in HTML) is correctly shown.
            // The activateTab function can handle this if called with the default ID,
            // or you can rely on the initial HTML state. Let's ensure the title matches the default active tab.
             const defaultActiveLink = document.querySelector('.service-link.active');
             if(defaultActiveLink && serviceContentTitle){
                serviceContentTitle.textContent = defaultActiveLink.textContent.trim();
             }
        }
    }

    // Run the hash handler function once the page is loaded
    handleHash();

    // Optional: If you want the page to react if the hash changes *while* the user is on the page
    // (e.g., using browser back/forward buttons after manual hash changes), uncomment the following line:
    // window.addEventListener('hashchange', handleHash);

}); // End DOMContentLoaded
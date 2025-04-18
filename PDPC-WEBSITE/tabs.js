document.addEventListener('DOMContentLoaded', function() {
    const tabLinks = document.querySelectorAll('.tabs-navigation a.tab-link');
    const tabPanes = document.querySelectorAll('.tabs-content .tab-pane');

    if (tabLinks.length > 0 && tabPanes.length > 0) {
        // Function to switch tabs
        function switchTab(event) {
            event.preventDefault(); // Prevent default anchor link behavior

            const clickedTab = event.target;
            const targetTabId = clickedTab.getAttribute('data-tab'); // Get the ID of the target pane

            // Remove 'active' class from all links and panes
            tabLinks.forEach(link => link.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add 'active' class to the clicked link
            clickedTab.classList.add('active');

            // Add 'active' class to the corresponding pane
            const targetPane = document.getElementById(targetTabId);
            if (targetPane) {
                targetPane.classList.add('active');
            } else {
                console.error("Target tab pane not found:", targetTabId);
            }
        }

        // Add click event listener to each tab link
        tabLinks.forEach(link => {
            link.addEventListener('click', switchTab);
        });
        console.log("Tabs functionality initialized.");
    } else {
        console.log("Tab elements not found for initialization.");
    }
});
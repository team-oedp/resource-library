// Hack to immediately hide filetree note icons to prevent FOUC
(function() {
  'use strict';
  
  // Function to hide only sticky note icons in filetree
  function hideFiletreeIcons() {
    const filetreeSidebar = document.querySelector('.filetree-sidebar');
    if (filetreeSidebar) {
      // Hide only sticky note icon elements, not chevrons
      const stickyNoteIcons = filetreeSidebar.querySelectorAll('i[icon-name="sticky-note"]');
      stickyNoteIcons.forEach(icon => {
        icon.style.display = 'none';
        icon.style.visibility = 'hidden';
        icon.style.opacity = '0';
        icon.style.width = '0';
        icon.style.height = '0';
        icon.style.margin = '0';
        icon.style.padding = '0';
      });
    }
  }
  
  // Run immediately
  hideFiletreeIcons();
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideFiletreeIcons);
  }
  
  // Run after a short delay to catch any dynamically loaded content
  setTimeout(hideFiletreeIcons, 100);
  setTimeout(hideFiletreeIcons, 500);
  
  // Run when the page is fully loaded
  window.addEventListener('load', hideFiletreeIcons);
  
  // Run on any navigation changes (for SPA-like behavior)
  window.addEventListener('popstate', hideFiletreeIcons);
  
  // Observer to catch dynamically added content
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          hideFiletreeIcons();
        }
      });
    });
    
    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
})();

// Gestion des articles (front-end), comme "dateFormater()".

/**
 * TOAST SYSTEM OVERVIEW
 * =====================
 * 
 * Toast notifications appear in bottom-left (desktop) or bottom-center (mobile)
 * They auto-disappear after 8 seconds and slide up/down with animations
 * Only one toast visible at a time (new ones replace existing ones)
 * 
 * USAGE SCENARIOS:
 * 1. Article deleted from index (immediate toast)
 * 2. Article deleted from article view (toast after redirect via sessionStorage)
 * 3. TODO: Article creation cancelled
 * 4. TODO: Article edition cancelled
 * 5. TODO: Article protected during edit
 * 
 * TECHNICAL FLOW:
 * - showToast() creates and animates the toast
 * - hideToast() handles disappearance animation
 * - sessionStorage bridges toast messages across page redirects
 */

document.addEventListener('DOMContentLoaded', function() {
    // ===============================================
    // CROSS-PAGE TOAST MESSAGING SYSTEM
    // ===============================================
    // Problem: When deleting an article from article view, we redirect to index
    // but lose the ability to show a success toast (page reload = lost state)
    // 
    // Solution: Use sessionStorage to "bridge" the message across the redirect
    // sessionStorage = browser storage that survives page reloads
    // Key 'showToast' = custom identifier WE CREATE before redirects
    // (see article deletion from article view → sessionStorage.setItem('showToast', message))

    const toastMessage = sessionStorage.getItem('showToast');
    if (toastMessage) {
        // Remove from storage immediately to prevent duplicate toasts
        // (if user refreshes page, toast shouldn't appear again)
        sessionStorage.removeItem('showToast');
        // @ts-ignore - Function accepts 1-3 parameters, TypeScript inocrrectly requires all 3
        showToast(toastMessage);
    }

    // Find delete buttons
    const deleteButtons = document.querySelectorAll('[data-action="delete"], [data-action="delete-from-index"]');

    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const articleId = this.getAttribute('data-id');

            // DELETE request to /articles/:id (`fetch()` sends a message to the server)
            if (this.getAttribute('data-action') === 'delete-from-index') {

                // INDEX CASE: Dynamic deletion without page reload
                // Add ?from=index to URL so server knows to respond with JSON (for DOM manipulation)
                // instead of redirect (which would reload the entire page)
                fetch(`/articles/${articleId}?from=index`, {method: 'DELETE'})

                // Convert JSON response to JS object from server
                .then(response => response.json()) // Convert text response to JS object
                .then(data => { // data = { success: true/false, message: "..." }

                    if (data.success) {
                        // Remove from the DOM, no redirection
                        document.querySelector(`[data-id="${articleId}"]`)?.closest('.article-item')?.remove();
                        // @ts-ignore - Function accepts 1-3 parameters, TypeScript inocrrectly requires all 3
                        showToast("Article deleted.");
                    } else {
                        console.error('Error deleting article:', data.message);
                    }
                });

            } else {
                // ARTICLE VIEW CASE: Also use JSON response instead of server redirect
                fetch(`/articles/${articleId}?from=article`, {method: 'DELETE'})
                
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Store info in sessionStorage for after redirection
                        sessionStorage.setItem('showToast', 'Article deleted.');
                        // Client-side redirect with toast
                        window.location.href = '/';
                    } else {
                        console.error('Error deleting article:', data.message);
                    }
                });
            } // End of else
        }); // End of click event (eventListener)
    }); // End of deleteButtons
}); // End of DOMContentLoaded

// function dateFormatter(date) { // TODO
// }

// Automatic Ping every 5 seconds
setInterval(() => {
    fetch('/api/ping');
}, 5000);



// ===============================================
// TOAST SYSTEM FUNCTIONS
// ===============================================

/**
 * Display a toast notification with optional action button
 * @param {string} message - Text to display in toast
 * @param {string|null} actionText - Text for action button (e.g., "Undo")
 * @param {Function|null} actionCallback - Function to call when action clicked
 */
function showToast(message, actionText, actionCallback) {
    const container = document.getElementById('toast-container');

    // Clear any existing toasts (no stacking, Gmail-style behavior)
    if (container) container.innerHTML = '';

    // Create new toast element with message
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = message;

    // Add clickable action link if provided (e.g., "Undo" functionality)
    if (actionText && actionCallback && typeof actionCallback === 'function') {
        const actionLink = document.createElement('a');
        actionLink.href = '#';
        actionLink.textContent = actionText;
        actionLink.onclick = (e) => {
            e.preventDefault();
            actionCallback(); // Execute the undo/cancel action
            hideToast(toast);
        };
        toast.appendChild(actionLink);
    }

    // Display toast with slide-up animation
    if (container) {
        container.appendChild(toast);

        // Trigger CSS animation (opacity 0 -> 1, translateY 50px -> 0)
        setTimeout(() => toast.classList.add('show'), 10);

        // Auto-hide after 8 seconds (Gmail timing)
        setTimeout(() => hideToast(toast), 8000);
    }
}

/**
 * Hide toast with slide-down animation then remove from DOM
 * @param {HTMLElement} toast - The toast element to hide
 */
function hideToast(toast) {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 250); // Remove after animation
}
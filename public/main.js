// Gestion des articles (front-end), comme "dateFormater()".

document.addEventListener('DOMContentLoaded', function() {
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
                        // TODO: showToast with success message and link to undo
                    } else {
                        console.error('Error deleting article:', data.message);
                        // TODO: showToast(data.message)
                    }
                });

            } else {
                fetch(`/articles/${articleId}`, {
                    method: 'DELETE'
                })
                .then(() => {
                    // Redirect to home page
                    window.location.href = '/';
                }); // End of fetch
            } // End of else
        }); // End of click event (eventListener)
    }); // End of deleteButtons
}); // End of DOMContentLoaded

function dateFormatter(date) {

}

function showToast(message) {
    
}
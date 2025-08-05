// Gestion des articles (front-end), comme "dateFormater()".

document.addEventListener('DOMContentLoaded', function() {
    // Find delete buttons
    const deleteButtons = document.querySelectorAll('[data-action="delete"]');

    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const articleId = this.getAttribute('data-id');

            // DELETE request to /articles/:id
            fetch(`/articles/${articleId}`, {
                method: 'DELETE'
            })
            .then(() => {
                // Redirect to home page
                window.location.href = '/';
            }); // End of fetch
        }); // End of click
    }); // End of deleteButtons

}); // End of DOMContentLoaded

function dateFormatter(date) {

}

function showToast(message) {
    
}
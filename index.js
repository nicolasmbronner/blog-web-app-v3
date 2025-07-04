/**
 * ROUTES--------------------------------------------
 * 
 * GET /                      -> index page
 * GET /articles/:id          -> read article
 * GET /form/new              -> new article form
 * GET /form/:id              -> edit article form
 * GET /articles/:id/status   -> check article status
 * 
 * POST /articles             -> create article
 * POST /articles/:id         -> update article
 * 
 * DELETE /articles/:id       -> delete article
 */


// IMPORTS------------------------------------------------
import express from 'express';
const app = express();
const port = 3000;

// Static files
app.use(express.static('public'));

// Main page
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Read article
app.get('/articles/:id', (req, res) => {
    res.send('This is an article');
});

// New article form
app.get('/form/new', (req, res) => {
    res.send('This is a form');
});

// Edit article form
app.get('/form/:id', (req, res) => {
    res.send('This is a filled form do edit');
});

// TODO Check article status > is it really necessary or pertinent?

// TODO Create article > Is the adress not missing the id of the article created?
app.post('/articles', (req, res) => {
    res.send('Article created');
});

// Update article
app.post('/articles/:id', (req, res) => {
    res.send('Article updated');
});

// TODO Delete article > Check article status here before deleting ? (if it's working, no need for GET /articles/:id/status)
app.delete('/articles/:id', (req, res) => {
    // if article status is not locked, delete it
    res.send('Article deleted');
})


// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

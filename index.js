/**
 * ROUTES--------------------------------------------
 * 
 * GET /                      -> index page
 * GET /articles/:id          -> read article
 * GET /form/new              -> new article form
 * GET /form/:id              -> edit article form
 * 
 * POST /articles             -> create article
 * POST /articles/:id         -> update article
 * 
 * DELETE /articles/:id       -> delete article if status is not locked
 */


// IMPORTS------------------------------------------------
import express from 'express';
import bodyParser from 'body-parser';
import { resetBlog, getArticles, getArticleById } from './articles.js';

// CONFIG------------------------------------------------
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


resetBlog();

// ROUTES------------------------------------------------
// Index page
app.get('/', (req, res) => {
    const articles = getArticles();
    res.render('index.ejs', { articlesIndex: articles });
    // TODO: nice list of articles
});

// Read article
app.get('/articles/:id', (req, res) => {
    const article = getArticleById(req.params.id);

    if (!article) {
        // Article not found -> 404 page
        res.render('404.ejs');
    } else {
        // Article found, render it
        res.render('article.ejs', { article: article });
    }
});

// New article form
app.get('/form/new', (req, res) => {
    res.render('form.ejs');
    // TODO: create form
    // TODO: collect form data from article object variable for editing
});

// Edit article form
app.get('/form/:id', (req, res) => {
    res.render('form.ejs');
    // TODO: pass article id to form
});

// Create article
app.post('/articles', (req, res) => {
    res.send('Article created');
    // include the id of the new article
});

// Update article
app.post('/articles/:id', (req, res) => {
    res.send('Article updated');
});

// Delete article > Check article status before deleting
app.delete('/articles/:id', (req, res) => {
    // if article status is not locked, delete it
    res.send('Article deleted');
})


// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

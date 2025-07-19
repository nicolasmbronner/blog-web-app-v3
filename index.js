// ============================================
// IMPORTS
// ============================================
import express from 'express';
import bodyParser from 'body-parser';
import { resetBlog, getArticles, getArticleById } from './articles.js';


// ============================================
// CONFIG
// ============================================
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

resetBlog();


// ============================================
// ROUTES
// ============================================

/**
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


// INDEX PAGE ─────────────────────────────────
app.get('/', (_req, res) => {
    const articles = getArticles();
    res.render('index.ejs', { articlesIndex: articles });
    // TODO: date formatter
});


// READ ARTICLE ───────────────────────────────
app.get('/articles/:id', (req, res) => {
    const article = getArticleById(req.params.id);

    if (!article) {
        res.render('404.ejs');
    } else {
        // article.ejs needs article.title, article.date and article.content
        res.render('article.ejs', { article: article });
    }
});


// NEW ARTICLE FORM ───────────────────────────
app.get('/form/new', (req, res) => {
    res.render('form.ejs');
    // TODO: create form. if editing, pass article title and content
});


// EDIT ARTICLE FORM ──────────────────────────
app.get('/form/:id', (req, res) => {
    res.render('form.ejs');
    // TODO: pass article id to form
});


// TODO: CREATE ARTICLE ─────────────────────────────
app.post('/articles', (req, res) => {
    // include the id of the new article
    res.send('Article created');
});


// TODO: UPDATE ARTICLE ─────────────────────────────
app.post('/articles/:id', (req, res) => {
    res.send('Article updated');
});


// TODO: DELETE ARTICLE ─────────────────────────────
app.delete('/articles/:id', (req, res) => {
    // if article status is not locked, delete it
    res.send('Article deleted');
})


// ============================================
// START SERVER
// ============================================
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

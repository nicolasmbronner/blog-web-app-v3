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
import { resetBlog, getArticles, getArticlesLength, getArticleById, createArticle } from './articles.js';



// CONFIG------------------------------------------------
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

resetBlog();



// ROUTES------------------------------------------------
// Index page
app.get('/', (req, res) => {
    const articles = getArticles(); // TODO: reverse list of articles
    res.render('index.ejs', { articlesIndex: articles });
    // TODO: nice list of articles
});

// Read article
app.get('/articles/:id', (req, res) => {
    const article = getArticleById(req.params.id);

    if (!article) {
        res.render('404.ejs');
    } else {
        res.render('article.ejs', { article: article });
    }
});

// New article form
app.get('/form/new', (req, res) => {

    res.render('form.ejs', {
        article: { id: null, title: '', content: '' }
    });
});

// Edit article form
app.get('/form/:id', (req, res) => {
    const article = getArticleById(req.params.id);

    if (!article) {
        res.render('404.ejs');
    } else {
        res.render('form.ejs', { article: article });
    }
});

// Post New Article
app.post('/articles', (req, res) => {
    const newArticle = {
        id: getArticlesLength() + 1,
        title: req.body.title,
        date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        content: req.body.content,
        locked: false
    };
    createArticle(newArticle);
    res.redirect(`/articles/${newArticle.id}`);
});

// TODO: Update article
app.post('/articles/:id', (req, res) => {
    res.send('Article updated');
    console.log(req.body.title);
    console.log(req.body.content);
    console.log(req.params.id);
});

// TODO: Delete article > Check article status before deleting
app.delete('/articles/:id', (req, res) => {
    // if article status is not locked, delete it
    res.send('Article deleted');
})


// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

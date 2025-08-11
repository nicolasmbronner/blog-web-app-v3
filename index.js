/**
 * ROUTES--------------------------------------------------------------
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
 *
 * 
 * 
 * COMPLETE TIMELINE: ARTICLE DELETION FROM INDEX PAGE------------------
 * ┌─ 1. USER CLICKS DELETE BUTTON 🗑️ (index.ejs)
 * │   └─ <button data-action="delete-from-index" data-id="123">🗑️</button>
 * │
 * ┌─ 2. JAVASCRIPT DETECTS THE CLICK (main.js)
 * │   ├─ Reads data-action = "delete-from-index"
 * │   ├─ Reads data-id = "123" 
 * │   └─ Decides: "This is from index, no redirect needed!"
 * │
 * ┌─ 3. FETCH TO SERVER (main.js)
 * │   ├─ URL: http://localhost:3000/articles/123?from=index
 * │   ├─ Method: DELETE
 * │   └─ Message to server: "Delete article 123, I'm from index page"
 * │
 * ┌─ 4. SERVER RECEIVES REQUEST (index.js)
 * │   ├─ Route: app.delete('/articles/:id')
 * │   ├─ req.params.id = "123"
 * │   ├─ req.query.from = "index"
 * │   └─ Decides: "OK, request from index page"
 * │
 * ┌─ 5. BUSINESS LOGIC (articles.js)
 * │   ├─ getArticleById(123) → finds the article
 * │   ├─ deleteArticle(123) → moves to undoBuffer
 * │   └─ Article removed from articles[] array
 * │
 * ┌─ 6. SERVER RESPONDS DIFFERENTLY (index.js)
 * │   ├─ Condition: if (req.query.from === 'index')
 * │   ├─ Response: res.json({ success: true })
 * │   └─ No redirect! (unlike article page)
 * │
 * ┌─ 7. FETCH RECEIVES RESPONSE (main.js)
 * │   ├─ response.json() converts JSON text to JS object
 * │   ├─ data = { success: true }
 * │   └─ Condition: if (data.success) → TRUE
 * │
 * ┌─ 8. DOM MANIPULATION (main.js)
 * │   ├─ document.querySelector('[data-id="123"]')
 * │   ├─ .closest('.article-item') → finds the <li>
 * │   ├─ .remove() → removes visually
 * │   └─ RESULT: Article disappears without page reload!
*/



// IMPORTS------------------------------------------------
import express from 'express';
import bodyParser from 'body-parser';
import { resetBlog,
         getArticles,
         getArticlesLength,
         getArticleById,
         createArticle,
         deleteArticle
        } from './articles.js';



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

// Update article
app.post('/articles/:id', (req, res) => {
    const article = getArticleById(req.params.id);

    if (!article) {
        res.render('404.ejs');
    } else {
        article.title = req.body.title;
        article.content = req.body.content;
        res.redirect(`/articles/${article.id}`);
    }
});

// Delete article
app.delete('/articles/:id', (req, res) => {
    const article = getArticleById(req.params.id);

    if (!article) {
        res.render('404.ejs');
    } else {
        deleteArticle(req.params.id);

        // Respond differently based on request origin
        if (req.query.from === 'index') {
            // INDEX CASE: Send JSON for client-side DOM manipulation
            res.json({ success: true });
        } else {
            res.redirect('/');
        }
    }
})

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

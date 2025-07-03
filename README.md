# Blog Web Application

A modern blog web app built using Node.js, Express.js and EJS.

## Routes

```
 GET /                      -> index page
 GET /articles/:id          -> read article
 GET /form/new              -> new article form
 GET /form/:id              -> edit article form
 GET /articles/:id/status   -> check article status
 
 POST /articles             -> create article
 POST /articles/:id         -> update article
 
 DELETE /articles/:id       -> delete article
```

## Project Structure

```
blog-app/
├── index.js              # Main Express Server
├── package.json          # Configuration npm
├── README.md             # Documentation
├── static/               # Static files
│   ├── css/
│   │   └── styles.css    # Styles CSS
│   └── js/
│       └── main.js       # Client side JavaScript
└── views/                # EJS Templates
    ├── header.ejs        # Shared header
    ├── footer.ejs        # Shared footer
    ├── index.ejs         # Index blog page
    ├── article.ejs       # Article reading
    ├── form.ejs          # Creation / Edition form
    └── 404.ejs           # Error page 404
```

## Features

- ✅ Création d'articles avec formulaire dédié
- ✅ Visualisation des articles sur la page d'accueil  
- ✅ Modification et suppression d'articles
- ✅ Interface responsive et moderne
- ✅ Animations de suppression
- ✅ Toasts d'information à la Gmail
- ✅ Dates intelligentes
- ✅ Protection des articles en cours d'édition
- ✅ Réinitialisation automatique après inactivité

## Developpement

**Philosophy** : "Good Enough Quality" - harmony and balance, not perfection nor over-engineering.

---

## Project Description

The goal of this project is to create a Blog Web application using Node.js, Express.js, and EJS. The application will allow users to create and view blog posts. Posts will not be persistent between sessions, and no database will be used in this version of the application. Styling will be an important aspect of the project to ensure an excellent user experience.

### Deliverables

- A Node project for website functionality
- Including at least one EJS file for website structure
- Including at least one CSS file for website styling

### Features

1. **Article Creation**: Users must be able to create new articles.
2. **Article Viewing**: The home page must allow users to see all their articles.
3. **Article Modification / Deletion**: Users must be able to modify and delete articles as needed.
4. **Styling**: The application must be well-styled and responsive, ensuring a good user experience on desktop and mobile.

### Technical Requirements

1. **Node.js & Express.js**: The application will be a web server built with Node.js and Express.js. Express.js will handle routing and middleware.
2. **EJS**: EJS will be used as the template engine to generate dynamic HTML based on application state.

### Planning

**Hour 0: Planning**
Gather content and design ideas, create wireframes and mockups. Plan how the application will work, what routes might be needed, and what pages need to be created.

**Hour 1: Configuration**
Set up the project repository, initialize the Node.js application (`npm init -y`), and install necessary dependencies (Express.js, EJS).

Create the application structure, including routes, views, and static files.

Configure the Express.js server and define necessary routes.

**Hours 2-3: Feature Implementation**
Implement article creation function. This includes creating the form on its own page (original instructions were to place it on the home page) and handling form submission on the server.

Implement article viewing function. This includes displaying all articles on the home page.

Implement article modification function. This includes using a form to load existing blog article and allow user to modify and save it.

Implement deletion function. This allows user to click a button and delete the article from the home page.

Test the application to ensure article creation and viewing work correctly.

**Hours 4-5: Styling and Finishing**
Style the application. This includes creating a CSS file, linking it to EJS templates, and writing CSS or using Bootstrap / Flexbox / Grid to style the application.

Test the application on different devices and browsers to ensure styling works correctly.

Fix any bugs or issues that arose during testing.

## Pragmatic Development

1. **No Broken Windows**: No software rot. Comment code well to find my way around even after 6 months away.
2. **Good Enough Quality**: Unlike versions 1 and 2, aim for a "passable" version (we could say "harmonious" or "balanced"), but not perfect.

## Considerations for Project Originality

1. **Prototype all new features**, especially those where I have no implementation experience. Always look for the simplest and most elegant way, not perfect.
2. **Data resets when no one is connected to the blog**, after 20 seconds of inactivity (reset blog article variables). See [this discussion thread with Claude, especially the end](https://claude.ai/chat/aa971d23-3644-48f1-ac44-eaa1dd91b7bf).
3. When on the home page and deleting an article, **an animation is played so you can see the article disappear**. [See this functional prototype](https://codepen.io/Nanodatron/pen/dPyvryX).
4. **Gmail-style toasts** appear when deleting an article, when canceling article creation, when canceling article editing (same prototype 👆🏻), but also when trying to delete an article being edited (it's protected during editing). This allows the user to cancel their last action (except for the protected article warning).
5. **Dates display intelligently** (same prototype👆🏻)
6. **Not found** articles display an elegant page with a return arrow to the home page. The project doesn't use websocket, so if someone deletes an article, we only see it by reloading the home page, so if we click on the deleted article, whether to read or edit it, the 404 page displays. If we want to delete an already deleted article, the animation is played, for the pleasure of the eyes.
7. **Articles being edited are protected** and cannot be deleted by another user during editing. A toast displays to indicate to the user that it's impossible to delete the article during its editing by another user. [See this discussion thread with Claude](https://claude.ai/chat/26cc7e36-a1b3-4479-ac00-6933c2bec52d).
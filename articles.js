const staticArticles = [
    {
        id: 1,
        title: "Bodhichitta",
        date: "2024-03-23",
        content: "Need to check on human, ave not seen in an hour might be dead oh look, human is alive, hiss at human, feed me. Warm up laptop with butt lick butt fart rainbows until owner yells pee in litter box hiss at cats poop on the floor, break a planter, sprint, eat own hair, vomit hair, hiss, chirp at birds, eat a squirrel, hide from fireworks, lick toe beans, attack christmas tree but show belly.",
        locked: false
    },
    {
        id: 2,
        title: "Smile",
        date: "2024-03-28",
        content: "Need to check on human, ave not seen in an hour might be dead oh look, human is alive, hiss at human, feed me. Warm up laptop with butt lick butt fart rainbows until owner yells pee in litter box hiss at cats poop on the floor, break a planter, sprint, eat own hair, vomit hair, hiss, chirp at birds, eat a squirrel, hide from fireworks, lick toe beans, attack christmas tree but show belly.",
        locked: false
    },
    {
        id: 3,
        title: "Walking meditation",
        date: "2024-05-13",
        content: "Need to check on human, ave not seen in an hour might be dead oh look, human is alive, hiss at human, feed me. Warm up laptop with butt lick butt fart rainbows until owner yells pee in litter box hiss at cats poop on the floor, break a planter, sprint, eat own hair, vomit hair, hiss, chirp at birds, eat a squirrel, hide from fireworks, lick toe beans, attack christmas tree but show belly.",
        locked: false
    }
]

let articles = [ ];

export function getArticles() {
    return articles;
}

export function resetBlog() {
    articles = [...staticArticles];
    console.log('Blog reset!');
}

export function getArticleById(id) {
    return articles.find(article => article.id === parseInt(id));
}

export function createArticle(title, content) {

}

export function deleteArticle(id) {
    
}

// === TEST FUNCTION - À SUPPRIMER APRÈS TEST GITHUB WORKFLOW ===
export function testBranchFunction() {
    console.log('🧪 Test branch workflow - cette fonction sera supprimée après le merge');
    return 'Test réussi !';
}
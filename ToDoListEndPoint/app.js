const express = require('express');
const app = express();        // Instanciation d'une application express
const path = require("path"); // inclusion d'express
const expressLayouts = require('express-ejs-layouts'); // inclusion express Layout
app.use(express.static(path.join(__dirname, 'public')));
// Definition moteur de rendu
app.set('view engine', 'ejs');
// Declaration dossier des vues
app.set('views', path.join(__dirname, 'views'));
//middleware
app.use(expressLayouts);
//layout par defaut
app.set('layout', '../views/layouts/layout');



// Middleware TRIGGER par requete
app.use((requete,reponse, next) => {
    const now = new Date().toDateString();
    console.log(`${now} := Une requete ${requete.method} a est arrivee.`);
    next();
});
// Route TRIGGER GET
app.get("/", (requete, reponse) =>{
    reponse.render('pages/home');
});
// Route TRIGGER GET => about
app.get("/about", (requete, reponse) =>{
    reponse.render('pages/about');
});
//ROUTAGE
app.get("/research", (req, reponse) => {
    reponse.render('pages/research');
    //res.send("<h1>Travaux de Recherche</h1>");
});

app.get('/teaching', (req, reponse) => {
    reponse.render('pages/teaching');
    //res.send('<h1>Enseignements</h1>') ;
});

app.get('/teaching/javascript', (req, reponse) => {
    reponse.render('pages/teaching/javascript');
    //res.send('<h1>Cours de JavaScript</h1>') ;
});

app.get('/teaching/php', (req, reponse) => {
    reponse.render('pages/teaching/php');
    //res.send('<h1>Cours de PHP</h1>') ;
});

app.get('/teaching/node', (req, reponse) => {
    reponse.render('pages/teaching/node');
    //res.send('<h1>Introduction à Node.js</h1>') ;
});

app.get('/teaching/node/express', (req, reponse) => {
    reponse.render('pages/teaching/node/express');
    //res.send('<h1>Cours sur le framework Express</h1>') ;
});
// Route TRIGGER GET => autres
app.get("*", (requete, reponse) =>{
    reponse.redirect('/');
});
// Exportation de notre application express
module.exports = app;
const express = require('express');
const app = express();        // Instanciation d'une application express
const path = require("path"); // inclusion d'express

app.use(express.static(path.join(__dirname, 'public')));
// Definition moteur de rendu
app.set('view engine', 'ejs');
// Declaration dossier des vues
app.set('views', path.join(__dirname, 'views'));
// Traitement
app.use((requete, reponse) => {
    // Demande Rendu EJS
    reponse.render('pages/home', {utilisateur: 'Philippe'});
});

// Exportation de notre application express
module.exports = app;

// Définition du n° de port sur lequel le serveur va écouter
// (ce sera la valeur système process.env.PORT si elle existe, 3000 sinon)
const port = process.env.PORT || 3000

// Inclusion du module prédéfini de Node.js permettant d'exécuter un serveur http
const http = require('http');
// Inclusion d'Express
const app = require('./app');
// Mise en oeuvre : on délègue la gestion des requetes a Express
const server = http.createServer(app);

// Démarrage de l'écoute des requêtes sur le port indiqué
server.listen(port,()=>{
    console.log(`Le server écoute sur http://127.0.01:${port}/`);
})

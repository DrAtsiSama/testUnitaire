const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const server = require('http').Server(app);
const port = 3000;
const helmet = require('helmet');

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((requete, reponse, next) => {
    reponse.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    reponse.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    reponse.setHeader('Access-Control-Allow-Headers', 'X-Request-With, Content-Type, Accept');
})

app.options('*', function(requete, reponse) {
    reponse.send(200);
});

server.listen(port, (err) => {
    if(err) throw err;
    console.log("END POINT NODE");
});


app.get('/', (erreur, reponse) => {
    reponse.status(200);
    reponse.json({working: true});
    reponse.end();
});

app.put('/', (erreur, reponse) => {
    reponse.status(200);
    reponse.send("WORKING");
    reponse.end();
});

app.post('/', (erreur, reponse) => {
    reponse.status(200);
    reponse.send("WORK ING");
    reponse.end();
});

module.exports = server;

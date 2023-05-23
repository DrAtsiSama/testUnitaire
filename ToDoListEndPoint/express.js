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
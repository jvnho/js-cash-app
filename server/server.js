const express = require('express')
const app = express()
const json = require('../catalogue.json');

app.get("/datas/", (request, response) => {
    response.send(json);
});

app.listen(5000)
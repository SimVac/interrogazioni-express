const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');

const { data } = require("./data.js");


const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render(path.join(__dirname, './templates/index.ejs'), {
        "materie": data.materie
    });
});

app.get("/materia/:materia", (req, res) => {
    let materia = req.params["materia"];
    if (materia in data.materie)
        res.render(path.join(__dirname, './templates/materia.ejs'), {
            "materia": data.materie[materia]
        });
    else
        res.render(path.join(__dirname, './templates/404.ejs'));
})

app.get("/data", (req, res) => {
    res.send(data);
})

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
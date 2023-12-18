const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const fs = require('fs')
const { data } = require("./data.js");
const session = require('express-session');
const GitHub = require('github-api');

const app = express();
const port = process.env.PORT || 80;
app.use( express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.set('view engine', 'ejs');


app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

function passwordProtected(req, res, next) {
    if (req.session.password === 'passw0rd') {
        next();
    } else {
        res.redirect('/login');
    }
}

app.post('/login', (req, res) => {
    if (req.body.password === 'passw0rd') {
        req.session.password = req.body.password;
        res.redirect('/admin');
    } else {
        res.send('Incorrect Password! <a href="/login">Try again</a>');
    }
});

// Route for the login page
app.get('/login', (req, res) => {
    //res.send('<form action="/login" method="POST"><input type="password" name="password"><button type="submit">Submit</button></form>');
    res.render(path.join(__dirname, './templates/login.ejs'), {

    });
});

// Apply the middleware to your EJS route
app.get('/admin', passwordProtected, (req, res) => {
    res.render(path.join(__dirname, './templates/admin.ejs'), {
        "materie": data.materie
    });
});

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

app.get("/materiaadmin/:materia",  passwordProtected,  (req, res) => {
    let materia = req.params["materia"];
    if (materia in data.materie)
        res.render(path.join(__dirname, './templates/materiaadmin.ejs'), {
            "materia": data.materie[materia]
        });
    else
        res.render(path.join(__dirname, './templates/404.ejs'));
})

app.post("/updatedata", (req, res) => {
    console.log(req.body);
    
    let materia = req.body.endpoint;
    data.materie[materia] = req.body;

    fs.writeFileSync("data.js" ,"const data = " + JSON.stringify(data) + "\n\nmodule.exports = { data };", "utf-8");
})

app.get("/data", (req, res) => {
    res.send(data);
})

app.get("/login", (req, res) => {
    res.render(path.join(__dirname, './templates/login.ejs'));
});

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
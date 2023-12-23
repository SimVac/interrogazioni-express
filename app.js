const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const session = require("express-session");

const dotenv = require('dotenv');
dotenv.config();

const dbQueries = require('./services/dbQueries.js')

const app = express();
const port = process.env.PORT || 80;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

function passwordProtected(req, res, next) {
  if (req.session.password === process.env.PASSWORD) {
    next();
  } else {
    res.redirect("/login");
  }
}

app.post("/login", (req, res) => {
  if (req.body.password === process.env.PASSWORD) {
    req.session.password = req.body.password;
    res.redirect("/admin");
  } else {
    res.send('Incorrect Password! <a href="/login">Try again</a>');
  }
});


app.get("/login", (req, res) => {
  res.render(path.join(__dirname, "./templates/login.ejs"));
});


app.get("/admin", passwordProtected, (req, res) => {
  dbQueries.getMaterie().then(result => {
    res.render(path.join(__dirname, "./templates/admin.ejs"), {
      materie: result
    });
  });
});


app.get("/", (req, res) => {
  dbQueries.getMaterie().then(result => {
    res.render(path.join(__dirname, "./templates/index.ejs"), {
      materie: result
    });
  });
});

app.get("/materia/:materia", (req, res) => {
  let materia = req.params["materia"];
  dbQueries.getMateria(materia).then(materiaInfo => {
    if (materiaInfo.length)
      dbQueries.getElencoMateria(materia).then(ordine => {
        res.render(path.join(__dirname, "./templates/materia.ejs"), {
          ordine: ordine,
          materia: materiaInfo[0]
        });
      });
    else res.render(path.join(__dirname, "./templates/404.ejs"));
  })
});

app.get("/materiaadmin/:materia", passwordProtected, (req, res) => {
  let materia = req.params["materia"];
  dbQueries.getMateria(materia).then(materiaInfo => {
    if (materiaInfo.length)
      dbQueries.getElencoMateria(materia).then(ordine => {
        res.render(path.join(__dirname, "./templates/materiaadmin.ejs"), {
          ordine: ordine,
          materia: materiaInfo[0]
        });
      });
    else res.render(path.join(__dirname, "./templates/404.ejs"));
  })
});

app.post("/updatedata", passwordProtected, (req, res) => {
  let materia = req.body.materia;
  let ordine = req.body.ordine;

  dbQueries.updateMateria(materia).then()
  
  for (let i = 0; i < ordine.length; i++){
    ordine[i].posizione = i+1;
    dbQueries.updateOrdine(ordine[i], materia).then();
  }
});

app.get("/login", (req, res) => {
  res.render(path.join(__dirname, "./templates/login.ejs"));
});

const server = app.listen(port, () =>
  console.log(`Server attivo sulla porta ${port}!`)
);

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
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
  res.render("pages/login.ejs");
});


app.get("/admin", passwordProtected, (req, res) => {
  dbQueries.getMaterie().then(materie => {
    res.render("pages/admin.ejs", {
      materie: materie
    });
  });
});


app.get("/", (req, res) => {
  dbQueries.getMaterie().then(materie => {
    dbQueries.getUltimoAvviso().then(avviso => {
      res.render("pages/index.ejs", {
        materie: materie,
        avviso: avviso
      });
    })
  });
});

app.get("/materia/:materia", (req, res) => {
  let materia = req.params["materia"];
  dbQueries.getMateria(materia).then(materiaInfo => {
    if (materiaInfo)
      dbQueries.getElencoMateria(materia).then(ordine => {
        res.render("pages/materia.ejs", {
          ordine: ordine,
          materia: materiaInfo
        });
      });
    else res.render("pages/404.ejs");
  })
});

app.get("/materia-admin/:materia", passwordProtected, (req, res) => {
  let materia = req.params["materia"];
  dbQueries.getMateria(materia).then(materiaInfo => {
    if (materiaInfo)
      dbQueries.getElencoMateria(materia).then(ordine => {
        res.render("pages/materia_admin.ejs", {
          ordine: ordine,
          materia: materiaInfo,
          host: process.env.HOST
        });
      });
    else res.render("pages/404.ejs");
  })
});

app.post("/update-materia", passwordProtected, (req, res) => {
  let { materia, ordine } = req.body;

  dbQueries.updateMateria(materia).then()
  
  for (let i = 0; i < ordine.length; i++){
    ordine[i].posizione = i+1;
    dbQueries.updateOrdine(ordine[i], materia).then();
  }
});

app.post("/add-avviso", passwordProtected, (req, res) => {
  let { titolo, descrizione } = req.body;
  dbQueries.addAvviso({titolo, descrizione}).then();
});

app.get("/login", (req, res) => {
  res.render("pages/login.ejs");
});

app.get("/avvisi", (req, res) => {
  dbQueries.getAvvisi().then(avvisi => {
    res.render("pages/avvisi.ejs", {
      avvisi: avvisi
    });
  })
})

app.get("/avvisi-admin", passwordProtected, (req, res) => {
  dbQueries.getAvvisi().then(avvisi => {
    res.render('pages/avvisi_admin.ejs', {
      avvisi: avvisi,
      host: process.env.HOST
    });
  })
})

app.post("/delete-avviso", passwordProtected, (req, res) => {
  let { id } = req.body;

  dbQueries.deleteAvviso(id);
})

const server = app.listen(port, () =>
  console.log(`Server attivo sulla porta ${port}!`)
);

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

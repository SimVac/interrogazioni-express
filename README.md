# Interrogazioni-app

## Descrizione generale dell'applicazione

Webapp per gestre le interrogazioni in classe con interfaccia admin per gestire gli interrogati e le materie

### Caratteristiche

* Framework Express.js: Utilizza Express.js per gestire le richieste HTTP.
* Gestione dei Percorsi: Diversi endpoint per gestire richieste specifiche come "/", "/materia/:materia", "/data", ecc.
* Autenticazione: Implementazione di una semplice autenticazione tramite sessione per l'area amministrativa.
* Sessione Express: Utilizza express-session per mantenere lo stato della sessione utente.
* Middleware Personalizzato: Include un middleware per proteggere le rotte, come l'area di amministrazione.
* Visualizzazione Dinamica: Uso del motore di templating EJS per generare viste dinamiche.
* Gestione Statica dei File: Serve file statici dalla cartella "public".

### Tecnologie Utilizzate

* Node.js
* Express.js
* EJS (Embedded JavaScript templates)
* Body-Parser
* Express-session

## Installazione

Guida passo passo per installare e avviare l'applicazione sul proprio ambiente di sviluppo.

bash

# Installa le dipendenze
    npm install

# Avvia il server
    npm start

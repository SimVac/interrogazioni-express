# Interrogazioni-app

## Descrizione generale dell'applicazione

Webapp per gestire le interrogazioni e gli avvisi in classe con interfaccia admin per gestire gli interrogati, le materie e gli avvisi

### Caratteristiche

* Framework Express.js: Utilizza Express.js per gestire le richieste HTTP.
* Gestione dei Percorsi: Diversi endpoint per gestire richieste specifiche come "/", "/materia", "/avvisi", ecc.
* Autenticazione: Implementazione di una semplice autenticazione tramite sessione per l'area amministrativa.
* Sessione Express: Utilizza express-session per mantenere lo stato della sessione utente.
* Middleware Personalizzato: Include un middleware per proteggere le rotte, come l'area di amministrazione.
* Visualizzazione Dinamica: Uso del motore di templating EJS per generare viste dinamiche.
* Gestione Statica dei File: Serve file statici dalla cartella "public".
* Database MySql: Utilizzato per gestire i dati degli studenti, materie e avvisi

### Tecnologie Utilizzate

* Node.js
* Express.js
* EJS (Embedded JavaScript templates)
* Body-Parser
* Express-session

# Installazione

Guida passo passo per installare e avviare l'applicazione sul proprio ambiente di sviluppo.

## Installa le dipendenze
    npm install

## Database
### Preparazione della struttura
Prepara il database MySql utilizzando la query nel file _database.sql_

### Inserimento dei dati
Utilizzare la seguente query per inserire i dati degli studenti e materie, personalizzando i valori d'esempio usando i dati effettivi (inserire gli studenti nell'ordine predefinito, per esempio in ordine alfabetico per cognome)
```
INSERT INTO studente (nome, cognome) VALUES ('Nome', Cognome), ('Nome', 'Cognome')
INSERT INTO materia (nome, abbreviazione, endpoint, attivo) VALUES ('Nome materia', 'Abbreviazione materia', 'endpoint da utilizzare', 1), ('Nome materia', 'Abbreviazione materia', 'endpoint da utilizzare', 1)
```
Infine eseguire la seguente query per preparare in ordine gli studenti per ogni materia (questa non va personalizzata)

```
INSERT INTO e_interrogato (id_studente, id_materia, posizione, interrogato, offerto) SELECT s.id, m.id, s.id, 0, 0 FROM materia m, studente s;
```

## Variabili d'ambiente
Nel file _.env.config_ sono presenti le variabili d'ambiente utilizzate dall'app. Si crea quindi un file _.env_ contente quelle variabili d'ambiente con i dati corretti (quelli presenti nel file sono di esempio). Si può aggiungere anche la variabile d'ambiente *PORT* per specificare la porta in cui il server sarà raggiungibile (di default è la porta 80).
Di seguito sono elencate le variabili d'ambiente e il loro utilizzo
```
PASSWORD=password da utilizzare per accedere al pannello di amministrazione
DB_HOST=indirizzo dell'host
DB_USER=utente da utilizzare nel database
DB_PASSWORD=password per accedere al database con l'utente specificato sopra
DB_NAME=nome del database da utilizzare
HOST=indirizzo dell'host dell'applicazione
```

## Avvia il server
    npm run start


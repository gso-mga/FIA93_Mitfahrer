const express = require('express');
const router  = express.Router();
const mysql = require('mysql');

const pool = mysql.createConnection({
  host     : 'localhost',
  user     : 'mitfahrer',
  password : 'password',
  database : 'mitfahrer_app'
});

pool.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL Server!');
});


router.get("/login", (req, res) => {
    res.render("Login");
});


router.get("/auswahl", (req, res) => {
    res.render("Auswahl");
});

router.get("/aktuellefahrten", (req, res) => {
    res.render("Aktuellefahrten");
});

router.get("/benutzeraendern", (req, res) => {
    res.render("BenutzerAendern");
});

router.get("/benutzeranlegen", (req, res) => {
    res.render("BenutzerAnlegen");
});

router.get("/fahrerdatenaendern", (req, res) => {
    res.render("Fahrerdatenaendern");
});

router.get("/fahrerdateneinstellen", (req, res) => {
    res.render("Fahrerdateneinstellen");
});

router.get("/fahrterstellen", (req, res) => {
    res.render("Fahrterstellen");
});

router.get("/settings", (req, res) => {
    res.render("settings");
});

router.post("/login", (req, res) => {
    let selectQuery = 'SELECT * FROM mitfahrer_app.benutzer WHERE EMAIL = ?';
    let query = mysql.format(selectQuery, [req.body.mail]);
    var result = {}
    var accountExists;
    var queryData;

    req.session.email = req.body.mail;
    result.email = req.body.mail;
    if (!req.body.mail.includes('@gso.schule.koeln')) {
        result.gso = 'false';
        res.send(result);
    }
    else {
        result.gso = 'true';

        pool.query(query, (err, data) => {
            if (err || !data[0]) {
                req.session.registered = false;
                result['registered'] = false;
                res.send(result);
            }
            else {
                req.session.registered = true;
                result['registered'] = true;
                queryData = data;
                accountExists = true;

                if (req.body.pw == data[0].passwort) {
                    req.session.loggedIn = true;
                    req.session.userId = data[0].id;
                    result.loggedIn = 'true';
                    result.id = String(data[0].id);
                    console.log(req.session);
                }
                else {
                    req.session.loggedIn = false;
                    result.loggedIn = 'false';
                }
                res.send(result);
            }

        });
    }

});

router.post("/session", (req, res) => {
    var session = {}
    session.email = req.session.email;
    session.loggedIn = req.session.loggedIn;
    res.send(session);
});

router.post("/benutzeranlegen", (req, res) => {
    let selectQuery = 'insert into mitfahrer_app.benutzer(email, passwort, vorname, nachname, geburtsdatum, strasse, plz, ort, geschlecht, erstellt) values(?,?,?,?,sysdate(),?,?,?,?,sysdate())';
    let query = mysql.format(selectQuery, [req.body.mail, req.body.pw, req.body.vorname, req.body.nachname, req.body.adresse, req.body.plz, req.body.ort, req.body.geschlecht]);
    let result = {}

    pool.query(query, (err, data) => {
        if (err) {
           console.log(err); 
        }
        else{
            req.session.email = req.body.mail;
        }
    });
});

router.post("/getId"), (req, res) => {
    selectQuery = 'select * from mitfahrer_app.benutzer where email = ?';
    query = mysql.format(selectQuery, [req.session.email]);

    pool.query(query, (err, data) => {
        if (err || !data[0]) {
            console.log(err);
            req.session.loggedIn = false;
            result.loggedIn = 'false';
        }
        else {
            req.session.loggedIn = true;
            req.session.userId = data[0].id;
            result.loggedIn = 'true';
            result.id = String(data[0].id);
        }
        res.send(result);
    })
}

router.post("/benutzerfetchen", (req, res) => {
    selectQuery = 'select * from mitfahrer_app.benutzer where id = ?';
    query = mysql.format(selectQuery, [req.session.userId]);
    let result = {}

    pool.query(query, (err, data) => {
        if (err || !data[0]) {
            console.log(err);
            result.message = 'failure';
        }
        else {
            result.vorname = data[0].vorname;
            result.name = data[0].nachname;
            result.strasse = data[0].strasse;
            result.plz = data[0].plz;
            result.ort = data[0].ort;
            result.geschlecht = data[0].geschlecht;

        }
        res.send(result);
    })
});

router.post("/benutzeraendern", (req, res) => {
    let selectQuery = 'update mitfahrer_app.benutzer set vorname = ?, nachname = ?, strasse = ?, plz = ?, ort = ?, geschlecht = ? where id = ?';
    let query = mysql.format(selectQuery, [req.body.vorname, req.body.nachname, req.body.adresse, req.body.plz, req.body.ort, req.body.geschlecht, req.session.userId]);
    let result = {}
    
    pool.query(query, (err, data) => {
        if (err) {
            console.log(err);
            result.message = 'failure';
        }
        else {
            result.message = 'success';

        }
        res.send(result);
    })
});

module.exports = router;
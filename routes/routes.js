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
    if(!(req.session.loggedIn == true))
    {
        req.session.loggedIn = false;
        res.render("Login");
    }else{
        res.redirect('/app/auswahl')
    }
});


router.get("/auswahl", (req, res) => {
    console.log(req.session.loggedIn)
    console.log('get');
    if(req.session.loggedIn == true){
        res.render("Auswahl");
    }
    else{
        res.redirect('/app/login')
    }
});

router.get("/aktuellefahrten", (req, res) => {
    if(req.session.loggedIn == true){
        res.render("Aktuellefahrten");
    }
    else{
        res.redirect('/app/login')
    }
});

router.get("/benutzeraendern", (req, res) => {
    if(req.session.loggedIn == true){
        res.render("BenutzerAendern");
    }
    else{
        res.redirect('/app/login')
    }
});

router.get("/benutzeranlegen", (req, res) => {
    if(req.session.loggedIn == false){
        res.render("BenutzerAnlegen");
    }
    else if(req.session.loggedIn == true){
        res.redirect('/app/auswahl')
    }
    else{
        res.redirect('/app/login')
    }
});

router.get("/fahrerdatenaendern", (req, res) => {
    if(req.session.loggedIn == true){
        res.render("Fahrerdatenaendern");
    }
    else{
        res.redirect('/app/login')
    }
});

router.get("/fahrerdateneinstellen", (req, res) => {
    if(req.session.loggedIn == true){
        res.render("Fahrerdateneinstellen");
    }
    else{
        res.redirect('/app/login')
    }
});

router.get("/fahrterstellen", (req, res) => {
    if(req.session.loggedIn == true){
        res.render("Fahrterstellen");
    }
    else{
        res.redirect('/app/login')
    }
});

router.get("/settings", (req, res) => {
    if(req.session.loggedIn == true){
        res.render("settings");
    }
    else{
        res.redirect('/app/login')
    }
});

router.post("/login", (req, res) => {
    let selectQuery = 'SELECT * FROM mitfahrer_app.benutzer WHERE EMAIL = ?';
    let query = mysql.format(selectQuery, [req.body.mail]);
    var result = {}
    var accountExists;
    var queryData;

    if(req.body.mail){
        req.session.email = req.body.mail;
        result.email = req.body.mail;
    }else{
        result.message = 'Mail empty'
    }
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
                    result.loggedIn = true;
                    result.id = String(data[0].id);
                    console.log(req.session);
                }
                else {
                    req.session.loggedIn = false;
                    result.loggedIn = false;
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
    console.log(req.body.mail + ' ' + req.body.pw);
    if(req.body.mail && req.body.pw){
        let selectQuery = 'insert into mitfahrer_app.benutzer(email, passwort, vorname, nachname, geburtsdatum, strasse, plz, ort, geschlecht, erstellt) values(?,?,?,?,sysdate(),?,?,?,?,sysdate())';
        let query = mysql.format(selectQuery, [req.body.mail, req.body.pw, req.body.vorname, req.body.nachname, req.body.adresse, req.body.plz, req.body.ort, req.body.geschlecht]);
        let result = {}
        console.log('prequery')
        pool.query(query, (err, data) => {
            console.log('inquery')
            if (err) {
                console.log('inqueryerr')
            console.log(err); 
            }
            else{
                console.log('post');
                req.session.email = req.body.mail;
                req.session.loggedIn = true;
            }
        });
    }
});

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

router.post("/getId"), (req, res) => {
    selectQuery = 'select * from mitfahrer_app.benutzer where email = ?';
    query = mysql.format(selectQuery, [req.session.email]);
    console.log(req.session);

    pool.query(query, (err, data) => {
        if (err || !data[0]) {
            console.log(err);
            req.session.loggedIn = false;
            result.loggedIn = false;
        }
        else {
            req.session.loggedIn = true;
            req.session.userId = data[0].id;
            result.loggedIn = true;
            result.id = String(data[0].id);
        }
    })
}

router.post("/fahrerdateneinstellen", (req, res) => {
    let selectQuery = 'insert into mitfahrer_app.fahrzeug(modell, farbe, kennzeichen, benutzer_id, plaetze) values(?,?,?,?, 0)';
    let query = mysql.format(selectQuery, [req.body.model, req.body.farbe, req.body.kennzeichen, req.session.userId]);
    let result = {}

    pool.query(query, (err, data) => {
        if (err) {
            console.log(err);
            result.message = 'failure';
        }
        else {
            result.message = 'success';
            req.session.hasCar = true;
        }
        res.send(result);
    })
});

module.exports = router;
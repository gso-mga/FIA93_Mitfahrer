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

router.post("/login", (req, res) => {
    let selectQuery = 'SELECT * FROM mitfahrer_app.benutzer WHERE EMAIL = ?';    
    let query = mysql.format(selectQuery,[req.body.mail]);
    var result = {}
    var accountExists;
    var queryData;


    if(!req.body.mail.includes('@gso.schule.koeln')){
        result.gso = 'false';
        res.send(result);
    }
    else{
        result.gso = 'true';
        

        pool.query(query,(err, data) => {
            if(err) {
                result['registered'] = false;
                console.log(data);
            }
            else{
                result['registered'] = true;
                queryData = data;
                accountExists = true;
                
                
                if(req.body.pw = data.passwort){
                    result.loggedIn = 'true';
                    result.id = data.id;
                }
                else{
                    result.loggedIn = 'false';
                }
            }
            res.send(result);
        });
    }

});

router.get("/auswahl", (req, res) => {
    res.render("Auswahl");
});

router.get("/benutzerAnlegen", (req, res) => {
    res.render("BenutzerAnlegen");
});

router.post("/benutzerAnlegen", (req, res) => {
   
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
    res.render("Settings");
});

module.exports = router;
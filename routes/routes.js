const express = require('express');
var login     = require('../src/Login.js');
const router  = express.Router();

router.get("/login", (req, res) => {
    res.render("Login");
});

router.post("/login", (req, res) => {
    console.log(req.body.mail);
    if(login.foo(req.body.mail)){
        console.log('YAHSASID');
    }
    if(req.body.mail.indexOf('@gso.schule.koeln')){
        res.send({'gso': 'true'});
    }
   // res.send({'message': 'success'});
});

router.get("/auswahl", (req, res) => {
    res.render("Auswahl");
});

router.get("/benutzerAnlegen", (req, res) => {
    res.render("BenutzerAnlegen");
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
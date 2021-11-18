const express = require('express');
const router  = express.Router();

router.get("/login", (req, res) => {
    res.render("Login");
});

router.post("/login", (req, res) => {
   // console.log(req.body.mail);
  
    if(req.body.mail.includes('@gso.schule.koeln')){
        res.send({'gso': 'true'});
    }
    else{
        res.send({'gso': 'false'});
    }
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
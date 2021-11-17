const express = require('express');
const router = express.Router();

router.get("/login", (req, res) => {
    res.render("Login");
});

router.post("/login", (req, res) => {
    console.log(req.body.mail);
    if (isGSOMail(req.body.mail)){

    }
    res.send({'message': 'success'});
});

router.get("/auswahl", (req, res) => {
    res.render("Auswahl");
});

router.get("/benutzerAnlegen", (req, res) => {
    res.render("BenutzerAnlegen");
});

router.get("/login", (req, res) => {
    res.render("Login");
});

module.exports = router;
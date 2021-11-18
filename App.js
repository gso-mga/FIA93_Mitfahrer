const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const mysql = require('mysql');
const session = require('express-session');

const port = 7000;
var jquery = require('jquery');

app.set('view engine', 'ejs');
app.use('/public', express.static(__dirname + '/public'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/cookies', express.static(__dirname + '/node_modules/js-cookie/dist/'));
app.use(cookieParser());

app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
}));

app.get("/",(req,res) => {
   res.render("index");
});

const appRouter = require('./routes/routes');

app.use('/app', appRouter);

app.listen(port, () => {
    console.log('Server is running at port ' + port);
});
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mysql = require('mysql');
const port = 7000;
var jquery = require('jquery');

app.set('view engine', 'ejs');
app.use('/public', express.static(__dirname + '/public'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());



// const pool = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'mitfahrer',
//   password : 'password',
//   database : 'mitfahrer_app'
// });

// pool.connect((err) => {
//     if(err) throw err;
//     console.log('Connected to MySQL Server!');
// });


app.get("/",(req,res) => {
   /* let select = 'select 1 from dual;';
    let query = mysql.format(select);
    pool.query(query,(err, data) => {
    if(err) {
        console.log('Email is not registered')
    }
    console.log(data);
    });
    console.log()*/
   res.render("index");
});

const appRouter = require('./routes/routes');

app.use('/app', appRouter);

app.listen(port, () => {
    console.log('Server is running at port ' + port);
});
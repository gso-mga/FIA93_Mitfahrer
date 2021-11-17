const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mysql = require('mysql');
const port = 7000;

app.set('view engine', 'ejs');
app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

/*const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'mitfahrer',
  password : 'password',
  database : 'mitfahrer_app'
});

connection.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL Server!');
});*/


app.get("/",(req,res) => {
    /*pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connected as id ' + connection.threadId);
        connection.query('SELECT * from users LIMIT 1', (err, rows) => {
            connection.release(); // return the connection to pool
            if(err) throw err;
            console.log('The data from users table are: \n', rows);
        });
    });*/
   // res.sendFile('index.html',{ root: './html/' });
   res.render("index");
});

const appRouter = require('./routes/routes');

app.use('/app', appRouter);

app.listen(port, () => {
    console.log('Server is running at port ' + port);
});
const express = require("express");
const app = express();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'mitfahrer',
  password : 'password',
  database : 'mitfahrer_app'
});

connection.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL Server!');
});


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
    res.sendFile('index.html',{ root: './html/' });
});

app.listen(7000, () => {
    console.log('Server is running at port 7000');
});
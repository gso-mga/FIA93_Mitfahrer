const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'mitfahrer',
  password: 'password',
  database: 'mitfahrer_app'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');
});




const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'mitfahrer',
    password : 'password',
    database : 'mitfahrer_app',
    debug    :  false
});

function isGSOMail(userMail){   
    if(userMail.indexOf('@gso.schule.koeln'))
        return true;
    return false;

}

function isMailRegistered(userMail){
    let selectQuery = 'SELECT * FROM mitfahrer_app.benutzer WHERE = ?';    
    let query = mysql.format(selectQuery,[userMail]);

    pool.query(query,(err, data) => {
        if(err) {
            console.log('Email is not registered')
            return false;
        }
        // rows fetch
        console.log(data);
        return true;
    });
}


setTimeout(() => {
    isMailRegistered('banane@gso.schule.koeln');
},100);


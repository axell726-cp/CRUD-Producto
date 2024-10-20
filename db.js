const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234567',
    database: 'bdnode',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

connection.connect((err)=>{
    if(err){
        console.log('Error de conexión: ',err);
    }else{
        console.log('Conexión Exitosa...!');
    }
});

module.exports = connection;
const mysql = require("mysql");

const config = {
        host : 'localhost',
        port : 3306,
        user : 'researchWalker',
        password : '123456',
        database : 'researchDatabase',
        charset : 'UTF8_GENERAL_CI',
        debug : false
}
function connectStart() {
    var connection = mysql.createConnection(config);
    connection.connect();
    return connection;
}
function connectClose(connection) {
    connection.end();
}


let CheckLogin = {
    //这是一个JSON对象，用以检查登陆是否合法
    checkAdmin: function( work_id,admin_name, passwd) {
        let connection = connectStart();
        connection.query('CALL checkAdmin(\''+work_id+'\',\''+admin_name+'\',\''+passwd+'\','+'@out);', function(err, rows, fields) {
            if (err) {
               throw err;
            }
            var results = rows[0];
            var row = results[0];
            console.log(row.isAdmin?'true is admin' : 'false, it\'s not a admin');
            return row.isAdmin;
        });
        connectClose(connection);
    },

    checkGeneralUser: function(work_id, passwd) {
        let connection = connectStart();

        connection.query('CALL checkAdmin(\''+work_id+'\',\''+passwd+'\''+'@out);', function(err, rows, fields) {
            if (err) {
               throw err;
            }
            var results = rows[0];
            var row = results[0];
            console.log(row.isAdmin?'true is a user' : 'false, it\'s not a user');
        });
        connectClose();
    }
}

module.exports = CheckLogin;
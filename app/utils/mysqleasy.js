var mysql = require('mysql');
var db = {};
var pool = null;
db.set = function(host, user, password, port, database) {
    if (database != null) {
        pool = mysql.createPool({
            connectionLimit: 10,
            host: host,
            user: user,
            password: password,
            port: port,
            database: database
        });
    } else {
        pool = mysql.createPool({
            connectionLimit: 10,
            host: host,
            user: user,
            password: password,
            port: port
        });
    }
}
db.query = function(sql, callback) {

    if (!sql) {
        callback();
        return;
    }
    pool.query(sql, function(err, rows, fields) {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        };

        callback(null, rows, fields);
    });
}
module.exports = db;
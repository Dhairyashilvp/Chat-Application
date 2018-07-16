var mysql = require('mysql')
var dbHandler = require('./DBHandler');

var conObj = null;
var dbCon = function(whenConnected){
    var con = mysql.createConnection({
        host : "localhost",
        user : "root",
        password : "mysql",
        database: "chatApplication"
    });
    con.connect(function (err){
        if(err) {
            whenConnected(null, err);
        }
        else {
            whenConnected(con, null);
        }
            
    });
};

var getConnection = function(whenConObject) {
    if(conObj) {
        return conObj;
        //whenConObject(conObj);
    }
    else {
        dbCon(function(connection, error) {
            if(error) {
                console.error('Crictical Error: Could not connect to Database');
                process.exit(1);
            } else {
                conObj = connection;
                return conObj;
                //whenConObject(conObj);
            }
        });
    }
}

module.exports.getConnection = getConnection;
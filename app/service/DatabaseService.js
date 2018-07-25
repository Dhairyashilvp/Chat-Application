var mysql = require('mysql')
var path = require('path');
var CONSTANTS = require(path.join(__dirname ,'../../config/constants'));

var dbCon = function(whenConnected){
    var con = mysql.createConnection(CONSTANTS.DB);
    con.connect(function (err){
        if(err) {
            whenConnected(null, err);
        }
        else {
            whenConnected(con, null);
        }
            
    });
};

var promise = new Promise(function(resolve, reject) {

    dbCon(function(connection, error) {
        if(error) {
            reject(Error('Crictical Error: Could not connect to Database'));
            process.exit(1);
        } else {
            resolve(connection);
        }
    });
});

var executeQuery = function(sql,callback){
    promise.then(function(con) {
        con.query(sql,function (err, result) {
        callback(err,result);
      }, function(err) {
        console.log(err);
      });
    });
} 

module.exports.executeQuery = executeQuery;
var mysql = require('mysql')
var path = require('path');
var CONSTANTS = require(path.join(__dirname ,'../../config/constants'));

async function dbConnection(){
    var con = await mysql.createConnection(CONSTANTS.DB);
    return new Promise((resolve,reject) => {
        con.connect(function (err){
            if(err) {
                reject(Error('Crictical Error: Could not connect to Database'));
            }
            else {
                resolve(con);
            }
        });
    });
};


var executeQuery = function(sql,callback)
{
    dbConnection().then(function(con) 
    {
        con.query(sql,function (err, result)
        {
            callback(err,result);
        }, 
        function(err)
        {
            console.log(err);
            process.exit(1);
        });
    });
} 

module.exports.executeQuery = executeQuery;
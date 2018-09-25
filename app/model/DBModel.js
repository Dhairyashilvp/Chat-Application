var path = require('path');
var DBService = require(path.join('../service','/DataBaseService'));


module.exports.auth = function(userData,callback)
{
    var sql = `SELECT * FROM regtable WHERE email = '${userData.user}' AND password = '${userData.pass}'`;
    DBService.executeQuery(sql,function(err,result)
    {
        callback(err,result);
    });
}

module.exports.register = function(userData,callback)
{
     if(userData.pass === userData.confPass)
    {
        var sql = `INSERT INTO regtable (username,password,email) VALUES ('${userData.user}','${userData.pass}','${userData.email}')`;
        DBService.executeQuery(sql,function(err,result)
        {
            callback(err,result);
        });
        
    }
    else
    {
        callback(null,null);
    }
}

module.exports.getUsers = function(callback)
{
    var sql = 'SELECT username FROM regtable';
    DBService.executeQuery(sql,function(err,result){
        callback(err,result);
    });
}

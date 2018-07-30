var path = require('path');
var DBService = require(path.join('../service','/DataBaseService'));


module.exports.auth = function(userData,callToController) {
    var sql = `SELECT * FROM regtable WHERE email = '${userData.user}' AND password = '${userData.pass}'`;
    DBService.executeQuery(sql,function(err,result){
        callToController(err,result);
    });
}

module.exports.register = function(userData,callToController){
     if(userData.pass === userData.confPass)
    {
        var sql = `INSERT INTO regtable (username,password,email) VALUES ('${userData.user}','${userData.pass}','${userData.email}')`;
        var result = DBService.executeQuery(sql,function(err,result){
            callToController(err,result);
        });
        
    }
    else{
        callToController(null,null);
    }
}

module.exports.getUsers = function(callToController){
    var sql = 'SELECT username FROM regtable';
    DBService.executeQuery(sql,function(err,result){
        callToController(err,result);
    });
}

module.exports.getOnlineUsers = function(callToController){
    var sql = 'SELECT data FROM sessions';
    DBService.executeQuery(sql,function(err,result){
        callToController(err,result);
    });
}
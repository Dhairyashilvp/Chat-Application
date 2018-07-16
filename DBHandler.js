var connection = require('./DataBaseConnection');
var resultSet;
//var con = null;
var getConnObj = function()
{
    //connection.getConnection(authenticateUser);
    var co = connection.getConnection();
    return co;
}


var authenticateUser = function(username,pass,callback) {
   var con = getConnObj();
        var sql = "SELECT * FROM regtable WHERE email = ? AND password = ?";
        con.query(sql,[username,pass],function (err, result) {
            if (err) {  
                console.log("User Not Found");
                throw err;
            } else {
                callback(result);
            }
        });
}

var createUser = function(username,password,confPass,email,callback)
{
    var con = getConnObj();
    if(password === confPass)
    {
        var sql = "INSERT INTO regtable (username,password,email) VALUES (?,?,?)";
        con.query(sql,[username,password,email],function (err, result) {
        if (err) {
            callback(false);
            console.log("Sign up Unsuccessfull");
            throw err;
        }
        else
            callback(true);
        });
    }
    else
    {
        console.log("Password does'nt match");
        console.log("New Account created with email : "+email);
    }
}
getConnObj();

module.exports.getConnObj=getConnObj;
module.exports.authenticateUser = authenticateUser;
module.exports.createUser = createUser;
var path    = require('path');
var DBModel = require(path.join(__dirname ,'./DBModel'));

module.exports.getData = function(user,callback){

    var chat_data = {
        "name" : user.username,
        "id" : user.ID,
        "email" : user.email,
    }
    callback(undefined,chat_data);
}
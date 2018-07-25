var path    = require('path');
var DBModel = require(path.join(__dirname ,'../model/DBModel'));


module.exports.auth = function (req,res) {
    DBModel.auth(req.body,function(err,result){
        if(result.length > 0){
            req.session.user = result;
            res.setHeader('Content-Type', 'text/html');
            res.render(path.resolve(__dirname, '../view/Home.html'),{username : result[0].username});
          } else{
              res.setHeader('Content-Type', 'text/html');
              res.redirect('/');
            } 
    });
}

module.exports.register = function (req, res) {
    console.log("Req received");
    DBModel.register(req.body,function(err,result){
        if(result){
            res.setHeader('Content-Type', 'text/html');
            res.redirect('/');
        } else{
            res.send("SignUp failed");
        }
        
    });
    
}

module.exports.getUsers = function(req,res){
    DBModel.getUsers(function(err,result){
        res.send(result);
    });
}

module.exports.getUsersView = function(req,res){
    DBModel.getUsers(function(err,result){
        res.render(path.resolve(__dirname, '../view/ListUsers.html'),{user : result});
    });
}

module.exports.dashboard = function(req,res){
    res.send("Please Login First");
}
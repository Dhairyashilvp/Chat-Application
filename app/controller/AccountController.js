var path    = require('path');
var DBModel = require(path.join(__dirname ,'../model/DBModel'));

var onlineUsers;
module.exports.auth = function (req,res) {
    if(req.session.user){
        res.setHeader('Content-Type', 'text/html');
        res.render('Home.html',{username : req.session.user.username});
    }else{
        DBModel.auth(req.body,function(err,result){
            if(result.length > 0){
                req.session.user = result[0];
                res.setHeader('Content-Type', 'text/html');
                res.render('Home.html',{username : req.session.user.username});
              } else{
                  res.setHeader('Content-Type', 'text/html');
                  res.redirect('/');
                }
        });
    }  
}

module.exports.register = function (req, res) {
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
        res.render('ListUsers.html',{user : result});
    });
}
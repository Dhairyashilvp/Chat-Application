var path    = require('path');
var DBModel = require(path.join(__dirname ,'../model/DBModel'));
var ChatModel = require(path.join(__dirname ,'../model/ChatModel'));
var online = require(path.join(__dirname ,'../../config/socket'));
module.exports.auth = function (req,res)
{
    if(req.session.user)
    {
        render(req.session.user,res);
    }
    else
    {
        DBModel.auth(req.body,function(err,result)
        {
            if(err)
            {
                console.log(err);
            }
            else if(result.length > 0)
            {
                console.log("LOG : User SignedIn");
                req.session.user = result[0];
                render(req.session.user, res);
            }
            else
            {
                res.setHeader('Content-Type', 'text/html');
                res.redirect('/');
            }
        });
    }  
}

module.exports.register = function (req, res)
{
    DBModel.register(req.body,function(err,result)
    {
        if(result)
        {
            res.setHeader('Content-Type', 'text/html');
            res.redirect('/');
        } 
        else
        {
            res.send("SignUp failed");
        }      
    });
    
}

module.exports.getUsers = function(req,res)
{
    DBModel.getUsers(function(err,result)
    {
        res.send(result);
    });
}

module.exports.getUsersView = function(req,res)// unused
{
    DBModel.getUsers(function(err,result)
    {
        res.render('ListUsers.html',{user : result});
    });
}

module.exports.logout = function(req,res)
{
    res.redirect('/');
    req.session.destroy();
    online.onlineUsers.pop(req.body.username);
    console.log("LOG : User SignedOut");
}

function render(userDetails, res)
{
    ChatModel.getData(userDetails,function(err, data)
        { 
            if(err)
            {
                console.log(err);
            }
            else
            {
                res.setHeader('Content-Type', 'text/html');
                res.render('Home.html',{display : data});
            }
        });
}
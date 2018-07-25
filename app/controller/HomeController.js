var path = require('path');

module.exports.home = function(req,res){
    if(req.session.user)
    {
        res.setHeader('Content-Type', 'text/html');
        res.render(path.join(__dirname, '../view' ,'/Home.html'),{username : req.session.user[0].username});
        //res.redirect('/chats');
    }
    else{
        res.setHeader('Content-Type', 'text/html');
        res.sendFile(path.join(__dirname, '../view' ,'/Login.html'));
    }
}
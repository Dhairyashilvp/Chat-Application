module.exports.login = function(req,res){
    if(req.session.user)
    {
        res.redirect('/chats');
    }
    else{
        res.setHeader('Content-Type', 'text/html');
        res.render('Login.html');
    }
}
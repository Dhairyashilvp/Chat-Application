var path = require('path');

module.exports.home = function(req,res){
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, '../view' ,'/Login.html'));
}
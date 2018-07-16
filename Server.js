var express = require('express');
const app = express();
const PORT = 8081;
var bodyParser = require('body-parser');
var db = require('./DBHandler.js');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var nunjucks = require('nunjucks');

nunjucks.configure('view',{
    autoescape: true,
    express: app,
    watch: true
});

var urlencodedParser = app.use(
    bodyParser.urlencoded({
         extended: false 
        }));

app.use(express.static('Style'));
app.use(express.static('images'));
/*app.use('/', function(req, res, next) {
    console.log('req', req.body);
    next();
});*/
app.get('/',function(req,res){
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/view' + '/Login.html');
});


app.post('/Home', function (req, res) {
    var result = db.authenticateUser(req.body.user,req.body.pass,(result)=>{
        if(result.length > 0){
            res.setHeader('Content-Type', 'text/html');
            res.render(__dirname + '/view' + '/home.html',{username : result[0].username});
      }else{
        res.redirect('/');
    } 
    });
  
});

 app.post('/Register', function (req, res) {
    console.log(req.body.user);
    db.createUser(req.body.user,req.body.pass,req.body.confPass,req.body.email,(result)=>{
        console.log(JSON.stringify({status:result}));
    });
    res.redirect('/');

 });

 io.on('connection', function(socket){
    console.log('connected successfully');

    //console.log(io.sockets.clients());

    socket.on('disconnect', function(){
        console.log('user disconnected');
      });

      socket.on('Message', function(msg) {
        //console.log(msg);
        socket.broadcast.emit('broadcast', msg);
        socket.emit('myMsg', msg);
    });


  });

server.listen(PORT,"192.168.96.70",function(){
    console.log('Log : Server running at http://192.168.96.70:8081');
  });
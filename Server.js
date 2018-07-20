var CONSTANTS = require('./config/constants');
var express = require('express');
var router = require('./config/routes')
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
const app = express();
var server = require('http').createServer(app);

var io = require('socket.io')(server);

//app.set('view engine', 'html');
nunjucks.configure('./app/view',{
    autoescape: true,
    express: app,
    watch: true
});

var urlencodedParser = app.use(
    bodyParser.urlencoded({
         extended: false 
        }));

app.use(express.static('app/assets/css'));
app.use(express.static('app/assets/images'));
app.use(CONSTANTS.BASE_URL, router);

server.listen(CONSTANTS.PORT,CONSTANTS.IP,function(){
    console.log(`Log : Server running at http://${CONSTANTS.IP}:${CONSTANTS.PORT}`);
  });

  module.exports = app;

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
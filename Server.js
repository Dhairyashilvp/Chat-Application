var CONSTANTS   = require('./config/constants');
var express     = require('express');
var router      = require('./config/routes')
var bodyParser  = require('body-parser');
var session     = require('express-session');
var MySQLStore  = require('express-mysql-session')(session);
var nunjucks    = require('nunjucks');
const app       = express();
var server      = require('http').createServer(app);
var io          = require('socket.io')(server);
var cookieParser= require('cookie-parser');

nunjucks.configure('./app/view',{
    autoescape: true,
    express: app,
    watch: true
});

var urlencodedParser = app.use(
    bodyParser.urlencoded({
        extended: false
}));
        
var options = CONSTANTS.DB;

var sessionStore = new MySQLStore(options);

app.use(express.static('app/assets/css'));
app.use(express.static('app/assets/images'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
        secret: '2C44-4D44-WppQ38S',
        resave: true,
        store: sessionStore,
        saveUninitialized: true,
    }));

app.use(CONSTANTS.BASE_URL, router);

server.listen(CONSTANTS.PORT,CONSTANTS.IP,function(){
    console.log(`Log : Server running at http://${CONSTANTS.IP}:${CONSTANTS.PORT}`);
  });

  //sessionStore.close();

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
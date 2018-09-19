var ENV             = require('./config/environment');
var CONSTANTS       = require('./config/constants');
var router          = require('./config/routes')
var bodyParser      = require('body-parser');
var session         = require('express-session');
var MySQLStore      = require('express-mysql-session')(session);
var nunjucks        = require('nunjucks');
var express         = require('express');
const app           = express();
var server          = require('http').createServer(app);
var io              = require('socket.io')(server);
var cookieParser    = require('cookie-parser');
var socket          = require('./config/socket');

var configure = function(){
    nunjucks.configure('./app/view',{
        autoescape: true,
        express: app,
        watch: true
    });
    //console.log(bodyParser);
    var urlencodedParser = app.use(
        bodyParser.urlencoded({
            extended: false
    }));
    
    var sessionStore = new MySQLStore(CONSTANTS.DB);
    
    app.set('views', ENV.VIEW_DIR);
    app.use(express.static('app/assets/css'));
    app.use(express.static('app/assets/images'));
    app.use(express.static('app/assets/js'));
    
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(session({
            secret: '2C44-4D44-WppQ38S',
            resave: true,
            store: sessionStore,
            saveUninitialized: true,
        }));
}

var route = function(){
    app.use('/', router);
}

configure();
route();
socket(io);


server.listen(CONSTANTS.PORT,CONSTANTS.IP,function(){
    console.log(`LOG : Server running at http://${CONSTANTS.IP}:${CONSTANTS.PORT}`);
  });


module.exports.app = app;

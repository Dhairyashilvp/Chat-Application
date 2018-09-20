const PORT = 8081;
const IP = "192.168.92.176";//Change your IP accordingly
const BASE_URL = `http://${IP}:${PORT}`;
const DB = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'mysql',
    database: 'chatapplication'
};

module.exports.BASE_URL = BASE_URL;
module.exports.PORT = PORT;
module.exports.IP = IP;
module.exports.DB = DB;
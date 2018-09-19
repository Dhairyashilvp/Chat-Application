var onlineUsers = [];
var connection = {};
var socket = function(io){
    io.on('connection', function(socket){

        socket.on('join', function (data) {
            onlineUsers.push(data.username)
            socket.emit('update', JSON.stringify(onlineUsers));
            socket.broadcast.emit('update', JSON.stringify(onlineUsers));
            socket.join(data.username); // We are using room of socket io
            connection[data.username] = socket.id;
            console.log('LOG : List of Online Users on Server ');
            console.log(onlineUsers);
        });
        //session.socket = socket;
        console.log('LOG : Socket connected');
        //console.log(socket.id);

        socket.on('disconnect', function(data){
            //console.log(data);
            socket.broadcast.emit('update', JSON.stringify(onlineUsers));
            console.log('LOG : Socket Disconnected');
            console.log('LOG : List of Online Users on Server ');
            console.log(onlineUsers);
            console.log(connection)
        });

          socket.on('Message', function(msg) {
            //console.log(msg);
            socket.broadcast.to(connection[msg.to]).emit('new_msg', msg.message);
            //io.sockets.in(msg.to).emit('new_msg', msg.message);
            //socket.broadcast.emit('broadcast', msg);
            //console.log(socket.adapter.rooms["Ashutosh"]["sockets"]);
        });
      });
}

module.exports = socket;
module.exports.onlineUsers = onlineUsers;
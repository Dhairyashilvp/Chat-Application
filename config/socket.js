var onlineUsers = [];
var connection = {};
var socket = function(io)
{
    io.on('connection', function(socket){

        socket.on('join', function (data) {
            console.log(`LOG : ${data.username} connected`);
            if(!doesUserExist(data.username))
            {
                onlineUsers.push(data.username);
                socket.emit('update',JSON.stringify(onlineUsers))
                socket.broadcast.emit('update', JSON.stringify(onlineUsers));
                socket.join(data.username); // We are using room of socket io
                connection[data.username] = socket.id;
                console.log(`LOG : List of Online Users on Server :- ${onlineUsers}`);
            }
            else
            {
                console.log('LOG : User Already Exists ');
                socket.emit('update',JSON.stringify(onlineUsers))
                socket.broadcast.emit('update', JSON.stringify(onlineUsers));
                connection[data.username] = socket.id;
            }
        });

        socket.on('disconnect', function(data){
            //console.log(data);
            socket.broadcast.emit('update', JSON.stringify(onlineUsers));
            console.log('LOG : Socket Disconnected');
            console.log(`LOG : List of Online Users on Server :- ${onlineUsers}`);
        });

          socket.on('Message', function(msg) {
            //console.log(msg);
            socket.broadcast.to(connection[msg.to]).emit('new_msg', msg.message);
            //socket.broadcast.emit('broadcast', msg);
        });
      });
}

function doesUserExist(user)
{
    for(var i = 0; i < onlineUsers.length ; i++)
    {
        if(onlineUsers[i] == user)
        {
            return true;
        }
    }
    return false;
}

module.exports = socket;
module.exports.onlineUsers = onlineUsers;
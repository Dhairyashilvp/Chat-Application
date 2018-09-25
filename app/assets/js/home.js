var ip = "192.168.92.176";
var port = 8081;
var senderEmail,receiverEmail,username,currentSelected;
function setUserDetails(userEmail,user){
    senderEmail = userEmail;
    username = user;
    socket.emit('join', {"username": username});
}

var socket = io.connect(`${ip}:${port}`);
socket.on('update', function(onlineUsers)
{
    var user = JSON.parse(onlineUsers);
    var userKey = getUserKey(user);
    delete user[userKey];
    arr = user.filter(function(e){return e}); 
    console.log(arr);
    $("#users").html('');
    if(user.length > 0)
    {
        $.each(arr, function(key,value)
        {
            $("#users").append(     
                $('<li>').attr('class','contact').click(function(){showDashboard(value)}).append(
                    $('<div>').attr('class','wrap').append(
                        $('<img>').attr({src : 'https://openclipart.org/download/211821/matt-icons_preferences-desktop-personal.svg', alt : ""}),
                        $('<div>').attr('class','meta').append(
                            $('<p>').attr('class','name').text(value),
                            $('<p>').attr('class','preview').text(`hello `)
                        )
                    )
                )
            )
        })
    }
});

function showDashboard(email){
    currentSelected = email;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `http://${ip}:${port}/chatData`,
        "method": "POST",
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded",
          "Cache-Control": "no-cache",
        },
        "data": {
          "user": username,
          "friend": currentSelected,
        }
      }
      
      $.ajax(settings).done(function (response) {
        var chatHistory = JSON.stringify(response);
        console.log(chatHistory);
      });
    $("#chat").html('');
    $(".content").css({"display":"block"});
    $("#dashboard").html(email);
}



function sendMsg() {
    var msg = document.getElementById('msg').value;
    data = {
        "from" : username,
        "to" : currentSelected,
        "message" : msg
    }
    socket.emit('Message', data);
    document.getElementById("msg").value = "";
    addToList(msg);
}
function addToList(msg) /* Need to be written in JQuery */
{
    var ul = document.getElementById("chat");
    var li = document.createElement("li");
    var p = document.createElement("p");
    p.appendChild(document.createTextNode(msg));
    li.appendChild(p);
    li.setAttribute("class", "replies");
    ul.appendChild(li);
}

socket.on("new_msg", function(data) {
    var ul = document.getElementById("chat");
    var li = document.createElement("li");
    var p = document.createElement("p");
    p.appendChild(document.createTextNode(data));
    li.appendChild(p);
    li.setAttribute("class", "sent");
    ul.appendChild(li);
});

function logout()
{
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `http://${ip}:${port}/logout`,
        "method": "POST",
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded",
          "Cache-Control": "no-cache",
        },
        "data": {
            "username": username,
          }
      }
      $.ajax(settings).done(function (response) {
        location.replace( `http://${ip}:${port}`)
      });
}

function getUserKey(user)
{
    for(key in user)
    {
        if(user[key] == username)
        {
            return key;
        }
    }
}

/* function ajaxCall(url, dataToSend, callBack)
{
    var data = JSON.stringify(dataToSend);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            var data = JSON.parse(this.responseText);
            callBack(data,this.status);
        }
    };
    xhttp.open("POST", url, true);
    xhttp.send(data);
} */

/* function send(message){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `http://${ip}:${port}/SendMessage`,
        "method": "POST",
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded",
          "Cache-Control": "no-cache",
        },
        "data": {
          "to": "Ashutosh",
          "message": message,
        }
      }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });
}
 */
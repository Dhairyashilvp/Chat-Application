var path    = require('path');
var DBService = require(path.join('../service','/DataBaseService'));
var fs = require('fs');

module.exports.getData = function(user,callback){

    var chat_data = {
        "name" : user.username,
        "id" : user.ID,
        "email" : user.email,
    }
    callback(undefined,chat_data);
}


module.exports.getChatData = function(chat,callback)
{
    var dir = path.join(__dirname,'../../chatHistory/',chat.user);
    var file = path.join(dir,`/chatWith${chat.friend}.txt`)
    if(fs.existsSync(dir))
    {
        fileOperation(file,'read','null',function(err,data){
            if(err)
            {
                console.log(err);
            }
            else
            {
                //console.log(data);
                callback(err,data);
            }
        })
    }
    else
    {
        fs.mkdirSync(dir);
        fileOperation(file,'read','null',function(err,data){
            //console.log(data);
            callback(err,data);
        });
    }
    
    /* var sql = `SELECT link FROM chathistory WHERE yourID = '${chat.user}' AND friendID = '${chat.friend}'`;
    DBService.executeQuery(sql,function(err,result)
    {
        
        var link = result[0].link;
        readFile(link,function(err,chatData)
        {
            callback(err,chatData);
        });
        //callback(err,result);
    }); */
    
}

module.exports.saveChatData = function(data)
{
    var dir1 = path.join(__dirname,'../../chatHistory/',data.from);
    var dir2 = path.join(__dirname,'../../chatHistory/',data.to);
    var file1 = path.join(dir1,`/chatWith${data.to}.txt`)
    var file2 = path.join(dir2,`/chatWith${data.from}.txt`)
    if (fs.existsSync(dir1) && fs.existsSync(dir2))
    {
        fileOperation(file1,'write',data,function(response)
        {
            console.log(response);
        });
        fileOperation(file2,'write',data,function(response)
        {
            console.log(response);
        });
    }
    else
    {
        fs.mkdirSync(dir1);
        fs.mkdirSync(dir2);
        fileOperation(file1,'write',data,function(response)
        {
            console.log(response);
        });
        fileOperation(file2,'write',data,function(response)
        {
            console.log(response);
        });
    }
}

function fileOperation(file,operation,data,callback)
{
    var msgFormat = `${data.from} : ${data.message} \r\n`;
    fs.open(file,'a+',function(err,fd)
    {
        if(err)
        {
            callback(err);
        }
        if(operation === 'write')
        {
            fs.write(fd,msgFormat,function(err, written, string)
            {
                if(err)
                {
                    callback(err);
                }
                else
                {
                    callback(`LOG : Chat saved Successfully`);
                }
            })
        }
        if(operation === 'read')
        {
            fs.readFile(fd, 'utf8', function (err, data)
            {
                callback(err,data);
            });
        }
        fs.close(fd, function(err)
        {
            if(err)
            {
                console.log(`ERROR : ${err}`);
            }
        })
    });
}
var path    = require('path');
var ChatModel = require(path.join(__dirname ,'../model/ChatModel'));

module.exports.getChatData = function(req,res)
{
    ChatModel.getChatData(req.body,function(err,chatHistory)
    {
        if(err)
        {
            //console.log(`LOG : ${err}`);
        }
        else
        {
            res.send(JSON.stringify(chatHistory));
        }
    });
}
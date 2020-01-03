var linebot = require('linebot')
var config = require('./config')

var bot = linebot({
  channelId: config.CHANNEL_ID,
  channelSecret: config.CHANNEL_SECRET,
  channelAccessToken: config.CHANNEL_ACCESS_TOKEN
})

bot.on('message', function (event) {
  var replyMsg = `Hello你剛才說的是:${event.message.text}`
  event.reply(replyMsg).then(function (data) {
  }).catch(function (error) {
    console.log('發生錯誤：', error)
  })
})

bot.listen('/linewebhook', 3000)

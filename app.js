var linebot = require('linebot')

var bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', function (event) {
  var replyMsg = `Hello你剛才說的是:${event.message.text}`
  event.reply(replyMsg).then(function (data) {
  }).catch(function (error) {
    console.log('發生錯誤：', error)
  })
})

bot.listen('/linewebhook', process.env.PORT || 3000, function () {
  console.log('ready')
})

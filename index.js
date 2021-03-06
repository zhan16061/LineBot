
const line = require('@line/bot-sdk')
const express = require('express')
require('dotenv').config()
var photoUrl = require('./photo-url')

const config = {
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
}

const app = express()
app.post('/linewebhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
})

const client = new line.Client(config)
function handleEvent (event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null)
  }
  try {
    const nameMap = {
      '信翰': 'shin',
      '小寺': 'bart',
      '燦廷': 'louis',
      '阿展': 'zhan',
      '郭家': 'ken'
    }
    const chatText = event.message.text
    const personalKey = nameMap[chatText]

    if (!personalKey) return Promise.resolve(null)

    const personPhoto = photoUrl[personalKey]
    const personPhotoLength = personPhoto.org.length
    const randomNum = Math.floor(Math.random() * personPhotoLength)
    const preUrl = personPhoto.pre[randomNum]
    const orgUrl = personPhoto.org[randomNum]

    const returnObj = {
      'type': 'image',
      'originalContentUrl': orgUrl,
      'previewImageUrl': preUrl
    }
    // const returnObj = { type: 'text', text: event.message.text }
    return client.replyMessage(event.replyToken, returnObj)
  } catch (error) {
    console.log('occur error:', error)
  }
}

const PORT = process.env.PORT || 3000

app.listen(PORT, function () {
  console.log('App now running on port', PORT)
})

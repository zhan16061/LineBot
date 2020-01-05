
const line = require('@line/bot-sdk');
const express = require('express')

var configSet = require('./config')
var photoUrl = require('./photo-url')

const config = {
    channelAccessToken: configSet.CHANNEL_ACCESS_TOKEN,
    channelSecret: configSet.CHANNEL_SECRET
};

const app = express();
app.post('/linewebhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

const client = new line.Client(config);
function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }

    const nameMap = {
        '信翰': 'shin',
        '小寺': 'bart',
        '燦廷': 'louis',
        '阿展': 'zhan',
        '郭家': 'ken'
    }
    const chatText = event.message.text
    const personalKey = nameMap[chatText]

    const personPhoto = photoUrl[personalKey]
    const personPhotoLength = personPhoto.org.length
    const randomNum = Math.floor(Math.random() * personPhotoLength);
    const preUrl = personPhoto.pre[randomNum]
    const orgUrl = personPhoto.org[randomNum]
    
    const returnObj = {
        "type": "image",
        "originalContentUrl": orgUrl,
        "previewImageUrl": preUrl
    }
    console.log(returnObj)
    // const returnObj = { type: 'text', text: event.message.text }
    return client.replyMessage(event.replyToken, returnObj);
}

app.listen(3000);
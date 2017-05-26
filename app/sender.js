var request = require('request');
var config = require('../config');

var FORM_URL = 'https://smapi.gupshup.io/sm/api/facebook/smartmsg/embed/1b97cecf-d4aa-4060-a01d-a518be099eb3';

function sendForm(recipientId, {text}) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {text},
    buttons:[
      {
        "type":"web_url",
        "url": FORM_URL,
        "title":"Enter Details",
        "webview_height_ratio": "compact"
      }
    ]
  };

  callSendAPI(messageData);
}

function sendTextMessage(recipientId, {text}) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {text}
  };

  callSendAPI(messageData);
}

function callSendAPI(messageData) {
  request({
    uri: config.FACEBOOK_URI,
    qs: { access_token: config.PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s",
        messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });
}

module.exports = {
  sendTextMessage,
  sendForm,
};
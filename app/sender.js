var request = require('request');
var config = require('../config');

function sendTextMessage(recipientId, data = {}) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: data,
  };
  console.log('Trying to send data: ', messageData);
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
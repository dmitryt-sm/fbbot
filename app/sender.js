var request = require('request');
var config = require('../config');
var form = require('./form');

const FORM_REQUEST_URL = 'https://api.gupshup.io/sm/api/facebook/smartmsg/form/create';

function fetchForm() {
  request({
    uri: FORM_REQUEST_URL,
    headers: { apikey: config.GUPSHUP_API_KEY },
    method: 'POST',
    form: form

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s",
        messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      console.error(error, response.statusCode, body);
    }
  });
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
  fetchForm,
};
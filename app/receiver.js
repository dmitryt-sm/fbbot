var {sendTextMessage} = require('./sender');

const message = (text) => ({text});

const QUESTIONS = [
  {data: message('Hello and thanks for joining our credit program! I\'ll help you to choose the best credit. But at first, I need some information from your side. So, what is your first name?')},
  {data: message('What is your last name?')},
  {data: message('What is your birthdate?')},
  {data: message('How much you need?'), validate: v => !isNaN(v), errorMessage: message('I accept only numbers here')},
  {
    data: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text: 'What is the purpose?',
          buttons: [
            {"type":"postback", "title":"Option1", "payload":"Option1"},
            {"type":"postback", "title":"Option2", "payload":"Option2"},
            {"type":"postback", "title":"Option3", "payload":"Option3"},
          ]
        }
      }
    }
  },
  {data: message('Thanks, our administrators will contact with you')},
];

let currentQuestionIndex = -1;

function incQIndex() {
  const i = currentQuestionIndex;
  return (currentQuestionIndex = i < QUESTIONS.length - 1 ? i + 1 : -1);
}

function getNextQuestion() {
  return QUESTIONS[incQIndex()]['data'];
}

function receivedMessage({sender, recipient, timestamp, message}) {
  console.log("Received message for user %d and page %d at %d with message:", sender.id, recipient.id, timestamp);
  console.log(JSON.stringify(message));
  if (!message.text) {
    return false
  }
  if (currentQuestionIndex === -1) {
    return sendTextMessage(sender.id, getNextQuestion());
  }
  let cq = QUESTIONS[currentQuestionIndex];
  let answer = typeof cq.validate !== 'function' || cq.validate(message.text) ? getNextQuestion() : cq.errorMessage;
  return sendTextMessage(sender.id, answer);
}

module.exports = {
  receivedMessage: receivedMessage,
}
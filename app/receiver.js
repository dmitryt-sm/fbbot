var sendTextMessage = require('./sender');

const QUESTIONS = [
  {text: 'Hello and thanks for joining our credit program! I\'ll help you to choose the best credit. But at first, I need some information from your side. So, what is your first name?'},
  {text: 'What is your last name?'},
  {text: 'What is your birthdate?'},
  {text: 'How much you need?', validate: v => !isNaN(v), errorMessage: {text: 'I accept only numbers here'}},
  {text: 'What is the purpose?'},
];

let currentQuestionIndex = -1;

function incQIndex() {
  const i = currentQuestionIndex;
  return (currentQuestionIndex = i < QUESTIONS.length - 1 ? i + 1 : -1);
}

function receivedMessage({sender, recipient, timestamp, message}) {
  console.log("Received message for user %d and page %d at %d with message:", sender.id, recipient.id, timestamp);
  console.log(JSON.stringify(message));
  if (!message.text) {
    return false
  }
  if (currentQuestionIndex === -1) {
    return sendTextMessage(sender.id, QUESTIONS[incQIndex()]);
  }
  let cq = QUESTIONS[currentQuestionIndex];
  let answer = !cq.validator || cq.validator(message) ? QUESTIONS[incQIndex()] : cq.errorMessage;
  return sendTextMessage(sender.id, answer);
}

module.exports = receivedMessage;
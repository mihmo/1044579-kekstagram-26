const MAX_MESSAGE_LENGTH = 18;
const message = 'Привет, как дела?'

const chechMessageLength = (message) => !!(message.length < MAX_MESSAGE_LENGTH);

const showMessage = (message) => {
  return (chechMessageLength(message)) ? message : 'введенное сообщение слишком длинное';
}

console.log(chechMessageLength(message));
console.log(showMessage(message));

// if (message.length > MAX_MESSAGE_LENGTH) {
//   console.log('сообщение слишком длинное');
// }

// console.log(message.length);
// console.log(showMessage(message));

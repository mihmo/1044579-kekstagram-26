import { MAX_MESSAGE_LENGTH } from './setup.js';

// функция проверяет максимальную длинну строки (комментария)
const chechMessageLength = (message) => !!(message.length < MAX_MESSAGE_LENGTH);
const showMessage = (message) => (chechMessageLength(message)) ? message : 'введенное сообщение слишком длинное';


// функция проверяет, что введенные данные >= 0
const checkNumbers = (min, max)  => !!((min >= 0 && max >= 0));


// функция создает случайное целое число из указанного диапазона
const getRandomIntInclusive = (a, b) => {
  const min = Math.min(Math.ceil(a), Math.ceil(b));
  const max = Math.max(Math.floor(a), Math.floor(b));
  return checkNumbers(min, max) ? Math.floor(Math.random() * (max - min + 1)) + min : 'Указаны не верные параметры'; // Максимум и минимум включаются
};

export {getRandomIntInclusive};
export {showMessage};

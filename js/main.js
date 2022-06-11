const DESCRIPTIONS = [
  'Рассвет',
  'Моя нога',
  'Прекрасный кадр',
  'Вот что я думаю',
  'Прелесть',
  'Отпуск'
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = ['Иван', 'Ксения', 'Петр', 'Юля', 'Андрей', 'Матвей', 'Артём']; // Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.
const TOTAL_PHOTOS = 25;
const LIKE_MIN = 15;
const LIKE_MAX = 200;
const MAX_COMMENTS = 5;
const TOTAL_AVATARS = 6;
const MAX_MESSAGE_LENGTH = 18;

// функция проверяет максимальную длинну строки (комментария)
const chechMessageLength = (message) => !!(message.length < MAX_MESSAGE_LENGTH);
const showMessage = (message) => (chechMessageLength(message)) ? message : 'введенное сообщение слишком длинное';

// функция проверяет, что введенные данные >= 0
const checkNumbers = (min, max)  => !!((min >= 0 && max >= 0));

const getRandomIntInclusive = (a, b) => {
  const min = Math.min(Math.ceil(a), Math.ceil(b));
  const max = Math.max(Math.floor(a), Math.floor(b));
  return checkNumbers(min, max) ? Math.floor(Math.random() * (max - min + 1)) + min : 'Указаны не верные параметры'; // Максимум и минимум включаются
};

// функция генерирует массив ID
const idList = Array.from(Array(TOTAL_PHOTOS), (e, i) => ++i);
const photoUrlList = Array.from({length: TOTAL_PHOTOS}, (v, k) => `photos/${++k}.jpg`);
const avatarUrlList = Array.from({length: TOTAL_AVATARS}, (v, k) => `img/avatar-${++k}.svg`);

const getRandomArrayElement = (array) => array[getRandomIntInclusive(0, array.length - 1)];

const createComment = (id = 1) => ({
  id: getRandomIntInclusive(1, 200), // У каждого комментария есть идентификатор — id — случайное число. Идентификаторы не должны повторяться.
  avatar: getRandomArrayElement(avatarUrlList), // Поле avatar — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.
  message: getRandomArrayElement(MESSAGES), // Для формирования текста комментария — message — вам необходимо взять одно или два случайных предложения из представленных ниже:
  name: getRandomArrayElement(NAMES)
});

const createPhotoDescription = () => ({
  id: getRandomArrayElement(idList), // id, число — идентификатор описания. Это число от 1 до 25. Идентификаторы не должны повторяться.
  url: getRandomArrayElement(photoUrlList), // url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
  description: getRandomArrayElement(DESCRIPTIONS), // description, строка — описание фотографии. Описание придумайте самостоятельно.
  likes: getRandomIntInclusive(LIKE_MIN, LIKE_MAX), // likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
  comments: Array.from({length: getRandomIntInclusive(1, MAX_COMMENTS)}, createComment)
});

const createPhotoDescriptions = Array.from({length: TOTAL_PHOTOS}, createPhotoDescription);
createPhotoDescriptions();
// console.log(createPhotoDescriptions);

showMessage();

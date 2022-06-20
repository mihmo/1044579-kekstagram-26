import { TOTAL_PHOTOS, TOTAL_AVATARS, LIKE_MIN, LIKE_MAX, MAX_COMMENTS, MIN_ID, MAX_ID } from './setup.js';
import { getRandomIntInclusive } from './util.js';

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

// функция генерирует массив ID

//создает массив ИД нужной длинны
/**
 * Shuffles array in place. ES6 version https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 * @param {Array} a items An array containing the items.

 function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
*/

const idList = Array.from(Array(TOTAL_PHOTOS), (e, i) => ++i);
const shuffleArray = (array) => {
  for (let i = array.length -1; i > 0; i--) {
    const j = Math.floor(Math.random()*(i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
shuffleArray(idList);

const photoUrlList = Array.from({length: TOTAL_PHOTOS}, (v, k) => `photos/${++k}.jpg`);
const avatarUrlList = Array.from({length: TOTAL_AVATARS}, (v, k) => `img/avatar-${++k}.svg`);

const getRandomArrayElement = (array) => array[getRandomIntInclusive(0, array.length - 1)];

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomIntInclusive(min, max);
    if (previousValues.length >= (max - min + 1)) {
      // eslint-disable-next-line no-console
      console.error(`Перебраны все ID из диапазона от ${  min  } до ${ max }`);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomIntInclusive(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const createRandomIdFromArray = (array) => {
  let i = 0;
  return function () {
    i++;
    return array[i-1];
  };
};

const createCommentId = createRandomIdFromRangeGenerator(MIN_ID, MAX_ID);
const createPhotoId = createRandomIdFromArray(idList);

const createComment = () => ({
  id: createCommentId(), // У каждого комментария есть идентификатор — id — случайное число. Идентификаторы не должны повторяться.
  avatar: getRandomArrayElement(avatarUrlList), // Поле avatar — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.
  message: getRandomArrayElement(MESSAGES), // Для формирования текста комментария — message — вам необходимо взять одно или два случайных предложения из представленных ниже:
  name: getRandomArrayElement(NAMES)
});

const createPhotoDescription = () => ({
  id: createPhotoId(), // id, число — идентификатор описания. Это число от 1 до 25. Идентификаторы не должны повторяться.
  url: getRandomArrayElement(photoUrlList), // url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
  description: getRandomArrayElement(DESCRIPTIONS), // description, строка — описание фотографии. Описание придумайте самостоятельно.
  likes: getRandomIntInclusive(LIKE_MIN, LIKE_MAX), // likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
  comments: Array.from({length: getRandomIntInclusive(1, MAX_COMMENTS)}, createComment)
});

const createPhotoDescriptions = Array.from({length: TOTAL_PHOTOS}, createPhotoDescription);

export {createPhotoDescriptions};

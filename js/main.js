const PICTURE_COUNT = 25;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const COMMENTS_MIN = 0;
const COMMENTS_MAX = 30;
const AVATAR_MIN = 1;
const AVATAR_MAX = 6;

const NAMES = [
  'Иван',
  'Александр',
  'Сергей',
  'Михаил',
  'Алексей',
  'Владимир',
  'Антон',
  'Дмитрий',
  'Евгений',
  'Николай'
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTION = [
  'Самая лучшая фотография',
  'Самая профессиональная фотография',
  'Вся красота мира в одной картинке',
  'Моменты, которые запечатлены навсегда',
  'Счастье в каждом кадре',
  'Когда слова не нужны, достаточно фотографии',
  'История, рассказанная через объектив',
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRanomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const generateCommentId = createIdGenerator();

const createMessage = () => Array.from({length: getRandomInteger(1, 2)}, () => getRanomArrayElement(MESSAGE)).join(' ');

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(AVATAR_MIN, AVATAR_MAX)}.svg`,
  message: createMessage(),
  name: getRanomArrayElement(NAMES),
});

const createPhotoCard = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRanomArrayElement(DESCRIPTION),
  likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
  comments: Array.from({length: getRandomInteger(COMMENTS_MIN, COMMENTS_MAX)}, createComment)
});

const getPhotoCards = () => Array.from(
  {length: PICTURE_COUNT},
  (_, index) => createPhotoCard(index + 1));

getPhotoCards();

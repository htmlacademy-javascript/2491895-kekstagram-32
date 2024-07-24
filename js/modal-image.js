import { isEscapeKey } from './util.js';

const closeButton = document.querySelector('.big-picture__cancel');
const bigPictureSection = document.querySelector('.big-picture');
const bigPictureImage = bigPictureSection.querySelector('.big-picture__img img');
const likesCountElement = bigPictureSection.querySelector('.likes-count');
const commentCountElement = bigPictureSection.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureSection.querySelector('.comments-loader');
const captionElement = bigPictureSection.querySelector('.social__caption');
const commentsListElement = bigPictureSection.querySelector('.social__comments');
const commentElement = document.querySelector('#comment').content.querySelector('.social__comment');

const createComment = ({avatar, name, message}) => {
  const comment = commentElement.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = (comments) => {
  commentsListElement.textContent = '';

  const fragment = document.createDocumentFragment();
  comments.forEach((item) => {
    const comment = createComment(item);
    fragment.append(comment);
  });

  commentsListElement.append(fragment);
};

const closeBigPicture = () => {
  bigPictureSection.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

const onCancelButtonClick = () => {
  closeBigPicture();
};

const openModal = (photo) => {
  bigPictureSection.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');

  bigPictureImage.src = photo.url;
  bigPictureImage.alt = photo.description;
  likesCountElement.textContent = photo.likes;
  captionElement.textContent = photo.description;

  document.addEventListener('keydown', onDocumentKeydown);
  renderComments(photo.comments);
};

closeButton.addEventListener('click', onCancelButtonClick);

export {openModal};

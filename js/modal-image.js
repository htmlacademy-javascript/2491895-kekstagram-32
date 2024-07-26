import { isEscapeKey } from './util.js';

const COMMENT_PER_PORTION = 5;
const closeButton = document.querySelector('.big-picture__cancel');
const bigPictureSection = document.querySelector('.big-picture');
const bigPictureImage = bigPictureSection.querySelector('.big-picture__img img');
const likesCountElement = bigPictureSection.querySelector('.likes-count');
const commentsLoaderElement = bigPictureSection.querySelector('.comments-loader');
const captionElement = bigPictureSection.querySelector('.social__caption');
const commentsListElement = bigPictureSection.querySelector('.social__comments');
const commentElement = document.querySelector('#comment').content.querySelector('.social__comment');
const displayedCommentsCountElement = bigPictureSection.querySelector('.social__comment-shown-count');
const totalCommentsCountElement = bigPictureSection.querySelector('.social__comment-total-count');

let commentsShow = 0;
let comments = [];

const createComment = ({avatar, name, message}) => {
  const comment = commentElement.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = () => {
  commentsShow += COMMENT_PER_PORTION;

  if (commentsShow >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
    commentsShow = comments.length;
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();

  const visibleComments = comments.slice(0, commentsShow);
  visibleComments.forEach((commentData) => {
    const comment = createComment(commentData);
    fragment.append(comment);
  });

  commentsListElement.textContent = '';
  commentsListElement.append(fragment);
  displayedCommentsCountElement.textContent = commentsShow;
  totalCommentsCountElement.textContent = comments.length;
};

const closeBigPicture = () => {
  bigPictureSection.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsShow = 0;
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

const onCommentsLoaderClick = () => {
  renderComments();
};

const showPhotoModal = (photo) => {
  bigPictureSection.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsLoaderElement.classList.add('hidden');

  bigPictureImage.src = photo.url;
  bigPictureImage.alt = photo.description;
  likesCountElement.textContent = photo.likes;
  captionElement.textContent = photo.description;

  document.addEventListener('keydown', onDocumentKeydown);
  comments = photo.comments;
  if (comments.length > 0) {
    renderComments();
  }
};

closeButton.addEventListener('click', onCancelButtonClick);
commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

export {showPhotoModal};

import { isEscapeKey } from './util.js';
import { renderPictureThumbnails } from './thumbnail-renderer.js';

const COMMENT_PER_PORTION = 5;
const rowArray = renderPictureThumbnails;
const minArrPhotos = document.querySelectorAll('.picture');
const closeButton = document.querySelector('.big-picture__cancel');
const bigPictureSection = document.querySelector('.big-picture'); // Секция большого изображения
const bigPictureImage = bigPictureSection.querySelector('.big-picture__img img'); // Элемент изображения в секции
const likesCountElement = bigPictureSection.querySelector('.likes-count'); // Элемент, показывающий количество лайков
const displayedCommentsCountElement = bigPictureSection.querySelector('.social__comment-shown-count'); // Элемент, показывающий количество отображаемых комментариев
const totalCommentsCountElement = bigPictureSection.querySelector('.social__comment-total-count'); // Элемент, показывающий общее количество комментариев
const commentCountElement = bigPictureSection.querySelector('.social__comment-count'); // Элемент, показывающий количество комментариев
const commentsLoaderElement = bigPictureSection.querySelector('.comments-loader'); // Элемент загрузчика комментариев
const captionElement = bigPictureSection.querySelector('.social__caption'); // Элемент, показывающий подпись к изображению
const commentsListElement = bigPictureSection.querySelector('.social__comments'); // Список комментариев
const commentTemplateElement = bigPictureSection.querySelector('.social__comment'); // Шаблон комментария
let commentsShowArray = [];

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const closeBigPicture = () => {
  bigPictureSection.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', closeBigPicture);
  commentsLoaderElement.removeEventListener('click', showMoreComments);
};


const renderComments = (comments) => {
  commentsListElement.textContent = '';

  comments.forEach((comment) => {
    const commentElement = commentTemplateElement.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    commentsListElement.appendChild(commentElement);
  });
};

function showMoreComments() {
  if (commentsShowArray.length > 0) {
    const additionalComments = commentsShowArray.splice(commentsListElement.children.length, commentsListElement.children.length + COMMENT_PER_PORTION);

    renderComments(additionalComments);

    commentCountElement.textContent = `${commentsListElement.children.length} из ${commentsShowArray.length} комментариев`;
  }

  if (commentsShowArray.length < commentsListElement.children.length) {
    commentsLoaderElement.classList.add('hidden');
  }
}

function fillComments({comments}) {
  const showFirstComments = comments.slice(0, COMMENT_PER_PORTION);
  renderComments(showFirstComments);
  displayedCommentsCountElement.textContent = `${showFirstComments.length}`;
  totalCommentsCountElement.textContent = `${comments.length}`;


  if (showFirstComments.length >= comments.length) {
    commentCountElement.classList.add('hidden');
    commentsLoaderElement.classList.add('hidden');
  }
}

const openModal = (element, photo) => {
  element.addEventListener('click', () => {
    commentCountElement.classList.remove('hidden');
    commentsLoaderElement.classList.remove('hidden');

    commentsShowArray = photo.comments;
    bigPictureSection.classList.remove('hidden');
    document.body.classList.add('modal-open');

    bigPictureImage.src = photo.url;
    likesCountElement.textContent = photo.likes;
    displayedCommentsCountElement.textContent = photo.comments.length;
    totalCommentsCountElement.textContent = photo.comments.length;
    captionElement.textContent = photo.description;

    commentsLoaderElement.addEventListener('click', showMoreComments);

    fillComments(photo);
    document.addEventListener('keydown', onDocumentKeydown);
    closeButton.addEventListener('click', closeBigPicture);
  });
};

const openPhoto = function() {
  minArrPhotos.forEach((photo, index) => {
    openModal(photo, rowArray[index]);
  });
};


export {openPhoto};

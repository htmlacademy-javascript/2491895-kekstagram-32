import {isEscapeKey} from './util.js';
import {resetScale} from './scale.js';
import {initEffect, resetEffect} from './effect-photo.js';
import {hideMessage} from './message-form.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const body = document.querySelector('body');
const form = body.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const closeButton = form.querySelector('.img-upload__cancel');
const fileField = form.querySelector('.img-upload__input');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');
const photoPreview = form.querySelector('.img-upload__preview img');
const effectsPreviews = overlay.querySelectorAll('.effects__preview');

const NUMBER_OF_HASHTAG = 5;
const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
const errorMessage = {
  INVALID_COUNT: `Максимальное количество хэш-тегов — ${NUMBER_OF_HASHTAG}.`,
  NOT_UNIQUE: 'Хэш-тег должен быть уникальным.',
  INVALID_SYMBOLS: 'Хэш-тег содержит недопустимые символы.',
  INVALID_COMMENT: 'Комментарий не может быть больше 140 символов.',
};

const submitButtontext = {
  IDLE: 'Опубликовать',
  SUBMITTING: 'Отправка...',
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = submitButtontext.SUBMITTING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = submitButtontext.IDLE;
};

const initializeFormSubmission = (callback) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      Promise.resolve(callback(new FormData(form)))
        .finally(unblockSubmitButton);
    }
  });
};

const hideModal = () => {
  form.reset();
  pristine.reset();
  body.classList.remove('modal-open');
  overlay.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const normalizeHashtag = (tadString) => tadString.trim().split(' ').filter((tag) => Boolean(tag.length));

const hasValidTags = (value) => normalizeHashtag(value).every((tag) => HASHTAG_PATTERN.test(tag));

const hasValidCount = (value) => normalizeHashtag(value).length <= NUMBER_OF_HASHTAG;

const hasUniqueTags = (value) => {
  const lowerTags = normalizeHashtag(value).map((tag) => tag.toLowerCase());
  return new Set(lowerTags).size === lowerTags.length;
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    const messageElement = document.querySelector('.error');
    if (messageElement) {
      hideMessage();
    }
    return hideModal();
  }
}

const onCancelButtonClick = () => {
  hideModal();
};

const showModal = () => {
  body.classList.add('modal-open');
  resetScale();
  resetEffect();
  overlay.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};
const onFileFieldChange = () => {
  const file = fileField.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    photoPreview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${photoPreview.src})`;
    });
    showModal();
  }
};

const onInputKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

hashtagField.addEventListener('keydown', onInputKeydown);
commentField.addEventListener('keydown', onInputKeydown);

pristine.addValidator(hashtagField, hasValidCount, errorMessage.INVALID_COUNT, 3, true);
pristine.addValidator(hashtagField, hasUniqueTags, errorMessage.NOT_UNIQUE, 2, true);
pristine.addValidator(hashtagField, hasValidTags, errorMessage.INVALID_SYMBOLS, 1, true);

fileField.addEventListener('change', onFileFieldChange);
closeButton.addEventListener('click', onCancelButtonClick);

initEffect();

export {initializeFormSubmission , hideModal, blockSubmitButton, unblockSubmitButton};

import {isEscapeKey} from './util.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');

function hideMessage() {
  const messageElement = document.querySelector('.succses') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  body.removeEventListener('click', onBodyClick);
}

function onBodyClick(evt) {
  if (evt.target.closest('.succses') || evt.target.closest('.error')) {
    return;
  }
  hideMessage();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

const showMessage = (messageElement, closeButtonClass) => {
  body.append(messageElement);
  document.addEventListener('keydown', onDocumentKeydown);
  body.addEventListener('click', onBodyClick);
  messageElement.querySelector(closeButtonClass).addEventListener('click', hideMessage);
};

const showSuccsessMessage = () => {
  showMessage(successMessageTemplate, '.succses__button');
};

const showErrorMessage = () => {
  showMessage(errorMessageTemplate, '.error__button');
};

export {showSuccsessMessage, showErrorMessage};

import {isEscapeKey} from './util.js';
import {blockSubmitButton, hideModal, unblockSubmitButton} from './form.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');

let isErrorMessageOpen = false;

function hideMessage() {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  body.removeEventListener('click', onBodyClick);
  unblockSubmitButton();

  isErrorMessageOpen = false;
}

function onBodyClick(evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  hideMessage();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (isErrorMessageOpen) {
      hideMessage();
    }
    return hideModal();
  }
}

const showMessage = (messageElement, closeButtonClass) => {
  body.append(messageElement);
  document.addEventListener('keydown', onDocumentKeydown);
  body.addEventListener('click', onBodyClick);
  messageElement.querySelector(closeButtonClass).addEventListener('click', hideMessage);
  isErrorMessageOpen = true;
};

const showSuccsessMessage = () => {
  showMessage(successMessageTemplate, '.success__button');
};

const showErrorMessage = () => {
  blockSubmitButton();
  showMessage(errorMessageTemplate, '.error__button');
};

export {showSuccsessMessage, showErrorMessage, hideMessage};

import {renderGallery} from './gallery.js';
import {initializeFormSubmission , hideModal} from './form.js';
import {getData, sendData} from './api.js';
import {showAlert} from './util.js';
import {showSuccsessMessage, showErrorMessage} from './message-form.js';

initializeFormSubmission((data) => {
  sendData(data)
    .then(() => {
      hideModal();
      showSuccsessMessage();
    })
    .catch(() => {
      showErrorMessage();
    });
});

getData()
  .then((data) => {
    renderGallery(data);
  })
  .catch(() => {
    showAlert();
  });

import {renderGallery} from './gallery.js';
import {setUserFormSubmit , hideModal} from './form.js';
import {getData, sendData} from './api.js';
import {showAlert} from './util.js';
import {showSuccsessMessage, showErrorMessage} from './message-form.js';

setUserFormSubmit((data) => {
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

import {renderGallery} from './gallery.js';
import {initializeFormSubmission , hideModal} from './form.js';
import {getData, sendData} from './api.js';
import {showAlert, debounce} from './util.js';
import {showSuccsessMessage, showErrorMessage} from './message-form.js';
import {initFilter, getFilteredPictures} from './filter.js';

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
    const debouncedRenderGallery = debounce(renderGallery);
    initFilter(data, debouncedRenderGallery);
    renderGallery(getFilteredPictures());
  })
  .catch(() => {
    showAlert();
  });

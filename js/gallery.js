import {renderPictureThumbnails} from './thumbnail-renderer.js';
import { openModal } from './modal-image.js';

const container = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }

    evt.preventDefault();
    const picture = pictures.find(
      (item) => item.id === +thumbnail.dataset.thumbnailId
    );
    openModal(picture);
  });

  renderPictureThumbnails(pictures, container);
};


export {renderGallery};

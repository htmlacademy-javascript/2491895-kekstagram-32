import {renderPictureThumbnails} from './thumbnail-renderer.js';
import {showPhotoModal} from './modal-image.js';

const container = document.querySelector('.pictures');

let pictures = [];

const onContainerClick = (evt) => {
  const thumbnail = evt.target.closest('[data-thumbnail-id]');
  if (!thumbnail) {
    return;
  }

  evt.preventDefault();
  const picture = pictures.find(
    (item) => item.id === +thumbnail.dataset.thumbnailId
  );
  showPhotoModal(picture);
};

const renderGallery = (currentPictures) => {
  pictures = currentPictures;
  renderPictureThumbnails(pictures, container);
  container.addEventListener('click', onContainerClick);

};

export {renderGallery};

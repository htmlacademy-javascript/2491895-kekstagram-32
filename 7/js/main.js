import {getPhotoCards} from './mock-data.js';
import {renderPictureThumbnails} from './thumbnail-renderer.js';
import {openPhoto} from './Image-modal.js';

renderPictureThumbnails(getPhotoCards());

openPhoto();

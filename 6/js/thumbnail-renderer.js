const thumbnailTemplate = document.querySelector('#picture').content;
const picturesContainer = document.querySelector('.pictures');


const createPictureThumbnail = ({url, description, likes, comments}) => {
  const thumbnailElement = thumbnailTemplate.cloneNode(true);
  const img = thumbnailElement.querySelector('.picture__img');

  img.src = url;
  img.alt = description;
  thumbnailElement.querySelector('.picture__likes').textContent = likes;
  thumbnailElement.querySelector('.picture__comments').textContent = comments.length;

  return thumbnailElement;
};

const renderPictureThumbnails = (pictures) => {
  const documentFragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnail = createPictureThumbnail(picture);
    documentFragment.appendChild(thumbnail);
  });

  picturesContainer.appendChild(documentFragment);
};

export {renderPictureThumbnails};


const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');


const createPictureThumbnail = ({url, description, likes, comments, id}) => {
  const thumbnailElement = thumbnailTemplate.cloneNode(true);
  const img = thumbnailElement.querySelector('.picture__img');

  img.src = url;
  img.alt = description;
  thumbnailElement.querySelector('.picture__likes').textContent = likes;
  thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
  thumbnailElement.dataset.thumbnailId = id;

  return thumbnailElement;
};

const renderPictureThumbnails = (pictures, container) => {
  const documentFragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnail = createPictureThumbnail(picture);
    documentFragment.appendChild(thumbnail);
  });

  container.appendChild(documentFragment);
};

export {renderPictureThumbnails};


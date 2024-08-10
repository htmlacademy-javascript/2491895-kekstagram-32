const PICTURE_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filterElement = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;
let pictures = [];

const getFilteredPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...pictures].sort(() => Math.random() - 0.5).slice(0, PICTURE_COUNT);

    case Filter.DISCUSSED:
      return [...pictures].sort((a, b) => b.comments.length - a.comments.length);

    default:
      return pictures;
  }
};
const onFilterClick = (callback) => (evt) => {
  const button = evt.target.closest('.img-filters__button');
  if (!button || button.id === currentFilter) {
    return;
  }

  filterElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
  currentFilter = button.id;
  callback(getFilteredPictures());
};

const initFilter = (loadedPictures, callback) => {
  filterElement.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  filterElement.addEventListener('click', onFilterClick(callback));
};

export {initFilter, getFilteredPictures};

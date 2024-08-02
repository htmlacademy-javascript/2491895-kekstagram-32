const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const modalElement = document.querySelector('.img-upload');
const smallerButton = modalElement.querySelector('.scale__control--smaller');
const biggerButton = modalElement.querySelector('.scale__control--bigger');
const scaleValue = modalElement.querySelector('.scale__control--value');
const imageElement = modalElement.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imageElement.style.transform = `scale(${value / 100})`;
  scaleValue.value = `${value}%`;
};

const getCurrentScale = () => parseInt(scaleValue.value, 10);

const decreaseScale = () => {
  const currentValue = getCurrentScale();
  if (currentValue > MIN_SCALE) {
    scaleImage(currentValue - SCALE_STEP);
  }
};

const increaseScale = () => {
  const currentValue = getCurrentScale();
  if (currentValue < MAX_SCALE) {
    scaleImage(currentValue + SCALE_STEP);
  }
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

smallerButton.addEventListener('click', decreaseScale);
biggerButton.addEventListener('click', increaseScale);

export {resetScale};

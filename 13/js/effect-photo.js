const effect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const effectToFilter = {
  chrome: { style: 'grayscale', unit: '' },
  sepia: { style: 'sepia', unit: '' },
  marvin: { style: 'invert', unit: '%' },
  phobos: { style: 'blur', unit: 'px' },
  heat: { style: 'brightness', unit: '' },
};

const effectOptions = {
  none: { min: 0, max: 100, step: 1 },
  chrome: { min: 0, max: 1, step: 0.1 },
  sepia: { min: 0, max: 1, step: 0.1 },
  marvin: { min: 0, max: 100, step: 1 },
  phobos: { min: 0, max: 3, step: 0.1 },
  heat: { min: 1, max: 3, step: 0.1 },
};

const modalElement = document.querySelector('.img-upload');
const imageElement = modalElement.querySelector('.img-upload__preview img');
const effectElement = modalElement.querySelector('.effects');
const effectLevelElement = modalElement.querySelector('.effect-level__value');
const sliderElement = modalElement.querySelector('.effect-level__slider');
const sliderContainerElement = modalElement.querySelector('.img-upload__effect-level');

let chosenEffect = effect.DEFAULT;

const isDefault = () => chosenEffect === effect.DEFAULT;

const setImageStyle = () => {
  if (isDefault()) {
    imageElement.style.filter = null;
    return;
  }

  const value = effectLevelElement.value;
  const effectFilter = effectToFilter[chosenEffect];
  imageElement.style.filter = `${effectFilter.style}(${value}${effectFilter.unit})`;
};

const showSlider = () => {
  sliderContainerElement.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainerElement.classList.add('hidden');
};

const onSliderUpdate = () => {
  effectLevelElement.value = sliderElement.noUiSlider.get();
  setImageStyle();
};

const createSlider = ({ min, max, step }) => {
  noUiSlider.create(sliderElement, {
    range: { min: min, max: max },
    step,
    start: min,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value;
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
  sliderElement.noUiSlider.on('update', onSliderUpdate);
  hideSlider();
};


const updateSlider = ({ min, max, step }) => {
  sliderElement.noUiSlider.updateOptions({
    range: { min: min, max: max },
    step,
    start: max,
  });
};

const setSlider = () => {
  if (isDefault()) {
    hideSlider();
  } else {
    updateSlider(effectOptions[chosenEffect]);
    showSlider();
  }
};

const setEffect = (value) => {
  chosenEffect = value;
  setSlider();
  setImageStyle();
};

const resetEffect = () => {
  setEffect(effect.DEFAULT);
};

const onEffectsChange = (evt) => {
  setEffect(evt.target.value);
};

const initEffect = () => {
  createSlider(effectOptions[chosenEffect]);
  effectElement.addEventListener('change', onEffectsChange);
};

export { resetEffect, initEffect };

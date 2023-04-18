import { popupProfile, popupAdd, popupOpenImg } from './index.js';

export const deleteErrors = (formElement) => {
    const errorsText = Array.from(document.querySelectorAll(`.form__input-error`));
    const errorsLine = Array.from(document.querySelectorAll(`.form__input_type_error`));
    errorsText.forEach((inputElement) => {
      inputElement.textContent = '';
    })
    errorsLine.forEach((inputElement) => {
      inputElement.classList.remove('form__input_type_error');
    })
  };

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
  }

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    deleteErrors();
  }
  
export function openImg() {
    openPopup(popupOpenImg);
  }
  
export  function keyHandler(evt) {
    if (evt.key === 'Escape') {
      closePopup(popupProfile);
      closePopup(popupAdd);
      closePopup(popupOpenImg);
    }
  };
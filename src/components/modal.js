import { labelCardName, labelLink, formElementNew, popupAdd, nameInput, labelName, jobInput, labelJob, cardsElements, popupProfile, popupOpenImg } from './consts.js';
import { toggleButtonState } from './validate.js';
import { initialCards } from './arrays.js';
import { createCard } from './card.js';

export const addCards = (link, name, cardElement) => {
  cardsElements.prepend(createCard(link, name, cardElement));
};

initialCards.forEach((item) => {
  addCards(item.link, item.name)
});

const overClose = () => {
  document.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup-profile')) {
      closePopup(popupProfile)
    } else if (evt.target.classList.contains('popup-add')) {
      closePopup(popupAdd)
    } else if (evt.target.classList.contains('popup-open-img')) {
      closePopup(popupOpenImg)
    };
  });
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  overClose();
  document.addEventListener('keydown', closeByEscape);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

export function openImg() {
  openPopup(popupOpenImg);
}

const escClose = () => {
  if (popupProfile.classList.contains('popup_opened')) {
    closePopup(popupProfile);
  } else if (popupAdd.classList.contains('popup_opened')) {
    closePopup(popupAdd);
  } else if (popupOpenImg.classList.contains('popup_opened')) {
    closePopup(popupOpenImg);
  }
};

export function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    escClose();
  }
};

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
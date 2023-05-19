import { labelCardName, labelLink, formElementNew, popupAdd, nameInput, labelName, jobInput, labelJob, cardsElements, popupProfile, popupOpenImg, cardTemplate } from './consts.js';
import { toggleButtonState } from './validate.js';
import { createCard } from './card.js';
import { request, config } from '../components/api.js';
import { deleteErrors } from '../components/utils.js';

const closeByOverlayClose = (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  };
};

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('mousedown', closeByOverlayClose);
  document.addEventListener('keydown', closeByEscape);
};

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('mousedown', closeByOverlayClose);
  document.removeEventListener('keydown', closeByEscape);
};

export function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

export function openProfile() {
  openPopup(popupProfile);
  deleteErrors(popupProfile);
  labelName.value = nameInput.textContent;
  labelJob.value = jobInput.textContent;
};

export function openAddCardPopup() {
  openPopup(popupAdd);
  formElementNew.reset();
  deleteErrors(popupAdd);
};
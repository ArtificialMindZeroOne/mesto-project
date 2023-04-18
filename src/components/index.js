import '../pages/index.css'; 

const editCard = document.querySelector('.card__edit-button');
const addCard = document.querySelector('.card__add-button');
export const popupProfile = document.querySelector('.popup-profile');
export const labelName = document.querySelector('[name="Name"]');
export const nameInput = document.querySelector('.card__title');
export const labelJob = document.querySelector('[name="Job"]');
export const jobInput = document.querySelector('.card__subtitle');
export const popupAdd = document.querySelector('.popup-add');
export const popupOpenImg = document.querySelector('.popup-open-img');
export const formElementNew = document.querySelector('[name="add-card"]');
const popup = document.querySelector('.popup_opened');
const closeButtons = document.querySelectorAll('.popup__close-icon');

const formElement = document.querySelector('[name="edit-profile"]');
export const labelCardName = document.querySelector('[name="CardName"]');
export const labelLink = document.querySelector('[name="Link"]');
const elementTitle = document.querySelector('.element__title');
const cardTemplate = document.querySelector('#card');
const cardsElements = document.querySelector('.elements');

import { deleteErrors, closePopup, openPopup, openImg, keyHandler } from '../components/utils.js';
import { createCard, cardDelete } from '../components/card.js'; 
import { showInputError, hideInputError, checkInputValidity, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation } from '../components/validate.js';
import { handleProfileFormSubmit, handleAddCardFormSubmit } from '../components/modal.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.reverse();

export const addCards = (link, name) => {
  cardsElements.prepend(createCard(link, name));
};

initialCards.forEach((item) => {
  addCards(item.link, item.name)
});

function openProfile() {
  openPopup(popupProfile);
  labelName.value = nameInput.textContent;
  labelJob.value = jobInput.textContent;
}

function newCard() {
  openPopup(popupAdd);
  formElementNew.reset();
}

editCard.addEventListener('click', openProfile);
addCard.addEventListener('click', newCard);

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

document.addEventListener('keydown', keyHandler);

formElement.addEventListener('submit', handleProfileFormSubmit);

formElementNew.addEventListener('submit', handleAddCardFormSubmit);

enableValidation();












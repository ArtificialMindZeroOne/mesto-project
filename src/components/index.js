import '../pages/index.css';
import { initialCards } from './arrays.js';
import { closePopup, openPopup, closeByEscape } from '../components/modal.js';
import { openProfile, openAddCardPopup } from '../components/utils.js';
import { createCard, cardDelete } from '../components/card.js';
import { showInputError, hideInputError, checkInputValidity, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation } from '../components/validate.js';
import { popupProfileOpenButton, popupAddCardButton, popup, popupCloseButtons, formElement, elementTitle, cardTemplate, cardsElements, popupAdd, formElementNew, popupProfile, labelName, nameInput, labelJob, jobInput, saveButton, labelCardName, labelLink, imgCard, formProfileSubmitButton, formAddCardSubmitButton, cardTemplateCont, popupOpenImg } from '../components/consts.js';

const addCard = (link, name, cardTemplate) => {
  cardsElements.prepend(createCard(link, name, cardTemplateCont));
};

initialCards.forEach((item) => {
  addCard(item.link, item.name)
});

function handleProfileFormSubmit(evt) {

  evt.preventDefault();

  nameInput.textContent = labelName.value;
  jobInput.textContent = labelJob.value;
  closePopup(popupProfile);


  formProfileSubmitButton.classList.add('popup__save-button_inactive');
  formProfileSubmitButton.disabled = true;
};

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const name = labelCardName.value;
  const link = labelLink.value;

  addCard(link, name);

  formElementNew.reset();

  closePopup(popupAdd);

  formAddCardSubmitButton.classList.add('popup__save-button_inactive');
  formAddCardSubmitButton.disabled = true;
};

function openImg() {
  openPopup(popupOpenImg);
}

popupCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

const configClasses = {
  formSelector: '.form',
  inputSelector: '.popup__label',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

enableValidation(configClasses);

popupProfileOpenButton.addEventListener('click', openProfile);
popupAddCardButton.addEventListener('click', openAddCardPopup);
imgCard.addEventListener('click', openImg);
formElement.addEventListener('submit', handleProfileFormSubmit);
formElementNew.addEventListener('submit', handleAddCardFormSubmit);
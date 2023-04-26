import '../pages/index.css';
import { addCards, closePopup, openPopup, openImg, closeByEscape } from '../components/modal.js';
import { deleteErrors } from '../components/modal.js';
import { openProfile, openAddCardPopup } from '../components/utils.js';
import { createCard, cardDelete } from '../components/card.js';
import { showInputError, hideInputError, checkInputValidity, hasInvalidInput, toggleButtonState, setEventListeners, config } from '../components/validate.js';
import { popupProfileOpenButton, popupAddCardButton, popup, popupCloseButtons, formElement, elementTitle, cardTemplate, cardsElements, popupAdd, formElementNew, popupProfile, labelName, nameInput, labelJob, jobInput, saveButton, labelCardName, labelLink, imgCard } from '../components/consts.js';

popupProfileOpenButton.addEventListener('click', openProfile);
popupAddCardButton.addEventListener('click', openAddCardPopup);
imgCard.addEventListener('click', openImg);
formElement.addEventListener('submit', handleProfileFormSubmit);
formElementNew.addEventListener('submit', handleAddCardFormSubmit);

function handleProfileFormSubmit(evt) {

  evt.preventDefault();

  nameInput.textContent = labelName.value;
  jobInput.textContent = labelJob.value;
  closePopup(popupProfile);

  saveButton.forEach((save) => {
    const button = save.closest('.popup__save-button')
    button.classList.add('popup__save-button_inactive');
    button.disabled = true;
  });
};

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const name = labelCardName.value;
  const link = labelLink.value;

  addCards(link, name);

  formElementNew.reset();

  closePopup(popupAdd);

  saveButton.forEach((save) => {
    const button = save.closest('.popup__save-button')
    button.classList.add('popup__save-button_inactive');
    button.disabled = true;
  });
};

popupCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

config();
import '../pages/index.css';
import { closePopup, openPopup, closeByEscape } from '../components/modal.js';
import { openProfile, openAddCardPopup } from '../components/utils.js';
import { createCard, valueId, addCard } from '../components/card.js';
import { showInputError, hideInputError, checkInputValidity, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation } from '../components/validate.js';
import { popupProfileOpenButton, popupAddCardButton, popup, popupCloseButtons, formElement, elementTitle, cardTemplate, cardsElements, popupAdd, formElementNew, popupProfile, labelName, nameInput, labelJob, jobInput, saveButton, labelCardName, labelLink, imgCard, formProfileSubmitButton, formAddCardSubmitButton, cardTemplateCont, popupOpenImg, numberOfLikes, basketButton, basketButtonAccept, avatarEditButton, avatarImg, avatarImgButtonAcept, labelImgUrl, imgCardAvatar } from '../components/consts.js';
import { titelProfile, formElements } from '../components/api.js';

avatarImgButtonAcept.addEventListener('submit', () => {
  renderLoading(true);
  fetch('https://nomoreparties.co/v1/plus-cohort-24/users/me/avatar ', {
    method: 'PATCH',
    headers: {
      authorization: 'caadd57f-8e95-4623-a4c1-d6d937fceff1',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: labelImgUrl.value
    })
  });
  imgCardAvatar.src = labelImgUrl.value;
  closePopup(avatarImg);
});

avatarEditButton.addEventListener('click', () => {
  openPopup(avatarImg);
});

function renderLoading(isLoading) {
  if (isLoading) {
    saveButton.textContent = 'Сохранение...'
  }
};

function handleProfileFormSubmit(evt) {
  renderLoading(true);
  fetch('https://nomoreparties.co/v1/plus-cohort-24/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'caadd57f-8e95-4623-a4c1-d6d937fceff1',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: labelName.value,
      about: labelJob.value
    })
  });

  nameInput.textContent = labelName.value
  jobInput.textContent = labelJob.value

  closePopup(popupProfile);

  formProfileSubmitButton.classList.add('popup__save-button_inactive');
  formProfileSubmitButton.disabled = true;

};

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  fetch('https://nomoreparties.co/v1/plus-cohort-24/cards', {
    method: 'POST',
    headers: {
      authorization: 'caadd57f-8e95-4623-a4c1-d6d937fceff1',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: labelCardName.value,
      link: labelLink.value
    })
  });

  const name = labelCardName.value;
  const link = labelLink.value;
  const likes = 0;

  addCard(link, name, likes);

  formElementNew.reset();

  closePopup(popupAdd);

  formAddCardSubmitButton.classList.add('popup__save-button_inactive');
  formAddCardSubmitButton.disabled = true
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
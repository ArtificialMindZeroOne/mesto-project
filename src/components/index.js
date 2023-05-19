import '../pages/index.css';
import { closePopup, openPopup, closeByEscape, openProfile, openAddCardPopup } from '../components/modal.js';
import { renderLoading, deleteErrors } from '../components/utils.js';
import { createCard, valueId, addCard } from '../components/card.js';
import { showInputError, hideInputError, checkInputValidity, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation } from '../components/validate.js';
import { popupProfileOpenButton, popupAddCardButton, popup, popupCloseButtons, formElement, elementTitle, cardTemplate, cardsElements, popupAdd, formElementNew, popupProfile, labelName, nameInput, labelJob, jobInput, saveButton, labelCardName, labelLink, imgCard, formProfileSubmitButton, formAddCardSubmitButton, cardTemplateCont, popupOpenImg, numberOfLikes, basketButton, basketButtonAccept, avatarEditButton, avatarImg, avatarImgButtonAcept, labelImgUrl, imgCardAvatar, formNewImg, saveButtonImg, formAddImgSubmitButton, saveButtonEdit, saveButtonAdd } from '../components/consts.js';
import { request, config, submitForm, addCardForm, submitImgForm, getUserInfo, getCards } from '../components/api.js';

export let userId;

Promise.all([getUserInfo(), getCards()])
  .then(([userData, cards]) => {
    nameInput.textContent = userData.name
    jobInput.textContent = userData.about
    imgCardAvatar.src = userData.avatar;
    imgCardAvatar.alt = 'аватар';
    userId = userData._id;
    cards.reverse();
    cards.forEach((item) => {
      addCard(item.link, item.name, item.likes.length, item._id, item.owner._id, item.likes)
    })
  })
  .catch(console.error);

function handleProfileFormSubmit(evt) {
  renderLoading(true, saveButtonEdit);
  submitForm()
    .then((res) => {
      closePopup(popupProfile)
      nameInput.textContent = labelName.value
      jobInput.textContent = labelJob.value
      formProfileSubmitButton.classList.add('popup__save-button_inactive');
      formProfileSubmitButton.disabled = true;
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, saveButtonEdit);
    })
};

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, saveButtonAdd);
  addCardForm()
    .then((res) => {
      addCard(res.link, res.name, res.likes.length, res._id, res.owner._id, res.likes);
      closePopup(popupAdd);
      formElementNew.reset();
      formAddCardSubmitButton.classList.add('popup__save-button_inactive');
      formAddCardSubmitButton.disabled = true
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, saveButtonAdd);
    })
};

avatarEditButton.addEventListener('click', () => {
  openPopup(avatarImg);
  formNewImg.reset();
  deleteErrors(avatarImg);
});

function handleImgFormSubmit() {
  renderLoading(true, saveButtonImg);
  submitImgForm()
    .then((res) => {
      imgCardAvatar.src = labelImgUrl.value;
      closePopup(avatarImg);
      formNewImg.reset();
      formAddImgSubmitButton.classList.add('popup__save-button_inactive');
      formAddImgSubmitButton.disabled = true
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, saveButtonImg);
    })
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
avatarImgButtonAcept.addEventListener('submit', handleImgFormSubmit);
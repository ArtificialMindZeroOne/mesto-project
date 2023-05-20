import '../pages/index.css';
import { closePopup, openPopup, closeByEscape, openProfile, openAddCardPopup, openImg } from '../components/modal.js';
import { renderLoading, deleteErrors, disableButton } from '../components/utils.js';
import { createCard, valueId, addCard } from '../components/card.js';
import { showInputError, hideInputError, checkInputValidity, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation } from '../components/validate.js';
import { popupProfileOpenButton, popupAddCardButton, popup, popupCloseButtons, profileForm, elementTitle, cardTemplate, cardsElements, popupAdd, formElementNew, popupProfile, labelName, nameInput, labelJob, jobInput, saveButton, labelCardName, labelLink, imgCard, formProfileSubmitButton, formAddCardSubmitButton, cardTemplateCont, popupOpenImg, numberOfLikes, basketButton, basketButtonAccept, avatarEditButton, avatarImg, avatarImgButtonAcept, labelImgUrl, imgCardAvatar, formNewImg, saveButtonImg, formAddImgSubmitButton, saveButtonEdit, saveButtonAdd } from '../components/consts.js';
import { request, config, setUserData, addNewCard, editAvatar, getUserInfo, getCards } from '../components/api.js';

export let userId;

Promise.all([getUserInfo(), getCards()])
  .then(([userData, cards]) => {
    nameInput.textContent = userData.name;
    jobInput.textContent = userData.about;
    imgCardAvatar.src = userData.avatar;
    imgCardAvatar.alt = userData.name;
    userId = userData._id;
    cards.reverse();
    cards.forEach((item) => {
      addCard(item.link, item.name, item.likes.length, item._id, item.owner._id, item.likes)
    })
  })
  .catch(console.error);

function handleProfileFormSubmit(evt) {
  renderLoading(true, saveButtonEdit);
  setUserData({ name: labelName.value, about: labelJob.value })
    .then((res) => {
      closePopup(popupProfile)
      nameInput.textContent = labelName.value
      jobInput.textContent = labelJob.value
      disableButton(formProfileSubmitButton);
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, saveButtonEdit);
    })
};

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, saveButtonAdd);
  addNewCard({ name: labelCardName.value, link: labelLink.value })
    .then((res) => {
      addCard(res.link, res.name, res.likes.length, res._id, res.owner._id, res.likes);
      closePopup(popupAdd);
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
  disableButton(formAddImgSubmitButton);
});

function handleImgFormSubmit() {
  renderLoading(true, saveButtonImg);
  editAvatar({ avatar: labelImgUrl.value })
    .then((res) => {
      imgCardAvatar.src = labelImgUrl.value;
      closePopup(avatarImg);
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, saveButtonImg);
    })
};

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
profileForm.addEventListener('submit', handleProfileFormSubmit);
formElementNew.addEventListener('submit', handleAddCardFormSubmit);
avatarImgButtonAcept.addEventListener('submit', handleImgFormSubmit);
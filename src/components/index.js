import '../pages/index.css';
import { closePopup, openPopup, closeByEscape, deleteErrors } from '../components/modal.js';
import { openProfile, openAddCardPopup, renderLoading } from '../components/utils.js';
import { createCard, valueId, addCard } from '../components/card.js';
import { showInputError, hideInputError, checkInputValidity, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation } from '../components/validate.js';
import { popupProfileOpenButton, popupAddCardButton, popup, popupCloseButtons, formElement, elementTitle, cardTemplate, cardsElements, popupAdd, formElementNew, popupProfile, labelName, nameInput, labelJob, jobInput, saveButton, labelCardName, labelLink, imgCard, formProfileSubmitButton, formAddCardSubmitButton, cardTemplateCont, popupOpenImg, numberOfLikes, basketButton, basketButtonAccept, avatarEditButton, avatarImg, avatarImgButtonAcept, labelImgUrl, imgCardAvatar, formNewImg, saveButtonImg, formAddImgSubmitButton, saveButtonEdit, saveButtonAdd } from '../components/consts.js';
import { request, config } from '../components/api.js';

export let userId;

request(`${config.baseUrl}/users/me`, { headers: config.headers })
  .then((res) => {
    nameInput.textContent = res.name
    jobInput.textContent = res.about
    imgCardAvatar.src = res.avatar;
    imgCardAvatar.alt = 'аватар';
    userId = res._id;
  });

request(`${config.baseUrl}/cards`, { headers: config.headers })
  .then((res) => {
    res.reverse();
    res.forEach((item) => {
      addCard(item.link, item.name, item.likes.length, item._id, item.owner._id, item.likes)
    })
  })

function handleProfileFormSubmit(evt) {
  renderLoading(true, saveButtonEdit);
  request(`${config.baseUrl}/users/me`, { method: 'PATCH', headers: config.headers, body: JSON.stringify({ name: labelName.value, about: labelJob.value }) })
    .finally(() => {
      renderLoading(false, saveButtonEdit);
      closePopup(popupProfile)
    })

  nameInput.textContent = labelName.value
  jobInput.textContent = labelJob.value

  formProfileSubmitButton.classList.add('popup__save-button_inactive');
  formProfileSubmitButton.disabled = true;

};

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, saveButtonAdd);
  request(`${config.baseUrl}/cards`, { method: 'POST', headers: config.headers, body: JSON.stringify({ name: labelCardName.value, link: labelLink.value }) })
    .then((res) => {
      addCard(res.link, res.name, res.likes.length, res._id, res.owner._id, res.likes);
    })
    .finally(() => {
      renderLoading(false, saveButtonAdd);
      closePopup(popupAdd);
    })

  formElementNew.reset();

  formAddCardSubmitButton.classList.add('popup__save-button_inactive');
  formAddCardSubmitButton.disabled = true
};

avatarEditButton.addEventListener('click', () => {
  openPopup(avatarImg);
  formNewImg.reset();
  deleteErrors(avatarImg);
});

function handleImgFormSubmit() {
  renderLoading(true, saveButtonImg);
  request(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH', headers: config.headers, body: JSON.stringify({ avatar: labelImgUrl.value })
  })
    .then((res) => {
      imgCardAvatar.src = labelImgUrl.value;
    })
    .finally(() => {
      renderLoading(false, saveButtonImg);
      closePopup(avatarImg);
      formNewImg.reset();
      formAddImgSubmitButton.classList.add('popup__save-button_inactive');
      formAddImgSubmitButton.disabled = true
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
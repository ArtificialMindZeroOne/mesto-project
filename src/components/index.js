import '../pages/index.css';
import { closePopup, openPopup, closeByEscape } from '../components/modal.js';
import { openProfile, openAddCardPopup } from '../components/utils.js';
import { createCard } from '../components/card.js';
import { showInputError, hideInputError, checkInputValidity, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation } from '../components/validate.js';
import { popupProfileOpenButton, popupAddCardButton, popup, popupCloseButtons, formElement, elementTitle, cardTemplate, cardsElements, popupAdd, formElementNew, popupProfile, labelName, nameInput, labelJob, jobInput, saveButton, labelCardName, labelLink, imgCard, formProfileSubmitButton, formAddCardSubmitButton, cardTemplateCont, popupOpenImg, numberOfLikes, basketButton, basketButtonAccept } from '../components/consts.js';


function deleteCard(ID) {
  fetch(`https://nomoreparties.co/v1/plus-cohort-23/cards/${ID}`, {
  method: 'DELETE',
  headers: {
    authorization: '1c1e41e8-343f-4a5c-8bcc-c0a790fbb38f',
    'Content-Type': 'application/json'
  }
  })
};



  basketButtonAccept.addEventListener('click', deleteCard)




fetch('https://nomoreparties.co/v1/plus-cohort-23/users/me', {
  headers: {
    authorization: '1c1e41e8-343f-4a5c-8bcc-c0a790fbb38f'
  }
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((result) => {
    nameInput.textContent = result.name
    jobInput.textContent = result.about
  });

fetch('https://nomoreparties.co/v1/plus-cohort-23/cards', {
  headers: {
    authorization: '1c1e41e8-343f-4a5c-8bcc-c0a790fbb38f'
  }
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((result) => {
    result.reverse()
    result.forEach((item) => {
      addCard(item.link, item.name, item.likes.length, item._id, item.owner._id)
    }) })

 

      .then((result) => {
    const b = result._id
          deleteCard(b);
        })


const addCard = (link, name, likes, id, ownerId, cardTemplate) => {
  cardsElements.prepend(createCard(link, name, likes, id, ownerId, cardTemplateCont));
};

function handleProfileFormSubmit(evt) {



  fetch('https://nomoreparties.co/v1/plus-cohort-23/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '1c1e41e8-343f-4a5c-8bcc-c0a790fbb38f',
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

  fetch('https://nomoreparties.co/v1/plus-cohort-23/cards', {
    method: 'POST',
    headers: {
      authorization: '1c1e41e8-343f-4a5c-8bcc-c0a790fbb38f',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: labelCardName.value,
      link: labelLink.value
    })
  });

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




 



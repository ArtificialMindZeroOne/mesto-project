import { popupProfileOpenButton, popupAddCardButton, popup, popupCloseButtons, formElement, elementTitle, cardTemplate, cardsElements, popupAdd, formElementNew, popupProfile, labelName, nameInput, labelJob, jobInput, saveButton, labelCardName, labelLink, imgCard, formProfileSubmitButton, formAddCardSubmitButton, cardTemplateCont, popupOpenImg, numberOfLikes, basketButton, basketButtonAccept, imgCardAvatar } from '../components/consts.js';
import { addCard } from '../components/card.js';

export const avatarImage = fetch('https://nomoreparties.co/v1/plus-cohort-24/users/me', {
  headers: {
    authorization: 'caadd57f-8e95-4623-a4c1-d6d937fceff1'
  }
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((result) => {
    imgCardAvatar.src = result.avatar;
    imgCardAvatar.alt = 'аватар';
  })
  .catch((err) => {
    console.log(err);
  });

export const titelProfile = fetch('https://nomoreparties.co/v1/plus-cohort-24/users/me', {
  headers: {
    authorization: 'caadd57f-8e95-4623-a4c1-d6d937fceff1'
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

export const formElements = fetch('https://nomoreparties.co/v1/plus-cohort-24/cards', {
  headers: {
    authorization: 'caadd57f-8e95-4623-a4c1-d6d937fceff1'
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
      addCard(item.link, item.name, item.likes.length, item._id, item.owner._id, item.likes)
    })
  })
  .catch((err) => {
    console.log(err);
  });
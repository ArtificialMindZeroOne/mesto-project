import { popupProfile, popupAdd, popupOpenImg, cardTemplateCont, imgCard, imgTitle, basketButtonAccept, cardsElements } from './consts.js';
import { openPopup, closePopup } from './modal.js';

const elementBasket = document.querySelector('.popup__basket');

export const createCard = (link, name, likes, ID, ownerId, userId, cardTemplate, local) => {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const itemImg = cardElement.querySelector('.element__mask-group');
  cardElement.querySelector('.element__title').textContent = `${name}`;
  cardElement.querySelector('.element__numberOfLikes').textContent = `${likes}`;
  itemImg.src = `${link}`;
  itemImg.alt = `${name}`;

  itemImg.addEventListener('click', () => {
    openPopup(popupOpenImg);
    imgCard.src = `${link}`;
    imgCard.alt = `${name}`;
    imgTitle.textContent = `${name}`;
  })

  const heartActive = cardElement.querySelector('.element__group');
  const basketButton = cardElement.querySelector('.element__basket');

  fetch('https://nomoreparties.co/v1/plus-cohort-24/users/me', {
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

      const likesString = JSON.stringify(userId);

      if (likesString.includes(result._id)) {
        heartActive.classList.add('element__group_active')
      }
      if (ownerId === result._id) {
        basketButton.classList.add('element__basket_my')
      }
    })
    .catch((err) => {
      console.log(err);
    });

  const cardBasket = cardElement.querySelector('.element__basket');

  const numberOfLikes = cardElement.querySelector('.element__numberOfLikes');
  numberOfLikes.textContent = `${likes}`;

  let valueId;

  cardBasket.addEventListener('click', () => {
    openPopup(elementBasket);
    valueId = `${ID}`;

  })

  basketButtonAccept.addEventListener('click', () => {

    deleteCard(valueId);
    function deleteCard(ID) {
      fetch(`https://nomoreparties.co/v1/plus-cohort-24/cards/${ID}`, {
        method: 'DELETE',
        headers: {
          authorization: 'caadd57f-8e95-4623-a4c1-d6d937fceff1',
          'Content-Type': 'application/json'
        }
      })

      fetch('https://nomoreparties.co/v1/plus-cohort-24/users/me', {
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
          if (ownerId === result._id) {
            cardElement.closest('.element').remove();
          }
        })
        .catch((err) => {
          console.log(err);
        });
      closePopup(elementBasket);

    }
  });

  heartActive.addEventListener('click', () => {
    const b = numberOfLikes.textContent;
    if (heartActive.classList.contains('element__group_active')) {
      cardElement.querySelector('.element__numberOfLikes').textContent = b - 1;
    } else {
      cardElement.querySelector('.element__numberOfLikes').textContent = b - (-1);
    }
    heartActive.classList.toggle('element__group_active')

    valueId = `${ID}`;
    addLike(valueId);
    deleteLike(valueId);

    addLike(valueId);
    function addLike(ID) {
      fetch(`https://nomoreparties.co/v1/plus-cohort-24/cards/${ID}/likes`, {
        method: 'PUT',
        headers: {
          authorization: 'caadd57f-8e95-4623-a4c1-d6d937fceff1',
          'Content-Type': 'application/json'
        }
      })

    };

    function deleteLike(ID) {
      fetch(`https://nomoreparties.co/v1/plus-cohort-24/cards/${ID}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: 'caadd57f-8e95-4623-a4c1-d6d937fceff1',
          'Content-Type': 'application/json'
        }
      })
    };
  });

  return cardElement;
}

export const addCard = (link, name, likes, ID, ownerId, userId, cardTemplate) => {
  cardsElements.prepend(createCard(link, name, likes, ID, ownerId, userId, cardTemplateCont));
};
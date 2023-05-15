import { popupProfile, popupAdd, popupOpenImg, cardTemplateCont, imgCard, imgTitle, basketButtonAccept, cardsElements, saveButton } from './consts.js';
import { openPopup, closePopup } from './modal.js';
import { request, config } from '../components/api.js';
import { userId } from '../components/index.js';

const elementBasket = document.querySelector('.popup__basket');

let cardId;

export const createCard = (link, name, likesLength, id, ownerId, likes, cardTemplate) => {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const itemImg = cardElement.querySelector('.element__mask-group');
  cardElement.querySelector('.element__title').textContent = `${name}`;
  cardElement.querySelector('.element__numberOfLikes').textContent = `${likesLength}`;
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

  request(`${config.baseUrl}/users/me`, { headers: config.headers })
    .then((res) => {
      const string = JSON.stringify(likes);
      if (string.includes(res._id)) {
        heartActive.classList.add('element__group_active')
      }
    });

  if (ownerId === userId) {
    basketButton.classList.add('element__basket_my')
  }

  const cardBasket = cardElement.querySelector('.element__basket');

  const numberOfLikes = cardElement.querySelector('.element__numberOfLikes');

  const valueId = `${id}`;

  cardBasket.addEventListener('click', () => {
    openPopup(elementBasket);
    cardId = `${id}`;

  });

  heartActive.addEventListener('click', () => {
    if (heartActive.classList.contains('element__group_active')) {
      deleteLike(valueId);
    } else {
      addLike(valueId);
    }
    heartActive.classList.toggle('element__group_active')

    function addLike(ID) {
      request(`${config.baseUrl}/cards/${ID}/likes`, { method: 'PUT', headers: config.headers })
        .then((res) => {
          const reloadLikes = res.likes.length;
          numberOfLikes.textContent = `${reloadLikes}`;
        })
    };

    function deleteLike(ID) {
      request(`${config.baseUrl}/cards/${ID}/likes`, { method: 'DELETE', headers: config.headers })
        .then((res) => {
          const reloadLikes = res.likes.length;
          numberOfLikes.textContent = `${reloadLikes}`;
        })
    };
  });

  return cardElement;
}

export const addCard = (link, name, likesLength, id, ownerId, likes, cardTemplate) => {
  cardsElements.prepend(createCard(link, name, likesLength, id, ownerId, likes, cardTemplateCont));
};

basketButtonAccept.addEventListener('click', () => {
  deleteCard(cardId);
  function deleteCard(ID) {
    request(`${config.baseUrl}/cards/${ID}`, { method: 'DELETE', headers: config.headers })
      .then((res) => {
        closePopup(elementBasket);
        request(`${config.baseUrl}/cards`, { headers: config.headers })
          .then((res) => {
            res.reverse();
            res.forEach((item) => {
              addCard(item.link, item.name, item.likes.length, item._id, item.owner._id, item.likes)
            })
          })
      })
  };
});
import { popupProfile, popupAdd, popupOpenImg, cardTemplateCont, imgCard, imgTitle, basketButtonAccept, cardsElements, saveButton } from './consts.js';
import { openPopup, closePopup } from './modal.js';
import { request, config, addLike, deleteLike, deleteCard } from '../components/api.js';
import { userId } from '../components/index.js';

const elementBasket = document.querySelector('.popup__basket');

let cardId;

export const createCard = (link, name, likesLength, id, ownerId, likes, cardTemplate) => {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const itemImg = cardElement.querySelector('.element__mask-group');
  const numberOfLikes = cardElement.querySelector('.element__numberOfLikes');
  cardElement.querySelector('.element__title').textContent = `${name}`;
  numberOfLikes.textContent = `${likesLength}`;
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

  const string = JSON.stringify(likes);
  if (string.includes(userId)) {
    heartActive.classList.add('element__group_active')
  };

  if (ownerId === userId) {
    basketButton.classList.add('element__basket_my')
  }

  const cardBasket = cardElement.querySelector('.element__basket');

  const valueId = `${id}`;

  cardBasket.addEventListener('click', () => {
    openPopup(elementBasket);
    cardId = `${id}`;
    cardElement;
  });

  heartActive.addEventListener('click', () => {
    if (heartActive.classList.contains('element__group_active')) {
      deleteLike(valueId)
        .then((res) => {
          const reloadLikes = res.likes.length;
          numberOfLikes.textContent = `${reloadLikes}`;
        })
        .catch(console.error)
    } else {
      addLike(valueId)
        .then((res) => {
          const reloadLikes = res.likes.length;
          numberOfLikes.textContent = `${reloadLikes}`;
        })
        .catch(console.error)
    };
    heartActive.classList.toggle('element__group_active')
  });

  return cardElement;
}

export const addCard = (link, name, likesLength, id, ownerId, likes, cardTemplate) => {
  cardsElements.prepend(createCard(link, name, likesLength, id, ownerId, likes, cardTemplateCont));
};

basketButtonAccept.addEventListener('click', () => {
  const localCard = document.querySelector('.element');
  deleteCard(cardId)
    .then((res) => {
      closePopup(elementBasket);
      localCard.remove();
    })
    .catch(console.error)
});
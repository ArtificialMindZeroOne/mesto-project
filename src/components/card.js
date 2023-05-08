import { popupProfile, popupAdd, popupOpenImg, cardTemplateCont, imgCard, imgTitle, basketButtonAccept } from './consts.js';
import { openPopup, closePopup } from './modal.js';

const elementBasket = document.querySelector('.popup__busket');

export const createCard = (link, name, likes, id, ownerId, cardTemplate) => {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const itemImg = cardElement.querySelector('.element__mask-group');
  cardElement.querySelector('.element__title').textContent = `${name}`;
  cardElement.querySelector('.element__numberOfLikes').textContent = `${likes}`;
  itemImg.src = `${link}`;
  itemImg.alt = `${name}`;

  const heartActive = cardElement.querySelector('.element__group');
  heartActive.addEventListener('click', () => {
    heartActive.classList.toggle('element__group_active')
  });

  const cardBasket = cardElement.querySelector('.element__basket');
  cardBasket.addEventListener('click', basket);

  itemImg.addEventListener('click', () => {
    openPopup(popupOpenImg);
    imgCard.src = `${link}`;
    imgCard.alt = `${name}`;
    imgTitle.textContent = `${name}`;
  })

  const basketButton = cardElement.querySelector('.element__basket');



  

  if (ownerId === "0d9ff3eb74e6f1b57c44b172") {
    basketButton.classList.add('element__basket_my')
  }

  function basket() {
    if (ownerId === "0d9ff3eb74e6f1b57c44b172") {
      openPopup(elementBasket)
    }
  }

  return cardElement;
}










/* export const cardDelete = (evt) => {
  evt.target.closest('.element').remove();
} */
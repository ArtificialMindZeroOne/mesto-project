import { popupProfile, popupAdd, popupOpenImg, cardTemplateCont, imgCard, imgTitle } from './consts.js';
import { openPopup, closePopup } from './modal.js';

export const createCard = (link, name, cardTemplate) => {
  const cardElement = cardTemplateCont.querySelector('.element').cloneNode(true);
  const itemImg = cardElement.querySelector('.element__mask-group');
  cardElement.querySelector('.element__title').textContent = `${name}`;
  itemImg.src = `${link}`;
  itemImg.alt = `${name}`;

  const heartActive = cardElement.querySelector('.element__group');
  heartActive.addEventListener('click', () => {
    heartActive.classList.toggle('element__group_active')
  });

  const cardBasket = cardElement.querySelector('.element__basket');
  cardBasket.addEventListener('click', cardDelete);

  itemImg.addEventListener('click', () => {
    openPopup(popupOpenImg);
    imgCard.src = `${link}`;
    imgCard.alt = `${name}`;
    imgTitle.textContent = `${name}`;
  })

  return cardElement;
}

export const cardDelete = (evt) => {
  evt.target.closest('.element').remove();
}
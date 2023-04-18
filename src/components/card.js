const cardTemplateCont = document.querySelector('#card').content;
const imgCard = document.querySelector('.popup__opened-img');
const imgTitle = document.querySelector('.popup__img-title');
import { popupProfile, popupAdd, popupOpenImg } from './index.js';
import { openPopup, openImg, closePopup } from './utils.js';

export const createCard = (link, name) => {
    const cardElement = cardTemplateCont.querySelector('.element').cloneNode(true);
    const itemImg = cardElement.querySelector('.element__mask-group');
    const itemTitle = cardElement.querySelector('.element__title').textContent = `${name}`;
    itemImg.src = `${link}`;
    itemImg.alt = `${name}`;
  
    function openPopupImg(link, name) {
      itemImg.src = link;
      itemImg.alt = name;
    }
  
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

  imgCard.addEventListener('click', openImg);

  document.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(popupProfile);
      closePopup(popupAdd);
      closePopup(popupOpenImg);
    };
  });

 export const cardDelete = (evt) => {
    evt.target.closest('.element').remove();
  }
const editCard = document.querySelector('.card__edit-button');
const addCard = document.querySelector('.card__add-button');
const popupProfile = document.querySelector('.popup-profile');
const popup = document.querySelector('.popup_opened');
const popupAdd = document.querySelector('.popup-add');
const closeButtons = document.querySelectorAll('.popup__close-icon');
const popupOpenImg = document.querySelector('.popup-open-img');
const imgCard = document.querySelector('.popup__opened-img');
const imgTitle = document.querySelector('.popup__img-title');
const nameInput = document.querySelector('.card__title');
const jobInput = document.querySelector('.card__subtitle');
const formElement = document.querySelector('[name="edit-profile"]');
const formElementNew = document.querySelector('[name="add-card"]');
const labelName = document.querySelector('[name="Name"]');
const labelJob = document.querySelector('[name="Job"]');
const labelCardName = document.querySelector('[name="CardName"]');
const labelLink = document.querySelector('[name="Link"]');
const elementTitle = document.querySelector('.element__title');
const cardTemplate = document.querySelector('#card');
const cardTemplateCont = document.querySelector('#card').content;
const cardsElements = document.querySelector('.elements');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.reverse();

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function openProfile() {
  openPopup(popupProfile);
  labelName.value = nameInput.textContent;
  labelJob.value = jobInput.textContent;
}

function newCard() {
  openPopup(popupAdd);
  formElementNew.reset();
}

function openImg() {
  openPopup(popupOpenImg);
}

editCard.addEventListener('click', openProfile);
addCard.addEventListener('click', newCard);
imgCard.addEventListener('click', openImg);

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameInput.textContent = labelName.value;
  jobInput.textContent = labelJob.value;
  closePopup(popupProfile);
}

formElement.addEventListener('submit', handleProfileFormSubmit);

const cardDelete = (evt) => {
  evt.target.closest('.element').remove();
}

const createCard = (link, name) => {
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

const addCards = (link, name) => {
  cardsElements.prepend(createCard(link, name));
};

initialCards.forEach((item) => {
  addCards(item.link, item.name)
});

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = labelCardName.value;
  const link = labelLink.value;

  addCards(link, name);

  formElementNew.reset();
  closePopup(popupAdd);
};

formElementNew.addEventListener('submit', handleAddCardFormSubmit);
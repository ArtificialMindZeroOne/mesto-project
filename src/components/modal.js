import { labelCardName, labelLink, addCards, formElementNew, popupAdd, nameInput, labelName, jobInput, labelJob, popupProfile  } from './index.js';
import { closePopup } from './utils.js';
import { toggleButtonState } from './validate.js';
const saveButton = Array.from(document.querySelectorAll('.popup__save-button'));

export function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    nameInput.textContent = labelName.value;
    jobInput.textContent = labelJob.value;
    closePopup(popupProfile);
    
    saveButton.forEach((save) => {
    save.classList.add('popup__save-button_inactive');
    });
  }

export  function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    const name = labelCardName.value;
    const link = labelLink.value;
    addCards(link, name);
    formElementNew.reset();
    closePopup(popupAdd);
    saveButton.forEach((save) => {
      save.classList.add('popup__save-button_inactive');
      });
  };


 
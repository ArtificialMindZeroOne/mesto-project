import { openPopup } from '../components/modal.js';
import { popupAdd, popupProfile, labelName, nameInput, labelJob, jobInput, formElementNew, saveButton, formNewImg } from '../components/consts.js';
import { request, config } from '../components/api.js';

export function renderLoading(isLoading, button, buttonText = 'Сохранить', loadingText = 'Сохранение...') {
  if (isLoading) {
    button.textContent = loadingText
  } else {
    button.textContent = buttonText
  }
};

export const deleteErrors = (formElement) => {
  const errorsText = Array.from(formElement.querySelectorAll(`.form__input-error`));
  const errorsLine = Array.from(formElement.querySelectorAll(`.form__input_type_error`));
  errorsText.forEach((inputElement) => {
    inputElement.textContent = '';
  })
  errorsLine.forEach((inputElement) => {
    inputElement.classList.remove('form__input_type_error');
  })
};

export function disableButton(form) {
  form.classList.add('popup__save-button_inactive');
};
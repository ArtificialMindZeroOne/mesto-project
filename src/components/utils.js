import { openPopup } from '../components/modal.js';
import { popupAdd, popupProfile, labelName, nameInput, labelJob, jobInput, formElementNew, saveButton } from '../components/consts.js';
import { deleteErrors } from '../components/modal.js';
import { request, config } from '../components/api.js';

export function openProfile() {
    openPopup(popupProfile);
    deleteErrors(popupProfile);
    request(`${config.baseUrl}/users/me`, { headers: config.headers })
        .then((res) => {
            labelName.value = res.name;
            labelJob.value = res.about;
        })
}

export function openAddCardPopup() {
    openPopup(popupAdd);
    formElementNew.reset();
    deleteErrors(popupAdd);
};

// можно сделать универсальную функцию управления текстом кнопки с 3 и 4 необязательными аргументами
export function renderLoading(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...') {
  if (isLoading) {
    button.textContent = loadingText
  } else {
    button.textContent = buttonText
  }
}
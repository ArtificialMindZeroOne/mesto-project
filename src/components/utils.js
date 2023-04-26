import { openPopup } from '../components/modal.js';
import { popupAdd, popupProfile, labelName, nameInput, labelJob, jobInput, formElementNew } from '../components/consts.js';
import { deleteErrors } from '../components/modal.js';

export function openProfile() {
    openPopup(popupProfile);
    labelName.value = nameInput.textContent;
    labelJob.value = jobInput.textContent;
    deleteErrors();
}

export function openAddCardPopup() {
    openPopup(popupAdd);
    formElementNew.reset();
}
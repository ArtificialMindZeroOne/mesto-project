import { openPopup } from '../components/modal.js';
import { popupAdd, popupProfile, labelName, nameInput, labelJob, jobInput, formElementNew } from '../components/consts.js';
import { deleteErrors } from '../components/modal.js';

export function openProfile() {
    openPopup(popupProfile);
    fetch('https://nomoreparties.co/v1/plus-cohort-24/users/me', {
        headers: {
            authorization: 'caadd57f-8e95-4623-a4c1-d6d937fceff1'
        }
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((result) => {
            labelName.value = result.name;
            labelJob.value = result.about;
        })
    deleteErrors(popupProfile);
}

export function openAddCardPopup() {
    openPopup(popupAdd);
    formElementNew.reset();
    deleteErrors(popupAdd);
}
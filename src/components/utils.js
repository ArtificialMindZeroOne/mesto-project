import { openPopup } from '../components/modal.js';
import { popupAdd, popupProfile, labelName, nameInput, labelJob, jobInput, formElementNew } from '../components/consts.js';
import { deleteErrors } from '../components/modal.js';

export function openProfile() {
    openPopup(popupProfile);
    fetch('https://nomoreparties.co/v1/plus-cohort-23/users/me', {
        headers: {
            authorization: '1c1e41e8-343f-4a5c-8bcc-c0a790fbb38f'
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
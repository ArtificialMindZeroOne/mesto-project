(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{x:()=>H});var t=document.querySelector(".card__edit-button"),n=document.querySelector(".card__add-button"),r=document.querySelector(".popup-profile"),o=document.querySelector(".popup-add"),c=document.querySelector(".popup-open-img"),a=document.querySelector('[name="Name"]'),u=document.querySelector(".card__title"),s=document.querySelector('[name="Job"]'),i=document.querySelector(".card__subtitle"),d=document.querySelector('[name="add-card"]'),l=document.querySelectorAll(".popup__close-icon"),m=document.querySelector('[name="edit-profile"]'),p=document.querySelector('[name="CardName"]'),_=document.querySelector('[name="Link"]'),f=(document.querySelector(".element__title"),document.querySelector("#card"),document.querySelector(".elements")),v=document.querySelector("#card").content,y=document.querySelector(".popup__opened-img"),h=document.querySelector(".popup__img-title"),S=document.querySelectorAll(".popup__save-button"),b=document.querySelector("#form-profile-save"),q=document.querySelector("#form-add-card-save"),L=(document.querySelector(".element__numberOfLikes"),document.querySelector(".element__basket"),document.querySelector(".popup__basket-button")),k=document.querySelector(".card__avatar-edit"),E=document.querySelector(".popup__edit-img"),g=document.querySelector('[name="edit-img"]'),C=document.querySelector('[name="Img-link"]'),x=document.querySelector(".card__avatar");function U(e,t){return fetch(e,t).then(A)}function A(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))}var O,w={baseUrl:"https://nomoreparties.co/v1/plus-cohort-24",headers:{authorization:"caadd57f-8e95-4623-a4c1-d6d937fceff1","Content-Type":"application/json"}},N=document.querySelector(".popup__basket"),P=function(e,t,n,r,o,a,u){f.prepend(function(e,t,n,r,o,a,u){var s=u.querySelector(".element").cloneNode(!0),i=s.querySelector(".element__mask-group");s.querySelector(".element__title").textContent="".concat(t),s.querySelector(".element__numberOfLikes").textContent="".concat(n),i.src="".concat(e),i.alt="".concat(t),i.addEventListener("click",(function(){j(c),y.src="".concat(e),y.alt="".concat(t),h.textContent="".concat(t)}));var d=s.querySelector(".element__group"),l=s.querySelector(".element__basket");U("".concat(w.baseUrl,"/users/me"),{headers:w.headers}).then((function(e){JSON.stringify(a).includes(e._id)&&d.classList.add("element__group_active")})),o===H&&l.classList.add("element__basket_my");var m=s.querySelector(".element__basket"),p=s.querySelector(".element__numberOfLikes"),_="".concat(r);return m.addEventListener("click",(function(){j(N),O="".concat(r)})),d.addEventListener("click",(function(){var e;d.classList.contains("element__group_active")?(e=_,U("".concat(w.baseUrl,"/cards/").concat(e,"/likes"),{method:"DELETE",headers:w.headers}).then((function(e){var t=e.likes.length;p.textContent="".concat(t)}))):function(e){U("".concat(w.baseUrl,"/cards/").concat(e,"/likes"),{method:"PUT",headers:w.headers}).then((function(e){var t=e.likes.length;p.textContent="".concat(t)}))}(_),d.classList.toggle("element__group_active")})),s}(e,t,n,r,o,a,v))};L.addEventListener("click",(function(){var e;e=O,U("".concat(w.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:w.headers}).then((function(e){B(N),U("".concat(w.baseUrl,"/cards"),{headers:w.headers}).then((function(e){e.reverse(),e.forEach((function(e){P(e.link,e.name,e.likes.length,e._id,e.owner._id,e.likes)}))}))}))}));var T=function(e){e.target.classList.contains("popup_opened")&&B(document.querySelector(".popup_opened"))};function j(e){e.classList.add("popup_opened"),document.addEventListener("mousedown",T),document.addEventListener("keydown",J)}function B(e){e.classList.remove("popup_opened"),document.removeEventListener("mousedown",T),document.removeEventListener("keydown",J)}function J(e){"Escape"===e.key&&B(document.querySelector(".popup_opened"))}var D=function(e){var t=Array.from(e.querySelectorAll(".form__input-error")),n=Array.from(e.querySelectorAll(".form__input_type_error"));t.forEach((function(e){e.textContent=""})),n.forEach((function(e){e.classList.remove("form__input_type_error")}))};function M(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранить",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Сохранение...";t.textContent=e?r:n}var H,V=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))};U("".concat(w.baseUrl,"/users/me"),{headers:w.headers}).then((function(e){u.textContent=e.name,i.textContent=e.about,x.src=e.avatar,x.alt="аватар",H=e._id})),g.addEventListener("submit",(function(){U("".concat(w.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:w.headers,body:JSON.stringify({avatar:C.value})}).then((function(e){M(!0,S),B(E)})),x.src=C.value})),k.addEventListener("click",(function(){j(E)})),U("".concat(w.baseUrl,"/cards"),{headers:w.headers}).then((function(e){e.reverse(),e.forEach((function(e){P(e.link,e.name,e.likes.length,e._id,e.owner._id,e.likes)}))})),l.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){return B(t)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);V(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),V(n,r,t)}))}))}(t,e)}))}({formSelector:".form",inputSelector:".popup__label",submitButtonSelector:".popup__save-button",inactiveButtonClass:"popup__save-button_inactive",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active"}),t.addEventListener("click",(function(){j(r),D(r),U("".concat(w.baseUrl,"/users/me"),{headers:w.headers}).then((function(e){a.value=e.name,s.value=e.about}))})),n.addEventListener("click",(function(){j(o),d.reset(),D(o)})),y.addEventListener("click",(function(){j(c)})),m.addEventListener("submit",(function(e){U("".concat(w.baseUrl,"/users/me"),{method:"PATCH",headers:w.headers,body:JSON.stringify({name:a.value,about:s.value})}).then((function(e){M(!0,S),B(r)})),u.textContent=a.value,i.textContent=s.value,b.classList.add("popup__save-button_inactive"),b.disabled=!0})),d.addEventListener("submit",(function(e){e.preventDefault(),U("".concat(w.baseUrl,"/cards"),{method:"POST",headers:w.headers,body:JSON.stringify({name:p.value,link:_.value})}).then((function(e){M(!0,S),P(e.link,e.name,e.likes.length,e._id,e.owner._id,e.likes),B(o)})),d.reset(),q.classList.add("popup__save-button_inactive"),q.disabled=!0}))})();
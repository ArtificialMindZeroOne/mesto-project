export function request(url, options) {
  return fetch(url, options).then(checkResponse)
};

function checkResponse(res) {
  if (res.ok) {
      return res.json();
  };
  return Promise.reject(`Ошибка ${res.status}`);
};

export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-24',
  headers: {
    authorization: 'caadd57f-8e95-4623-a4c1-d6d937fceff1',
    'Content-Type': 'application/json',
  },
};
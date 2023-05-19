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

export function addLike(ID) {
  return request(`${config.baseUrl}/cards/${ID}/likes`, { method: 'PUT', headers: config.headers })
};

export function deleteLike(ID) {
  return request(`${config.baseUrl}/cards/${ID}/likes`, { method: 'DELETE', headers: config.headers })
};

export function setUserData(body) {
  return request(`${config.baseUrl}/users/me`, { method: 'PATCH', headers: config.headers, body: JSON.stringify(body) })
};

export function addNewCard(body) {
  return request(`${config.baseUrl}/cards`, { method: 'POST', headers: config.headers, body: JSON.stringify(body) })
};

export function editAvatar(body) {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH', headers: config.headers, body: JSON.stringify(body)
  })
};

export function deleteCard(ID) {
  return request(`${config.baseUrl}/cards/${ID}`, { method: 'DELETE', headers: config.headers })
};

export function getUserInfo() {
  return request(`${config.baseUrl}/users/me`, { headers: config.headers })
};

export function getCards() {
  return request(`${config.baseUrl}/cards`, { headers: config.headers })
};
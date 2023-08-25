import { getUserTokenFromLocalStorage } from './helper';

const host = 'https://painassasin.online/';
let url = '';

export const getAccessToken = async (email: string, password: string) => {
    url = 'user/token/';
    return fetch(host + url, {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password,
        }),
        headers: {
            'content-type': 'application/json',
        },
    }).then((response) => {
        if (response.status === 200) {
            return response.json();
        }

        throw new Error('Ошибка...');
    });
};

// export const getMyPlaylist = async () => {
//     url = 'catalog/track/favorite/all/';
//     return fetch(host + url, {
//         method: 'GET',
//         headers: {
//             Authorization: `Bearer ${getUserTokenFromLocalStorage()}`,
//         },
//     })
//         .then((response) => {
//             if (response.ok) {
//                 return response.json();
//             } else if (response.status === 401) {
//                 throw new Error('401');
//             } else throw new Error();
//         })
//         .then((json) => json as Track[]);
// };

export const addTrackToFavorite = async (id: number) => {
    url = `catalog/track/${id}/favorite/`;
    return fetch(host + url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${getUserTokenFromLocalStorage()}`,
        },
    }).then((response) => {
        if (response.ok) {
            console.log('лайк поставлен');
        } else if (response.status === 401) {
            throw new Error('401');
        } else {
            throw new Error();
        }
    });
};

export const deleteTrackToFavorite = async (id: number) => {
    url = `catalog/track/${id}/favorite/`;
    return fetch(host + url, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${getUserTokenFromLocalStorage()}`,
        },
    }).then((response) => {
        if (response.ok) {
            console.log('лайк убран');
        } else if (response.status === 401) {
            throw new Error('401');
        } else {
            throw new Error();
        }
    });
};

export const loginAPI = async (email: string, password: string) => {
    url = 'user/login/';
    return fetch(host + url, {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password,
        }),
        headers: {
            'content-type': 'application/json',
        },
    }).then((response) => {
        if (response.status === 200) {
            return response.json();
        }
        if (response.status === 401) {
            throw new Error('Пользователь с таким email или паролем не найден');
        }

        throw new Error('Ошибка...');
    });
};

export const registrationAPI = async (email: string, password: string) => {
    url = 'user/signup/';
    return fetch(host + url, {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password,
            username: email,
        }),
        headers: {
            'content-type': 'application/json',
        },
    }).then((response) => {
        if (response.status === 201) {
            return response.json();
        }
        if (response.status === 400) {
            throw new Error('Пользователь с таким именем уже существует.');
        }

        throw new Error('Ошибка...');
    });
};

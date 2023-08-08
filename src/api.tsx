const HOST = 'https://painassasin.online/';
let URL = '';

export const getAllSongs = () => {
    URL = 'catalog/track/all/  ';
    return fetch(HOST + URL, {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((json) => json);
};

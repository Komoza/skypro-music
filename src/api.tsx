import { Song } from './App';

const host = 'https://painassasin.online/';
let url = '';

export const getAllSongs = async () => {
    url = 'catalog/track/all/';
    return fetch(host + url, {
        method: 'GET',
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else throw Error;
        })
        .then((json) => json as Song[]);
};

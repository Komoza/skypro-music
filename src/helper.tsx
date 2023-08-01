export function saveUserToLocalStorage(user: { isAllowed: boolean }) {
    window.localStorage.setItem('user', JSON.stringify(user));
}

export function getUserFromLocalStorage() {
    const userString = window.localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
}

export function removeUserFromLocalStorage() {
    window.localStorage.removeItem('user');
}

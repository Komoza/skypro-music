import { User } from './App';

export function saveUserToLocalStorage(user: { isAllowed: boolean }) {
    localStorage.setItem('user', JSON.stringify(user));
}

export function getUserFromLocalStorage(): User | null {
    const userString = window.localStorage.getItem('user');
    return userString ? (JSON.parse(userString) as User) : null;
}

export function removeUserFromLocalStorage() {
    window.localStorage.removeItem('user');
}

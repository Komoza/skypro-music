import { User } from './cosntant';

export function saveUserToLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
}

export function getUserFromLocalStorage(): User | null {
    const userString = window.localStorage.getItem('user');
    return userString ? (JSON.parse(userString) as User) : null;
}

export function removeUserFromLocalStorage() {
    window.localStorage.removeItem('user');
}

export function getAccessUserTokenFromLocalStorage(): string {
    const userString = window.localStorage.getItem('user');
    const user: User | null = userString
        ? (JSON.parse(userString) as User)
        : null;
    return user ? user.accessToken.access : 'error';
}

export function getRefreshUserTokenFromLocalStorage(): string {
    const userString = window.localStorage.getItem('user');
    const user: User | null = userString
        ? (JSON.parse(userString) as User)
        : null;
    return user ? user.accessToken.refresh : 'error';
}

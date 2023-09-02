export interface AccessToken {
    refresh: string;
    access: string;
}

export interface UpdateToken {
    access: string;
}

export interface User {
    email: string;
    first_name: string;
    id: number;
    last_name: string;
    username: string;
    accessToken: AccessToken;
}

export interface Track {
    album: string;
    author: string;
    duration_in_seconds: number;
    genre: string;
    id: number;
    logo: null;
    name: string;
    release_date: string;
    track_file: string;
    stared_user: User[];
}

export interface Filters {
    author: null | string;
    genre: null | string;
    years: string;
}

export interface CustomError {
    status: number;
}

export interface SelectionsProps {
    id: number;
    items: Track[];
    name: string;
    owner: string;
}

export const selections = [
    {
        id: 1,
        name: 'Классическая музыка',
        img: '/src/img/playlist01.png',
        alt: 'Classical music',
    },
    {
        id: 2,
        name: 'Электронная музыка',
        img: '/src/img/playlist02.png',
        alt: 'Electonic music',
    },
    {
        id: 3,
        name: 'Рок музыка',
        img: '/src/img/playlist03.png',
        alt: 'Rock music',
    },
];

export const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
};

export const sortByDate = (a: string, b: string): number => {
    const dateA = new Date(a);
    const dateB = new Date(b);

    if (dateA < dateB) {
        return -1;
    } else if (dateA > dateB) {
        return 1;
    } else {
        return 0;
    }
};

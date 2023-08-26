export interface AccessToken {
    refresh: string;
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

export interface CustomError {
    status: number;
}

export const playlist = [
    {
        id: 1,
        name: 'Плейлист дня',
        img: './src/img/playlist01.png',
        alt: "day's playlist",
    },
    {
        id: 2,
        name: '100 танцевальных хитов',
        img: './src/img/playlist02.png',
        alt: "100 track's dances",
    },
    {
        id: 3,
        name: 'Инди-заряд',
        img: './src/img/playlist03.png',
        alt: 'Indi',
    },
];

export const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
};

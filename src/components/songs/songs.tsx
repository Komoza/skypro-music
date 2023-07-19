import React from 'react';

interface SongsProps {
    isLoadApp: Boolean;
}

const songs = [
    {
        title: './src/img/icon/sprite.svg#icon-note',
        name: 'Guilt',
        description: '',
        author: 'Nero',
        album: 'Welcome Reality',
        time: '4:44',
    },
    {
        title: './src/img/icon/sprite.svg#icon-note',
        name: 'Elektro',
        description: '',
        author: 'Dynoro, Outwork, Mr. Gee',
        album: 'Elektro',
        time: '2:22',
    },
    {
        title: './src/img/icon/sprite.svg#icon-note',
        name: 'I’m Fire',
        description: '',
        author: 'Ali Bakgor',
        album: 'I’m Fire',
        time: '2:22',
    },
    {
        title: './src/img/icon/sprite.svg#icon-note',
        name: 'Non Stop',
        description: '(Remix)',
        author: 'Стоункат, Psychopath',
        album: 'Non Stop',
        time: '4:12',
    },
    {
        title: './src/img/icon/sprite.svg#icon-note',
        name: 'Run Run',
        description: '(feat. AR/CO)',
        author: 'Jaded, Will Clarke, AR/CO',
        album: 'Run Run',
        time: '2:54',
    },
    {
        title: './src/img/icon/sprite.svg#icon-note',
        name: 'Eyes on Fire',
        description: '(Zeds Dead Remix)',
        author: 'Blue Foundation, Zeds Dead',
        album: 'Eyes on Fire',
        time: '5:20',
    },
    {
        title: './src/img/icon/sprite.svg#icon-note',
        name: 'Mucho Bien',
        description: '(Hi Profile Remix)',
        author: 'HYBIT, Mr. Black, Offer Nissim, Hi Profile',
        album: 'Mucho Bien',
        time: '3:41',
    },
    {
        title: './src/img/icon/sprite.svg#icon-note',
        name: 'Knives n Cherries',
        description: '',
        author: 'minthaze',
        album: 'Captivating',
        time: '1:48',
    },
    {
        title: './src/img/icon/sprite.svg#icon-note',
        name: 'How Deep Is Your Love',
        description: '',
        author: 'Calvin Harris, Disciples',
        album: 'How Deep Is Your Love',
        time: '3:32',
    },
    {
        title: './src/img/icon/sprite.svg#icon-note',
        name: 'Morena',
        description: '',
        author: 'Tom Boxer',
        album: 'Soundz Made in Romania',
        time: '3:36',
    },
];

const Playlist = () => {
    return songs.map((song, index) => {
        return (
            <div key={index} className="playlist__item">
                <div className="playlist__track track">
                    <div className="track__title">
                        <div className="track__title-image">
                            <svg
                                className="track__title-svg"
                                aria-label="music"
                            >
                                <use xlinkHref={song.title}></use>
                            </svg>
                        </div>
                        <div className="track__title-text">
                            <a className="track__title-link" href="http://">
                                {song.name}
                                <span className="track__title-span">
                                    &nbsp;{song.description}
                                </span>
                            </a>
                        </div>
                    </div>
                    <div className="track__author">
                        <a className="track__author-link" href="http://">
                            {song.author}
                        </a>
                    </div>
                    <div className="track__album">
                        <a className="track__album-link" href="http://">
                            {song.album}
                        </a>
                    </div>
                    <div className="track__time">
                        <svg className="track__time-svg" aria-label="time">
                            <use xlinkHref="./src/img/icon/sprite.svg#icon-like"></use>
                        </svg>
                        <span className="track__time-text">{song.time}</span>
                    </div>
                </div>
            </div>
        );
    });
};

const PlaylistSkeleton = () => {
    const playlistSkeleton = [];
    for (let i = 0; i < 10; i++) {
        playlistSkeleton.push(
            <div key={i} className="playlist__item">
                <div className="playlist__track track">
                    <div className="track__title">
                        <div className="track__title-image track__title-image--loading"></div>
                        <div className="track__title-text track__loading track__title-text--loading"></div>
                    </div>
                    <div className="track__author track__loading track__author--loading"></div>
                    <div className="track__album track__loading track__album--loading"></div>
                </div>
            </div>
        );
    }

    return playlistSkeleton;
};
export const Songs: React.FC<SongsProps> = ({ isLoadApp }) => {
    return (
        <div className="centerblock__content">
            <div className="content__title playlist-title">
                <div className="playlist-title__col col01">Трек</div>
                <div className="playlist-title__col col02">ИСПОЛНИТЕЛЬ</div>
                <div className="playlist-title__col col03">АЛЬБОМ</div>
                <div className="playlist-title__col col04">
                    <svg className="playlist-title__svg" aria-label="time">
                        <use xlinkHref="./src/img/icon/sprite.svg#icon-watch"></use>
                    </svg>
                </div>
            </div>
            <div className="content__playlist playlist">
                {isLoadApp ? <Playlist /> : <PlaylistSkeleton />}
            </div>
        </div>
    );
};

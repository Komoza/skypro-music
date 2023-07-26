import React from 'react';
import * as S from './songs.style';

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
            <S.playlistItem key={index}>
                <S.track>
                    <S.trackTitle>
                        <S.trackTitleImage>
                            <S.trackTitleSvg aria-label="music">
                                <use xlinkHref={song.title}></use>
                            </S.trackTitleSvg>
                        </S.trackTitleImage>
                        <S.trackTitleText>
                            <S.trackTitleLink href="http://">
                                {song.name}
                                <S.trackTitleSpan>
                                    &nbsp;{song.description}
                                </S.trackTitleSpan>
                            </S.trackTitleLink>
                        </S.trackTitleText>
                    </S.trackTitle>

                    <S.trackAuthor>
                        <S.trackAuthorLink href="http://">
                            {song.author}
                        </S.trackAuthorLink>
                    </S.trackAuthor>

                    <S.trackAlbum>
                        <S.trackAlbumLink href="http://">
                            {song.album}
                        </S.trackAlbumLink>
                    </S.trackAlbum>

                    <S.trackTime>
                        <S.trackTimeSvg aria-label="time">
                            <use xlinkHref="./src/img/icon/sprite.svg#icon-like"></use>
                        </S.trackTimeSvg>
                        <S.trackTimeText>{song.time}</S.trackTimeText>
                    </S.trackTime>
                </S.track>
            </S.playlistItem>
        );
    });
};

const PlaylistSkeleton = () => {
    const playlistSkeleton = [];
    for (let i = 0; i < 10; i++) {
        playlistSkeleton.push(
            <S.playlistItem key={i}>
                <S.track>
                    <S.trackTitle>
                        <S.trackTitleImageLoading></S.trackTitleImageLoading>
                        <S.trackTitleTextLoading></S.trackTitleTextLoading>
                    </S.trackTitle>
                    <S.trackAuthorLoading></S.trackAuthorLoading>
                    <S.trackAlbumLoading></S.trackAlbumLoading>
                </S.track>
            </S.playlistItem>
        );
    }

    return playlistSkeleton;
};

export const Songs: React.FC<SongsProps> = ({ isLoadApp }) => {
    return (
        <S.centerblockContent>
            <S.playlistTitle>
                <S.playlistTitleCol01>Трек</S.playlistTitleCol01>
                <S.playlistTitleCol02>ИСПОЛНИТЕЛЬ</S.playlistTitleCol02>
                <S.playlistTitleCol03>АЛЬБОМ</S.playlistTitleCol03>
                <S.playlistTitleCol04>
                    <S.playlistTitleSvg aria-label="time">
                        <use xlinkHref="./src/img/icon/sprite.svg#icon-watch"></use>
                    </S.playlistTitleSvg>
                </S.playlistTitleCol04>
            </S.playlistTitle>
            <S.playlist>
                {isLoadApp ? <Playlist /> : <PlaylistSkeleton />}
            </S.playlist>
        </S.centerblockContent>
    );
};

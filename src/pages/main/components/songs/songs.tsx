import * as S from './songs.style';
import { Track, User, formatTime } from '../../../../cosntant';
import { MusicState } from '../../../../store/actions/types/types';
import { useSelector, useDispatch } from 'react-redux';
import {
    loadingApp,
    setCurrentPlaylist,
    setCurrentTrack,
    setIsPlay,
    setPlaylist,
    user,
} from '../../../../store/actions/creators/creators';
import { RefObject, useEffect, useRef } from 'react';
import { getAllSongs, getMyPlaylist } from '../../../../api';
import { removeUserFromLocalStorage } from '../../../../helper';

interface PlaylistProps {
    refPlaylist: RefObject<HTMLDivElement>;
    playlist: Track[];
}

const Playlist: React.FC<PlaylistProps> = ({ playlist, refPlaylist }) => {
    const currentTrack = useSelector((state: MusicState) => state.currentTrack);
    const currentPlaylist = useSelector(
        (state: MusicState) => state.currentPlaylist
    );

    const currentTrackID = currentTrack ? currentTrack.id : null;
    const currentTrackRef = useRef<HTMLDivElement>(null);

    const isPlay: boolean = useSelector((state: MusicState) => state.isPlay);

    const dispatch = useDispatch();
    const handleClickTrack = (track: Track) => {
        if (currentTrack !== track) {
            dispatch(setIsPlay(true));
            dispatch(setCurrentTrack(track));

            // добавляем трек в виртуальный плейлист
            const newCurrentPlaylist: Track[] = [...currentPlaylist];

            // проверяем есть ли этот трек в виртуальном массиве, если есть удалим
            const indexFindTrack = newCurrentPlaylist.indexOf(track);
            if (indexFindTrack !== -1) {
                newCurrentPlaylist.splice(indexFindTrack, 1);
            }

            newCurrentPlaylist.push(track);

            dispatch(setCurrentPlaylist(newCurrentPlaylist));
        } else {
            dispatch(setIsPlay(!isPlay));
        }
    };

    useEffect(() => {
        if (currentTrackRef.current && refPlaylist.current) {
            const trackTop = currentTrackRef.current.offsetTop;
            const trackBottom = trackTop + currentTrackRef.current.offsetHeight;
            const areaTop = refPlaylist.current.scrollTop;
            const areaBottom = areaTop + refPlaylist.current.offsetHeight;

            if (trackTop < areaTop || trackBottom > areaBottom) {
                // Прокрутите область прокрутки к текущему треку
                refPlaylist.current.scrollTo({
                    top: trackTop - refPlaylist.current.offsetHeight,
                    behavior: 'smooth',
                });
            }
        }
    }, [currentTrack, refPlaylist]);

    if (!playlist.length) {
        return <S.errorGetSongs>Не удалось загрузить песни...</S.errorGetSongs>;
    } else {
        if (playlist) {
            return playlist.map((song) => {
                return (
                    <S.playlistItem key={song.id}>
                        <S.track
                            ref={
                                currentTrackID === song.id
                                    ? currentTrackRef
                                    : null
                            }
                            onClick={() => handleClickTrack(song)}
                        >
                            <S.trackTitle>
                                <S.trackTitleImage>
                                    {currentTrackID == song.id && (
                                        <S.trackTitleImageActive
                                            $isPlay={isPlay}
                                        ></S.trackTitleImageActive>
                                    )}
                                    <S.trackTitleSvg aria-label="music">
                                        <use
                                            xlinkHref={
                                                song.logo
                                                    ? song.logo
                                                    : './src/img/icon/sprite.svg#icon-note'
                                            }
                                        ></use>
                                    </S.trackTitleSvg>
                                </S.trackTitleImage>
                                <S.trackTitleText>
                                    <S.trackTitleLink>
                                        {song.name}
                                        <S.trackTitleSpan>
                                            {/* &nbsp;{song.description} */}
                                        </S.trackTitleSpan>
                                    </S.trackTitleLink>
                                </S.trackTitleText>
                            </S.trackTitle>

                            <S.trackAuthor>
                                <S.trackAuthorLink>
                                    {song.author}
                                </S.trackAuthorLink>
                            </S.trackAuthor>

                            <S.trackAlbum>
                                <S.trackAlbumLink>
                                    {song.album}
                                </S.trackAlbumLink>
                            </S.trackAlbum>

                            <S.trackTime>
                                <S.trackTimeSvg aria-label="time">
                                    <use xlinkHref="./src/img/icon/sprite.svg#icon-like"></use>
                                </S.trackTimeSvg>
                                <S.trackTimeText>
                                    {formatTime(song.duration_in_seconds)}
                                </S.trackTimeText>
                            </S.trackTime>
                        </S.track>
                    </S.playlistItem>
                );
            });
        }
    }
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

export const Songs = () => {
    const currentPage = useSelector((state: MusicState) => state.currentPage);
    const refPlaylist = useRef<HTMLDivElement>(null);

    const isLoadingApp: boolean = useSelector(
        (state: MusicState) => state.loadingApp
    );

    const playlist: Track[] = useSelector(
        (state: MusicState) => state.playlist
    );

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            dispatch(loadingApp(true));
            try {
                let data: Track[] = [];

                if (currentPage === '/') {
                    data = await getAllSongs();
                } else if (currentPage === '/playlist') {
                    data = await getMyPlaylist();
                }

                dispatch(setPlaylist(data));
            } catch (error: unknown) {
                if (error instanceof Error && error.message === '401') {
                    dispatch(user(null));
                    removeUserFromLocalStorage();
                }
                dispatch(setPlaylist([]));
            } finally {
                dispatch(loadingApp(false));
            }
        };

        void fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

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
            <S.playlist ref={refPlaylist}>
                {!isLoadingApp ? (
                    <Playlist playlist={playlist} refPlaylist={refPlaylist} />
                ) : (
                    <PlaylistSkeleton />
                )}
            </S.playlist>
        </S.centerblockContent>
    );
};

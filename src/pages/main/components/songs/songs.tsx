import * as S from './songs.style';
import { Track, formatTime } from '../../../../cosntant';
import { RootState } from '../../../../store/actions/types/types';
import { useSelector, useDispatch } from 'react-redux';
import {
    setCurrentPlaylist,
    setCurrentTrack,
    setIsPlay,
    user,
} from '../../../../store/actions/creators/creators';
import { RefObject, useEffect, useRef } from 'react';
import { addTrackToFavorite, deleteTrackToFavorite } from '../../../../api';
import { removeUserFromLocalStorage } from '../../../../helper';

import {
    // useGetAllFavoriteTracksQuery,
    useGetAllTracksQuery,
} from '../../../../services/tracks';

interface PlaylistProps {
    refPlaylist: RefObject<HTMLDivElement>;
    playlist: Track[];
}

const Playlist: React.FC<PlaylistProps> = ({ playlist, refPlaylist }) => {
    const currentTrack = useSelector(
        (state: RootState) => state.otherState.currentTrack
    );
    const currentPlaylist = useSelector(
        (state: RootState) => state.otherState.currentPlaylist
    );
    const userState = useSelector((state: RootState) => state.otherState.user);
    const currentTrackID = currentTrack ? currentTrack.id : null;
    const currentTrackRef = useRef<HTMLDivElement>(null);
    const currentPageState = useSelector(
        (state: RootState) => state.otherState.currentPage
    );
    const isPlay: boolean = useSelector(
        (state: RootState) => state.otherState.isPlay
    );

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

    const handleClickLike = (
        event: React.MouseEvent<SVGSVGElement, MouseEvent>,
        id: number
    ) => {
        event.stopPropagation();
        const fetchData = async () => {
            try {
                await addTrackToFavorite(id);
            } catch (error: unknown) {
                if (error instanceof Error && error.message === '401') {
                    dispatch(user(null));
                    removeUserFromLocalStorage();
                }
            }
        };

        void fetchData();
    };
    const handleClickDislike = (
        event: React.MouseEvent<SVGSVGElement, MouseEvent>,
        id: number
    ) => {
        event.stopPropagation();
        const fetchData = async () => {
            try {
                await deleteTrackToFavorite(id);
            } catch (error: unknown) {
                if (error instanceof Error && error.message === '401') {
                    dispatch(user(null));
                    removeUserFromLocalStorage();
                }
            }
        };

        void fetchData();
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

    if (playlist) {
        return playlist.map((song) => {
            return (
                <S.playlistItem key={song.id}>
                    <S.track
                        ref={
                            currentTrackID === song.id ? currentTrackRef : null
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
                            <S.trackAuthorLink>{song.author}</S.trackAuthorLink>
                        </S.trackAuthor>

                        <S.trackAlbum>
                            <S.trackAlbumLink>{song.album}</S.trackAlbumLink>
                        </S.trackAlbum>

                        {currentPageState === '/' && (
                            <S.trackTime>
                                {song.stared_user?.some(
                                    (user) => user.id === userState?.id
                                ) ? (
                                    <S.trackTimeSvgLike
                                        onClick={(event) =>
                                            handleClickDislike(event, song.id)
                                        }
                                        aria-label="time"
                                    >
                                        <use xlinkHref="./src/img/icon/sprite.svg#icon-like"></use>
                                    </S.trackTimeSvgLike>
                                ) : (
                                    <S.trackTimeSvg
                                        onClick={(event) =>
                                            handleClickLike(event, song.id)
                                        }
                                        aria-label="time"
                                    >
                                        <use xlinkHref="./src/img/icon/sprite.svg#icon-like"></use>
                                    </S.trackTimeSvg>
                                )}
                                <S.trackTimeText>
                                    {formatTime(song.duration_in_seconds)}
                                </S.trackTimeText>
                            </S.trackTime>
                        )}
                        {currentPageState === '/playlist' && (
                            <S.trackTime>
                                <S.trackTimeSvgLike
                                    onClick={(event) =>
                                        handleClickDislike(event, song.id)
                                    }
                                    aria-label="time"
                                >
                                    <use xlinkHref="./src/img/icon/sprite.svg#icon-like"></use>
                                </S.trackTimeSvgLike>
                                <S.trackTimeText>
                                    {formatTime(song.duration_in_seconds)}
                                </S.trackTimeText>
                            </S.trackTime>
                        )}
                    </S.track>
                </S.playlistItem>
            );
        });
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

// interface CustomError {
//     status: number;
// }
export const Songs = () => {
    // const dispatch = useDispatch();
    // const currentPageState = useSelector(
    //     (state: RootState) => state.otherState.currentPage
    // );

    const {
        data: playlist,
        error,
        isLoading: isLoadingApp,
    } = useGetAllTracksQuery();

    // Реализовать для моего плейлиста
    // const {data: playlist, error, isLoading: isLoadingApp} = useGetAllFavoriteTracksQuery();
    // if (error?.status === 401) {
    //     dispatch(user(null));
    //     removeUserFromLocalStorage();
    //     playlist = [];
    // }

    const refPlaylist = useRef<HTMLDivElement>(null);

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
                {!isLoadingApp && playlist ? (
                    <Playlist playlist={playlist} refPlaylist={refPlaylist} />
                ) : (
                    <PlaylistSkeleton />
                )}
                {error && (
                    <S.errorGetSongs>
                        Не удалось загрузить песни...
                    </S.errorGetSongs>
                )}
            </S.playlist>
        </S.centerblockContent>
    );
};

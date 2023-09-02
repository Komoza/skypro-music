import { useDispatch, useSelector } from 'react-redux';
import {
    useDeleteTrackFromFavoriteMutation,
    useGetAllFavoriteTracksQuery,
} from '../../services/tracks';
import {
    getRefreshUserTokenFromLocalStorage,
    getUserFromLocalStorage,
    removeUserFromLocalStorage,
    saveUserToLocalStorage,
} from '../../helper';
import {
    setActivePlaylist,
    setCurrentTrack,
    setDisplayPlaylist,
    setIsPlay,
    setVirtualPlaylist,
    user,
} from '../../store/actions/creators/creators';
import { RefObject, useEffect, useRef } from 'react';
import * as S from '../main/components/songs/songs.style';
import { PlaylistSkeleton } from '../main/components/songs/songs';
import {
    CustomError,
    Track,
    UpdateToken,
    User,
    formatTime,
} from '../../cosntant';
import { RootState } from '../../store/actions/types/types';
import { getNewAccessToken } from '../../api';

export const FavoriteTrack = () => {
    const dispatch = useDispatch();

    const dispayPlaylist = useSelector(
        (state: RootState) => state.otherState.displayPlaylist
    );
    const {
        data,
        error,
        isLoading: isLoadingApp,
    } = useGetAllFavoriteTracksQuery();

    useEffect(() => {
        if (data) dispatch(setDisplayPlaylist([...data]));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    // обработка 401
    useEffect(() => {
        const errorState: CustomError = error as CustomError;
        if (errorState?.status === 401) {
            const fetchUpdateToken = async () => {
                alert('обновление токена');
                const userData = getUserFromLocalStorage() as User;
                try {
                    const newToken: UpdateToken = await getNewAccessToken(
                        getRefreshUserTokenFromLocalStorage()
                    );
                    const newUser: User = {
                        ...userData,
                        accessToken: {
                            access: newToken.access,
                            refresh: userData.accessToken.refresh,
                        },
                    };
                    saveUserToLocalStorage(newUser);

                    location.reload();
                } catch {
                    dispatch(user(null));
                    removeUserFromLocalStorage();
                }
            };

            void fetchUpdateToken();
        }
    }, [dispatch, error]);

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
                {!isLoadingApp && dispayPlaylist ? (
                    <Playlist refPlaylist={refPlaylist} />
                ) : (
                    <PlaylistSkeleton />
                )}
                {!dispayPlaylist?.length && (
                    <S.errorGetSongs>Список треков пуст</S.errorGetSongs>
                )}
            </S.playlist>
        </S.centerblockContent>
    );
};

interface PlaylistProps {
    refPlaylist: RefObject<HTMLDivElement>;
}

const Playlist: React.FC<PlaylistProps> = ({ refPlaylist }) => {
    const dispatch = useDispatch();
    const dispayPlaylist = useSelector(
        (state: RootState) => state.otherState.displayPlaylist
    );
    const activePlaylistState = useSelector(
        (state: RootState) => state.otherState.activePlaylist
    );

    const [deleteTrackFromFavorite, { error: errorDislike }] =
        useDeleteTrackFromFavoriteMutation();

    useEffect(() => {
        const errorState: CustomError = errorDislike as CustomError;
        if (errorState?.status === 401) {
            const fetchUpdateToken = async () => {
                alert('обновление токена');
                const userData = getUserFromLocalStorage() as User;
                try {
                    const newToken: UpdateToken = await getNewAccessToken(
                        getRefreshUserTokenFromLocalStorage()
                    );
                    const newUser: User = {
                        ...userData,
                        accessToken: {
                            access: newToken.access,
                            refresh: userData.accessToken.refresh,
                        },
                    };
                    saveUserToLocalStorage(newUser);

                    location.reload();
                } catch {
                    dispatch(user(null));
                    removeUserFromLocalStorage();
                }
            };

            void fetchUpdateToken();
        }
    }, [dispatch, errorDislike]);

    const currentTrack = useSelector(
        (state: RootState) => state.otherState.currentTrack
    );
    const virtualPlaylist = useSelector(
        (state: RootState) => state.otherState.virtualPlaylist
    );
    const isPlay: boolean = useSelector(
        (state: RootState) => state.otherState.isPlay
    );

    const currentTrackID = currentTrack ? currentTrack.id : null;
    const currentTrackRef = useRef<HTMLDivElement>(null);

    const handleClickTrack = (track: Track) => {
        // Смена активного плейлиста
        if (activePlaylistState !== dispayPlaylist) {
            dispatch(setActivePlaylist(dispayPlaylist));
        }
        if (currentTrack !== track) {
            dispatch(setIsPlay(true));
            dispatch(setCurrentTrack(track));

            // добавляем трек в виртуальный плейлист
            const newVirtualPlaylist: Track[] = [...virtualPlaylist];

            // проверяем есть ли этот трек в виртуальном массиве, если есть удалим
            const indexFindTrack = newVirtualPlaylist.indexOf(track);
            if (indexFindTrack !== -1) {
                newVirtualPlaylist.splice(indexFindTrack, 1);
            }

            newVirtualPlaylist.push(track);

            dispatch(setVirtualPlaylist(newVirtualPlaylist));
        } else {
            dispatch(setIsPlay(!isPlay));
        }
    };

    const handleClickDislike = (
        event: React.MouseEvent<SVGSVGElement, MouseEvent>,
        id: number
    ) => {
        event.stopPropagation();
        void deleteTrackFromFavorite(id);
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

    if (dispayPlaylist) {
        return dispayPlaylist.map((song) => {
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
                    </S.track>
                </S.playlistItem>
            );
        });
    }
};

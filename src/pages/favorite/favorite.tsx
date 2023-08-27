import { useDispatch, useSelector } from 'react-redux';
import {
    useDeleteTrackFromFavoriteMutation,
    useGetAllFavoriteTracksQuery,
} from '../../services/tracks';
import { removeUserFromLocalStorage } from '../../helper';
import {
    activePlaylist,
    setCurrentPlaylist,
    setCurrentTrack,
    setIsPlay,
    user,
} from '../../store/actions/creators/creators';
import { RefObject, useEffect, useRef } from 'react';
import * as S from '../main/components/songs/songs.style';
import { PlaylistSkeleton } from '../main/components/songs/songs';
import { CustomError, Track, formatTime } from '../../cosntant';
import { RootState } from '../../store/actions/types/types';

export const FavoriteTrack = () => {
    const dispatch = useDispatch();
    const {
        data: playlist,
        error,
        isLoading: isLoadingApp,
    } = useGetAllFavoriteTracksQuery();

    useEffect(() => {
        const errorState: CustomError = error as CustomError;
        if (errorState?.status === 401) {
            dispatch(user(null));
            removeUserFromLocalStorage();
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
                {!isLoadingApp && playlist ? (
                    <Playlist playlist={playlist} refPlaylist={refPlaylist} />
                ) : (
                    <PlaylistSkeleton />
                )}
                {!playlist?.length && (
                    <S.errorGetSongs>Список треков пуст</S.errorGetSongs>
                )}
            </S.playlist>
        </S.centerblockContent>
    );
};

interface PlaylistProps {
    refPlaylist: RefObject<HTMLDivElement>;
    playlist: Track[];
}

const Playlist: React.FC<PlaylistProps> = ({ playlist, refPlaylist }) => {
    const dispatch = useDispatch();

    const activePlaylistState = useSelector(
        (state: RootState) => state.otherState.activePlaylist
    );

    const [deleteTrackFromFavorite, { error: errorDislike }] =
        useDeleteTrackFromFavoriteMutation();

    useEffect(() => {
        const errorState: CustomError = errorDislike as CustomError;
        if (errorState?.status === 401) {
            dispatch(user(null));
            removeUserFromLocalStorage();
        }
    }, [dispatch, errorDislike]);

    const currentTrack = useSelector(
        (state: RootState) => state.otherState.currentTrack
    );
    const currentPlaylist = useSelector(
        (state: RootState) => state.otherState.currentPlaylist
    );
    const isPlay: boolean = useSelector(
        (state: RootState) => state.otherState.isPlay
    );

    const currentTrackID = currentTrack ? currentTrack.id : null;
    const currentTrackRef = useRef<HTMLDivElement>(null);

    const handleClickTrack = (track: Track) => {
        // Смена активного плейлиста
        if (activePlaylistState !== playlist) {
            dispatch(activePlaylist(playlist));
        }
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

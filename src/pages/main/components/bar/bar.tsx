import { useEffect, useRef, useState } from 'react';
import * as S from './bar.styles';
import { ProgressBar } from './progress-bar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/actions/types/types';
import {
    setCurrentTrack,
    setIsPlay,
    setVirtualPlaylist,
    user,
} from '../../../../store/actions/creators/creators';
import { CustomError, Track } from '../../../../cosntant';
import {
    useAddTrackToFavoriteMutation,
    useDeleteTrackFromFavoriteMutation,
    useGetAllTracksQuery,
} from '../../../../services/tracks';
import { removeUserFromLocalStorage } from '../../../../helper';

export const Bar = () => {
    const dispatch = useDispatch();
    const userState = useSelector((state: RootState) => state.otherState.user);

    const { data: originPlaylist } = useGetAllTracksQuery();
    const playlist = useSelector(
        (state: RootState) => state.otherState.activePlaylist
    );

    const virtualPlaylist: Track[] = useSelector(
        (state: RootState) => state.otherState.virtualPlaylist
    );

    const currentTrack: Track | null = useSelector(
        (state: RootState) => state.otherState.currentTrack
    );
    const isPlay: boolean = useSelector(
        (state: RootState) => state.otherState.isPlay
    );

    const refPlayer = useRef<HTMLAudioElement>(null);

    const [isRepeatTrack, setIsRepeatTrack] = useState<boolean>(false);
    const [isShuffle, setIsShuffle] = useState<boolean>(false);

    useEffect(() => {
        if (isPlay) {
            void refPlayer.current?.play();
        } else {
            refPlayer.current?.pause();
        }
    }, [isPlay, currentTrack]);

    const handleClickPlay = () => {
        dispatch(setIsPlay(!isPlay));
    };

    const handleClickPrev = () => {
        if (currentTrack) {
            const trackIndex = virtualPlaylist.indexOf(currentTrack);
            if (trackIndex > 0) {
                const prevTrack: Track = virtualPlaylist[trackIndex - 1];
                dispatch(setCurrentTrack(prevTrack));
            }
        }
    };

    const addTrackToCurrPlaylist = (track: Track) => {
        // добавляем трек в виртуальный плейлист
        const newVirtualPlaylist: Track[] = [...virtualPlaylist];

        // проверяем есть ли этот трек в виртуальном массиве, если есть удалим
        const indexFindTrack = newVirtualPlaylist.indexOf(track);
        if (indexFindTrack !== -1) {
            newVirtualPlaylist.splice(indexFindTrack, 1);
        }

        newVirtualPlaylist.push(track);

        dispatch(setVirtualPlaylist(newVirtualPlaylist));
    };

    const getRandomTrack = () => {
        if (playlist) {
            const randomIndexTrack =
                Math.floor(Math.random() * (playlist.length - 1 - 0 + 1)) + 0;
            return playlist[randomIndexTrack];
        }
        return {} as Track;
    };

    const setNextTrack = () => {
        if (currentTrack && playlist) {
            const trackIndexVirtuallist = virtualPlaylist.indexOf(currentTrack);
            const trackIndexOriginalPlaylist = playlist.indexOf(currentTrack);

            if (trackIndexVirtuallist !== virtualPlaylist.length - 1) {
                const nextTrack = virtualPlaylist[trackIndexVirtuallist + 1];
                dispatch(setCurrentTrack(nextTrack));
                return true;
            }
            if (isShuffle) {
                // получаем любой случайный трек из массива плейлиста, кроме текущего
                let nextTrack: Track;
                do {
                    nextTrack = getRandomTrack();
                } while (nextTrack === currentTrack);

                dispatch(setCurrentTrack(nextTrack));
                addTrackToCurrPlaylist(nextTrack);
                return true;
            }
            if (trackIndexOriginalPlaylist !== playlist.length - 1) {
                const nextTrack = playlist[trackIndexOriginalPlaylist + 1];
                dispatch(setCurrentTrack(nextTrack));

                addTrackToCurrPlaylist(nextTrack);
                return true;
            }
        }
        return false;
    };
    const handleClickNext = () => {
        setNextTrack();
    };

    const handleClickRepeat = () => {
        setIsRepeatTrack(!isRepeatTrack);
    };

    const handleClickShuffle = () => {
        setIsShuffle(!isShuffle);
    };

    const [addTrackToFavorite, { error: errorLike }] =
        useAddTrackToFavoriteMutation();
    const [deleteTrackFromFavorite, { error: errorDislike }] =
        useDeleteTrackFromFavoriteMutation();

    // Изменить текущий трек, при изменении основго плейлиста (лайк/dislike)
    useEffect(() => {
        if (currentTrack && originPlaylist) {
            dispatch(
                setCurrentTrack(
                    originPlaylist.find(
                        (track) => track.id === currentTrack.id
                    )!
                )
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [originPlaylist]);

    // Обработка 401 ошибки
    useEffect(() => {
        const errorStateDislike: CustomError = errorDislike as CustomError;
        const errorStateLike: CustomError = errorLike as CustomError;

        if (
            errorStateDislike?.status === 401 ||
            errorStateLike?.status === 401
        ) {
            dispatch(user(null));
            removeUserFromLocalStorage();
        }
    }, [dispatch, errorDislike, errorLike]);

    const handleClickLike = (id: number) => {
        void addTrackToFavorite(id);
        // обновлять current track
    };
    const handleClickDislike = (id: number) => {
        void deleteTrackFromFavorite(id);
        // обновлять current track
    };

    const endTrack = () => {
        if (isRepeatTrack) {
            if (refPlayer.current) {
                void refPlayer.current.play();
            }
        } else {
            if (!setNextTrack()) {
                dispatch(setIsPlay(false));
            }
        }
    };

    const handleChangeVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget && refPlayer.current) {
            refPlayer.current.volume = Number(event.currentTarget.value);
        }
    };

    return (
        currentTrack && (
            <S.bar>
                <S.barContent>
                    <S.audioFile
                        id="audio-player"
                        loop={isRepeatTrack}
                        onEnded={endTrack}
                        ref={refPlayer}
                        src={currentTrack.track_file}
                    ></S.audioFile>
                    <ProgressBar refPlayer={refPlayer}></ProgressBar>
                    <S.barPlayerBlock>
                        <S.player>
                            <S.playerControls>
                                <S.playerBtnPrev onClick={handleClickPrev}>
                                    <S.playerBtnPrevSvg aria-label="prev">
                                        <use xlinkHref="./src/img/icon/sprite.svg#icon-prev"></use>
                                    </S.playerBtnPrevSvg>
                                </S.playerBtnPrev>
                                <S.playerBtnPlay onClick={handleClickPlay}>
                                    <S.playerBtnPlaySvg aria-label="play">
                                        <use
                                            xlinkHref={`./src/img/icon/sprite.svg#icon-${
                                                isPlay ? 'pause' : 'play'
                                            }`}
                                        ></use>
                                    </S.playerBtnPlaySvg>
                                </S.playerBtnPlay>
                                <S.playerBtnNext onClick={handleClickNext}>
                                    <S.playerBtnNextSvg aria-label="next">
                                        <use xlinkHref="./src/img/icon/sprite.svg#icon-next"></use>
                                    </S.playerBtnNextSvg>
                                </S.playerBtnNext>
                                <S.playerBtnRepeat
                                    onClick={handleClickRepeat}
                                    className="_btn-icon"
                                >
                                    <S.playerBtnRepeatSvg
                                        $isRepeatTrack={isRepeatTrack}
                                        aria-label="repeat"
                                    >
                                        <use xlinkHref="./src/img/icon/sprite.svg#icon-repeat"></use>
                                    </S.playerBtnRepeatSvg>
                                </S.playerBtnRepeat>
                                <S.playerBtnShuffle
                                    onClick={handleClickShuffle}
                                    className="_btn-icon"
                                >
                                    <S.playerBtnShuffleSvg
                                        $isShuffle={isShuffle}
                                        aria-label="shuffle"
                                    >
                                        <use xlinkHref="./src/img/icon/sprite.svg#icon-shuffle"></use>
                                    </S.playerBtnShuffleSvg>
                                </S.playerBtnShuffle>
                            </S.playerControls>

                            <S.trackPlay>
                                <S.trackPlayContain>
                                    <S.trackPlayImage>
                                        <S.trackPlaySvg aria-label="music">
                                            <use xlinkHref="./src/img/icon/sprite.svg#icon-note"></use>
                                        </S.trackPlaySvg>
                                    </S.trackPlayImage>

                                    <S.trackPlayAuthor>
                                        <S.trackPlayAuthorLink href="http://">
                                            {currentTrack.name}
                                        </S.trackPlayAuthorLink>
                                    </S.trackPlayAuthor>
                                    <S.trackPlayAlbum>
                                        <S.trackPlayAlbumLink href="http://">
                                            {currentTrack.author}
                                        </S.trackPlayAlbumLink>
                                    </S.trackPlayAlbum>
                                </S.trackPlayContain>

                                <S.trackPlayLikeDis>
                                    {currentTrack.stared_user?.some(
                                        (user) => user.id === userState?.id
                                    ) ? (
                                        <S.trackPlayLike>
                                            <S.trackPlayLikeSvgActive
                                                onClick={() =>
                                                    handleClickDislike(
                                                        currentTrack.id
                                                    )
                                                }
                                                aria-label="like"
                                            >
                                                <use xlinkHref="./src/img/icon/sprite.svg#icon-like"></use>
                                            </S.trackPlayLikeSvgActive>
                                        </S.trackPlayLike>
                                    ) : (
                                        <S.trackPlayLike>
                                            <S.trackPlayLikeSvg
                                                onClick={() =>
                                                    handleClickLike(
                                                        currentTrack.id
                                                    )
                                                }
                                                aria-label="like"
                                            >
                                                <use xlinkHref="./src/img/icon/sprite.svg#icon-like"></use>
                                            </S.trackPlayLikeSvg>
                                        </S.trackPlayLike>
                                    )}
                                </S.trackPlayLikeDis>
                            </S.trackPlay>
                        </S.player>
                        <S.barVolumeBlock>
                            <S.volumeContent>
                                <S.volumeImage>
                                    <S.volumeSvg aria-label="volume">
                                        <use xlinkHref="./src/img/icon/sprite.svg#icon-volume"></use>
                                    </S.volumeSvg>
                                </S.volumeImage>
                                <S.volumeProgress>
                                    <S.volumeProgressLine
                                        type="range"
                                        name="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        onChange={(event) =>
                                            handleChangeVolume(event)
                                        }
                                    />
                                </S.volumeProgress>
                            </S.volumeContent>
                        </S.barVolumeBlock>
                    </S.barPlayerBlock>
                </S.barContent>
            </S.bar>
        )
    );
};

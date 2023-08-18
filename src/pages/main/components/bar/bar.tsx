import { useEffect, useRef, useState } from 'react';
import * as S from './bar.styles';
import { ProgressBar } from './progress-bar';
import { useDispatch, useSelector } from 'react-redux';
import { MusicState, Track } from '../../../../store/actions/types/types';
import {
    setCurrentPlaylist,
    setCurrentTrack,
    setIsPlay,
} from '../../../../store/actions/creators/creators';

export const Bar = () => {
    const dispatch = useDispatch();

    const playlist: Track[] = useSelector(
        (state: MusicState) => state.playlist
    );

    const currentPlaylist: Track[] = useSelector(
        (state: MusicState) => state.currentPlaylist
    );
    const currentTrack: Track | null = useSelector(
        (state: MusicState) => state.currentTrack
    );
    const isPlay: boolean = useSelector((state: MusicState) => state.isPlay);

    const loadingApp: boolean = useSelector(
        (state: MusicState) => state.loadingApp
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
            const trackIndex = currentPlaylist.indexOf(currentTrack);
            if (trackIndex > 0) {
                const prevTrack: Track = currentPlaylist[trackIndex - 1];
                dispatch(setCurrentTrack(prevTrack));
            }
        }
    };

    const addTrackToCurrPlaylist = (track: Track) => {
        // добавляем трек в виртуальный плейлист
        const newCurrentPlaylist: Track[] = [...currentPlaylist];

        // проверяем есть ли этот трек в виртуальном массиве, если есть удалим
        const indexFindTrack = newCurrentPlaylist.indexOf(track);
        if (indexFindTrack !== -1) {
            newCurrentPlaylist.splice(indexFindTrack, 1);
        }

        newCurrentPlaylist.push(track);

        dispatch(setCurrentPlaylist(newCurrentPlaylist));
    };

    const getRandomTrack = () => {
        const randomIndexTrack =
            Math.floor(Math.random() * (playlist.length - 1 - 0 + 1)) + 0;
        return playlist[randomIndexTrack];
    };

    const setNextTrack = () => {
        if (currentTrack) {
            const trackIndexCurrPlaylist =
                currentPlaylist.indexOf(currentTrack);
            const trackIndexOriginalPlaylist = playlist.indexOf(currentTrack);

            if (trackIndexCurrPlaylist !== currentPlaylist.length - 1) {
                const nextTrack = currentPlaylist[trackIndexCurrPlaylist + 1];
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
                                    <S.trackPlayImage $loadingApp={loadingApp}>
                                        {!loadingApp && (
                                            <S.trackPlaySvg aria-label="music">
                                                <use xlinkHref="./src/img/icon/sprite.svg#icon-note"></use>
                                            </S.trackPlaySvg>
                                        )}
                                    </S.trackPlayImage>

                                    <S.trackPlayAuthor $loadingApp={loadingApp}>
                                        {!loadingApp && (
                                            <S.trackPlayAuthorLink href="http://">
                                                {currentTrack.name}
                                            </S.trackPlayAuthorLink>
                                        )}
                                    </S.trackPlayAuthor>
                                    <S.trackPlayAlbum $loadingApp={loadingApp}>
                                        {!loadingApp && (
                                            <S.trackPlayAlbumLink href="http://">
                                                {currentTrack.author}
                                            </S.trackPlayAlbumLink>
                                        )}
                                    </S.trackPlayAlbum>
                                </S.trackPlayContain>

                                <S.trackPlayLikeDis>
                                    <S.trackPlayLike className="_btn-icon">
                                        <S.trackPlayLikeSvg aria-label="like">
                                            <use xlinkHref="./src/img/icon/sprite.svg#icon-like"></use>
                                        </S.trackPlayLikeSvg>
                                    </S.trackPlayLike>
                                    <S.trackPlayDislike className="_btn-icon">
                                        <S.trackPlayDislikeSvg aria-label="dislike">
                                            <use xlinkHref="./src/img/icon/sprite.svg#icon-dislike"></use>
                                        </S.trackPlayDislikeSvg>
                                    </S.trackPlayDislike>
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

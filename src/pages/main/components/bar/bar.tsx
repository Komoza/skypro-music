import { useEffect, useRef, useState } from 'react';
import * as S from './bar.styles';
import { ProgressBar } from './progress-bar';
import { useDispatch, useSelector } from 'react-redux';
import { MusicState, Track } from '../../../../store/actions/types/types';
import { setCurrentTrack } from '../../../../store/actions/creators/creators';

export const Bar = () => {
    const dispatch = useDispatch();

    const playlist: Track[] = useSelector(
        (state: MusicState) => state.playlist
    );
    const currentTrack: Track | null = useSelector(
        (state: MusicState) => state.currentTrack
    );

    const loadingApp: boolean = useSelector(
        (state: MusicState) => state.loadingApp
    );

    const refPlayer = useRef<HTMLAudioElement>(null);

    const [isPlay, setIsPlay] = useState<boolean>(false);
    const [isRepeatTrack, setIsRepeatTrack] = useState<boolean>(false);

    const handleClickPause = () => {
        setIsPlay(false);
        refPlayer.current?.pause();
    };
    const startSong = () => {
        setIsPlay(true);
        void refPlayer.current?.play();
    };
    useEffect(startSong, [currentTrack]);
    const handleClickPlay = () => {
        startSong();
    };

    const handleClickPrev = () => {
        if (currentTrack) {
            const trackIndex = playlist.indexOf(currentTrack);
            if (trackIndex) {
                const prevTrack: Track = playlist[trackIndex - 1];
                dispatch(setCurrentTrack(prevTrack));
            }
        }
    };

    const handleClickNext = () => {
        if (currentTrack) {
            const nextTrack: Track =
                playlist[playlist.indexOf(currentTrack) + 1];

            dispatch(setCurrentTrack(nextTrack));
        }
    };

    const handleClickRepeat = () => {
        setIsRepeatTrack(!isRepeatTrack);
    };

    const handleClickShuffle = () => {
        alert('Функция перемешать песни пока не готова');
    };

    const endTrack = () => {
        if (!isRepeatTrack) {
            setIsPlay(false);
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
                                <S.playerBtnPlay
                                    onClick={
                                        isPlay
                                            ? handleClickPause
                                            : handleClickPlay
                                    }
                                >
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
                                    <S.playerBtnShuffleSvg aria-label="shuffle">
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

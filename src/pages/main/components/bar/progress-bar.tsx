import * as S from './bar.styles';
import { formatTime } from '../../../../cosntant';
import { RefObject, useEffect, useState } from 'react';

interface ProgressBarProps {
    refPlayer: RefObject<HTMLAudioElement>;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ refPlayer }) => {
    const [duration, setDuration] = useState<number>(0);
    const [currentProgress, setCurrentProgress] = useState<number>(0);
    const [currentSecond, setCurrentSecond] = useState<number>(0);

    const handleClickProgressBar = (
        event: React.MouseEvent<HTMLDivElement>
    ) => {
        const trackPercent =
            (event.clientX / event.currentTarget.clientWidth) * 100;

        if (refPlayer.current) {
            refPlayer.current.currentTime = (duration / 100) * trackPercent;
        }
    };

    useEffect(() => {
        const audioPlayer = refPlayer.current;
        if (audioPlayer) {
            const progressListener = () => {
                setCurrentSecond(Math.round(audioPlayer.currentTime));
                setCurrentProgress((audioPlayer.currentTime / duration) * 100);
            };
            const playingListener = () => {
                setDuration(Math.round(audioPlayer.duration));
            };

            audioPlayer.addEventListener('playing', playingListener);
            audioPlayer.addEventListener('timeupdate', progressListener);
            return () => {
                audioPlayer.removeEventListener('timeupdate', progressListener);
                audioPlayer.removeEventListener('playing', playingListener);
            };
        }
    }, [duration, refPlayer]);

    return (
        <>
            <S.barPlayerProgressTime>
                {formatTime(currentSecond)} / {formatTime(duration)}
            </S.barPlayerProgressTime>
            <S.barPlayerProgress
                onClick={(event) => handleClickProgressBar(event)}
            >
                <S.barPlayerProgressCurrent
                    $currentProgress={currentProgress}
                ></S.barPlayerProgressCurrent>
            </S.barPlayerProgress>
        </>
    );
};

import { formatTime } from '../../../../cosntant';
import * as S from './bar.styles';

interface TimerProps {
    currentSecond: number;
    duration: number;
}

export const Timer: React.FC<TimerProps> = ({ currentSecond, duration }) => {
    return (
        <S.barPlayerProgressTime>
            {formatTime(currentSecond)} / {formatTime(duration)}
        </S.barPlayerProgressTime>
    );
};
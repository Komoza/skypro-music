import * as S from './bar.styles';

interface ProgressBarProps {
    currentProgress: number;
    handleClickProgressBar: (value: React.MouseEvent<HTMLDivElement>) => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    currentProgress,
    handleClickProgressBar,
}) => {
    return (
        <S.barPlayerProgress
            $currentProgress={currentProgress}
            onClick={(event) => handleClickProgressBar(event)}
        ></S.barPlayerProgress>
    );
};

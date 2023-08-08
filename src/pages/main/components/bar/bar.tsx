import { Song } from '../../../../App';
import * as S from './bar.styles';

interface BarProps {
    isAppLoad: Boolean;
    currentSong: Song | null;
}

export const Bar: React.FC<BarProps> = ({ isAppLoad, currentSong }) => {
    return (
        currentSong && (
            <S.bar>
                <S.barContent>
                    <S.barPlayerProgress></S.barPlayerProgress>
                    <S.barPlayerBlock>
                        <S.player>
                            <S.playerControls>
                                <S.playerBtnPrev>
                                    <S.playerBtnPrevSvg aria-label="prev">
                                        <use xlinkHref="./src/img/icon/sprite.svg#icon-prev"></use>
                                    </S.playerBtnPrevSvg>
                                </S.playerBtnPrev>
                                <S.playerBtnPlay>
                                    <S.playerBtnPlaySvg aria-label="play">
                                        <use xlinkHref="./src/img/icon/sprite.svg#icon-play"></use>
                                    </S.playerBtnPlaySvg>
                                </S.playerBtnPlay>
                                <S.playerBtnNext>
                                    <S.playerBtnNextSvg aria-label="next">
                                        <use xlinkHref="./src/img/icon/sprite.svg#icon-next"></use>
                                    </S.playerBtnNextSvg>
                                </S.playerBtnNext>
                                <S.playerBtnRepeat className="_btn-icon">
                                    <S.playerBtnRepeatSvg aria-label="repeat">
                                        <use xlinkHref="./src/img/icon/sprite.svg#icon-repeat"></use>
                                    </S.playerBtnRepeatSvg>
                                </S.playerBtnRepeat>
                                <S.playerBtnShuffle className="_btn-icon">
                                    <S.playerBtnShuffleSvg aria-label="shuffle">
                                        <use xlinkHref="./src/img/icon/sprite.svg#icon-shuffle"></use>
                                    </S.playerBtnShuffleSvg>
                                </S.playerBtnShuffle>
                            </S.playerControls>

                            <S.trackPlay>
                                <S.trackPlayContain>
                                    <S.trackPlayImage $isAppLoad={isAppLoad}>
                                        {isAppLoad && (
                                            <S.trackPlaySvg aria-label="music">
                                                <use xlinkHref="./src/img/icon/sprite.svg#icon-note"></use>
                                            </S.trackPlaySvg>
                                        )}
                                    </S.trackPlayImage>

                                    <S.trackPlayAuthor $isAppLoad={isAppLoad}>
                                        {isAppLoad && (
                                            <S.trackPlayAuthorLink href="http://">
                                                {currentSong.name}
                                            </S.trackPlayAuthorLink>
                                        )}
                                    </S.trackPlayAuthor>
                                    <S.trackPlayAlbum $isAppLoad={isAppLoad}>
                                        {isAppLoad && (
                                            <S.trackPlayAlbumLink href="http://">
                                                {currentSong.author}
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

import * as S from './songs.style';
import { formatTime } from '../../../../cosntant';
import { MusicState, Track } from '../../../../store/actions/types/types';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentTrack } from '../../../../store/actions/creators/creators';

const Playlist = () => {
    const currentTrack = useSelector((state: MusicState) => state.currentTrack);
    const currentTrackID = currentTrack ? currentTrack.id : null;

    const playlist: Track[] = useSelector(
        (state: MusicState) => state.playlist
    );

    const dispatch = useDispatch();
    const handleClickTrack = (track: Track) => {
        dispatch(setCurrentTrack(track));
    };

    if (!playlist.length) {
        return <S.errorGetSongs>Не удалось загрузить песни...</S.errorGetSongs>;
    } else {
        if (playlist) {
            return playlist.map((song) => {
                return (
                    <S.playlistItem key={song.id}>
                        <S.track onClick={() => handleClickTrack(song)}>
                            <S.trackTitle>
                                <S.trackTitleImage>
                                    {currentTrackID == song.id && (
                                        <S.trackTitleImageActive></S.trackTitleImageActive>
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
                                <S.trackAuthorLink>
                                    {song.author}
                                </S.trackAuthorLink>
                            </S.trackAuthor>

                            <S.trackAlbum>
                                <S.trackAlbumLink>
                                    {song.album}
                                </S.trackAlbumLink>
                            </S.trackAlbum>

                            <S.trackTime>
                                <S.trackTimeSvg aria-label="time">
                                    <use xlinkHref="./src/img/icon/sprite.svg#icon-like"></use>
                                </S.trackTimeSvg>
                                <S.trackTimeText>
                                    {formatTime(song.duration_in_seconds)}
                                </S.trackTimeText>
                            </S.trackTime>
                        </S.track>
                    </S.playlistItem>
                );
            });
        }
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

export const Songs = () => {
    const loadingApp: boolean = useSelector(
        (state: MusicState) => state.loadingApp
    );

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
            <S.playlist>
                {!loadingApp ? <Playlist /> : <PlaylistSkeleton />}
            </S.playlist>
        </S.centerblockContent>
    );
};

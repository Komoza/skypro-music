import { useDispatch, useSelector } from 'react-redux';
import * as S from '../main/components/songs/songs.style';
import { MusicState, Track } from '../../store/actions/types/types';
import { formatTime } from '../../cosntant';
import { useEffect, useRef } from 'react';
import {
    loadingApp,
    setCurrentPlaylist,
    setCurrentTrack,
    setIsPlay,
    setPlaylist,
} from '../../store/actions/creators/creators';
import { getMyPlaylist } from '../../api';

export const MyPlaylist = () => {
    const dispatch = useDispatch();

    const currentTrack = useSelector((state: MusicState) => state.currentTrack);
    const isPlay: boolean = useSelector((state: MusicState) => state.isPlay);
    const playlist: Track[] = useSelector(
        (state: MusicState) => state.playlist
    );
    const currentTrackID = currentTrack ? currentTrack.id : null;
    const currentTrackRef = useRef<HTMLDivElement>(null);
    const currentPlaylist = useSelector(
        (state: MusicState) => state.currentPlaylist
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: Track[] = await getMyPlaylist();
                dispatch(setPlaylist(data));
            } catch (error) {
                dispatch(setPlaylist([]));
            } finally {
                dispatch(loadingApp(false));
            }
        };
        void fetchData();
    }, [dispatch]);

    const handleClickTrack = (track: Track) => {
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
    if (!playlist.length) {
        return <S.errorGetSongs>Пока нет понравившихся песен</S.errorGetSongs>;
    } else {
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
};

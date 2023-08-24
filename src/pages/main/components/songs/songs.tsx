import * as S from './songs.style';
import { formatTime } from '../../../../cosntant';
import { MusicState, Track } from '../../../../store/actions/types/types';
import { useSelector, useDispatch } from 'react-redux';
import {
    loadingApp,
    setCurrentPlaylist,
    setCurrentTrack,
    setIsPlay,
    setPlaylist,
} from '../../../../store/actions/creators/creators';
import { RefObject, useEffect, useRef } from 'react';
import { MyPlaylist } from '../../../my-playlist/my-playlist';
import { getAllSongs } from '../../../../api';

interface PlaylistProps {
    refPlaylist: RefObject<HTMLDivElement>;
}
interface SongsProps {
    status: string;
}

const Playlist: React.FC<PlaylistProps> = ({ refPlaylist }) => {
    const currentTrack = useSelector((state: MusicState) => state.currentTrack);
    const currentPlaylist = useSelector(
        (state: MusicState) => state.currentPlaylist
    );

    const currentTrackID = currentTrack ? currentTrack.id : null;
    const currentTrackRef = useRef<HTMLDivElement>(null);

    const playlist: Track[] = useSelector(
        (state: MusicState) => state.playlist
    );

    const isPlay: boolean = useSelector((state: MusicState) => state.isPlay);

    const dispatch = useDispatch();
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: Track[] = await getAllSongs();
                dispatch(setPlaylist(data));
            } catch (error) {
                dispatch(setPlaylist([]));
            } finally {
                dispatch(loadingApp(false));
            }
        };

        void fetchData();
    }, [dispatch]);

    if (!playlist.length) {
        return <S.errorGetSongs>Не удалось загрузить песни...</S.errorGetSongs>;
    } else {
        if (playlist) {
            return playlist.map((song) => {
                return (
                    <S.playlistItem key={song.id}>
                        <S.track
                            ref={
                                currentTrackID === song.id
                                    ? currentTrackRef
                                    : null
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

export const Songs: React.FC<SongsProps> = ({ status }) => {
    const refPlaylist = useRef<HTMLDivElement>(null);
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
            <S.playlist ref={refPlaylist}>
                {!loadingApp ? (
                    status === 'Main' ? (
                        <Playlist refPlaylist={refPlaylist} />
                    ) : (
                        <MyPlaylist />
                    )
                ) : (
                    <PlaylistSkeleton />
                )}
            </S.playlist>
        </S.centerblockContent>
    );
};

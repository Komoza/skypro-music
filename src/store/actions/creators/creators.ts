import { Track, User } from '../../../cosntant';
import { ActionTypes } from '../types/types';

export const setCurrentTrack = (track: Track) => {
    return {
        type: ActionTypes.SET_CURRENT_TRACK,
        payload: track,
    };
};

export const setCurrentPlaylist = (playlist: Track[]) => {
    return {
        type: ActionTypes.SET_CURRENT_PLAYLIST,
        payload: playlist,
    };
};

export const setIsPlay = (isPlay: boolean) => {
    return {
        type: ActionTypes.SET_IS_PLAY,
        payload: isPlay,
    };
};

export const currentPage = (currentPage: string) => {
    return {
        type: ActionTypes.CURRENT_PAGE,
        payload: currentPage,
    };
};

export const user = (user: User | null) => {
    return {
        type: ActionTypes.USER,
        payload: user,
    };
};

export const activePlaylist = (activePlaylist: Track[]) => {
    return {
        type: ActionTypes.ACTIVE_PLAYLIST,
        payload: activePlaylist,
    };
};

import { Filters, Track, User } from '../../../cosntant';
import { ActionTypes } from '../types/types';

export const setCurrentTrack = (track: Track) => {
    return {
        type: ActionTypes.SET_CURRENT_TRACK,
        payload: track,
    };
};

export const setVirtualPlaylist = (playlist: Track[]) => {
    return {
        type: ActionTypes.SET_VIRTUAL_PLAYLIST,
        payload: playlist,
    };
};

export const setDisplayPlaylist = (playlist: Track[]) => {
    return {
        type: ActionTypes.SET_DISPLAY_PLAYLIST,
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

export const setActivePlaylist = (activePlaylist: Track[]) => {
    return {
        type: ActionTypes.SET_ACTIVE_PLAYLIST,
        payload: activePlaylist,
    };
};

export const filters = (filters: Filters) => {
    return {
        type: ActionTypes.SET_FILTERS,
        payload: filters,
    };
};

import { Filters, Track, User } from '../../../cosntant';
import { tracksApi } from '../../../services/tracks';

export interface MusicState {
    originPlaylist: Track[];
    currentTrack: Track | null;
    displayPlaylist: Track[];
    virtualPlaylist: Track[];
    isPlay: boolean;
    currentPage: string;
    user: User | null;
    activePlaylist: Track[];
    filters: Filters;
}
export interface RootState {
    otherState: MusicState;
    [tracksApi.reducerPath]: ReturnType<typeof tracksApi.reducer>;
}

export interface SetOriginPlaylist {
    type: ActionTypes.SET_ORIGIN_PLAYLIST;
    payload: Track[];
}

export interface SetActivePlaylist {
    type: ActionTypes.SET_ACTIVE_PLAYLIST;
    payload: Track[];
}

export interface SetVirtualPlaylistAction {
    type: ActionTypes.SET_VIRTUAL_PLAYLIST;
    payload: Track[];
}

export interface SetDisplayPlaylist {
    type: ActionTypes.SET_DISPLAY_PLAYLIST;
    payload: Track[];
}

export interface SetCurrentTrackAction {
    type: ActionTypes.SET_CURRENT_TRACK;
    payload: Track;
}

export interface SetIsPlay {
    type: ActionTypes.SET_IS_PLAY;
    payload: boolean;
}

export interface CurrentPage {
    type: ActionTypes.CURRENT_PAGE;
    payload: string;
}

export interface UserAction {
    type: ActionTypes.USER;
    payload: User | null;
}

export interface SetFiltersAction {
    type: ActionTypes.SET_FILTERS;
    payload: Filters;
}

export enum ActionTypes {
    SET_CURRENT_TRACK = 'SET_CURRENT_TRACK',
    SET_VIRTUAL_PLAYLIST = 'SET_VIRTUAL_PLAYLIST',
    SET_DISPLAY_PLAYLIST = 'SET_DISPLAY_PLAYLIST',
    SET_ORIGIN_PLAYLIST = 'SET_ORIGIN_PLAYLIST',
    SET_IS_PLAY = 'SET_IS_PLAY',
    CURRENT_PAGE = 'CURRENT_PAGE',
    USER = 'USER',
    SET_ACTIVE_PLAYLIST = 'SET_ACTIVE_PLAYLIST',
    SET_FILTERS = 'SET_FILTERS',
}

export type MusicAction =
    | SetCurrentTrackAction
    | SetVirtualPlaylistAction
    | SetIsPlay
    | CurrentPage
    | UserAction
    | SetActivePlaylist
    | SetFiltersAction
    | SetDisplayPlaylist
    | SetOriginPlaylist;

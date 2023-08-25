import { Track, User } from "../../../cosntant";

export interface MusicState {
    currentTrack: Track | null;
    playlist: Track[];
    currentPlaylist: Track[];
    loadingApp: boolean;
    isPlay: boolean;
    currentPage: string;
    user: User | null;
}

export interface SetCurrentTrackAction {
    type: ActionTypes.SET_CURRENT_TRACK;
    payload: Track;
}

export interface SetPlaylistAction {
    type: ActionTypes.SET_PLAYLIST;
    payload: Track[];
}
export interface SetIsPlay {
    type: ActionTypes.SET_IS_PLAY;
    payload: boolean;
}
export interface SetCurrentPlaylistAction {
    type: ActionTypes.SET_CURRENT_PLAYLIST;
    payload: Track[];
}

export interface LoadingApp {
    type: ActionTypes.LOADING_APP;
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

export enum 
ActionTypes {
    SET_CURRENT_TRACK = 'SET_CURRENT_TRACK',
    SET_PLAYLIST = 'SET_PLAYLIST',
    LOADING_APP = 'LOADING_APP',
    SET_CURRENT_PLAYLIST = 'SET_CURRENT_PLAYLIST',
    SET_IS_PLAY = 'SET_IS_PLAY',
    CURRENT_PAGE = 'CURRENT_PAGE',
    USER = 'USER'
}

export type MusicAction =
    | SetCurrentTrackAction
    | SetPlaylistAction
    | LoadingApp
    | SetCurrentPlaylistAction
    | SetIsPlay
    | CurrentPage
    | UserAction;

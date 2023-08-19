export interface Track {
    album: string;
    author: string;
    duration_in_seconds: number;
    genre: string;
    id: number;
    logo: null;
    name: string;
    release_date: string;
    track_file: string;
}

export interface MusicState {
    currentTrack: Track | null;
    playlist: Track[];
    currentPlaylist: Track[];
    loadingApp: boolean;
    isPlay: boolean;
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

export interface ShufflePlaylistkAction {
    type: ActionTypes.SHUFFLE_PLAYLIST;
}

export enum ActionTypes {
    SET_CURRENT_TRACK = 'SET_CURRENT_TRACK',
    SHUFFLE_PLAYLIST = 'SHUFFLE_PLAYLIST',
    SET_PLAYLIST = 'SET_PLAYLIST',
    LOADING_APP = 'LOADING_APP',
    SET_CURRENT_PLAYLIST = 'SET_CURRENT_PLAYLIST',
    SET_IS_PLAY = 'SET_IS_PLAY',
}

export type MusicAction =
    | SetCurrentTrackAction
    | SetPlaylistAction
    | LoadingApp
    | ShufflePlaylistkAction
    | SetCurrentPlaylistAction
    | SetIsPlay;

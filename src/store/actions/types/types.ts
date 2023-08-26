import { Track, User } from '../../../cosntant';
import { tracksApi } from '../../../services/tracks';

export interface MusicState {
    currentTrack: Track | null;
    currentPlaylist: Track[];
    isPlay: boolean;
    currentPage: string;
    user: User | null;
    activePlaylist: Track[];
}
export interface RootState {
    otherState: MusicState;
    [tracksApi.reducerPath]: ReturnType<typeof tracksApi.reducer>;
}

export interface SetCurrentTrackAction {
    type: ActionTypes.SET_CURRENT_TRACK;
    payload: Track;
}
export interface SetIsPlay {
    type: ActionTypes.SET_IS_PLAY;
    payload: boolean;
}
export interface SetCurrentPlaylistAction {
    type: ActionTypes.SET_CURRENT_PLAYLIST;
    payload: Track[];
}

export interface CurrentPage {
    type: ActionTypes.CURRENT_PAGE;
    payload: string;
}
export interface UserAction {
    type: ActionTypes.USER;
    payload: User | null;
}
export interface ActivePlaylist {
    type: ActionTypes.ACTIVE_PLAYLIST;
    payload: Track[];
}

export enum ActionTypes {
    SET_CURRENT_TRACK = 'SET_CURRENT_TRACK',
    SET_CURRENT_PLAYLIST = 'SET_CURRENT_PLAYLIST',
    SET_IS_PLAY = 'SET_IS_PLAY',
    CURRENT_PAGE = 'CURRENT_PAGE',
    USER = 'USER',
    ACTIVE_PLAYLIST = 'ACTIVE_PLAYLIST',
}

export type MusicAction =
    | SetCurrentTrackAction
    | SetCurrentPlaylistAction
    | SetIsPlay
    | CurrentPage
    | UserAction
    | ActivePlaylist;

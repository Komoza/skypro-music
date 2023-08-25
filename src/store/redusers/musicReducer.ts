import { MusicAction, MusicState, ActionTypes } from '../actions/types/types';

const initialState: MusicState = {
    currentTrack: null,
    playlist: [],
    loadingApp: true,
    currentPlaylist: [],
    isPlay: false,
    currentPage: '',
    user: null,
};

const musicReducer = (
    state = initialState,
    action: MusicAction
): MusicState => {
    switch (action.type) {
        case ActionTypes.SET_CURRENT_TRACK:
            return {
                ...state,
                currentTrack: action.payload,
            };

        case ActionTypes.SET_PLAYLIST:
            return {
                ...state,
                playlist: action.payload,
            };

        case ActionTypes.LOADING_APP:
            return {
                ...state,
                loadingApp: action.payload,
            };

        case ActionTypes.SET_CURRENT_PLAYLIST:
            return {
                ...state,
                currentPlaylist: action.payload,
            };
        case ActionTypes.SET_IS_PLAY:
            return {
                ...state,
                isPlay: action.payload,
            };
        case ActionTypes.CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            };
        case ActionTypes.USER:
            return {
                ...state,
                user: action.payload,
            };

        default:
            return state;
    }
};

export default musicReducer;

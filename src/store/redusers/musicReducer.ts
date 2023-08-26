import { MusicAction, MusicState, ActionTypes } from '../actions/types/types';

const initialState: MusicState = {
    currentTrack: null,
    currentPlaylist: [],
    isPlay: false,
    currentPage: '',
    user: null,
    activePlaylist: [],
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
        case ActionTypes.ACTIVE_PLAYLIST:
            return {
                ...state,
                activePlaylist: action.payload,
            };

        default:
            return state;
    }
};

export default musicReducer;

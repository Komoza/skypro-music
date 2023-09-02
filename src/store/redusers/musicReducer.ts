import { MusicAction, MusicState, ActionTypes } from '../actions/types/types';

const initialState: MusicState = {
    originPlaylist: [],
    activePlaylist: [],
    virtualPlaylist: [],
    displayPlaylist: [],
    currentTrack: null,
    isPlay: false,
    currentPage: '',
    user: null,
    filters: {
        author: null,
        genre: null,
        years: 'По умолчанию',
    },
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
        case ActionTypes.SET_VIRTUAL_PLAYLIST:
            return {
                ...state,
                virtualPlaylist: action.payload,
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
        case ActionTypes.SET_ACTIVE_PLAYLIST:
            return {
                ...state,
                activePlaylist: action.payload,
            };
        case ActionTypes.SET_FILTERS:
            return {
                ...state,
                filters: action.payload,
            };
        case ActionTypes.SET_DISPLAY_PLAYLIST:
            return {
                ...state,
                displayPlaylist: action.payload,
            };
        case ActionTypes.SET_ORIGIN_PLAYLIST:
            return {
                ...state,
                originPlaylist: action.payload,
            }
        default:
            return state;
    }
};

export default musicReducer;

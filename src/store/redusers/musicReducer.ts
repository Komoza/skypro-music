import { MusicAction, MusicState, ActionTypes } from '../actions/types/types';

import { Track } from '../actions/types/types';

const initialState: MusicState = {
    currentTrack: null,
    playlist: [],
    loadingApp: true,
    currentPlaylist: [],
    isPlay: false,
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

        case ActionTypes.SHUFFLE_PLAYLIST: {
            const shuffledPlaylist: Track[] = shuffleArray(state.playlist);
            return {
                ...state,
                playlist: shuffledPlaylist,
            };
        }

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
            }

        default:
            return state;
    }
};

const shuffleArray = (array: Track[]) => {
    return array;
};

export default musicReducer;

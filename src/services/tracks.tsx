import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SelectionsProps, Track } from '../cosntant';
import { FullTagDescription } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { getAccessUserTokenFromLocalStorage } from '../helper';

const DATA_TAG: FullTagDescription<never> = {
    type: null as never,
    id: 'LIST',
};

export const tracksApi = createApi({
    reducerPath: 'tracksApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://skypro-music-api.skyeng.tech/catalog/',
    }),
    endpoints: (builder) => ({
        getAllTracks: builder.query<Track[], void>({
            query: () => 'track/all/',
            providesTags: [DATA_TAG],
        }),

        getAllFavoriteTracks: builder.query<Track[], void>({
            query: () => ({
                url: 'track/favorite/all/',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${getAccessUserTokenFromLocalStorage()}`,
                },
            }),
            providesTags: [DATA_TAG],
        }),

        addTrackToFavorite: builder.mutation<void, number>({
            query: (id) => ({
                url: `track/${id}/favorite/`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${getAccessUserTokenFromLocalStorage()}`,
                },
            }),
            invalidatesTags: [DATA_TAG],
        }),
        deleteTrackFromFavorite: builder.mutation<void, number>({
            query: (id) => ({
                url: `track/${id}/favorite/`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${getAccessUserTokenFromLocalStorage()}`,
                },
            }),
            invalidatesTags: [DATA_TAG],
        }),
        getSelectionTracks: builder.query<SelectionsProps, number>({
            query: (id) => ({
                url: `selection/${id}/`,
                method: 'GET',
            }),
            providesTags: [DATA_TAG],
        }),
    }),
});

export const {
    useGetAllTracksQuery,
    useGetAllFavoriteTracksQuery,
    useAddTrackToFavoriteMutation,
    useDeleteTrackFromFavoriteMutation,
    useGetSelectionTracksQuery,
} = tracksApi;

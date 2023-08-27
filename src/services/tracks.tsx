import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Track } from '../cosntant';
import { getUserTokenFromLocalStorage } from '../helper';
import { FullTagDescription } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

const DATA_TAG: FullTagDescription<never> = {
    type: null as never,
    id: 'LIST',
};

export const tracksApi = createApi({
    reducerPath: 'tracksApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://painassasin.online/catalog/',
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
                    Authorization: `Bearer ${getUserTokenFromLocalStorage()}`,
                },
            }),
            providesTags: [DATA_TAG],
        }),

        addTrackToFavorite: builder.mutation<void, number>({
            query: (id) => ({
                url: `track/${id}/favorite/`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${getUserTokenFromLocalStorage()}`,
                },
            }),
            invalidatesTags: [DATA_TAG],
        }),
        deleteTrackFromFavorite: builder.mutation<void, number>({
            query: (id) => ({
                url: `track/${id}/favorite/`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${getUserTokenFromLocalStorage()}`,
                },
            }),
            invalidatesTags: [DATA_TAG],
        }),
    }),
});

export const {
    useGetAllTracksQuery,
    useGetAllFavoriteTracksQuery,
    useAddTrackToFavoriteMutation,
    useDeleteTrackFromFavoriteMutation,
} = tracksApi;

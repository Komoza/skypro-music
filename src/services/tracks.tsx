import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Track } from '../cosntant';
import { getUserTokenFromLocalStorage } from '../helper';

export const tracksApi = createApi({
    reducerPath: 'tracksApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://painassasin.online/catalog/',
    }),
    endpoints: (builder) => ({
        getAllTracks: builder.query<Track[], void>({
            query: () => 'track/all/',
        }),

        getAllFavoriteTracks: builder.query<Track[], void>({
            query: () => ({
                url: 'track/favorite/all/',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${getUserTokenFromLocalStorage()}`,
                },
            }),
        }),
    }),
});

export const { useGetAllTracksQuery, useGetAllFavoriteTracksQuery } = tracksApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/',
        prepareHeaders: (headers)=>{
            headers.set('x-rapidapi-key', process.env.VITE_SHAZAM_CORE_RAPID_API_KEY);

            return headers;
        }
    }),
    endpoints:(builder)=>({
        getTopCharts: builder.query({
            query: () => 'v1/charts/world?country_code=DZ'}),
    })
})

export const {
    useGetTopChartsQuery,
} = shazamCoreApi;
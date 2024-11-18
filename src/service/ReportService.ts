import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IReportMessage } from '../type'

export const reportsApi = createApi({
    reducerPath: '',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL}),
    endpoints: (build) => ({
        fetchAllReports: build.query<IReportMessage[], unknown>({
            query: () => ({
                url: '/reportMessages',
                method: 'GET'
            })
        }),
        
    })
})
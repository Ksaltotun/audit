import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IReportMessage } from '../type'

export const reportsApi = createApi({
    reducerPath: 'reportsApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:5002/',
        credentials: 'include', 
    }),
    endpoints: (build) => ({
        fetchAllReports: build.query<IReportMessage[], unknown>({
            query: () => {
                return {
                    url: '/api/allreports',
                    method: 'GET',
                }
            }
        }),
    })
})




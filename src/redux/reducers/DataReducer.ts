import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPagesNames, IReportMessage, RoutesType } from "../../type";

interface Ireports {
    reports: any[],
    pings: any[],
    isLoading: boolean
}


const initialState:Ireports  = {
    reports: [],
    pings: [],
    isLoading: false 
}

export const reportSlice = createSlice({
    name: 'reports',
    initialState,
    reducers: {
        setReports(state, action: PayloadAction<any[]>){
            state.reports = action.payload
        },
        setPings(state, action: PayloadAction<any[]>){
            state.pings = action.payload
        },
        setLoading(state, action: PayloadAction<boolean>){
            state.isLoading = action.payload
        },
    }
})

export default reportSlice.reducer; 


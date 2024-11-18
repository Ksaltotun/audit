import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IReportMessage } from "../../type";

interface IReportsState {
    reports: IReportMessage[];
    isLoading: boolean;
    error: string;
}

const initialState: IReportsState = {
    reports: [],
    isLoading: false,
    error: '',
}

export const reportSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        usersFetching (state){
            state.isLoading = true
        },
        userSuccess (state, action: PayloadAction<IReportMessage[]>) {
            state.isLoading = false
            state.error = ''
            state.reports = [...action.payload]
        },
        userError (state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

export default reportSlice.reducer; 
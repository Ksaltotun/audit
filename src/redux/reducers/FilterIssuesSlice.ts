import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilters } from "../../type";

const initialState: IFilters = {
    systemsFilter:[],
    dateFilter:{
        startDate: '',
        endDate: ''
    }
}

export const filterIssuesSlice = createSlice({
    name: 'filterIssues',
    initialState,
    reducers: {
        addSystemFilter (state, action: PayloadAction<any>){
            state.systemsFilter = [...action.payload]
        },
        addDateFilter (state, action: PayloadAction<any>){
            state.dateFilter = action.payload
        }
    }
})

export default filterIssuesSlice.reducer; 

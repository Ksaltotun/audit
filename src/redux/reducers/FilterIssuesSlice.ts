import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDateFilter, IFilters } from "../../type";

const initialState: IFilters = {
    systemsFilter:[],
    dateFilter:{
        startDate: '',
        endDate: ''
    },
    applied: false
}

export const filterIssuesSlice = createSlice({
    name: 'filterIssues',
    initialState,
    reducers: {
        addSystemFilter (state, action: PayloadAction<any>){
            state.systemsFilter = [...action.payload]
        },
        addDateFilter (state, action: PayloadAction<IDateFilter>){
            state.dateFilter = action.payload
        },
        applyFilter (state, action: PayloadAction<boolean>){
            state.applied = action.payload
        }
    }
})

export default filterIssuesSlice.reducer; 

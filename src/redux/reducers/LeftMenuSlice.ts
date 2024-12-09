import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPagesNames, RoutesType } from "../../type";

const initialState: IPagesNames = {
    name: 'issues',
    isPageLoading: false 
}

export const leftMenuSlice = createSlice({
    name: 'pageName',
    initialState,
    reducers: {
        routeTo (state, action: PayloadAction<RoutesType>){
            state.name = action.payload
        }
    }
})

export default leftMenuSlice.reducer; 
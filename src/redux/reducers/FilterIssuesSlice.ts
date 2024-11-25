import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFulterOptions, IPagesNames, RoutesType } from "../../type";

const initialState: IFulterOptions = {
    filters: [
        {field: 'system',
            rule: 'contains',
            sample: 's'
        }
    ]
}

export const filterIssuesSlice = createSlice({
    name: 'filterIssues',
    initialState,
    reducers: {
        addFilter (state, action: PayloadAction<any>){
            state.filters = action.payload
        }
    }
})

export default filterIssuesSlice.reducer; 

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IModalVisible, RoutesType } from "../../type";

const initialState: IModalVisible = {
    isVisible: false,
}

export const modalWindowSlice = createSlice({
    name: 'modalWindow',
    initialState,
    reducers: {
        toggleModal (state, action: PayloadAction<boolean>){
            state.isVisible = action.payload
        }
    }
})

export default modalWindowSlice.reducer; 
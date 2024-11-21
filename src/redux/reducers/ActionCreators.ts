import { AppDispatch } from "../store"

import { leftMenuSlice } from "./LeftMenuSlice"
import { RoutesType } from "../../type"
import { ModalWindow } from "../../components/ModalWindow/ModalWindow"
import { modalWindowSlice } from "./ModalWindowSlice"

export const routePage = (payload: RoutesType) => (dispatch: AppDispatch) => {
    {
        dispatch(leftMenuSlice.actions.routeTo(payload))
    }
}

export const toggleModal = (payload: boolean) => (dispatch: AppDispatch) => {
    {
        dispatch(modalWindowSlice.actions.toggleModal(payload))
    }
}

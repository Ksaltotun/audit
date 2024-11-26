import { AppDispatch } from "../store"

import { leftMenuSlice } from "./LeftMenuSlice"
import { IDateFilter, RoutesType } from "../../type"
import { modalWindowSlice } from "./ModalWindowSlice"
import { filterIssuesSlice } from "./FilterIssuesSlice"

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

export const addSystemFilter = (payload: string[]) => (dispatch: AppDispatch) => {
    {
        dispatch(filterIssuesSlice.actions.addSystemFilter(payload))
    }
}
export const addDateFilter = (payload: IDateFilter) => (dispatch: AppDispatch) => {
    {
        dispatch(filterIssuesSlice.actions.addDateFilter(payload))
    }
}

export const applyFilter = (payload: boolean) => (dispatch: AppDispatch) => {
    {
        dispatch(filterIssuesSlice.actions.applyFilter(payload))
    }
}

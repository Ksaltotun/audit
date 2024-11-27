import { AppDispatch } from "../store"

import { leftMenuSlice } from "./LeftMenuSlice"
import { IDateFilter, IReportMessage, RoutesType } from "../../type"
import { modalWindowSlice } from "./ModalWindowSlice"
import { filterIssuesSlice } from "./FilterIssuesSlice"
import { reportSlice } from "./DataReducer"

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

export const setReports = (payload: any[]) => (dispatch: AppDispatch) => {
    {
        dispatch(reportSlice.actions.setReports(payload))
    }
}

export const setLoading = (payload: boolean) => (dispatch: AppDispatch) => {
    {
        dispatch(reportSlice.actions.setLoading(payload))
    }
}

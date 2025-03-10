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

export const addEventFilter = (payload: string[]) => (dispatch: AppDispatch) => {
    {
        dispatch(filterIssuesSlice.actions.addEventFilter(payload))
    }
}

export const addIdKISFilter = (payload: string[]) => (dispatch: AppDispatch) => {
    {
        dispatch(filterIssuesSlice.actions.addIdIdKISFilter(payload))
    }
}

export const addIdUserFilter = (payload: string[]) => (dispatch: AppDispatch) => {
    {
        dispatch(filterIssuesSlice.actions.addIdUserFilter(payload))
    }
}

export const addMessageFilter = (payload: string) => (dispatch: AppDispatch) => {
    {
        dispatch(filterIssuesSlice.actions.addMessageFilter(payload))
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

export const setPings = (payload: any[]) => (dispatch: AppDispatch) => {
    {
        dispatch(reportSlice.actions.setPings(payload))
    }
}

export const setLoading = (payload: boolean) => (dispatch: AppDispatch) => {
    {
        dispatch(reportSlice.actions.setLoading(payload))
    }
}

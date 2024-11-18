import { AppDispatch } from "../store"

import { leftMenuSlice } from "./LeftMenuSlice"
import { RoutesType } from "../../type"

export const routePage = (payload: RoutesType) => (dispatch: AppDispatch) => {
    {
        dispatch(leftMenuSlice.actions.routeTo(payload))
    }
}

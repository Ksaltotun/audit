import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reportsApi } from "../service/ReportService";
import leftMenuReducer from "./reducers/LeftMenuSlice";
import ModalWindowReducer from "./reducers/ModalWindowSlice";


const rootReducer = combineReducers({
    leftMenuReducer,
    ModalWindowReducer,
    [reportsApi.reducerPath]: reportsApi.reducer
})

export const setupStore = () => {
    console.log('*', reportsApi.middleware)
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reportsApi.middleware) 
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']


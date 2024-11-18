import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/UserSlice'
import { reportsApi } from "../service/ReportService";
import leftMenuReducer from "./reducers/LeftMenuSlice";


const rootReducer = combineReducers({
    userReducer,
    leftMenuReducer,
    [reportsApi.reducerPath]: reportsApi.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reportsApi.middleware) 
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']


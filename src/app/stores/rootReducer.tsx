import { persistReducer } from "redux-persist"
import { combineReducers } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import authReducer from "./slices/authSlice"
import userReducer from "./slices/userSlice"
import cateReducer from "./slices/cateSlice"
import homeReducer from "./slices/homeSlice"
import productReducer from "./slices/productSlice"
import brandReducer from "./slices/brandSlice"
import sliderSlice from "./slices/sliderSlice"
import orderSlice from "./slices/orderSlice"
const persistConfig = {
   key: "root", 
   storage: storage,
   whitelist: ["authReducer","orderSlice"],
}

const reducers = combineReducers({
    authReducer,
    userReducer,
    cateReducer,
    homeReducer,
    productReducer,
    brandReducer,
    sliderSlice,
    orderSlice

})

const rootReducer = persistReducer(persistConfig, reducers);

export default rootReducer
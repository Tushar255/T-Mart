import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import ProductSlice from "./ProductSlice";
import FilterSlice from "./FilterSlice";
import UserSlice from "./UserSlice";

const rootReducer = combineReducers({
    user: UserSlice.reducer,
    cart: CartSlice.reducer,
    product: ProductSlice.reducer,
    filters: FilterSlice.reducer
})

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
});

export default store;
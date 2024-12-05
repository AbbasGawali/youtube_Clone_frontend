import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import userChannelReducer from "./userChannelSlice"
const appStore = configureStore({
    reducer: {
        user: userReducer,
        userChannel: userChannelReducer
    }
})

export default appStore;



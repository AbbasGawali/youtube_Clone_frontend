import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userDetails: JSON.parse(localStorage.getItem("ytCloneUserDetails")) || {},
        token: localStorage.getItem("ytCloneJWTToken") || "",
    },

    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("ytCloneJWTToken", action.payload);
        },
        clearToken: (state, action) => {
            state.token = ""
            localStorage.removeItem("ytCloneJWTToken");
        },
        
        setUserState: (state, action) => {
            state.userDetails = action.payload;
            localStorage.setItem("ytCloneUserDetails", JSON.stringify(action.payload));
        },
        clearUserState: (state, action) => {
            state.userDetails = {};
            localStorage.removeItem("ytCloneUserDetails");
        }
    }
});

export default userSlice.reducer;

export const { setUserState, clearUserState, setToken, clearToken } = userSlice.actions;





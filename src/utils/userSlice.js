import { createSlice } from "@reduxjs/toolkit";

// userslice for user
const userSlice = createSlice({
    name: "user",
    // initialising initial state
    initialState: {
        userDetails: JSON.parse(localStorage.getItem("ytCloneUserDetails")) || {},
        token: localStorage.getItem("ytCloneJWTToken") || "",
    },
    // creating reducer functions
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

// exporting default reducer
export default userSlice.reducer;

// named exporting reducer functions
export const { setUserState, clearUserState, setToken, clearToken } = userSlice.actions;





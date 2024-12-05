import { createSlice } from "@reduxjs/toolkit";

const userChennelSlice = createSlice({
    name: "userChannel",
    initialState: {
        userChannelDetails: {},
    },

    reducers: {
        setUserChannelDetails: (state, action) => {
            state.userChannelDetails = action.payload;
        },
        clearUserChannelDetails: (state, action) => {
            state.userChannelDetails = {}
        },
    }
});


export default userChennelSlice.reducer;

export const { setUserChannelDetails, clearUserChannelDetails } = userChennelSlice.actions;





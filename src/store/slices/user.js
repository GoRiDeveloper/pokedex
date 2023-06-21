import { createSlice } from "@reduxjs/toolkit";
import { saveSession, getSession } from "../../utils/session";

const session = getSession("session");

const initialState = {
    username: session
};

const reducers = {
    resetUsername: (state) => {
        state.username = "";
        localStorage.removeItem("session");
    },
    changeUsername: (state, action) => {

        state.username = action.payload;
        saveSession("session", state.username);

    }
};

const userSlice = createSlice({
    initialState,
    name: "user",
    reducers
});

export const { resetUsername, changeUsername } = userSlice.actions;

export default userSlice.reducer;
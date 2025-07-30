import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
    currUser: {}
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAuth: (state, action) => {
            state.currUser = action.payload;
            Cookies.set("auth", action.payload.id);
        },
        unsetAuth: (state, action) => {
            state.currUser = action.payload;
            Cookies.remove("auth");
        },
        getAuth: (state) => {
            const users = JSON.parse(localStorage.getItem('users'));
            const authKey = Cookies.get("auth");
            const user = users.find((user) => user.id === authKey);
            state.currUser = user;
        }
    }
})

export const { setAuth, unsetAuth, getAuth } = authSlice.actions;
export default authSlice.reducer;
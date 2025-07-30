import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    error: ""
}

const userSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        fetchUsers: (state) => {
            const allUsers = JSON.parse(localStorage.getItem('users')) || [];
            state.users = allUsers;
        },

        addUser: (state, action) => {
            const updatedUsers = [...state.users, action.payload];
            state.users = updatedUsers;
            localStorage.setItem("users", JSON.stringify(updatedUsers));
        },
    }
})


export const {fetchUsers, addUser} = userSlice.actions;
export default userSlice.reducer;
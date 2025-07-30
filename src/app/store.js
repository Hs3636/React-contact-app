import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/Users/userSlice'
import contactReducer from '../features/Contacts/contactSlice'
import authReducer from '../features/Auth/authSlice'

export const store = configureStore({
    reducer: {
        users: userReducer,
        auth: authReducer,
        contact: contactReducer
    }
})
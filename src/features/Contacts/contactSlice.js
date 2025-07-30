import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    contacts: []
}

const contactSlice = createSlice({
    name: 'contacts',
    initialState: initialState,
    reducers: {
        fetchContacts: (state, action) => {
            const allContacts = JSON.parse(localStorage.getItem('contacts')) || [];
            const currUserContacts = allContacts.filter((contact) => contact.userRefId === action.payload);
            state.contacts = currUserContacts;
        },

        addContact: (state, action) => {
            const updatedContacts = [...state.contacts, action.payload];
            state.contacts = updatedContacts;
            const allContacts = JSON.parse(localStorage.getItem('contacts')) || []; 
            const updatedAllContacts = [...allContacts, action.payload];
            localStorage.setItem('contacts', JSON.stringify(updatedAllContacts));
        },

        deleteContact: (state, action) => {
            const updatedContacts = state.contacts.filter((contact) => contact.id !== action.payload);
            state.contacts = updatedContacts;
            const allContacts = JSON.parse(localStorage.getItem('contacts')) || []; 
            const updatedAllContacts = allContacts.filter((contact) => contact.id !== action.payload);
            localStorage.setItem('contacts', JSON.stringify(updatedAllContacts));
        },

        editContact: (state, action) => {
            const updatedContacts = state.contacts.map((contact) => contact.id === action.payload.id ? {...contact, ...action.payload} : contact);
            state.contacts = updatedContacts;
            const allContacts = JSON.parse(localStorage.getItem('contacts')) || [];
            const updatedAllContacts = allContacts.map((contact) => contact.id === action.payload.id ? {...contact, ...action.payload} : contact);
            localStorage.setItem('contacts', JSON.stringify(updatedAllContacts));
        }
    }
})

export const { fetchContacts, addContact, deleteContact, editContact } = contactSlice.actions;
export default contactSlice.reducer;
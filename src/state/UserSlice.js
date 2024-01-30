import { createSlice } from "@reduxjs/toolkit";

const initalStateData = {
    user: '',
    token: '',
    addresses: [],
    selectedAddress: null
}

const UserSlice = createSlice({
    name: 'user',
    initialState: initalStateData,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = '';
            state.token = '';
            state.addresses = [];
            state.selectedAddress = null;
        },
        setAddresses: (state, action) => {
            state.addresses.unshift(action.payload);
        },
        deleteAddress: (state, action) => {
            const addressToDelete = action.payload;

            if (state.selectedAddress && state.selectedAddress.id === addressToDelete.id) {
                state.selectedAddress = null;
            }

            state.addresses = state.addresses.filter(address => address.id !== addressToDelete.id);
        },
        selectAddress: (state, action) => {
            state.selectedAddress = action.payload;
        }
    }
})

export default UserSlice;

export const { setLogin, setLogout, setAddresses, deleteAddress, selectAddress } = UserSlice.actions;
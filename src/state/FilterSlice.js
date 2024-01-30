import { createSlice } from "@reduxjs/toolkit";

const initialStateData = {
    sort: '',
    inStock: false,
    fastDelivery: false,
    ratings: 0,
    searchQuery: ''
}

const FilterSlice = createSlice({
    name: "filters",
    initialState: initialStateData,
    reducers: {
        ascendingOrder: (state) => {
            state.sort = 'ascendingOrder';
        },
        descendingOrder: (state) => {
            state.sort = 'descendingOrder';
        },
        applyFastDelivery: (state) => {
            state.fastDelivery = !state.fastDelivery;
        },
        applyInStock: (state) => {
            state.inStock = !state.inStock;
        },
        applyRatings: (state, action) => {
            state.ratings = action.payload;
        },
        searchProduct: (state, action) => {
            state.searchQuery = action.payload;
        },
        resetOrder: (state) => {
            state.sort = '';
            state.inStock = false;
            state.fastDelivery = false;
            state.ratings = 0;
            state.searchQuery = ''
        }
    }
})

export const { ascendingOrder, descendingOrder, resetOrder, applyFastDelivery, applyInStock, applyRatings, searchProduct } = FilterSlice.actions;

export default FilterSlice
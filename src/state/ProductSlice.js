import { createSlice } from "@reduxjs/toolkit";

const initialStateData = {
    products: [],
    initialProducts: []
}

const ProductSlice = createSlice({
    name: "product",
    initialState: initialStateData,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;

            if (state.initialProducts.length === 0)
                state.initialProducts = action.payload;
        }
    }
})

export const { setProducts } = ProductSlice.actions;

export default ProductSlice
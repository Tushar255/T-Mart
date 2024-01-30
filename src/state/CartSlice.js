import { createSlice } from "@reduxjs/toolkit";

const initialStateData = {
    cart: []
}

const CartSlice = createSlice({
    name: "cart",
    initialState: initialStateData,
    reducers: {
        addToCart: (state, action) => {
            state.cart.unshift(action.payload);
        },
        removeFromCart: (state, action) => {
            const product = action.payload;
            const item = state.cart.find(item => item.id === product.id);
            item.quantity = 1;
            state.cart = state.cart.filter(item => item.id !== product.id);
        },
        increaseQuantity: (state, action) => {
            const item = state.cart.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decreaseQuantity: (state, action) => {
            const item = state.cart.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        setCartEmpty: (state) => {
            state.cart = [];
        }
    }
})

export default CartSlice

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, setCartEmpty } = CartSlice.actions;
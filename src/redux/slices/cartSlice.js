import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        data: JSON.parse(localStorage.getItem("cart")) || []
    },
    reducers: {
        addToCart: (state, action) => {
            const itemInCart = state.data.find(
                //! di dalam cart ini ada ga data yg sama dgn data payload yg dikirim
                (item) => item.id === action.payload.id
            );
            if (itemInCart) {
                itemInCart.qty++;
            } else {
                state.data.push(action.payload);
            }
        }
    }
});

//export biasa, kita akan akses ke fungsi addToCart
export const { addToCart } = cartSlice.actions;
//export default, kita akan export reducer nya
export default cartSlice.reducer;
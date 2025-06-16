import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    //!ada parameter name, initialState, dan reducer
    name: "cart",
    initialState: [],
    reducers: {
        //!bikin action langsung disini
        addToCart(state, action) {
            state.push(action.payload);
        }
    }
});

//! store
const store = configureStore({
    //!ada parameter reducer
    reducer: {
        cart: cartSlice.reducer
    }
});

console.log("on create store: ", store.getState());

//! subscribe
store.subscribe(() => {
    console.log("STORE CHANGE: ", store.getState());
});

store.dispatch(cartSlice.actions.addToCart({ id: 1, qty: 20 }));
import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";

const addToCart = createAction("ADD_TO_CART");

//!reducer
// const initialState = {
//     cart: []
// };

// ? kalo ga pake createAction
// const cartReducer = createReducer(initialState, (builder) => {
//     builder.addCase("ADD_TO_CART", (state, action)=>{
//         state.cart.push(action.payload);
//     });
// });
const cartReducer = createReducer([], (builder) => {
    builder.addCase(addToCart, (state, action) => {
        // kalo ga dipisah pisah reducernya state.cart.push
        //tp karna reducernya khusus 1 aja jd state.push
        // redux toolkit, action adlh objek yg memiliki 2 properti utama yaitu type dan payload
        state.push(action.payload);
    });
});

const login = createAction("CREATE_SESSION");

const loginReducer = createReducer({ status: false }, (builder) => {
    builder.addCase(login, (state, action) => {
        // ?kek di switch, case nya mau lakukan apa
        state.status = true
    });
});

//! store
const store = configureStore({
    reducer: {
        login: loginReducer,
        cart: cartReducer
    }
});
console.log("on create store: ", store.getState());

//! subscribe
store.subscribe(() => {
    console.log("STORE CHANGE: ", store.getState());
});

//! dispatch
//? kalo ga pake createAction
// const action1 = { type: "ADD_TO_CART", payload: { id: 2, qty: 20 } };
// store.dispatch(action1);

// const action1 = addToCart({ id: 2, qty: 20 })
// store.dispatch(action1);

store.dispatch(addToCart({ id: 2, qty: 20 }));
store.dispatch(addToCart({ id: 1, qty: 10 }));
store.dispatch(login());
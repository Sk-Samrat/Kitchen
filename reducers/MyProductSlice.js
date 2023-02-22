import { createSlice } from '@reduxjs/toolkit';

const MyProductSlice = createSlice({
    name: 'product',
    initialState: [],
    reducers: {
        addMyProducts(state, action) {
            state.push(action.payload);
        },
        increaseQty(state, action) {
            let myindex = -1;
            state.map((item, index) => {
                if (item.product_id == action.payload) {
                    myindex = index;
                }
            });
            if (myindex == -1) {
            } else {
                state[myindex].product_quantity = state[myindex].product_quantity + 1;
                console.log(state[myindex].product_quantity + 1);
            }
            console.log('my products', state[myindex]);
        },
        decreaseQty(state, action) {
            let myindex = -1;
            state.map((item, index) => {
                if (item.product_id == action.payload) {
                    myindex = index;
                }
            });
            if (myindex == -1) {
            } else {
                state[myindex].product_quantity = state[myindex].product_quantity - 1;
                console.log(state[myindex].product_quantity - 1);
            }
            console.log('my products', state[myindex]);
        },
        removeQty(state, action) {
            let myindex = -1;
            state.map((item, index) => {
                if (item.product_id == action.payload) {
                    myindex = index;
                }
            });
            if (myindex == -1) {
            } else {
                state[myindex].product_quantity = 0;
                console.log(state[myindex].product_quantity - 1);
            }
            console.log('my products', state[myindex]);
            // console.log('My Product List: ', state);
        },
        clearMyProducts(state, action) {
            state = [];
            console.log('My Product List: ', state)
        },
    },
});

export const { addMyProducts, increaseQty, decreaseQty, removeQty, clearMyProducts } = MyProductSlice.actions;
export default MyProductSlice.reducer;
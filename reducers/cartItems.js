import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

// const initialState = [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // addToCart(state, { payload }) {
        //     console.log(payload);
        //     //uid is the unique id of the item
        //     const { id } = payload;

        //     const find = state.find((item) => item.id === id);
        //     if (find) {
        //         // alert('Inside If');
        //         return state.map((item) =>
        //             item.id === id
        //                 ? {
        //                     ...item,
        //                     quantity: item.quantity + 1,
        //                 }
        //                 : item
        //         );
        //     } else {
        //         state.push({
        //             ...payload,
        //             quantity: 1,
        //         });
        //     }
        //     console.log(state);
        // },
        addToCart(state, action) {
            console.log(state.cartItems);
            const itemIndex = state.cartItems.findIndex(
                (item) => item.item.product_id === action.payload.item.product_id
            );

            console.log(itemIndex);
            if (itemIndex >= 0) {
                //state.cartItems[itemIndex].cartQuantity += 1;

                let currentQuantity = action.payload.itemQuantity;
                state.cartItems[itemIndex].itemQuantity = currentQuantity;
            } else {
                const tempProduct = { ...action.payload, cartQuantity: 1 };
                console.log(tempProduct);
                console.log(state.cartItems.push(tempProduct));
            }
            console.log(state.cartItems);
            // console.log(state.cartItems[0].item.id)
            //console.log(state.cartItems.push(action.payload));
            // console.log(state);
            // console.log(action.payload.item.id);
            // console.log(action.payload.itemQuantity);
            // const {total }=(useSelector((state) => state.cart));
            // console.log(total);
        },
        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.item.product_id === action.payload.item.product_id
            );
            console.log(itemIndex);
            // console.log(action.payload.item.product_code);
            // console.log(action.payload);
            // console.log(state.cartItems);
            // console.log(state.cartItems[itemIndex]);
            // console.log(state.cartItems[itemIndex].itemQuantity);
            if (state.cartItems[itemIndex].itemQuantity > 1) {
                state.cartItems[itemIndex].itemQuantity -= 1;

            } else if (state.cartItems[itemIndex].itemQuantity === 1) {
                const nextCartItems = state.cartItems.filter(
                    (item) => item.product_id !== action.payload.item.product_id
                );

                state.cartItems = nextCartItems;
            }
            console.log(state.cartItems[itemIndex]);
        },
        increaseCart(state, action) {
            // console.log(action.payload);
            const itemIndex = state.cartItems.findIndex(
                (item) => item.item.product_id === action.payload.item.product_id
            );
            console.log(itemIndex);
            // console.log(action.payload.item.id);
            // console.log(action.payload);
            // console.log(state.cartItems[itemIndex]);
            // console.log(state.cartItems[itemIndex].itemQuantity);
            if (itemIndex >= 0) {
                let currentQuantity = parseInt(state.cartItems[itemIndex].itemQuantity, 10);
                let increaseQuantity = currentQuantity + 1;
                state.cartItems[itemIndex].itemQuantity = increaseQuantity;
                console.log(state.cartItems[itemIndex]);
                console.log(state.cartItems[itemIndex].itemQuantity);
            }
            else {
                const tempProduct = { ...action.payload, cartQuantity: 1 };
                console.log(tempProduct);
                console.log(state.cartItems.push(tempProduct));
            }
            console.log('cart items',state.cartItems);
        },
        increaseCartItem(state, action) {
            // console.log(action.payload);
            const itemIndex = state.cartItems.findIndex(
                (item) => item.item.product_id === action.payload.product_id
            );
            console.log(itemIndex);
            // console.log(action.payload.item.id);
            // console.log(action.payload);
            // console.log(state.cartItems[itemIndex]);
            // console.log(state.cartItems[itemIndex].itemQuantity);
            if (itemIndex >= 0) {
                let currentQuantity = parseInt(state.cartItems[itemIndex].itemQuantity, 10);
                let increaseQuantity = currentQuantity + 1;
                state.cartItems[itemIndex].itemQuantity = increaseQuantity;
                console.log(state.cartItems[itemIndex]);
                console.log(state.cartItems[itemIndex].itemQuantity);
            }
            else {
                const tempProduct = { ...action.payload, cartQuantity: 1 };
                console.log(tempProduct);
                console.log(state.cartItems.push(tempProduct));
            }
            console.log(state.cartItems);
        },
        decreaseCartItem(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.item.product_id === action.payload.product_id
            );
            console.log(itemIndex);
            // console.log(action.payload.item.product_code);
            // console.log(action.payload);
            // console.log(state.cartItems);
            // console.log(state.cartItems[itemIndex]);
            // console.log(state.cartItems[itemIndex].itemQuantity);
            if (state.cartItems[itemIndex].itemQuantity > 1) {
                state.cartItems[itemIndex].itemQuantity -= 1;

            } else if (state.cartItems[itemIndex].itemQuantity === 1) {
                const nextCartItems = state.cartItems.filter(
                    (item) => item.product_code !== action.payload.product_code
                );

                state.cartItems = nextCartItems;
            }
            console.log(state.cartItems[itemIndex]);
        },
        removeFromCart(state, action) {
            console.log('remove from cart');
            console.log('action.payload', action.payload.item);
            state.cartItems.map((cartItem) => {
                if (cartItem.item.product_id === action.payload.item.product_id) {
                    // console.log('action.payload', action.payload.item.product_code);
                    // console.log('cartTtems', cartItem.item.product_code);
                    const nextCartItems = state.cartItems.filter(
                        (item) => item.item.product_id != action.payload.item.product_id
                    );
                    // console.log('nextCartTtems', nextCartItems);
                    state.cartItems = nextCartItems;
                }
            });
        },
        // removeFromCart(state, action) {
        //     return (state.cartItems=state.cartItems.filter(cartItems => cartItems.item.product_code != action.payload));
        // },
        removeFromCartItem(state, action) {
            console.log('Welcome to Remove Cart Items from Cart');
            console.log('action.payload', action.payload.product_id);
            state.cartItems.map((cartItem) => {
                if (cartItem.item.product_id === action.payload.product_id) {
                    // console.log('action.payload', action.payload.item.product_code);
                    // console.log('cartTtems', cartItem.item.product_code);
                    const nextCartItems = state.cartItems.filter(
                        (item) => item.item.product_id != action.payload.product_id
                    );
                    // console.log('nextCartTtems', nextCartItems);
                    state.cartItems = nextCartItems;
                }
            });
        },
        getTotals(state, action) {
            let { quantity } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { cartQuantity } = cartItem;
                    //const itemTotal = cartQuantity;

                    // cartTotal.total += itemTotal;
                    cartTotal.quantity += cartQuantity;

                    return cartTotal;
                },
                {
                    //total: 0,
                    quantity: 0,
                }
            );
            //total = parseFloat(total.toFixed(2));
            state.cartTotalQuantity = quantity;
            //state.cartTotalAmount = total;
        },
        getTotalPrice(state, action) {
            let { total } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { product_price } = cartItem.item;
                    const { itemQuantity } = cartItem;
                    const itemTotal = product_price * itemQuantity;

                    cartTotal.total += itemTotal;
                    //cartTotal.quantity += cartQuantity;

                    return cartTotal;
                },
                {
                    total: 0,
                    //quantity: 0,
                }
            );
            total = parseFloat(total.toFixed(2));
            //state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        },
        clearCart(state, action) {
            state.cartItems = [];
        },
    },
});


//export const selectCount = (state) => state.cart;

export const { addToCart, decreaseCart, increaseCart, removeFromCart, getTotals, getTotalPrice, clearCart, increaseCartItem, decreaseCartItem, removeFromCartItem } = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;
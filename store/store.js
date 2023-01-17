import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../reducers/cartItems";
// import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { getTotals, getTotalPrice} from '../reducers/cartItems';
import MyProductReducer from '../reducers/MyProductSlice';
import MyOfferSlice from "../reducers/myOfferSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: MyProductReducer,
    offer: MyOfferSlice,
  },
});

store.dispatch(getTotals());
store.dispatch(getTotalPrice());

export default store;

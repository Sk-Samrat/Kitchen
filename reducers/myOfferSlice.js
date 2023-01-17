import { createSlice } from '@reduxjs/toolkit';

const MyOfferSlice = createSlice({
    name: 'offer',
    initialState: [],
    reducers: {
        addMyOffer(state, action) {
            state.push(action.payload);
        },
    },
});

export const { addMyOffer } = MyOfferSlice.actions;
export default MyOfferSlice.reducer;
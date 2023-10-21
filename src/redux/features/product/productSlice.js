import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	productData: {
		products: {},
		product: {},
	},
	info: {
		selectedParent: null,
		selectedSub: null,
		selectedThird: null,
	},
	hasTrigger: false,
};

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		setProdInfo: (state, action) => {
			state.info = { ...state.info, ...action.payload };
		},
		setProductData: (state, action) => {
			state.productData = { ...state.productData, ...action.payload };
		},
		setTrigger: (state) => {
			state.hasTrigger = !state.hasTrigger;
		},
	},
});

export const { setProdInfo, setProductData, setTrigger } = productSlice.actions;

export default productSlice.reducer;

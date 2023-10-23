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
	},
});

export const { setProdInfo, setProductData } = productSlice.actions;

export default productSlice.reducer;

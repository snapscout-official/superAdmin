import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categoryData: {
		thirdCategories: [],
		subCategories: [],
		categories: [],
	},
	info: {
		categoryType: [
			'Select Category',
			'Parent Category',
			'Sub Category',
			'Third Category',
		],
		selectedType: '',
		selectedParent: null,
		selectedSub: null,
		selectedThird: null,
	},
};

export const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		setInfo: (state, action) => {
			state.info = { ...state.info, ...action.payload };
		},
		setCategoryData: (state, action) => {
			state.categoryData = { ...state.categoryData, ...action.payload };
		},
	},
});

export const { setInfo, setCategoryData } = categorySlice.actions;

export default categorySlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/product/productSlice';
import categoryReducer from './features/category/categorySlice';
import authReducer from './features/auth/authSlice';
export const store = configureStore({
	reducer: {
		product: productReducer,
		category: categoryReducer,
		auth: authReducer,
	},
});

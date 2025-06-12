import { IProduct } from '@/app/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface ProductsState {
	products: IProduct[];
}

const initialState: ProductsState = {
	products: [],
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setProducts: (state, action: PayloadAction<IProduct[]>) => {
			state.products = action.payload;
		},
		clearProducts: (state) => {
			state.products = [];
		},
	},
});

export const { setProducts, clearProducts } = productsSlice.actions;

export const selectAllProducts = (state: RootState) => state.products.products;

export default productsSlice.reducer;

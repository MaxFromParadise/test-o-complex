import { ICartItem } from '@/app/types/cart';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
	cart: ICartItem[];
}

const initialState: CartState = {
	cart: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addProduct(state, action: PayloadAction<ICartItem>) {
			state.cart.push(action.payload);
		},
		addOrUpdateProduct(state, action: PayloadAction<ICartItem>) {
			const existing = state.cart.find((item) => item.id === action.payload.id);
			if (action.payload.quantity < 1) {
				state.cart = state.cart.filter((item) => item.id !== action.payload.id);
			} else if (existing) {
				existing.quantity = action.payload.quantity;
			} else {
				state.cart.push(action.payload);
			}
		},
		clearCart(state) {
			state.cart = [];
		},
	},
});

export const { addProduct, addOrUpdateProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

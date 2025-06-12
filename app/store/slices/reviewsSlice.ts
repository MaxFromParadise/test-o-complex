import { IReview } from '@/app/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReviewsState {
	reviews: IReview[];
}

const initialState: ReviewsState = {
	reviews: [],
};

const reviewsSlice = createSlice({
	name: 'reviews',
	initialState,
	reducers: {
		setReviews(state, action: PayloadAction<IReview[]>) {
			state.reviews = action.payload;
		},
	},
});

export const { setReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;

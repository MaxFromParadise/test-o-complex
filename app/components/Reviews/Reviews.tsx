'use client';

import { setReviews } from '@/app/store/slices/reviewsSlice';
import { IReview } from '@/app/types';
import { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ReviewItem from '../ReviewItem/ReviewItem';
import styles from './Reviews.module.scss';

/**
 * Reviews component displays a grid of user reviews.
 *
 * - Accepts a list of reviews as props.
 * - Dispatches them to the Redux store on mount (for global access if needed).
 * - Renders each review using a memoized child component.
 */

interface ReviewsProps {
	reviews: IReview[];
}

const Reviews = ({ reviews }: ReviewsProps) => {
	const dispatch = useDispatch();

	useEffect(() => {
		// Store the reviews in the Redux state for global access.
		dispatch(setReviews(reviews));
	}, [dispatch, reviews]);

	// Renders a list of review items
	const renderReviewItems = () =>
		reviews.map((item) => (
			<ReviewItem
				key={item.id}
				review={item}
			/>
		));

	return (
		<section className={styles.reviews}>
			<div className='container'>
				<div className={styles.reviews__grid}>{renderReviewItems()}</div>
			</div>
		</section>
	);
};

export default memo(Reviews);

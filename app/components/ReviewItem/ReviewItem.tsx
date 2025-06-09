import { IReview } from '@/app/types';
import clsx from 'clsx';
import { HTMLAttributes, JSX } from 'react';
import xss from 'xss';
import styles from './ReviewItem.module.scss';

/**
 * ReviewItem component
 * Renders a single user review
 */

interface ReviewItemProps extends HTMLAttributes<HTMLDivElement> {
	review: IReview;
}
const ReviewItem = ({ review, className, ...rest }: ReviewItemProps): JSX.Element => {
	const cleanReviewText = xss(review.text);

	return (
		<article
			className={clsx(styles.review, className)}
			{...rest}
		>
			<h2>Отзыв: {review.id}</h2>
			<div dangerouslySetInnerHTML={{ __html: cleanReviewText }}></div>
		</article>
	);
};

export default ReviewItem;

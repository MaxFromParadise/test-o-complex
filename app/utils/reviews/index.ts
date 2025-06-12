import { IReview } from '@/app/types';

/**
 * Fetches reviews from the remote API endpoint.
 *
 * Notes:
 * - Uses `force-cache` to leverage Next.js fetch caching.
 * - Returns a Promise resolving to an array of IReview objects.
 * - You should handle API URL and errors more robustly in production.
 */

export const getReviews = async (): Promise<IReview[]> => {
	try {
		const res = await fetch('http://o-complex.com:1337/reviews', {
			cache: 'force-cache',
		});

		if (!res.ok) {
			throw new Error(`Failed to fetch reviews: ${res.status} ${res.statusText}`);
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Error fetching reviews:', error);
		return [];
	}
};

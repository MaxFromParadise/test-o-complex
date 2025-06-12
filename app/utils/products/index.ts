import { IProduct } from '@/app/types';

/**
 * Fetches a list of products from the remote API.
 *
 * - Uses a default `limit` of 6 items per request.
 * - Enables ISR (Incremental Static Regeneration) with a 60-second revalidation period.
 * - Throws an error if the request fails.
 *
 * @param limit - Maximum number of products to fetch.
 * @returns A Promise resolving to an array of IProduct.
 */
export const getProducts = async (limit = 6): Promise<IProduct[]> => {
	const res = await fetch(`http://o-complex.com:1337/products?page=1&page_size=${limit}`, {
		next: { revalidate: 60 },
	});

	if (!res.ok) {
		throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
	}

	const data = await res.json();
	return data.items;
};

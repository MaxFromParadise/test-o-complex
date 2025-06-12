'use client';

import { RootState } from '@/app/store';
import { setProducts } from '@/app/store/slices/productsSlice';
import { IProduct } from '@/app/types';
import { getProducts } from '@/app/utils/products';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../Product/Product';
import styles from './Products.module.scss';

/**
 * Products component displays a grid of product cards and implements infinite scroll.
 *
 * Features:
 * - Initializes product list from props and stores them in Redux.
 * - Implements infinite scroll using IntersectionObserver.
 * - Dynamically fetches and appends more products when the user scrolls near the bottom.
 */

interface ProductsProps {
	initialProducts: IProduct[];
	initialLimit: number;
}

const Products = ({ initialProducts, initialLimit }: ProductsProps) => {
	const dispatch = useDispatch();
	const products = useSelector((state: RootState) => state.products.products);

	const [limit, setLimit] = useState(initialLimit);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	const observerTargetRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		dispatch(setProducts(initialProducts));
	}, [dispatch, initialProducts]);

	const loadMore = useCallback(async () => {
		if (loading || !hasMore) return;

		setLoading(true);
		try {
			const newLimit = limit + initialLimit;
			const newProducts = await getProducts(newLimit);

			if (newProducts.length <= products.length) {
				setHasMore(false);
			} else {
				dispatch(setProducts(newProducts));
				setLimit(newLimit);
			}
		} catch (error) {
			console.error('Error while loading more products:', error);
		} finally {
			setLoading(false);
		}
	}, [limit, initialLimit, loading, hasMore, products.length, dispatch]);

	useEffect(() => {
		if (!hasMore) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					loadMore();
				}
			},
			{
				root: null,
				rootMargin: '200px',
				threshold: 0.1,
			}
		);

		const target = observerTargetRef.current;
		if (target) observer.observe(target);

		return () => {
			if (target) observer.unobserve(target);
		};
	}, [loadMore, hasMore]);

	const renderProductItems = () =>
		products.map((product) => (
			<Product
				key={product.id}
				info={product}
			/>
		));

	return (
		<section className={styles.products}>
			<div className='container'>
				<div className={styles.products__grid}>{renderProductItems()}</div>

				{hasMore && (
					<div
						ref={observerTargetRef}
						className={styles.products__observerTarget}
					>
						{loading && <p>Loading...</p>}
					</div>
				)}
			</div>
		</section>
	);
};

export default memo(Products);

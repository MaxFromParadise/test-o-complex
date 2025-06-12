import Cart from './components/Cart/Cart';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import Reviews from './components/Reviews/Reviews';
import styles from './page.module.scss';
import { getProducts } from './utils/products';
import { getReviews } from './utils/reviews';

export default async function Home() {
	const reviews = await getReviews();
	const products = await getProducts();

	return (
		<div className={styles.page}>
			<Header />
			<main className={styles.main}>
				<Reviews reviews={reviews} />
				<Cart></Cart>
				<div className='container'>
					<Products
						initialProducts={products}
						initialLimit={6}
					/>
				</div>
			</main>
		</div>
	);
}

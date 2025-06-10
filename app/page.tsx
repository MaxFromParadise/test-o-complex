import Cart from './components/Cart/Cart';
import Header from './components/Header/Header';
import Product from './components/Product/Product';
import ReviewItem from './components/ReviewItem/ReviewItem';
import styles from './page.module.scss';

export default function Home() {
	return (
		<div className={styles.page}>
			<Header />
			<main className={styles.main}>
				<section className={styles.reviews}>
					<div className={styles.page__container}>
						<ReviewItem review={{ id: 1, text: '<h1>Отличный магазин!</h1><p>Есть небольшие проблемы с упаковкой, но в целом нормально.</p><p>Есть небольшие проблемы с упаковкой, но в целом нормально.</p>' }} />
					</div>
				</section>
				<Cart
					products={[
						{ id: 1, image_url: 'https://placehold.co/400x300/EEE/31343C?font=raleway&text=Product+1', title: 'Bose Смартфон Premium', description: 'Отличный мультимедийный продукт с отличной производительностью', price: 49294 },
						{ id: 2, image_url: 'https://picsum.photos/400/300?random=2', title: 'Huawei Телевизор Pro', description: 'Отличный технический продукт с отличной производительностью', price: 30651 },
					]}
				></Cart>
				<div className={styles.page__container}>
					<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '35px' }}>
						<Product info={{ id: 1, image_url: 'https://placehold.co/400x300/EEE/31343C?font=raleway&text=Product+1', title: 'Bose Смартфон Premium', description: 'Отличный мультимедийный продукт с отличной производительностью', price: 49294 }}></Product>
						<Product info={{ id: 2, image_url: 'https://picsum.photos/400/300?random=2', title: 'Huawei Телевизор Pro', description: 'Отличный технический продукт с отличной производительностью', price: 30651 }}></Product>
						<Product info={{ id: 3, image_url: 'https://picsum.photos/400/300?random=3', title: 'Huawei Планшет Max', description: 'Отличный мультимедийный продукт с высокой производительностью', price: 37244 }}></Product>
					</div>
				</div>
			</main>
		</div>
	);
}

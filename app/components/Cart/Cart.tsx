'use client';
import { IProduct } from '@/app/types';
import { JSX, useState } from 'react';
import { IMaskInput } from 'react-imask';
import Button from '../Button/Button';
import styles from './Cart.module.scss';

interface CartProps {
	products: IProduct[];
}

const Cart = ({ products }: CartProps): JSX.Element => {
	const [phone, setPhone] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setPhone('');
	};
	return (
		<section className={styles.cart}>
			<h2 className={styles.cart__title}>Добавленные товары</h2>
			<form onSubmit={handleSubmit}>
				{products.length > 0 ? (
					<ul className={styles.cart__list}>
						{products.map((product) => (
							<li
								key={product.id}
								className={styles.cart__item}
							>
								<div className={styles.cart__itemTitle}>{product.title}</div>
								<div className={styles.cart__itemCount}>x3</div>
								<div className={styles.cart__itemPrice}>₽ {new Intl.NumberFormat('ru-RU').format(product.price * 3)}</div>
							</li>
						))}
					</ul>
				) : (
					<div>Корзина пуста</div>
				)}
				<div className={styles.cart__actions}>
					<IMaskInput
						mask='+7 (000) 000-00-00'
						value={phone}
						unmask={false}
						onAccept={(value: string) => setPhone(value)}
						overwrite
						placeholder='+7 (___) ___-__-__'
						type='tel'
						required
						className={styles.cart__input}
						autoComplete='tel'
						name='phone'
					/>
					<Button type='submit'>заказать</Button>
				</div>
			</form>
		</section>
	);
};

export default Cart;

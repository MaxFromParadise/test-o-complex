'use client';

import { RootState } from '@/app/store';
import { JSX, memo, useCallback, useMemo, useState } from 'react';
import { IMaskInput } from 'react-imask';
import { useSelector } from 'react-redux';
import Button from '../Button/Button';
import styles from './Cart.module.scss';

/**
 * Cart component displays the list of items in the cart and provides
 * a form to place an order using a masked phone number input.
 */

const Cart = (): JSX.Element => {
	const cart = useSelector((state: RootState) => state.cart.cart);
	const [phone, setPhone] = useState('');

	const handleSubmit = useCallback((e: React.FormEvent) => {
		e.preventDefault();
		setPhone('');
	}, []);

	const renderCartItems = useMemo(() => {
		return cart.map((product) => (
			<li
				key={product.id}
				className={styles.cart__item}
			>
				<div className={styles.cart__itemTitle}>{product.title}</div>
				<div className={styles.cart__itemCount}>x{product.quantity}</div>
				<div className={styles.cart__itemPrice}>₽ {new Intl.NumberFormat('ru-RU').format(product.price * product.quantity)}</div>
			</li>
		));
	}, [cart]);

	return (
		<section className={styles.cart}>
			<h2 className={styles.cart__title}>Добавленные товары</h2>

			<form onSubmit={handleSubmit}>
				<ul className={styles.cart__list}>{cart.length > 0 ? renderCartItems : 'Корзина пуста'}</ul>

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

export default memo(Cart);

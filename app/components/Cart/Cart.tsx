'use client';

import { RootState } from '@/app/store';
import { clearCart } from '@/app/store/slices/cartSlice';
import { JSX, memo, useCallback, useMemo, useState } from 'react';
import { IMaskInput } from 'react-imask';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button/Button';
import styles from './Cart.module.scss';

const Cart = (): JSX.Element => {
	const dispatch = useDispatch();
	const cart = useSelector((state: RootState) => state.cart.cart);
	const [phone, setPhone] = useState('');
	const [error, setError] = useState('');

	const isPhoneValid = (phone: string) => {
		return /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phone);
	};

	const handleSubmit = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault();
			setError('');

			if (!isPhoneValid(phone)) {
				setError('Номер телефона заполнен неверно');
				return;
			}

			const digitsOnlyPhone = phone.replace(/\D/g, '');

			const orderData = {
				phone: digitsOnlyPhone,
				cart: cart.map((item) => ({
					id: item.id,
					quantity: item.quantity,
				})),
			};

			try {
				const response = await fetch('http://o-complex.com:1337/order', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(orderData),
				});
				const data = await response.json();

				if (data.success === 1) {
					setError('Заказ успешно отправлен');
					setPhone('');
					dispatch(clearCart());
				} else {
					setError('Ошибка при отправке заказа');
				}
			} catch (err) {
				console.error(err);
				setError('Произошла ошибка при отправке запроса');
			}
		},
		[phone, cart]
	);

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
				<label className={styles.cart__error}>{error}</label>
			</form>
		</section>
	);
};

export default memo(Cart);

'use client';

import { IProduct } from '@/app/types';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { HTMLAttributes, JSX, memo, useCallback, useState } from 'react';
import Button from '../Button/Button';
import styles from './Product.module.scss';

interface ProductProps extends HTMLAttributes<HTMLDivElement> {
	info: IProduct;
}

const Product = ({ info, className, ...rest }: ProductProps): JSX.Element => {
	const [quantity, setQuantity] = useState<number>(0);
	const [inputValue, setInputValue] = useState<string>('0');
	const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

	const handleIncrement = useCallback(() => {
		setQuantity((prev) => {
			const next = prev + 1;
			setInputValue(String(next));
			return next;
		});
	}, []);

	const handleDecrement = useCallback(() => {
		setQuantity((prev) => {
			const next = Math.max(0, prev - 1);
			setInputValue(String(next));
			return next;
		});
	}, []);

	const handleBuy = useCallback(() => {
		setQuantity(1);
		setInputValue('1');
	}, []);

	const handleInputFocus = () => {
		setIsInputFocused(true);
		if (quantity === 0) setInputValue('');
	};

	const handleInputBlur = () => {
		setIsInputFocused(false);
		const parsed = parseInt(inputValue);
		const safeValue = isNaN(parsed) ? 0 : parsed;
		setQuantity(safeValue);
		setInputValue(String(safeValue));
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		if (/^\d*$/.test(val)) {
			setInputValue(val);
			const num = parseInt(val);
			setQuantity(isNaN(num) ? 0 : num);
		}
	};

	const renderControls = (): JSX.Element => {
		const showBuyButton = quantity < 1 && !isInputFocused;

		if (showBuyButton) {
			return (
				<motion.div
					key='buy'
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.95 }}
					transition={{ duration: 0.2 }}
				>
					<Button onClick={handleBuy}>Купить</Button>
				</motion.div>
			);
		}
		return (
			<motion.div
				key='counter'
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.95 }}
				transition={{ duration: 0.2 }}
				className={clsx(styles.product__controls, styles.counter)}
			>
				<Button onClick={handleDecrement}>-</Button>

				<input
					type='text'
					inputMode='numeric'
					pattern='\d*'
					value={isInputFocused ? inputValue : quantity}
					onFocus={handleInputFocus}
					onBlur={handleInputBlur}
					onChange={handleInputChange}
					className={styles.product__input}
				/>

				<Button onClick={handleIncrement}>+</Button>
			</motion.div>
		);
	};

	return (
		<article
			className={clsx(styles.product, className)}
			{...rest}
		>
			<Image
				className={styles.product__img}
				src={info.image_url}
				alt={info.title}
				width={281}
				height={366}
			/>

			<h2 className={styles.product__title}>{info.title}</h2>
			<p className={styles.product__description}>{info.description}</p>
			<p className={styles.product__price}>₽ {info.price}</p>

			<div className={styles.product__buttons}>
				<AnimatePresence mode='wait'>{renderControls()}</AnimatePresence>
			</div>
		</article>
	);
};

Product.displayName = 'Product';

export default memo(Product);

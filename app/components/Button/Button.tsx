import clsx from 'clsx';
import { HTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';

/**
 * Reusable Button component
 * Supports all native button props and merges custom classes.
 */

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	type?: 'button' | 'submit' | 'reset';
}

const Button = ({ children, type = 'button', className, ...rest }: ButtonProps) => {
	return (
		<button
			type={type}
			className={clsx(styles.button, className)}
			{...rest}
		>
			{children}
		</button>
	);
};

Button.displayName = 'PageTitle';

export default Button;

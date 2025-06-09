import clsx from 'clsx';
import { HTMLAttributes, JSX, ReactNode } from 'react';
import styles from './PageTitle.module.scss';

/**
 * PageTitle component
 * Renders an <h1> element with predefined styling and supports standard h1 props.
 **/

interface PageTitleProps extends HTMLAttributes<HTMLHeadingElement> {
	children: ReactNode;
}
const PageTitle = ({ children, className, ...rest }: PageTitleProps): JSX.Element => {
	return (
		<h1
			{...rest}
			className={clsx(styles.title, className)}
		>
			{children}
		</h1>
	);
};

PageTitle.displayName = 'PageTitle';

export default PageTitle;

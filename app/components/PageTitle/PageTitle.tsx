import { HTMLAttributes, ReactNode } from 'react';
import styles from './PageTitle.module.scss';
/**
 * PageTitle component
 * Renders an <h1> element with predefined styling and supports standard h1 props.
 **/
interface Props extends HTMLAttributes<HTMLHeadingElement> {
	children: ReactNode;
}
const PageTitle = ({ children, ...rest }: Props) => {
	return (
		<h1
			{...rest}
			className={`${styles.title}${rest.className ? ' ' + rest.className : ''}`}
		>
			{children}
		</h1>
	);
};

export default PageTitle;

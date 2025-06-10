import PageTitle from '../PageTitle/PageTitle';
import styles from './Header.module.scss';
const Header = () => {
	return (
		<header className={styles.header}>
			<PageTitle>тестовое задание</PageTitle>
		</header>
	);
};

export default Header;

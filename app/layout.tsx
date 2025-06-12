import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import ReduxProvider from './providers/ReduxProvider';
const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Test O-Complex',
	description: 'Test task for O-Complex',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${inter.className}`}>
				<ReduxProvider>{children}</ReduxProvider>
			</body>
		</html>
	);
}

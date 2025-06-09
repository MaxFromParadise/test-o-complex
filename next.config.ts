import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		domains: ['placehold.co', 'picsum.photos'],
		dangerouslyAllowSVG: true,
	},
};

export default nextConfig;

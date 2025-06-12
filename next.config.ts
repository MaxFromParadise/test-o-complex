import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		domains: ['placehold.co', 'picsum.photos', 'dummyimage.com'],
		dangerouslyAllowSVG: true,
	},
};

export default nextConfig;

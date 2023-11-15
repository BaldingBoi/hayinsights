/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			"api.dicebear.com",
			"assets.coingecko.com",
			"s2.coinmarketcap.com",
		],
		dangerouslyAllowSVG: true,
	},
	output: "standalone",
};

module.exports = nextConfig;

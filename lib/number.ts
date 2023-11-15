export const formatNumber = (num: any, maximumFractionDigits = 8) => {
	if (!num) return 0;
	return new Intl.NumberFormat("en-GB", {
		maximumFractionDigits,
		minimumFractionDigits: 2,
	}).format(num);
};

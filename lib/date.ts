export const formatDate = (destinationTimestamp: number) =>
	new Intl.DateTimeFormat("en-GB").format(destinationTimestamp);

export const getPastDate = (dateDiff: string) => {
	const destinationTimestamp = Date.now() - parseInt(dateDiff) * 86400 * 1000;
	return new Intl.DateTimeFormat("en-GB").format(destinationTimestamp);
};

export const getPastDateISO = (dateDiff: string) => {
	const destinationTimestamp = Date.now() - parseInt(dateDiff) * 86400 * 1000;
	return new Date(destinationTimestamp).toISOString();
};

export const getDateDiff = (timestamp1: number, timestamp2: number) => {
	return Math.floor(Math.abs(timestamp1 - timestamp2) / (1000 * 3600 * 24));
};

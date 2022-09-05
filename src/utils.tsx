/**
 * this function is meant to create a random number which will be used for IDs
 * @param limit the largest number this function can generate
 * @returns a random number between 0 and the limit
 */
export function createRandomId(limit: number = 65536) {
	return (Math.random() * limit).toFixed();
}

/**
 * this function capitalizes the first letter in the string
 * @param str the string to capitalize
 */
export function capitalCase(str: string) {
	return str[0].toUpperCase() + str.substring(1);
}

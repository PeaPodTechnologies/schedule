/**
 * this function capitalizes the first letter in the string
 * @param str the string to capitalize
 */
export function toCapitalCase(str: string) {
	return str[0].toUpperCase() + str.substring(1).toLowerCase();
}

export function underscoreJoin(...args: any[]) {
	return args
		.map(arg => {
			return arg.toString();
		})
		.join('_');
}

/**
 * this function takes some input and tries to parse a float from it.
 * @param input some number
 * @returns returns true if there is a number, false otherwise
 */
export function ensureNumber(input: any): boolean {
	if (isNaN(parseFloat(input))) {
		return false;
	} else {
		return true;
	}
}

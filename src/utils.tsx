/**
 * this function capitalizes the first letter in the string
 * @param str the string to capitalize
 */
export function toCapitalCase(str: string) {
	return str[0].toUpperCase() + str.substring(1).toLowerCase();
}

/**
 *
 * @param input some text
 * @returns "some text" -> "some text: "
 */
export function toLabel(input: string) {
	// getting the last two chars of the input
	let trailing = input.substring(input.length - 2);

	// testing if there is a semicolon at the end of the string
	if (trailing.at(0) !== ':') input += ':';

	// testing if there is a space at the end of the string
	if (trailing.at(1) !== ' ') input += ' ';

	// returning the output
	return toCapitalCase(input);
}

/**
 * this function joins the elements in the given array with underscores
 * @param args things to join
 */
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

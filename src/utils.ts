/**
 * this function capitalizes the first letter in the string
 * @param str the string to capitalize
 */
export function toCapitalCase(str: string): string {
	return str
		.split(' ')
		.map(word => {
			return word[0].toUpperCase() + word.substring(1).toLowerCase();
		})
		.join(' ');
}

/**
 *
 * @param input some text
 * @returns "some text" -> "some text: "
 */
export function toLabel(input: string): string {
	if (input.length === 0) return input;
	// returning the output
	return toCapitalCase(input);
}

/**
 * this function joins the elements in the given array with underscores
 * @param args things to join
 */
export function underscoreJoin(...args: any[]): string {
	return args
		.map(arg => {
			return arg.toString();
		})
		.join('_');
}

/**
 * this function is a shorthand to properly validate numerical input
 * @param value some value
 * @param comparison a value to compare it to
 * @returns true if the value is defined, a number and is different
 */
export function ensureAll(value: any, comparison: any): boolean {
	let tests = [
		ensureDifferent(parseFloat(value), comparison),
		ensureDefined(value),
		ensureNumber(value)
	];
	return tests.every(value => {
		return value === true;
	});
}

/**
 * this function is a shorthand to testing whether the value is different than the other value
 * @param value some value
 * @param comparison a value to compare it to
 * @returns true if the value is different from the comparator
 */
export function ensureDifferent(value: any, comparison: any): boolean {
	if (value === comparison) {
		return false;
	} else {
		return true;
	}
}

/**
 * this function is a shorthand to test whether or something is undefined or not
 * @param value some value
 * @returns true if the value is not undefined
 */
export function ensureDefined(value: any): boolean {
	if (value === undefined) {
		return false;
	} else {
		return true;
	}
}

/**
 * this function takes some input and tries to parse a float from it.
 * @param value some number
 * @returns returns true if there is a number, false otherwise
 */
export function ensureNumber(value: string): boolean {
	if (isNaN(parseFloat(value))) {
		return false;
	} else {
		return true;
	}
}

/**
 * Tools
 *
 * Useful functions that belong to any specific module
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2018-11-25
 */

// Ouroboros modules
import clone from '@ouroboros/clone';

// Regex
const _reNumeric: RegExp = /^\d+$/;
const _rePhone: RegExp = /^1?(\d{3})(\d{3})(\d{4})$/
const _reQueryPart: RegExp = /([^=&]+)=?([^&]*)/g
const _reQueryName: RegExp = /^([a-zA-Z_][0-9a-zA-Z_]*)(\[([0-9a-zA-Z_]*)\])?$/

/**
 * Array Find Index
 *
 * Finds a specific object in an array based on key name and value and
 * returns its index
 *
 * @name afindi
 * @access public
 * @param a	The value to look through
 * @param k The name of the key to check
 * @param v The value to check against
 * @returns The index found, or -1
 */
export function afindi(a: Record<string, any>[], k: string | number, v: any): number {
	for(let i: number = 0; i < a.length; ++i) {
		if(a[i][k] === v) {
			return i;
		}
	}
	return -1;
}

/**
 * Array Find Object
 *
 * Finds a specific object in an array based on key name and value and
 * returns it
 *
 * @name afindo
 * @access public
 * @param a The value to look through
 * @param k The name of the key to check
 * @param v The value to check against
 * @returns The object found, or null
 */
export function afindo(a: Record<string, any>[], k: string | number, v: any): Record<string, any> | null {
	for(const o of a) {
		if(o[k] === v) {
			return o;
		}
	}
	return null;
}

/**
 * Array Find Delete
 *
 * Finds a specific object in an array based on key name and value and then
 * deletes the object from the array
 *
 * If returnClone is set to true, a new copy of the passed array is returned if
 * the record is found and deleted, else the same array passed is returned with
 * no change
 *
 * @name arrayFindDelete
 * @access public
 * @param a	The value to look through
 * @param k The name of the key to check
 * @param v The value to check against
 * @param returnClone If set to true, a clone of `a`, or `a`, is returned
 * 						in place of true or false
 * @returns boolean | Array
 */
export function arrayFindDelete(a: Record<string, any>[], k: string | number, v: any, returnClone?: boolean): boolean | Record<string, any>[] {

	// First, find the record
	const i = afindi(a, k, v);

	// If the record isn't found
	if(i === -1) {
		return returnClone ? a : false;
	}

	// If we want to clone it
	if(returnClone) {
		const l = clone(a);
		l.splice(i, 1);
		return l;
	}

	// Else, update it in place and return success
	a.splice(i, 1);
	return true;
}

/**
 * Array Find Merge
 *
 * Finds a specific object in an array based on key name and value and then
 * merges the new data with the existing data
 *
 * If returnClone is set to true, a new copy of the passed array is returned if
 * the record is found and merged, else the same array passed is returned with
 * no change
 *
 * @name arrayFindMerge
 * @access public
 * @param a	The value to look through
 * @param k The name of the key to check
 * @param v The value to check against
 * @param d The data to put on top of the existing data
 * @param returnClone If set to true, a clone of `a`, or `a`, is returned
 * 						in place of true or false
 * @returns boolean | Array
 */
export function arrayFindMerge(a: Record<string, any>[], k: string | number, v: any, d: Record<string, any>, returnClone?: boolean): boolean | Record<string, any>[] {

	// First, find the record
	const i = afindi(a, k, v);

	// If the record isn't found
	if(i === -1) {
		return returnClone ? a : false;
	}

	// If we want to clone it
	if(returnClone) {
		const l = clone(a);
		l[i] = {...l[i], ...d};
		return l;
	}

	// Else, update it in place and return success
	a[i] = {...a[i], ...d};
	return true;
}

/**
 * Array Find Overwrite
 *
 * Finds a specific object in an array based on key name and value and then
 * overwrites the existing data with the new data
 *
 * If returnClone is set to true, a new copy of the passed array is returned if
 * the record is found and merged, else the same array passed is returned with
 * no change
 *
 * @name arrayFindOverwrite
 * @access public
 * @param a	The value to look through
 * @param k The name of the key to check
 * @param v The value to check against
 * @param d The data to put on top of the existing data
 * @param returnClone If set to true, a clone of `a`, or `a`, is returned
 * 						in place of true or false
 * @returns boolean | Array
 */
export function arrayFindOverwrite(a: Record<string, any>[], k: string | number, v: any, d: Record<string, any>, returnClone?: boolean): boolean | Record<string, any>[] {

	// First, find the record
	const i = afindi(a, k, v);

	// If the record isn't found
	if(i === -1) {
		return returnClone ? a : false;
	}

	// If we want to clone it
	if(returnClone) {
		const l = clone(a);
		l[i] = d;
		return l;
	}

	// Else, update it in place and return success
	a[i] = d;
	return true;
}

/**
 * Array Shift
 *
 * Shifts an item in an array from one index to another
 *
 * @name ashift
 * @access public
 * @param arr The array to shift the item in
 * @param from The current location of the item
 * @param to The new location of the item
 */
export function ashift(arr: any[], from: number, to: number): void {
	if(from >= 0 && from < arr.length) {
		const [item] = arr.splice(from, 1);
		arr.splice(to, 0, item);
	}
}

/**
 * Bytes Human
 *
 * Returns the size of bytes in the closest binary prefix so that they are
 * clearly understood by humans
 *
 * @name bytesHuman
 * @access public
 * @param num The value in bytes to convert to human readable
 * @returns The string representation of the bytes
 */
export function bytesHuman(num: number): string {
	for(const unit of ['','Ki','Mi','Gi','Ti','Pi','Ei','Zi']) {
		if(Math.abs(num) < 1024.0) {
			return `${num.toFixed(1)}${unit}B`
		}
		num /= 1024.0
	}
	return `${num.toFixed(1)}YiB`;
}

/**
 * Combine
 *
 * Combines two objects into a new one and returns it. If there are any
 * duplicate keys, those in "a" are overwritten by those in "b"
 *
 * @name combine
 * @access public
 * @param a An object to be combined with b
 * @param b An object to be combined with a
 * @returns A new object of a and b
 */
export function combine(a: Record<string, any>, b: Record<string, any>): Record<string, any> {

	// Copy the first object
	const o = clone(a);

	// Get each key of the second dict
	for(const k in b) {

		// If the value is another dict and it exists in first as well
		if(isObject(b[k]) && k in o && isObject(o[k])) {

			// Call merge because we are passing the new cloned object and
			//	don't need to create another one
			merge(o[k], b[k]);
		}

		// Else, we overwrite the value as is
		else {
			o[k] = b[k];
		}
	}

	// Return the new object
	return o;
}

/**
 * Compare
 *
 * Compares two values of any type to see if they contain the same
 * data or not
 *
 * @name compare
 * @access public
 * @param a The first value
 * @param b The second value
 * @returns true if the same, otherwise false
 */
export function compare(a: any, b: any): boolean {

	// If they're both arrays
	if(Array.isArray(a) && Array.isArray(b)) {

		// If they don't have the same length
		if(a.length !== b.length) {
			return false;
		}

		// Compare the values
		for(let i = 0; i < a.length; ++i) {
			if(!compare(a[i], b[i])) {
				return false;
			}
		}
	}

	// Else if they're both objects
	else if(isObject(a) && isObject(b)) {

		// If they don't have the same keys
		if(!compare(Object.keys(a).sort(), Object.keys(b).sort())) {
			return false;
		}

		// Compare each key
		for(const k in a) {
			if(!compare(a[k], b[k])) {
				return false;
			}
		}
	}

	// Else, compare as is
	else {
		if(a !== b) {
			return false;
		}
	}

	// Return equal
	return true;
}

/**
 * Divmod
 *
 * Take two (non complex) numbers as arguments and return a pair of numbers
 * consisting of their quotient and remainder when using integer division. 100%
 * stolen from python
 *
 * @name divmod
 * @access public
 * @param x The dividend
 * @param y The divisor
 * @returns an array of quotient (0) and remainder (1)
 */
export function divmod(x: number, y: number): [number, number] {
	/* tslint:disable:no-bitwise */
	return [
		~~(x / y),
		x % y
	]
	/* tslint:enable:no-bitwise */
}

/**
 * Empty
 *
 * Returns true if the value type is empty
 *
 * @name empty
 * @access public
 * @param m The value to check, can be object, array, string, etc
 * @returns true if empty
 */
export function empty(m: any): boolean {

	// If it's an object
	if(isObject(m)) {
		for(const p of Object.keys(m)) {
			return false;
		}
		return true;
	}

	// Else if it's an array or a string
	else if(Array.isArray(m) || typeof m === 'string') {
		return m.length === 0;
	}

	// Else
	else {

		// If it's null or undefined
		if(typeof m === 'undefined' || m === null) {
			return true;
		}

		// Else return false
		return false;
	}
}

/**
 * Is Decimal
 *
 * Returns true if the variable is a number
 *
 * @name isDecimal
 * @access public
 * @param m The variable to test
 * @returns true if decimal
 */
export function isDecimal(m: any): boolean {
	return typeof m === 'number';
}

/**
 * Is Integer
 *
 * Returns true if the variable is a true integer
 *
 * @name isInteger
 * @access public
 * @param m The variable to test
 * @returns true if integer
 */
export function isInteger(m: any): boolean {
	/* tslint:disable:no-bitwise */
	return m === +m && m === (m|0);
	/* tslint:enable:no-bitwise */
}

/**
 * Is Numeric
 *
 * Returns true if a string is made up only of digits
 *
 * @name isNumeric
 * @access public
 * @param s The string to check
 * @returns true if numeric
 */
export function isNumeric(s: string): boolean {

	// Get the type of the argument
	const sType = typeof s;

	// If we have a string
	if(sType === 'string') {
		return _reNumeric.exec(s) ? true : false;
	}

	// If we got a number
	else if(sType === 'number') {
		return true;
	}

	// Else
	else {
		return false;
	}
}

/**
 * Is Object
 *
 * Returns true if the variable is a true object
 *
 * @name isObject
 * @access public
 * @param m The variable to test
 * @returns true if object
 */
export function isObject(m: any): boolean {

	// If it's null, it's not an object
	if(m === null) {
		return false;
	}

	// If the type is not an object
	if(typeof m !== 'object') {
		return false;
	}

	// Return based on the constructor name
	return (m.constructor && m.constructor.name === 'Object');
}

/**
 * Join
 *
 * Creates a single string from a list of members that may or may not exist in
 * the passed object
 *
 * @name join
 * @access public
 * @param o The object to pull members from
 * @param l The list of members, in order, to join together
 * @param separator Optional char/string to join with, defaults to space
 * @returns The joined string
 */
export function join(o: Record<string, any>, l: string[], separator: string=' ') {

	// Init the array of found members
	const lFound: any[] = [];

	// Go through each member passed
	for(const s of l) {

		// If it exists
		if(s in o) {
			lFound.push(o[s]);
		}
	}

	// Join and return
	return lFound.join(separator);
}

/**
 * Max
 *
 * Returns the maximum (largest) value in an array
 *
 * @name max
 * @access public
 * @param a The array to find the largest value in
 * @returns the largest value
 */
export function max(a: string[] | number[]): string | number | null {

	// If we didn't get an array
	if(!Array.isArray(a)) {
		throw new Error('max() must be passed an Array');
	}

	// If we have no values
	if(a.length === 0) {
		return null;
	}

	// Get the type of the first element, we will assume all others are the
	//	same
	const sType: string = typeof a[0];

	// If we got a number, use Math library
	if(sType === 'number') {
		return Math.max(...(a as number[]));
	}

	// If we got a string
	else if(sType === 'string') {

		// Start with the first value
		let sRet: string = (a as unknown as string)[0];

		// Go through each element after the first
		for(let i = 1; i < a.length; ++i) {
			if((a[i] as string).normalize('NFD') > sRet.normalize('NFD')) {
				sRet = a[i] as string;
			}
		}

		// Return whatever ended up being largest
		return sRet;
	}

	// Invalid type
	else {
		throw new Error('max requires an array of numbers or strings');
	}
}

/**
 * Merge
 *
 * Merges the keys from the second object into the first
 *
 * @name merge
 * @access public
 * @param a The object to merge with b
 * @param b The object to merge with a
 */
export function merge(a: Record<string, any>, b: Record<string, any>): void {

	// Get each key of the second dict
	for(const k in b) {

		// If the value is another dict and it exists in first as well
		if(isObject(b[k]) && k in a && isObject(a[k])) {

			// Call merge on the children
			merge(a[k], b[k]);
		}

		// Else, we overwrite the value as is
		else {
			a[k] = b[k];
		}
	}
}

/**
 * Min
 *
 * Returns the minimum (smallest) value in an array
 *
 * @name min
 * @access public
 * @param a The array to find the largest value in
 * @returns the smallest value
 */
export function min(a: string[] | number[]): string | number | null {

	// If we didn't get an array
	if(!Array.isArray(a)) {
		throw new Error('min() must be passed an Array');
	}

	// If we have no values
	if(a.length === 0) {
		return null;
	}

	// Get the type of the first element, we will assume all others are the
	//	same
	const sType = typeof a[0];

	// If we got a number, use Math library
	if(sType === 'number') {
		return Math.min(a as unknown as number);
	}

	// If we got a string
	else if(sType === 'string') {

		// Start with the first value
		let sRet: string = a[0] as string;

		// Go through each element after the first
		for(let i = 1; i < a.length; ++i) {
			if((a[i] as string).normalize('NFD') < sRet.normalize('NFD')) {
				sRet = a[i] as string;
			}
		}

		// Return whatever ended up being smallest
		return sRet;
	}

	// Invalid type
	else {
		throw new Error('min requires an array of numbers or strings');
	}
}

/**
 * Nice Phone
 *
 * Returns a more easily readable phone number in the NA format
 *
 * @name nicePhone
 * @access public
 * @param val The digits of the phone number to convert
 * @returns the phone number
 */
export function nicePhone(val: string): string {
	const lMatch = _rePhone.exec(val);
	if(!lMatch) {
		return val;
	}
	return '+1 (' + lMatch[1] + ') ' + lMatch[2] + '-' + lMatch[3];
}

/**
 * Object Map
 *
 * Works like map for arrays, but iterates over an object returning the value,
 * the key, and the index, in that order.
 *
 * @name omap
 * @access public
 * @param o The object to map
 * @param callback The function to call each iteration
 * @returns a new array of each processed object
 */
export function omap(o: Record<string, any>, callback: (v: any, k: string, i: number) => {}): any[] {
	const ret: any[] = [];
	let index: number = 0;
	for(const k of Object.keys(o)) {
		ret.push(callback(o[k], k, index++));
	}
	return ret;
}

/**
 * Object Pop
 *
 * Removes an element from an object by name, then returns it
 *
 * @name opop
 * @access public
 * @param o The object to pop from
 * @param name The name of the value to pop
 * @returns the value in `name`
 */
export function opop(o: Record<string, any>, name: string): any {
	const m = clone(o[name]);
	delete o[name];
	return m;
}

/**
 * Object Without
 *
 * Takes an object and removes the given key(s) from it and returns a copy of it
 *
 * @name owithout
 * @param o The object to remove keys from
 * @param keys The key, or keys, to remove from the object
 * @returns a copy of the object without the keys
 */
export function owithout(o: Record<string, any>, keys: string | string[]): Record<string, any> {

	// Clone the object
	const ret = clone(o);

	// If we have a single string
	if(typeof keys === 'string') {
		delete ret[keys];
	}

	// Else, if we have multiple
	else if(Array.isArray(keys)) {
		for(const k of keys) {
			delete ret[k];
		}
	}

	// Return the new object
	return ret;

}

/**
 * Parse Query
 *
 * Turns a query string into an object
 *
 * @name parseQuery
 * @access public
 * @param query The query string to parse
 * @returns name/value pairs
 */
export function parseQuery(query: string): Record<string, any> {

	// Init the return value
	const oRet: Record<string, any> = {};

	// If there's anything in the string
	if(query.length > 1) {
		let lField: RegExpExecArray | null = null;

		// Go through each part found
		while(true) {
			lField = _reQueryPart.exec(query)
			if(lField === null) {
				break;
			}

			// Breakdown the name part
			const lName = _reQueryName.exec(lField[1]);

			// If we got no value, skip it
			if(!lName) {
				continue;
			}

			// If we got an array/object type
			if(lName[2]) {

				// If we don't have the name yet
				if(!(lName[1] in oRet)) {

					// If we have a key value
					if(lName[3]) {

						// If the key is a numerical representation
						if(isNumeric(lName[3])) {

							// Make an array and add the value to it at the
							//	given index
							oRet[lName[1]] = [];
							oRet[lName[1]][parseInt(lName[3], 10)] = decodeURIComponent(lField[2]);
						}

						// Else, it's a normal string
						else {

							// Make a new object
							oRet[lName[1]] = {
								[lName[3]]: decodeURIComponent(lField[2])
							}
						}
					}

					// Else, if it's an append, create a new array
					else {
						oRet[lName[1]] = [decodeURIComponent(lField[2])];
					}
				}

				// Else, if we already have a value
				else {

					// If we have a key value
					if(lName[3]) {

						// If the existing value is an object
						if(isObject(oRet[lName[1]])) {

							// Just add the key
							oRet[lName[1]][lName[3]] = decodeURIComponent(lField[2]);
						}

						// Else, if we have an array
						else if(Array.isArray(oRet[lName[1]])) {

							// If the key is a numerical representation
							if(isNumeric(lName[3])) {
								oRet[lName[1]][parseInt(lName[3], 10)] = decodeURIComponent(lField[2]);
							}

							// Else, it's a string
							else {

								// Convert the array into an object
								const oNewField: Record<string, any> = {};
								for(let i = 0; i < oRet[lName[1]].length; ++i) {
									oNewField[i.toString()] = oRet[lName[1]][i];
								}

								// Now add the key
								oNewField[lName[3]] = decodeURIComponent(lField[2]);

								// And overwrite the existing field
								oRet[lName[1]] = oNewField;
							}
						}

						// Else, we have a single value
						else {

							// Create a new object with the value
							oRet[lName[1]] = {
								"0": oRet[lName[1]]
							}

							// And add the key
							oRet[lName[1]][lName[3]] = decodeURIComponent(lField[2]);
						}
					}

					// Else, if it's an append
					else {

						// If we have an array
						if(Array.isArray(oRet[lName[1]])) {

							// Push the value to the end
							oRet[lName[1]].push(decodeURIComponent(lField[2]));
						}

						// Else, If the existing value is an object
						else if(isObject(oRet[lName[1]])) {

							// Just add the key using an empty string
							oRet[lName[1]][''] = decodeURIComponent(lField[2]);
						}

						// Else we have a single value
						else {

							// Create a new array with the existing and new value
							oRet[lName[1]] = [oRet[lName[1]], decodeURIComponent(lField[2])];
						}
					}
				}
			}

			// Else, just store the pair as is
			else {
				oRet[lField[1]] = decodeURIComponent(lField[2]);
			}
		}
	}

	// Return the name/value pairs found
	return oRet;
}

// The sets available for the random function
const _oRandomSets = {
	"0x":	"0123456789abcdef",
	"0":	"01234567",
	"10":	"0123456789",
	"10*":  "123456789",
	"az":	"abcdefghijklmnopqrstuvwxyz",
	"az*":	"abcdefghijkmnopqrstuvwxyz",
	"AZ":	"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	"AZ*":	"ABCDEFGHJKLMNPQRSTUVWXYZ",
	"aZ":	"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
	"aZ*":	"abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",
	"!":	"!@#$%^&*-_+.?",
	"!*":	"!@$^*-_."
}

/**
 * Random
 *
 * Generates a random string. By default this function will generate an 8
 * character string using lowercase letters with possible repeating characters
 *
 * Available sets:
 *  0x: 0123456789abcdef
 *  0:  01234567
 *  10: 0123456789
 *  az: abcdefghijklmnopqrstuvwxyz
 *  az*:abcdefghijkmnopqrstuvwxyz
 *  AZ: ABCDEFGHIJKLMNOPQRSTUVWXYZ
 *  AZ*:ABCDEFGHJKLMNPQRSTUVWXYZ
 *  aZ: abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
 *  aZ*:abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ
 *  !:  !@#$%^&*-_+.?
 *  !*: !@$%^*-_.
 *
 * Sets with * remove problematic characters that can cause issues in humans or
 * computer systems, such as 0 (zero) or O (oh), and & which messes up HTML/URLs
 *
 * @name random
 * @access public
 * @param length The length requested for the generated string
 * @param sets A list of names from the standard sets, or any string to be used
 *             as an array of characters to chose from. If you want certain
 *             characters to have a greater chance of appearing, use them more
 *             times, e.g. twice the 'A's, "AABC", or three times the 'B's,
 *             "ABBBC". Make sure not to turn off duplicates for this to be
 *             effective. Defaults to set "aZ"
 * @param duplicates If true, allows the same character to be used more than
 *                   once
 * @returns the generated random string
 */
export function random(length: number, sets: string | string[] = ['aZ'], duplicates: boolean=true): string {

	// Init the character array
	let chars: string = '';

	// If we got a list
	if(Array.isArray(sets)) {

		// If it's empty
		if(sets.length === 0) {
			throw new Error('sets must contain at least one set name');
		}

		// Go through the list of passed sets
		for(const s of sets) {

			// If s is not a string
			if(typeof s !== 'string') {
				throw new Error(`${s} is not a string`);
			}

			// If the set doesn't exist
			if(!(s in _oRandomSets)) {
				throw new Error(`${s} is not a valid set`);
			}

			// Else, add it to the allowed characters
			chars += _oRandomSets[s as keyof typeof _oRandomSets];
		}
	}

	// Else if we have a string, use it as the character set
	else if(typeof sets === 'string') {
		chars = sets;
	}

	// Else, the value of sets is invalid
	else {
		throw new Error(`${sets} is not a valid value for sets argument of random`);
	}

	// If we don't allow duplicates, and the length of available characters is
	//	less than the expected length, throw an error
	if(!duplicates && chars.length < length) {
		throw new Error(`Can not generate random string with no duplicates from the given sets "${chars}"`)
	}

	// Init the return variable
	let text: string = '';

	// Create a `length` of random character
	while(text.length < length) {
		const found: string = chars.charAt(Math.floor(Math.random() * chars.length));

		// If we don't allow duplicates, and the character is already found,
		//  loop back around
		if(!duplicates && text.includes(found)) {
			continue;
		}

		// Add the character
		text += found;
	}

	// Return the generated string
	return text;
}

/**
 * Sort By Key
 *
 * Returns a callback function that will compare two objects by the key name
 *
 * @name sortByKey
 * @access public
 * @param key The name of the key to sort by
 * @returns the function
 */
export function sortByKey(key: string): (a:Record<string, any>, b:Record<string, any>) => {} {
	return (a, b) => {
		if(a[key] === b[key]) return 0;
		else return (a[key] < b[key]) ? -1 : 1;
	}
}

/**
 * UCFirst
 *
 * Makes the first character of each word in the text upper case
 *
 * @name ucfirst
 * @access public
 * @param text The text to convert
 * @returns the converted text
 */
export function ucfirst(text: string): string {
	const lParts = text.split(' ');
	return lParts.map(s =>
		s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
	).join(' ');
}

// Default export
const tools = {
	afindi, afindo, arrayFindDelete, arrayFindMerge, arrayFindOverwrite, ashift,
	bytesHuman, combine, compare, divmod, empty, isDecimal, isInteger, isNumeric,
	isObject, join, max, merge, min, nicePhone, omap, opop, owithout, parseQuery,
	random, sortByKey, ucfirst
};
export default tools;
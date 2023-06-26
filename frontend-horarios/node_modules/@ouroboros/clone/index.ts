/**
 * Clone
 *
 * A function for cloning a piece of data completely.
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2018-11-25
 */

// Types
type handledCallback = ((o: any) => any) | boolean;
type handledStruct = {
	constructor: any,
	callback: handledCallback
}

/**
 * Handled Classes
 *
 * Holds class types with the callback to be called when they are encountered
 *
 * @name _ignoreClasses
 * @access private
 */
const _handledClasses: handledStruct[] = [
	{constructor: Date, callback: true},
	{constructor: RegExp, callback: true}
];

/**
 * Clone
 *
 * Extended by child classes to handle cloning them
 *
 * @name Clone
 * @access public
 */
export class Clone {

	/**
	 * Clone
	 *
	 * Called to process an instance and return a new one by the main clone
	 * function
	 *
	 * @name clone
	 * @access public
	 * @returns a new instance copied from this instance
	 */
	clone(): any {
		return this;
	}
}

/**
 * clone
 *
 * Deep clone any type of object, returning a new one
 *
 * @name clone
 * @access public
 * @param o The variable to clone
 * @returns The clone of o
 */
export default function clone(o: any): any {

	// If it's an array, go through each index and clone it
	if(Array.isArray(o)) {
		const a = [];
		for(const i of o) {
			a.push(clone(i));
		}

		// Return the new array
		return a;
	}

	// If it's an instance of a class
	if(o && o.constructor) {

		// If it has a clone method
		if(o.clone) {

			// Return the clone value
			return o.clone();
		}

		// Go through the list of classes to ignore
		for(const h of _handledClasses) {

			// If the value is an instance of an ignored class
			if(o instanceof h.constructor) {

				// If the callback is false, return as is
				if(h.callback === false) {
					return o;
				}

				// If it's true, use the constructor to call itself
				if(h.callback === true) {
					return new h.constructor(o);
				}

				// Else, it has to be a callback, pass it the data and return
				//	whatever it returns
				return h.callback(o);
			}
		}

		// If it's an actual object
		if(o.constructor.name === 'Object') {
			const oclone: Record<string, any> = {};

			// Go through each key and clone it
			for(const k of Object.keys(o)) {
				oclone[k] = clone(o[k]);
			}

			// Return the new copy
			return oclone;
		}
	}

	// Else, return as is
	return o;
}

/**
 * Clone Handle
 *
 * Adds classes that the clone function will process using a custom callback
 *
 * @name cloneHandle
 * @access public
 * @param c The class to add
 */
export function cloneHandle(c: any, callback: false): void {
	_handledClasses.push({
		constructor: c,
		callback
	});
}
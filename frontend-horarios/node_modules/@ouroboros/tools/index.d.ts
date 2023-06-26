/**
 * Tools
 *
 * Useful functions that belong to any specific module
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2018-11-25
 */
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
export declare function afindi(a: Record<string, any>[], k: string | number, v: any): number;
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
export declare function afindo(a: Record<string, any>[], k: string | number, v: any): Record<string, any> | null;
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
export declare function arrayFindDelete(a: Record<string, any>[], k: string | number, v: any, returnClone?: boolean): boolean | Record<string, any>[];
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
export declare function arrayFindMerge(a: Record<string, any>[], k: string | number, v: any, d: Record<string, any>, returnClone?: boolean): boolean | Record<string, any>[];
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
export declare function arrayFindOverwrite(a: Record<string, any>[], k: string | number, v: any, d: Record<string, any>, returnClone?: boolean): boolean | Record<string, any>[];
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
export declare function ashift(arr: any[], from: number, to: number): void;
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
export declare function bytesHuman(num: number): string;
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
export declare function combine(a: Record<string, any>, b: Record<string, any>): Record<string, any>;
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
export declare function compare(a: any, b: any): boolean;
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
export declare function divmod(x: number, y: number): [number, number];
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
export declare function empty(m: any): boolean;
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
export declare function isDecimal(m: any): boolean;
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
export declare function isInteger(m: any): boolean;
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
export declare function isNumeric(s: string): boolean;
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
export declare function isObject(m: any): boolean;
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
export declare function join(o: Record<string, any>, l: string[], separator?: string): string;
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
export declare function max(a: string[] | number[]): string | number | null;
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
export declare function merge(a: Record<string, any>, b: Record<string, any>): void;
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
export declare function min(a: string[] | number[]): string | number | null;
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
export declare function nicePhone(val: string): string;
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
export declare function omap(o: Record<string, any>, callback: (v: any, k: string, i: number) => {}): any[];
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
export declare function opop(o: Record<string, any>, name: string): any;
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
export declare function owithout(o: Record<string, any>, keys: string | string[]): Record<string, any>;
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
export declare function parseQuery(query: string): Record<string, any>;
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
export declare function random(length: number, sets?: string | string[], duplicates?: boolean): string;
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
export declare function sortByKey(key: string): (a: Record<string, any>, b: Record<string, any>) => {};
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
export declare function ucfirst(text: string): string;
declare const tools: {
    afindi: typeof afindi;
    afindo: typeof afindo;
    arrayFindDelete: typeof arrayFindDelete;
    arrayFindMerge: typeof arrayFindMerge;
    arrayFindOverwrite: typeof arrayFindOverwrite;
    ashift: typeof ashift;
    bytesHuman: typeof bytesHuman;
    combine: typeof combine;
    compare: typeof compare;
    divmod: typeof divmod;
    empty: typeof empty;
    isDecimal: typeof isDecimal;
    isInteger: typeof isInteger;
    isNumeric: typeof isNumeric;
    isObject: typeof isObject;
    join: typeof join;
    max: typeof max;
    merge: typeof merge;
    min: typeof min;
    nicePhone: typeof nicePhone;
    omap: typeof omap;
    opop: typeof opop;
    owithout: typeof owithout;
    parseQuery: typeof parseQuery;
    random: typeof random;
    sortByKey: typeof sortByKey;
    ucfirst: typeof ucfirst;
};
export default tools;

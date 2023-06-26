/**
 * Clone
 *
 * A function for cloning a piece of data completely.
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2018-11-25
 */
/**
 * Clone
 *
 * Extended by child classes to handle cloning them
 *
 * @name Clone
 * @access public
 */
export declare class Clone {
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
    clone(): any;
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
export default function clone(o: any): any;
/**
 * Clone Handle
 *
 * Adds classes that the clone function will process using a custom callback
 *
 * @name cloneHandle
 * @access public
 * @param c The class to add
 */
export declare function cloneHandle(c: any, callback: false): void;

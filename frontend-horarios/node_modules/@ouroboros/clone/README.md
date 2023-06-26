# @ouroboros/clone

[![npm version](https://img.shields.io/npm/v/@ouroboros/clone.svg)](https://www.npmjs.com/package/@ouroboros/clone) ![MIT License](https://img.shields.io/npm/l/@ouroboros/clone.svg)

A function for cloning a piece of data completely.

## Installation
npm
```bash
npm install @ouroboros/clone
```

### clone
Does a deep copy of pure data arrays, objects, and other simple types.
```javascript
import clone from '@ouroboros/clone';

const o1 = {
	message: [
		{ greeting: ['h', 'e', 'l', 'l', 'o' ] },
		{ name: ['w', 'o', 'r', 'l', 'd'] },
		{ punctuation: ['!'] }
	]
};
const o2 = clone(o1)

// True. o2 now contains the same data as o1, but they are
//	different instances of the object
o1 !== o2

// All true. Every part of o2, at every level, is a copy, not a pointer, of the data in o2
o1.message !== o2.message
o1.message[0] !== o2.message[0]
o1.message[0].greeting !== o2.message[0].greeting
o1.message[1].name !== o2.message[1].name
```

### Clone
Can be extending by any child class to add .clone() to it, which will be run by the library to handle cloning the instance of the object when it is encountered. The default .clone() method implemented by Class simply returns the value as is.
```javascript
import clone, { Clone } from '@ouroboros/clone';

class MyClass extends Clone {
	// ... do class stuff
}

const o1 = { instance = new MyClass() };
const o2 = clone(o1);

// True. The objects are different despite containing the same data.
o1 !== o2

// False! The variables within the objects still point to the same instance of MyClass.
o1.instance !== o2.instance
```

### Implementing .clone()
By overwriting `.clone()` you can handle implementing the copy yourself and be 100% sure you have a different instance.

Note, we don't actually extend Clone in the below example. It's recommended if you're using clone within your own library or project, but it's not necessary to create a dependency to `clone` in order to add support for `clone`. As long as `clone` finds a method to call on the instance, it will call it and use the return value.
```javascript
import clone from '@ouroboros/clone';

class MyClass {
	constructor(one, two) {
		this.one = one;
		this.two = two;
	}
	clone() {
		return new MyClass(this.one, this.two);
	}
	// ... do class stuff
}

const o1 = { instance = new MyClass() };
const o2 = clone(o1);

// True. The objects are different despite containing the same data.
o1 !== o2

// True. The instances contain the same data, but they are now different.
o1.instance !== o2.instance
```

### using cloneIgnore()
If you are running into a problem of a class instance being cloned as an object, thereby destroying the constructor associated, and for whatever reason you can't give it a custom .clone() method, you can pass the class' type to cloneIgnore and it will be skipped by the library when instances are discovered.

```javascript
import clone, { cloneIgnore } from '@ouroboros/clone';

class MyClass {
	// ... do class stuff
}

// Add the type of class to be ignored
cloneIgnore(MyClass);

const o1 = { instance = new MyClass() };
const o2 = clone(o1);

// True
o1 !== o2

// False. All we did was ignore cloning the instance and return it as is.
o1.instance !== o2.instance
```
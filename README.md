# bluebird-decorator [![NPM version](http://img.shields.io/npm/v/bluebird-decorator.svg?style=flat-square)](https://www.npmjs.org/package/bluebird-decorator) [![Build status](http://img.shields.io/travis/lukehorvat/bluebird-decorator.svg?style=flat-square)](https://travis-ci.org/lukehorvat/bluebird-decorator)

An ES7 decorator for ensuring that every Promise returned by a function is a [Bluebird](http://bluebirdjs.com) instance.

## Installation

Install the package with NPM:

```bash
$ npm install bluebird-decorator
```

## Usage

Example:

```javascript
import bluebird from "bluebird-decorator";

class Dog {
  @bluebird
  bark() { return Promise.resolve("Woof!") }
}

let dog = new Dog();
let promise = dog.bark(); // Return value is a Bluebird instance, not a Promise.
promise.then(noise => console.log(noise)); // Print "Woof!".
```

Also, functions that do not return a Promise instance are ignored.

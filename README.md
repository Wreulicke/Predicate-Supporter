# Predicate-Supporter

Support predicates and promise chain predicates.

# Install

Install with npm

```
npm i predicate-supporter
```

# Usage

```js
var P=require('predicate-supporter').Predicate
isOdd=(n)=>n%2==1
is3Times=(n)=>n%3==0
isOddAnd3Times=P(isOdd).AND(is3Times)

console.log(isOddAnd3Times(2)) // => false
console.log(isOddAnd3Times(6)) // => false
console.log(isOddAnd3Times(9)) // => true
console.log(isOdd.OR(is3Times)(6)) // true
```
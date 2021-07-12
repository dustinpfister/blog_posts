---
title: Array Every method in native javaScript
date: 2021-07-12 15:08:00
tags: [js]
layout: post
categories: js
id: 908
updated: 2021-07-12 15:16:03
version: 1.3
---

The [Array every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every) method of the [Array prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) in native javaScript is a way to test if all elements in an array will meet a given condition or not. In the event that just one element in the array does not meet the condition, then the end result will be false. This method is then similar to that of the [array some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) method that will return true if just one of the elements in the array will pass the test.

<!-- more -->

## 1 - Some basic Array every method examples

### 1.1 - Just a test all for number type example

```js
let arr = [1, 2, 3, 4]
 
let b = arr.every((el) => {
        return typeof el === 'number';
    });
 
console.log(b); // true
```

### 1.2 - is all number helper

```js
let allNums = (arr) => {
    return arr.every((el) => {
        return typeof el === 'number';
    });

};
 
console.log( allNums([1,2,3]) ); // true
console.log( allNums(['1','foo', true]) ); // false
```


## 2 - The array some method

```js
let onePlusNums = (arr) => {
    return arr.some((el) => {
        return typeof el === 'number';
    });
};
 
console.log( onePlusNums([1,2,3]) ); // true
console.log( onePlusNums([1,'2','3']) ); // true
console.log( onePlusNums(['1','foo', true]) ); // false
```

## 3 - An Array tester method that can be used in an every or some mode

```js
let testAll = (array, tester, every) => {
    let pass = false,
    i = 0,
    len = array.length;
    every = every === undefined ? true : every;
    while (i < len) {
        var el = array[i];
        var result = tester(el, i, array);
        // if every
        if (every) {
            pass = true;
            if (!result) {
                pass = false;
                break;
            }
        }
        // if not every (some)
        if (!every) {
            pass = false; // default pass to false
            if (result) {
                pass = true;
                break;
            }
        }
        i += 1;
    }
    return pass;
};
 
let isNum = (el, i, array) => {
    return typeof el === 'number';
};
 
let arr1 = [1, 2, 'c'];
console.log(testAll(arr1, isNum, true)); // false
console.log(testAll(arr1, isNum, false)); // true
 
let arr2 = [1, 2, 3];
console.log(testAll(arr2, isNum, true)); // true
console.log(testAll(arr2, isNum, false)); // true
```

## 4 - Conclusion

This week I think I will write a few new posts on native javaScript features that I have not got around to writing about yet. 
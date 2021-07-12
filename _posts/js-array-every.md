---
title: Array Every method in native javaScript
date: 2021-07-12 15:08:00
tags: [js]
layout: post
categories: js
id: 908
updated: 2021-07-12 15:30:14
version: 1.9
---

The [Array every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every) method of the [Array prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) in native javaScript is a way to test if all elements in an array will meet a given condition or not. In the event that just one element in the array does not meet the condition, then the end result will be false. This method is then similar to that of the [array some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) method that will return true if just one of the elements in the array will pass the test.

The array every method is then one of many built in array prototype methods that involve looping over the contents of an array to preform some kind of action like that of the [array map](/2020/06/16/js-array-map) method, or the [array filter](/2020/10/03/js-array-filter) method when it comes to [working with arrays in javaScript](/2018/12/10/js-array/). Some might say that this method is a little redundant as there are methods like array for each method, or better yet a while loop, that can be used to easily accomplish the same task. However there are some things about it that help to make quicker work or creating a boolen value, and to do so in a standard way when it comes to the function that is given that will be called for each element.

<!-- more -->

## 1 - Some basic Array every method examples

In this section I will be going over a few quick simple examples of the array every method.

### 1.1 - Just a test all for number type example

In this example I am using the array every method to check if a given array contains only numbers or not by making use of the typeof operator when working out the expression for the function that I pass to the array every method.

```js
let arr = [1, 2, 3, 4]
 
let b = arr.every((el) => {
        return typeof el === 'number';
    });
 
console.log(b); // true
```

### 1.2 - Making an is all number helper

So then the array every method can be used to create methods that will preform a test on all elements in an array and return true of all the elements in that array pass the given test. So I can create a method like all numbs and have it so that I just pass an array, and the all nums helper will return true of all elements in the array are numbers.

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
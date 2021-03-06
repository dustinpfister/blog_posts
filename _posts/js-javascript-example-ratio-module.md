---
title: Ratio Module javaScript example
date: 2021-04-13 13:30:00
tags: [js]
layout: post
categories: js
id: 844
updated: 2021-04-14 10:00:36
version: 1.23
---

This [javaScript example](/2021/04/02/js-javascript-example/) post will be on a ratio module that I put together that I intend to use with a bunch of other modules to create one or more games that involve the use of ratios. The main project thus far with this is my orb.js module that I have been working on as of late, but I am sure that I might find additional uses for this in future projects.

<!-- more -->

## 1 - The ratio module

In this section I will be going over the ratio module as it stands of this writing. The modules contains basic tool functions like a greatest common divisor method, and all kinds of additional methods that I have found that I needed when making my orb.js module that prompted the creation of this module. The way that I made it is to just have the very simple object literal module pattern, this seems to work okay for this module at least as all the functions are pubic methods.

### 1.1 - The start of the module, and the GCD methods

I start off the module with an object literal assigned to a single global variable called ratio. After that the first method that I have is a Greatest Common Divisor method that will find the highest number that can be used to divide two numbers to a whole number. This method is central to creating a simplified form of a set of numbers so that I have the ratio of that set of numbers. AFter the main GCD method I then have another method that will  work with an array of numbers, rather than just two.

```js
var ratio = {};
 
// Greatest Common Divisor
// https://en.wikipedia.org/wiki/Greatest_common_divisor
ratio.GCD = function (a, b) {
    if (!b) {
        return a;
    }
    return ratio.GCD(b, a % b);
};

// Greatest Common Divisor from array
// https://www.geeksforgeeks.org/gcd-two-array-numbers/
ratio.GCDFromArray = function(arr, n){
    let result = arr[0];
    n = n === undefined ? arr.length: n;
    for (let i = 1; i < n; i++){
        result = ratio.GCD(arr[i], result);
        if(result == 1){
            return 1;
        }
    }
    return result;
};
```

### 1.2 - Do all Non Zero elements Equal each other

Do all the elements in the array that are not zero equal each other? This is an important step when it comes to finding the type of orb when it comes to my orb module. However I thought I would make it part of this module.

```js
// Are all non-zero elements in the ratio equal to each other?
// ratio.allNonZeroEqual([1,0,1,1]); // true
// ratio.allNonZeroEqual([1,2,0,4]); // false
ratio.allNonZeroEqual = function (array) {
    var a = 0;
    return array.every(function(num){
        if(num === 0){ // if 0 return true
            return true;
        }
        if (a === 0) { // if first non-zero value return true
            a = num;
            return true;
        }
        // if any additional non-zero value does not equal the 
        // first non zero value return false, else true
        return num === a;
    });
};
```

### 1.3 - Count Non Zero elements

Count the number of elements in an array that are not zero, and return that value. This is yet another method that I might want to have at the ready now and then when it comes to the kind of projects that I might use it in. Of course to know for sure I will need to work more on those kinds of projects to find out of I really need this, or I am just waisting time adding features that I think I will need.

```js
// count nonZero array elements
ratio.countNonZero = function(array){
    return array.reduce(function(acc, n, i){
        acc = i === 1 ? acc === 0 ? 0 : 1 : acc;
        return acc += n > 0 ? 1 : 0;
    });
};
```

### 1.4 - Is the array binary?

Is the [given array a binary array or not](https://stackoverflow.com/questions/49743318/fast-way-to-check-if-a-javascript-array-is-binary-contains-only-0-and-1), that is of the array is compose of elements that are 0 and 1 return true, else return false. One might think that making a method like this would be pretty easy, and it is, but there are a few situations in which one might get unexpected results. So for my method that does this I went with parseInt rather than the Number method to make sure that an element values is converted to a number before being compared to 0 or 1 literals with the identity operator. I also make sure that the method returns false right away for an empty array, by not doing so I would get a false positive for that kind of value.

```js
ratio.isBinaryArray = function(array){
    var i = 0,
    len = array.length;
    // return false for empty array
    if(len === 0){
        return false;
    }
    while(i < len){
        if(parseInt(array[i]) === 0 || parseInt(array[i]) === 1){
           i += 1;
           continue;
        }
        return false;
    }
    return true;
};
```

The method seems to pass all tests that I would expect it to pass, but it might still not work as expected for some values.

### 1.5 - Get simple ratio

This one helps me to get the simple ratio of a set of numbers. The process of doing so with this method uses the all non zero equal method to fist check if all the elements other than zero equal each other or not. If this is the case then the result should just be 1 for any and all non zero elements and that is it. In my orb.js module orbs that have these kinds of rations are treated as certain kinds of special types compared to orbs that have rations that are not in this kind of form.

In the event that one or more non zero elements do not equal all other non zero elements then the GCD from array method is used to get what the ratio should be for the set of numbers.

```js
// get the simple ratio from a set of arr (or simplify a ratio)
// ratio.getSimpleRatio([0,0,14,2]); // [0,0,7,1]
ratio.getSimpleRatio = function (arr) {
    // make sure pure, dual, triple, and quad
    // work they way they should
    if (ratio.allNonZeroEqual(arr)) {
        return arr.map(function (el) {
            return el === 0 ? 0 : 1;
        });
    }
    // if we get this far use ratio.GDCFromArray
    var gcd = ratio.GCDFromArray(arr);
    // get simple ratio by diving all arr by gd
    return arr.map(function (pt, i) {
        return pt / gcd;
    });
};
```

### 1.6 - Get ratio raised a number of times.

There is taking a simple ratio like 2,2,0,1 and then passing a number like 2 to get a result like 4,4,0,2. That would be the expected result if the set base was something like 1, but it would also be nice to have a simple method where I can change what the base is.

```js
// raise the given array of numbers n time with the given base
// The array of numbers will be simplified
// ratio.getRaisedRatio([2,2,0,1], 2, 1); // [4,4,0,2]
// ratio.getRaisedRatio([2,2,0,1], 4, 2); // [32,32,0,16]
ratio.getRaisedRatio = function(arr, n, base){
    n = n === undefined ? 1 : n;
    base = base === undefined ? 1 : base;
    var simp = ratio.getSimpleRatio(arr);
    return simp.map(function(el){
        //return n * Math.pow(el, base);
        return n * Math.pow(el, base);
    });
};
```

### 1.7 - Get level with the given base

I might want to have a function where I can base an array of numbers, alone with a base, and the result will be the number of times that simple ratio of that set of numbers is raised with the given base. For example if I pass the method a set of numbers like 4,4,0,2 with a base of 1 the returned result should be 2. The reason why would be that the simple ratio of 2,2,0,1 multiplied two times would be 4,4,0,2

```js
// The inverse of ratio.getRaisedRatio
// ratio.getLevel([4,4,0,2], 1); // 2
// ratio.getLevel([32,32,0,16], 2); // 4
ratio.getLevel = function(arr, base){
    base = base === undefined ? 1 : base;
    // get lowest non zerro number
    var a = Math.min.apply(null, arr.filter(function(n){
        return n > 0;
    }));
    // if base is one just divide
    if(base === 1){
        return a / base;
    }
    // else use Math.log
    return Math.log(a) / Math.log(base);
};
```
 
### 1.8 - Just a simple sum

This is a method that will just return a sum of all the elements of the ratio or set of points. I have not run into many used case example where I would need to use this method, but I thought it was just another method that I should have at the ready when it comes to using this module in some actual projects.
 
```js
// just the sum of the numbers
ratio.sum = function(arr){
    return arr.reduce(function(acc, n){
        return acc + n;
    });
};
```

## 2 - Conclusion

So for now that is all I have to say about my ratio.js module, so far it is proving itself to be a useful tool for working with ratios. In time when I get more time to write some simple use case examples I might get around to expanding this post a bit more. For now that main module of interest that makes use of this is my [orb javaScript module](/2021/04/09/js-javascript-example-orb-module), that I intend to use in at least one, if not a few canvas games. So as those games come together I will be coming around to expand this module and post at that point. I am sure that there are some additional methods that I might want to park here, and there might also be a few bugs that I have missed that I will need to deal with at some point also.


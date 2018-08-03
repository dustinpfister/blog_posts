---
title: The lodash _.groupBy method
date: 2018-08-02 21:33:00
tags: [js,lodash]
layout: post
categories: lodash
id: 245
updated: 2018-08-03 12:08:23
version: 1.5
---

In [lodash](https://lodash.com/) there is a useful  collection method called [\_.groupBy](https://lodash.com/docs/4.17.10#groupBy) that can be used to created an object that has keys where each each key is a group that meets some kind of conditions defined in a function that is given to it. In other words in can be used to group things together, this post will show some examples of \_.groupBy in action.

<!-- more -->

## 1 - Getting started

This is a post on a single collection method called \_.groupBy in the javaScript utility library known as lodash. It is not a beginners guide on lodash, or javaScript in general. I assume that you have at least some background in javaScipt, and are researching lodash wondering if it is something that you should bother with or not.

## 2 - Some basic examples of \_.groupBy

The \_.groupBy method is one of the many collection methods in lodash meaning that it can be used with any object in general, not just Arrays. So the first argument given to it can be an Array, an Array like object, or just any Object, and then the second argument is the method that will be used to group the elements in the array. Whatever is returned by the method, is what will be used as a key for an array that will store the one or more elements that belong to that key, depending on the conditions defined in the method.

### 2.1 - Group an array of numbers by a simple condition

To start off with a very basic example, say you have a simple array of numbers, and you just want to split them into two groups one where the number is below a certian value and as such belongs to a 'fail' group, and all other numbers then end up falling into a 'pass' group.

```js
let _ = require('lodash');
 
let nums = [2, 20, 4, 3, 7, 8, 32, 42, 256],
 
grouped = _.groupBy(nums, function (n) {
 
    return n < 10 ? 'fail' : 'pass'
 
});
 
console.log(grouped);
// { fail: [ 2, 4, 3, 7, 8 ], pass: [ 20, 32, 42, 256 ] }
```

When this is called the method given to \_.groupBy is called for each element in the array, the value can the be subjected to conditions, or any body of code that is placed in the method that will ultimately be used to return a value that will be used as a key to group the item.

### 2.2 -  Group by powers of a base

For a slightly more advanced example that still involves an array of numbers, why not group some numbers by the base of one or more numbers. That is have a method that will group an array of numbers by a given array of bases, where a number in the collection will be check if it is the base of the first number in the array of bases, and so forth untill a base is found, or end up defaulting to a 'none' key.

```js
let _ = require('lodash');
 
let byBase = function (collection, bases) {
 
    return _.groupBy(collection, function (n) {
 
        let b = -1;
 
        // group by first base that is found in bases
        _.forEach(bases, function (base) {
 
            let log = _.round(Math.log(n) / Math.log(base), 4);
 
            if (String(log).indexOf('.') === -1) {
 
                b = base;
                // returning false will break _.forEach
                return false;
 
            }
 
        });
 
        // if the base is not -1, group by base
        if (b != -1) {
 
            return b;
 
        }
 
        // else group it under the key 'none'
        return 'none';
 
    });
 
};
 
let nums = [27,9,256,49,2,16,42,3,1024,20];
 
console.log(byBase(nums, [2, 3, 7]));
 
//{ '2': [ 256, 2, 16, 1024 ],
//  '3': [ 27, 9, 3 ],
//  '7': [ 49 ],
//  none: [ 42, 20 ] }
```

So now this is a pretty fun, and useful method that can be used in a lot of different ways. notice that in this example I am also using \_.round to round the values that will be set to log to a given precision this helps with a problem where I end up with numbers like 3.0000000001 when finding the power of a number relative to a base. Also note that even methods like \_.forEach have little tricks that make them a little more robust compared to the native Array.forEach equivalent, as I can return true to break the forEach loop.

## 3 - Grading classes example of \_.groupBy

For a more interesting example say you are a student that is taking some classes, you know a number grade for each grade, but you want to group all your clasees by a 

```js
let _ = require('lodash');
 
let clases = [
    {name: 'Math',grade: 83},
    {name: 'Programing',grade: 100},
    {name: 'Art',grade: 98}, 
    {name: 'PE',grade: 93},
    {name: 'English',grade: 42},
    {name: 'Bio',grade: 60}
];
 
// grade method that uses _.groupBy
let gradeClases = function (clases) {
 
    let letters = {
        'A+': 98,
        'A.': 93,
        'A-': 90,
        'B+': 86,
        'B.': 83,
        'B-': 80,
        'C+': 76,
        'C.': 73,
        'C-': 70,
        'D+': 66,
        'D.': 63,
        'D-': 60
    };
 
    return _.groupBy(clases, function (sub) {
 
        // default to an F
        let key = 'F.';
 
        _.forEach(letters, function (g, letter) {
 
            if (sub.grade >= g) {
 
                key = letter;
                return false;
 
            }
 
        });
 
        return key;
 
    });
 
};
 
console.log(gradeClases(clases));
 
//{ 'B.': [ { name: 'Math', grade: 83 } ],
//  'A+': [ { name: 'Programing', grade: 100 },{ name: 'Art', grade: 98 } ],
//  'A.': [ { name: 'PE', grade: 93 } ],
//  'F.': [ { name: 'English', grade: 42 } ],
//  'D-': [ { name: 'Bio', grade: 60 } ] }
```

## 4 - Conclusion

Although there are many methods in lodash that are not really needed, in light of what is available in javaScript by itself that is not the case with \_.groupBy. Also methods like \_.round, and \_.forEach do bring a little more to the table compare to what there is to work with natively, and can help save a little time when it comes to making vanilla js alternatives.
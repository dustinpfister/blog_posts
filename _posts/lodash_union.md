---
title: The lodash _.untion method and Sets
date: 2020-09-02 14:38:00
tags: [lodash]
layout: post
categories: lodash
id: 699
updated: 2020-09-03 08:55:09
version: 1.7
---

Time for another one of my usual [lodash](https://lodash.com/) posts this time I will touch base on the [lodash union](https://lodash.com/docs/4.17.15#union) method. Just like many lodash methods there are ways of doing the same thing that the lodash union method does with vanilla javaScriot, so I will be taking a look at [sets](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) in native javaScript also.

The lodash union method is a way to create an array of unique values from one or more arrays of values. So say you have a whole bunch of arrays, but you justs want a single array of values that are not repeated then the lodash unique method can be done to do so. There are ways of doing the same with native javaScript by itself also, which is one reason why I will also be touching based on sets also when it comes to not using lodash.

<!-- more -->

## 1 - basic lodash union example with arrays

So a basic example of the lodash union method would be to just call the method and pass one or more arrays as arguments. The result that is returned is an array of values where only unique values are in the resulting array. In other words it is a way to omit values that repeat.

```js
let arr = _.union([1, 2, 3], [6], [3, 2, 4, 1], [5, 4]);
 
console.log( _.sortBy(arr) );
// [1,,3,4,5,6]
```

## 2 - Nested Objects with the lodash union, and lodash flatten methods

If I use a method like lodash union in a project I might run into problems with nested objects. When giving arrays of primitives the numbers are the values that are going to be tested as to the fact that they are unique or not. However when having arrays of objects that are also arrays, it is the arrays themselves that are tested, not the nested elements or object key values. If this is a problem then the nested objects will need to be flattened first. So it might be worth pointing out that in lodash there are the flatten, flattenDeep, and flattenDepth methods that can sometimes help in these cases.

```js
let obj = {
    i: 0
};
 
let a = [{
        i: 1
    }, obj],
b = [[{
            x: 2
        },
        obj
    ]
];
 
let arr = _.union(a, b);
 
// this will result in the nested array being one of the unique values
// so the unique value will be the array, rather than the elements of it,
// and the reference to the same object will be in there twice
console.log(arr);
//[ { i: 1 }, { i: 0 }, [ { x: 2 }, { i: 0 } ] ] 
 
// so the _.flatten method can be used to flatten the nested array
b = _.flatten(b);
arr = _.union(a, b);
console.log(arr);
// [ { i: 1 }, { i: 0 }, { x: 2 } ]
```

## 3 - Vanilla javaScript set example

There is more than one way to get the same result as lodash union with native javaScript by itself, one way to do so is to use sets. A Set is a native constructor that allows for the creation of a set of unique values of any type. The trick though is that the add prototype method of the Set constructor will only take one value at a time as an array is a type that can be a value. So I would just need to find a way to add each element of each array if I am dealing with a bunch of arrays, and I want each element of these arrays to be treated as a potential unique value rather than the arrays themselves.


```js
let s = new Set(),
arr = [];
[[1, 2, 3], [6], [3, 2, 4, 1], [5, 4]].forEach(function (arr) {
    arr.forEach(function (n) {
        s.add(n);
    });
});
 
console.log(s);
// Set { 1, 2, 3, 6, 4, 5 }
```

## 4 - Conclusion

So that is it for now when it comes to the lodash union method, and vanilla javaScript alternatives to the lodash union method. I can not say that this is something that I end up using in actual projects just yet, but it does not hurt to play around with some of these methods now ans then, and also take a moment to look into how are it is to do the same thing with vanilla javaScritp by itself.
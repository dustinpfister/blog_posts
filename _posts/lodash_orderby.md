---
title: lodash orderby method as an option for sorting collections
date: 2020-01-05 11:00:00
tags: [lodash]
layout: post
categories: lodash
id: 588
updated: 2020-08-02 13:06:58
version: 1.10
---

The [lodash orderby](https://lodash.com/docs/4.17.15#orderBy) method is one of several options in lodash for sorting collections mainly arrays, but also objects in general because it is a collection method rather that just an array method. It works more or less the same way as the [lodash sortby](/2018/07/06/lodash_sortby/) method, but it allows for setting the sort orders \( ascending or descending \) of each method that is used to sort the collection object. 

However I often just make use of what there is to work with in just native javaScript by itself when it comes to sorting arrays and object keys in general. With that said there is also using just the plain old [sort array prototype method](/2019/12/02/js-array-sort/) when it comes to working  with arrays. So this will be a quick post on using the lodash order by method, as well as some vanilla javaScript alternatives.

<!-- more -->

## 1 - lodash orderby basic example

A Basic example of the lodash orderby method could just be passing an array of numbers as the first argument. That kind of example will work the same way as that as such a basic example using lodash sortby. 

The second argument is used to give method that are used for sorting, and the third argument is used to set the ascending and descending order of the sorting though. So with that said another basic example the would showcase the difference of orderby compared to sortby would by to set null as the second argument, and then the string 'desc' for descending rather than the default 'asc' or ascending order.

```js
let nums = [5, 42, -5, 7, 6, 3, 52, 27, 158, -1],
asc = _.orderBy(nums),
desc = _.orderBy(nums, null, 'desc');
 
console.log(asc, desc);
 
// [ -5, -1, 3, 5, 6, 7, 27, 42, 52, 158 ]
// [ 158, 52, 42, 27, 7, 6, 5, 3, -1, -5 ]
```

So then order by is just a more robust version of lodash sortby that allows for setting the ascending or descending order of the resulting sort of the collection.

## 2 - Using order by with a named key collection

So one thing about the order by method is that it is very much a collection method rather than just an array method. What this measn is that if I am dealing with an naked key collection rather than an array, I can still use the lodash order by method as a way to to create an array of sorted values.

```js
let obj = {
    b: 2,
    z: 26,
    a: 1,
    j: 10
};
 
let obj_sort = _.orderBy(obj);
console.log(obj_sort);
// [1, 2, 10, 26]
```

## 3 - Sorting with vanilla javaScript and the Array.sort prototype method

The native javaScript Array.sort prototype method works okay when it comes to sorting an array. However it works a little differently when it comes to writing a sort method for it. In addition another drawback is that it will sort the array in place, rather than act on a copy of that array.

So if I where to use array sort, and I do not want to mutate the original array, then I will want to do something to make a shallow or deep clone of the array first. If I have an array of primitives rather than objects then a way of making a shallow clone will work just fine. 

Once I have my copy of the array I can then work out how I would want to go about sorting that copy of an array with a sort method that will be passed as the first argument to the Array.sort prototype method. This method will have two elements to compare given as arguments, and the body of the method should use those arguments to return a delta value for the current index value of the first argument.

```js
let clone = (arr) => {
    return arr.map((n) => {
        return n
    });
};
 
let mkNumSort = (dec) => {
    dec = dec === undefined ? false : dec;
    return (a, b) => {
        if (a > b) {
            return dec ? -1 : 1;
        }
        if (a < b) {
            return dec ? 1 : -1;
        }
        return 0;
    }
};
 
let nums = [5, 42, -5, 7, 6, 3, 52, 27, 158, -1],
asc = clone(nums).sort(mkNumSort(false)),
desc = clone(nums).sort(mkNumSort(true));
 
console.log(asc, desc, nums);
 
// [ -5, -1, 3, 5, 6, 7, 27, 42, 52, 158 ]
// [ 158, 52, 42, 27, 7, 6, 5, 3, -1, -5 ]
// [5, 42, -5, 7, 6, 3, 52, 27, 158, -1]
```

## 4 - Conclusion

So the lodash order by method is another option on top of the lodash \_.sortBy method whe it comes to sorting object collections in general both with arrays, and objects in general. In native javaScript there is the array sort method that can also be used when it comes to not using lodash as part of a project any more.
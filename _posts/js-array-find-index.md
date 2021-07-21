---
title: Find the index values of arrays in javaScript
date: 2021-07-21 12:00:00
tags: [js]
layout: post
categories: js
id: 915
updated: 2021-07-21 12:44:54
version: 1.16
---

When it comes to finding the index value of one element in an [array in javaScript](/2018/12/10/js-array/) there is the [array find index method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex) that will work okay for this sort of thing. This find index array prototype method works more or less the same way as the [array find method](/2021/07/19/js-array-find/) only it will return an index value, rather than the value of the element. Whe it comes to user space options such as in the lodash library there are also methods like the [lodash find](/2017/09/14/lodash-find/) method that is a fairly robust way of finding something in an array, or an object in general actually.

Although the find index, and find methods might work okay in many situations there are some sort coming s with the method. For one thing the method will always return the first element from left to right rather than the other way around. Also there are some steps that should typically be taken before finding an element in an array such as sorting, and filtering the array. For the most part the find method might be a good choice when it comes to getting an element in an array that just has a single unique value, rather than situations in which I want a list of elements where the first element in the list would be a best match.

<!-- more -->


## 1 - Basic array find index method examples

In this section I will be starting out with just a few basic examples of the array find index method. The goal here is to just overview the very basics of suing this array find the index value of the first element from left to right. The basic process is simple enough I first just need to call the find index method off of the instance of the array, then I need to pass a test function as the first and only argument to the array find index method. In the body of this test method I need to define some javaScript code that will create a true or false value that will be the return value of the function. In the event that the return value is true then that will be the element index value is what will be returned by the array find index method.

### 1.1 - get the first number example

In this example I am using the javaScript type of operator to check the type of each element, in the event that the type is a number than the returned index value will be that element. So then this is a way to get the first index value in the array that is a number rather than any other kind of type.

```js
var a = [null, 'foo', 42, 'bar', false, 11];
// find index of first number from left
var index = a.findIndex(function (el) {
        return typeof el === 'number';
    });
console.log(index); // 2
console.log(a[index]); // 42
```

### 1.2 - array of objects

In this example I am now dealing with an array of objects, however the basic idea is still the same. I just call the find index method off of the array, and pass a test function. In the body of the test function I am then just accessing a standard property of each objects that should be there, and comparing it to a desired value.

```js
var people = [
    {name: 'John', grade: 'F'},
    {name: 'Beth', grade: 'C'},
    {name: 'Phil', grade: 'C'},
    {name: 'Gary', grade: 'A'},
    {name: 'Emme', grade: 'A'}
];
// get first A grade object
var firstA = people.findIndex(function (el) {
        return el.grade === 'A';
    });
console.log(firstA); // 3
console.log(people[firstA]); // { name: 'Gary', grade: 'A' }
```

## 2 - Some alternative ways of finding index values

The array find index method works okay, but it will not work great in all situations. If I am looking for just one element, and only one element, then maybe the array find index method will work okay. However often I might not just want one index value, but a collection of index values where the first index value is the best match, the second index value is the first runner up, and so forth. So then in this section I will be going over some additional javaScript examples that are also ways of going about finding an index value, but more than one value, and sorting those values. Than means making use of other javaScript features to create some kind of weight value for all elements, and then using the native [array sort](/2019/12/02/js-array-sort/) method to sort this array of values that contains weight values, along with an index value.

### 2.1 - Using array.map, and array.sort

In this example I once again have an array of objects where each object contains properties for a student at a school. This time though I have some additional properties such as the grade number rather than just a letter grade, and a string that is the subject that the student seems to show the most interest in over all others. So then say you would like to find a student that would be the best fit for work that has to do with a specific subject such as science. There is just going by the grades and that alone, but there is also taking into account if someone shows interest in science or not regardless of poor or great grades over all.

So then in this example I am using the array map method to create an array of objects from the source array of student objects. The array map method will create and return a new array, so node of this will change the state of the source array. Each object in this weight objects array will contain a weight value, and an index value for the student objects array.

```js
var people = [
    {name: 'John', grade: 'F', gradeNumber: 58, bestSub: 'pe'},
    {name: 'Beth', grade: 'C', gradeNumber: 72, bestSub: 'pe'},
    {name: 'Phil', grade: 'B', gradeNumber: 83, bestSub: 'science'},
    {name: 'Gary', grade: 'A', gradeNumber: 90, bestSub: 'art'},
    {name: 'Emme', grade: 'A', gradeNumber: 95, bestSub: 'social'}
];
// create weight objects
var weightObjects = people.map(function(obj, i){
    var weight = obj.gradeNumber;
    // 1.2x to weight if best subject is science
    if(obj.bestSub === 'science' || obj.bestSub === 'math'){
        weight = Math.floor(weight * 1.2);
    }
    return {
        weight: weight,
        index: i
    };
});
// sort weight objects array by weight
weightObjects.sort(function(a, b){
    if(a.weight > b.weight){
        return -1;
    }
    if(a.weight < b.weight){
        return 1;
    }
    return 0;
});
var index = weightObjects[0].index;
console.log(index); // 2
console.log(people[index]);
// { name: 'Phil', grade: 'B', gradeNumber: 83, bestSub: 'science' }
```

## 3 - Conclusion

So then the find index array prototype method will work okay if we are taking about finding just one element in an array. However in situations in which there may be more than one candidate for a search query of some kind then the method will fall short.

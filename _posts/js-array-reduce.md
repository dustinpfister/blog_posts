---
title: Array Reduce method in native javaScript
date: 2021-07-13 13:32:00
tags: [js]
layout: post
categories: js
id: 909
updated: 2021-12-04 20:51:58
version: 1.46
---

When it comes to the various [javaScript array](/2018/12/10/js-array/) prototype methods the [Array reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) method is one such method that will come in handy often. As the name suggests the main thing about he array reduce method is to reduce an array of elements down into a smaller array, or event a single primitive value. The way it works is by having a value in  the body of the function that is given to array reduce that is an accumulator variable which can have a starting value that is an array, number, string or any value that one would add to using data from the array elements. So then it is a good choice if I need to come up with some kind of sum of a whole bunch of values in an array of objects or something to that effect.

I have got around to writing a post on the [lodash reduce](/2018/07/25/lodash_reduce/) method when I was writing a little content on that library, but I find myself using lodash less and less these days. Still there are some talking points as to why the lodash reduce method is not just a user space method that does the same thjng as array reduce. For one thig the array reduce method is an array method while the lodash method is a so called collection method, which means that the method works with objects in general not just arrays. However when it comes to becoming very familiar with everything there is to work with in native javaScript alone it is not always so hard to do the same with array reduce the trick is just coming up with an array first, or figuring out how to get array reduce to work with something that is not an array.

So I think it is called for now to write at least one [post on the array reduce method](https://dmitripavlutin.com/javascript-array-reduce/) in native core javaScript, and touch base on all kinds of little subjects that might come up as I work out a few basic examples and beyond.

<!-- more -->


## 1 - The basics of array reduce in javaScript

So to start off with in this section I will be going over some very simple examples of the array reduce method. Understanding the basic idea of the method is maybe not as simple as what is going on with some other array prototype methods. If you find yourself in a situation in which you are getting a little frustrated with array reduce, it might be called for to take a breath, step back for a moment, and just work out a few simple examples of the method to get a better sense of what the core functionally of the array reduce method is.

### The source code examples in this post are on Github

I have a test repository that contains all the source code for my [various posts on javaScript](/categories/js), and [this post is no exception when it comes to this](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-array-reduce).

### 1.1 - Simple sum example

One typical use case of the array reduce method is to create some kind of sum with an array of numbers. TO do this I can just call the array reduce method off of the array of numbers and pass a single function that will be the so called reduce function. In the body of this reducer function I just need to return the sum of the accumulator argument that is the first argument with the current value which would be the second argument.

```js
let nums = [10, 5, 5, 4];
let sum = nums.reduce(function (acc, n) {
        return acc + n;
    });
console.log(sum); // 24
```

### 1.2 - An array of strings

If I have an array of strings I could use the array reduce method as a way to create a single string from the array of strings, but in many typical use case examples I might want to go with using the [array join](/2020/03/09/js-array-join/) method in place of doing so. That is that maybe there are some situations in which I would want to use reduce, but if I just want to have a fixed separator or not between each substring and that is it the array join method will work just fine.

```js
let strs = ['foo', 'man', 'chew'];
 
// so reduce can be used to join an array of strings
let reducer = (acc, str, i, arr) => {
    let term = i === arr.length - 1 ? '' : '-';
    return acc + str + term;
};
let s = strs.reduce(reducer, '');
console.log( s ); // 'foo-man-chew'
 
// however there is the array join method that can be used
console.log( strs.join('-') ); // 'foo-man-chew'
```

### 1.3 - An array of objects

There is also working with an array of objects, and wanting to create some kind of reduced value from one or more properties. For this example I am creating a sum from a certain value in each of the objects in an array. Just like with any other kind of element I just need to add to the accumulator.

```js
let objs = [
    { a: 5},
    { a: 2},
    { a: 3}
];
 
let reducer = (acc, n) => {
    return acc + n.a;
};
 
let n = objs.reduce(reducer, 0);
 
console.log(n);
```

Thus far all of these examples have involved creating a primitive value such as a number or a string from an array of values. However that does not have to be the case of course. the starting value by default actually is a new array with the first array being the first element of the array to which reduce is being called off of actually. So maybe at least one or more basic examples are needed in this section before I move on to some more advanced topics involving array reduce.

### 1.4 - Using array reduce to filter an array

When I think of reduce I often think in terms of creating some kind of single value in the form of a number, or a string from an array of values. However the end result can also very much be a new array, with a reduced number of elements, or many even more elements if I really wanted to actually depending of course on the logic of the function that I give to reduce oddly enough.

Of course the array reduce method can be used to create a new array with a reduced set of elements. The way I would do so would be to start off with an empty array, and just always return that staring array that would be the acc value in the body of the function. I then will push an element into the new array of it matches some kind of condition based on values of the source array. However whe it comes to tasks like this there are other tools in the tool belt that is the array prototype of core javaScript, oe such tool would be the [array filter](/2020/10/03/js-array-filter/) method.

```js
let objs = [{ a: 5, b:3},{},{ a: 2},{ a: 3, b: 0},{}];
 
// reduce can be used to filer like this
let a = objs.reduce((acc, el) => {
    if (el.a != undefined && el.b != undefined) {
        acc.push(el);
    }
    return acc;
}, []);
console.log(a); // [ { a: 5, b: 3 }, { a: 3, b: 0 } ]
 
// however there is also the array filter method that
// might prove to be a more appropriate choice
let b = objs.filter((el)=>{
    return el.a != undefined && el.b != undefined
});
console.log(b); // [ { a: 5, b: 3 }, { a: 3, b: 0 } ]
```

## 2 - Setting the start value for the accumulator

In this section I will be focus on the toping of setting a start value for the accumulator value or not. Be default if not starting value is given for the accumulator the first element in the array will be used for such a value,  as such the starting element index for the reducer will not be the first element, but the second one. As such this can case some problems if one does not know how to adjust for it. Typically type checking is used in the body of the reducer, or another way is to just set a starting value and then all the elements will be called with the reducer function.

### 2.1 - Setting an accumulator start value and not

In this example I worked out two simple examples of the array reduce method that do the same thing in two slightly different ways. One way is to not give a starting value for the accumulator value, which can present a problem when it comes to reducing an array of objects but I want the final result to be a number or string. One way to address this would be to use the [javaScript type of](/2019/02/15/js-javascript-typeof/) operator to check the type of the accumulator and set it to the desired value in that case. However another way would be to use the second argument of the array reduce method to set a starting value for the accumulator value.

```js
let objs = [
    { clicks: 15},
    { clicks: 10},
    { clicks: 25}
];
 
// one way is to do type checking
let a = objs.reduce(function (acc, rec) {
    acc = typeof acc === 'object' ? acc.clicks : acc;
    return acc + rec.clicks;
});
 
// the other way is to set a custom starting value for acc
let b = objs.reduce(function (acc, rec) {
    return acc + rec.clicks;
}, 0);
 
console.log(a); // 50
console.log(b); // 50
```

### 2.2 - index values

One again I am doing more or less the same thing as the first example here the only different is that I am logging the index value in the reducer functions. If I do not give a starting value then the starting index for the reducer function will be 1, because the element of index 0 is used as the starting value. As such it is typically a good index to give some kind of starting value for the array reduce method.

```js
let objs = [{
        clicks: 15
    }, {
        clicks: 10
    }, {
        clicks: 25
    }
];
 
let a = objs.reduce(function (acc, rec, index) {
        acc = typeof acc === 'object' ? acc.clicks : acc;
        console.log(index); // 1 2
        return acc + rec.clicks;
    });
 
let b = objs.reduce(function (acc, rec, index) {
        console.log(index); // 0 1 2
        return acc + rec.clicks;
    }, 0);
 
console.log(a); // 50
console.log(b); // 50
```

## 3 - The reducer function

There is then taking a closer look at the reducer function that is given when it comes to the full scope of arguments to work with in each call of the render function. The set of arguments will differ a little from other functions that are given to other array prototype methods like array for each and array map. Often the first argument is the current value of the current element, but with array reduce the first argument is the current value of the accumulator value. After that it is then the current element value, followed by the element index, and then a reference to the source array that array reduce is called off of.

```js
let reducer = (acc, el, index, array) => {
    console.log(acc, el, index, array);
    return acc + el;
};
 
let arr = [7, 8, 9, 10]
 
let n = arr.reduce(reducer, 0);
//0 7 0 [ 7, 8, 9, 10 ]
//7 8 1 [ 7, 8, 9, 10 ]
//15 9 2 [ 7, 8, 9, 10 ]
//24 10 3 [ 7, 8, 9, 10 ]
```

## 4 - Using The Array reduce method with any object like the lodash reduce collection method

One draw back of the reduce array prototype method is that it is an array prototype method so then it will only work with arrays, at least on its own anyway. Often I might be in a situation in which I will want to do some kind of array reduce like thing with an object in general or some other kind of value. In these situations I will need to just make use of various other core javaScript features to produce an array first that I can all the method off of, or one way or another get the object to work with the array reduce method even though it is not an array.

I mentioned earlier in this post that in the popular library lodash there is a reduce method that will work with objects in general. I also mentioned that one of the major deals about the reduce method in lodash is that it will work with objects in general, and not just arrays. However in this section I will be going over some vanilla javaScript solutions of doing the same thing that show that if you know a thing or two about where there is to work with when it comes to javaScript alone it is nit so hard to get reduce, and many other array prototype methods to work with just about any object.

### 4.1 - Using function call with Array like objects

When it comes to an array like object one option would be to use the call function prototype method. The call method of the function prototype is [one of several methods in the function prototype](/2017/09/21/js-call-apply-and-bind/) that can be used to set what the value of the [this keyword](/2017/04/14/js-this-keyword/) should be inside the body of a prototype function. So in the event that I am dealing with an object that is formated like and array, thin the call method can be used to just get the reduce method to work with it, even if it is an object that is not of the array prototype.

```js
// an 'array like' object that has
// properties key names like that of a
// javaScript Array
let obj = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
};
// The Call Function prototype method can be used with these kinds of objects
// to get the array reduce method to work with them
let sum = Array.prototype.reduce.call(obj, (acc, el) => {
    return acc + el;
}, 0);
console.log(sum); // 6
```

### 4.2 - Using the Array from method with Array like Objects

Another option when it comes to dealing with array like objects would be to use the [Array from](/2020/01/27/js-array-from/) method. This array from method is just simply a way to convert an array like object into an actual array rather than doing some kind of trick with function prototype methods. So I could just call Array from and pass the array like object to array from, and then just call reduce after that to get a desired result with an array like object.

```js
// an 'array like' object that has
// properties key names like that of a
// javaScript Array
let obj = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
};
// The Array.from method would be another option when it comes
// to creating an array from this kind of 'array like' object
let sum = Array.from(obj).reduce((acc, el) => {
    return acc + el;
}, 0);
console.log(sum); // 6
```

So then the array from method, as well as the function prototype methods are great tools when it comes to getting a array prototype method like reduce to work with a regular object. However one major draw back is that they only work well with objects that just happen to be structured just like arrays when it comes to the so called own properties of objects. Often I might be dealing with some kind of collection in the format of named rather than numbered keys, and I may not have a length property for the objects also. SO then lets looks at some more options when it comes to getting the array reduce method to work with objects in general.

### 4.3 - The Object values static method

The object values method is a static method of the Main Object global in core javaSscript that will return an array of values for each public key in a given object. So if I want to use reduce with the values of an object that has named keys rather than numbed ones, this would be one way to go about doing so. I can just call the Object values method and given the object to that method, the returned result is then an array of all the public values of that object, it is then this array that I would call reduce off of to get the final product.

```js
// An array with just public names keys
// with no length property.
let obj = {
    'foo': 1,
    'bar': 2,
    'baz': 3
};
// the Object.values static method can be used to create an array
// of values from an object like this. Then the reduce method can be used
// off of the returned array.
let sum = Object.values(obj).reduce((acc, el) => {
    return acc + el;
}, 0);
console.log(sum); // 6
```

### 4.4 - The Object keys static method

The [Object keys method](/2018/12/15/js-object-keys/) is just like Object values only it will give an array of key names rather than values. So then say that I am in a situation in where I want to do some kind of thing with array reduce, but with an object that has data that I want to involve in the reduction encoded into the key names, as well as with the corresponding values. I can use the Object keys state method to get an array of these keys of the object, and I can then use the [array map method](/2020/06/16/js-array-map/) to create a new array based off of this array that will then be an array of objects with the keys as well as the values. The reduce method can then be called oof of the resulting array that is the result of using the object keys static method as well as array map to producing the desired final result from data in the keys and values of a plain old object that looks nothing like an array.

```js
// An array with info I want to reduce
// with encoded into the key names, but
// I also need to work with the values
let obj = {
    'foo_1': true,
    'bar_2': true,
    'chw_7': false,
    'baz_3': true
};
// The Object.keys method can be used to create an
// array of key names from the object. I can then use
// the array map method to create a new array based off
// of this array of key names that is composed of objects.
// each object in this array contains a key and value prop
// I can then use the reduce method off of that array to
// produce the final desired product
let sum = Object.keys(obj).map((key) => {
    return {
        key: key,
        value: obj[key]
    };
}).reduce((acc, el) => {
    if (el.value) {
        acc += parseInt(el.key.split('_')[1]);
    }
    return acc;
}, 0);
console.log(sum); // 6
```

### 4.5 - A string of numbers and the String split method

When it comes to strings a useful method is the [split string prototype method](/2021/07/14/js-string-split/) that is one method that comes to mind right away when I thing of ways to create an array from a string. This split method can just be called off of a string, and then a string values that is used to split the string into sub strings can be given as an argument. If an empty string is given to the string split that will result in each letter being its own element in the resulting array. This can then be used as a way to call reduce for each letter in the source sting then.

```js
// a string of numbers
let str = '123';
// The string split method can be used with an empty string
// I will then want to use parseInt or some method of 
// converting the string values to numbers
let sum = str.split('').reduce((acc, el) => {
    return acc + parseInt(el);
}, 0);
console.log(sum);
```

## 5 - Using array reduce for filtering

Array reduce can be used to set an starting value for an accumulator, and that accumulator value can be an array. It is then possible to push just the elements that I just want from a source array into this accumulator array. So then it is possibe to use the array reduce method to filter a source array of elements that I do not want

### 5.1 - Array reduce and array filter

```js
let a = [1, 'a', 2, 'b', 3];
// so yes reduce can be used for filtering
let c = a.reduce((acc, el) => {
        if (typeof el === 'number') {
            acc.push(el)
        }
        return acc;
    }, []);
console.log(c);  // [1, 2, 3]
// but why not just use filter
let b = a.filter((el) => {
        return typeof el === 'number';
    });
console.log(b); // [1, 2, 3]
```

## 6 - Some use case examples of array reduce

So now that I got all of the basics out of the way, as well as some not so basic aspects of the array reduce method on top of that it is now time to start looking into at least a few simple use case examples of the array reduce method. That is not just some silly use case examples for the purpose of showing how to use the method, but some examples that are a kind of software product, or at least something that might be used in such a product failing that I would say.

### 6.1 - create a mean of average if you prefer from an array of numbers

One thing that comes to mind right away is to create a mean from an array of numbers. There is more than one kind of mean actually when it comes to rally getting into math. However most people would thing of a mean as just simply the sum of all the numbers dived by the number of numbers. This kind of mean is often refereed to as an arithmetic mean.

```js
let getArthMean = (nums) => {
    return nums.reduce((acc, n) => {
        return acc + n;
    }, 0) / nums.length;
};
let nums = [10, 5, 7, 10, 10, 8];
console.log(getArthMean(nums).toFixed(2)); // '8.33'
```

### 6.2 - Add up array of object props helper

Often I might want to create a sum from a single property of a standard object to which I have an array of. That is that I often am working with some kind of object pool, or collection of objects, and each object in this collection has one or more properties for something. Say I want to have a simple helper method that will just add up add the numbers for a given property such as money.

```js
let sumObjects = (objs, prop) => {
    prop = prop === undefined ? 'clicks' : prop;
    return objs.reduce(function (acc, rec) {
        acc = typeof acc === 'object' ? acc[prop] : acc;
        return acc + rec[prop];
    });
};
 
let objs = [
    { clicks: 15, money: 0.75 },
    { clicks: 10, money: 1.50 },
    { clicks: 25, money: 3.35 }
];
 
console.log(sumObjects(objs));          // 24
console.log(sumObjects(objs, 'money')); // 5.6
```

## 7 - Conclusion

So then the array reduce method is great for many little situations in which I might want to create a single simple value from an array of values. However there is a great number of other array prototype methods that also come into play, such as the [array for each method](/2019/02/16/js-javascript-foreach/) that is just a more generic way of just looping over all the elements of an array for example. There is also the subject of sorting array elements that cokes up often and with that there is the built in [array sort prototype](/2019/12/02/js-array-sort/) method that would be the first and for most way to do so when it comes to core javaScript at least.

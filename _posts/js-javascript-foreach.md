---
title: JavaScript forEach with array methods, while loops, and objects in general
date: 2019-02-16 10:39:00
tags: [js]
layout: post
categories: js
id: 384
updated: 2021-07-12 16:24:39
version: 1.65
---

In javaScript there is the [Array.prototype.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) method that is often used as a quick way to go about looping over the contents of an array. However there are other Array prototype methods that work in a similar way, but might be a better choice depending on what you want to do with an Arrays contents. Some such methods are the [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) method that can be used to create a new array where each element is the result of some kind of action preformed for each element in the source array that it is called off of. Another array prototype method that comes to mind that I find myself using often would be the [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) method that will, as the same suggests, filter out any elements that are not wanted in the array given a certain condition that is given in the body of a method. Like Array ma this method will also create and return a new array, and not mutate the array in place.

So the Array.forEach method is not the end all solution in javaScript for looping over an array, in addition to other prototype methods there are also plain old loops like while loops, and for loops that can also be used as a way to loop over all the contents of an array. In addition loops provide a greater degree of control and flexibility of methods like Array.forEach. Loops can be used with keywords like continue and break, and the conditions for starting stopping, and stepping can be changed. In addition to greater flexibility in some cases they can also prove to be a a tad faster when working with large arrays because of the possibility to reduce the volume of function calls. For these reasons I often find myself using loops over the array forEach method, and often over many other prototype methods for that matter, but I would not necessary say that loops are the end all solution for looping over the contents of an array.

Then there are other objects in javaScript that are structured like arrays, but are not arrays, and thus are often referred to as array like objects. In addition there are just simply objects in general, that might have numbered index keys like with arrays, but will often have named keys with no length property. So to help loop over these kinds of objects there are Object static methods like the Object.keys method, that can be used to create an array of key values that can then be used as a way to loop over the contents of any objects public keys. Another option would be a for in loop that can be used as ways to help loop over the public contents of Objects in general in javaScript.

So with all that said just when it comes to native javaScript alone there is a wealth of options when it comes to looping over the contents of an array, or object in general. However there is then getting into user space utility libraries and frameworks also on top of what is to work with in core javaScript alone. As of this writing lodash is still the most popular general utility library of sorts with javaScript, and the [\_.forEach method](/2017/11/20/lodash_foreach/) works more or less the same way as the native Array.prototype.forEach method. However the lodash foreach has some additional features, and is a little more robust of a solution for looping over not just arrays, but objects in general in javaScript. The lodash foreach method is what is called a collection method in lodash, in other words it is a method that will work on objects in general. Another feature of the lodash forEach method is that is also can be broken out of just like with loops by making use of the return keyword in the body of the method that is given to the lodash forEach method. 

So there are native methods, utility library methods that are in popular frameworks like lodash, and then there is the idea of making my own, application specific custom solutions for a project. That is using any or all of these solutions to make some kind of method or module that loops over the contents of a given array, or collection of any kind, but provides an API to be provided in the body of a function that is called for each element in the collection. So then this way I create my own custom forEach method of sorts that has everything that I want to work with in the body of the function that is called for each item via a function argument, or the this keyword. Such For each methods can be designed to work just the way I want them to, without any unnecessary bloat.

That was a mouth full, so it goes without saying that there is a whole lot to cover when it comes to this topic. So this post will be a bit lengthy, and I will be sticking mainly to topics surrounding the native forEach array prototype method. It will not just be on the array foreach method alone of course, but all kinds of ways to do javaScript foreach like tasks with everything that is available to work with more or less. So I will be branching off into other related topics to array foreach when it comes to user space options and other options with just plain old native javaScript by itself.

<!-- more -->

## 1 - javaScript forEach and what to know before hand

The Array.forEach method in native javaScript is one of many ways to loop over the contents of a collection in javaScript. However Array.forEach is only generally useful for looping over the contents of an Array, unless some trickery with function call method is used with array like objects, or some processing is done before hand. However even it you can get it to work to loop over the contents of a collection it might not still always be the best solution when it comes to looping over named collections. 

Also simply put it might not always be the best choice for the job when it comes to looping over the contents of an array. There is not golden hammer as it where when it cones to looping over things. I tend to prefer the use of while loops, I have my reasons why that is, but I am not going to suggest that everyone should stop using array foreach and just use while loops and only while loops all the time everywhere and anywhere.

In any case there are many options when it comes to looping over collections that involve the use of a library like lodash, as well as other native javaScript solutions such as while loops. Some might be more readable, but performance takes a hit, others might be more flexible, but again performance takes a hit. While loops might be fast, but can be even faster depending on how and where they are used. Also regardless of how well coded some javaScript might be with regards to performance the real bottom line in my view is what an over all project does and if it is of any value to people regardless if it is well coded or poorly coded.

### 1.2 - ECMA rev5 compliant methods and Array forEach backward support

As time goes by it is becoming less, and less of an issue to worry about code breaking on clients when delivering modern javaScript exclusively when working out some kind of client system. Still depending on your websites analytics with browser versions, it might still be better to stick to a tired yet true way of doing things with client side javaScript.

Sticking to an older javaScript spec will help to assure that what it is that you are making will work on a larger range of clients. The javaScript array foreach method is an ECMA rev5 spec javaScript feature, so using it without any polyfill of sorts is fairly safe these days. However if for some reason you do want to push backward support back even farther there are of course other options that are yet even older and safer. Again I do tend to like sticking to while loops, but not just for this reason, more on why that is later.

In any case taking a moment to understand browser support for a native, or user space option for looping over the contents of a collection is an essential part of making smart informed decisions with the use of javascript array foreach and in general. The array for each method is a good choice in this regard, however a while loop would of course be an even better option because support for that of course goes back even farther.


### 1.2 - A Basic javaScripts forEach array prototype method example

So a basic example of Array.forEach might just involve using it to loop over the contents of an array of numbers, and add up the numbers in the array to a variable that will serve as a sum of those numbers. So such an example might look something like this then.

```js
var arr = [1, 2, 3],
sum = 0;
arr.forEach(function(n){
    sum += n;
});
console.log(sum); // 6
```

Although this might work just fine with such a trivial task, there are many other ways to go about doing a simple sum of numbers in an array. The array reduce method might prove to be a more appropriate way of going about adding up a sum actually for example. There are of course more options to work with in the array prototype other than just the array for each method after all.

Also In real projects what might need to happen for each element in an array might end up being far more complex than just adding up each number in the array. There might come a time where I might not want to start at index 0 each time, or I might want to do something with each array index and so forth. Once again these are reasons while I tend to prefer while loops, however I do fine myself using these convenience methods now and then. 

So lets look as some more basic examples that make use of other array prototype methods that work in a similar way to that of the array for each prototype method. After this section we can start to look at loops, and custom user space options for specific tasks when it comes to making custom for each style methods.

### 1.3 - Using the element values, index values, and array reference by way of the arguments

On top of the first argument of the function that is called for each element being a reference to the current element value, the second argument will be the index value of the current element also. In addition the third argument will be a reference to the array in which for each is being called off of. Many other similar Array prototype methods follow this pattern where the first argument is the current element of the array, and the second argument is the index value of that element.

```js

let values = [100, 20, 50, 75],
min = Math.min.apply(null, values),
max = Math.max.apply(null, values),
points = [];
 
values.forEach((num, i, val) => {
    points.push({
        x: 320 / val.length * i,
        y: (num - min) / (max - min) * 240
    });
});
 
console.log(points);
// [ { x: 0, y: 240 },
//   { x: 80, y: 0 },
//   { x: 160, y: 90 },
//   { x: 240, y: 165 } ]
```

## 2 - Other similar array prototype methods to javaScript forEach

So there is the Array forEach method, but there are other array prototype methods like map, filter and reduce. The javaScript array forEach prototype method is very generic, some of these other options might be better choices when it comes to the nature of what it is that you need to do when looping over the full contents of an array. In this section I will be starting out with a basic array forEach example, but from there progress into these other array prototype methods of interest.

### 2.2 - Array.reduce method for reducing contents of an array into a product, sum, or other result.

When it comes to doing anything that might involve a sum of any kind, it might be better to use Array.reduce in place of Array.forEach. 


```js
let arr = [1, 2, 3],
sum = arr.reduce((s,r)=>{return s+r;});
console.log(sum); // 6

```

This is one of many other Array prototype methods that work in a very similar way to that of Array.forEach, but behave a little differently. For one thing the Array.reduce method does not start looping at index 0, but rather index 1. the reason why is that the first element at index 0 is the initial value of an accumulator argument that is the first argument that is given to the function that is passed to Array.reduce. So in this example the value of s starts out as 1 and the value of r is 2, then on the next call the value of s is 3 and the value of r is 3 making the final value that is reduced to 6;

### 2.3 - Array.map for creating a new array where each element is based off of values from another

Another way to loop over elements in an array is to use the [Array.map method](/2020/06/16/js-array-map/) which will also come up a lot in come examples. This method works more or less the same way as Array.forEach but with one significant difference. That difference is that whatever is returned in the method that is given as an argument this time will become that element in the array. Actually the new element will be in a new copy of the array that can then be reassigned to the array or not. So in a way the array map method is in line with functional programing in the sense that the array that that the prototype method is called off is not mutated in place.

```js
var arr = [1, 2, 3],
sum = 0;
 
arr = arr.map((n)=>{sum+=n;return Math.pow(2,n);});
 
console.log(sum); // 6
console.log(arr); // [2,4,8]
```

### 2.4 - Array filter for creating a new array that is only a few elements from another that meet a given condition.

Yet another alternative array prototype method to the foreach method might be the [filter method](/2020/10/03/js-array-filter/). As the name would suggest this can be used to filter out elements from an array that are not wanted. Also like that of the array map method this will create and return a new array rather than mutating an array in place.

```js
let arr = [7, 'foo', 13, 'bar', false, -15, null, NaN, 120, 20];
 
arr = arr.filter((el) => {
        return typeof el === 'number' && String(el) != 'NaN' && el >= 0 && el <= 100;
    });
 
console.log(arr);
// [ 7, 13, 20 ]
```

### 2.5 - Array some for finding out if one or more elements in an array meet a condition

There are also methods like array some, and array every that can be used to create and return a boolean value for an array depending on the condition returned in the method given. Say you want to test if just one element in an array meets a given condition for that there is the array some method. In addition there is the array every method that will return true if all elements in the array meet a given condition.

```js
var a = [1, 2, '3', 4],
b = [1, 2, 3, 4];
 
var test = function (el) {
    return typeof el === 'string';
};
 
console.log(a.some(test)); // true
console.log(b.some(test)); // false
```

### 2.6 - The Array every method to find out if all elements in an array meet a given condition

On top of the array some method there is also the [array every](/2021/07/12/js-array-every/) method that can also be used to create a boolen value from the array that it is called off of with a method that will be used for each element in the array. Unlike the array some method this will only result in a true boolen value of all of the elements in the array meet the given condition that will be called for each element in the array.

```js
let arr = [1, 2, 3, 4]
 
let b = arr.every((el) => {
        return typeof el === 'number';
    });
 
console.log(b); // true
```

## 3 - While loops as a javaScript for each or for some solution.

Another way to loop over all the contents of an array in javaScript would be to use a while loop. While loops have many advantages compared to the array forEach method or any other such method like array map. For example different expressions can be used to step an index variable that is used to get an element in an array. So then I can just loop over every other element in an array rather than all of them if I want. In addition keywords such as break and continue can be used to skip things completely which can come in handy how and then. Another thing about loops is that I am not defining logic in a method so I can use the return keyword in the body of the logic in the while loop if it is in the body of a function. Yet another advantage is that while loops can often prove to be a little faster then array for each when it comes to benchmark testing.

### 3.1 - The basic while loop example

So the a basic example of a while loop could just be using an index variable that is set at zero for starters. Then I check if the index variable is greater than the length of the array as the condition for the while loop. Inside the body of the while loop I will want to step the index variable or else I will end up with an infinite loop. I can then use the bracket syntax inside the body of the while loop to get the current element of the array by using the index value as the value to use with the bracket syntax of the array.

```js
var arr = [1, 2, 3],
sum = 0,
i = 0,
len = arr.length;
 
while (i < len) {
    sum += arr[i];
    i += 1;
}
console.log(sum); // 6
```

Simple enough right, but lets look at some more examples of while loops in action as a way to preform javaScript for each like tasks on arrays and objects in general.

### 3.2 - Looping backwards from the end of an array

There is of course more than one way to skin a cat when it comes to while loops, and loops in general. What is great about loops is that I have control over the conditions for how to go about breaking the loop, how to go about stepping an index value, and also how to start looping in the first place. For example I can just start off the index variable at the end of an array, and loop backwards. Also because the number zero evaluates to false I can also have the index variable double as a way to break the loop.

```js
var arr = [1, 2, 3],
sum = 0,
i = arr.length;
while (i--) {
    sum += arr[i];
}
console.log(sum); // 6
```

### 3.3 - Start and end index values

Another major advantage of using loops like while loops over array forEach is that I can set the starting condition, and ending condition in terms of the array index value. I can if I want start looping at an index value greater than zero, and end before I get to the end of the array for example.

```js
let a = [0, 1, 2, null, 3, 4, 5, 6, 7, null, 8, 9],
b = [];
 
let i = a.findIndex((n) => {
        return n === null;
    }),
n = a[i + 1];
while (n != null) {
    b.push(n);
    i += 1;
    n = a[i + 1];
}
 
console.log(b); // [3,4,5,6,7]
```

There is of course also the array slice method that can also be used to get a new array that is a range of another array. However I would need to know both the starting and ending index values. With a while loop I can make coming across some kind of value a way to stop looping.

### 3.4 - nested loops and the return keyword

There is also of course using the [return keyword](/2019/03/01/js-javascript-return/) in the body of a function that will be used to return something, and the fact that when using the array forEach method I am working inside the body of a function. So when doing something that involves nesting loops, or even just using one loop I can not just use the return keyword in the body of a method that is passed to array for each.

However with while loops I can place that return keyword anywhere in a single while loop, or even one or more nested while loops, and the return keyword will break out of the whole situation with looping and given me what it is that I wanted returned.

```js
let findInGrid = (grid, condition) => {
    var y = 0;
    while (y < grid.h) {
        var x = 0;
        while (x < grid.w) {
            var i = y * grid.h + x;
            if (condition(grid.cells[i], i, grid)) {
                return grid.cells[i];
            }
            x += 1;
        }
        y += 1;
    }
};
 
let grid = {
    w: 4,
    h: 3,
    cells: [0, 0, 0, 0, 0, null, 0, 0, 0, 0, 0, 0]
};
 
var a = findInGrid(grid, (n) => {
        return n != 0;
    });
 
console.log(a); // null
```

In addition to the return keyword there is also the break keyword that can be used even when working out a loop that is top level code outside of a function that can be used as yet another way to accomplish a similar result that can not be done with array forEach.

## 4 - Array like objects, the Function call prototype method, and array for each.

So in javaScript Arrays are a kind of object that is formated in a way in which there are numbered key values with corresponding values. In addition to this there is a length property that reflects the number of these key value pairs, and there are a number of useful methods accessible via the Array prototype object. So an Array is not just an Object, it is an Object that is formated a certain way and is an instance of the Array constructor.

However often in javaScirpt I come across Objects that are formatted like an Array, but they are an instance of another kind of constructor. these kinds of objects have key value pairs where each key name is a number rather than a named key, and there is a length property that reflects the number of these key value pairs. Sometimes the values of these objects might be read only, but even then it is possible to get a method like Array.froEach to work with these it just requires some trickery with Function.call, or Array.from.

An Example of an Array like object might look like this

```js
var obj = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
};
// so this is just a plain object so it does not
// have the Array.prototype methods
console.log(obj.constructor.name); // 'Object'
console.log(obj.forEach); // undefined
```

So in this section I will be outlining some ways to loop over these kinds of objects.

The Array.from method is one way to go about converting one of these array like objects into an Array. Once that is done it is possible to use some Array prototype methods such as Array.forEach

### 4.1 - Array.from, and Array.forEach

The array from method is one way to go about creating an array from an array like object. I just pass the object to array from when calling it, the returned result is an instance of array to which I can then use the array for each method, or any array prototype method.

```js
var obj = {0:1, 1:2, 2:3, length: 3};
 
// Using Array.from can help change an array like
// object into an array
var arr = Array.from(obj);
console.log(arr.constructor.name); // 'Array'
 
// Now we have the methods
var sum = 0;
arr.forEach((n)=>{ sum += n; });
console.log(sum); // 6
```

### 4.2 - Function.call, and Array.forEach

Another trick is to leverage the power of Function.call. If you are not familiar with Function.call, Function.apply, and Function.bind it would be a good idea to look into them at some point. If any kind of object has properties that will work with a prototype method of another it can be done with these Function prototype methods.

```js
var obj = {0: 1,1: 2,2: 3,length: 3},
sum = 0;
Array.prototype.forEach.call(obj, (n) => {
    sum += n;
});
console.log(sum); // 6
```

## 5 - Named key Collections

Some times I am dealing with an object that is not an instance of an Array but it is a named collection of sorts. In these situations I need to loop over the contents of a collection of named keys and corresponding values rather than numbered ones.

### 5.1 - Object.values

The Object values method is one way to loop over the contents of an object in general. Assuming that all the key names that I want to loop over are public, and I do not care about anything that might be in the prototype chain.

```js
let obj = {
    foo: 1,
    bar: 2,
    foobar: 3
},
sum = 0;
Object.values(obj).forEach((n) => {
    sum += n;
});
console.log(sum); // 6
```

### 5.2 - Object.keys

So on top of the Object values method there is also the Object.keys static method also. This method works the same way as Object values only it returns an array of key names rather than the values of the keys. In any case this can be used to quickly create an array from a plain old object and then of course array prototype methods can be used with that resulting array, and not just array forEach.

```js
let obj = {
    foo: 1,
    man: 2,
    chew: 3
};
 
let str = Object.keys(obj).map((key) => {
        return key + obj[key];
    }).join('-');
 
console.log(str); // 'foo1-man2-chew3'
 
```

## 6 - Conclusion

The javaScript foreach method might work okay for quickly looping over an array, and it some cases it still works okay. Still I often find myself using other array methods, while loops, Promise.all, and many other similar tools. There is also trying to think for a moment if I even need a loop at all when it comes to using an expression rather than a loop when doing so will work.

It is true that the javaScript foreach method is not a magical one stop solution for looping over all the contents of an array. I see many developers writing posts in which they go on about how array foreach is the best solution for looping, and that everything else should not be used. I also often see chatter that while loops should always be used over for loops, and foreach because if used a certain way they are much faster. I am not interested in taking sides when it comes to these kinds of things, I like using array foreach now and then, but I also use map, filter, reduce, while loops and much more. 

Simply put I like to use different tools for the job, and also try to always pick the best choice depending on the situation. There is readability which I would say is of value, but of course the same is to be said  about performance. There is functional programing which is great, but there is also working with classes, state, and other ways of programing that are not necessary inherently inferior. There is trying to be perfect, and then there is just getting together a working proof of concept today rather than six months from now. So just pick a way to loop, and move on with your project, and your life.
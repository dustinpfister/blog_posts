---
title: js array to string and converting an array to a string in general
date: 2021-07-22 10:19:00
tags: [js]
layout: post
categories: js
id: 916
updated: 2021-11-27 12:24:57
version: 1.38
---

I have wrote a [post on the subject of the to string method of an object in general](/2020/07/14/js-to-string/) before, however in todays post I think I will take a moment to write about this subject when it comes to [arrays alone](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString). The to string method of an array will work okay when it comes to an array of primitives, however it will often fall short of expectations when it comes to an array of objects. When it comes to converting a complex array of objects into a string format it is often called for to create a custom helper function, or class prototype method to do so. It is also possible to create a custom to string method for an array, and when making a custom class that makes use of an array it is general a good idea to have a to string method as part of the prototype object.

<!-- more -->

## 1 - Basic examples of the array to string method

In this section I will be starting out with just some basic examples of the array to string method, but will progress into the subject of what to be aware of when it comes to using the to string method in general. You see the to string method is not just simply an array prototype method, there is also a to string method in the mother of all prototypes in the main Object prototype. In other words the to string method is a kind of standard method that should always be there for any kind of object in javaScript. The to string method can be called directly, but it is also called in expressions when an object value needs to be converted to a string value primitive.

I will be doing my best to keep these examples fairly simple, but I still assume that you have at least a little experience working with javaScript thus far. If not you are going to want to take a step back and start out with some kind of [getting started with javaScript type post](/2018/11/27/js-getting-started/) first as this might still prove to be a little to advanced for now.

### Source code is on Github

The [source code examples in this post can be found on Github](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-array-to-string) along with the source code for my many [other posts on javaScript](/categories/js). There is making a pull request on Github if there is something wrong with a given source code examples, there is also the comments seciton at the bottom of this post that can be used as a way to bring up a problem.

### 1.1 - An Array of primitives

If I am dealing with a simple array of primitives and I want a string value of the array I can often just call the to string method. The default to string method of the array prototype will often give me what I want when it comes to this, however often I might still want to use an alternative method to create a string value from an array.

```js
var a = [1, 2, 3, 4];
// there is calling to string directory
console.log(a.toString()); // '1,2,3,4'
// the to string method will be called when an
// operation is preformed that will result in a need
// to covert to an array a string
console.log(a + ''); // '1,2,3,4'
```

However the need thing to be aware of with the to string method of the array prototype, and with the to string method in general is that it will be called in javaScript expressions. That is when I work out any kind of expression that involves an object in the expression and that object needs to be converted to a string, the to string method is what will be called to create that string value.

### 1.2 - An Array of Objects

When I am dealing with an array of objects this is often when the to string method will fall short, or at least the default to string method of the array prototype object at least. The main reason why is because I will end up with the string object Object for each object in the resulting string. This will just abut never be the kind of result that I will want when it comes to creating a string from an array of objects. So then I will need to do something else other than use the to string method, or create a custom to string method for the object, or the prototype of the object that I am using.

```js
var a = [
    {x: 42, y: 12},
    {x: 0, y: 0},
    {x: 12, y: 35}
];
console.log( a.toString() );
// [object Object],[object Object],[object Object]
```

### 1.3 - Using array map first to work with an Array of Objects

One way to address the problem that I run into with the to string method is to just use a method like [array map](/2020/06/16/js-array-map/) to create a custom array or privative values first. I can then just call the to string method of off the instance of the new array that is created from array map.

```js
var a = [
    {x: 42, y: 12},
    {x: 0, y: 0},
    {x: 12, y: 35}
];
// creating a new array b from a
var b = a.map(function(obj){
    return '{x:'+ obj.x + ',y:' + obj.y + '}';
});
// and then calling toString off of b
console.log( b.toString() );
// {x:42,y:12},{x:0,y:0},{x:12,y:35}
```

### 1.4 - Creating a custom to string method

Another option would be to create a custom to string method. When doing this it is possible to monkey patch the array prototype with a custom array prototype, but generally that would not be a good idea, as it would effect this functionally everywhere in a page. However one thing that can be done is to create an own property of a single array instance without mutating the state of the prototype object of the Array class.

```js
var a = [
    {x: 42, y: 12},
    {x: 0, y: 0},
    {x: 12, y: 35}
];
// creating a custom toString method for the array
a.toString = function(){
    return this.map(function(obj){
        return '{x:'+ obj.x + ',y:' + obj.y + '}';
    }).join(',');
};
// calling toString will now work the way I want it to
console.log( a.toString() );
// {x:42,y:12},{x:0,y:0},{x:12,y:35}
```

### 1.5 - Creating a Class

When it comes to making my own class that is separate from the array prototype I can of course create my own to string method for this new class of object, without worry about touching any built in prototype. Having a to string method is generally a good idea when it comes to creating any kind of class object, as it allows be th create whatever the standard string format of my custom class of object should be. While I am at it I should also make sure to create a value of method for the class also and use that to define what a number value should be for the class of object.

```js
// a constructor function to create a class of an object
var Stack = function (a) {
    this.a = a || [];
};
// the to string method is used to define what a string value should be for
// this class of an object
Stack.prototype.toString = function () {
    return this.a.map(function (el) {
        // if el is a number
        if (typeof el === 'number') {
            return String(el);
        }
        // if object
        if (typeof el === 'object' && el != null) {
            return Object.keys(el).map(function (key) {
                return key + ':' + el[key];
            }).join(',');
        }
        // string null for null
        if (el === null) {
            return 'null';
        }
        // string of undefined for undefined
        if (el === undefined) {
            return 'undefined';
        }
        // default to just calling whatever the toString method is
        return el.toString();
    }).join(',');
};
// value of is used to define what a number value should be for this
// class of object
Stack.prototype.valueOf = function () {
    return this.a.reduce(function (acc, el) {
        if (typeof el === 'number') {
            return acc += el;
        }
        if (typeof el === 'object' && el != null) {
            return acc += Object.values(el).reduce(function (acc, el) {
                return typeof el === 'number' ? acc += el : acc;
                acc;
            }, 0);
        }
        return acc;
    }, 0);
};
 
var s = new Stack([null, undefined, 1, [1, 1], {x: 3}]);
console.log(s.toString());
//null,undefined,1,0:1,1:1,x:3
console.log(s.valueOf());
// 6
```

## 2 - The array join method, and many other array prototype methods for creating a string from an array

The to string method of an array might not always be the best option for creating a string from an array. Another major option for this sort of thing would be the [join method of the array prototype](/2020/03/09/js-array-join/). This method works by just calling the method off of an instance of an array, and by default it works just like the to string method of the array prototype. However there is one additional argument that can be given to the array join method that can be used to change what the separator character should be between elements when creating a string.

However there is not just the join method of the array prototype but many other [useful methods in the array prototype](/2018/12/10/js-array/) as well as other prototypes such a the String prototype that can be used to help with the process of creating string from arrays. So in this example I will be going over a few examples of the array join method, but I will also be going over a few of the other array prototype methods that I might call first before ending with the join method.

### 2.1 - Basic array join method example

To start out with the array join method there is once again just quickly calling the method alone with say a simple array of numbers. When this is the case the result is the same as the built in to string method, at least when the join method is not given any argument at least. The first argument of the array join method can be used to set what it is that should be between each element when creating a string. By default this value is a comma, but I can give a space, dash, or an empty string in the event that I want there to be noting between each element in the string that is returned by the array join method.

```js
var a = [1, 2, 3, 4];
console.log(a.toString()); // '1,2,3,4'
console.log(a.join());     // '1,2,3,4'
console.log(a.join(' '));  // '1 2 3 4'
console.log(a.join(''));   // '1234'
```

### 2.2 - Joining a collection of objects into a string

A problem similar to that of just using a built in to string method will also come up when it comes to creating a string from an array of objects. The thing about this though is that I almost never just use the array join method by itself, there are many other useful methods in the array prototype after all. For example I can use the array map method to create a new array of strings rather than objects where each substring is formated the way I want an object to be represent first. AFter that I can then call the array join method off of the new array that is returned by the array map method.

```js
var a = [
    {x: 42, y: 12},
    {x: 0, y: 0},
    {x: 12, y: 35}
];
 
// using join alone will run into the same problem with toString
console.log(a.toString()); // '[object Object],[object Object],[object Object]'
console.log(a.join());     // '[object Object],[object Object],[object Object]'
 
// But join is often used in conjunction with other array methods 
// like map to help address this
var str = a.map(function(el){
    return '(' + el.x + ', ' + el.y + ') ';
}).join('');
console.log(str); // '(42, 12) (0, 0) (12, 35)'
```

### 2.3 - The filter method

I might want to do more then just create a new array of sub string values from an an array using map before converting to a string. For example I might want to filter out a while bunch of elements in an array that I will not want in the final string first. One way to go about doing this would be to use the [array filter](/2020/10/03/js-array-filter/) method first. this filter method like the map method will create and return a new array rather than mutating one in place like some other methods in the array prototype. However one major difference with filter compared to map is that the aim is not to just cerate a new array with the same length, but a lower length that is only the elements that I want from a source array. After I call filter off of a source array, I can then use the map, and join methods to create my final string value that I want.

```js
var a = [
    false,
    null,
    {x: 2, y: 5},
    'foo',
    42,
    {},
    {x:5, y: 20}
];
// using filter, map, and join
var str = a.filter(function(el){
    if(typeof el === 'object' && el != null){
        return el.x != undefined && el.y != undefined;
    }
    return false;
}).map(function(el){
    return el.x + ',' + el.y + ';'
}).join('');
 
console.log(str); // 2,5;5,20;
```

### 2.4 - The sort method

Yet another thing that I might want to do with an array is to sort a collection of elements, in the array prototype there is the [array sort](/2019/12/02/js-array-sort/) method that can be done to sort array elements by some kind of property, or any kind of conditions defined in a sort method. For example say that I once again have a source array with mixed values some of which do not apply for what I want, so they must be filtered out. Then the objects that remain have a money value to which I wan to sort by for each object.

```js
var a = [
    {x: 18, y: 75, money: 0},
    false,
    null,
    {x: 2, y: 5, money: 45},
    {x: 0, y: 0, money: 37},
    'foo',
    42,
    {},
    {x:5, y: 20, money: 100}
];
// using filter, sort, map, and join
var str = a.filter(function(el){
    if(typeof el === 'object' && el != null){
        return el.x != undefined && el.y != undefined;
    }
    return false;
}).sort(function(a, b){
    if(a.money > b.money){
        return -1;
    }
    if(a.money < b.money){
        return 1;
    }
    return 0;
}).map(function(el){
    return '$' + el.money + '(' + el.x + ',' + el.y + ');'
}).join('');
 
console.log(str); // $100(5,20);$45(2,5);$37(0,0);$0(18,75);
```

### 2.5 - For Each

There is then just simply using the [array for each method](/2019/02/16/js-javascript-foreach) to loop over each element and then just concatenate what I want to a string value. Some might regard this as a crude way to go about doing this sort of thing, but in many simple coding examples and projects the end result will end up working out just fine. There may be some draw backs to using the for each method, but if something works fine for me in my own project then that is the case, and I can then move on. I think the best thing to keep in mind is that this is not the only tool in the toolbox then it comes to array prototype methods and, many of the other options are very useful when it comes to parsing threw a source array.

```js
var a = [1, 2, 3, 4],
str = '';
a.forEach(function (n) {
    str += n;
});
console.log(str); // '1234'
```

### 2.6 - The reduce method

Maybe one of the best options to work with would be the [array reduce](/2021/07/13/js-array-reduce/) method actually when it comes to prototype methods that are useful for creating a string primitive from an array. This is a method that is often used to create a sum from an array, however it can also very much be used to create a string primitive also. For example If I have an array of numbers and I want to create a string from this array of numbers I can call the reduce method off of the array, and pass a method that will be used to preform the reduction as the first argument, followed by a starting value for the accumulator value that I will be using in the reduction function, in this case it would be a string value.

In the body of the reduction function the first argument is the accumulator value that I started with the second argument of the reduce method. So then I just need to concatenate the current element value that I want that is the second argument in the reducer function and then return that. The return value will then be the value for the accumulation in the next call of the reducer function and so forth.

```js
var a = [1, 2, 3, 4];
// reduce
var str = a.reduce(function (acc, n) {
    return acc + n + '-';
}, 'nums=');
console.log(str); // 'nums=1-2-3-4-'
```

## 3 - Using JSON to create a string from an array

Another way to go about converting an array, or any object to a string would be to use JSON to do so. There are two main methods that come to mind with JSON the parse method, and the stringify method. It is the stringify method that can be used to covert an array to a string, and do so in a way in which all the data of the nested objects will be in a string form. There are some draw backs though depending on what the intension is when it comes to converting an array to a string this way. The main thing about JSON is that it is an example of a data serialization language. What I mean by this is that is is a standard way to convert objects to a from that can then be transmitted over a network, or stored in a file, rather then exiting in a more workable from.

### 3.1 - Basic array to string example Uisng JSON

To create a string from an array using JSON I just call the JSON.stringify method to do so, and pass the array that I want to convert to a string in JSON from. The returned value will then be a string that is a JSON from of that array.

```js
var a = [1, 2, 3, 4],
str = JSON.stringify(a);
console.log(str); // "[1,2,3,4]"
```

That will be about it at least when it comes to creating a JSON string from an array at least anyway. There is also the subject of how to go about converting back to an object for example. There is also maybe some things to be aware of when it comes to certain things that have to do with objects created with custom constructors that will be elements of objects in the array, or nested objects in such objects.

### 3.2 - Basic JSON string to object example

When it comes to converting a JSON string back to an object that I can then work with I will want to use the [JSON.parse method](/2020/02/28/js-json-parse/). For this I just call the JSON parse method and pass the JSON string as the first and argument and if all goes well the return value of this method will then be the original array.

```js
var a = [1, 2, 3, 4],
str = JSON.stringify(a);
console.log(str); // "[1,2,3,4]"
 
var obj = JSON.parse(str);
obj = obj.map(function (n) {
        return Math.pow(2, n);
    });
console.log(obj); // [ 2, 4, 8, 16 ]
```

There is a whole lot more to this though when it comes to crating a string from an array this way. For example in some cases I might end up passing a malformed JSON string to the parse method that will result in an error. So then it would make sense to call this method in the body of a try catch statement. There are also some problems that will come up when it comes to using custom constrictors which is one reason why I might want to use a reviver function when calling this parse method.

## 4 - Conclusion

The array to string method is the default way to go about creating a string value from an array. However it is not the end all solution for this sort of thing, there are a number of other options to be aware of. Also in some cases it is possible that a custom solution will need to be made for create a string value of an object, in the form of some kind of helper function, or a custom to string method that is used in place of array to string one way or another.

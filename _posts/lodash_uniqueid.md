---
title: The unique id method in lodash, and alternatives
date: 2018-10-03 18:14:00
tags: [js,lodash]
layout: post
categories: lodash
id: 296
updated: 2021-12-29 09:48:28
version: 1.18
---

I am writing more content on [lodash](https://lodash.com/) this month for now, and while I was at it I have noticed that I did not get around to [\_.uniqueId](https://lodash.com/docs/4.17.15#uniqueId) yet. As the name of the method suggests the method will return a unique value each time the method is called, so then it can be used as a way to set some kind of unique id values for an object of one kind or another. The method addresses something that comes up once in while now and then when developing projects, so it deserves a post on the subject.

Also in these lodash posts I often take a moment to brush up on how hard it is to go about making a vanilla js solution, or if there are native methods that can be used, and as such this post will be no exception. making this kind of method is not all that hard when it comes to making a kind of custom utility library from the ground up. Also such methods might prove as a great simple starting point for learning a thing or two about [closures in javaScript](/2019/02/22/js-javascript-closure/). So lets take a look at \_.uniqueId, and some other solutions for generating unique ids.

<!-- more -->

## 1 - What to know

This is a post on the \_.uniqueId method in lodash which is a popular javaScript general utility library. This lodash unique id method can be used to create a unique id for something each time it is called. This method will work for the purpose of assigning a unique id for most use cases, but not with complex projects that require a unique id always even if the project restarts, or something that will be unique not just for an application but for a user of a full stack project of some kind. In any case this will be a brief post on this topic of using this method when lodash is a library to work with in a project. Later in this post I will be getting into how to go about making this kind of method from the ground up using vanilla javaScript, and other advanced topics

### 1.1 - An \_.uniqueId example

Using the \_.uniqueId method is fairly straight forward to use, I just need to call it, passing an optional prefix as the first argument, and a unique id will be returned by the method. That is all there is to it when it comes to just using this specific method by itself.

```js
let _ = require('lodash');
 
let id = _.uniqueId('id_');
 
console.log(id); // 'id_1'
 
let i = 10, ids = [];
while (i--) {
    ids.push(_.uniqueId('id_'));
}
 
console.log(ids[0]); // id_2
console.log(ids[9]); // id_11
```

The value might be unique in a relative way, but it is not at all the best solution for many other use case examples. The method is just a lazy way to get a value that is unique each time it is called, and one way to do that is to have it so it just returns a count each time.

## 2 - Vanilla js alternative to \_.uniqueId

Making my own solution for this is not to hard, all is needed is the power of closure when it comes to making a method with a count variable contained within it. There may be a number of other ways to go about making this kind of method without using a closure also, but this is just a topic that a javaScript developer should become aware of sooner or later, and making this kind of method is a good use case example of closures.

### 2.1 - Basic example using an IIFE

I just write a [Immediately Invoked Function Expression](/2020/02/04/js-iife), or IIFE for short often, and then inside the body of that function expression I have a local num variable. I then return a function from within the body of this IIFE, that when called will step the num variable. The current value of this internal closed over num variable with then be used as part of the string that is returned that will be unique each time.

```js
let uniqueId = (function () {
    let num = 0;
    return function (prefix) {
        prefix = String(prefix) || '';
        num += 1;
        return prefix + num;
    }
}
    ());

let id = uniqueId('id_');
console.log(id); // 'id_1'
```

### 2.2 - Making a more advanced method for making a unique string

So it goes without saying that the value that is returned by the lodash uniqueid method is not all that unique. Depending on how unique you need the value to be though it is good enough, however it comes projects you might need to have a method that returns a value that has a lower probability of being duplicated.

So a more advanced version of the same vanilla javaScript alternative that I put together could be made that maybe makes use of things like the Date constructor and Math random method.

```js
let uniqueId = (function () {
    let c = 0,
    st = new Date();
    return function (prefix) {
        var t = new Date() - st,
        r = Math.floor(Math.random() * 1000),
        str;
        prefix = String(prefix) || '';
        str = '-' + c + '-' + t + '-' + r;
        c += 1;
        return prefix + str;
    }
}
    ());
 
console.log(uniqueId('id'));
console.log(uniqueId('id'));
console.log(uniqueId('id'));
setTimeout(function () {
    console.log(uniqueId('id'));
}, 1000);
/*
id-0-1-145
id-1-8-113
id-2-9-598
id-3-1018-910
*/
```

A method such as this results in a value where there is still a non zero change of the value being duplicated, but it is still unique enough that the probability of that happening is pretty negligible.

## 3 - Conclusion

This is not really one of the most compelling methods that I can think of that warrant the use of the full lodash library. The functionally of this methods can be quickly implemented with vanilla javaScript, and often it is something that should be custom tailored anyway. Just stepping a number can make a value unique in a relative way, but it is not the same thing as more complex methods that might involve additional data that helps to make a far more unique value.
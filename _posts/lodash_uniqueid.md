---
title: Using _.uniqueId in lodash, and alternatives
date: 2018-10-03 18:14:00
tags: [js,lodash]
layout: post
categories: lodash
id: 296
updated: 2020-01-09 21:11:56
version: 1.11
---

Writing more content on [lodash](https://lodash.com/) this month for now, and have noticed that I did not get around to [\_.uniqueId](https://lodash.com/docs/4.17.15#uniqueId) yet. The method addresses something that comes up a lot now and then when developing projects, so it deserves a post. Also in these lodash posts I often take a moment to brush up on how hard it is to go about making a vanilla js solution, or if there are native methods that can be used, and as such this post will be no exception. So lets take a look at \_.uniqueId, and some other solutions for generating unique ids.

<!-- more -->

## 1 - What to know

This is a post on the \_.uniqueId method in lodash. This method can be used to create a unique id for something each time it is called. This method will work for the purpose of assigning a unique id for most use cases, but not with complex projects that require a unique id always even if the project restarts. In any case this will be a brief post on this topic.

## 2 - An \_.uniqueId example

Using the \_.uniqueId method is fairly straight forward to use, I just need to call it, passing an optional prefix as the first argument, and a unique id will be returned.

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

## 3 Vanilla js alternative to \_.uniqueId

Making my own solution for this is not to hard, all is needed is the power of closure. I just write a self executing function expression and then inside the body of that function expression I have a local num variable, I then return a function that when called will step the num variable, and use that as part of the string that is returned that will be unique each time.

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

## 4 - Making a more advanced method for making a unique string

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

## 5 - Conclusion

This is not really one of the most compelling methods that I can think of that warrant the use of the full lodash library. The functionally of this methods can be quickly implemented with vanilla javaScript, and often it is something that should be custom tailored anyway. Just stepping a number can make a value unique in a relative way, but it is not the same thing as more complex methods that might involve additional data that helps to make a far more unique value.
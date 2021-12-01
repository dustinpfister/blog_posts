---
title: The lodash \_.method method as well as other methods of interest
date: 2019-05-30 11:50:00
tags: [lodash]
layout: post
categories: lodash
id: 467
updated: 2021-12-01 12:18:31
version: 1.14
---

The [lodash \_.method](https://lodash.com/docs/4.17.15#method) method can be used to call a method at a given path when used with another lodash method like [\_.map](/2018/02/02/lodash_map), or [\_.filter](/2018/05/18/lodash_filter/) just to name a few such options. In other words say you have this function as a property of an object that is one of many such objects in a collection of sorts, and you want to use this function with a method like map to create a custom form of the collection. If you are in this kind of situation then this is a situation in which you might consider using the lodash \_.method method.

There is also however maybe more that one intension of what the term "lodash method" means. Maybe you are looking into some content that has to do with the main lodash method of the lodash global that is used in the [process of chaining](/2018/11/11/lodash_chain/) for example.

This is one of the lesser known methods in lodash that I do not see myself using often, and if you are scratching your head wondering if this is a feature that makes lodash worth the hassle or not this might be one of those kinds of lodash methods. It would seem that are are a lot of developers these days that think that lodash is an outdated utility library, some of them even go so far as to say that using lodash never even made sense to begin with. Maybe they are half write, but in any case in this post I am going to be looking into this lodash method, and also maybe look into some ways to do the same thing with vanilla javaScript t see if this is really a useful method, or yet even more unneeded bulk in lodash.

<!-- more -->

## 1 - lodash _.method in range example

The \_.method method is intended to be used with other lodash methods like \_.filter that accept a collection as the first argument and then a second argument that is a function that is to be called for each element in that collection. So then say I have an in range method that will return true if the x value of an object is in a given range, and false if it is not. I then have a reference to this in range method in a bunch of nested objects in a collection along with an x value that will work with the range method. I then want to create a new array that is just the objects in the collection that contain an x value that is in range. So then I could do something with the lodash \_.method like this.

```js
let inRange = function(){
    return this.x < 9 && this.x >=0 
}
let points = [
    { pt: { x: -1, tester: inRange } },
    { pt: { x: 5, tester: inRange} },
    { pt: { x: 3, tester: inRange} },
    { pt: { x: 25, tester: inRange} },
];
let f = _.filter(points, _.method('pt.tester'));
let r = _.map(f, function(el){ return el.pt.x})
console.log(r); // [5, 3]
```

## 2 - Conclusion

Thats it for now today, I could not think about more to write about with this one just yet, and could also not come up with any actual real use case examples as well fir the method named method in lodash. I can not say that I end up in situations in which I need to use this kind of method often, in fact thus far I would say never actually. Even if I do get into some kind of situation in which this method will prove to be useful I think I would still prefer to make use of some other options for doing what I need to do actually.

I do get around to editing and expanding my content on lodash once in a while, it might be a long time until I get around to this post again though, of ever actually. I could expand the section on the lodash method method a bit more, however there are a whole lor of other posts on lodash that I have written, many of which are on methods and topics in general that do come up a lot. Still if you can think of something to say about this subject by all means bring something up in the comments section.


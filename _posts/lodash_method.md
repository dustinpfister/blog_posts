---
title: The lodash \_.method method as well as other methods of interest
date: 2019-05-30 11:50:00
tags: [lodash]
layout: post
categories: lodash
id: 467
updated: 2021-12-01 12:47:59
version: 1.20
---

The [lodash \_.method](https://lodash.com/docs/4.17.15#method) method can be used to call a method at a given path when used with another lodash method like [\_.map](/2018/02/02/lodash_map), or [\_.filter](/2018/05/18/lodash_filter/) just to name a few such options. In other words say you have this function as a property of an object that is one of many such objects in a collection of sorts, and you want to use this function with a method like map to create a custom form of the collection. If you are in this kind of situation then this is a situation in which you might consider using the lodash \_.method method.

There is also however maybe more that one intension of what the term "lodash method" means. Maybe you are looking into some content that has to do with the main lodash method of the lodash global that is used in the [process of chaining](/2018/11/11/lodash_chain/) for example.

This is one of the lesser known methods in lodash that I do not see myself using often, and if you are scratching your head wondering if this is a feature that makes lodash worth the hassle or not this might be one of those kinds of lodash methods. It would seem that are are a lot of developers these days that think that lodash is an outdated utility library, some of them even go so far as to say that using lodash never even made sense to begin with. Maybe they are half write, but in any case in this post I am going to be looking into this lodash method, and also maybe look into some ways to do the same thing with vanilla javaScript t see if this is really a useful method, or yet even more unneeded bulk in lodash.

<!-- more -->

## 1 - lodash _.method in range example

The \_.method method is intended to be used with other lodash methods like \_.filter that accept a collection as the first argument and then a second argument that is a function that is to be called for each element in that collection. In this section I will be going over a few simple examples of this lodash method, and in the process of doing so I will also be touching base on various other lodash features in general as well as another alternatives ways of doing things with lodash. This is not any kind of getting started type post wit lodash, let alone with [javaScript in general](/2018/11/27/js-getting-started/) so I trust that you have at least a little experience working with javaScript and various user space libraries such as but not limited to lodash.

### 1.1 -

So then say I have an in range method that will return true if the x value of an object is in a given range, and false if it is not. I then have a reference to this in range method in a bunch of nested objects in a collection along with an x value that will work with the range method. I then want to create a new array that is just the objects in the collection that contain an x value that is in range. So then I could do something with the lodash \_.method like this.

```js
let inRange = function(){
    return this.x < 9 && this.x >=0 
};
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

### 1.2 - Not using the method lodash method

Often it is not going to end up being to much more complex to avoid having to use this method. Also if I am using it I can not help but think that the use of the method like this proves that I should be doing something different with the state of a collection. For example in the in rage example that I started out with why would I have references to an in range method like that for each object? Why not just call the in range method directly in the body of a function that I give to the filter method with the call [function prototype method](/2017/09/21/js-call-apply-and-bind/) and just pass a reference to the nested object?

```js
let inRange = function(){
    return this.x < 9 && this.x >=0 
};
let points = [
    { pt: { x: -1} },
    { pt: { x: 5} },
    { pt: { x: 3} },
    { pt: { x: 25} },
];
let f = _(points).filter((el) => {
    return inRange.call(el.pt);
}).map((el) => {
    return el.pt.x;
}).value();
console.log(f); // [5, 3]
```

Maybe it would make more sense if each nested object in the collection had its own unique method, but even in that case why not just do something like this? Also why even use lodash to do something like this also? I do not want to be yet another developer that jumps on the lodash hate wagon really, there are a few methods in lodash that I think are very useful, but that is just it, a few.  If this method is one of those methods in lodash I can not say that I am seeing it.

## 2 - Conclusion

Thats it for now today, I could not think about more to write about with this one just yet, and could also not come up with any actual real use case examples as well fir the method named method in lodash. I can not say that I end up in situations in which I need to use this kind of method often, in fact thus far I would say never actually. Even if I do get into some kind of situation in which this method will prove to be useful I think I would still prefer to make use of some other options for doing what I need to do actually.

I do get around to editing and expanding my content on lodash once in a while, it might be a long time until I get around to this post again though, of ever actually. I could expand the section on the lodash method method a bit more, however there are a whole lot of [other posts on lodash](/categories/lodash/) that I have written, many of which are on methods and topics in general that do come up a lot. Still if you can think of something to say about this subject by all means bring something up in the comments section.


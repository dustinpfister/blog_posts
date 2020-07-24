---
title: Examples of the _.pick object method in lodash
date: 2018-07-11 12:29:00
tags: [js,lodash]
layout: post
categories: lodash
id: 233
updated: 2020-07-24 10:10:19
version: 1.19
---

When working with objects it is sometimes nice to quickly be able to make a custom object that is composed of properties from another object, just a few of them, not the whole thing. For this in [lodash](https://lodash.com/) there is the [\_.pick](https://lodash.com/docs/4.17.10#pick) method that can be used to create a new object that is a shallow copy of a given object, but with only properties that are in a given list of property names. So as the name suggests it is a pay to go about picking properties from another object, and create a new object with this list of properties from a source object.


<!-- more -->

## 1 - The lodash pick method and what to know first

This is a post on just the \_.pick method in lodash. Here I will be writing just about that method, and some other related topics, but will not be getting into detail with lodash, or javaScript in general. The pick method is one of the many lodash object methods that are meant to be used with objects in general, and not just arrays or collections. For more on these object methods you might want to check out my post on [lodash object](/2019/02/13/lodash_object/) methods in which I cover some of these in further detail.

### 1.1 - The delete operator in vanilla js

So when it comes to just working with vanilla js by itself there is the [delete operator](/2019/02/20/js-javascript-delete/). This can be used as a way to remove unwanted properties from an object, but it will of course mutate an existing object rather than create a new one. When using delete as a way to create a new object with a selection of properties from original object, and not mutate the original the original will have to be cloned first.

### 1.2 - The lodash omit method

There is also the [lodash omit](/2019/08/19/lodash_omit/) method that works more or less the same way as the loadh pick method only it creates a new object from and old object by omitting properties that are not wanted. In this case the new object contains all properties that are not in the array of properties names rather than just the properties names in the give array.

## 2 - An example of using \_.pick involving an object about traffic received in a day.

For a basic example of using \_.pick I will be giving a simple object that is created from the object literal notation. This object contains some simple primitives, and one property that is an Array. This will serve well as an example of what \_.pick does, and also what to look out for when using it.

### 2.1 - The day object

So here is that day object that will be used in some examples here in the remainder of this section. I have a property that contains the date of a day in a string format, along with additional properties for a user count for the day, pageviews, and a page property that contains a detailed breakdown of users and pageviews via an array of objects.
```js
var day = {
    date: '1/2/17',
    users: 10,
    pageviews: 13,
    pages: [{
            path: '/2017/01/01/hello/',
            users: 3,
            pageviews: 4
        }, {
            path: '/2017/01/02/hello-again/',
            users: 7,
            pageviews: 9
        }
 
    ]
};
```

When dealing with an object like this, there might be scenarios where I might just want the date, and users properties. Also In some cases I might want the pages Array, and have it so it is a deep copy as well.

### 2.2 - Basic example of \_.pick, to get just the date, and users from the day object.

So if I want a new object that is just a shallow copy of some of the primitive values of the day object, \_.pick works just fine out of the gate like this.

```js
console.log( _.pick(day, ['date', 'users']) ); // { date: '1/2/17', users: 10 }
```

I have my object with just the properties that I want, without the rest of the clutter, great. However things can get a little tricky when it comes to properties that have values that are not primitives.

### 2.3 - With \_.pick the object returned is a shallow clone

So if I get another new object that is the result of using \_.pick, but this time include the pages array, some might think that this array is a copy, or clone of the original. It is not, anything non-primitive will be referenced in.

```js
let custom = _.pick(day, ['date','users','pages']);

// what is returned is a shallow clone
day.users += 50;
console.log(day.users); // 60
console.log(custom.users); // 10
 
// but not a deep clone
day.pages[0].users += 50;
console.log(day.pages[0].users); // 53
console.log(custom.pages[0].users); // 53
```

In some cases this is not a problem if I actually want references rather than a copy. However if it is a problem one solution is to just make a \_.deepClone of the object, then passing that as the object for \_.pick.

### 2.4 - If a deep clone is needed try just doing a \_.deepclone on the object that is given to \_.pick.

If I want the pages array to be a copy, rather than a reference then this is where methods like \_.deepClone come into play.

```js
let custom = _.pick(_.cloneDeep(day), ['date','pages']);
 
day.pages[0].users += 50;
 
console.log(day.pages[0].users); // 53
console.log(custom.pages[0].users); // 3
```

## 3 - Picking from a Class

When using \_.pick a new object is going to be returned, so if I am using an object that has a constructor other than that of Object, then I am going to loose everything attached to the prototype. This is one of the main things to consider when doing anything with objects. Do I want a copy, or are references okay, and do I care about the prototype.

### 3.1 - The Day constructor

Say for example I have a Day constructor that can be used to create in instance of a day object rather than just an object literal.

```js
let Day = function (options) {
 
    options = options || {};
    this.date = options.date || '1/1/00';
    this.pages = [];
    this.users = 0;
    this.pageviews = 0;
 
    if (options.pages) {
 
        this.setPages(options.pages, this.date);
 
    }
 
};
 
// set pages
Day.prototype.setPages = function (pages) {
 
    let day = this;
    day.pages = _.cloneDeep(pages);
    day.setFromPages();
 
};
 
Day.prototype.setFromPages = function () {
 
    let day = this;
    day.users = 0;
    day.pageviews = 0;
 
    _.each(day.pages, function (page) {
 
        day.users += page.users ? page.users : 0;
        day.pageviews += page.pageviews ? page.pageviews : 0;
 
    });
 
};
 
Day.prototype.bounceRate = function () {
 
    return this.users / this.pageviews;
 
}
```

This differs from my earlier example in that now I can create an object that has a prototype with it.

```js
let day = new Day({
    date: '1/2/17',
    pages: [{
        path: '/2017/01/01/hello/',
        users: 3,
        pageviews: 4
    }, {
        path: '/2017/01/02/hello-again/',
        users: 7,
        pageviews: 9
    }]
});
console.log( day.constructor.name ); // 'Day'
console.log( {}.constructor.name ); // 'Object'
```

### 3.2 - A \_.pick from a class results in the loss of it's prototype

So after creating an instance of Day all my methods work just fine.

```js
// my bound rate works
console.log(day.bounceRate()); // 0.7692307692307693
console.log( day.constructor.name ); // day
```

However if I use \_.pick I will loose the prototype.

```js
let custom = _.pick(day, ['date', 'pages']);
 
console.log( custom.constructor.name ); // Object
```

No big deal thought I would just need to make a new one.

```js
let custom = new Day(custom);
 
console.log( custom.constructor.name ); // Day
```

## 4 - Vanilla javaScript and picking

So now it is time to get into picking from an object without using lodash. There are many talking points for using lodash still, but more often than not it seems that there is a lot of talk over the fact that lodash is unnecessary weight. I am not the kind of person that really has a solid opinion on that. Lodash does certainly have its redeeming qualities, but it is ture that if you are really familiar with what there is to work with in javaScript by itself these days it is not to hard to do a lot of thing that does does with just plain vanilla javaScript.

So with that said in this section I will be going over some javaScript code examples where I am doing the same thigns that the lodash pick method does without the use of the lodash pick method, or lodash at all.

### 4.1 - Just create a new object

I often just create a new object, and then reference in the properties that I want from a source object.

```js
let obj = {
    x: 42,
    y: 30,
    heading: 1.57,
    pps: 32
};
 
let point = {
    x: obj.x,
    y: obj.y
};
 
console.log(Object.keys(point)); // ['x', 'y']
```

The thing to keep in mind here is that I am creating a new object, and in this example I am copying over primitive values. If I am copying over nested objects I can still run into problems with copying by reference, but the same is true with the lodash pick method by itself without using a deep clone method of one kind or another.

### 4.2 - Making a pick method with Object.keys, array filter, array some, forEach, and the a new Object

So if i really want a lodash pick like method I can make one by making use of what there is to work with in native javaScript. The [Object.keys](/2018/12/05/js-object-keys/) static method in javaScript can be used to create an array of public key names from a source object, I can then use the array filter method off of that array of key names. 

I can then have another array of picked key names that I want from the source object that is given as an argument. This array of picked names can be used in the body of my array filter function with the array some method called off of the array of picked keys, and in the function that I pass to array some I can make a comparison to see if this is one of the picked keys or not. The resulting array can then be used as a way to create the new object that contains the picked keys from the source object.

```js
let pick = function (sourceObj, pickedKeys) {
    let newObj = {};
    Object.keys(sourceObj).filter((sourceKey) => {
        return pickedKeys.some((key) => {
            return sourceKey === key;
        });
    }).forEach(function (key) {
        newObj[key] = sourceObj[key];
    });
    return newObj;
};
 
let obj = {
    x: 42,
    y: 30,
    heading: 1.57,
    pps: 32
};
 
let point = pick(obj, ['x', 'y']);
console.log(point);
```

## 5 - Conclusion

So the lodash pick method is one of many little convenient methods for creating a new array from a source object. However just like many of the other methods in lodash it is not always so hard to just get the job done with javaScript by itself and move on without adding the additional bloat that adding lodash to a project will do. 

Still when it comes to being flexible I am sure many of us end up working on projects where lodash is in fact still part of the stack, so it pays to know a thing or two about what there is to work with in lodash, but also what there is to work with in javaScript itself in the event that lodash is going to be removed from a project.
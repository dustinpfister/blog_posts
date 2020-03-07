---
title: js value of object method
date: 2020-03-06 16:45:00
tags: [js,corejs]
layout: post
categories: js
id: 622
updated: 2020-03-07 10:36:24
version: 1.10
---

The js [value of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf) method is a way to define what the primitive value of an object is. There is a value of object prototype methods that will always be used by default when making an object part of an expression that involves operators like addition. However it is possible to add a value of method for the prototype object of a Class, or just make it an own property of an object instance which will supersede the default value of method in the object prototype.

Typically I would want a value of method to return a number or string value, however it should return whatever is appreciate when using an an object in an expression that will be used to compute a product.

<!-- more -->

## 1 - js value of basic example

So to get a basic idea of what the value of method is all about here is a very basic example of the value of method in action. I have just a simple object literal with two number values, and a value of method that returns another number value that makes use of those properties. I then assign this object literal to a variable named obj which I then use in an expression to get a number value that i then assign to the variable n.

```js
var obj = {
    exp: 4,
    base: 2,
    valueOf: function () {
        return Math.pow(this.base, this.exp);
    }
};
var n = obj + 5;
console.log(n); // 21
```

So that is about it when it comes to the value of method when working with objects and expressions. What a value of method should return of course depends on the nature of the object, and the constructor if any that created it.

## 2 - The value of method and the prototype chain.

If there is a value of method as an own property of an object that will supersede anything that might be in the prototype object chain. Getting into javaScript style inheritance in detail is off topic, but in this section I will be touching base on prototype based inheritance and the use of the value of method.

For example say I have a class that creates an object that has an x property, y property and an a property that is the angle from zero, zero to the point of the this object. I want a value of method that will return the angle when the object is used in expressions, but when doing so there is radians and degrees. There is more than one way to make it so I can return one or another, such as having a value for the prototype object that can be overwritten in the own properties of the object. However for the sake of this post and section another way is to have a value of method as an own property of the instance.

```js
var Heading = function (x, y) {
    this.x = 0;
    this.y = 0;
    this.update(x, y);
};
 
Heading.prototype.update = function (x, y) {
    this.x = x === undefined ? this.x : x;
    this.y = y === undefined ? this.y : y;
    this.a = Math.atan2(this.y, this.x);
 
};
 
Heading.prototype.valueOf = function () {
    this.update();
    return this.a;
 
};
 
// Heading.prototype.valueOf supersedes
// Object.prototype.valueOf
var h = new Heading(0, 10),
a = (h + 1.57).toFixed(2);
 
console.log(a); // 3.14
 
// An own property of h will supersede all
// prototype methods
h.valueOf = function () {
    return Heading.prototype.valueOf.call(this) / (Math.PI * 2) * 360;
};
a = h + 90;
 
console.log(a); // 180
```

## 3 - Land tile game javaScript value of example

So now lets get into doing some things that might prove to be a little fun when it comes to the js value of method of objects and javaScript expressions. Say I want to make some kind of game that will involve an array of land assets. This array of land asset objects will contains objects that are of a class where there is a tax property, upkeep property, and a rent property. What I want to do is have it so I can just loop over this array of objects and add up the total amount of money that the player will gain or loose per tick.

```js
// Land Class
var Land = function (opt) {
    opt = opt || {};
    this.tax = opt.tax === undefined ? 0 : opt.tax;
    this.upkeep = opt.upkeep === undefined ? 0 : opt.upkeep;
    this.rent = opt.rent === undefined ? 0 : opt.rent;
};
Land.prototype.valueOf = function () {
    return this.rent - this.tax - this.upkeep;
};
 
// an assets array of Land Class
// instances
var assets = [
    new Land({
        tax: 300,
        upkeep: 100,
        rent: 450
    }), // 50 a tick
    new Land({
        tax: 400,
        upkeep: 150,
        rent: 700
    }) // 150 a tick
];
 
// add up money per tick
var m = assets.reduce(function (acc, land) {
        // I can just add here
        // thanks to value of
        return acc + land;
    });
console.log(m); // 200
```

Not a full game by itself of course, but you get the basic idea. There would be additional logic that would be used to set what the tax and upkeep values are along with rent. Much more logic would need to be written to make some kind of interface. However this is all ready starting to be kind of fun. Lets look at some other use case examples of the js value of method.
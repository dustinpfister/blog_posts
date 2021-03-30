---
title: js value of object method
date: 2020-03-06 16:45:00
tags: [js,corejs]
layout: post
categories: js
id: 622
updated: 2021-03-30 13:00:50
version: 1.17
---

The js [valueOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf) Object prototype method is a way to define what the number primitive value of an object should be. This is a way to define a function for a single object, or a Class of Objects that will be called when the object is used in an expression where the object will be teated as a number in the expression.

So because the valueOf method is part of the main Object prototype object there is a default valueOf method that will be used for all objects when there is a need for javaScript to convert an object to a number value. However it is often required, or at least a good idea, to define a custom valueOf method for an Object or Class of Objects.

When making my own valueOf method the method should return a number value rather than a string value, and I should take care to make sure that this is the case. A string value would be more appropriate when it comes to making a [custom toString](/2020/07/14/js-to-string/) method for an Object or class of Objects when making a prototype object. With that said yes the toString method is the String equivalent of the valueOf method that should return a number value. The two methods can, and should be used as the standard way of returning string and number values of an object. 

In this post the focus will be more so on the vlaueOf method, and how this can come into play and be useful when making certain modules and frameworks.

<!-- more -->

## 1 - js value of basic example

So to get a basic idea of what the value of method is all about here is a very basic example of the value of method in action. I have just a simple object literal with two number values, and a value of method that returns another number value that makes use of those properties using the core javaScript built in Math.pow method that will return a number using those two numbers in the object. When doing so the this keyword can be used inside th body of the valueOf method to refer to the object, and its properties.

I then assign this object literal to a variable named obj which I then use in an expression with the addition operator and a number literal when the evaluates to a number value that I then assign to the variable n.

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

## 4 - Notation example of value of

Another example that comes to mind would involve scientific notation. The process of Scientific notation is to have a mantissa value that is then raised by to to the power of an order of magnitude to get an actual number value. So an Object could be used to store these values and the js value of method could be used as a way to produce a primitive value in expressions as long as it is a value that is below max safe integer at least.

```js
var Note = function (m, n) {
   this.mantissa = m;
   this.orderOfMagnitude  = n;
};
Note.prototype.valueOf = function () {
    return this.mantissa * Math.pow(10, this.orderOfMagnitude);
};
 
var n = new Note(1.57, 10);
console.log(n + 1); // 15700000001
```

## 5 - Conclusion

So the valueOf method can be used to define what a number value of an object should be. It can be called directly off of an object, however it is often not needed. More often then not it is a way to define number values with object properties that should be used in math expressions that will evaluate to a number rather than a string.

The [valueOf method might come up when it comes to getting into the details of functional programing](https://blog.klipse.tech/javascript/2016/09/21/valueOf-js.html) the reason why is because when making what you might think is a pure function might not be when it comes to arrays containing objects that can have there valueOf methods mutated. However getting into pure functions might be a matter for another post.
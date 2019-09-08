---
title: Operator precedence AKA order of operations in javaScript
date: 2019-02-02 20:53:00
tags: [js]
layout: post
categories: js
id: 371
updated: 2019-09-08 14:25:02
version: 1.31
---

When writing javaScript expressions knowing the order in which operations are preformed is important to make sure that desired results will always be achieved. Each type of operator has a kind of precedence or level of importance compared to others, for example multiplication is always preformed before addition. So then in javaScript [operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence), or just simply the order of operations in which operations are preformed is something that a javaScript developer should have a solid grasp on as it will come up when writing expressions. In this post I will be going over many examples of this that should help with gaining at least a basic understanding of order of operations, associativity, and maybe some other little things here and there when it comes to writing expressions and functions.

<!-- more -->

## 1 - Order of operations basics in javaScript

So lets start out with some very simple examples of order of operations in javaScript, then cover some more complex real examples later in this post. That being said if an expression contains addition first and then multiplication from left to right, then the multiplication operation will be preformed first and then the addition. The reason why is because multiplication and division have a higher precedence value then that of addition and subtraction. If for some reason I want the addition to happen first then I  will want to use parentheses or group operators to achieve just that. The reason why is because parentheses have the highest precedence value of all when it comes to the order of how operations are preformed with javaScript expressions.

```js
console.log( 10 + 5 * 2 ); // 20
console.log( (10 + 5) * 2 ); // 30
```

So there is the question of what operators are preformed first ([operator precedence aka order of operations](https://en.wikipedia.org/wiki/Order_of_operations)), and then also the direction in which they are preformed as well ( [associativity](https://en.wikipedia.org/wiki/Operator_associativity) ). To know if grouping with parentheses is really needed or not it is just a matter of know what comes first and to know that you just need to review what the precedence values are for each operator that is used an expression.

## 2 - Associativity of operators

So Associativity is the direction in which operations are preformed such as left to right, or right to left. Operators like addition, subtraction and so forth have left to right associativity. However other operators such as the assignment, and logical not operator have right to left Associativity.

```js
var a = 5 - 2;
var b = 2 - 5;
 
console.log(a,b); // 3 -3
```

Here subtraction is an example of left to right associativity.

## 3 - The javaScript precedence values

There are Twenty levels of operator precedence in javaScript. Operators with a higher precedence value will be preformed first over those with a lower precedence value. In addition the associativity is different depending on the operator as well, however most of the operators typically used when writing expressions have left to right associativity. In this section I will be going over some of the operators in order pf the precedence value.

### 3.1 - Grouping - Precedence 20 ( highest, prefromed first)

Parentheses in javaScript are used to make function calls, however they also have another purpose when it comes to grouping an expression. In other words a pare of parentheses is considered a so called [grouping operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Grouping), and when it comes to authoring any kind of expression in javaScript this grouping operator has the highest Operator precedence of all the available operators in javaScript.

```js
let a = !0 + 1 * 5,
b = !(0 + 1) * 5;
 
console.log(a, b); // 6 0
```

No matter what else is going on anything inside the parentheses or grouping if you prefer will be preformed first.

### 3.2 - Function calls Precedence 19

Grouping hands down does have the highest precedence in javaScript, but right behind it is also function calls. So any additional expression within a function call will be preformed first in most situations unless it is superseded by grouping somehow.

```js
// simple echo function
let echo = (n) => {
    return n;
};
console.log(3 + echo(7 - 3) * 5); // 23
console.log(3 + 7 - 3 * 5); // - 5
console.log(3 + (7 - 3) * 5); // 23
```

### 3.2 - Logical Or - Precedence 5

So logical or operators have left to right associativity. In addition of anything that comes along evaluates to true that will be the value of the expression any any additional parts will not effect the result. This effect is desirable in many situations as such it is often used as a way to feature test, and create poly fills.

```js
// left to right Associativity
var a = 0,
b = 1,
c = 42,
d = a || b || c;
 
console.log(d); // 1
 
var e = 5 * 0 || 3,
f = 5 * (0 || 3);
 
console.log(e); // 3
console.log(f); // 15
```

### 3.3 - Conditional - Precedence 4

I often seen Conditional operators used in expressions. When using them any expression that comes first will typically be preformed first because just about all other operators typically used to write expressions have higher precedence.

```js
let a = 10;
console.log(  a > 5 ? true : false ); // true
console.log(  a * 2 > 5 ? 1 : 0 ); // 1
console.log(  a * (2 > 5) ? 1 : 0 ); // 0
```

### 3.4 - Assignment - Precedence 3

When it comes to the order of operations in javaScript the assignment operator is fairly low on the list. So low in fact that for most expressions it will be preformed last. The only operators that are even lower are the yield and Comma operators which I can not say I use much when it comes to expressions.

```js
let b = 40;
 
// assignment has right to left Associativity
let a = b = 5;
console.log(a); // 5
console.log(b); // 5
 
// just about everything else is preformed first
let c = -1;
let d = (4 + 5 * 2) / 2 - 7 || 3 + --c;
console.log(d); // 1
```

## 4 - javaScript order of operations examples

So now that we know the basics when it comes to order of operations in javaScript lets take a look at some actual code examples when it comes to some lengthly expressions with more than one operator.

### 4.1 - Estimating income example

Say you want to estimate the amount of money that you might make for a blog post if you manage to rank at the top of a search engine result page. You know the score that a keyword of interest gets relative to a compare keyword to which you know the average money traffic. You also know what is average when it comes to click threw rates for the first position, second position and so forth, and also your average page revenue per mille.

So in order to figure estimates for amount of money you might make for each rang position you will need to work out some kind of lengthly expression and use that in a function in which you pass arguments for all of this.

So you might end up with something like this:

```js
let pageMoney = (s, c, ct, ctr, rpm) => {
    return s / c * ct * ctr * rpm;
};

let ctrRates = [0.8, 0.1, 0.05, 0.025];
ctrRates.forEach((ctr, i) => {
    console.log(i + 1, '$' + pageMoney(50, 36, 6.5, ctr, 1.6).toFixed(2));
});
// 1 $11.56
// 2 $1.44
// 3 $0.72
// 4 $0.36
```

So getting back to the subject of this post the expression that is used in the pageMoney function is composed of operators that are all division and multiplication, both of which have the same operator precedence, as well as associativity. So for this expression the operations are just simply preformed from left to right.

### 4.2 - Frames javaScript Operator precedence exercise

Say you want to write a function that will spit out a value between zero and one from zero up to one and then back down again depending on a current frame index value compared to a total max frame count. These are the kinds of functions I end up writing when I am playing around with animations that are governed by logic that is writing in a functional, deterministic kind of way.

In this exercise I made a function that gives a value that behaves as expected and when doing so wrote several expressions that make use of a few operators including a native function call.

```js
let getPosition = (frame, maxFrame) => {
    // many expressions involving assignment, and the
    // ternary operator
    frame = frame === undefined ? 0 : frame;
    maxFrame = maxFrame === undefined ? 0 : maxFrame;
    frame = frame < 0 ? 0 : frame;
    frame %= maxFrame;
 
    // division operation inside the native function call is preformed first
    // and then that value is subtracted from 0.5. Then that value is divided over
    // 0.5 and is then finally that value is subtracted from one.
    return 1 - Math.abs(0.5 - frame / maxFrame) / 0.5;
 
};
 
let maxFrame = 50;
console.log(getPosition(-25,maxFrame)); // 0
console.log(getPosition(0,maxFrame)); // 0
console.log(getPosition(50,maxFrame)); // 0
console.log(getPosition(25,maxFrame)); // 1
console.log(getPosition(75,maxFrame)); // 1
```

The particular expression of interest here is the one that returns the value between zero and one depending on the current state provided via the functions arguments. This expression was fairly easy for me to write because I have a decent grasp on order of operations these days, however in the past it would have taken a lot longer as I would have followed a kind of time consuming trial and error process. 

### 4.3 - Getting my cell phone plan data target for the day

So where I live I do not have and kind of hard wired broadband Internet access, just mobile broadband via my cell phone. So with my plan I only have so much high speed data until I get throttled down to 128kbps, as such I need to budget my data or pay out the node for a higher data cap.

With that in mind it would be nice to know a certain figure each day that will tell be if I am above or below budget when it comes to data. If I am above budget I can watch a video or two, if not I have to change my browsing habits and focus more on work which does not eat up a whole lot of data as I just need to push and pull text. So to write some kind of function that can help me get that data target figure I can exercise my knowledge of operator precedence to work out an expression that will do just that.

```js
// the expression I would out is like this
console.log(80192 - 80192 / 31 * 13); // 46563.096774193546
 
// grouping like this is not necessary but might help
// make what is going on more clear
console.log(80192 - ((80192 / 31) * 13)); // 46563.096774193546
 
// now to replace the literals with variables
let dataCap = 80192,
daysInMonth = 31,
currentDayOfMonth = 13;
 
console.log(dataCap - ((dataCap / daysInMonth) * currentDayOfMonth)); // 46563.096774193546
 
// And now I can make a method
let getDataCap = (dataCap, now) => {
 
    // assume 8GB and todays date if nothing
    // is given
    dataCap = dataCap || 1024 * 8;
    now = now || new Date();
 
    // get number of days, and day of month, from the given now date object.
    let daysInMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate(),
    currentDayOfMonth = now.getDate();
 
    // return the result with the expression I worked out with a knowledge
    // of operator precedence in javaScript
    return dataCap - ((dataCap / daysInMonth) * currentDayOfMonth);
 
};
console.log( getDataCap(80192,new Date(2019,7,13)) ); // 46563.096774193546
```

## 5 - Conclusion

So order of operations in javaScript is not so hard to understand when one takes the time to just sit down, study, and work out a few examples. It might take a while, but eventually I have started to get more proficient at writing expressions with javaScipt using grouping operators only when they are needed as I understand the order of operations as well as associativity of operators. Reading a post or two on the subject such as this one might help, but what will really help is to just get busy working on your own exercises.
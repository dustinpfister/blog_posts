---
title: Operator precedence AKA order of operations in javaScript
date: 2019-02-02 20:53:00
tags: [js]
layout: post
categories: js
id: 371
updated: 2021-12-21 16:41:49
version: 1.82
---

When writing javaScript expressions knowing the order in which operations are performed is important to make sure that desired results will always be achieved, this is often called [operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence), or just simply order of operations. Each type of operator has a kind of precedence or level of importance compared to others, as such operators of higher precedence are performed before operators of lower precedence. In addition to this operator precedence there is also associativity of operators as well, that is the direction from left to right or the inverse of that when it comes to performing operations.

For example, multiplication is always performed before addition, and a lengthy expression that is contained within a grouping operator is performed before any additional operations that are to be performed outside of it. Many operators are performed from left to right when it comes to associativity, but this is not always the case with many others. So then in javaScript operator precedence, and associativity is something that a developer should have at least some grasp on as it will come up when authoring or studying expressions in a project. So there is the question of what operators are performed first \([operator precedence aka order of operations](https://en.wikipedia.org/wiki/Order_of_operations)\), and then also the direction in which they are performed as well \( [associativity](https://en.wikipedia.org/wiki/Operator_associativity) \).

In this post I will be going over many examples of order of operations in JavaScript that should help with gaining at least a basic understanding of that topic, as well as associativity, and maybe some other little things here that I will likely branch off into when it comes to writing some actual real functioning examples of order of operations and javaScript code.

<!-- more -->

## 1 - Order of operations basics in javaScript

In this section I will be starting out with some basics when it comes to order of operations with javaScript. There is just starting out by fiddling with some basic expressions composed of operators and literal values that might be the best place to start. A very simple starting point might be expressions involving just addition, multiplication, and grouping to help really drive home why it is that understanding order of operations in javaScript is important.

I will be keeping these examples very simple, but this is still not a post on [getting started with javaScript in general](/2018/11/27/js-getting-started/). There are a lot of ways to get started with javaSscript, but often when I am trying to work out some kind of expression I work something out in the [javaScript console of chrome](/2019/07/29/js-getting-started-javascript-console/).

### - Te source code examples on this post can be found on Github

The source code examples in this post can be found on Github at my [test vjs repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-operator-precedence), where I also store all the source code examples for my [many other posts on vanilla javaScript](/categories/js/).

### 1.1 - Basic expressions involving just addition , multiplication, and grouping

So lets start out with some very simple examples of order of operations in javaScript, then cover some more complex real examples later in this post. That being said if an expression contains addition first and then multiplication from left to right, then the multiplication operation will be preformed first and then the addition. The reason why is because multiplication and division have a higher precedence value then that of addition and subtraction. If for some reason I want the addition to happen first then I  will want to use parentheses or group operators to achieve just that. Changing the placement of the operators in the expression from left to right will not make a difference, because it will not change the situation with operator precedence the multiplication operation will still be preformed first. 

So a good javaScript example of this would be something like this.

```js
console.log( 10 + 5 * 2 ); // 20
console.log( 5 * 2 + 10 ); // 20
console.log( (10 + 5) * 2 ); // 30
```

The reason why is because parentheses have the highest precedence value of all when it comes to the order of how operations are preformed with javaScript expressions. So this will help to bump up the precedence value of the addition operation above that of the multiplication. Because multiplication has a higher precedence value than addition I will always want to use the group operator to preform a sum first if that is what needs to happen.

### 1.2 - Unnecessary grouping

To know if grouping with parentheses is really needed or not it is just a matter of know what comes first and to know that you just need to review what the precedence values are for each operator that is to be used an expression. Using a group operator where it is not needed might not change the outcome, and it might help to make the code more readable for developers that do not understand order of operations as well as they maybe should. However it still might be best to just understand order of operations so that unneeded use of group operators does not end up happening.

## 2 - Associativity of operators

So Associativity is the direction in which operations are preformed such as left to right, or right to left. Operators like addition, subtraction and so forth have left to right associativity. However other operators such as the assignment, and [logical not](/2019/10/14/js-not/) operator have right to left Associativity.

So subtraction is a good example of an operator where associativity matters because taking 2 from 5 is not the something as taking 5 from 2.

```js
var a = 5 - 2;
var b = 2 - 5;
 
console.log(a,b); // 3 -3
```

Here subtraction is an example of left to right associativity, you start with 5 and then subtract 2 in the first example, things flow from left to right.

### 2.2 - right to left

Although many operators have left to right associativity, many have the inverse of this also. One example is the logical not operator. This operator converts and inverts the boolean value of the value that is given to it at the right of it. If a value is given to the left that will result in an error.

```js
var bool = !0;
console.log(bool); // true
try {
    eval('0!');
} catch (e) {
    console.log(e.message); // Unexpected token !
}
```

## 3 - The javaScript precedence values

There are twenty levels of operator precedence in javaScript, and operators with a higher precedence value will be preformed first over those with a lower precedence value. In addition the associativity is different depending on the operator as well, however most of the operators typically used when writing expressions have left to right associativity. In this section I will be going over some of the operators in order of the precedence value.

### 3.1 - Grouping - (Precedence 21 highest, preformed first)

Parentheses in javaScript are used to make function calls, however they also have another purpose when it comes to grouping an expression. In other words a pare of parentheses by itself is considered a so called [grouping operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Grouping), and when it comes to authoring any kind of expression in javaScript this grouping operator has the highest operator precedence of all the available operators in javaScript.

```js
let a = !0 + 1 * 5,
b = !(0 + 1) * 5;
 
console.log(a, b); // 6 0
```

Here in the first expression the logical not operator is preformed first because it has a value of 16, and multiplication is 14. So then not 0 converts to the boolean value true, then the multiplication operation is preformed resulting in 5. Finally the true boolean value is added to 5, when doing so true converts to the number 1 resulting in a number value of 6. 

By grouping the 0 and one together the addition operation is now preformed first because the grouping precedence value of 20 superseding the value of the logical not operator again at 16. So now when the logical not operator is preformed this results in not 1 which results in a false boolean value that will convert to 0 when converted to a number, resulting in zero being multiplied by 4 which is 0. So no matter what else is going on anything inside the parentheses or grouping if you prefer will be preformed first.

### 3.2 - Function calls, new with arguments, and more ( Precedence 20 )

Grouping hands down does have the highest precedence in javaScript, but right behind it is the call of a [function in javaScript](/2019/12/26/js-function/). So any additional expression within a function call will be preformed first in most situations unless it is superseded by grouping of course. For this example I am using an [arrow function](/2019/02/17/js-arrow-functions/) that just returns a number that is passed as an argument, if the number that is passed as an expression then that expression will be evaluated first, so then that results in a similar result to that of grouping.

```js
// simple echo function
let echo = (n) => {
    return n;
};
console.log(3 + echo(7 - 3) * 5); // 23
console.log(3 + 7 - 3 * 5); // - 5
console.log(3 + (7 - 3) * 5); // 23
```

### 3.3 - New operator without arguments ( Precedence  19 )

The new operator is used with a constructor function as a way to create a new instance of that constructor function. There are many built in constructor functions such as the Date and Array constructor, but it is also possible to create a user define constructor function also. The Precedence of the new keyword is just below that of a function call, but still fairly high so that if I am creating a new instance of an object in an expression more often then not that will be preformed first in many expressions in which I would do such a thing.

```js
// the new keyword is used to create custom objects
var MyObj = function(n){
    this.n = n;
};
MyObj.prototype.valueOf = function(){
    return this.n;
}
 
let a = new MyObj(5 + 10) * 2
console.log(a); // 30
 
let b = new MyObj(5) * (10 + 2);
console.log(b); // 60
```

### 3.4 - Postfix Increment and postfix decrement ( Precedence 18 )

There are the increment and decrement operators that are two plus signs, or negative signs. This operator can be placed before of after a variable that is to be incremented or decremented. If one of them is used after a variable then it is postfix and has a precedence value of 17.

### 3.5 - Logical Not, bitwize not, and more ( Precedence  17 ).

Here we have the logical not operator that is one such operator that i find myself using the most often in this group. So when working out an expression any values that have there truth values inverted will be preformed before addition or subtraction. However although addition both in terms of numbers and strings will be preformed afterworlds, this group contains both Unary Plus, and Negation as well as Prefix Increment and Decrement.

### 3.6 - The Exponentiation operator( Precedence 16 )

Two multiplication operators can be used as a short hand for the Math.pow method. When doing this it will have a higher precedence over that of plain old multiplication.

```js
var a =  2 * 2 ** 3,
b = (2 * 2) ** 3;
 
console.log(a); // 16
console.log(b); // 64
```

### 3.7 - Multiplication, Division, and Remainder ( Precedence 15 )

The arithmetic operations of multiplication, division and remainder have a Precedence 15 which is one level above that of addition and subtraction. This is then one of the most commonly used set of expressions so it is a good idea to get this one solid at least when it comes to various expressions that involve addition, and subtraction with multiplication, and division.

### 3.8 - Addition and subtraction ( Precedence 14 )

Addition and subtraction have a Precedence of 14 so these operations will be preformed after Multiplication, Division, and Remainder.

### 3.9 - Bitwise Shift operators ( Precedence 13 )

Bitwise Shift operators are a way to shift the binary values of of numbers to the right or left. When using these they have an even lower Precedence to that of addition, subtraction, division and so forth. So be sure to use the grouping operator as needed when working out expressions with them.

```js
console.log( 6 << 2 ); // 24
console.log( 3 + 3 << 2 ); // 24
console.log( 3 + (3 << 2) ); // 15
```

### 3.10 - Less Than, less than or equal, greater than, ect ( Precedence 12 )

The less than, greater than, less than or equal to, and greater that or equal to operators have a Precedence of 12. This level or Precedence also includes the in an instance of operators also.

```js
console.log( (3 + 3) * 10 >= 60 ); // true
console.log( 3 + 3 * 10 >= 60 ); // false
```

### 3.11 - Equality, Inequality, as well as Strict Equality ( Precedence 11 )

The equality, inequality, as well as the strict forms of these operators have a Precedence value of 11.

```js

console.log( 2 << 1 === 2 + 2 ); // true
console.log( 2 >> ( 1 === 2 ) + 2 ); // 8
console.log( 2 >> ( 1 === 1 ) + 2 ); // 16

```

### 3.12 - Bitwise AND ( Precedence 10 )

The bitwise AND operator will return a bit value of 1 in each bit position for which the corresponding bits of both operands are also a bit value of 1. This is one of many bitwise operators in javaScript that will come up for certain expressions now and then. So then because this operator has lower Precedence of operators like additional it is impotent to keep that in mind when fiddling with an expression that makes use of this.

```js
// Logical AND Example
console.log( 10 & 3 ); // 2
// addition preformed first
console.log( 10 & 2 + 1 ); // 2
console.log( ( 10 & 2 ) + 1 ); // 3
```

### 3.13 - Bitwise XOR ( Precedence 9 )

### 3.14 - Bitwise OR ( Precedence 8 )

### 3.15 - Logical AND ( Precedence 7 )

### 3.16 - Logical Or ( Precedence 6 )

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

### 3.17 - Nullish coalescing operator ( Precedence 5 )

### 3.18 - Conditional ( Precedence 4 )

I often seen Conditional operators used in expressions. When using them any expression that comes first will typically be preformed first because just about all other operators typically used to write expressions have higher precedence.

```js
let a = 10;
console.log(  a > 5 ? true : false ); // true
console.log(  a * 2 > 5 ? 1 : 0 ); // 1
console.log(  a * (2 > 5) ? 1 : 0 ); // 0
```

### 3.19 - Assignment ( Precedence 3 )

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

### 3.20 - yield ( Precedence 2 )

### 3.21 - Comma ( Precedence 1 )

## 4 - javaScript order of operations examples

So now that we know the basics when it comes to order of operations in javaScript lets take a look at some actual code examples when it comes to some lengthly expressions with more than one operator. Looking at a few examples here and there when it comes to this sort of thing is a good starting point. However in order to really get this sort of thing solid the best way to go about learning might be to learn by doing. Learning everything there is to know about order of operations and javaScript expressions will take time, but it is also something that one will just start to get the hand of while working on an actual project or two of one kind or another.

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

### 4.4 - Finding out a monthly payment for a mortgage

Here is yet another real world example that is a function that helps figure the monthly payment of a [fixed rate mortgage](https://en.wikipedia.org/wiki/Fixed-rate_mortgage).

```js
var payment = (apr, years, prin) => {
    // monthly interest rate
    var monthRate = apr / 100 / 12;
    // return monthly payment
    return monthRate / (1 - Math.pow((1 + monthRate), (-years * 12))) * prin;
};
 
console.log(payment(3.75, 10, 25000).toFixed(2));
// '250.15'
```

## 5 - Conclusion

So order of operations in javaScript is not so hard to understand when one takes the time to just sit down, study, and work out a few examples. It might take a while, but eventually I have started to get more proficient at writing expressions with javaScipt using grouping operators only when they are needed as I understand the order of operations as well as associativity of operators. 

Reading a post or two on the subject such as this one might help, but what will really help is to just get busy working on your own exercises and projects. There are many instance where I need to work out a lengthly expression, and when doing so it is yet another opportunity to exercise order of operations with javaScript.

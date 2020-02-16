---
title: Operator precedence AKA order of operations in javaScript
date: 2019-02-02 20:53:00
tags: [js]
layout: post
categories: js
id: 371
updated: 2020-02-16 08:08:52
version: 1.49
---

When writing javaScript expressions knowing the order in which operations are preformed is important to make sure that desired results will always be achieved, this is often called [operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence), or just simply order of operations. Each type of operator has a kind of precedence or level of importance compared to others, as such operators of higher precedence are preformed before operators of lower precedence. In addition to this operator precedence there is also associativity of operators as well, that is the direction from left to right or the inverse of that when it comes to preforming operations.

For example multiplication is always preformed before addition, and a lengthy expression that is contained within a grouping operator is preformed before any additional operations that are to be preformed outside of it. Many operators are preformed from left to right when it comes to associativity, but this is not always the case with many others. So then in javaScript operator precedence, and associativity is something that a developer should have a sat least some grasp on as it will come up when authoring or studying expressions in a project. 

In this post I will be going over many examples of order of operations in JavaScript that should help with gaining at least a basic understanding of that topic, as well as associativity, and maybe some other little things here that I will likely branch off into when it comes to writing some actual real functioning examples of order of operations and javaScript code.


<!-- more -->

## 1 - Order of operations basics in javaScript

So lets start out with some very simple examples of order of operations in javaScript, then cover some more complex real examples later in this post. That being said if an expression contains addition first and then multiplication from left to right, then the multiplication operation will be preformed first and then the addition. The reason why is because multiplication and division have a higher precedence value then that of addition and subtraction. If for some reason I want the addition to happen first then I  will want to use parentheses or group operators to achieve just that. Changing the placement of the operators in the expression from left to right will not make a difference, because it will not change the situation with operator precedence the multiplication operation will still be preformed first. 

So a good javaScript example of this would be something like this.

```js
console.log( 10 + 5 * 2 ); // 20
console.log( 5 * 2 + 10 ); // 20
console.log( (10 + 5) * 2 ); // 30
```

The reason why is because parentheses have the highest precedence value of all when it comes to the order of how operations are preformed with javaScript expressions. So this will help to bump up the precedence value of the addition operation above that of the multiplication. Because multiplication has a higher precedence value than addition I will always want to use the group operator to preform a sum first if that is what needs to happen.

So there is the question of what operators are preformed first \([operator precedence aka order of operations](https://en.wikipedia.org/wiki/Order_of_operations)\), and then also the direction in which they are preformed as well \( [associativity](https://en.wikipedia.org/wiki/Operator_associativity) \). To know if grouping with parentheses is really needed or not it is just a matter of know what comes first and to know that you just need to review what the precedence values are for each operator that is to be used an expression.

## 2 - Associativity of operators

So Associativity is the direction in which operations are preformed such as left to right, or right to left. Operators like addition, subtraction and so forth have left to right associativity. However other operators such as the assignment, and logical not operator have right to left Associativity.

So subtraction is a good example of an operator where associativity matters because taking 2 from 5 is not the something as taking 5 from 2.

```js
var a = 5 - 2;
var b = 2 - 5;
 
console.log(a,b); // 3 -3
```

Here subtraction is an example of left to right associativity, you start with 5 and then subtract 2 in the first example, things flow from left to right.

## 3 - The javaScript precedence values

There are twenty levels of operator precedence in javaScript, and operators with a higher precedence value will be preformed first over those with a lower precedence value. In addition the associativity is different depending on the operator as well, however most of the operators typically used when writing expressions have left to right associativity. In this section I will be going over some of the operators in order of the precedence value.

### 3.1 - Grouping - Precedence 20 ( highest, prefromed first)

Parentheses in javaScript are used to make function calls, however they also have another purpose when it comes to grouping an expression. In other words a pare of parentheses by itself is considered a so called [grouping operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Grouping), and when it comes to authoring any kind of expression in javaScript this grouping operator has the highest operator precedence of all the available operators in javaScript.

```js
let a = !0 + 1 * 5,
b = !(0 + 1) * 5;
 
console.log(a, b); // 6 0
```

Here in the first expression the logical not operator is preformed first because it has a value of 16, and multiplication is 14. So then not 0 converts to the boolean value true, then the multiplication operation is preformed resulting in 5. Finally the true boolean value is added to 5, when doing so true converts to the number 1 resulting in a number value of 6. 

By grouping the 0 and one together the addition operation is now preformed first because the grouping precedence value of 20 superseding the value of the logical not operator again at 16. So now when the logical not operator is preformed this results in not 1 which results in a false boolean value that will convert to 0 when converted to a number, resulting in zero being multiplied by 4 which is 0. So no matter what else is going on anything inside the parentheses or grouping if you prefer will be preformed first.

### 3.2 - Function calls Precedence ( 19 )

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

### 3.3 - New operator without arguments ( 18 )

It is possible to use the new operator without arguments when this is the case it results in the new operator having a precedence value of 18.

### 3.4 - Postfix Increment and postfix decrement ( 17 )

There are the increment and decrement operators that are two plus signs, or negative signs. This operator can be placed before of after a variable that is to be incremented or decremented. If one of them is used after a variable then it is postfix and has a precedence value of 17.

### 3.5 - Logical Or - Precedence 5

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

### 3.6 - Conditional - Precedence 4

I often seen Conditional operators used in expressions. When using them any expression that comes first will typically be preformed first because just about all other operators typically used to write expressions have higher precedence.

```js
let a = 10;
console.log(  a > 5 ? true : false ); // true
console.log(  a * 2 > 5 ? 1 : 0 ); // 1
console.log(  a * (2 > 5) ? 1 : 0 ); // 0
```

### 3.7 - Assignment - Precedence 3

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

### 4.4 - Finding out a monthly payment for a mortgage

Here is yet another real world example that is a function that helps figure the monthly payment of a [fixed rate mortgage](https://en.wikipedia.org/wiki/Fixed-rate_mortgage)

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

So order of operations in javaScript is not so hard to understand when one takes the time to just sit down, study, and work out a few examples. It might take a while, but eventually I have started to get more proficient at writing expressions with javaScipt using grouping operators only when they are needed as I understand the order of operations as well as associativity of operators. Reading a post or two on the subject such as this one might help, but what will really help is to just get busy working on your own exercises.
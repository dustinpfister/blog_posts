---
title: nth root of a number in javaScript
date: 2020-03-11 15:06:00
tags: [js]
layout: post
categories: js
id: 625
updated: 2021-11-06 13:12:48
version: 1.25
---

Often I end up using [Math.sqrt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt) in projects whenever I need to get the square root of a number. However what if I want the [nth root](https://en.wikipedia.org/wiki/Nth_root) of a number? Such as the cubed root of a number, or any other degree beyond of that of just the number 2 that is what I am set with when using the Math sqrt method. I can not say that I end up having to use this kind of method that often, but still there does not seem to be a built in mMath object method for it.

Well in this post I will be going over a quick example of how to go about working out a basic nth root method with just plain old javaScript by itself.

<!-- more -->

## 1- The Nth root basics in javaScript

In the Math object in core javaScript there are a number of useful methods that have to do with various subjects in math such a [Trigonometry](https://en.wikipedia.org/wiki/Trigonometry) such as [Math.atan2](/2019/03/19/js-math-atan2/), Math.cos, and so forth. There is also a square root method to work with, but there is not Cubed root, or Nth root method, so in this section I will be going over a simple way to go about making this kind of method when it comes to starting to create a collection of additional Math methods that might be needed here and there in various projects.


### 1.1 - nth root and math pow

One solution is to use the [Math.pow](/2019/12/10/js-math-pow/) method to get the nth root of a given root number and degree. This works by just passing the root number as the base for Math.pow, and then diving 1 by the degree number to get the exponent argument for the Math pow to get a value that can be the return value for nth root.

```js
var nthRoot = function (n, degree) {
    return Math.pow(n, 1 / degree);
};
 
console.log(Math.sqrt(25)); // 5
console.log(nthRoot(25, 2)); // 5
 
var n = nthRoot(25, 3);
console.log(n); // 2.924017738212866
console.log(n * n * n); // 24.999999999999996
n = nthRoot(25, 4);
console.log(n); // 2.23606797749979
console.log(n * n * n * n); // 25.000000000000007
```

So there we have it a basic nth root method that seems to work they way it should. However what is the big deal with nth root? Is there some kind of project where a Math method such as this would come into play? I Guess now it is a question of looking for and see about making artful and practical use case examples of nth root.

## 2 - Practical example of nth root

I am sure that there are many use case examples of nth root, but I would not be surprised if the bulk of them are artful examples rather than ones that might prove to be useful for some kind of real problem. There is however at least a [few practical examples of nth root however](https://www.quora.com/What-is-the-practical-usefulness-of-learning-the-Nth-root-of-a-number).

### 2.1 - Getting the base of a value that is the result of Math.pow

When it comes to using the Math.pow method the first argument that is given is a base, and the second argument that is given is an exponent. The resulted result of calling this method is then a power that is the given base that is then raised to the given exponent. So then there is the question of getting into [inverse functions](/2021/07/23/js-function-inverse/) for this function, that is having a function where if the exponent is known, but not the base, having a function where I can pass the power and the exponent to have the base returned. 

There is also the question of how to go about making another kind of function that will give me the exponent when all I know is the base and the power. I have found that the [Math log](/2018/12/26/js-math-log/) method can be used to make this kind of method.

```js
var nthRoot = function (n, degree) {
    return Math.pow(n, 1 / degree);
};
 
// get the base of a value if exp is known
var getBase = function (n, exp) {
    return nthRoot(n, exp);
};
// get exp of a value if the base is known
var getExp = function (n, base) {
    return Math.log(n) / Math.log(base);
};
 
// demos of getBase
console.log(getBase(Math.pow(7, 4), 4)); // 7
console.log(getBase(Math.pow(7, 5), 5)); // 7.000000000000001
console.log(getBase(Math.pow(7, 6), 6)); // 6.999999999999999
 
// demos of getExp
console.log(getExp(Math.pow(7, 4), 7)); // 7
console.log(getExp(Math.pow(7, 5), 7)); // 5.000000000000001
console.log(getExp(Math.pow(7, 6), 7)); // 6.000000000000001
```

### 2.2 -  Dealing with interest

One such example might have to do with compounding interest and that can often prove to be useful when it comes to figuring out something g that has to do with money, regardless of it is game money or real worked money. For example what if I want to know an interest rate that I need to see in order to double an investment of one hundred dollars over say seven years? I can pass 2 for the value of n, and 7 for the degree and get a value of around 1.104, or in another way 10.4%. I can then confirm this by using that value with the Math.pow method to see if it results in double the money, and when I do it indeed does given me just that.

```js
var nthRoot = function (n, degree) {
    return Math.pow(n, 1 / degree);
};
 
var getRate = function (times, years) {
    return nthRoot(times, years);
};
 
var getMoney = function (startAmount, rate, years) {
    return startAmount * Math.pow(rate, years);
};
 
var doubleRate = getRate(2, 7);
console.log(doubleRate); // 1.1040895136738123
 
console.log(getMoney(100, 1, 7)); // 100
console.log(getMoney(100, doubleRate, 7)); // 199.99999999999986
console.log(getMoney(100, 2, 7)); // 12800
```

## 3 - Conclusion

I can not say that I end up using this often in projects, but it is something that I think about now and then. If I find out some other ways to go about using nth root in projects that are helpful, or at least interesting I will be sure to update this post.

There is just having the basic idea at the ready though, which is one reason why I wrote this post. I like to have methods like this at the ready. In time I hope to find, and or make interesting code examples that make use of nth root and other Math methods. I am sure that there is some fun and interesting things that can be done with it when it comes to something artful.
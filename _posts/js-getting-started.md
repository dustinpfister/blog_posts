---
title: Getting started with javaScript
date: 2018-11-27 11:18:00
tags: [js]
layout: post
categories: js
id: 338
updated: 2020-09-21 13:42:25
version: 1.16
---

I have written many posts on [javaScript](https://en.wikipedia.org/wiki/JavaScript) related topics, but so far oddly enough I have not written a [getting started post on javaScript](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics) until now of course. In this post I will offer some suggestions for getting started with javaScript that you can do right now from your desktop computer, without installing any additional software assuming you have a web browser and a text editor installed. In fact in some cases you just need a browser to get started when it comes to starting out in the javaScript console.

<!-- more -->

## 1 - What to know

I will not be covering everything there is to know of course, learning javaScript as with any programing language takes a whole lot of time and patience, as well as dedication. Still to get started with javaScript all that is needed is a computer with a fairly up to date web browser because in this post I will be writing about very simple examples that can be entered into [javaScript console of chrome](https://developers.google.com/web/tools/chrome-devtools/console/).

### 1.1 - Be sure to be using an up to date web browser if getting started with client side javaScript

In this post I am using Google chrome 70.x, and am using examples that can be copied and pasted into the javaScript console. The reason why is that I think the javaScript console is a good way to introduce people to javaScript that have no background with it at all. All that is needed is a web browser, and in addition you do not need to set up and account of any kind as well.

### 1.2 - Get node installed if you want to start with server side javaScript or use javaScript for general programing outside of a web browser.

If you want to get started with server side javaScript you will want to get node installed to do so. In this post I will not be getting to nodejs, but I have wrote a post on doing [just that](/2017/04/05/nodejs-helloworld/). It is nice to start out with client side javaScript first though as it is something that can be done right now with just a web browser. However I would not put off getting into nodejs as it can be used to do server side programing with javaScript, and can also be used to write command line tools, and get things done with all kinds of general programing tasks outside of the browser.

## 2 - Using the javaScript console

In this section I will be going over some simple starting examples that can be entered into the javaScript console right now in the browser that you are using. Assuming that you are using a fairly modern web browser that has one such as Google chrome. I have [wrote a post in which I get into using the javaScript console in detail](/2019/07/29/js-getting-started-javascript-console/), however it is still worth mentioning here also.

To use the javaScript console in chrome I just need to do a ctrl+shift+j (windows/linux) on my keyboard when I have a new tab open. This can also be done at any site as well, and the scripts that are entered operate within the domain of that site. Which is why you get a warning if you do it from certain sites like facebook. In this post I will just be covering some simple examples that do not do anything malicious, however certain forms of hacking is possible from the javaScript console. So do not copy and paste code form just anywhere into it, unless you know what it does.

### 2.1 - Some simple expressions

Lets start out with some simple [expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators). Expressions are a series of values, variables and operators that evaluate to a value. They can end up being very complex, or very simple. So in the javaScript console just enter 5 + 5, and hit return, as expected the answer is 10. Now enter 5 + "5" and the answer is the string "55" the reason why this is is because 5 is a number and "5" is a string.

```js
> 5 + 5
< 10
> 5 + "5"
< "55"
```

### 2.2 - Operator precedence, and grouping

One thing I think javaScript developers should get straight right away is [operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence), or just simple order of operations. That is the order in which different operations are preformed when working out a lengthly expression that will produce some kind of product. Each operator in javaScript has a certain precedence over others, for example multiplication and devision is preformed before addition and subtraction. 

There are a lot of operators and over twenty different levels of operator precedence in javaScript, along with associativity. That is the direction in which operators are preformed. Generally the associativity of most operators is from left to right, but there are some where the opposite flow is what is in effect. I will not be getting into all of this in depth here as I have done so elsewhere, and this is just one of many rabbit holes that come up when it comes to learning to code. However in this getting started post on javaScript it would not hurt to play around with a few simple examples that have to do with just addition, subtracting, multiplication, and grouping.

 
```js
> 5 + 10 * 3 - 1;
< 34
> (5 + 10) * 3 - 1;
< 44
> 5 + 10 * (3 - 1);
< 25
> (5 + 10) * (3 - 1);
< 30
```

Expressions in javaScript are evaluated from left to right, however operators of higher precedence are preformed first. Because multiplication has a higher precedence then addition and subtraction 10 * 3 is preformed first, and then the normal flow from left to right happens.

If for some reason I want to preform the addition first I can either change the order or use [parentheses](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Grouping)

```js
> (5 + 10) * 3 - 1
< 44
```

### 2.3 - Creating and using a function

Now to create something useful. Say you have a website that is getting ten thousand visitors a month, and you want to know how many visitors a month you might see in a few months if you can maintain a certain average rate of growth each month. A function can be authored to do something like that, and then copied and pasted into the console. Once it is copied into the console it can be called with arguments passed to it that contain the starting traffic, average rate of growth, and the number of months that I want to project.

```js
> var projectGrowth = function (opt) {

    opt = opt || {};

    opt.start = opt.start || 10000;
    opt.growth = opt.growth || 1.25;
    opt.months = opt.months || 6;

    return Math.floor(opt.start * Math.pow(opt.growth, opt.months));

};
< undefined
> projectGrowth({

        start: 10000,
        growth: 1.1,
        months: 3

    });
> 13310
```

## 3 - Conclusion

Getting started with javaScript is not so hard, it just takes time and patience. There is a great deal more to write about when it comes to making an actual project of some kind, but for the sake of keeping this post simple I just covered a few pointers for now. This is a post that I will come back to at some point to revise, and expand. If you are new to javaScript and have anything I think I should add please let me know in the comments.

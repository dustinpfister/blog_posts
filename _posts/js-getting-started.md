---
title: Getting started with javaScript
date: 2018-11-27 11:18:00
tags: [js]
layout: post
categories: js
id: 338
updated: 2018-11-27 12:51:00
version: 1.8
---

I have written many posts on [javaScript](https://en.wikipedia.org/wiki/JavaScript) related topics, but so far oddly enough I have not written a getting started post on javaScript until now of course. In this post I will offer some suggestions for getting started with javaScript that you can do right now from your desktop computer, without installing any additional software assuming you have a web browser and text editor installed, and in some cases you just need a browser to get started.

<!-- more -->

## 1 - What to know

I will not be covering everything there is to know of course, learning javaScript as with any programing language takes a whole lot of time and patience, as well as dedication. Still to get started with javaScript all that is needed is a computer with a fairly up to date web browser because in this post I will be writing about very simple examples that can be entered into javaScript console of chrome.

### 1.1 - Be sure to be using an up to date web browser

In this post I am using Google chrome 70.x, and am using examples that can be copied and pasted into the javaScript console. The reason why is that I think the javaScript console is a good way to introduce people to javaScript that have no background with it at all. All that is needed is a web browser, and in addition you do not need to set up and account of any kind as well.

## 2 - Using the javaScript console

To use the javaScript console in chrome I just need to do a ctrl+shift+j on my keyboard when I have a new tab open. This can also be done at any site as well, and the scripts that are entered operate within the domain of that site. Which is why you get a warning if you do it from certain sites like facebook. In this post I will just be covering some simple examples that do not do anything malicious, however certain forms of hacking is possible from the javaScript console. So do not copy and paste code form just anywhere into it, unless you know what it does.

### 2.1 - Some simple expressions

Lets start out with some simple expressions. Expressions are a series of values, variables and operators that evaluate to a value. They can end up being very complex, or very simple. So in the javaScript console just enter 5 + 5, and hit return, as expected the answer is 10. Now enter 5 + "5" and the answer is the string "55" the reason why this is is because 5 is a number and "5" is a string.

```js
> 5 + 5
< 10
> 5 + "5"
< "55"
```

### 2.2 - Operator precedence, and grouping

One thing I think javaScript developers should get straight right away is [operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence). That is the order in which operations are preformed. Each operator in javaScript as a certain precedence over others, for example multiplication and devision is preformed before addition and subtraction.

```js
> 5 + 10 * 3 - 1
< 34
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

---
title: js eval function for executing a string representation of javaScript
date: 2019-09-09 20:31:19
tags: [js]
layout: post
categories: js
id: 532
updated: 2021-11-21 17:40:07
version: 1.27
---

In javaScript there is the [eval function](https://en.wikipedia.org/wiki/Eval) that can be used to execute a string representation of some javaScript code. It is generally something to be avoided for various reasons, and it it really must be used should be used with care. In projects where the string value is passed from user input there is the risk of introducing security problems if the input is not sanitized. In general if you can find a way to do what you want to do with eval by some other means do that instead.

There are other ways of evaluating javaScript code that involve other aspects of native javaScript such as the function constructor, as well as user space modules like jsdom. There is also ways or making parsers that will act as a way to make my own domain specific language rather than using eval to run javaScript code in string format. However that is a matter for a whole other post on something other than js eval.

The eval function should not be used if it can be avoided, the use of the eval function can slow things down, and can also open up some security concerns. I can not say that I use eval often, and even when I am in a situation in which I seems like I need to use it I do what I can to look for other options. Still this is a post on js eval, so then this will be a post on some of the ins and outs of the js [eval function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval) for what it is worth.

<!-- more -->

## 1 - Basics of js eval

In this section I will be starting out with just a few basic examples of eval in core javaScript as such these examples should work in just about all javaScript environments. Although I will be keeping these examples fairly simple I assume that you have at least some background with [javaScript when it comes to getting started](/2018/11/27/js-getting-started/). There is more than one way of getting started of course beyond just the way that you might have started with javaScript. For example I have started by writing html files with embedded script tags and [opening them up in a web browser using the file protocol](/2020/09/21/js-getting-started-file-protocol/). However it is also possible to get started in the [javaScript console of a web browser](/2019/07/29/js-getting-started-javascript-console/), or use [nodejs](/2017/04/05/nodejs-helloworld/) and just write sever side scripts outside of a web browser.

### - Source is up on github

As with all [my other posts on vanilla javaScript](/categories/js/), the source code examples here can be found in my [test vjs repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-eval) on Github. I do get around to editing and expanding my content on subjects such as eval and much more, and this repository would be where to make a pull request of you are on Github. There is also the comments section of this post that can be used as a way to bring something up, I have a lot of other things to do, but I will end up coming around to it sooner or later.

### 1.1 - js eval basic example

For a basic example of the js eval function I just stared out with a string of a very simple javaScript expression and passed that to the eval function. After doing so the result of that expression is returned to which I then just logged to the console.

```js
var str = '2+2';
console.log(str);
// '2+2'
console.log(eval(str));
// 4
```

So that is the basic idea of eval, it is just a ay to go about evaluating some javaScript code in a string format. There are other ways of doing just that such as with the Function constructor. However if I am ever in a situation in which i thing I might need to use eval or the function constructor I take a moment to try to find another way of doing so. It is generally agreed that the use of these options for running javaScript code can bring up both security and performance concerns that can often be avoided.

### 1.2 - js eval can create variables in the scope in which it is used

When the js eval function is used with a string of javaScript that contains the use of the var keyword to create a variable, and it is not used in strict mode, this can result in a variable being created in the scope in which eval is used.

```js
// when using var in Non-strict mode eval
// can create variables in the scope in which it is used
eval('var n = 42;');
console.log(n);
```

This is one weird thing about the use of eval that a developer should be ware of when using it. Also again about using eval, if you can every thing of any way to go about not using it do that instead, and not just for this reason.

## 2 - Other ways to evaluate a little javaScript

There are a number of other ways to evaluate a little javaScript, often in the form of a string value that needs to be evaluated. In this section I will be going over what some of these options might be. Now all of these options will be available in all environments, for example in client side javaScript I might be able to use the Function constructor as a way to evaluate a javaScript string, but I can not use the e option of the nodejs binary in such an environment.

### 2.1 - The Function Constructor

One way other than eval would be to use the Function constructor where the body of javaScript code that would compose the function can be passed as a string to the Function constructor when it is called with the new keyword. This can then be used to evaluate a javaScript string by just appending what I want to evaluate with a return to make the result of the javaScript string the return value of the resulting function that will be returned by the constructor. I can then just simple call the function that is the result of doing this.

```js
var str = ' 2 + 2 ';
// Using the Function constructor
var func = new Function('return ' + str);
console.log(func()); // 4
```

### 2.2 - The e option of the nodejs binray

When it comes to using node there is the e option of the node binary that can be used to run a little javaScript code that is given in the from of a string after the option when calling node from the command line.

```
$ node -e "console.log(2 + 2)"
4
```

## 3 - Conclusion

The use of eval is something that I can not say I use very often, or at all actually. There is generally always a way to go about not using it, and if so that is most likely the way that it should be done. Still it is nice to know that it is there when and if I am in a situation in which there is no other option. Using eval and the function constructor just does not strike me as a way that I should be writing and using javaScript, and there are additional concerns about using it that I have not covered in this post.
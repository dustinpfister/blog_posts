---
title: lodash has method
date: 2019-05-15 14:04:00
tags: [lodash]
layout: post
categories: lodash
id: 448
updated: 2020-11-25 09:40:44
version: 1.9
---

This will be a quick post on the [lodash has](https://lodash.com/docs/4.17.11#has) method, a simple object method that can be used to check if an object has a certain path in it or not. That is you pass a string that contains property names separated with dots to a certain value that is in the object. In the event that it is there then the lodash has returns true otherwise it will return false. So it is just a way to go about testing for a property of an object by way of a string value rather than an actual javaScript property syntax.

This is one of many methods in lodash that accept a string form of a object path to a value. Another such method of note in lodash would be the [\_.get](/2018/09/24/lodash_get/), and [\_.set](/2018/12/04/lodash_set/) methods. This is not one of the most compelling methods in lodash, in fact when it comes down to it there are only really a handful that I find myself still  using in projects. Still when it comes to gaining a comprehensive understanding of everything available within lodash it makes sense to not just write about the popular, or often used methods. Also maybe there are some situations in which it is nice to test for a object property by way of a string.

<!-- more -->

## 1 - lodash has in a nut shell

So the lodash has method can be used by just passing an object followed by a string that represents the path of a property of an object. In the event that the property is there it will return true, else it will not.

```js
let obj = {
    foo: {
        bar: {
            x: 40,
            y: 2
        }
    },
    dust: {
        in: {
            the: {
                wind: 'that is all we are'
            }
        }
    }
};
 
console.log( _.has(obj, 'dust.in.the.wind') ); // true
console.log( _.has(obj, 'dust.in.x') ); // false
console.log( _.has(obj, 'foo.bar.x') ); // true
```

So this object method can be used as a way to feature test if a path exist in an object and if not can be used with another method like the lodash set method to set the path. If you are more interested in what lodash has to offer in general you might want to check out my main post on [lodash](/2019/02/15/lodash/).

## 2 - AutoHeal example of lodash has

Now that I have covered the basics of what the lodash has method does maybe it is called for for at least one example of why the lodash has method, or something like it, might come in handy. Say I have this project where I am dealing with a type of object that may, or may not have a bunch of nested objects as one of its properties. I can not just assume that the property will always be there and just get the value, that would result in an error. So I must test for the property first before attempting to get any value that might be there.

In this section I will be going over a simple vanilla javaScript example where I am dealing with some objects that might have a features object, and in that object there might be an auto heal object, and in that object there should be values that contain values for what will become an auto heal feature. I will be going over a vanilla javaScript example of this, and then move on to a slight change where I am using the lodash has method.

### 2.1 - The vanilla javaScript

Here I have the vanilla javaScript example of this auto heal example. I have two display objects, one of which does not contain a features object, and another one that does. When making my apply auto heal method I first need to check for the features object, then the auto heal object, and then finally an amount. This is done by having a bunch of nested if statements.

```js
var dispObj1 = {
    x: 10,
    y: 45,
    hp: {
        current: 10
    }
};
 
var dispObj2 = {
    x: 10,
    y: 45,
    hp: {
        current: 10
    },
    features: {
        autoHeal: {
            amount: 10
        }
    }
};
 
var applyAutoHeal = function (dispObj) {
    if (dispObj.features) {
        if (dispObj.features.autoHeal) {
            if (dispObj.features.autoHeal.amount) {
                dispObj.hp.current += dispObj.features.autoHeal.amount;
            }
        }
    }
};
 
applyAutoHeal(dispObj1);
applyAutoHeal(dispObj2);
 
console.log(dispObj1.hp.current, dispObj2.hp.current); // 10 20
```

Although this does work okay, it does strike me as being a bit messy. I also would have to do this in every part of the body of code of the project where doing this kind of check is required. As such it would be nice to have a way to make this kind of thing a little bit more clean and readable.

### 2.2 - Using lodash has in the apply auto heal method

By making use of the lodash has method this makes the code of my apply auto heal method for more concise.

```
var applyAutoHeal = function (dispObj) {
    if (_.has(dispObj, 'features.autoHeal.amount')) {
        dispObj.hp.current += dispObj.features.autoHeal.amount;
    }
};
applyAutoHeal(dispObj1);
applyAutoHeal(dispObj2);
console.log(dispObj1.hp.current, dispObj2.hp.current); // 10 20
```
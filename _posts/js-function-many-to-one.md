---
title: Many to one functions in javaScript
date: 2021-07-29 14:36:00
tags: [js]
layout: post
categories: js
id: 921
updated: 2021-07-31 12:00:30
version: 1.10
---

This week I have been looking more into writing [functions in javaScript](/2019/12/26/js-function/), and as such I have also touched base on many topics that have to do with functions in general. One such topic is knowing what a [many to one function is compared to a one to one function](https://www.quora.com/What-are-one-to-one-and-many-to-one-functions), along with many other topics such as what an independent variable is compared to a dependent variable, and what function domain and co domain is. These are all topics that have to do with functions in javaScript, but also functions in any language for that matter actually.

So in todays post I will be focusing mostly on what a [many to one function is](https://mathworld.wolfram.com/Many-to-One.html), which may some times also be freed to as a [surjective function](https://en.wikipedia.org/wiki/Surjective_function). Say you have a function that takes just one argument that is x, and will return a value that can be thought of as a y value. On top of this lets say that for any given x value that is passed to the function, there may be more than one other x value that will result in the same y value returned. Such a function is a many to one type function, rather than what would be called a [one to one function](/2021/07/30/js-function-one-to-one/). So then it is not possible to create an [inverse function](/2021/07/23/js-function-inverse/) for a many to one function, as there would be a range of possible return values for a given known argument value, while it should be possible to create an inverse for a one to one function. In any case in todays post I will be writing many just about the topic of many to one.

<!-- more -->

## 1 - basic example of many to one function

For a basic example of a many to one function take into account this function that will take a degree value, and create a radian value from that degree value, and pass the result to Math.sin, the result of which will be the return value of the function. When I pass a degree value of 45 for this function that return value is 1, when I pass the degree value of 450 the return value is again 1.

```js
var dSin = function(d){
    return Math.sin(Math.PI / 180 * d);
};
// two values for the independent variable d
// will result in the same dependent value being returned
console.log( dSin(90) );  // 1
console.log( dSin(450) ); // 1
```

## 2 - Conclusion

So the concept of a many to one function is related to the concept of a one to one function, and a one to one function is the kind of function that I need to write when it comes to having an inverse function. When it comes to a many to one function it is not possibility to cerate an inverse function for it, or at least I should say that the return value of an inverse function of a many to one function would be some kind of function that would return an array of possibles for an unknown given a known for the inverse function.

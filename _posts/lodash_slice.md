---
title: The _.slice method in lodash
date: 2020-12-01 13:17:00
tags: [lodash]
layout: post
categories: lodash
id: 752
updated: 2020-12-01 13:40:57
version: 1.1
---

In native jaavScript there is the Array slice method that will return a new array from another arary without mutating the array in place. There is also yet another method in the core javaScript Array prototype object called splice that does more or less the same thing as Array slice only it will mutate the array in place. This however is a post on the array slice method in lodash that is not just a refernce to the native Array slice method.

<!-- more -->

## 1 - Lodash slice basic example

If you all ready know about the Array slice method the lodash slice method works in just about the same way when it comes to the index value that you give to it. First the array that I want to slice must be given as the first arguemnt, and then the starting and ending index values.

```
let a =  [1,2,3,4];
let b = _.slice(a, 1, 3);
 
console.log(a); // [ 1, 2, 3, 4 ]
console.log(b); // [ 2, 3]
```

That is all there is to it really when it comes to just the basics of how to use the method. However there is more to write about whe it comes to this of course. There is the question of why one should bother using this method at all when the native Array slice method wil work just fine. There might be some additional talking points about that as it would seem that the lodash slice method is not just an abstraction of the native array slice method. So the rest of this post will be centered around the native Array slice method and how it compares to this lodash slice method in some situations.


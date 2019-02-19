---
title: javaScript break statement examples
date: 2019-02-19 12:02:00
tags: [js]
layout: post
categories: js
id: 386
updated: 2019-02-19 13:57:28
version: 1.1
---

The break statement in javaScript can be used to break out of a loop. It can also be used in combination with labels to break a specific loop from within two or more nested loops. There are other ways to break a loop as well, such as using the return keyword within the body of a function for example, and there is also the continue keyword as well that can be used to skip a body of code and continue a loop as well. In this post however I will be focusing on the break statement and some basic use case examples as to why it might come in handy now and then.

<!-- more -->

## 1 - javaScript break

The break keyword can be used to break out of a loop when a certain condition is met.

```js
let arr = [3, 'foo', 4],
i = arr.length;
while (i--) {
    if (typeof arr[i] === 'string') break;
}
console.log(i); // 1

```
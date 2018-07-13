---
title: The lodash _.sample method for simpler sampling
date: 2018-07-13 12:34:00
tags: [js,lodash]
layout: post
categories: lodash
id: 234
updated: 2018-07-13 12:46:06
version: 1.0
---

Time for another post on [lodash](https://lodash.com/) becuase it is very popular, and it is still useful. Regardless of what people say methods like [\_.sample](https://lodash.com/docs/4.17.4#sample) help to make coding in javaScript faster, and more concise. In this post I will be writing about \_.sample, and also show some examples of why I do tent to prefer using lodash to help get things done faster, and focus more on what really matters.

<!-- more -->


## 2 - Basic example of \_.sample

So Sample is pretty straight forward, just give it an array, and it will return a random element from that array, a common task that comes up a lot when developing.

```js
let nums = [5, 42, -5, 7, 6, 3, 52, 27, 158, -1];
 
console.log( _.sample(nums) ); // (random element from nums)
```

### 2.1 - Compare to a vanilla js solution.

It's not like doing this in plain old javaScript is that hard, and if you are just using lodash for this method and nothing else, it is kind of overkill, unless you just use just this one method or some kind of equivalent.

```js
nums = [5, 42, -5, 7, 6, 3, 52, 27, 158, -1];
 
let si = Math.floor(nums.length * Math.random()),
samp = nums.slice(si,si+1)[0];
 
console.log(samp); // (random element from nums)
```

The think about this is that if I am going to bother with lodash, rather than going pure vanilla as some might say, I would of course use more than just one method, so maybe a more advanced example that makes use of a few lodash methods is in order to really see how lodash does in fact help.
---
title: The lodash _.fill method is a why bother with lodash method.
date: 2017-09-26 09:31:00
tags: [js,lodash,node.js]
layout: post
categories: lodash
id: 45
updated: 2017-10-02 09:50:56
version: 1.4
---

So lodash is one of those JavaScript projects that is a bit of a mystery when it comes to the question of it's value compared to just working within a plain old vanilla js environment. There are methods that come in handy, and really do provide something that is not just there in Array.prototype, however [_.fill](https://lodash.com/docs/4.17.4#fill) is not one of those, unless you care about browser support maybe.

<!-- more -->

## Array.fill

So Array.fill is a quick way to fill an array with the same value, say you have an array that represents the status of a byte of data, and you want all the elements set to 1.

```js
var byte = new Array(8).fill(1);
console.log(byte); // [1,1,1,1,1,1,1,1]
```

It is also possible to set a start and end point with the fill, but you get the idea. When it comes to a using a vanilla js method it is often important to know the browser support of that method, as such Array.fill is NOT supported in IE11.

## _.fill

So _.fill does the same thing, and lodash does work on IE11.

```js
var byte = _.fill(new Array(8),1);
console.log(byte); // [1,1,1,1,1,1,1,1]
```

## conclusion

So when I do come across methods like _.fill at that point there is the question about browser support. At that point it may be the only thing that comes to mind as to why it is that I should bother. If the support does go back a little then using methods like these do still make sense.

Be sure to check out my other [posts on lodash](/categories/lodash/)
---
title: Add js line breaks to strings
date: 2020-03-16 19:54:00
tags: [js]
layout: post
categories: js
id: 628
updated: 2020-06-21 15:44:23
version: 1.6
---

When working with string values it might be necessary to add some [js line breaks](https://stackoverflow.com/questions/4768118/how-to-break-line-in-javascript) to the string at the end or at any point where needed in the string. If you are not familiar with [escape notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) and strings in javaScript now might be the time to take a look at them for this reason as well as many others. 

There is more then one text pattern for line breaks depending on the operating system you want the content to work with. However for the most part you can get away with just using one or the other, many well designed applications are familiar with the different patterns ans will detect what the situation is. In any case this will be a quick post on line breaks and javaScript strings in both a nodejs and client environment.

<!-- more -->

## 1 - Js line breaks and escape notation

The first and for most way to go about injecting line breaks into strings would be to use javaScript escape notation. This kind of notation involves using a backslash followed by one or more additional characters to help inject any kind of character into a string including line breaks.

When it comes to windows style line breaks you will want  to start off with a carriage return follow by a new line. For posix style js line breaks forget the carriage return ans just inject a new line.

So the carriage return and new line escape notation can be used

```js
var eol = {
    win: '\r\n',
    posix: '\n'
},
os = 'win',
 
str = 'So this is one line. ' + eol[os] + 'And this is a new one. ' + eol[os];
 
console.log(str);
```

Or the utf-16 code unit escape notation will work also.

```js
var eol = {
    win: '\u000d\u000a',
    posix: '\u000a'
}
```

So these kinds of solutions will work well in general, but in a  nodejs environment there are some properties that are typically used. So lets look at just one more example at least when it comes to this sort of thing.

## 2 - The os module EOL property in nodejs

in node there is the End Of Line property of the os module. This property will hold a carriage return plus new line value for windows systems, and just a new line value for posix. In other words the value of the End Of line property will change depending on the underlaying operating system used.

If you want consistent values regardless of the operating system you might want to stick to escape notation.
```js
const os = require('os');
 
console.log(os.EOL === '\r\n'); // (true if windows)
console.log(os.EOL === '\n'); // (true if posix)
 
console.log( Buffer.from('\r\n').toString('hex') ); // 0d0a
console.log( '\u000d\u000a' === '\r\n'); // true
console.log( '\u000a' === '\n'); // true
 
let str = 'line one' + os.EOL +
'line two\r\n' +
'line three\n' +
'line four\u000d\u000a' +
'line five\u000a'+
'end';
process.stdout.write(str);
```

## 3 - The decode URI Component method

Another options that comes to mind is the [decode url component](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent) method.

```js
const eol = {
    win: decodeURIComponent('%0D%0A'),
    posix: decodeURIComponent('%0A')
}
 
console.log(Buffer.from(eol.win).toString('hex')); // 0d0a
```
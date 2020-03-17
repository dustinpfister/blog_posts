---
title: Add js line breaks to strings
date: 2020-03-16 19:54:00
tags: [js]
layout: post
categories: js
id: 628
updated: 2020-03-16 20:14:33
version: 1.2
---

When working out a string value it might be necessary to add some [js line breaks](https://stackoverflow.com/questions/4768118/how-to-break-line-in-javascript) to the string. If you are not familiar with [escape notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) and strings in javaScript now might be the time to take a look at them.

<!-- more -->

## 1 - Js line breaks and escape notation

```js
var eol = {
    win: '\r\n',
    posix: '\n'
},
os = 'win',
 
str = 'So this is one line. ' + eol[os] + 'And this is a new one. ' + eol[os];
 
console.log(str);
```

```js
var eol = {
    win: '\u000d\u000a',
    posix: '\u000a'
}
```

## 2 - The os module EOL property in nodejs

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

```js
const eol = {
    win: decodeURIComponent('%0D%0A'),
    posix: decodeURIComponent('%0A')
}
 
console.log(Buffer.from(eol.win).toString('hex')); // 0d0a
```
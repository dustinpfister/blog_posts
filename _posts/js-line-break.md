---
title: Add js line breaks to strings
date: 2020-03-16 19:54:00
tags: [js]
layout: post
categories: js
id: 628
updated: 2021-11-09 09:39:03
version: 1.14
---

When working with string values it might be necessary to add some [js line breaks](https://stackoverflow.com/questions/4768118/how-to-break-line-in-javascript) to the string at the end of a string, or at any point where needed in the string for that matter. In some cases these kinds of characters are added to the end of a string automatically when using something like the console log method in nodejs for example. When using console log a line break character is added to the end of the standard output each time it is called. If you do not want that to happen then there is using the write method of the [stdout property of the process object](/2021/03/18/nodejs-process-stdout/).

If you are not familiar with [escape notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) and strings in javaScript now might be the time to take a look at them for this reason as well as many others. Escape notation is a way to add any character into a string including characters that might be interpreted as a return, or a way to end a string in javaScript source code.

There is more then one text pattern for line breaks depending on the operating system you want the content to work with. However for the most part you can get away with just using one or the other, many well designed applications are familiar with the different patterns and will detect what the situation is and parse accordingly. However it still makes sense to be al least somewhat aware of what these patterns are, and which might be the best choice for a given situation.

In any case this will be a quick post on line breaks and javaScript strings in both a nodejs and client environment.

<!-- more -->

## 1 - Basics of Line breaks and escape notation in javaScript

The first and for most way to go about injecting line breaks into strings would be to use javaScript escape notation. There are other ways of doing so that might be a better choice when it comes to a nodejs environment, but even then you might still want to use escape notation over that in some situations. This kind of notation involves using a backslash followed by one or more additional characters to help inject any kind of character into a string including line breaks.

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

## 4 - Conclusion

having a way to find out if there is a line bake in a string is something that will come up from time to time when working out a script. In nodejs often the result of calling a command in a Linux environment will spit out results where each line is terminated with a line break, if I want to spit that output into an array I will need to know how to do that. In a Linux system the line break will typically be a single new line char, however in windows it might be a carriage return followed by a new line.

Knowing how to find out if there is a line break is important however knowing how to go about creating a line break in a string is also something that I need to do also. If I want to create a script that will do s replace all for some text from one kind of line break to another, it will require that I I not just know how to find line breaks, but also how to go about injecting one of the options that I would want to replace them. This if often a feature in most text editors, however if I where to write my own text editor a feature such as this is one thing that I would want to have in such an application.

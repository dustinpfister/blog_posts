---
title: Using ANSI escape codes in nodejs
date: 2019-09-19 13:47:00
tags: [node.js]
layout: post
categories: node.js
id: 537
updated: 2019-09-19 13:54:31
version: 1.1
---

The use of ANSI escape codes is what can be used to control the format and behavior of a command line interface when making some kind of node cli tool. in node npm packages like chalk use ANSI escape codes to control the color of text, but they can be used to do far more than just that in the terminal. In this post I will be covering some basic examples of the use of ANSI escape codes to control things like the color of text, as well as cursor movement and more in nodejs.

<!-- more -->

## 1 - using ANSI escape codes to set color in the terminal

So I have wrote a post on using chalk to change color a long time ago, and I have notices that it works by sending a text pattern to the standard output of the console that the console uses to set the color of the terminal text. This pattern is of course and ANSI escape code sequence.

```js

let mess = 'Hello world',
colorFG = '\u001b[31m',
resetFG = '\u001b[39m';
console.log(colorFG + mess + resetFG);
```

```js
let color = {
    byNum: (mess, fgNum, bgNum) => {
        mess = mess || '';
        fgNum = fgNum === undefined ? 31 : fgNum;
        bgNum = bgNum === undefined ? 47 : bgNum;
        return '\u001b[' + fgNum + 'm' + '\u001b[' + bgNum + 'm' + mess + '\u001b[39m\u001b[49m';
    },
    black: (mess, fgNum) => color.byNum(mess, 30, fgNum),
    red: (mess, fgNum) => color.byNum(mess, 31, fgNum),
    green: (mess, fgNum) => color.byNum(mess, 32, fgNum),
    yellow: (mess, fgNum) => color.byNum(mess, 33, fgNum),
    blue: (mess, fgNum) => color.byNum(mess, 34, fgNum),
    magenta: (mess, fgNum) => color.byNum(mess, 35, fgNum),
    cyan: (mess, fgNum) => color.byNum(mess, 36, fgNum),
    white: (mess, fgNum) => color.byNum(mess, 37, fgNum)
};
 
let text = 'hello world.';
console.log(color.black(text));
console.log(color.red(text));
console.log(color.green(text));
console.log(color.yellow(text));
console.log(color.blue(text));
console.log(color.magenta(text));
console.log(color.cyan(text));
console.log(color.white(text, 40));
```

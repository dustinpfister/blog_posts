---
title: Using ANSI escape codes in nodejs
date: 2019-09-19 13:47:00
tags: [node.js]
layout: post
categories: node.js
id: 537
updated: 2019-09-19 15:16:06
version: 1.5
---

The use of [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code) is what can be used to control the format and behavior of a command line interface when making some kind of node cli tool. in node npm packages like chalk use ANSI escape codes to control the color of text, but they can be used to do far more than just that in the terminal. In this post I will be covering some basic examples of the use of ANSI escape codes to control things like the color of text, as well as cursor movement and more in nodejs.

<!-- more -->

## 1 - using ANSI escape codes to set color in the terminal

So I have wrote a post on using chalk to change color a long time ago, and I have notices that it works by sending a text pattern to the standard output of the console that the console uses to set the color of the terminal text. This pattern is of course and ANSI escape code sequence. In this section I will be writing about using these text patterns to control the color of the terminal output.

### 1.1 - Basic foreground color change

Lets start with just foreground color. Some terminals support a wide range of color options but for the most part I like to stick to the original standard that just supports eight color options for the foreground as well as background color of the text. The pattern must start with an escape character followed by an open bracket and then a color number finished with the m character.

```js
let mess = 'Hello world',
colorFG = '\u001b[31m',
resetFG = '\u001b[39m';
console.log(colorFG + mess + resetFG);
```

The numbers for colors range from 30 to 37, and then the number 39 can be used to reset the foreground color to the default of the terminal.

### 1.2 - basic color change utility object with foreground color change

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

## 2 - Cursor Movement plus save and restore

There is much more to ANSI escape codes beyond that of just setting the foreground and background colors of text. The escape codes can also be used to control the movement of the cursor in the console as well. So then this can be used as a way to create a terminal based interface. In this section I will be covering some of these escape codes that can control cursor movement when making a node cli tool.

### 2.1 - Move a cursor and also save and restore

In this example I am not just moving the cursor I am also saving the position of the cursor after drawing the display area so that when I am done I can then restore to that location. This works more or less the same as the codes that are used to change the color of the text only there are are range of characters that can be used to move a cursor a number of positions up down left or right there are also characters that can be used to save and restore the cursor position.

In this example I am using what we have covered with colors to create a few lines of text that represent and area, and then an at symbol for the current cursor position. I use the ANSI escape codes to move the cursor to the beginning of this area, and then write that at symbol. In addition I also use save and restore options.

```js
process.stdout.write('\u001b[47m');
process.stdout.write('\u001b[30m');
process.stdout.write('..........\n');
process.stdout.write('..........\n');
process.stdout.write('..........\n');
process.stdout.write('..........\n');
process.stdout.write('\u001b[s');
// move up 4 and back 5
process.stdout.write('\u001b[4A');
process.stdout.write('\u001b[5D@');
// reset colors
process.stdout.write('\u001b[39m\u001b[49m');
// restore cursor
process.stdout.write('\u001b[u');
 
/*
@.........
..........
..........
..........
*/
```

The first value I give after the open bracket is the number of positions I want to move the cursor and then I want to give the letter A to move up, B to move down, C to move forward or right, and D to move backward or left.
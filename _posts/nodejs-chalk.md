---
title: How to style terminal output text with node.js using chalk
date: 2017-05-31 10:37:53
tags: [js,node.js]
layout: post
categories: node.js
id: 26
updated: 2021-03-18 16:35:40
version: 1.13
---

When making any kind of node.js project that may involve output to the command line interface, it may be desired to style that output, for the sake of adding emphases, or just to make it look nice. Many CLI tools make use of color, for one reason or another, so if you want to add color to the output of you node.js CLI tools, you might want to check out [chalk](https://www.npmjs.com/package/chalk). Chalk makes changing the color of a terminal fairly easy, but if you are wondering how chalk works the answer is [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code). If you just simply know the codes that you want to use you can just append them to the start and end of a string that you are outputting to the console. Chalk just makes working with ANSI escape codes easy

When I first wrote this post back in may I was using chalk 1.1.3, but as of this writing the latest version is now 2.3.0 as such there are a few new features, and some things just still work the same as aways.

<!-- more -->

## 1 - Chalk js and ANSI escape codes

Chalk js is a great project for quickly changing the color of terminal text, but it might be best to just know what the proper ANSI escape codes are for the color that you want to set. For example if you have node js installed you can just do this in the console right now without chalk js installed. I will not be getting into detail with ansi escape codes here as I have another [post on using ansi escape codes to change color](/2019/09/19/nodejs-ansi-escape-codes/), and much more. However I will give at least this basic example using the [eval command line option](/2019/09/11/nodejs-command-line/) of nodejs. 

```
$ node --eval "console.log('\u001b[31m red text \u001b[39m')" 
```

I am using two CSI \( Control Sequence Introducer \) sequences to change the color to red, and then back to the default for the terminal. I could go on about these codes but maybe that is a matter for another post, for the sake of this content piece I will be sticking mainly to just using chalk js.

# 2 - The Chalk js Hello world app.

Getting started with chalk js is real simple, after adding it to your project with the usual npm install command I can the use it in a nodejs script with require just like any other user space npm package.

```
$ npm install chalk --save
```

Throwing together a simple hello world that should demonstrate it's capability can be as simple as this.

```js
var chalk = require('chalk');
 
console.log( chalk.red('hello world this is red terminal text!') );
```

## 3 - Color Style methods

there are some 16 options in chalk when it comes to just setting a text color by calling one of the methods that is a color name, like so:

```js
var chalk = require('chalk');
 
console.log( chalk.red('red') );
console.log( chalk.blue('blue') );
console.log( chalk.green('green') );
console.log( chalk.magenta('magenta') );
```

The full list of color options is as follows:

* red
* green
* yellow
* blue
* magenta
* cyan
* white
* gray
* redBright
* greenBright
* yellowBright
* blueBright
* magentaBright
* cyanBright
* whiteBright

## 4 - Background color style methods

Sometimes I might want to have a certain background color for the terminal text when making my CLI tool, and just have the plain old white foreground color. This can be done with the background style methods.

```js
var chalk = require('chalk');
 
console.log( chalk.bgRed('red') );
console.log( chalk.bgBlue('blue') );
console.log( chalk.bgGreen('green') );
console.log( chalk.bgMagenta('magenta') );
```

The full list of options is the same as with foreground colors, I just need to to ad 'bg' to the front of the name and capitalize the name of the color.

## 5 - Modifier methods

there are some methods for logging text with certain text styles, such as bold, and underline. The support for these is mixed underline for example does not seem to work in windows 10 cmd.exe, and nothing with chalk works in cygwin64 terminal in windows as it has a color level of 0 there.


```js
var chalk = require('chalk');
 
console.log(chalk.bold('bold'));
console.log(chalk.underline('bold'));
```

* reset
* bold
* dim
* italic
* underline (not working in windows 10 cmd.exe)
* inverse
* hidden
* strikethrough
* visible (Text is emitted only if enabled)

## 6 - Color level, and color support of the terminal.

Color support for will very across different terminals, for example cmd.exe in windows 10 seems to only support color level 2, which is only 16 colors. Some external terminals might not even support level 2, and ignore the text patterns that are used to switch text style, or even show them in the output.

To help with this there is the chalk.supportColor, and chalk level properties. These can be used to feature test for support and act accordingly.

```js
var chalk = require('chalk');
 
if (chalk.supportsColor) {
 
    console.log(chalk.blue('yes your terminal supports color, this text should be blue.'));
 
} else {
 
    console.log('sorry the terminal does not support color.');
 
}
 
// the color level (0 - 3)
console.log('color level: ' + chalk.level);
```

As you may have gathered you can use the supportsColor property of chalk to find out if the terminal that you are using supports color in the first place or not.

## 7 - Defining your own style

You can use a chainable API to define a custom style, and set it to a variable, like so.

```js
var chalk = require('chalk'),
 
myStyle = chalk.bold.green;
 
console.log(myStyle('This is my term text style'));
```

## 8 - Using the hex method to set color

It is possible to set text color using a hex method. In the case of the terminal not supporting a certain color, it will be scaled down to whatever is close. That makes it a great choice allowing for more advanced control over terminal color, while still working okay if the terminal only supports 16 colors.

```js
var chalk = require('chalk');
 
console.log(chalk.hex('#ff0000')('This is red text set via a hex value'));
```

## 9 - Using an RGB value

This method works the same way as hex, only I can pass some dec values in place of a hex string.

```js
var chalk = require('chalk');
 
console.log(chalk.rgb(255,0,0)('This is red text set via a rgb value'));
```

## 10 - Conclusion

I have been following the development of chalk for some time now, it's a fun little dependency for setting terminal color to help add emphasis for things like error messages. The go to solution for adding stylish text to CLI tools in node.js for sure. However when it comes to adding color I have found that I often just use a simple set of ansi codes to turn color on and off when it comes to making some kind of log module for a porject or something to that effect.



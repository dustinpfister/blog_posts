---
title: How to style terminal output text with node.js using chalk
date: 2017-05-31 10:37:53
tags: [js,node.js]
layout: post
categories: node.js
id: 26
updated: 2017-11-13 14:31:28
version: 1.4
---

When making any kind of node.js project that may involve output to the command line interface, it may be desired to style that output, for the sake of adding emphases, or just to make it look nice. Many CLI tools make use of color, for one reason or another, so if you want to add color to the output of you node.js CLI tools, you might want to check out [chalk](https://www.npmjs.com/package/chalk).

When I first wrote this post back in may I was using chalk 1.1.3, but as of this writing the latest version is now 2.3.0 as such there are a few new features, and some things just still work the same as aways.

<!-- more -->

# The Chalk Hello world app.

Getting started with chalk is real simple, after adding it to your project with the usual

```
$ npm install chalk --save
```

Throwing together a simple hello world that should demonstrate it's capability can be as simple as this.

```js
var chalk = require('chalk');
 
console.log( chalk.red('hello world this is red terminal text!') );
```

## Color Style methods

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

## Background color style methods

Sometimes I might want to have a certain background color for the terminal text when making my CLI tool, and just have the plain old white foreground color. This can be done with the background style methods.

```js
var chalk = require('chalk');
 
console.log( chalk.bgRed('red') );
console.log( chalk.bgBlue('blue') );
console.log( chalk.bgGreen('green') );
console.log( chalk.bgMagenta('magenta') );
```

The full list of options is the same as with foreground colors, I just need to to ad 'bg' to the front of the name and capitalize the name of the color.

## Modifier methods

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

## Color level, and color support of the terminal.

There is a boolean where if true it means that color is supported at least at some level higher than that of 0. In windows 10 cmd.exe just seems to support level 1 which is just 16 colors, so even if the terminal supports true color assume its not there.

For the most part I only need a few colors anyway.

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

## Defining your own style

You can use a chainable API to define a custom style, and set it to a variable, like so.

```js
var chalk = require('chalk'),
 
myStyle = chalk.bold.green;
 
console.log(myStyle('This is my term text style'));
```

## Using the hex method to set color

It is possible to set text color using a hex method. In the case of the terminal not supporting a certain color, it will be scaled down to whatever is close. That makes it a great choice allowing for more advanced control over terminal color, while still working okay if the terminal only supports 16 colors.

```js
var chalk = require('chalk');
 
console.log(chalk.hex('#ff0000')('This is red text set via a hex value'));
```

## Using an RGB value

This method works the same way as hex, only I can pass some dec values in place of a hex string.

```js
var chalk = require('chalk');
 
console.log(chalk.rgb(255,0,0)('This is red text set via a rgb value'));
```

## Conclusion

I have been following the development of chalk for some time now, it's a fun little dependency for setting terminal color to help add emphasis for things like error messages. The go to solution for adding stylish text to CLI tools in node.js for sure.

Be sure to check out my many other [posts on node.js and npm packages](/categories/node-js/).
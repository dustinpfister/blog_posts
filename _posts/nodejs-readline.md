---
title: The node.js readline module, for making a cli shell.
date: 2018-08-06 11:08:00
tags: [js,node.js]
layout: post
categories: node.js
id: 251
updated: 2018-08-07 11:00:20
version: 1.11
---

When making [node.js](https://nodejs.org/en/) command line tools there might be a desire to make a command line tool where I drop into a shell in which I can enter commands to preform certain actions. Some examples of this might be the shell in mongodb where I can call methods, and full scripts from a shell that I can enter when calling the mongodb binary. Another example would be some of these command line text editors that involve entering commands to insert text, delete, and so forth. Once node.js built in module of interest when it comes to this might be the [readline module](https://nodejs.org/api/readline.html), it allows for me to write an event handler for each time return is entered from the standard input in a command line interface. In this post I will be writing about this module, and give some copy and paste examples.

<!-- more -->

## 1 - What to know

This is a post on the readline module in node.js. I will not be getting into the basics of working with node.js, and javaScript in general. I assume that you have some background with these things, but do not have a great deal of experience working with the readline module.

## 2 - Basic example of the node.js readline module

For a basic example I put together an example where I am just importing the module in with require, creating an interface with the standard input,and output, along with defining what the prompt should be. Once I have that I created an object in which I define what two commands do, and set up a single event hander for what should be done when a command is entered with the retrun key.

```js
let readline = require('readline');
 
let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '>'
    });
 
rl.prompt();
 
let commands = {
 
    pwd: function () {
 
        console.log(process.cwd());
        rl.prompt();
 
    },
 
    close: function () {
 
        rl.close();
 
    }
 
};
 
rl.on('line', (input) => {
 
    input = input.toLowerCase();
 
    if (input in commands) {
 
        commands[input]();
 
    }
 
});
```

When I save this as a file like basic.js, and then call it in node, I drop into a shell with a '>' prompt. From there I can enter 'pwd' to have the example log the current working dir to the standard output, or enter 'close' to exit the shell.

So if I have my basic.js file saved at my homw folder I might end up doing something like this when calling it.

```
$ node basic
> pwd
/home/dustin
>close
$
```

Of course I can make the script global, add some more useful commands, and so forth. However for a basic hello work type example you should get the idea of how this can be useful for making this kind of cli program with node.js.

## 3 - An example involving angles

For a more advanced example I made a simple cli tool that will give me the point on a cirlce given the centerx, centery, angle, and distance values. I made it so all the current variable sates are displayed in the prompt, and when a change to a value is made the prompt chances. So this is a good example of having a custom prompt that conveys useful information relevant to the shell command. In this example I am also using more commands, and have a way to parse options for those commands.

### 3.1 - The conf object

So for the begining of my angles.js file I start off by importing just the readline module once again, after that I made a conf object that will store the current values of interest for this example.

```js
let readline = require('readline');
 
let conf = {
 
    a: 0,
    d: 100,
    sx: 0,
    sy: 0,
 
    getPrompt: function () {
 
        return 'c=(' + this.sx + ',' + this.sy + ') a=' + this.a.toFixed(2) + ' d=' + this.d + ' >';
 
    }
 
};
```

In addition there is also a getPrompt method that will return the string value of the current prompt format for this shell command example.

### 3.2 - setting up the readline interface

So once again the first step with this is to set up the readline interface. The only difference this time is that I am using my getPrompt method that I have made in the conf object shown above. After that I call prompt for the first time.

```js
let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: conf.getPrompt()
    });
 
rl.prompt();
```

I will need to update the prompt as needed when changing any of the values via the rl._prompt property.

### 3.3 - The commands

Now for the commands. This time they require argument data in the form of a text string that will be given after entering the command folowed by a single space. The commands here are used to set the state of the variables, and updating the information displayed in the prompt, as well as a single command for finding the unknown point on a circle.

```js
let commands = {
 
    // set angle command ( >a 45 )
    a: function (text) {
 
        conf.a = !text ? 0 : Number(text);
 
        conf.a = Math.PI / 180 * conf.a;
 
        // update the prompt
        rl._prompt = conf.getPrompt();
 
        rl.prompt();
 
    },
 
    // set distance command ( >d 250 )
    d: function (text) {
 
        conf.d = !text ? 100 : Number(text);
 
        // update the prompt
        rl._prompt = conf.getPrompt();
 
        rl.prompt();
 
    },
 
    // set center point command ( >c 90,37 )
    c: function (text) {
 
        conf.sx = 0;
        conf.sy = 0;
 
        if (text) {
 
            text = text.split(',');
 
            conf.sx = Number(text[0] || x);
            conf.sy = Number(text[1] || y);
 
        }
 
        // update the prompt
        rl._prompt = conf.getPrompt();
 
        rl.prompt();
 
    },
 
    // find unknown point on circle ( >f )
    f: function () {
 
        let x = Math.cos(conf.a) * conf.d + conf.sx,
        y = Math.sin(conf.a) * conf.d + conf.sy;
 
        console.log('(' + x.toFixed(2) + ',' + y.toFixed(2) + ')');
 
        rl.prompt();
 
    },
 
    // exit
    exit: function () {
 
        rl.close();
 
    }
 
};
```

### 3.4 - The on line event, and option parsing.

Finally I am defining what to do for the line event. Here I am parsing the command that is given by splitting it into two parts to find the command, and the text string after it.
 
```js
rl.on('line', (input) => {
 
    let firstSpace = input.match(/\s/);
 
    // Get the command
    let com = input; // com default to input
    if (firstSpace) { // but if there is a space, it is what is before that space
        com = input.slice(0, firstSpace.index);
    }
 
    // get the text
    let text = ''; // text defaults to a blank sting
    if (firstSpace) { // but if there is a space, it is what is before that space
        text = input.slice(firstSpace.index + 1, input.length);
    }
 
    if (com in commands) {
 
        commands[com](text);
 
    } else {
 
        rl.prompt();
 
    }
 
});
```

### 3.5 - The angles.js example in action

Now to see this in action.

```
$ node angles
c=(0,0) a=0.00 d=100 >a 180
c=(0,0) a=3.14 d=100 >d 250
c=(0,0) a=3.14 d=250 >c 90,37
c=(90,37) a=3.14 d=250 >f
(-160.00,37.00)
c=(90,37) a=3.14 d=250 >exit
$
```

## 4 - conclusion

The readline module is a very useful tool when it comes to making these kinds of projects. I might take a stab at making a text editor or something to that effect with this kind of interface, but that might prove to be a time consuming project, and there are all ready a lot of great editors out there like that.
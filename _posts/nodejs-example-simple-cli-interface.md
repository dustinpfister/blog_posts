---
title: A simple nodejs Custom CLI example using setRawMode
date: 2020-03-15 13:33:00
tags: [node.js]
layout: post
categories: node.js
id: 823
updated: 2021-03-15 16:21:49
version: 1.10
---

This will be a simple CLI Interface nodejs example that will serve as a starting point for a [nodejs](https://nodejs.org/en/) project. I might make a few examples based of this actually so I hope to get this at least somewhat solid before moving on to additional examples. First off the goal here is to create a custom command line interface that works like various command line tools like the nano text editor, or something to that effect. That is that I call a command, maybe pass some options, and then drop into a terminal based interface in which I need to use arrow keys to navigate, and type text, and keyboard shortcuts to move around. This might differ from other kinds of CLI interfaces that work by prompting for some input and function like a command line. This sort of CLI interface can be created by making use of [the setRawMode method](https://nodejs.org/api/tty.html#tty_readstream_setrawmode_mode), but doing so is a little tricky, thus writing this post is called for.

The use of the setRawMode method will set up an interactive command line environment where I can define what all the various key inputs will do. However this will even include keystrokes like ctrl+c that are used to escape a command line interface, so when doing something like this I should take care to make use that I put in a way for the user to escape the Command Line Interface.

So it would be nice to make a custom interface so that when someone just enters the name of the command, or runs my script they enter a Command Line Interface where the arrow keys, or some combination of letter keys can be pressed to move around, and preform actions. However it would also be nice to make things work in a way in which input can be passed in by way of pipping when calling the script from the command line also. So there will need to be a raw mode of sorts that will be used when just calling the script by itself, and a not raw mode that will be used when the script is being piped some input.

When it comes to doing this sort of thing there are a number of packages to use to just get up and running with this fast, but this is not that kind of post. What I am doing here is a simple starting point that is just a little vanilla javaScript code and that is it. I like to make these kinds of scripts now and then that just work with node itself.

<!-- more -->

## 1 - Getting started with this Node CLI example

This is not a getting started post on nodejs, or javaScript, I assume that toy have at least some experience with these subjects. If not chances are you are going to have a hard time with this. I also assume that you have at least some working knowledge of how to work in a command line environment such as bash.

The basic idea of this kind of interface does not only require any user space package, I do not even have to require in any built in modules into the script also. This is because the kind of interface that I want to create can be set up using just the process global, and mainly the process.stdin property of this global. I will not be getting into detail about every little in and out there is when it comes to this global, if you want to get up to speed with everything there is in the process global there is always the [nodejs docs on the process global](https://nodejs.org/api/process.html) for the version of node that you are using.

### 1.1 - The github repo of this nodejs example

I would like to get into the habit of linking to the [git hub repo of this source code example](https://github.com/dustinpfister/nodejs-example-simple-cli-interface) and all other nodejs example that I make from now on. Doing so just strokes me as a standard thing that I should be doing for every one of these posts. The example is just a single file that I will be coping into the content of this post anyway, but I think I should always do that anyway.

## 2 - The simple CLI Interface starting point script

What I have in mind here is to have a main index or app script that will be called to use the command line tool project that I might use with something like this. The use of any project that I create with this will be used by passing a long sequence of single byte values. These single byte values can be piped in from the standard output of another command, or a user can just call the script and manually enter these bytes one at a time. 

When piping input in the process can be just break that input down and process the input one byte at a time, however when it comes to the raw mode there will be key strokes that are more than one byte, which is okay but I might just want to handle those differently. Examples of this more than one byte input will be things like the arrow keys, function buttons, and other keyboard stroke that I might just want to use to preform certain kinds of actions that are only required when using the project this way. So there should be a process byte, and process buff function it would seem.

```js
#!/usr/bin/env node
 
// what to do with a single byte buffer
let processByte = (buff) => {
    console.log(buff);
};
 
// what to do with a buffer > 1 byte
let processBuff = (buff) => {
    let char = buff.toString(),
    hex = buff.toString('hex');
    console.log('control stroke');
    console.log('hex: ' + hex);
    console.log('str: ' + char);
    console.log('data buff length: ' + buff.length);
};
 
// to quit call process.exit with exit code
let onQuit = (code) => {
   // assume value of process.exitCode if noe status code is given
   code = code === undefined ? process.exitCode : code;
   // print a line feed
   process.stdout.write('\n');
   // end process with exit code
   process.exit(code);
};
 
// if process.stdin.setRawMode, enter raw mode
// this seems to end up being undefined when piping stdin
// ( $ echo "abcdq" | node app.js )
// however it will be there when called directly
// ( $ node app.js )
// which is fine becuase I only want to enter raw mode
// when the script is called that way
let isRaw = () => {
    if(process.stdin.setRawMode){
       return true;
    }
    return false;
};
 
// enter raw mode if possible
if(isRaw()){
    process.stdin.setRawMode(true);
}
 
// modes for raw use and pipping
let modes = {
    // for raw mode ( $ node app.js)
    raw: (data) => {
        // char and hex strings
        let char = data.toString(),
        hex = data.toString('hex');
        // exit code check (press q,Q, or ctrl+c aka '03' in hex)
        if(char.toLowerCase() === 'q' || hex === '03'){
            onQuit();
        }else{
            if(data.length === 1){
                processByte(data);
            }
            if(data.length > 1){
                processBuff(data);
            }
        }
    },
    // for pipping ( $ echo -n "abcd" | node app.js)
    notRaw: (data) => {
        var i = 0,
        len = data.length;
        while(i < len){
            processByte(data.slice(i, i + 1));
            i += 1;
        }
    }
};
 
// for each data event from the standard input
process.stdin.on('data', (data) => {
    if(isRaw()){
        modes['raw'](data);
    }else{
        modes['notRaw'](data);
    }
});
```

So then I can use this script by pipping something into it with another command, such as echo.

```
$ echo -n "asdf" | nodejs app
<Buffer 61>
<Buffer 73>
<Buffer 64>
<Buffer 66>
```

However I can also just call the script, and when I do so I enter my custom Command Line interface. WHen doing so I can type in the same keys, and when I am done I can press the q key or ctrl+c as I wrote the script in a way in which those to general ways of quiting still work. However if I did not they would not work, so this raw mode is nice then because I can define how to go about quiting the interface.

```
$ nodejs app
<Buffer 61>
<Buffer 73>
<Buffer 64>
<Buffer 66>
```

So then that is the basic idea that I had in mind with this, and so far it seems to be working the way I would like it to. Of course I have not tested this on all sorts of operating systems, and there might be some things I am not seeing at this time. However for simple projects I think this might work okay as a starting point for creating a custom interface for a text command interface like bash. From this point forward the only question now is what to do when it comes to creating some kind of actual project with this kind of starting point.

## 3 - Conclusion

This nodejs example was based off of what I worked out for another [example that is a basic nodejs RPG](/2020/03/13/nodejs-example-simple-rpg-game/) that can be played from the command line. The example that I made there was far more advanced than this, and as such does not work well as a simple starting point. So I took what I learned there, and worked out this simple example that is the core of what needs to happen when it comes to making this kind of interface in a nodejs environment.

This week I think I will be writing a few new posts on nodejs to help break the habit of not working on nodejs related stuff. I do seem to be more interested in front end javaScript alone these days, and also when it comes to writing the kinds of things that I once made with node I have learned a thing or two about bash, and python sense then.
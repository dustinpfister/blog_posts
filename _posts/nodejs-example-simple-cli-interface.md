---
title: A simple nodejs Custom CLI example using setRawMode
date: 2020-03-15 13:33:00
tags: [node.js]
layout: post
categories: node.js
id: 823
updated: 2021-03-15 15:44:53
version: 1.2
---

This will be a simple CLI Interface nodejs example that wil serve as a starting point for a [nodejs](https://nodejs.org/en/) project. I might make a few examples based of this actauly so I hope to get this at least somewhat solid before moving on to additional examples. First off the goal here is to create a custom command line interface that works like various command line tools like the nano text editor, or something to that effect. That is that I call a command, maybe pass some options, and then drop into a terminal based interface in which I need to use arrow keys to navagate, and type text, and keyboard shortcuts to move around. This might differ from other kinds of CLI interfaces that work by prompting for some input and function like a command line. This sort of CLI interface can be created by making use of [the setRawMode method](https://nodejs.org/api/tty.html#tty_readstream_setrawmode_mode), but doing so is a little tricky, thus writing this post is called for.

The use of the setRawMode method will set up an interactive command line enviorment where I can define what all the various key inputs will do. However this will even include keystrokes like ctrl+c that are used to escape a command line interface, so when doing soemthing like this I should take care to make use that I put in a way for the user to escape the Command Line Interface.

So it would be nice to make a custom interface so that when someone just enters the name of the command, or runs my script they enter a Command Line Interface where the arrow keys, or some combination of letter keys can be pressed to move around, and prefrom actions. However it would also be nice to make things work in a way in which input can be passed in by way of pipping when calling the script from the command line also. So there will need to be a raw mode of sorts that will be used when just calling the script by itself, and a not raw mode that will be used when the script is being piped some input.

When it comes to doing this sort of thing there are a number of packages to use to just get up and running with this fast, but this is not that kind of post. What I am doing here is a simple starting point that is just a little vanilla javaScript code and that is it. I like to make these kinds of scripts now and then that just work with node itself.

<!-- more -->

## 1 - Getting started with this Node CLI example


## 2 - The simple CLI Interface starting point script

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

## 3 - Conclusion

This week I think I will be writing a few new posts on nodejs to help break the habbit of not working on nodejs related stuff. I do seem to be moreinterested in front end javaScript alone these days, and also when it comes to writing the kinds of things that I once made with node I have learned a thing or two about bash, and python sense then.
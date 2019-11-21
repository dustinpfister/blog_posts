---
title: Nodejs write file method basics and more
date: 2019-06-14 09:49:00
tags: [js,node.js]
layout: post
categories: node.js
id: 479
updated: 2019-11-21 16:10:46
version: 1.11
---

The [nodejs write](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback) nodejs [file system module](/2018/02/08/nodejs-filesystem/) method will come up a lot when it comes to do anything with, well writing a file in nodejs. There is more that one method in the file system module that can eb used to write data to a file system, but this is the one that I find myself using all the time over the others.
 
There is the old way of how to go about using the nodejs write file method that can lead to a kind of call back hell, and then there is the more modern way of using write file that involves the use of promises and the util promisify method. I generally choose to use promises over callbacks because I use write file along with many other methods and I find that promises are a much better way of making many calls to methods like this in a certain order.

<!-- more -->

## 1 - Basic examples involving the use of node write file file system method

In this section I will be going over a very basic hello world style example of the nodejs write file method. One that just involves the use of a callback that will work on a wide range of nodejs versions. I will then be going over a more advanced example that makes use of the promisify method in the util module that I can use to make a version of the write file method that returns a promise on versions of node that do not do so by default.

So this is just a getting started section of sorts with writing files in nodejs.

## 1.1 - nodejs write file method basic example

A basic example of the nodejs write file method is to require in the nodejs file system module, and then call the fs.wrietFile method passing the path of the file to write to as the first argument, followed by the data to write to, and then the encoding and callback to fire when done.

```js
let fs = require('fs'),
path = require('path'),
cwd = process.cwd(),
 
text = process.argv[2] || 'hello world',
dir = path.join(cwd, 'test.txt');
 
fs.writeFile(dir, text, 'utf-8', (e)=> {
    if (e) {
        console.log(e);
    }
});
```

this is the old school way to go about using the nodejs write file method that can lead to a kind of callback hell if a whole much of read and write operations need to be preformed in sequence. So in es2015+ javaScript there is now native support for Promises which many javaScript developers argue is a far batter way to deal with reading and writing to fines in node.

## 1.2 - Write file method using promises

So in later versions of nodejs it looks like there might now be native support for Promises when using nodejs file system method like the write file method. However in this section I am assuming that you might be using an older version of node, or you might still want to support older versions of node for your project. So you just need to use some kind of dependency like fs-extra, or the util module promisify method to promisify the fs module or methods you want to use. One way or another you might still want to do something to make sure methods like fs.readFile and fs.writeFile will return promises one way or another in all versions of node that are concerned.

So here is an example where I am using the util promsiify method to make sure that the node write file method returns a promise. I am also doing so with the node read file methods also, and using the two methods to both read and write a simple json file.

```js
let fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
 
// promisifying node write and read methods
write = promisify(fs.writeFile),
read = promisify(fs.readFile);
 
let path_conf = path.join(process.cwd(), 'conf.json'),
default_conf = {
    reset: false,
    count: 0
};
 
// read conf.json
read(path_conf)
// then if we have a conf.json
.then((json) => {
    let conf = JSON.parse(json);
    if (conf.reset) {
        conf = default_conf;
    } else {
        conf.count += 1;
    }
    console.log('updated conf.json');
    console.log(conf);
    return write(path_conf, JSON.stringify(conf));
})
// else an error
.catch((e) => {
    let conf = default_conf;
    if (e.code === 'ENOENT') {
        console.log('No conf.json, writing a new one');
        console.log(conf);
        return write(path_conf, JSON.stringify(conf));
    } else {
        console.log(e);
    }
});
```

When I call this example in the command line with node it will create a json file if it is not there, if it is there it will read the file step a value and then write it back to the file. As simple as it might be this basic node write file method example is the beginning of something that is starting to look like an actual node project examples of some kind.

## 2 - A node write file method game example about probability

So now that we have the basics of writing files in nodejs, as well as reading them lets do something fun. Here I worked out a very simple silly game example that has to do with what happens if the probability of winning a bet is even just one percent above fifty percent, and the bet remains low and constant. In the kind of situation of course you will make money over the long run if you play enough rounds.

This example involves a read state method that creates a state json file if it is not there, or just reads it, and returns the state file. In addition it also has a play round method that calls the read state method, plays a round of a game, updates the state, and then writes the updated state to the file.

```js
let fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
 
// promisifying node write and read methods
write = promisify(fs.writeFile),
read = promisify(fs.readFile);
 
// robust read state method that will create a state
// if it is not there
let readState = (dir_root, fileName) => {
 
    dir_root = path.resolve(dir_root || process.cwd());
    fileName = fileName || 'game_prob_state.json';
    let path_state = path.join(dir_root, fileName);
 
    return read(fileName)
    .catch((e) => {
        if (e.code === 'ENOENT') {
            let json = JSON.stringify({
                    won: 0,
                    lost: 0,
                    prob: 51,
                    money: 0
                });
            return write(path_state, json, 'utf8');
        } else {
            return Promise.reject(e);
        }
    })
    .then(() => {
        return read(fileName);
    });
 
};
 
// play a round
let playRound = (dir_root, fileName) => {
 
    dir_root = path.resolve(dir_root || process.cwd());
    fileName = fileName || 'game_prob_state.json';
    let path_state = path.join(dir_root, fileName);
 
    let state = {},
    roll = Math.random() * 100,
    bet = 1;
 
    return readState(dir_root, fileName)
    .then((json) => {
        state = JSON.parse(json);
        if (roll <= state.prob) {
            state.won += 1;
            state.money += bet;
        } else {
            state.lost += 1;
            state.money -= bet;
        }
        return write(path_state, JSON.stringify(state), 'utf8');
    })
    .catch((e) => {
        return Promise.reject(e);
    })
    .then(() => {
        return Promise.resolve(state);
    });
 
};
 
let count = 0,
maxCount = process.argv[2] || 1000;
let loop = function () {
    playRound(process.cwd(), process.argv[3] || 'game_default.json')
    .then((result) => {
        console.log(count, result);
        count += 1;
        if (count < maxCount) {
            loop();
        }
    })
    .catch((e) => {
        console.log(e);
    });
};
loop();
```

When I run this a few times, and set the maxCount high enough over time sure enough the money property of the state does slowly but surly go up. The basic idea of this could be expanded to make all kinds of idle games where you just run it a  bunch of times and then progress is made. If only real life was like that.
---
title: node process exit
date: 2019-08-13 15:56:00
tags: [node.js]
layout: post
categories: node.js
id: 521
updated: 2019-08-13 16:15:41
version: 1.2
---

So there is the question pf how to make a node process exit when it does not do so normally, and also how to go about setting some events that will fire when the process exits. In this post I will be going over the process exit method and well as exit codes, exit events, and other related topics that mainly have to do with the use of the process module.

<!-- more -->

## 1 - Node process exit method basic example

So if a process does not exit as expected or for whatever the reason I want to stop, end or otherwise exit a process in nodejs there is the exit method of the process global that can be used to do so. The method accepts one argument that is the exit code to set for the process.

```js
process.stdin.on('data', (data) => {
    console.log(data);
})
process.on('exit', (code) => {
    console.log('process exited with code: ' + code);
});
process.exit(0);
```

## 2 - 

```js
// keep looping until a condition is met
let loop = () => {
    let t = setTimeout(loop, 100);
    let rnd = Math.floor(Math.random() * 6) + 1;
    console.log(rnd);
    if (rnd === 6) {
        process.exit(0);
    }
};
loop();
```

## 3 - 

```js
let rollCount = 0;
let roll = () => {
    return Math.floor(Math.random() * 6) + 1;
};
let loop = () => {
    let t = setTimeout(loop, 100);
    let d1 = roll(),
    d2 = roll();
    console.log(d1, d2);
    if ((d1 === 1 && d2 === 1) || rollCount >= 10) {
        process.exitCode = 1;
        clearTimeout(t);
    } else {
        if (d1 === 6 && d2 === 6) {
            process.exitCode = 0;
            clearTimeout(t);
        }
        rollCount += 1;
    }
};
process.on('exit', (code) => {
    console.log('process exited with code: ' + code);
    console.log('roll count: ' + rollCount);
});
loop();
```
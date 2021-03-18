---
title: The Node process exit method to end a node process
date: 2019-08-13 15:56:00
tags: [node.js]
layout: post
categories: node.js
id: 521
updated: 2021-03-18 13:54:58
version: 1.7
---

So there is the question of how to make a [node process exit](https://nodejs.org/api/process.html#process_process_exit_code) when it does not do so normally, and also how to go about setting some events that will fire when the process exits. In this post I will be going over the process exit method and well as exit codes, exit events, and other related topics that mainly have to do with the use of the [process global](/2018/02/11/nodejs-process/).

When a process exits it often does so with an exit code. When using the main process.exit method it is possible to pass a code to let any additian scripts that might make use of what I am making know if the script exited as exspect with a code of zero, or if some kind of error happend with a code of one or higher. It is also possible to define some event handers that will fire when this process.exit method is called, or if for whatever the reason the process exits.

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

## 2 - The node process exit method can be used to end what would otherwise be an endless loop

So most of the time the use of the process exit method is not required, often by default the process will just end if there is nothing left to do. However in some situations it is required in the body of code to use it, such as in a loop that involves the use of setTimeout. Maybe it is not the best example as the clearTimeout method could also be used, but still if a condition occurs that is desired to end the process then the process exit method can be used as a way to do so.

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

## 3 - The process exit code property

The process exit method can be used as a way to end the process right away, but there is also the process exit code property that can be used as a way to set a code that will be handled in different ways when the process ends as normal.

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
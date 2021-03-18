---
title: Piping with nodejs thanks to the process stdin global
date: 2019-07-09 11:47:00
tags: [js,node.js,heroku]
layout: post
categories: node.js
id: 502
updated: 2021-03-18 14:39:07
version: 1.6
---

So when it comes to doing something in the command line in a posix system, or windows system there is the subject of piping in the command line. That is taking the output of one command line tool and piping it to another tool. For example taking the output of a command that spits out a list of information about the computer the operating system is running on and then piping it to a terminal based txt editor that then saves it as a file in the current working directory.

As of late I wanted to write a nodejs script that can accept input from the standard input, but oddly enough that is something I have not done before, so I had to look into it. In nodejs there is the [process global](https://nodejs.org/api/process.html#process_process) that contains many useful properties, some of which can be used pipe in data from the standard input, as well as out to the standard error and standard output as well. So to get started with this I thought I would write a quick post on the [process.stdin](https://nodejs.org/api/process.html#process_process_stdin) property that can be used to stream in the standard input from the command line into a nodejs project.

<!-- more -->

## 1 - Process stdin basic example

So lets start out with a basic example of using the process stdin property of the process global in nodejs. I just attach an event handler for the readable event of the stream, and then use that to read incoming chunks.

```js
process.stdin.on('readable', () => {
    let chunk;
    while ((chunk = process.stdin.read()) !== null) {
        process.stdout.write('we have a chunk: \n');
        console.log(chunk.length);
        process.stdout.write(chunk);
    }
});
```

Cool so lets test it out in the command line

```
$ echo "hello word" | node stdin_basic
we have a chunk:
15
"hello word"
```

So far so good.

## 2 - Conclusion

That is it for now when it comes to the process.stdin stream, there is also of course the [process.stdout stream also that I have also wrote a quick post on](/2021/03/18/nodejs-process-stdout/) that should also be worth checking out when it comes to more on that kind of stream to work with also.Just like all my other nodejs posts I will likey come back to this post now and then when I get around to editing, and when I do so maybe I can come up with at least a few more examples to write about when it comes to working with standard input.

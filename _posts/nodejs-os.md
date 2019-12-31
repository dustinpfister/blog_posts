---
title: Node os module examples
date: 2019-11-19 14:19:00
tags: [node.js]
layout: post
categories: node.js
id: 566
updated: 2019-12-30 19:17:56
version: 1.5
---

So you might be wondering if there is a node built in way to access all kinds of data about the host operating system that your nodejs project is running on top of. Maybe you want to work out some logic where you want to handle things a little differently if the project is running on top of windows rather than linux of another posix system. 

Well there is the idea of using the child process module as a way to just go ahead and see if a command of one sort or another works or not and figure it out that way. However maybe the [node os](https://nodejs.org/api/os.html) core module is what you would rather start with. This node build in module contains many properties and methods than are helpful for gaining at least some basic information about what you are dealing with. 
<!-- more -->


## 1 - Node os basic platform example

So for a basic example of the node os module this will be a very simple script that just logs out a string that represents the operating system. In other worlds this is an example of the os platform method to be more precise. To do this I just need to require in the os module, and then call the platform method of the module, the result is a string that gives me a general idea of what I am working with.

```js
let os = require('os');
 
console.log(os.platform());
// 'win32' if windows
// 'linux' is linux
// 'darwin' is apple darwin / OSX
```

## 2 - Node EOL end of line example

Another typical use case example of the node os module is the end of line property. This property will contain the typical end of line byte pattern that is used for a line break. In windows systems it is often a two byte pattern starting with a carriage return followed by a line feed \(CRLF\). In linux, apple darwin, and just about any OS other than windows is is just a one byte line feed \(LF\).

```js
let os = require('os');
 
console.log(Buffer.from(os.EOL).toString('hex'));
// '0d0a' if 'win32'
// '0a' if posix
 
console.log(Buffer.from('\r\n').toString('hex'));
// '0d0a'
console.log(Buffer.from('\n').toString('hex'));
// '0a'
```

## 3 - Using node os module and node child process module to run the right command in winodws or posix

Now for something fun with the node os module, and the node child process module. The platform method of the node os module can be used to find out if the operating system is windows or not. If it is windows I can try a windows command such as [ver](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/ver) that will give me some more detailed information about the version of windows. If the os is not windows I can try some command that should be on most posix systems such as [uname](https://en.wikipedia.org/wiki/Uname).

So this example does just that I create a method that returns a promise that will resolve if a command works, and reject if there is some kind of error. The exec method of the node child process module is used to call ver if windows and uname if anything else.

```js
let os = require('os'),
exec = require('child_process').exec;
 
let getOSVersion = function () {
    return new Promise((resolve, reject) => {
        let info,
        report = '';
        // figure out what command to use
        if (os.platform() === 'win32') {
            // if windows try ver
            info = exec('ver');
        } else {
            // else assume uname -a will work
            info = exec('uname -a');
        }
        // the rest should work okay
        info.stdout.on('data', (data) => {
            report += data.toString();
        });
        info.on('close', () => {
            resolve(report.trim())
        });
        info.on('error', () => {
            reject(new Error('error getting os version'));
        });
    });
};
 
getOSVersion()
.then((version) => {
    console.log(version);
})
.catch((e) => {
    console.log(e);
})
```

I have tested this out on windows 10, and raspbian and it works as expected on those systems at least. This is a cool little script as it is a good simple example of the potential that is possible with the node os module, and the node child process module. There are windows commands, and then there are equivalent commands that are on just about any posix system. So a method can be created that will parse a common set of info, or preform a command task of one kind or another on any system.
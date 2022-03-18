---
title: Node path resomve method and absolute rather than relative paths
date: 2020-04-07 19:32:00
tags: [js,node.js]
layout: post
categories: node.js
id: 642
updated: 2022-03-18 13:15:26
version: 1.9
---

In nodejs there is the [path module](/2017/12/27/nodejs-paths/) and the [resolve method](https://nodejs.org/api/path.html#path_path_resolve_paths) of that module than can be used to resolve a relative path to an absolute path. A relative path can be a string representation of the current working directory, or to some other path that is relative to an assumed starting point. It is generally a good idea to think more so in terms of absolute paths to things rather than relative ones to help eliminate confusion, and as such I generally use absolute paths unless for some reason I must use relative ones.

<!-- more -->

## 1 - Basic node path resolve method example

So say I use a string of period to refer to the current working directory. Doing so might not be the best way of doing so in a node project, but for the sake of this section lets just go with that for a moment. If I want to convert the string of a period to an absolute path to the current working directory then I can use the path resolve method to do so.

```js
let path = require('path');
 
let p = path.resolve('.');
 
console.log(p);
// C:\Users\Dustin\  (Win32)
// or
// /home/dustin  (Linux)
```

## 2 - The __dirname value, the process.cwd method, the current module directory, and the current working directory.

Although the path resolve method is the tool that I go for to make sure I am always working with an absolute path, it is of course just part of the toolbox. In just about all use case examples I could use the path resolve method with the string of a period to refer to the current working directory, but I tend to prefer using the process cwd method to do so in place of that. In addition if I want to refer to the absolute path of the module that is called rather than the current working directory the use of the path resolve method with a period will not cut it, I will want to use the \_\_dirname value.

```js
let path = require('path');
 
console.log(path.resolve('.'));
console.log(process.cwd());
console.log(__filename);
console.log(__dirname);
console.log(path.dirname(__filename));

```

The process cwd method should always refer to the current working directory, and the value of \_\_dirname should always refer to the location of the module. In addition there is the \_\_filename value that is the full file name of the current module, that can be passed to a method like the path dirname method to get the location of the current module.

In many nodejs projects it is important to have a string grasp as to the difference between the current working directory, and the directory where the javaScript of the application is located. If for example I am making a nodejs command line tool that will be used to loop over the contents of a directory I will want to do so in the current working directory, and not the directory where the module is located. In addition If I want to load an additional module in the script that does so i will want to do so relative to the location of the module and not the current working directory.

## 3 - Conclusion

So the path resolve method is the standard go to method for making sure that a string value of a path resolves to an absolute path. There is much more to write about when it comes to things that have to do with paths and nodejs though. For example there is looping backward one folder at a time from the current working directory looking for something to find out of the current working directory is a git folder or not.

There is also how to go about resolving paths in other programing environments as well, for example when writing a bash script that will run in an environment in which nodejs might nit be installed I will want to know how to resolve paths in that kind of environment. With that said in bash there is often the [realpath command](/2022/03/18/linux-realpath/) that can typically be used to resolve an relative path into an absolute one in that kind of environment.
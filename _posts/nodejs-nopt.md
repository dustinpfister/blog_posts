---
title: A very nice option parser for Node.js called nopt
date: 2017-05-05 21:19:00
tags: [js,node.js]
layout: post
categories: node.js
id: 17
updated: 2017-09-30 18:43:22
version: 1.5
---

So you find yourself writing some kind of [Command Line Interface tool](https://en.wikipedia.org/wiki/Command-line_interface) with [node.js](https://nodejs.org/en/), and as such you want to make it so it will accept some arguments from the command line. Just like that of many other CLI tools that you may be familiar with if you are somewhat POSIX or powerShell savvy. If so you will want to check out [nopt](https://www.npmjs.com/package/nopt).

<!-- more -->

I first noticed nopt when checking out the dependencies for the popular node.js task runner [grunt](https://gruntjs.com/). I have gotten into the habit of doing that as a way to become more aware of what is all ready out there in the node.js world, learn how to use it, and break free of the habit of wasting time re-inventing the wheel. Speaking of that I also really like what was written in the README file of the project on that matter:

```
If you want to write an option parser, and have it be good, there are
two ways to do it.  The Right Way, and the Wrong Way.

The Wrong Way is to sit down and write an option parser.  We've all done
that.

The Right Way is to write some complex configurable program with so many
options that you hit the limit of your frustration just trying to
manage them all, and defer it with duct-tape solutions until you see
exactly to the core of the problem, and finally snap and write an
awesome option parser.

If you want to write an option parser, don't write an option parser.
Write a package manager, or a source control system, or a service
restarter, or an operating system.  You probably won't end up with a
good one of those, but if you don't give up, and you are relentless and
diligent enough in your procrastination, you may just end up with a very
nice option parser.
```

If you are a great programmer you understand the reasons why re-inventing the wheel is not completely idiotic. Still it is true that part of being a great programmer is knowing when not to program, and use a very nice option parser that has been written before hand.

## Doing it the wrong way.

So you started developing a CLI tool, and it needs to accept some arguments from the command line, as such you might find yourself throwing together something like this.

```js
 
var args = process.argv.slice(2),
 
options = {
 
    readOnly : false,
    sourcePath : '.'
 
};
 
args.join().split('-').forEach(function (arg) {
 
    arg = arg.split(',');
 
    if (arg[0] === 'r') {
 
        options.readOnly = true;
 
    }
 
    if (arg[0] === 'd') {
 
        options.sourcePath = arg[1];
 
    }
 
});
 
console.log(options);
 
```

If so stop what you are doing now, you are making a mistake. Yes there is a dependency for that you can install, and use right now that will handle this aspect of CLI tool development much better. What is starting to come together in the above example can be called an option parser. It is an important component of any CLI tool. In this post I will be covering the usage of a node.js dependency called [nopt](https://www.npmjs.com/package/nopt).

## Doing it the Correct way.

When testing out any new dependency I start by making a little demo app that uses the dependency in question. So start a new node.js project and do the usual npm int to get your package.json file for the app together then install nopt, and be sure to make it one of the apps dependences in the package.json file.

```
$ npm install nopt --save
```

Now you are ready to handle option parsing the correct way, but first what is option parsing?

## Option parsing is not so simple sometimes.

Accepting arguments from the command line may strike you as a trivial matter, and to some extent I suppose it is now and then, but sometimes it may not be that trivial with certain projects. You may have a situation that involves hard coded default values in the tool itself, soft coded values in a json file somewhere that can superseded those hard coded defaults, and values that are accepted via the command line.

When accepting values from the command line, how many possible values can be set via the CLI? Does an option just set a true or false boolean value? Does an option set a native OS, or URL style path? What about number, string, and object values? Can an option set one of several types of modes, from an array of options? Yes this can get a little intense, this is why we use dependences written by people that have been there, and done that.

## The hard coded option object

When putting together an advanced CLI tool I would want to have a hard coded option object in the source code of the tool. Whatever the values are for this object are is what will always be used when the tool is used. So if you just call the command by itself it will go by the options defined there alone by default. However the values can be overwritten by properties in an object that is parsed with [nopt](https://www.npmjs.com/package/nopt), as well as from another source such as a json file.

```js
// hard coded defaults
option = {
    write : false,
    text : 'foobar',
    filename : 'textfile',
    path : './'
};
```

## Soft coded arguments

In addition I could make it so the tool always looks for soft coded values in a json file that may exist in certain paths. However getting into that would be off topic, so I will just be covering the idea of superseding hard coded option defaults by way of arguments defined from the CLI.

[nopt](https://www.npmjs.com/package/nopt) takes a look at process.argv, and makes an object with valid keys and corresponding values that can be used to augment my hard coded options object. It is a great way to help make sure that no invalid values ever get set, and to help handle how things should be done in the event of an invalid option when parsing options given from an end user of the tool.

## Invalid options.

It is possible to define an invalid option handler. This will be called in the event that one of the options did not parse properly. Say you have an option that needs to be a number, and only a number. The invalid handler will be called if the string "foo" is given for that option that should be a number.

```js
    // invalid argument handler.
    nopt.invalidHandler = function (key, val, types) {
 
        console.log(key + ' error, argument ignored.');
 
    };
```

The handler can be used to just inform the user they gave an invalid option like this example does, or it could be used to keep the program from continuing with whatever it does. It goes without saying that it is a nice feature to have when making an advanced CLI tool project of some kind. Be sure you define the handler before calling the parser.

## Example App

So for a simple example I put together a quick CLI tool that will write a file if a write boolen is true, else it will just log to the console. The name, and location of the file can also be set via arguments that can be set via the command line.

There are hard coded defaults that can be superseded by the arguments given, and I also have an invalid argument handler in place. Possible arguments, and there corresponding shorthands are also defined.

```js
// example of nopt
(function () {
 
    var nopt = require('nopt'),
    fs = require('fs'),
    path = require('path'),
    parsed,
    prop,
 
    // hard coded defaults
    option = {
        write : false,
        text : 'foobar',
        filename : 'textfile',
        path : './'
    },
 
    // set arguments from CLI
    setFromCLI = function () {
 
        // loop over values in the option object
        for (prop in option) {
 
            // if the property is in the parsed object...
            if (parsed[prop] != undefined) {
 
                // use it
                option[prop] = parsed[prop];
 
            }
 
        }
 
    },
 
    // write file method that is to be called if option.write is true
    writeFile = function () {
 
        if (option.write) {
 
            fs.writeFile(
                path.join(option.path, option.filename + '.txt'),
                option.text,
                'utf8',
                function (err) {
 
                if (!err) {
 
                    console.log('file written.');
 
                }
            });
 
        } else {
 
            console.log('log only.');
 
        }
 
    };
 
    // invalid argument handler.
    nopt.invalidHandler = function (key, val, types) {
 
        console.log(key + ' error, argument ignored.');
 
    };
 
    // parsed arguments given from command line
    parsed = nopt(
 
            // options
        {
 
            "write" : Number,
            "text" : String,
            "filename" : String,
            "path" : path
 
        },
 
            // shorthands
        {
 
            "w" : "--write",
            "t" : "--text",
            "f" : "--filename",
            "p" : "--path"
 
        },
 
            process.argv, 2);
 
    // set arguments to options object
    setFromCLI();
 
    // call the writeFile method
    writeFile();
 
    console.log(option);
    console.log(option.text);
 
}
    ());
```

so then..

```
$ node cli-example.js -t "example text" -f test-file -w
```

Will result in a file called test-file.txt to be written at the current working path containing the text "example text". The idea here is that the program will always follow what is written in the option object, one or more corresponding properties in the parsed object will be set to the options object if present. 

## Conclusion

Option parsing can be done in a way that helps to keep the CLI tools that I make more robust, and professional. If it is a tool that will be called from a script in the same fashion each time, then I would say that I would not have to bother with this dependency. If I aim to make a tool that other people use it becomes more more important to use this. It is something that I will most likely use if I start making any kind of project that is called from the command line, and is a little complicated.

I could get into greater depth about this and cover things like having more than one type for and option, and other features of [nopt](https://www.npmjs.com/package/nopt). Still you get the idea as to why this is a useful project.

Be sure to check out my many other [posts on node.js and npm packages](/categories/node-js/).
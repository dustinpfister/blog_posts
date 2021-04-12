---
title: Test Module javaScript example
date: 2021-04-12 13:15:00
tags: [js]
layout: post
categories: js
id: 843
updated: 2021-04-12 15:29:37
version: 1.7
---

For todays [javaScript example](/2021/04/02/js-javascript-example/) I will be going over a simple test module for testing javaScript modules that I am making to make sure that I get expected results when using a method in them. Most of the modules that I make are often a collection of pure functions where for a given set of arguments I should always get the same result, however I should also always get a result that I would expect for a given set of arguments. So it would make sense to have some scripts that will just call a method a bunch of times each time with a given set of arguments, the result of the call should then be compared to an expected result. If the function call equals the expected result, then it passes the test, if not it fails.

I could just start using a module in a project, and just address any problems for the methods as they come up, however by doing things that way problems can end up being harder to debug later on. So I think that it is better to just have a given module in its own folder, or maybe even better yet a whole separate repository. In the project folder for the module I will just have the source code of the module itself, and then a bunch of test scripts that are just a way to make sure that the modules is working the way that it should. 

Writing test scripts might eat up a little time, but it will still be a whole lot less time then writing a whole application on tip of the module as a way to test it. Also if something goes wrong with the application it can often prove to be harder to debug compared to just having tests for each module that the application uses.

There are many frameworks that are used as a way to go about running tests, but for this javaScript example post I will be going over a quick crude yet effective test module that I made from the ground up.

<!-- more -->

## 1 - The test module

Here is the source code of the test module that I will be requiring in when I write my test scripts. For now this test module just has one public method that is used to run a test object that I will pass it when it comes to writing a test script.

```js
let path = require('path')
 
// PRIVATE helpers and values
 
let EOL = '\n';
 
let colors = {
   black: '\u001b[30m',
   red: '\u001b[31m',
   green: '\u001b[32m',
   orange: '\u001b[33m',
   cyan: '\u001b[36m',
   white: '\u001b[37m',
   reset: '\u001b[39m'
};
 
// build in log method
let log = (mess, type, bool) => {
    let out = mess;
    if(type === 'info'){
        out = colors.cyan + out + colors.reset + EOL;
    }
    if(type === 'result'){
        out = '    ' + colors.orange + out + colors.reset + EOL;;
    }
    if(type === 'result.pass' && typeof bool === 'boolean'){
        out = '    ' + (bool === true ? colors.green : colors.red) + out + colors.reset + EOL;;
    }
    if(type === 'space'){
        out = EOL;
    }
    process.stdout.write(out);
};
 
// parse options
let parseOptions = (opt) => {
    opt = opt || {}
    opt.dir_lib = opt.dir_lib || path.resolve(__dirname, '../lib'),
    opt.name_mod = opt.name_mod || 'utils',
    opt.name_method = opt.name_method || 'GCD',
    opt.tests = opt.tests || [{  
        args: [5, 10],
        exspect : 5
    }];
    opt.log = opt.log || log;
    // built in test function
    opt.testFunction = opt.testFunction || function(result, exspect, testObj, opt) {
        if(typeof exspect === 'number' || typeof exspect === 'string' || typeof exspect === 'boolean' ){
            return exspect === result;
        }
        if(typeof exspect === 'object'){
            if(exspect instanceof Array){
                return result.join() === exspect.join();
            }
        }
        return false;
    };
    return opt;
};
 
// PUBLIC API
let api = {};
 
// run test method
api.runTest = (opt) => {
    // parse options
    opt = parseOptions(opt);
    // preform the test
    let mod = require( path.resolve(opt.dir_lib, opt.name_mod + '.js') ),
    method = mod[opt.name_method],
    log = opt.log;
    log('', 'space');
    log('module: ' + opt.name_mod, 'info');
    log('method: ' + opt.name_method, 'info');
    opt.tests.forEach((testObj) => {
        var testResult = method.apply(null, testObj.args),
        pass = opt.testFunction(testResult, testObj.exspect, testObj, opt);
        log('', 'space');
        log('args: ' + testObj.args, 'result');
        log('exspect | result: ' + testObj.exspect + ' | ' + testResult, 'result');
        log('pass: ' + pass, 'result.pass', pass );
    });
    log('', 'space');
};
 
// export api
module.exports = api;
```

Well now that I have my test module I am ready to start writing some test scripts for a module with it. So in the next section I will be going over an example module, and some test scripts for that module.

## 2 - Trying it out

### 2.1 - The module to test

```js
var utils = {};
 
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
 
// bounding box
utils.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        (y1 + h1) < y2 ||
        y1 > (y2 + h2) ||
        (x1 + w1) < x2 ||
        x1 > (x2 + w2));
};
 
// is browser?
utils.isBrowser = (function(global){
    return function () {
        try {
            return global === window;
        } catch (e) {
            return false;
        }
    };
}(this));
 
// if nodejs, export utils
if (!utils.isBrowser()) {
    module.exports = utils;
}
```

### 2.2 - testing the distance method

```js
let path = require('path'),
testMod = require( path.resolve(__dirname, './testmod.js') );
 
testMod.runTest({
    name_mod: 'utils',
    name_method: 'distance',
    testFunction: function(result, exspect){
        // round becuase something like 99.99... is just about 100
        return Math.round(result) === exspect;
    },
    tests: [
        {
            args: [0,0, Math.cos(Math.PI * 0.25) * 100, Math.sin(Math.PI * 0.25) * 100],
            exspect : 100
        },
        {
            args: [0,0,100,0],
            exspect : 100
        },
    ]
});
```

### 2.3 - Testing the bounding box method

```js
let path = require('path'),
testMod = require( path.resolve(__dirname, './testmod.js') );
 
testMod.runTest({
    name_mod: 'utils',
    name_method: 'boundingBox',
    testFunction: function(result, exspect){
        return result === exspect;
    },
    tests: [
        {
            args: [5,5,32,32,7,6,1,1],
            exspect : true
        },
        {
            args: [5,5,32,32,0,0,1,1],
            exspect : false
        },
    ]
});
```
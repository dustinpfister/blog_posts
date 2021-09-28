---
title: Getting started with javaScript
date: 2018-11-27 11:18:00
tags: [js]
layout: post
categories: js
id: 338
updated: 2021-09-28 12:16:02
version: 1.34
---

I have written many posts on [javaScript](https://en.wikipedia.org/wiki/JavaScript) related topics, but so far oddly enough I have not written a [getting started post on javaScript](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics) until now of course. In this post I will offer some suggestions for getting started with javaScript that you can do right now from your desktop computer, without installing any additional software assuming you have a web browser and a text editor installed. In fact in some cases you just need a browser to get started when it comes to starting out in the javaScript console, or going to s web site like js fiddle that I was using for a while now and then.

However when it comes to really getting into javaScript development at some point sooner of later you might want to have at least nodejs installed. That is that it is something that you will want to learn sooner or later when it comes to doing anything and everything that can be done with javaScript outside of that of a web browser.

<!-- more -->

## 1 - What to know

I will not be covering everything there is to know of course, learning javaScript as with any programing language takes a whole lot of time and patience, as well as dedication. There is just way to much to cover when it comes to the idea of trying to wrap up everything into a single blog post. Still to get started with javaScript all that is needed is a computer with a fairly up to date web browser because in this post I will be writing about very simple examples that can be entered into [javaScript console of chrome](https://developers.google.com/web/tools/chrome-devtools/console/). However in this post I will also be going over a few source code examples that make use of nodejs also when it comes to doing things with javaScript outside of a web browser. There are many ways of getting started with javaScript, and I am thinking that I will try to cover all the various options when it comes to getting started with javaScript.

### 1.1 - Be sure to be using an up to date web browser if getting started with client side javaScript

In this post I am using Google chrome 70.x, and am using examples that can be copied and pasted into the javaScript console. The reason why is that I think the javaScript console is a good way to introduce people to javaScript that have no background with it at all. All that is needed is a web browser, and in addition you do not need to set up and account of any kind as well.

### 1.2 - Get node installed if you want to use javaScript for general programing outside of a web browser.

If you want to get started with server side javaScript you will want to get node installed to do so. In this post I will not be getting to nodejs in great detail, but it is one of several ways of going about getting started with javaScript. With that said I have wrote a post on doing [just that](/2017/04/05/nodejs-helloworld/), but I think I should at least touch base on a few examples in this post also. 

It is nice to start out with client side javaScript first though as it is something that can be done right now with just a web browser, rather than installing software beyond that which is often there to work with the begin with. However I would not put off getting into nodejs as it can be used to do server side programing with javaScript, and can also be used to write command line tools, and get things done with all kinds of general programing tasks outside of the browser.

## 2 - Using the javaScript console

In this section I will be going over some simple starting examples that can be entered into the javaScript console right now in the browser that you are using. Assuming that you are using a fairly modern web browser that has one such as Google chrome. I have [wrote a post in which I get into using the javaScript console in detail](/2019/07/29/js-getting-started-javascript-console/), however it is still worth mentioning here also.

To use the javaScript console in chrome I just need to do a ctrl+shift+j (windows/linux) on my keyboard when I have a new tab open. This can also be done at any site as well, and the scripts that are entered operate within the domain of that site. Which is why you get a warning if you do it from certain sites like facebook. In this post I will just be covering some simple examples that do not do anything malicious, however certain forms of hacking is possible from the javaScript console. So do not copy and paste code form just anywhere into it, unless you know what it does.

### 2.1 - Some simple expressions

Lets start out with some simple [expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators). Expressions are a series of values, variables and operators that evaluate to a value. They can end up being very complex, or very simple. So in the javaScript console just enter 5 + 5, and hit return, as expected the answer is 10. Now enter 5 + "5" and the answer is the string "55" the reason why this is is because 5 is a number and "5" is a string.

```js
> 5 + 5
< 10
> 5 + "5"
< "55"
```

### 2.2 - Operator precedence, and grouping

One thing I think javaScript developers should get straight right away is [operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence), or just simple order of operations. That is the order in which different operations are preformed when working out a lengthly expression that will produce some kind of product. Each operator in javaScript has a certain precedence over others, for example multiplication and devision is preformed before addition and subtraction. 

There are a lot of operators and over twenty different levels of operator precedence in javaScript, along with associativity. That is the direction in which operators are preformed. Generally the associativity of most operators is from left to right, but there are some where the opposite flow is what is in effect. I will not be getting into all of this in depth here as I have done so elsewhere, and this is just one of many rabbit holes that come up when it comes to learning to code. However in this getting started post on javaScript it would not hurt to play around with a few simple examples that have to do with just addition, subtracting, multiplication, and grouping.

 
```js
> 5 + 10 * 3 - 1;
< 34
> (5 + 10) * 3 - 1;
< 44
> 5 + 10 * (3 - 1);
< 25
> (5 + 10) * (3 - 1);
< 30
```

Expressions in javaScript are evaluated from left to right, however operators of higher precedence are preformed first. Because multiplication has a higher precedence then addition and subtraction 10 \* 3 is preformed first, and then the normal flow from left to right happens.

If for some reason I want to preform the addition first I can either change the order or use [parentheses](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Grouping)

```js
> (5 + 10) * 3 - 1
< 44
```

### 2.3 - Creating and using a function

Now to create something useful. Say you have a website that is getting ten thousand visitors a month, and you want to know how many visitors a month you might see in a few months if you can maintain a certain average rate of growth each month. A function can be authored to do something like that, and then copied and pasted into the console. Once it is copied into the console it can be called with arguments passed to it that contain the starting traffic, average rate of growth, and the number of months that I want to project.

```js
> var projectGrowth = function (opt) {

    opt = opt || {};

    opt.start = opt.start || 10000;
    opt.growth = opt.growth || 1.25;
    opt.months = opt.months || 6;

    return Math.floor(opt.start * Math.pow(opt.growth, opt.months));

};
< undefined
> projectGrowth({

        start: 10000,
        growth: 1.1,
        months: 3

    });
> 13310
```

## 3 - Using the file protocol and a text editor to get started with javaScript

Another option for getting started with javaScript is to use a text editor as a way to create html files that make use of embedded or external javaScript files. I have [wrote a post on getting started with javaScript and the file protocol](/2020/09/21/js-getting-started-file-protocol/) in which I get into some good starting examples when it comes to this kind of approach to starting to learn front end javaScript but I thought I would at least touch base on a basic example here also.

A good starting point would be to open a text editor and start out with something like this:

```html
<html>
    <head>
        <title>js getting started file protocol</title>
    </head>
    <body>
        <p></p>
        <script>
var p = document.getElementsByTagName('p')[0];
p.innerText = 'hello world';
        </script>
    </body>
</html>
```

Then save the file as something like index.html in a folder on your computer somewhere. Then in your web browser press ctrl+o and navigate to the index.html file and open it up. In the address bar your should see file:\/\/ rather than the usual https:\/\/ and then a URI to the location of the html file.

So this way of starting to learn javaScript involves making changes to plain static html and javaScript files and then just reloading your web browser to observe the changes. This kind of way of learning javaScript will work okay for most situations except for some things that you might eventually run into in which it will not work, at which point it is time to progress to learning how to set up a simple web sever to host what you are working on over https, even if it is just locally.

## 4 - Getting started with javaScript and nodejs

So then I covered hot to get started with a little javaScript in the developer console of a web browser, and also how to get started when it comes to creating an html file and just opening up that html file in the web browser by way of the file protocol. Those might be okay ways to go about getting started, but when it comes to starting to work on some kind of real client side javaScript project I am going to want to find a way to host what I am working on locally by way of the http protocol rather than the file protocol. So far we might not have run into any problems when it comes to using the file protocol, but they will come up in some situations. There are then two ways of addressing that loosing up security settings for the web browser, or setting uo a basic http sever to host the static files that I am working on over http.

There are a number of ways of setting up a simple static server using software outside of that of nodejs, but when it comes to doing so with javaScript nodejs might still be the best option to do so at this time. There is also a lot more to nodje then just setting up a static web server for some javaScipt and html examples, there is also using nodejs to do just about everything that one would want to do outside of that of a web browser. In this section then I will be going over some source code examples that have to do with getting started with nodejs.

### 4.1 - The e option of the nodejs binary

In Linux there is opening up a bash terminal window, then typing in the nodejs binary name, and passing the -e option. After that I can pass a string that should be some valid javaScript code. If all goes well the code will run, and any standard output that the script generate will be spit out.

```
$ node -e "console.log('hello world', 40 + 2);"
hello world 42
```

```
$ node -e "let os=require('os');console.log(os.platform());"
linux
```

In windows this can also be used as a way to evaluate a little javaScript code. The main difference is that I do so from the command prompt rather than bash. So then things might be a little different from one example to another, but for the most part using the -e option should work more or less the same.

```
C:\>node -e "console.log('hello world', 40 + 2);"
hello world 42
```

When it comes to using the os module this time the response should be win32 rather than linux.

```
C:\>node -e "let os=require('os');console.log(os.platform());"
win32
```

### 4.2 - Linux file shebang and getting started with writing files

When it comes to running a file from the command line there is just calling the script with the node binary, and then there is also setting a [nodejs shebang at the top of the file](/2017/03/26/linux_shebang/) and making the file executable. If yo are using windows, or are okay with always typing node first as a way to start a main script of a project then that will work fine. However when it comes to deploying some times adding a shebang is something that must be done in order for the script to run. It also allows for me to just call the main script of a project directly because the shebang tells bash where the binary is to run the script. So in this section I will be going over the basic of this kind of file that will be called with node, rather than using the -e option or the javaScript console of node.

``` js
#!/usr/bin/node

/*
 *    $ node file-shebang
 *    10.24.0
 *
 *    $ ./file-shebang.js
 *     bash: ./file-shebang.js: Permission denied
 *
 *    $ sudo chmod 777 file-shebang.js
 *    $ ./file-shebang.js
 *    10.24.0
 */
 
console.log(process.version);
```

### 4.3 - Piping in some standard input to a script file, and having better control over standard output and standard error 

There is then also writing a script where I am doing something with some data that is being passed to the script by way of the standard input. In [Linux or the bash console in general many commands will allow for piping data into the standard input](/2020/10/09/linux-pipe/) which is a great way to go about braking a complex task down into many small steps. When it comes to working with Linux commands there are all kinds of commands to use in such a system that and be piped together in order to get a desired final result. So then there should be a way to create my own scripts using javaScript and node to create programs like this and of course there is. 

The process global can be used as a way to attach an event handler that will respond to data that is being piped into the standard output. There is then just a question of parsing that data, doing something with it, and then spiting output to the standard output, and or the standard error. Just like with all these various Linux commands that can be used with each other like echo, cat, and grep to just name a few.

When it comes to standard out put the console log method is something that we have been using thus far, but there is also using the porcess.stdout.write method in place of console log that will allow for me to have more precise control over the output when it comes to appending an end of line or not. Also there is the process.stderr.write method that can be used to spit things out to the standard error in place of console.warn.

```js
#!/usr/bin/node
 
/*
 * $ echo "[1,2,3]" | node process-stdin-stdout.js
 * [2,4,8]
 *
 */
 
let os = require('os');
 
// on standard input
process.stdin.on('data', (data) => {
    let str = data.toString(),
    sourceArr = [],
    arr = [];
    try{
        sourceArr = JSON.parse(str) 
    }catch(e){
        process.stderr.write(e.message);
    }
    arr = sourceArr.map((n) => {
        return Math.pow(2, parseInt(n));
    });
    process.stdout.write(JSON.stringify(arr) + os.EOL);
});
```

## 5 - Conclusion

Getting started with javaScript is not so hard, it just takes some time and patience. There is a great deal more to write about when it comes to making an actual project of some kind, but for the sake of keeping this post simple I just covered a few pointers for now. 

This is a post that I will come back to at some point to revise, and expand, in fact I have done so several times all ready. There is maybe expanding this post with at least a few basic, and hopefully fun examples of javaScript. When it comes to this I have [wrote a collection of posts that serve as basic, and some not so basic canvas examples](/2020/03/23/canvas-example/). I have also started a [similar collection of posts but with javaScript in general](/2021/04/02/js-javascript-example/) rather than that of just canvas elements alone.


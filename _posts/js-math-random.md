---
title: Math random method in javaScript
date: 2020-04-21 18:19:00
tags: [js]
layout: post
categories: js
id: 649
updated: 2022-05-10 11:07:57
version: 1.83
---

Starting out with the [Math.random](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) method in javaScript is simple enough, I just call it and I get a random number between 0 and 1, and can potential include 0 but not 1 from what I have read. From there it is all about what you do with that value when it comes to doing something with such a random value. For example if I want random numbers between 0 and 6 then I just need to multiply the returned value from the math random method by 6.

With that said there is maybe a bit more that just calling the method then when it comes to rounding, getting a range, when it comes to the use of the Math random method in javaScript. One interesting advanced topic might be with the nature of the distribution when using the method largely by itself, as the algorithm used might differ from one javaScript implementation to another. 

There are all kinds of expressions, and functions where I might want to plug in a random value, but there is also making such a value a variable in the expression, or an argument of a containing function body that defaults to 0. So lets take a look at a few examples of the Math random method in javaScript from simple to not so simple when it comes to really getting into this specific method.

<!-- more -->

## 1 - what to know first, and some Basic Math random examples

Many of the examples here are fairly basic, and easy to just copy and paste over into a project. Still I assume that you have at least some background when it comes to [getting started with javaScript](/2018/11/27/js-getting-started/). I will not be going over every little detail that you should be aware of before hand in this post as I want to make the focus on the Math random method, and various other related topics that might come up when it comes to using such a method. However I will be touching base on a few things that you might want to read up more on before continuing to read the rest of this post.

In this section I will also be starting out with some fairly basic examples of the Math.random method these will just be the usual hello world style type examples. However in the process of doing so I will also be going over some of the basics of expressions, and writing functions in the process of doing so.

It should go without saying that for the most part this section is for total beginners of javaScript. I should focus heavily on that kind of crowd here as many who read this are in fact fairly new to javaScript still as this is one of the first things I would want to learn how to do when learning a new language. If you do have a fair about of experience with javaScript then chances are you will want to skip over this section to get to the good stuff near and at the bottom of the post.

### The examples here can be found on my github

Like all my other posts on vanilla javaScript the source code examples here can be found in [my test vjs github repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-math-random). I do get around to editing this post now and then, and that is where I will keep my latest revisions of what I am writing about here. If you see something wrong with one of these examples that would also be where to make a pull request, and there is also the comments section of this post.

### 1.1 - A Very basic math.random example in the javaScript console

So the basic deal is to just call the math random method, when doing so you will get a number between 0 and 1 as the return value of the native method. That is all there is to it if that is all that is needed, and in some cases that is all that is needed actually. With that said I think I should maybe start out with an examples that can be used in the javaScript console of a web browser such as Google chrome. I have wrote a [getting started with javaScript type post on this very subject](/2019/07/29/js-getting-started-javascript-console/), but the basic idea is to just press ctrl + shift + j in Google chrome and make sure that you have the console tab selected. A line of javaScrit code that is then just calling the Math random method can be called in the console.

So just type Math.random\(\) at the \> prompt and press return. The result should then be a random number.

```html
> Math.random()
< 0.6060413720315996
```

The random number can then be multiplied, and used in all kinds of different expressions to get desired random ranges. So from this point forward it is just working out the expressions that are needed to work with this kind of method. Those expressions can then end up being the return values of functions, or be used to create arguments for [pure functions](/2020/06/18/js-function-pure/).

If you have nodejs installed, and if you really want to get into javaScript you should at some point it is also possible to get started with basic javaScript code examples by making use of the -e option when calling nodejs from a bash or cmd command prompt.


So then in posix like systems like Linux and MacOs you can do something like this if you have nodejs installed.
```
$ node -e "console.log(Math.random())" 
```

In windows systems the same can be done in the command prompt.

```
C:\> node -e "console.log(Math.random())" 
```

### 1.2 - Client side javaScript example

So now that I got some basic examples that have to do with using the javaScript console out of the way there is going over a few examples that have to do with creating some kind of file and then option that up in a web browser, or run with nodejs. For this example I will be going over a quick client side javaScript environment example of using the Math.random method.

When it comes to client side javaScript I can use methods like the [document query selector method](/2020/06/23/js-document-queryselector/) to get a reference to an html element. In this example I am going to use a text area element and set the value property of the element to a random number.

```html
<body>
    <textarea id="out" cols="30" rows="15"></textarea>
    <script>
var n = Math.random();
document.querySelector('#out').value = n;
    </script>
</body>
```

So then there is the topic of [setting up a basic web server](/2017/12/04/nodejs-simple-static-sever-file/) as a way to host this kind of index.html file up via the http protocol. That is the proper way to go about doing so actually, however when it comes to something like this it is still possible for it to work okay by just opening it up in a web browser by way of the file protocol.

### 1.3 - nodejs example of Math.random

Now for a nodejs file example that can be called from the command line. For this example I am using the os module of nodejs to get the End of line string for the underlaying operating system. I am then using the write method of an instance of a stream of the stdout property of the process global to write to the standard output.

```js
// the os module
let os = require('os');
// random number
var n = Math.random();
// using the write method of the stdout stream
// of the process global
process.stdout.write( String(n) + os.EOL )
```

So then the next step when it comes to this kind of nodejs example is to save it as something like basic-node.js and call the script from the command line with nodejs.

```
$ node basic-random
```

The end result is then yet another way to go about using the Math random method in a project.

### 1.4 - function die example

Okay now I think I should write about making at least one or more functions that make use of the Math random method, starting out with a simple die function example. This function will just take one argument that is the number of sides that a die has, and return a random number between and including 1 and the total number of sides.

```js
var rollDie = function (sides) {
    sides = sides === undefined ? 6 : sides;
    return Math.floor(Math.random() * sides) + 1;
};
 
console.log( rollDie() );
 
console.log( rollDie(20));
```

### 1.5 - function roll dice example

How about another function example that builds on top of the die function example that I went over above? With that said how about a roll dice function that will take an array of numbers that defaults to \[6,6\] that is an array sides for a set of dice? Inside the body of this roll dice function the [array map method](/2020/06/16/js-array-map/) can be used to create an return a new array from the source array that is this array of sides. So the n each element in the new array that is returned is the result of rolling a dice with the sides value in the source array.
 
```js
var rollDie = function (sides) {
    sides = sides === undefined ? 6 : sides;
    return Math.floor(Math.random() * sides) + 1;
};
 
var rollDice = function (dice) {
    dice = dice === undefined ? [6, 6] : dice;
    return dice.map(function (sides) {
        return rollDie(sides)
    });
};
 
console.log(rollDice());
 
console.log(rollDice([6, 6, 6, 6, 20]));
```

## 2 - Range and Math random

So then there is just calling the main random method, and then there is plugging the value into some very simple expressions to get some kind of number from zero upwards. However there is then using math.random in various other expressions that have to do with getting a number that is within a range. There is starting out with just a basic example, but then there is maybe running into some problems that have to do with rounding rather than getting a float value. I will be getting into the subject of rounding in depth in a later section in this post, but the main focus in this section will be on the subject of dealing with a random range between and in some cases including a min and max value.

### 2.1 - Basic range example

Getting a range involves a simple expression where you start with the low end of the range and then add by a random number that is the result of Math.random multiplied by the result of the high end of the range with the low end deducted.

```js

var randomRange = function (low, high) {
    low = low === undefined ? 0 : low;
    high = high === undefined ? 1 : high;
    var range = high - low;
    return low + range * Math.random();
};

var n = randomRange(-5, 5);
console.log(n); // between -5 and 5
```

Although this is often the basic idea of how to do about doing this sort of then with random numbers there is a bot more to write about with this of course. For one thing there is running into problems with rounding.

### 2.2 - A per range function example, and pulling Math.random out of the function

It might be better to start out with a range function in which I am pulling the call of Math.random out and placing an argument that represents the kind of value that Math.random returns in its place. This way I have a function in which I have three arguments one of which what I often call a per value which is short for percent, along with a low and high value. This way I can pass Math.random as the per value, or I can also give a number literal value also.

```js
// per range method
var rangePer = function (per, low, high) {
    per = per === undefined ? 0 : per;
    low = low === undefined ? 0 : low;
    high = high === undefined ? 1 : high;
    return low + (high - low) * per;
};
// so I can plug math.random in for per
console.log(rangePer(Math.random(), 5, 15) );
// put I can also pass a number literal
console.log( rangePer(0.0, 5, 15) ); // 5;
console.log( rangePer(0.5, 5, 15) ); // 10;
console.log( rangePer(1.0, 5, 15) ); // 15;
```

### 2.3 - Using the per method as a base for a random range method

Form the range per method I can then cerate all kinds of additional methods that involve the use of the Math.random method. There is having a method that will just call Math.random and pass that as the value for the range per function, but on top of that also providing a filter argument that can be just a function to which the return value of calling the range per method with Math.random value is pass threw that is a range random method. This range random method can then be called with a filter in which I am using the Math.floor method to round the value return by range per to create an integer value. I can then also create additional methods beyond this such as one that will take an array and return a random element from that array and so forth, and so on.


```js
// per range method
var rangePer = function (per, low, high) {
    per = per === undefined ? 0 : per;
    low = low === undefined ? 0 : low;
    high = high === undefined ? 1 : high;
    return low + (high - low) * per;
};
// rangeRandom method
var rangeRandom = function (low, high, filter) {
    filter = filter === undefined ? function (n) {return n;}: filter;
    return filter(rangePer(Math.random(), low, high));
};
// rangeRandom integer method
var rangeRandomInt = function (low, high) {
    return rangeRandom(low, high, function (n) {
        return Math.floor(n);
    });
};
// rangeRandom array method
var rangeRandomElement = function (array, si, ei) {
    array = array || [];
    si = si === undefined ? 0 : si;
    ei = ei === undefined ? array.length : ei;
    var index = rangeRandomInt(si, ei);
    return array[index];
};
// can get a raw random range like this
console.log(rangeRandom(1, 6));
// I can also use one of the functions that make use of a filter
console.log(rangeRandomInt(1, 6));
console.log(rangeRandomElement(['foo', 'bar', 'baz']));
// can also do things like this
var a = Array.from({
        length: 5
    }).map(function (el, i) {
        return rangePer(i / 5, 25, 50);
    });
console.log(a); // [ 25, 30, 35, 40, 45 ]
```

## 3 - Rounding random numbers

When it [comes to rounding](/2020/06/15/js-math-round/) and random numbers you want to be careful. Make sure that you are using the Math floor or math ceil methods rather than just the math round method. That is unless you want the result of what happens when you use the math round method to be what happens. 

You see if you multiply the result of a Math random call by a number such as six, and use the Math round method to round the result the range will be from and including 0 to and including 6 which is a range of 7 possible values where you might only want 6. So you will want to multiply by 5 rather than 6, or use the math floor or ceil methods rather than the math round method.

```js
console.log( Math.round(0.01) ); // 0
console.log( Math.ceil(0.01) ); // 1
console.log( Math.floor(0.01) ); // 0
 
console.log( Math.round(0.5) ); // 1
console.log( Math.ceil(0.5) ); // 1
console.log( Math.floor(0.5) ); // 0
 
console.log( Math.round(0.99) ); // 1
console.log( Math.ceil(0.99) ); // 1
console.log( Math.floor(0.99) ); // 0
 
console.log('******');
console.log( Math.round(Math.random() * 6) ); // 0 - 6 (range of 7!)
console.log( Math.ceil(Math.random() * 6) ); // 1 - 6 (range of 6)
console.log( Math.floor(Math.random() * 6) ); // 0 - 5 (range of 6)
```

## 4 - Random Color methods

Now for some [random color method examples](https://stackoverflow.com/questions/1484506/random-color-generator) that should work okay when it comes to client side javaScript. These are many ways go do about making this kind of method, and many little features when it comes to having control over various aspects of this kind of process. For example some times I might want to have random shads of just a single color channel. Also I might want to have a random range of colors. Other times I might want to have a static array of options for colors and I just want to have one of those options.

### 4.1 - Array of color options

One way to go about doing this would be to have an array of color options and then just return a random element from that array. I can make it so that there is a hard coded list of options that are just back and white, and then maybe pass any custom array of colors that I might want for other situations.

```js
var randomColor = function (options) {
    options = options || ['white', 'black'];
    return options[Math.floor(options.length * Math.random())];
};
console.log(randomColor()) // black or white
console.log(randomColor(['red', 'lime', 'cyan', 'black', 'white']));
```

### 4.2 - A nice concise solution

This is one of the most concise solutions for a random color generator function that I have found thus far. This works by passing the value 16 to the [to string](/2020/07/14/js-to-string/) method of the number prototype that results in converting the random number to a hex string. I then just want the last six characters of that hex sting to get a valid random color as a hex string.

```js
var randomColor = function () {
    return '#' + Math.random().toString(16).substr(-6);
};
console.log( randomColor() );
```

### 4.3 - rgb method

Here I have a method where I am using the rgba format for making a web color, however I just want a random range for a fixed color channel.

```js
var randomRed = function (rLow, rHigh) {
    rLow = rLow === undefined ? 0: rLow;
    rHigh = rHigh === undefined ? 255: rHigh;
    var r = Math.round(rLow + Math.random() * (rHigh - rLow));
    return 'rgba(' + r + ', 0, 0, 1)';
};
console.log(randomRed()); // full red range
console.log(randomRed(200, 220)); // 200 - 220
```

## 5 - The Math random method and Distribution

Now for a word or two on distribution when using the Math round method. Now the math random method will give pseudo random numbers, however it will distribute in a way that is kind of not so random. That is that the numbers will be kind of evenly distributed when using it, unless you do something more to change that. So in this section I will be going over concerns over distribution and the use of the math random method in the javaScript Math object.

### 5.1 - Random Distribution scatter plot example

A good way to understand what is going on with this would be to create something that looks like a [scatter plot](https://en.wikipedia.org/wiki/Scatter_plot) of sorts. If I use the Math random method to generate a bunch of random points by just multiplying width by a Math random call for x, and height by a Math.random call then the points will be random, but in a very evenly distributed kind of way.


So say I have a dist.js file like this.

```js
var dist = (function () {
    var api = function (count, w, h, method) {
        count = count === undefined ? 100 : count;
        w = w === undefined ? 320 : w;
        h = h === undefined ? 240 : h;
        method = method || api.methodOne;
        var points = [],
        i = count;
        while (i--) {
            points.push(method(i, w, h));
        }
        return points;
    };
    api.methodOne = function (i, w, h) {
        return {
            x: Math.floor(Math.random() * w),
            y: Math.floor(Math.random() * h)
        };
    };
    api.methodTwo = function (i, w, h) {
        return {
            x: Math.pow(2, Math.log(w) / Math.log(2) * Math.random()),
            y: Math.pow(2, Math.log(h) / Math.log(2) * Math.random())
        };
    };
    return api;
}
    ());
```

And I make use of it in an html file like this.

```html
<html>
    <head>
        <title>Math random</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script src="dist.js"></script>
        <script>
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d'),
points1 = dist(1000, 150, 200, dist.methodOne);
points2 = dist(1000, 150, 200, dist.methodTwo);
 
var drawPoints = function (points, ctx, fill, sx, sy) {
    ctx.fillStyle = fill || 'green';
    sx = sx === undefined ? 0 : sx;
    sy = sy === undefined ? 0 : sy;
    points.forEach(function (pt) {
        ctx.beginPath();
        ctx.arc(sx + pt.x, sy + pt.y, 5, 0, Math.PI * 2);
        ctx.fill();
    });
};
 
drawPoints(points1, ctx, 'red');
drawPoints(points2, ctx, 'green', 150);
 
        </script>
    </body>
</html>
```

The result is random points, but they are distributed in very different ways. By using Math log in conjunction with math random to work out the points that results in a very different distribution of values for the points, many more of the points are concentrated to the lower sides of the area so they are not so evenly distributed.

## 6 - No replacement

When it comes to the subject of random numbers there is the topic of replacement, and not replacement. That is that there is the concept of selecting a number between and including 1 and 10, but then each time a section is made it is possible to select the same number next time. This would be considered random selection with replacement. So then there is the concept of not having replacement then, that is that of the options start out as \[1,2,3,4,5,6,7,8,9,10\] and the first random section is 4, then the current state of the array would now be \[1,2,3,5,6,7,8,9,10\] and then the size of the array would continue to reduce with each call after that.

## 6.1 - A create hat method

This example I made real quick might server as a decent example of random selection with out replacement. On top of using the Math random method when it comes to making the random section it is also a half way decent example of the concept of [closures in javaScript](/2019/02/22/js-javascript-closure/). Also I am using the array map method as a way to quickly make a [shallow copy of an array](/2020/09/03/js-array-copy/).

```js
var createHat = function (sample) {
    sample = sample || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var inHat;
    var api = {
        pull: function () {
            if (inHat.length > 0) {
                var index = Math.floor(Math.random() * inHat.length);
                var result = inHat.splice(index, 1);
                return result[0];
            }
            // nothing in the hat
            return false;
        },
        start: function () {
            return inHat = sample.map(function (n) {
                    return n;
                });
        }
    };
    api.start();
    return api;
};
 
var hat = createHat();
var i = 0;
while (i < 15) {
    var n = hat.pull();
    if (n === false) {
        hat.start();
        n = hat.pull();
        console.log('');
        console.log('new hat');
        console.log(n)
    } else {
        console.log(n);
    }
    i += 1;
}
```

When I run this script the result is random numbers being lodged out to the console between and including 1 to 10, but no number ever repeats. That is until of course I call the start method of the hat object that is returned with the create hat method.

## 7 - Random item probability example

In certain game projects I may have items, for example in a RPG style game I might have various kinds of item drops. In such a game I might have more than one class of object, and the probability of these items dropping might change a little. For example I might have a junk class of item that is dropped almost all the time, and then on the other extreme I might have an epic class of items that is almost never dropped. Or at least maybe that is how things would start off as there would be ways to change the probabilities for each of these kinds of classes. For example maybe there is a \0.5\% chance of an Epic item dropping to start off with, but threw various items, upgrades, and other factors maybe that percentage can increase to as much as say \10\%.

In this section then I will be going over an example that I put together fairly quickly for the sake of this post that is a kind of system that is used to create an object that is a kind of items classes object. Now this might not be the kind of system that is a full blown item system of sorts that I would actually use in a game, but it might still be a starting point for a component of such a system that has to go with creating a state object that is used to figure out what the chances are of a given class of item being dropped by and enemy each time an enemy is killed.

### 7.1 - The item class javaScript Module

The main file of interest for this example then would be the item class module. This module will need to have at least two pubic methods for starters, one of which is used to create a state object that holds the current probabilities for each item class, and the other is used to return a random item class object. 

In the create method a pool of objects will be crated for a returned state object that will be used for other methods in this module, one object for each item class in the game. Each of these objects should contain at least a points value along with other info such as a description, or id key that will be used with the over all greater item system to create the actually item elsewhere in a project that make use of this. The array reduce method can then be used as a way to sum these points values, and then a value of 0 to 1 can be figured for each object. It is then this value from 0 to 1 that can be used to find out if a certain class of item will be dropped or not.

```html
var itemClass = (function(){
    var DEFAULT_COLORS = ['#efefef', 'lime', 'blue', 'orange', 'purple'];
    // default pool of objects for each item class
    var DEFAULT_POOL = [
        { desc: 'Junk', range: [1000, 250] },
        { desc: 'Common', range: [300, 800] },
        { desc: 'Fair', range: [150, 500] },
        { desc: 'Rare', range: [50, 250] },
        { desc: 'Epic', range: [10, 100]}
    ];
    DEFAULT_POOL = DEFAULT_POOL.map(function(obj, i){ obj.color = DEFAULT_COLORS[i] || 'white'; return obj;  })
    // public api
    var api = {};
    // parse pool helper
    var parsePool = function(classes){
        return classes.pool.map(function(obj, i){
            obj.range = obj.range || [1, 1];
            var min = obj.range[0],
            max = obj.range[1], level;
            obj.levelPer = obj.levelPer === undefined ? 0 : obj.levelPer;
            level = classes.levelPer * classes.levelPerRatio + (1 - classes.levelPerRatio) * obj.levelPer;
            obj.points = min + (max - min) * level;
            obj.desc = obj.desc || '';
            obj.color = obj.color || DEFAULT_COLORS[i] || 'white';
            return obj;
        });
    };
    // create ITEM Classes object
    api.create = function(opt){
        opt = opt || {};
        var classes = {
            levelPer: opt.levelPer || 0,
            levelPerRatio: opt.levelPerRatio === undefined ? 1 : opt.levelPerRatio
        };
        // use given pool array or default starting pool
        classes.pool = opt.pool || DEFAULT_POOL;
        // parse given pool collection
        classes.pool = parsePool(classes);
        // get total points
        classes.totalPoints = classes.pool.reduce( function(acc, obj){ return acc + obj.points;}, 0);
        // set 0-1 numbs for each itemClasses object
        classes.pool = classes.pool.map( function(obj, i){ obj.per = obj.points / classes.totalPoints; obj.i = i; return obj; } );
        return classes;
    };
    // GET a random ITEM classes object
    api.getRandomItemClass = function(classes){
        var i = 0,
        len = classes.pool.length
        roll = Math.random(),
        n = 1
        while(i < len){
            var item = classes.pool[i];
            n -= item.per;
            if(roll > n){
                return item;
            }
            i += 1;
        }
        return item;
    };
    // return the public api
    return api;
}());
```

### 7.2 - The index html file

I now have an index html file that makes use of my item class module just for the sake of making sure it is working okay so far. In this index html file I have a canvas element that I will be using to get a visual sense if this item class module is working the way that I would want it to or not.

```html
<html>
    <head>
        <title>Math random</title>
    </head>
    <body>
        <canvas id="the-canvas" width="640" height="480"></canvas>
        <script src="item-class.js"></script>
        <script>
// DEMO
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
// creating a item classes object
var items = itemClass.create({
   levelPer: 1,             // the current global level for item drops
   levelPerRatio: 0.25,     // the ratio 0-1 that is the amount that the global levelPer effects points for each item class
   pool: [                  // pool defining values for each class
     {desc: 'Junk', range: [1000, 300], levelPer: 0.25},
     {desc: 'Common', range: [100, 800], levelPer: 0.5},
     {desc: 'Epic', range: [10, 100], levelPer: 1}
   ]
});
// create bars array
var bars = items.pool.map(function(item){
    return {
       i: item.i,
       color: item.color,
       desc: item.desc,
       count: 0
    };
}),
bLen = bars.length;
var i = 0, len = 1000, bi;
while(i < len){
    var item = itemClass.getRandomItemClass(items);
    bi = item.i;
    var bar = bars[bi];
     bar.count += 1;
    i += 1;
}
// draw bars
var max = Math.max.apply(null, bars.map(function(bar){ return bar.count;}));
ctx.fillStyle = '#afafaf';
ctx.fillRect(0,0,canvas.width, canvas.height);
ctx.font = '20px arial';
ctx.lineWidth = 3;
var barHeight = canvas.height / bLen - 5;
bars.forEach(function(bar, i){
   var p = bar.count / max,
   y = canvas.height / bLen * i;
   ctx.fillStyle = bar.color || 'lime';
   ctx.strokeStyle = '#4a4a4a';
   ctx.beginPath();
   ctx.rect(0, y, canvas.width * p, barHeight );
   ctx.fill();
   ctx.stroke();
   ctx.fillStyle = 'black';
   ctx.textBaseline = 'middle';
   ctx.fillText(bar.i + ') ' +bar.desc, 10, y + barHeight / 2);
});
        </script>
    </body>
</html>
```

## 8 - Conclusion

So that is it for now when it comes to random numbers and javaScript using the built in Math random method. In the event that I get some more time, or that I find something more to write about when it comes to the Math.random method, and other things surrounding random numbers in general I will expand this post a bit more as I have a few times all ready.

For now there is maybe reading up more on the various other features of the Math object. It might not be needed to go threw all of them but one of the methods I use often is the [Math atan2](/2019/03/19/js-math-atan2) method which is useful for finding angles between two points for example. There is also getting int using all kinds of formulas that make use of the [math pi](/2020/06/05/js-math-pi/) constant, and also looking into the [natural logarithm](/2018/12/26/js-math-log/) method also.

When it comes to learning a language other then that of javaScript there is the [random standard library in python](/2021/01/22/python-standard-library-random/). That library contains a method just like Math.random, but also a number of other methods for various features that often need to be added by a user space library, or a little additional javaScript code such as with the examples outlined in this post.

Also there are many javaScript libraries that have random methods in them and often they are not just simply wrappers or abstractions of the core javaScript math.random method. For example in the [math utils object of the threejs library there is a seeded random method](/2022/04/11/threejs-math-utils/).


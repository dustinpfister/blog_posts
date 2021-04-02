---
title: JavaScript fizzbuzz examples
date: 2020-06-26 13:48:00
tags: [js]
layout: post
categories: js
id: 672
updated: 2021-04-02 11:53:01
version: 1.17
---

When looking for code examples that solve a given problem many of us might just seek out [something that just works often on stack overflow](https://stackoverflow.com/questions/16620665/fizzbuzz-program-details-given-in-javascript), copy and past it in, and move on. Although there might be many great code examples for certain problems out in the open web that work fine, they might not always work great all the time, in every little way. 

In this post I will be going over not one, but many [JavaScript examples](/2021/04/02/js-javascript-example/) of a solution to a simple game of sorts know as [fizzbuzz](https://en.wikipedia.org/wiki/Fizz_buzz). The you tube user [Tom Scott did a video of fizzbuzz on youtube](https://www.youtube.com/watch?v=QPZ0pIK_wsc&t=160s) that I managed to catch that inspired me to write this post, and expand on my collection of javaScript example posts that I would like to keep working on a little now and then. 

Tom brings up a lot of important points that I try to keep in mind when writing code, not just for the sake of this post but in general. There is of course just quickly throwing together something that works, and then there is thinking more in terms of readability, and preparing for the future. Getting together a few code examples on a simple programing things such as fizz buzz might help to get a better idea of the fact that just because something works it does not meed that there is something wrong with it.

<!-- more -->

## 1 - javaScript fizzbuz example that is many console.logs, and if statements

One solution is to start out with having a for loop that goes threw all values for i from 1 up to, and including 100. For each value of i I then use conditional statements to log Fizz, Buzz, FizzBuzz, and just logging out the value of i. In each if statement I am using expressions to test if a value of i is a multiple of 3 or not, and also if it is a multiple of 5 or not. I am not using return or anything to that effect to break out if one statement happens or anything to that effect.

```js
for (var i = 1; i <= 100; i++) {
    var output = '';
    if (i % 3 == 0 && (i % 5 != 0)) {
        console.log('Fizz');
    }
    if (i % 3 != 0 && (i % 5 == 0)) {
        console.log('Buzz');
    }
    if (i % 3 == 0 && (i % 5 == 0)) {
        console.log('FizzBuzz');
    }
    if ((i % 3 != 0) && (i % 5 != 0)) {
        console.log(i);
    }
}
```

This solution works as expected, but all ready looks pretty sloppy. Also what about further expanding the code to included additional messages to print for certain multiples or collections of multiples. That would result in yet even loner expressions for each possibility. So then there should be a cleaner way of doing the same thing  right? Well lets look at some more examples that do the same thing.

## 2 - Using an output variable

So another solution would involve using a variable that starts out as an empty string by default for each value of i in the loop. Then test if i is a multiple of 3 and if so add Fizz to the output string. Then if i is a multiple of 5 add Buzz to what will either be Fizz or an empty string. If after all this the value of the output variable is still an empty string set the value of output to the value of i.

```js
for (var i = 1; i <= 100; i++) {
    var output = '';
    if (i % 3 === 0) { output += 'Fizz'}
    if (i % 5 === 0) {
        output += 'Buzz'
    }
    if (output === '') {
        output = i;
    }
    console.log(output);
}
```

For Cleaner sure, but we are still repeating code here, so maybe there is yet an even better way maybe?

## 3 - Helper method

So now there is the idea of making a helper method that accepts the current value of i, a multiple value such as 3, and then a message to return.

```js
var fizzer = function (i, m, mess) {
    if (i % m === 0) {
        return mess;
    }
    return '';
}
 
for (var i = 1; i <= 100; i++) {
    var output = '';
    output += fizzer(i, 3, 'Fizz');
    output += fizzer(i, 5, 'Buzz');
    if (output === '') {
        output = i;
    }
    console.log(output);
}
```

So now I have a little fizzer pure function of sorts that will always return the right string value for a set of given arguments. So now I am not reading code, but I have to add some code to not do so over and over again. For now it does not make a big difference, but if this project where to grow larger over time it might add up.

## 4 - client side javaScript example

In this section I will be going over a client size javaScript example of a simple fizz buzz program. In this example of fizz buzz I am once again mutating the code a little. It is more or less the same example as the code that I worlds out in my helper example. However now I have two methods, one is the fizzer helper, and the other is a method that will create an array of objects for each result. Both of the methods are pulled into a simple module that follows the object literal pattern for client side javaScript module design.

So the point here is that the code once again has to change a little so that things will work in a client side javaScript environment.

### 4.1 - fizz.js file

I puled all the code that has to do with getting a collection of results into a module that I called fizz.js. The point here is to separate the code that has to do with creating a module from code that will render that module.

```js
// fizzer
var fizz = {};
fizz.fizzer = function (i, m, mess) {
    if (i % m === 0) {
        return mess;
    }
    return '';
}
// create array
fizz.createFizzBuzzArray = function (len) {
    len = len || 100;
    var arr = [];
    for (var i = 1; i <= len; i++) {
        var output = '';
        output += fizz.fizzer(i, 3, 'Fizz');
        output += fizz.fizzer(i, 5, 'Buzz');
        if (output === '') {
            output = i;
        }
        arr.push({
            i: i,
            output: output
        });
    }
    return arr;
};
```

### 4.2 - The index.html file

I then have an index.html file that will make use of my fizz.js module to create html from the array of results that is created using the fizz.js module. For this client side javaScript example of fizz buzz I am just using the create fizz buzz array method of my fizz.js module to create a list of objects, and then I am using the Array.map and Array.join methods to create a bunch of paragraph elements as an HTML string. I can then append this html string to a container element in the html file by way of getting a reference to the container element and then setting this html string as the value of the innerHTML property of the container element reference.

```html
<html>
    <head>
        <title>fizzbuzz</title>
    </head>
    <body>
        <div id="results"></div>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script src="fizz.js"></script>
        <script>
var arr = fizz.createFizzBuzzArray(100);
var html = arr.map(function (result) {
    return '<p>' + result.i + ' : ' + result.output + '<\/p>';
}).join('');
document.getElementById('results').innerHTML = html;
        </script>
    </body>
</html>
```

This might not be the best way to go about making a client side javaScript example of this, as there are many other ways I could go about creating html elements. I could also make some kind of interface so a user could set the max number of index values for the array. There are many other ways to go about displaying data in a client side javaScript environment also, including textarea and canvas elements just to name a few.

The code is also still not portable across environments here also. It might be a step in the right direction at least, but the fiz module as it exists in this example will only work okay in this client side javaScript environment. The code will have to mutate yet again in order to get things working in a nodejs environment.

## 5 - Conclusion

There is even more to writ about when it comes to all the little issues that will come up that result in technical problems, as well as readability concerns. There is always more than one solution to a problem, and some work may work out a little better than others. The situation might change and code might break, or it might end up eating up too much resources and needs to be scaled. The list of concerns goes on, and on, but it seems to me there are two general ways of thinking when it comes to working out any kind of solution for a problem. One way is to just quickly throw something together that works and moving on, and the other is trying to make a more solid software product that might take way longer to produce.
---
title: JavaScript fizzbuzz examples
date: 2020-06-26 13:48:00
tags: [js]
layout: post
categories: js
id: 672
updated: 2020-06-26 14:14:55
version: 1.3
---

When looking for code examples that solve a given problem many of us might just seek out something that just works, copy and past it in, and move on. Although there might be many great code examples for certain problems out in the open web that work fine, they might not always work great all the time, in every little way. 

In this post I will be going over not one, but many examples of a solution to a simple game of sorts know as fizzbuzz. [Tom Scott did a video of fizzbuzz on youtube](https://www.youtube.com/watch?v=QPZ0pIK_wsc&t=160s) that I managed to catch that inspired me to write this post.

<!-- more -->

## 1 - Many console.logs ans if statements

One solution is to start out with having a for loop that goes threw all values for i from 1 up to and including 100. the use conditional statements for Fizz, Buzz, FizzBuzz, and just logging out the value of i.

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

So now I have a little fizzer pure function of sorts that will always return the right string value for a set of given arguments.
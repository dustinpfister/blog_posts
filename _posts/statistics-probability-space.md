---
title: Probability Space in Statistics
date: 2021-03-02 15:39:00
tags: [statistics]
layout: post
categories: statistics
id: 814
updated: 2021-03-02 16:18:34
version: 1.5
---

I have been trying my luck with [Statistics](https://en.wikipedia.org/wiki/Statistics) as a way to go about expanding into something new that I have a tenative interest in. As such I will likly be writing at least a few posts on probabity, and with that said I have come accross something called [Probibility Space](https://en.wikipedia.org/wiki/Probability_space).

<!-- more -->

## 1 - Some simple examples about getting dubble sixes

To start off with how would I go about testing the claim that the probablity of roling dubble sixes with a set of dice is about 2.8 percent? I guess I could just assume that they person who is saying that is just telling me the truth, and move on. However what if I did want to go about testing that to find out of it is true?

Well I guess I could just thrash togetaher a little javaScript to get an idea if that is a fare statement or not. However there are two general ways of going about doing so. One would involve using the Math.random function, and then the other would be a pure function that involves a simple expression. So with that said in this section I will be going over these examples that come to mind.

### 1.2 - An example using Math.random

One way to go about finding out if the probaiblity of rolling double sixes is around 2.8 percent is to have a simple little die function that when called will return a number between and inclduing 1 and 6 that uses the Math.random method in javaScript. I can then have another test function that will call this die function two times for a certain fixed number of rolls, and then step a variable each time the result is two sixes. I can then divide this step variable over the fixed number of times a roll has happend to get a percentage.

```js
var die = function(){
    return 1 + Math.floor(Math.random() * 6);
};
 
var test = function(){
    var i = 0,
    len = 100000,
    d1,d2,
    dubSix = 0;
    while(i < len){
        d1 = die();
        d2 = die();
        if(d1 === 6 && d2 === 6){
            dubSix += 1;
        }
        i += 1;
    }
    return dubSix / len * 100;
};
 
console.log( test() );
```

When I run this script I do get values around 2.8 percent actually. Sure it is always a little lower or higher, but more or less that is more or less true. However maybe then there is a simper way of getting a probability of this then, something that jjst involves the use of a pure function that will always return the same value for the same arguments.

### 1.2 - A pure function

So then the other idea that comes to mind is using a pure function where I just give the number of dice and the returned result is the probability of a single outcome for that set of dice. It could be a very simple expression that just divides 1 over the power of six to the number of dice multiplied by 100 to get a percent value.

```js
var test = function(dieCount){
    return 1 / Math.pow(6, dieCount) * 100;
};
console.log( test(2).toFixed(1)); // 2.8
```

Sure it will always give the same result for the same number of dice, but by testing the other way that involves just calling Math.random a whole bunch of times it is a result that is not that far off base actaully.

## 2 - Conclusion

I still do not think I have the idea of what probabilitty space is down to a solid scienece just yet, however I think part of the reason why that is might very well be on account of the fact that I have not yet foubnd a decent resoutce on statstics. When I search for posts on probability space I end up getting a lot of formal content that assumes that I understand a lot of tectnical terms before hand. So that prompled me to start writing this post and many others like it as a way to write and update my own notes on this specfic topic.

Some things about probability space are simple enough to understand though, when it comes to the sample space at least that is just a collection of all possible outcomes of something. If we are talking about a single die roll then that is just the numbers 1 to 6. The event space then is more or less the same as the sample space as I have come to understand it thus far, but it is a little diferent in that it can contain all possible events when it comes to rolling a die. An event can be something like rolling 6, but it can also be rolling an even number which would also include 6 along with 2, and 4 of course. Then there is the question of the probability function that is used to set number between 0 and 1 for all events.
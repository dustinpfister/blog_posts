---
title: Probability Space in Statistics
date: 2021-03-02 15:39:00
tags: [statistics]
layout: post
categories: statistics
id: 814
updated: 2021-03-02 15:49:37
version: 1.1
---

I have been trying my luck with [Statistics](https://en.wikipedia.org/wiki/Statistics) as a way to go about expanding into something new that I have a tenative interest in. As such I will likly be writing at least a few posts on probabity, and with that said I have come accross something called [Probibility Space](https://en.wikipedia.org/wiki/Probability_space).

<!-- more -->

## 1 - Some simple examples about getting dubble sixes

### 1.2 - An example using Math.random

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
    return dubSix / len;
};
 
console.log( test() );
```

### 1.2 - A pure function

```js
var test = function(){
    return 1 / (6 * 6)
};
console.log( test() );
```

## 2 - Conclusion

I still do not think I have the idea of what probabilitty space is down to a solid scienece just yet, however I think part of the reason why that is might very well be on account of the fact that I have not yet foubnd a decent resoutce on statstics. When I search for posts on probability space I end up getting a lot of formal content that assumes that I understand a lot of tectnical terms before hand. So that prompled me to start writing this post and many others like it as a way to write and update my own notes on this specfic topic.


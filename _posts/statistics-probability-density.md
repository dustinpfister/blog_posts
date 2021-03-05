---
title: Probability density
date: 2018-02-21 22:29:00
tags: [js,statistics]
layout: post
categories: statistics
id: 156
updated: 2021-03-05 14:31:14
version: 1.2
---

Today I am continuing to look into statistics to see if this is something that I want to learn more about by writing a post on [Probability density](https://en.wikipedia.org/wiki/Probability_density_function). 

<!-- more -->

## 1 - Sometimes it is better to test for a range, then an precise value.

Probability density has to do with the issue of testing for a certain value that may not ever really happen, so it is better to test for a range. That is the probability of it happening is very close to zero, or is pretty much zero, but not if we are talking about a small range rather than a very precise value.

## 2 - A javaScript example of probability density

For an example of probability density I made a quick module that creates a bunch of objects that have a number that represents the amount of time that passed when a bug died. 

```js
var bugs = (function() {
 
  var api = {};
 
  // initilize
  api.init = function(options) {
 
    options = options || {};
 
    this.count = options.count || 100;
    this.tBase = options.tBase || 1000;
    this.tRange = options.tRange || 2000;
    this.bugs = [];
    this.st = new Date();
 
    var i = 0;
 
    while (i < this.count) {
 
      this.bugs.push({
 
        dieAt: Math.random() * this.tRange + this.tBase
 
      });
 
      i += 1;
 
    }
 
  };
  
  // get a count of how many died at a given time stamp, and range
  api.diedAtCount = function(time,range){
  
      // dfault time at the base + 1/2 range
      time = time || Math.floor(this.tBase + this.tRange / 2);
  
      // default range to 10ms
      range = range === undefined ? 10 : range;
  
      return this.bugs.reduce(function(acc,bug){    
          
          if(bug.dieAt >= time-range && bug.dieAt <= time + range){
          
              return acc += 1;
          
          }
          
          return acc;
      
      },0);
  
  };
  
  api.diedAtPer = function(time,range){
  
        // dfault time at the base + 1/2 range
      time = time || Math.floor(this.tBase + this.tRange / 2);
  
      // default range to 10ms
      range = range === undefined ? 10 : range;
      
      var died = this.diedAtCount(time,range);
      
      return died / this.count;
  
  };
 
  api.init();
 
  return api;
 
}());
```

## 3 - Conclusion

I will be holding off on expanding my collection of posts on statistics until I work out more demos, and refine my understating of things like this. There is much about statistics that seems simple enough, but it can get a little involves. Another road block that I have run into is not finding a half way decent resource on statistics on line that explains things with javaScript examples, or at least Python examples now that I have learned a little bit when it comes to that programing environment.

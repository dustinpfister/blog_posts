---
title: experimental design in statistics 
date: 2021-03-01 12:29:00
tags: [statistics]
layout: post
categories: statistics
id: 813
updated: 2021-03-01 13:09:57
version: 1.4
---

This week I think I will be getting back into [Statistics](https://en.wikipedia.org/wiki/Statistics) for a while. I am not sure if I truly want to get into this subject, but it would seem that I have at least some interest in it when it comes to playing around with various statistcis when it comes to this website. Mainly when it comes to things like traffic, mean word count per post, orgainic traffic clicks per word, and so forth. However of course there are all kinds of other applactions when it comes to statistcis, so now and then I do a little more reading on the topic, and work out some code examples when it comes to a few things here and there.

In my travles online I have come accross an wikipedia artical on the topic of soemthing called [Experimental Design](https://en.wikipedia.org/wiki/Design_of_experiments) that struct a nerve when it comes certian things I find myself writing about such as the topic of pure functions. Which promped me to look into some [additional resources on the open web](https://www.scribbr.com/methodology/experimental-design/) in an effort to gain at least a slighly better understanding of this general topic in statstics.

Whatever I call it somehting to this effect will come up sooner of later when it comes to starrying to play arouind with a few things when it comes to statstics. One of the first things that is required when it comes to doing something with data is to first have, well, some data. It is best to have some kind of real data to work with, with that said when it comes to my website for example there is google search console, and google anlytics that help provide some real data when it comes to traffic. In addition I have some of my own scripts that I can use when it comes to tabulating things like word count, mean word count over all, mean word count per category, and so forth. However when it comes to making some kind of. 

However what if I want to come up with some kind of _hypothesis_ \( or maybe I should just stick to the word _guess_ sense I am not much of a scientist at this point \) as to the outcome of some kind of action? For example say I take a collection of content that is of very poor quaility and invest a solid month of time writing new content while greatly imporving the quaility of the older content on top of it. Before I make such an inverstment of time I would like to try to find a way to know if there is a good chance that such an investment of time will end up being worth the effort. In that case I would want to make some kind of projection, based off of some real data, or failing that some kind of educated guess, or even a wild or random guess. This it would seem is where the topic of Experimental Design comes into play.

<!-- more -->

## 1 - Some basic tools

So first off I am going to want to come up with some basic tools that will help me to just come up with a Clicks Per Thousand Words Per Day \(CPTWPD\) value. I can then use these basic tools to create an array of objects for each catagory that I am wrirting about where each object will contain a CPTWPD value.

### 1.1 - Pure function to get "Clicks Per Thousand Words Per Day"

```js
// WC   => Word Count
// Traffic => Number of clicks for a post in search console 
// days => Number of 24 hour day(s)
// retruns => CPTWPD ( Clicks Per Thousand Words Per Day )
let getCPTWPD = (WC, traffic, days) => {
    WC = WC === undefined ? 500 : WC;
    traffic = traffic === undefined ? 0 : traffic;
    days = days === undefined ? 1 : days;
    return traffic / days / WC * 1000;
};
console.log( getCPTWPD(1000, 7, 7) );     // 1
console.log( getCPTWPD(300, 1116, 31) );  // 120
 
// lodash includes
console.log('best post: ', getCPTWPD(875, 582, 28) );
// 23.755102040816325
 
let siteWideTotalWC = 702332;
let siteWide = getCPTWPD(siteWideTotalWC, 18000, 28);
console.log('site wide: ', siteWide);
// 0.9153180303006881
```

### 1.2 - Pure function to get Traffic with CPTWPD


```js
// WC   => Word Count
// CPTW => Clicks Per Thousand Words Per Day
// days => Number of 24 hour day(s)
// retruns => Traffic per days
 
let getPostTraffic = (WC, CPTWPD, days) => {
    WC = WC === undefined ? 500 : WC;
    CPTWPD = CPTWPD === undefined ? 1 : CPTWPD;
    days = days === undefined ? 1 : days;
    return WC * (CPTWPD / 1000) * days;
};
 
console.log( getPostTraffic(1000, 1, 7) );   // 7
console.log( getPostTraffic(300, 120, 31) ); // 1116
 
// BEST POST => lodash includes is my best post as of this writing
let bestPost = {
  wc: 875,
  CPTWPD: 23.755102040816325,
  days: 28,
  traffic: 0
};
bestPost.traffic = getPostTraffic(bestPost.wc, bestPost.CPTWPD, bestPost.days);
console.log( 'best post: ', bestPost.traffic );
// best post: 582
 
// SITE WIDE => site wide I have a grand total of 702,332 words over 813 posts
// with a CPTWPD of only 0.9153180303006881
let siteWide = {
  wc: 702332,
  CPTWPD: 0.9153180303006881,
  days: 28,
  traffic: 0
};
siteWide.traffic = getPostTraffic(siteWide.wc, siteWide.CPTWPD, siteWide.days);
console.log('site wide: ', siteWide.traffic);
// site wide: 18000
 
// My best preforming post is pulling in 582 clicks per 28 day span
// which is way better than what is going on site wide which seems to
// be ranking in around 22 per 28 day span
console.log(siteWide.traffic / 813);
// 22.14022140221402
```

## 2 - Catagories

Now that I have some basic tools worked out I can now use them with some data from serach console, as well as my own scripts to get values for this Clicks Per Thousand Words Per Day value that I am interested in.

```js
let tools = (function(){
 
    let api = {};
 
    let parseOptions = (opt) => {
        opt = opt || {};
        opt.WC = opt.WC === undefined ? 500 : opt.WC;
        opt.CPTWPD = opt.CPTWPD === undefined ? 1 : opt.CPTWPD;
        opt.traffic = opt.traffic === undefined ? 0 : opt.traffic;
        opt.days = opt.days === undefined ? 28 : opt.days;
        return opt;
    };
 
    api.getCPTWPD = (opt) => {
        let a = parseOptions(opt);
        return a.traffic / a.days / a.WC * 1000;
    };
 
    api.getTraffic = (opt) => {
        let a = parseOptions(opt);
        return a.WC * (a.CPTWPD / 1000) * a.days;
    };
 
    return api;
 
}());
 
// site wide
console.log( 'site wide: ', tools.getCPTWPD({ WC: 702332, traffic: 18000 }) );
// 0.9153180303006881
 
// lodash
console.log( 'lodash: ', tools.getCPTWPD({ WC: 64449, traffic: 10200 }) );
// 5.652309799775238
 
// statistics
console.log( 'statistics: ', tools.getCPTWPD({ WC: 1870, traffic: 101 }) );
// 1.9289533995416348
 
// canvas
console.log( 'canvas: ', tools.getCPTWPD({ WC: 102411, traffic: 901 }) );
// 0.3142101085681365
 
// js
console.log( 'js: ', tools.getCPTWPD({ WC: 153472, traffic: 714 }) );
// 0.16615408673894913
```

So then I can use these basic tools to get the CPTWPD value for the whole website, as well as certain collections of content that are on various topics such as lodash, canvas, and yes this very topic of statistics. 

I am not compleatly sure what I could use for a control at this point, but for now it would seem that will just have to use the site wide value until I have something else that might work better, such as maybe a catagore that I am not doing anything out of the ushual maybe.


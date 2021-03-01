---
title: Experimental design in statistics 
date: 2021-03-01 12:29:00
tags: [statistics]
layout: post
categories: statistics
id: 813
updated: 2021-03-01 17:02:35
version: 1.19
---

This week I think I will be getting back into [Statistics](https://en.wikipedia.org/wiki/Statistics) for a while. I am not sure if I truly want to get into this subject, but it would seem that I have at least some interest in it when it comes to playing around with various statistics when it comes to this website. Mainly when it comes to things like traffic, mean word count per post, organic traffic clicks per word, and so forth. However of course there are all kinds of other applications when it comes to statistics, so now and then I do a little more reading on the topic, and work out some code examples when it comes to a few things here and there.

In my travels on line I have come across a Wikipedia article on the topic of something called [Experimental Design](https://en.wikipedia.org/wiki/Design_of_experiments) that struck a nerve when it comes certain things I find myself writing about such as the topic of pure functions. Which prompted me to look into some [additional resources on the open web](https://www.scribbr.com/methodology/experimental-design/) in an effort to gain at least a slightly better understanding of this general topic in statistics.

Whatever I call it something to this effect will come up sooner of later when it comes to starting to play around with a few things when it comes to statistics. One of the first things that is required when it comes to doing something with data is to first have, well, some data. It is best to have some kind of real data to work with, with that said when it comes to my website for example there is Google search console, and Google analytics that help provide some real data when it comes to traffic. In addition I have some of my own scripts that I can use when it comes to tabulating things like word count, mean word count over all, mean word count per category, and so forth. 

However what if I want to come up with some kind of _hypothesis_ \( or maybe I should just stick to the word _guess_ sense I am not much of a scientist at this point \) as to the outcome of some kind of action? For example say I take a collection of content that is of very poor quality and invest a solid month of time writing new content while greatly improving the quality of the older content on top of it. Before I make such an investment of time I would like to try to find a way to know if there is a good chance that such an investment of time will end up being worth the effort. In that case I would want to make some kind of projection, based off of some real data, or failing that some kind of educated guess, or even a wild or random guess. This it would seem is where the topic of Experimental Design comes into play. It is a formal way of creating some kind of testable experiment where a research question is asked, and that research question is then tested then an outcome is reached.

However I am pretty new to all of this, so this will be more of an attempt at Experimental Design rather than a serious guide. Which is not always such a bad thing, if an informal approach to something still helps me make smarter choices then mission accomplished.

<!-- more -->

## 1 - My first attempt as Experimental design in Statistics

So then this will be my first attempt at Experimental design in statistics where I would like to work out some kind of experiment that might help me make better choices when it comes to what I choose to write about with this website. My time is valuable to me and I want to write about things that are worth an investment of my time. There is just writing about things purely for the intrinsic value of doing so, and with many categories on this site that is more or less the only thing that continues to drive me forward. However for the sake of the subject matter of this post I should make this about just simply getting more traffic, so it would be a good idea to have some way to go about indexing posts, and whole categories of content by some kind of metric that will show me what is working well, and what is not working so well when it comes to writing for the sake of gaining organic traffic.

### 1.1 - Must come up with a research question, and variables

One of the first things that I should try to figure out is what a research question should be. This question should be focused on a single issue or problem. It should also be something that can be tested somehow. When it comes to the subject that I have in mind the question might be something like

```
Will higher mean blog post word count result in more organic web traffic?
```

I am going to want to have some variables for this then that might help me gain some insight on this. I am going to need some independent variables that I plug into a pure function that will then return a dependent variable. The Independent variables in this case would be things like word count, and an amount of time in days that when passed to a function will return a Clicks Per Thousand Words Per Day value that will be my Dependent variable.

```
Independent variables          Dependent variable

Word Count                     Clicks Per Thousand Words Per Day ( CPTWPD )
Days
```

### 1.2 - I am going to want to have something to function as a control

To know if something that I am doing is working or not I am going to want to have something that will function as a control. I am not completely sure what might work well for a control with what I have in mind here, but for now I think that I can compare how a category that I am working hard on is doing compared to a category that I am putting much time and effort into at all. Another thought is that I can just compare a category that I am experimenting with to just some kind of site wide mean.

### 1.3 - Some basic tools

So I am going to want to come up with some basic tools that will help me to just come up with a Clicks Per Thousand Words Per Day \(CPTWPD\) value. I can then use these basic tools to create an array of objects for each category that I am writing about where each object will contain a CPTWPD value.

I might end up with a few methods if I put enough time into this, but there are just two simple pure functions that come to mind thus far. I will want one function where I plug in word count, traffic, and a count of days that will return a CPTWPD value. I will then want another pure function that will take this CPTWPD value, and if also given the same values for word count and days should return the same value for traffic.

### 1.4 - Pure function to get "Clicks Per Thousand Words Per Day"

So then this is what I worked out for my function that will return the CPTWPD value that I want. The function is an example of a pure function where the same set of arguments will always return the same result. The arguments that I pass for word count, traffic, and days are examples of independent variables, and the returned product can be considered a dependent variable that is the CPTWPD value that I want for a given set of arguments.

```js
// WC   => Word Count
// Traffic => Number of clicks for a post in search console 
// days => Number of 24 hour day(s)
// returns => CPTWPD ( Clicks Per Thousand Words Per Day )
let getCPTWPD = (WC, traffic, days) => {
    WC = WC === undefined ? 500 : WC;
    traffic = traffic === undefined ? 0 : traffic;
    days = days === undefined ? 1 : days;
    return traffic / days / WC * 1000;
};
 
// a post that is 1,000 words that gets 7 clicks in one week
// has a CPTWPD of 1
console.log( getCPTWPD(1000, 7, 7) );     // 1
// a post that is only 300 words that gets 1,116 clicks in a 31 day span
// has a CPTWPD of 120
console.log( getCPTWPD(300, 1116, 31) );  // 120
```

Testing out the function with a few quick example gives me expected values. If I have a post that is one thousand words, and it gets seven clicks over the span of a week, then that is of course a CPTWPD of 1. Any other combination of values gives the same expected result that I want. 

So now it is just a question of how I go about using a function like this when it comes to giving it arguments. I can just give some some test values, but I can also plug in some real data that I have as arguments.

### 1.5 - Pure function to get Traffic with CPTWPD

I then have my pure function that will return a Traffic value when given a CPTWPD value along with word count and days as arguments. So then this function allows for me to get a traffic value that will be the result of a given CPTWPD value along with word count and days. Just like the get CPTWPD function I could plug in some real data, or I could plug in some kind of theoretical data, or even random data.

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
```

The function works as an inversion of my get CPTWPD function where I get a traffic value back from a given CPTWPD if the word count and days are the same.

### 1.6 - Playing around with some REAL data

So I started plugging in some real data from search console, and my scripts that tabulate word count, and received some interesting values. However I do not just have to plug in real data, I can also plug in some theoretical data also to get an idea of what kinds of values I need to see for the site wide total in order to reach certain traffic goals.

```js
/********** ********** **********
 PLUG IN SOME REAL DATA FROM SEARCH CONSOLE
*********** ********** *********/
 
// lodash includes is my best post as of this writing
console.log('best post: ', getCPTWPD(875, 582, 28) );
// 23.755102040816325
 
// I can also plug in a site wide total for word count along with
// traffic for a 28 day span to get this CPTWPD value for the whole site
let siteWideTotalWC = 702332;
let siteWide = getCPTWPD(siteWideTotalWC, 18000, 28);
console.log('site wide: ', siteWide);
// 0.9153180303006881
 
// some posts that are 1,800+ words
console.log('js-array-length: ', getCPTWPD(2777, 160, 28) );      // 2.057719018468028
console.log('js-javascript-foreach: ', getCPTWPD(3805, 29, 28) ); // 0.27219823540454297
 
// some posts that are < 1000 words
console.log('lodash_includes : ', getCPTWPD(875, 582, 28) ); // 23.755102040816325
console.log('lodash_groupby : ', getCPTWPD(856, 549, 28) ); // 22.905540720961284
console.log('lodash_sum : ', getCPTWPD(800, 502, 28) ); // 22.410714285714285
 
/********** ********** **********
 PLUG IN SOME THEORETICAL DATA
*********** ********** *********/
 
console.log(  getCPTWPD(siteWideTotalWC, 100000, 28) ); // 5.085100168337156
console.log(  getCPTWPD(siteWideTotalWC, 250000, 28) ); // 12.712750420842893
console.log(  getCPTWPD(siteWideTotalWC, 500000, 28) ); // 25.425500841685786
```

So then by looking at what the values are that I need to see for certain long term traffic goals that I get by plugging in theoretical data for traffic I can then see what kinds of targets I need to get with this CPTWPD value in order to reach those goals. Many people that are involved in SEO often say that higher word count values will result in better performance, however there are plenty of posts that show that is not always the case.

## 2 - Categories

Now that I have some basic tools worked out I can now use them with some data from search console, as well as my own scripts to get values for this Clicks Per Thousand Words Per Day value that I am interested in. The basic tools should then be used to start to create some kind of module that I can use to process some data.

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

So then I can use these basic tools to get the CPTWPD value for the whole website, as well as certain collections of content that are on various topics such as lodash, canvas, and yes this very topic of statistics. Right off the bat I am all ready getting some useful values that would lead me to making certain decisions. I should expand, and improve my content on lodash, and statistics, and give up on my canvas and javaScript categories.

However there is not just going by the current figures, my research question is still more along the lines of can these figures change, rather than just going with the current figures.

## 3 - Conclusion

I am beginning to see the value of gaining a better knowledge of how to work with statistics. I all ready have a few basic tools together, and I am making use of tools that are all ready there to work with. However I can help but think that there is a lot more for me to learn about when it comes to using statistics to help me make better decisions.

Even before I wrote this post I knew that my canvas and javaScript categories where not doing so well. However I made the decision to sink a fare amount of time into them in an effort to see if that would help. Thus far it would seem that doing so has resulted in a small improvement, but there is still a lot of room for additional improvement with those categorizes. I made the decision to sink more time into them even though they are not doing well, to some extent it makes sense to fix that which is broken after all. However when it comes to making decisions based purely off of the projections that I make when playing around with these basic tools it world make sense to put more time into improving the quality of my lodash content, as well as this very subject of statistics.

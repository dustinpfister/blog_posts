---
title: You are not creating it, you are discovering it.
date: 2017-05-29 12:02:44
tags: [js,discovery]
layout: post
categories: discovery
id: 24
updated: 2017-09-30 18:46:06
version: 1.3
---

This is my twenty fifth blog post for my [personal github pages site](https://dustinpfister.github.io/), and as such I wanted to do something special. So I thought I would write a post that will be the first of what will be a series of posts on discovery. Discovery seems to be a good word to label a certain something that is not really about javaScript, or any language for that matter, but a certain other subject that is important when it comes to being a developer of any kind.

<!-- more -->

## What is discovery

If you have spent a great deal of time at [stackoverflow](https://stackoverflow.com/questions/tagged/javascript), or [r/learnjavascript](https://www.reddit.com/r/learnjavascript/) like I have, you may eventuality start to discover patterns with the posts that you read every day. One such pattern that I have noticed is that a lot of new developers ask what it is that they should move onto next after completing a course of study of some kind. That is they have developed a certain degree of ability when it comes to coding with javaScript, but do not really know what to do with it.

This is where discovery comes into play, and I have come to prefer to use the word discovery rather than creativity. The reason why is because I like to think that what it is that I am developing already exists in a theoretical sense, and I am merely discovering something that is a certain possibility out of a total finite range. So in other words, I am not really creating, I am discovering.

## Base two numbers example

To help better explain what I mean by this, take a moment to think about how all data is stored on a non volatile data storage medium of a computer. Thats right, it's all binary data. If you are a half way decent programmer, you should know your base two numbers pretty well by now, at least to the point that you know the possible value range of say a single byte of data.

```js
console.log(Math.pow(2,8)); // 256
```

A single byte of a data has 256 possible values, that is there are only 256 possible states that a byte can have, and thats it, it is not infinite, but finite. If I add another byte the range of possibilities jumps up to 65,536 if I double it again to four bytes it increases into the billions at 4,294,967,296. As I keep adding bytes the range of possibilities starts to get into some ridiculously large finite numbers, but they are still just that, finite. 

Every possible combination of ones and zeros in say 13kb of data can be considered a kind of index value that all ready exists. When you "create" something that can be stored within 13kb of data, you are not really creating something, but discovering something that was all ready there, as a theoretical possibility within a certain magnitude.

## Envision what is possible

Coding a project can be very time consuming, but envisioning takes little time and effort. All of my projects start with a certain vision, once I have the vision it is then just a matter of making the vision a reality or not. Depending on what it is, the vision can become a reality in just a minute or so, or it may be a kind of project that will take years of my life to complete if I do all the work myself from scratch.

## Discovering what is already discovered.

Is what I am envisioning something that has been developed by someone else? If so maybe I should not waste my time discovering it. Whenever I get an idea for a project the first thing that I do is start to do a little Google work to try and find out if someone else has unearthed a project that is what I had in mind. In the past I was very bad with this, but in recent months I have started to make a better effort of checking out what is out there to begin with. I thought about taking the time to make my own static site generator, but I found [hexo](https://hexo.io/), and that seems to work just fine for such a task.

## Discovering the vision by way of coding.

If I feel as thought the idea in mind is worthy of an investment of time, I get to work on drafting something together. Often it may be a simple idea, the kind of project that can be slapped together in about an hour or less, if all I care about is a simple proof of concept. As such I often have a working prototype together very quickly, from there I may invest more time to improve it, or just leave it as is and call it yet another exercise.

## Conclusion

Part of being a good programmer is knowing when not to program. It's often hard to make that judgment, as I don't want to just use other peoples software without having any understanding, or appreciation of it's underlaying satisfaction. Still I hate spending time re inventing the wheel over, and over again as well. As such I am a bit more slow and calculated when it comes to diving into the deep of it.

Be sure to check out my many other [posts on discovery](/categories/discovery/).

<!-- Playing with my new toy -->
<script>

(function() {

  var str = '',
    colors = [undefined, 'rgba(255,255,255,.4)'],
    then = new Date(1983,3,6,10,5),
    setStr = function() {

      var now = new Date(),
        t = now - then;

      str = t.toString(2);

    };

  setStr();

  Matrix.w = Math.ceil(Math.sqrt(str.length));
  Matrix.tickRate = 50;
  Matrix.setup();
  Matrix.forPoint = function() {

    this.color = undefined;

    this.color = colors[str[this.i]];

  };

  var loop = function() {

    setTimeout(loop, 50);

    Matrix.w = Math.ceil(Math.sqrt(str.length));
    Matrix.setup();
	Matrix.update();
    setStr();

  };

  loop();

}());

</script>

<!--

## Michelangelo

I have caught wind of a quote my [Michelangelo Buonarroti](https://en.wikipedia.org/wiki/Michelangelo), that states "Every block of stone has a statue inside it and it is the task of the sculptor to discover it". He would imagine the statue of David in the stone, and free him from it.

-->
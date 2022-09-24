---
title: You are not creating it, you are discovering it.
date: 2017-05-29 12:02:44
tags: [js,discovery]
layout: post
categories: discovery
id: 24
updated: 2022-09-24 09:11:44
version: 1.5
---

Learning how to code is hard, or at least that seems to be the idea that a lot of people have set in their head. For me I would say that picking up a programming language is the easy part, the real hard part is to get proficient at certain things that lay outside of that of programming. Things that apply not just to a certain programming language, but the creative process in general. So I thought I would write a post that will be the first of what will be a [series of posts on discovery](/categories/discovery/). Discovery seems to be a good word to label a certain something that seems to be what is going on when I make an original work of any kind from the ground up, with javaScript, but also any other kind of creative process including writing such as with this very blog post.

Another way to put this would be to ask myself [if being creative is a construction or discovery kind of process](https://clearthinking.co/is-creativity-a-discovery-process-or-a-construction-process/). That is when I make some kind of creative work, such as a javaScript module, am I constructing code from the ground up, or is it something that was all ready there and I just discovered it. This differs from something like using a library or framework, I am not talking about using other peoples code. I am talking about the code that I myself write, in other words my own vanilla javaScript code. Some may say that I am constructing my own personal code from the ground up, but that is not how I see it, I always feel as though I am just discovering a proof of concept that was all ready up and running in my mind.

<!-- more -->

## What is discovery

If you have spent a great deal of time at [stackoverflow](https://stackoverflow.com/questions/tagged/javascript), or [r/learnjavascript](https://www.reddit.com/r/learnjavascript/) like I have, you may eventuality start to discover patterns with the posts that you read every day. One such pattern that I have noticed is that a lot of new developers ask what it is that they should move onto next after completing a course of study of some kind. That is they have developed a certain degree of ability when it comes to coding with javaScript, but do not really know what to do with it.

Learning javaScript is like that of learning a natural language such as English. That is that by learning javaScript all that I have accomplished is a acquiring a kind of literacy only with a programming language that can be used to author libraries, frameworks, and applications rather than a written work. The next step then could be starting to do the javaScript equivalent of writing, but also the equivalent of reading as well. Learning just core javaScript alone is not all everything there is to learn about javaScript there is moving on to client side javaScript, or a general run time environment such as nodejs. There is also a whole world of libraries and so forth out there that are the javaScript equivalent of books one could say. So one next step would be to start wirirng ones own code, or studying code that has all ready been written. 

However there is not just doing the javaScript equivalent of reading and writing but also learning about subjects that apply to the creative process in general inside and outside of javaScript. This is where discovery comes into play, and I have come to prefer to use the word discovery rather than creativity. The reason why is because I like to think that what it is that I am developing already exists in a theoretical sense, and I am merely discovering something that is a certain possibility out of a total finite range. So in other words, I am not really creating, I am discovering.

## Base two numbers example

To help better explain what I mean by this, take a moment to think about how all data is stored on a non volatile data storage medium of a computer. That's right, it's all binary data, a certain set of binary digits in a given finite range. If you are a half way decent programmer, you should know your base two numbers pretty well by now, at least to the point that you know the possible value range of say a single byte of data.

```js
console.log(Math.pow(2,8)); // 256
```

A single byte of a data has 256 possible values, that is there are only 256 possible states that a byte can have, and that's it, it is not infinite, but finite. If I add another byte the range of possibilities jumps up to 65,536 if I double it again to four bytes it increases into the billions at 4,294,967,296. As I keep adding bytes the range of possibilities starts to get into some ridiculously large finite numbers, but they are still just that, finite. 

Every possible combination of ones and zeros in say 13kb of data can be considered a kind of index value that all ready exists. When you "create" something that can be stored within 13kb of data, you are not really creating something, but discovering something that was all ready there, as a theoretical possibility within a certain magnitude.

## Envision what is possible

Coding a project can be very time consuming, but envisioning takes little time and effort. All of my projects start with a certain vision, once I have the vision it is then just a matter of making the vision a reality or not. Depending on what it is, the vision can become a reality in just a minute or so, or it may be a kind of project that will take years of my life to complete if I do all the work myself from scratch.

In any case this process is that the idea that I have is all ready working in my mind, and the creative process of authoring the code is not a process of construction, but rather discovery. I am discovering the code that results in a proof of concept that was all ready there in my mind, but is now up and running.

## Discovering what is already discovered.

Is what I am envisioning something that has been developed by someone else? If so maybe I should not waste my time discovering it, but rather look into that which as all ready discovered if that makes any sense. 

Whenever I get an idea for a project I can start out by doing a little quick Google work to try and find out if someone else has unearthed a project that is what I had in mind. In the past I was very bad with this, but in recent months I have started to make a better effort of checking out what is out there to begin with. 

I thought about taking the time to make my own static site generator, but I found [hexo](https://hexo.io/), and that seems to work just fine for such a task. I might still make my own static site generator, but that would be a major project at least to get all the features I want. In any case the ideas that I have for this kind of project are not really all that novel, they are all just my own unique spins on something that has all ready been done many times over as there are a lot of other static site generators out there.

## Discovering the vision by way of coding.

If I feel as thought the idea in mind is worthy of an investment of time, I get to work on drafting something together. Often it may be a simple idea, the kind of project that can be slapped together in about an hour or less, if all I care about is a simple proof of concept. As such I often have a working prototype together very quickly, from there I may invest more time to improve it, or just leave it as is and call it yet another exercise.

## Conclusion

Part of being a good programmer is knowing when not to program. It's often hard to make that judgment, as I don't want to just use other peoples software without having any understanding, or appreciation of it's underlying satisfaction. Still I hate spending time re inventing the wheel over, and over again as well. As such I am a bit more slow and calculated when it comes to diving into the deep of it.

This is my twenty fifth blog post for my [personal Github pages site](https://dustinpfister.github.io/), and as such I wanted to start something new that is not just about programming.

Be sure to check out my many other [posts on discovery](/categories/discovery/).

<!-- Playing with my new toy -->
<!-- edit 09/24/2022 : commented this out as I am planning a new alternative to this -->
<!--
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
-->

<!--

## Michelangelo

I have caught wind of a quote my [Michelangelo Buonarroti](https://en.wikipedia.org/wiki/Michelangelo), that states "Every block of stone has a statue inside it and it is the task of the sculptor to discover it". He would imagine the statue of David in the stone, and free him from it.

-->

---
title: Natural language analyses tool for node.js called natural
date: 2017-12-11 09:00:00
tags: [js,node.js]
layout: post
categories: node.js
id: 111
updated: 2017-12-14 09:43:19
version: 1.6
---

I have been writing this blog for the better part of a year, and so far it seems like it is just starting to take off. I am not spaming my content on social media (as of this writing at least), and I also so far am not spending even so much as a single penny a month on paid advertising. In stead I am focusing entirely on what needs to be done to help improve organic search results, so far I am doing okay, but there is much room for improvement. As such I have wanted to find, or make some tools to help me with keyword planing, and general evaluation of my sites content in a [node.js](https://nodejs.org/en/) environment.. In my travels browsing and searching I have come across the npm package called [natural](https://www.npmjs.com/package/natural).

<!-- more -->

Natural is a great little tool to use with any node.js project If you have interest to do anything that involves text or [lexical analyses](https://en.wikipedia.org/wiki/Tokenization_(lexical_analysis)), or natural language processing. It has some of the basic tools you would expect such as a tokenizer, as well as more advanced tools that help with the process of finding out how well content may rank with respect to certain terms.

## The very basics of text, or lexical analyses ( tokenization ).

This topic is a little advanced to maybe it would be best to start off with a simple vanilla js example of text analyses.

```js
// tokenize an English natural language string
var tokenizer = function(str) {
 
    // pattrens
    var pat_nl = /\n/g, // new line
    pat_spec = /[.,\/#!$%\^&\*;:{}=_`\"~()]/g; // special chars
 
    // replace new lines with spaces, replace special chars with nothing,
    // and split the string into an array of words
    return str.toLowerCase().replace(pat_nl, ' ').replace(pat_spec, '').split(' ');
    
};
 
// now I can feed it some content and I get an array of words
var content = 'This is some example text!',
tokens = tokenizer(content);
 
console.log(tokens);
// ['this','is','some','example','text']
```

I want something that will take a natural language string, and return a clean array of words rather than raw content. depending on the source of the content there might be additional steps to get the end result, but you get the basic idea of what is to be achieved with this. 

## Word Count

Once I have my array of words I can now figure things out about the content, such as it's word length.

```js
console.log( tokenizer('what is this word count?').length ); // 5
```

World count is the first thing that comes to mind when evaluating my content. I hear a lot of chatter about making your posts at least three hundred words. If you ask me it seems it is the further nature of the content beyond that that truly matters, but yes knowing world count is a factor of interest. Right off the bat you know where this is going and why its helpful if you want a successful blog, but before I get into the natural project more lets explore some things that are a bit more advanced than just word count.

## Term Count

Another factor that comes to mind when thinking about how to improve content so that it will rank better with goggles organic search results is how many times a certain word or phrase appears in the body of the content.

```js
termCount = function(term, data){
 
    var ct = 0;
 
    if(!term){ return 0;}
    if(!data){ return 0;}
 
    // if string, tokenize
    if(typeof data === 'string'){
    
        data = tokenizer(data);    
    
    }
    
    data.forEach(function(word){
    
       if(word === term){
       
          ct += 1;
       
       }
    
    });
    
    return ct;
 
};
 
var term = 'cats',
content = 'This is something that has to do with cats. I like cats.';
 
console.log(termCount(term,content)); // 2
```

Of course it is not just the volume of words, but also the choice of words that is important. I will not get into everything that has to do with keyword research, but say you find a certain term that is a single acronym, or a few words, that seems to preform well with a cretin post of yours. The number of times the term appears in the body of your content may very well be a major factor as to why it is doing so well.

## Term Count ratio

Now that I am able to find out the word count of the content, and how many times a certain pattern occurs in the content, I can also now find a ratio between the two.

```js
var termRatio = function(term,content){
 
    return termCount(term,content) / tokenizer(content).length;
 
};
 
var term = 'cats',
content = 'This is something that has to do with cats. I like cats.';
 
console.log( termRatio(term,content) ); // 0.16
```

This will return a value between, and including, zero and one that will help indicate how the frequency of a certain term in a body of text.

## Why Is this all important?

There are several [algorithms](https://en.wikipedia.org/wiki/Algorithm) that have to do with determine the rank of a given blog post in googles organic search results, often refereed to as SERP of Search Engine Result Pages. 

There are many factors that will help, and others that might hurt with page, and site rank. Sure there is a lot to say about things like site structure, and various little html tricks that may still help a little. I bet I could base a whole blog aground the importance of promoting a post on social media, and other blogs to help build back links. However in my view what should come first and foremost is the nature of the content itself in the first place. With this it is also important to have at least some kind of idea as to how googles bots evaluate the content. 

So yes knowing at least a thing or two about text analyses is important.

## Getting started with the natural npm package

First I assume you have node.js and npm installed, and you have a decent understanding of jaavScript. In which case what I did is i stared a new project folder and installed natural with npm like normal.

```
$ mkdir test_natural
$ cd test_natural
$ npm init
$ npm install natural --save
```

At the time of this writing the readme states that natural is still in development I am using version 0.5.4. I have published the demos in this post to by [github account](https://github.com/dustinpfister/test_natural) as well. Be sure to keep and eye on the [projects repo](https://github.com/NaturalNode/natural) as well, it looks like there is not a lot of activity, but I would not say it is a dead project just yet.

## Naturals word tokenizer

Natural has it's own word tokenizer like the vanilla js one I gave earler in this post. To use it just use the natural.WordTokenizer constructor. In my project folder I made a token.js demo file in the root space that looks like this:

```js
var natural = require('natural'),
 
// use this constructor
tokenizer = new natural.WordTokenizer(),
 
content = 'I like the javaScript it is the best.';
tokens = tokenizer.tokenize(content);
 
// gives me an array of the words
console.log( tokens );
// [ 'I', 'like', 'the', 'javaScript', 'it', 'is', 'the', 'best' ]
```

## naturals jaro winkler string distance

natural has a jaavScript implmantation of the [Jaro Winkler](https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance) string edit distance method.

```js
var natural = require('natural'),
 
term = 'javaScript',
 
dist = function (b, a) {
 
    a = a || term;
 
    return natural.JaroWinklerDistance(a, b);
 
};
 
console.log( dist('javaScript') ); // 1
console.log( dist('java') ); // 0.88
console.log( dist('lightScript') ); // 0.715...
console.log( dist('python') ); // 0
```

As you can see this can be used as a way to find how close to strings resemble each other.
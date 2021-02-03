---
title: Vuejs example of a web Assets game
date: 2021-02-03 14:19:00
tags: [vuejs]
layout: post
categories: vuejs
id: 795
updated: 2021-02-03 15:52:51
version: 1.5
---

I have wrote a few posts on all of the basics when it comes to vuejs, so now I find myself starting to make some actaul full vuejs examples as that just seems like the net step when it comes to learning a langauge, or in this case a framework. Today I thought I would start another vuejs example that is a basic simple little game of sorts that has to do with creating web assets.

The general idea is to create a game where the object is to start making websites, and then the websites generate money over time. So just another kind of idle game as it where which seems to be a kind of game that I like to make, but have never really ran with just yet. In any case this example has proved to be another good exercise of using vue components as a way to keep things modular.

<!-- more -->

## 1 - Libraries for the Web Asset vuejs example

First off I have a library folder for this vuejs example Where I have parked a few vanilla javaScript modules that I will be using in my components, and the main vue instance. I often start a major project with a general utility library that might end up containgign methdos that I will use in other vanilla javaScript librarys. In additon I have a web asset library that I am using as a seperate file for createing and updating a web asset object for the game.

### 1.1 - A utils library for the vue example

Here I have my general utility libray, so far for this vue example at least I just have a format money helper and a mathmatical modulo helper. If I do keep working on this vue example I am sure this library will grow but for now that is all there is to cover with this one.

```js
var utils = {};
 
// format number as money
// https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
utils.format_money = function(number){
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        // These options are needed to round to whole numbers if that's what you want.
        minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        maximumFractionDigits: 0 // (causes 2500.99 to be printed as $2,501)
    });
    return formatter.format(number); /* $2,500.00 */
};

// mathematical modulo
utils.mod = function(x, m) {
    return (x % m + m) % m;
};
```

### 1.2 - Web Assets library

I then Also have my main web assets library that I will be using to create web asset objects that will be used in the main vue data object of the main vuejs instance that I will be getting to later in this post.

```js
var WebAsset = (function(){
 
    var setAssetWorth = function(asset){
        var d = Math.log(1 + (asset.avgWordsPerPost / 2400)) / Math.log(2);
        d = d > 1 ? 1: d;
        d = d < 0 ? 0: d;
        // worth set by total word count, and d
        asset.worth = Math.floor(asset.words * (0.0125 + 0.4875 * d));
        // money per tick set by worth
        asset.moneyPerTick = 1 + Math.floor(asset.worth * (0.01 + 0.04 * d));
    };
 
    var api = function(opt){
        opt = opt || {};
        var asset = {
            secs: 0,
            secsPerTick: 10,
            words: opt.words || 30000,
            postCount: opt.postCount || 10,
            avgWordsPerPost: 0,
            worth: 0,
            write: {
                words: 0,
                per: 0,
                target: opt.target || 500
            },
            moneyPerTick: 0
        };
        asset.avgWordsPerPost = asset.words / asset.postCount;
        setAssetWorth(asset);
        return asset;
    };
 
    // prefrom a write action for an asset
    api.write = function(asset, author, count){
        asset.write.words += author.wordsPerWrite * count;
        asset.per = asset.write.words / asset.write.target;
        if(asset.per >= 1){
           var postDelta = Math.floor(asset.write.words / asset.write.target);
           asset.postCount += postDelta;
           asset.words += asset.write.target * postDelta;
           asset.avgWordsPerPost = asset.words / asset.postCount;
           asset.write.words = utils.mod(asset.write.words, asset.write.target);
           asset.per = asset.write.words / asset.write.target;
           setAssetWorth(asset);
        }
    };
 
    // update a web asset by an about of time that has passed in seconds
    api.update = function(asset, secs){
        asset.secs += secs;
        var ticks = Math.floor(asset.secs / asset.secsPerTick),
        money = 0;
        if(ticks > 0){
            money = asset.moneyPerTick * ticks;
            asset.secs = utils.mod(asset.secs , asset.secsPerTick);
        }
        return money;
    };
 
    return api;
 
}());
```

## 2 - The compoenets folder

I then have a components folder with a few vue compoents for various features of the user interface of the game. Some of these just display info about the main game state objet. Others can be used as a way to create new sites, buy sites, and sell as a well as imporve sotes that the player own all ready.

### 2.1 - disp

I have a simple display compoents that is used to just display how much money the player has.

```js
```

### 2.2 - webasset-ui-create

I wanted to start a simple compoents that can be used to create a new website asset for free in the event that the player has no money to buy one with.

```js
```

### 2.3 - webasset-ui-buy

The player can create new websites, but it would also be nice to have a feature where there are a number of websites that the player can buy.

```js
```

### 2.4 - webasset-ui.current

There will then need to be a component to work with the curent collection of websites.

```js
```

## 3 - The main vuejs instance

```js
```

## 4 - The html and css files

```html
```

```css
```

## 5 - Conclusion

This game is starting to come togeather all ready, but I am not sure if I will keep working on it or not. There are so many other vuejs examples, and additional projects outside of vuejs all togeather that I also want to put more time into. In any case this vuejs example was fun for a little while, and working on it helped me to get a better idea of how to break a project down into many little parts by making use of vue components.

---
title: Vuejs example of a web Assets game
date: 2021-02-03 14:19:00
tags: [vuejs]
layout: post
categories: vuejs
id: 795
updated: 2021-02-03 15:58:32
version: 1.6
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
// just display some basic info
Vue.component('disp', {
    props: ['state'],
    template: '<div class="ui">' +
        '<h3>Web Assets Game: </h3>' +
        '<p>Money: {{ format_money(state.money) }}</p>'+
    '</div>'
});
```

### 2.2 - webasset-ui-create

I wanted to start a simple compoents that can be used to create a new website asset for free in the event that the player has no money to buy one with.

```js
// Create a WebAsset
Vue.component('webassets-ui-create', {
    props: ['state'],
    data: function(){
        return {
            startPosts: 10,
            wordsPerPost: 100,
            wordsPerClick: 100,
            progress: {
                words: 0,
                wordsNeeded: 0,
                per: 0
            }
        }
    },
    mounted: function(){
        this.updateProgress();
    },
    template: '<div class="ui">'+
        '<h3>Create a Website for Free: </h3>' +
        '<div>Progress: {{ progress.words }} / {{ progress.wordsNeeded }} {{ progress.per }}</div>'+
        '<button v-on:click="write()">Write</button>'+
    '</div>',
    methods: {
        updateProgress: function(){
            var dat = this.$data,
            progress = dat.progress;
            progress.wordsNeeded = dat.startPosts * dat.wordsPerPost;
            progress.words = progress.words > progress.wordsNeeded ? progress.wordsNeeded: progress.words;
            progress.per = progress.words / progress.wordsNeeded;
        },
        write: function (webAssetIndex) {
            var dat = this.$data,
            progress = dat.progress;
            progress.words += dat.wordsPerClick;
            this.updateProgress();
            if(progress.per === 1){
                this.$emit('create-event', dat.startPosts, progress.wordsNeeded);
                progress.words = 0;
                this.updateProgress();
            }
        }
    }
});
```

### 2.3 - webasset-ui-buy

The player can create new websites, but it would also be nice to have a feature where there are a number of websites that the player can buy.

```js
// Buy a WebAsset object with money
Vue.component('webassets-ui-buy', {
    props: ['state'],
    data: function(){
        return {
            forSale: [WebAsset({words: 10000}), WebAsset({words: 30000})]
        }
    },
    template: '<div class="ui">'+
        '<h3>Buy Website: </h3>'+
        '<div v-for="asset, index in forSale" class="forsale">'+
            '<p>For Sale: </p>'+
            '<p>{{ format_money(asset.worth) }}</p>'+
            '<button v-on:click="buy(index)">Buy</button>'+
        '</div>'+
    '</div>',
    methods: {
        buy: function (assetIndex) {
            var money = this.$props.state.money,
            asset = this.$data.forSale[assetIndex];
            if(money >= asset.worth){
                this.$data.forSale.splice(assetIndex, 1);
                this.$emit('buy-event', asset);
            }
        }
    }
});
```

### 2.4 - webasset-ui.current

There will then need to be a component to work with the curent collection of websites.

```js
// prefrom actions with current websites
Vue.component('webassets-ui-current', {
    props: ['state'],
    template: '<div class="ui">'+
        '<h3>Current Websites: </h3>'+
        '<div v-for="asset, index in state.webAssets" class="currentsite">'+
            '<p>Site: </p>'+
            '<p>Worth: {{ format_money(asset.worth) }}, Money Per Tick: {{ format_money(asset.moneyPerTick) }}</p>'+
            '<p>Site has {{ asset.words }} total words accross '+
                '{{ asset.postCount }} blog posts which is an average of '+
                '{{ Math.floor(asset.avgWordsPerPost) }} words per post</p>'+
            '<p>Write new post: {{ asset.write.words }}/{{ asset.write.target }} words done on new post</p>'+
            '<p><button v-on:click="write(index)">Write</button> | <button v-on:click="sell(index)">Sell</button></p>'+
            '<div v-bind:style="\'width:\'+Math.round(asset.secs / asset.secsPerTick * 100)+\'%;height:10px;background:lime;\'"></div>'+
        '</div>'+
    '</div>',
    methods: {
        // sell a webAsset
        sell: function (index) {
            this.$emit('sell-event', index);
        },
        write: function (index) {
            this.$emit('write-event', index);
        }
    }
});
```

## 3 - The main vuejs instance

I have the libraries that I want to use, and I have a number of compoents, now I just need a main vue instance. In the main.js file I have just a single vue mixin that is just a reference to my utils format money method. I did this just so I can use the format money method in the templates.

```js
// global method(s)
Vue.mixin({
  methods: {
    format_money: utils.format_money
  }
});

// main vue
var main = new Vue({
    el: '#app',
    data: function(){
        return {
            money: 0,
            lastUpdate: new Date(),
            webAssets: [WebAsset({words: 10000, target: 1800})]
        };
    },
    template: '<div class="wrap_main">'+
        '<disp v-bind:state="$data"></disp>'+
        '<webassets-ui-create v-bind:state="$data" v-on:create-event="create"></webassets-ui-create>'+
        '<webassets-ui-buy v-bind:state="$data" v-on:buy-event="buy" ></webassets-ui-buy>'+
        '<webassets-ui-current v-bind:state="$data" v-on:sell-event="sell" v-on:write-event="write"></webassets-ui-current>'+
    '</div>',
    mounted: function(){
        var dat = this.$data;
        var loop = function(){
            var now = new Date(),
            secs = (now - dat.lastUpdate) / 1000;
            setTimeout(loop, 100);
            dat.webAssets.forEach(function(asset){
                 var deltaMoney = WebAsset.update(asset, secs);
                 dat.money += deltaMoney;
            });
            dat.lastUpdate = now;
        };
        loop();
    },
    methods: {
        create: function(posts, words){
            console.log(posts, words);
            this.$data.webAssets.push(WebAsset({
                posts: posts,
                words: words
            }));
        },
        buy: function(asset){
           this.$data.money -= asset.worth;
           this.$data.webAssets.push(asset);
        },
        sell: function(index){
           var asset = this.$data.webAssets[index];
           this.$data.money += asset.worth;
           this.$data.webAssets.splice(index, 1);
        },
        write: function(index){
            var asset = this.$data.webAssets[index];
            console.log(asset);
            WebAsset.write(asset, {wordsPerWrite: 100}, 1);
        }
    }
});
```

## 4 - The html and css files

There is just now a little html and css to wrap this all up togeather.

```html
<html>
  <head>
    <title>vue example web assets game</title>
    <link rel="stylesheet" href="style.css">
    <!-- vuejs-->
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="app"></div>
  <!-- libs-->
  <script src="./lib/utils.js"></script>
  <script src="./lib/webasset.js"></script>
  <!-- components-->
  <script src="./comp/disp.js"></script>
  <script src="./comp/webasset-ui-create.js"></script>
  <script src="./comp/webasset-ui-buy.js"></script>
  <script src="./comp/webasset-ui-current.js"></script>
  <!-- main vue instance-->
  <script src="./main.js"></script>
  </body>
</html>
```

```css
body{
  padding:0px;
  margin:0px;
}
.wrap_main{
  background:blue;
  padding:10px;
  margin:0px;
}
.ui{
  background:gray;
  padding:10px;
  margin:10px;
}
.forsale{
  display:inline-block;margin:10px;background:green;height:100px;width:100px;
  padding:10px;text-align:center;
}
.currentsite{
   margin:10px;
   padding:10px;
   background:green;
}
```

## 5 - Conclusion

This game is starting to come togeather all ready, but I am not sure if I will keep working on it or not. There are so many other vuejs examples, and additional projects outside of vuejs all togeather that I also want to put more time into. In any case this vuejs example was fun for a little while, and working on it helped me to get a better idea of how to break a project down into many little parts by making use of vue components.

---
title: Fixer.io JSON API
date: 2017-02-09 13:11:00
tags: [js,JSON, automation]
layout: post
categories: api
id: 1
updated: 2017-05-19 15:55:50
version: 1.2
---

{% mytags_postwords fixer.io,api&#32;fixer,jsonp %}

Lately I was helping a friend of mine prepare for a trip to India. While doing so one of the things she wanted to get done was to type up a table that included US dollar amounts on one column, and the rupee equivalent in the other.

<!-- more -->

I have been developing scripts involving finding ways of automating a great deal of my work flow to help reduce the amount of time I spend on repetitive tasks, so I have more time to spend on the novel stuff. That got me thinking that maybe it would be fun to see if I could automate the process of making her table, for the heck of it, and maybe doing so would be a bit helpful for her. Exchange rates are always jumping up and down, and every time a significant change happens she would have to write the table again.

So typing up a simple little script that loops over an array of amounts, and multiplies the amount by an exchange rate is pretty darn simple. I love fun little exercises like that, so I put this together in a flash.

```js
var rate = 67,
dollars = [.01,.25,1,5,10,20,50,100,500,100],
rupees = [];
 
dollars.forEach(function(amount){
 
    rupees.push(amount * rate);
 
});
 
console.log(rupees);
```

Then of course it is just a matter of rendering these two parallel arrays into an HTML table. However there is just one problem, she would have to still manually edit the exchange rate value to generate an up to date list. Thats when I thought that there must be some kind of JSONP service that spits out up to date exchange rate values for say US Dollars, and Indian Rupees. After some quick google searches I was able to find a few API's that do just that. 

Most of the sites that offer this service cost money, or there is a limit on the number of requests per month. A lot of them give current rates up to the second, which is cool. However I thought that maybe there was a free service that updates just once a day, as that would work okay for now. To my satisfaction I was able to find one that was just what I was looking for called [fixer.io](http://fixer.io)

With fixer if I make a GET request with a url like this.
```
http://api.fixer.io/latest?base=INR;symbols=USD
```

fixer will give me this JSON Data.

```js
{"base":"INR","date":"2017-02-10","rates":{"USD":0.01494}}
```

There's my up to date rate, to help make life yet even more lazy. Now I just need to generate a table with that rate and my friend can have an up to date table of rates each time she visits a page, say maybe this one. Yeah that sounds good, why not, I'll put it here.

<div id="fixer_table"></div>
<script>

// default data
var defaults = {

    rates : {

        INR : 67.36,
        USD : 0.01494

    },

    date : '2-8-17'

},
data = defaults,
base = 'INR',
compare = 'USD',
id = 'fixer_table',

render = function (reverse) {

    var html = '',

    rate,

    amounts = [.01, .05, .10, .25, .5, .75, 1, 2, 5, 10, 20, 50, 67, 100, 150,200,250,500, 750,1000,2000,5000,10000];

    rate = data.rates[compare];
    if (reverse) {

        rate = 1 / data.rates[compare];

    }

    html += '<p>Date of rate: ' + data.date + '<\/p>';

    html += '<table>';

    if (reverse) {

        html += '<tr><td colspan=\"2\">' + compare + ' to ' + base + ' rate : ' + rate.toFixed(3) + '<\/td><\/tr>';
        html += '<tr><th>' + compare + '<\/th><th>' + base + '<\/th><\/tr>';

    } else {

        html += '<tr><td colspan=\"2\">' + base + ' to ' + compare + ' rate : ' + rate.toFixed(3) + '<\/td><\/tr>';
        html += '<tr><th>' + base + '<\/th><th>' + compare + '<\/th><\/tr>';

    }

    amounts.forEach(function (amount) {

        var convert = Number(amount * rate).toFixed(2);

        html += '<tr>';
        html += '<td>' + amount + '<\/td>';
        html += '<td>' + convert + '<\/td>';
        html += '<\/tr>';

    });
    html += '<\/table>';

    document.getElementById(id).innerHTML += html;

},

// what to do on readystate 4 (status 200 or 0)
update = function (req) {

    if (req.response) {

        try {

            data = JSON.parse(req.response);

        } catch (e) {

            data = defaults;

        }

    } else {

        data = defaults;

    }

    render(false);
    render(true);

},

// make a request
req = new XMLHttpRequest();

// I want JSON from fixer.io with the given base currency
req.open('get', 'https://api.fixer.io/latest?base=' + base + ';symbols=' + compare);

req.onreadystatechange = function () {

    if (req.readyState === 4) {

        update(req);

    }

};

req.onerror = function (e) {}

req.send();



</script>

## UPDATE: Using data from fixer in a tag, and other concerns

When I first wrote this post a few months ago I have not yet figured out how to go about directly writing html content with a hexo tag. In this post I am directly rendering html content with data from an scripted http request, without any static fall back. Sense then I have [wrote a post on how to do that](/2017/05/19/hexo-tags-http-requests/), as well as another [post on progressive enhancement](/2017/05/18/api-fixer-progressive-enhancement/).

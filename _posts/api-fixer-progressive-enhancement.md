---
title:  Progressive enhancement of static site structurer, with Hexo, and the Fixer.io JSON API
date: 2017-05-18 14:48:19
tags: [js,JSON,automation]
layout: post
categories: api
id: 21
updated: 2017-09-30 18:37:19
version: 1.5
---

{% mytags_postwords fixer.io,api&#32;fixer,jsonp,hexo,progressive,enhancement %}

A few months back I [wrote a post on the fixer api](/2017/02/09/api-fixer/), and how it is a great free solution for grabbing up to date currency exchange rates. When I wrote the post I was still somewhat new to using hexo, and how to properly handle things when it comes to progressive enhancement of my simple static website.

<!-- more -->

# The situation

Say you have this situation in which you have a static web page, that has content that is augmented with data that is gained via an API call to some kind of micro service hosted at another domain ( such as [fixer.io](http://fixer.io) ). You want to have it so that if the call to the service fails, for whatever reason, an out of date, but still useful static alternative of the content is still presented. This results in a nice, robust solution, that will always present something of value, even in the event of failure.

## Hard Code State

This is a situation in which an API call has failed, and to make matters even worse JavaScript has failed to execute as well, so any value that exists as a javaScript value in a variable is not being displayed as well, as the necessary DOM manipulation has not taken place. 

This may happen because the visitor has JavaScript disabled, or for whatever reason my code broke when it ran client side. As such only what is "hard coded" in the HTML itself is what will be displayed to the visitor. This is a kind of worst case scenario fail safe of sorts, that helps to give me peace of mind in the event that everything goes wrong. Yes the data may be out of date, but at least the visitor sees something.

## Warn state

This is a situation in which javaScript executed, but something went wrong with the request to fixer. As such javaScript is working, but up to date data has not been retrieved. As such the same out of date data is being used as a fall back still.

## Success state

This is a state in which my javaScipt program has succeed in retrieving up to date data from fixer.io. All is well in this case, and the only thing to care about at this point is if the program should still check in every once in a while for newer data. Considering that the values at fixer are only updated once a day, and the average visitor to my site spends no more than six minutes at a page, I would not say that is necessary, but in other projects like this it may be important.

## The static HTML

So The static html that will go inti the post will end up looking something like this:

```html
<div class="augmented-content">
 
  <h1>Dollars to Rupees</h1>
 
  <p>status: <span id="fixer-status" class="fail-text">hard code</span></p>
  <p>date: <span id="fixer-date">2017-05-17</span></p>
  <p>rate: <span id="fixer-rate">64.101</span></p>
 
  <table>
    <tr>
      <td>Dollars</td>
      <td>Rupees</td>
    </tr>
    <tr>
      <td>1000</td>
      <td id="fixer-amount">64,101</td>
    </tr>
  </table>
 
</div>
```

The data that goes into this HTML can be updated manually, or I could have a automation script of some kind that does it. In any case it should inform the visitor of how dated that data may be.

## The javaScript app

```js
(function() {
 
    var amount = 1000,
      status = 'warn',
 
      // js hard coded data
      data = {
 
        base: 'USD',
        date: '2017-05-17',
        rates: {
 
          INR: 64.101
 
        }
 
      },
 
      get = function(id) {
 
        return document.getElementById(id);
 
      },
 
      // augment the old static content, with current data
      augmentTable = function(res) {
 
        var statEl = get('fixer-status');
 
        if (status === 'success') {
 
          statEl.innerHTML = 'success';
          statEl.className = 'success-text';
 
        } else {
 
          statEl.innerHTML = 'warn';
          statEl.className = 'warn-text';
 
        }
 
        get('fixer-amount').innerHTML = amount * data.rates.INR;
        get('fixer-date').innerHTML = data.date;
        get('fixer-rate').innerHTML = data.rates.INR;
 
      },
 
      // making a request for a more up to date rate
      updateTable = function() {
 
        var req = new XMLHttpRequest();
 
        req.open('GET', 'https://api.fixer.io/latest?base=USD');
 
        req.onreadystatechange = function() {
 
          if (this.readyState === 4 && this.status === 200) {
 
            data = JSON.parse(this.response);
            status = 'success';
 
            console.log(data);
 
            augmentTable();
 
          }
 
        }
 
        req.send();
 
      };
 
    // agument with what we have
    augmentTable();
 
    updateTable();
 
  }
  ());
 
```

So there is always a better way of doing it, but hopefully you get the idea in mind here. You have the hard coded HTML only level content that is what is always displayed, then you have a state in which javaScript is working but for whatever the reason it was unable to gain more up to date data from fixer.io. Then if all goes well in which the code does not break, and a response is gained, you have a final success state in which the static content is updated. This is an example of progressive enhancement working the way that it should, where there is always a fall back of sorts, that can potentially get enhanced with javaScript.

## Updating the hard coded content of the project manually

One way to go about doing it, is to just manually copy and paste what I have worked out into the markdown of this post. The markdown parser will of course just copy over any, and all HTML markup over into the finished index.html for this post when I generate the site.

## Updating the hard coded content with the use of a tag.

Another idea would be to [write a tag](/2017/02/04/hexo-tags/) that will generate up to date markup each time the site is built. I have [wrote a post](/2017/05/19/hexo-tags-http-requests/) on how to make a hexo tag that grabs data from an JSON API like fixer.io, in fact I use that as the example there as well. This can get annoying as sometimes I may not want it to happen each time, in addition it will generated HTML content, but not update the markdown file source itself.

## The app in action

So here it is, you should see something at least.

<!-- can i put css here? It looks like I can at least. -->
<style>
.augmented-content {
  background: #afafaf;
  padding: 5px;
}
 
.augmented-content > table {
  width: 80%;
  background: #cfcfcf;
}
 
.fail-text {
  color: red;
}
 
.warn-text {
  color: orange;
}
 
.success-text {
  color: green;
}
 
</style>

<!-- The good, old, reliable HTML -->
<div class="augmented-content"><h1>Dollars to Rupees</h1><p>status: <span id="fixer-status" class="fail-text">hard code</span></p><p>date: <span id="fixer-date">2017-05-16</span></p><p>rate: <span id="fixer-rate">64.101</span></p><table><tr><td>Dollars</td><td>Rupess</td></tr><tr><td>1000</td><td id="fixer-amount">64,101</td></tr></table></div>

<!-- hold onto your buts -->
<script>
(function() {

    var amount = 1000,
      status = 'warn',

      // js hard coded data
      data = {

        base: 'USD',
        date: '2017-05-17',
        rates: {

          INR: 64.101

        }

      },

      get = function(id) {

        return document.getElementById(id);

      },

      // augment the old static content, with current data
      augmentTable = function(res) {

        var statEl = get('fixer-status');

        if (status === 'success') {


          statEl.innerHTML = 'success';
          statEl.className = 'success-text';

        } else {

          statEl.innerHTML = 'warn';
          statEl.className = 'warn-text';

        }

        get('fixer-amount').innerHTML = amount * data.rates.INR;
        get('fixer-date').innerHTML = data.date;
        get('fixer-rate').innerHTML = data.rates.INR;

      },

      // making a request for a more up to date rate
      updateTable = function() {

        var req = new XMLHttpRequest();

        req.open('GET', 'https://api.fixer.io/latest?base=USD');

        req.onreadystatechange = function() {

          if (this.readyState === 4 && this.status === 200) {

            data = JSON.parse(this.response);
            status = 'success';

            console.log(data);

            augmentTable();

          }

        }

        req.send();

      };

    // agument with what we have
    augmentTable();

    updateTable();

  }
  ());

</script>

## conclusion

Be sure to check out my other posts on [hexo](/categories/hexo/), and [api's](/categories/api/).
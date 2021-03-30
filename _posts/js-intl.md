---
title: internationalization constructors of the javaScript Intl object
date: 2021-03-30 13:24:00
tags: [js]
layout: post
categories: js
id: 834
updated: 2021-03-30 15:24:50
version: 1.12
---

When it comes to formating numbers in javaScript there is now a built in feature called the [Intl Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl), that is worth checking out before looking into user space options, or making ones own solution for number formating. I first became aware of this new built in feature when researching solutions for quick and simple money string formatting, and found a [stack overflow post on the topic of the NumnberFormat constructor of the Intl object](https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string) that had to do with using that constructor to format a money string. So I thought that it might be a good idea to write a post on this Intl object to gain a better sense of what this object is for when it comes to formating strings, and numbers for the purpose of display, rather than preforming operations.

<!-- more -->


## 1 - The Intl.NumberFormat constructor

The Intl.NumberFormat constructor can be used to work with language sensitive number formatting. This includes money, as well as percent values. Properties can be used to format money in terms of the USD, or any kind of other currency if the right options are set.

### 1.1 - Format Money

To format money with the Number Format constructor of the Intl Object first off I just need to call the constructor with the new keyword just like any other constructor function in javaScript. However I will of course want to pass some arguments, the first of which should be the language tag, for me and the sites I often work n thus far this would always be en-US, for a full list of other options for the language tag hough I would check out a [BCP 47 language tag list](https://appmakers.dev/bcp-47-language-codes-list/).

The next argument that I give the constructor should be an object, this object should contain a style property with a value of currency. I should also give a currency property to the object and give the [ISO 4217 currency code that I want to use](https://en.wikipedia.org/wiki/ISO_4217), for me this will possibly always be USD.

```js
var utils = {};
// format number as money
utils.format_money = function(number){
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        // These options are needed to round to whole numbers if that's what you want.
        minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        maximumFractionDigits: 0 // (causes 2500.99 to be printed as $2,501)
    });
    return formatter.format(number);
};

console.log(utils.format_money(123456.78) ); // $123,457
```

The returned result then is a formatter, that I can then call and pass a number value. The result that is then returned by the formatter will then be my formated string value that I want.

### 1.2 Format a Percent value

Another useful feature of this NumberFormat constructor is to use to to format a percent value. This is done more or less the same way as with the currency style, but I just set a percent style rather than currency. I can then pass a number value to the returned formatter and when doing so the number given should be a fraction between and including zero and one. 
When making a formating method off of this I might want to have just a few more options and features when it comes to producing the number value to give to the formatter. For example I might want to use it my passing a numerator and denominator value to get a percentage. Also it might be nice to have an option to turn on clamping of a percent value in some situations.

```js
var utils = {};
// format as percent
utils.format_percent = function (a, d, clamp) {
    clamp = clamp || false;
    var per = a;
    if (arguments.length === 2) {
        per = a / d;
    }
    if (clamp) {
        per = per < 0 ? 0 : per;
        per = per > 1 ? 1 : per;
    }
    var formatter = new Intl.NumberFormat('en-US', {
            style: 'percent',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
    return formatter.format(per);
};
 
console.log(utils.format_percent(.8925)); // 89%
 
console.log(utils.format_percent(3, 4)); // 75%
 
console.log(utils.format_percent(8, 4)); // 200%
console.log(utils.format_percent(8, 4, true)); // 100%
```

## 2 - Getting a page lang

One way to get the language value of a page is to use the document element property of the document object in client side javaScript. This value can then be passed as the first argument for a formatter. In addition to this it can also be used as a way to set a value for other values such as the currency property of a Number Formatter constructor instance. I can check the lang of a page and if it is qual to en-US I can set the currency as US dollars \(USD\) as the currency, for all other languages I can set the currency to something else such as Euros \(EUR\).

```html
<html lang="en-US">
  <html>
    <title>Get Lang</title>
  </html>
  <body>
    <div> Page lang is: <span id="disp-lang"></span></div>
    <div> Using currency: <span id="disp-cur"></span></div>
    <div> Using currency: <span id="disp-money"></span></div>
    <script>
var pageLang = document.documentElement.lang;
 
var currency = pageLang === 'en-US' ? 'USD' : 'EUR';
 
var formatter = new Intl.NumberFormat(pageLang, {
        style: 'currency',
        currency: currency
});
 
document.getElementById('disp-lang').innerText = pageLang;
document.getElementById('disp-cur').innerText = currency;
document.getElementById('disp-money').innerText = formatter.format(1234.56);
 
    </script>
  </body>
</html>
```

## 3 - Conclusion

SO the Intl Object is useful for just getting this kind of task over with so I can then move on to what I really want to do in a project. This is still a relativity new feature in javaScript so if you care about your code breaking on old versions of Internet explorer mainly version 10 and older than another option will have to be explored when it comes to formatting numbers. However I am not seeing a lot of people using browser that old any more, so this might be my first go to solution for formatting numbers when it comes to working on various projects.


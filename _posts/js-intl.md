---
title: internationalization constructors of the javaScript Intl object
date: 2021-03-30 13:24:00
tags: [js]
layout: post
categories: js
id: 834
updated: 2021-03-30 14:11:41
version: 1.3
---

When it comes to formating numbers in javaScript there is now a built in feature called the [Intl Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl), that is worth checking out before looking into user space options, or making ones own solution for number formating. I first became aware of this new built in feature when researching solutions for quick and simple money string formatting, and found a [stack overflow post on the topic of the NumnberFormat constructor of the Intl object](https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string) that had to do with using that constructor to format a money string. So I thought that it might be a good idea to write a post on this Intl object to gain a better sense of what this object is for when it comes to formating strings, and numbers for the purpose of display, rather than preforming operations.

<!-- more -->


## 1 - The Intl.NumberFormat constructor

The Intl.NumberFormat constructor can be used to work with language sensitive number formatting. This includes money, as well as percent values. Properties can be used to format money in terms of the USD, or any kind of other currency if the right options are set.

### 1.1 - Format Money

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

### 1.2 Format a Percent value

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
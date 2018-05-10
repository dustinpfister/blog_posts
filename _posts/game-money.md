---
title: Game Money
date: 2017-02-27 17:00:00
tags: [js,games]
layout: post
categories: games
id: 3
updated: 2017-04-04 08:23:54
version: 1.0
---

{% mytags_postwords phaser,framework,js,game,development,money %}

As a long time JavaScript hobbyist I have made my fair share of games. I am sure that game development is a major reason why a lot of people get into javaScript to begin with, and as such I am no exception. One thing that comes up often in game development is dealing with some kind of in game currency. 

<!-- more -->

As of late I have been making some new games that involve game money, so I thought I would put together a quick something to touch on the ways I go about handling this.

## Just incrementing

In some games I will have a situation in which you start with a certain amount of money, and money will just simply be added to that sum on each frame tick, or by way of some kind of condition.

```js
// the money
var money = 0.75,
income = 0.25,
 
// something to by
cansOfBeans = {
    cost : 0.65,
    count : 0
},
 
buybeans = function () {
 
    // yep just subtract
    if (money >= cansOfBeans.cost) {
 
        money -= cansOfBeans.cost
        cansOfBeans.count += 1;
 
    }
 
},
 
// what to do on each tick
tick = function () {
 
    // yep just add
    money += income;
    render();
 
},
 
// a basic view, and interface would be nice, yes?
disp,
render = function () {
 
    disp.innerHTML = 'money: ' + money.toFixed(2) + '<br>' +
        'Cans of beans : ' + cansOfBeans.count;
 
},
 
// what to do to start things
start = function () {
 
    var button;
 
    // set up a display
    disp = document.createElement('div')
        disp.id = 'game_container';
 
    // an interface
    button = document.createElement('input');
    button.type = 'button';
    button.value = 'buy beans for $' + cansOfBeans.cost;
 
    button.addEventListener('click', buybeans);
 
    document.body.appendChild(disp);
    document.body.appendChild(button);
    render();
 
    setInterval(tick, 1000);
 
};
 
start();
```

Working with game currency this way may be crude, but it is often simple, and effective. Sometimes it is called for to just get the job done, and not put to much thought into things.

## Setting money by way of an expression

Another approach I have been using for game money, is to always set money to it's current balance by way of an expression. I like this because I can play around with the values in the expression to quickly jump around in time, and with different expenses.

```js
// A money module
var Money = (function () {
 
    // the current state
    var state = {
 
        // bal property is not set here, but by a method
        start : 1500,
        incomePerMonth : 500
 
    },
 
    // a public api
    api = function () {
 
        return state;
 
    };
 
    // set the game balence by way of an expression
    api.setMoney = function (gameMonth, payments) {
 
        gameMonth = gameMonth || 0;
        payments = payments || 0;
 
        // the expression
        state.bal = state.start + gameMonth * state.incomePerMonth - payments;
 
    };
 
    // call it for the first time
    api.setMoney();
 
    // return the public api
    return api;
 
}
    ());
 
// starting with a balence of 1500
console.log(Money().bal); // 1500
 
// after two game months, and no payments
Money.setMoney(2);
console.log(Money().bal); // 2500
 
// after 3 game months, and paying 1000 a month for something
Money.setMoney(3, 1000 * 3);
console.log(Money().bal); // 0
 
// a payment history
var paymentHistory = [856.25, 927.75, 1212.50];
Money.setMoney(paymentHistory.length, (function () {
 
        var total = 0;
        paymentHistory.forEach(function (payment) {
            total += payment;
        });
        return total;
 
    }
        ()))
console.log(Money().bal); // I got about tree fiddy
```

I like doing things this way more lately. It forces me to make my game in a way in which everything can be accounted for, because it has to be.



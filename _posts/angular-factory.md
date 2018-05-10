---
title: The deal with the angular.js factory for making services
date: 2017-12-16 10:02:00
tags: [js,node.js,hapi,angular]
layout: post
categories: angular
id: 115
updated: 2017-12-17 22:58:26
version: 1.3
---

I am still somewhat new with angular.js, but I have been working hard on making a lot of cool demos, and apps with in in my test_angular project. When first starting out I would have logic in my controllers, which is not what they are for, they should be thin. In addition I would keep writing some of my modules in my old vanilla js manner, which works of course, but I am using angular so I should do something that makes my modules angular like. One way to do this is to use a Factory, It is one of three ways to make what is called a service in angular speak.

<!-- more -->

## Basic Angular Modules Factory Example

So to get started understating factory's and why they are awesome, lets start with a real basic and easy to understand example.

### HTML

With the html I will just have a single div element with the usual ng-app directive to bootstrap the module that I will call _app_, and a single controller that I will call _fact-control_

```html
<div ng-app="app" ng-controller="fact-control" >
 
    <p>mess: {{mess}}</p>
 
</div>
```

### JS

With the javaScript I will of course have my _app_ module, and also my factory that I will call _Fact_ that will be used in my controller _fact-control_.

```js
var app = angular.module('app', []);
 
app.factory('Fact', function () {
 
    return {
 
        mess: 'I am a factory'
 
    };
 
});
 
app.controller('fact-control', function ($scope, Fact) {
 
    $scope.mess = Fact.mess
 
});
```

Right off the bat there are three things that are great about this:

* My object that contains a message value to display is not stored in a controller.
* I can separate everything into separate into three JavaScript files as long as they are loaded in a linear order, breaking down what might eventually become a complex application.
* I can define my own services that can be used in controllers, and other services like that of $scope, and $http.

## And now for something more interesting

In the basic example I am just returning an object literal with a simple message. For a more interesting use case example I thought I might throw something together involving the use of [fixer.io](https://dustinpfister.github.io/2017/02/09/api-fixer/).


For my view I will have it display the latest exchange rates form fixer.io, or in the event it fails for some reason hard coded data in a service called _Fixer_.

```html
<div ng-app="app" ng-controller="fact-control" >
 
    <h1>Fixer data rates.</h1>
    <p>Date of data: {{time}}</p>
 
    <ul>
 
        <li ng-repeat="r in rates">{{r.key}} : {{r.rate}}</li>
 
    </ul>
 
</div>
```

The service will then use $http to get the latest JSON, and in the event that it fails to do so, use a hard coded object in the service in place of the latest data.

```js
let app = angular.module('app', []);
 
app.factory('Fixer', function ($http) {
 
    return {
 
        // get the latest fixer.io data
        latest: function () {
 
            return $http.get('https://api.fixer.io/latest')
 
        },
 
        // use hard coded fixer.io data in this *.js
        hardCoded: function () {
 
            return {
                "data": {
                    "base": "EUR",
                    "date": "2017-12-15",
                    "rates": {
                        "AUD": 1.5382,
                        "BGN": 1.9558,
                        "BRL": 3.9171,
                        "CAD": 1.507,
                        "CHF": 1.1669,
                        "CNY": 7.8022,
                        "CZK": 25.678,
                        "DKK": 7.4443,
                        "GBP": 0.88253,
                        "HKD": 9.2223,
                        "HRK": 7.5465,
                        "HUF": 313.43,
                        "IDR": 16029,
                        "ILS": 4.1634,
                        "INR": 75.608,
                        "JPY": 132.45,
                        "KRW": 1284.7,
                        "MXN": 22.628,
                        "MYR": 4.8163,
                        "NOK": 9.7828,
                        "NZD": 1.6803,
                        "PHP": 59.528,
                        "PLN": 4.2167,
                        "RON": 4.6332,
                        "RUB": 69.504,
                        "SEK": 9.9583,
                        "SGD": 1.5897,
                        "THB": 38.375,
                        "TRY": 4.5603,
                        "USD": 1.1806,
                        "ZAR": 15.781
                    }
                },
                "status": 200,
                "config": {
                    "method": "GET",
                    "transformRequest": [null],
                    "transformResponse": [null],
                    "jsonpCallbackParam": "callback",
                    "url": "https://api.fixer.io/latest",
                    "headers": {
                        "Accept": "application/json, text/plain, */*"
                    }
                },
                "statusText": "",
                "xhrStatus": "complete"
            };
 
        },
 
        // format the given fixer.io data
        format: function (fixerData) {
 
            let keys = Object.keys(fixerData.data.rates);
 
            return {
 
                rates: keys.map(function (key, i) {
 
                    return {
 
                        key: key,
                        rate: fixerData.data.rates[key]
 
                    }
 
                }),
 
                time: fixerData.data.date
 
            };
 
        },
 
        latestFormatted: function () {
 
            var self = this;
 
            return new Promise(function (resolve, reject) {
 
                // first use latest and resolve or reject
                return self.latest().then(function (latest) {
 
                    console.log('yes');
                    console.log(latest);
 
                    // resolve with the latest data
                    resolve(latest);
 
                }).catch (function (e) {
 
                    console.log('no');
                    reject(e);
 
                });
 
            }).then(function (latest) {
 
                // format and return the latest
                return self.format(latest);
 
            }).catch (function () {
 
                // format and return hard coded data
                return self.format(self.hardCoded());
 
            });
 
        }
 
    };
 
});
 
// look how clean my controller is!
app.controller('fact-control', function ($scope, Fixer) {
 
    var setValues = function (fix) {
 
        $scope.time = fix.time;
        $scope.rates = fix.rates;
 
    };
 
    // set values with latest, or hardcoded fixer.io data rates
    Fixer.latestFormatted().then(function (fix) {
 
        setValues(fix);
        $scope.$apply();
 
    }).catch (function (fix) {
 
        setValues(fix);
        $scope.$apply();
 
    });
 
});
```

The idea here is to pull logic away from controllers, and into a place where it belongs. I also find this as a nice way to go about working with a lot of modules at once. I can make a whole bunch of services with module.factory. Some of which may stand alone, others might depend on something, you get the idea.
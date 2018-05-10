---
title: Making my chart element using angular.js and chart.js
date: 2017-12-20 14:30:00
tags: [js,node.js,hapi,angular,canvas]
layout: post
categories: angular
id: 119
updated: 2017-12-20 14:56:19
version: 1.1
---

I have been diving into [angular.js](https://angularjs.org/) these days, and it is turning out to be one of those things I wish I did a long time ago. I have been making a lot of demos for my [test_angular](https://github.com/dustinpfister/test_angular) project and then writing about them here. For one of my demos I thought it would be fun to begin to explore this idea of using angular to extend html by making my own elements. A little ways back [I wrote a post](/2017/12/01/canvas-chartjs/) on [chart.js](http://www.chartjs.org/) Which is a pretty cool project for making canvas charts, so why not some kind of chart element that makes use of angular.js and chart.js?

<!-- more -->

## The chart element

So at the time the chart element I made looks like this:

```html
<div ng-app="app">
    <x-chart 
        type="line"
        width="320"
        labels="week1;week2;week3;week4"
        colors="red;blue"
        datasets="impressions[1024;700;650;1200 clicks[35;29;14;45"></x-chart>
</div>
```

Of course this is all data that I use in the link method of the directive that I made. I just wrote a post on [how to make custom directives](/2017/12/19/angular-module-directives/) so I will not get to deep into that here.


## The directive

In order for my custom html to have any meaning I need to define a directive for it. I will of course want to make sure that it will work as a stand alone element, and maybe also an attribute, so I will want to set the _restrict_ property to _AE_. _replace_ should be set to true because I think I am going to do everything with attributes, so I will just use that space for a fail message maybe. In addition the template will juts be a canvas element, nested in div.

```js
var app = angular.module('app', []);
 
// basic directive example.
app.directive('chart', function () {
 
    return {
 
        restrict: 'AE',
        replace: 'true',
        template: '<div><canvas></canvas></div>',
        link: function (scope, el, attr) {
 
            var container = el[0],
            canvas = container.children[0],
            datasets = attr.datasets.split(' ');
 
            scope.colors = attr.colors.split(';');
            scope.labels = attr.labels.split(';') || [];
            scope.sets = [];
            scope.width = attr.width || 640;
 
            container.style.width = scope.width + 'px';
 
            datasets.forEach(function (set, i) {
 
                scope.sets.push({
 
                    label: set.split('[')[0],
                    borderColor: scope.colors[i] || '#0000ff',
                    data: set.split('[')[1].split(';')
 
                });
 
            });
 
            scope.ctx = canvas.getContext('2d');
            scope.chart = new Chart(scope.ctx, {
 
                    type: attr.type || 'line',
                    data: {
                        labels: scope.labels,
                        datasets: scope.sets
 
                    }
 
                });
 
        }
 
    };
 
});
```

As you can see most of the action is happening in the link method. Here I am given references for the current scope, element (the div in the template), and attributes from my x-chart element. For now I am not taking into consideration the use of a controller, and just define things that I assume are not there because of a controller. That of course is a simple fix, the bottom line is that I get the idea, and yeah this is pretty awesome.
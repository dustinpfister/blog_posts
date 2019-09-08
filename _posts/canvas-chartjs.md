---
title: Using Chart.js to make and work with Canvas Charts with javaScript
tags: [js, canvas]
categories: canvas
date: 2017-12-01 11:48:00
id: 102
updated: 2019-09-08 16:37:34
version: 1.5
---

These days I am working out some projects that have to do with analyzing text, and it would be nice to find a way to visualize that data with canvas elements. I was thinking of making my own solution, but I am glad that I have found [charts.js](http://www.chartjs.org/docs/latest/) as it is pretty much just what I had in mind, and seems to work great!

<!-- more -->

<script src="/js/chart.min.js"></script>

## 1 - Canvas Chart basics

So there is more that one way to make charts with canvas of course. In this post I am using a project called chart js that is pretty flashy, but it is also not to hard to just work out a chart with just the canvas 2d drawing context by itself.

## 2 - Basic example of charts.js use

Here I am working out just my first basic example of chartjs.

```html
<div style="width:320px;">
    <canvas id="chart-demo-1"></canvas>
</div>
<script>
var ctx = document.getElementById('chart-demo-1').getContext('2d'),
 
// chart
chart = new Chart(ctx, {
 
        type: 'line',
 
        data: {
 
            labels: ['week1', 'week2', 'week3'],
            datasets: [{
 
                label: 'impressions',
                borderColor: '#ff0000',
                data: [450, 375, 680]
 
            },{
 
                label: 'clicks',
                borderColor: '#0000ff',
                data: [70, 20, 120]
 
            }]
 
        }
 
    });
</script>
```

## updating a chart

Updating a chart is as simple as just changing the dataset values and calling the chart.update method in the instance of Chart that is returned when calling the constructor.

```js
setInterval(function(){

    chart.data.datasets.forEach(function(ds){

        ds.data = ds.data.map(function(){

            return Math.floor(Math.random() * 50);

        });

    });

    chart.update();

},1000);
```

<div style="width:320px;margin-left:auto;margin-right:auto;">
    <canvas id="chart-demo-1"></canvas>
</div>
<script>
var ctx = document.getElementById('chart-demo-1').getContext('2d'),
 
// chart
chart = new Chart(ctx, {
 
        type: 'line',
 
        data: {
 
            labels: ['week1', 'week2', 'week3'],
            datasets: [{
 
                label: 'impressions',
                borderColor: '#ff0000',
                data: [450, 375, 680]
 
            },{
 
                label: 'clicks',
                borderColor: '#0000ff',
                data: [70, 20, 120]
 
            }]
 
        }
 
    });
 
setInterval(function(){
 
    chart.data.datasets.forEach(function(ds){
 
        ds.data = ds.data.map(function(){
 
            return Math.floor(Math.random() * 50);
 
        });
 
    });
 
    chart.update();
 
},1000);
 
</script>

## Conclusion

Chart.js is pretty cool for doing anything with charts. I just wanted to put together a quick post on this one, I will likely write more about it in the future.
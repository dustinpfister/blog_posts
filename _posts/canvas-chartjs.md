---
title: Using Chart.js to make and work with Canvas Charts with javaScript
tags: [js, canvas]
categories: canvas
date: 2017-12-01 11:48:00
id: 102
updated: 2019-09-09 11:50:16
version: 1.11
---

These days I am working out some projects that have to do with analyzing text, and it would be nice to find a way to visualize that data with canvas elements. I was thinking of making my own solution, but I am glad that I have found [charts.js](http://www.chartjs.org/docs/latest/) as it is pretty much just what I had in mind, and seems to work great!

<!-- more -->

<script src="/js/chart.min.js"></script>

## 1 - Canvas Chart basics

So there is more that one way to make charts with canvas of course. In this post I am using a project called chart js that is pretty flashy, but it is also not to hard to just work out a chart with just the canvas 2d drawing context by itself. So a canvas chart could be created by adding chartjs to a project, or it could be just created with methods like line to, move to, and stroke when just working with the plain old canvas 2d drawing context.

## 2 - Basic example of charts.js use

So to get started with chartjs first I need to grab the version of chartjs that I want to use. In this post I was using [chartjs 2.7.1](https://github.com/chartjs/Chart.js/tree/v2.7.1/dist). Once I have a copy of chartjs to link to with a script tag I can then write some code for a basic line chart.

```html
<html>
  <head>
      <title>chart.js basic</title>
  </head>
  <body>
    <div style="width:320px;">
      <canvas id="chart-demo-1"></canvas>
    </div>
    <script src="chart.min.js"></script>
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
  </body>
</html>
```

## 3 - updating a chart

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

## 4 - Vanilla js Draw line chart alternative

Although using chartjs is a great solution for quickly getting a line chart as well as several other types of charts in a project, it is not to hard to work out a vanilla javaScript solution. Of course it will be a bit time consuming compared to just adding chartjs to a project and moving on. However I have found that it is really not to hard to get a basic working solution up and running, and I also have the option to make the solution more streamlined, with features that I want, and no additional bulk that will slow down site performance.

```js
var drawLineChart = (function () {
    // set scale helper
    var setScale = function (canvas, values) {
        var highest = Math.max.apply(null, values);
        return values.map(function (val) {
            return val / highest * canvas.height;
        });
    };
    // return the draw function
    return function (canvas, opt) {
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        Object.keys(opt.data).forEach(function (setName, di) {
            var values = setScale(canvas, opt.data[setName]);
            ctx.beginPath();
            ctx.strokeStyle = opt.colors[di] || 'white';
            values.forEach(function (n, i) {
                var x = canvas.width / (values.length - 1) * i,
                y = canvas.height - n;
                ctx.lineTo(x, y);
            });
            ctx.stroke();
        });
    };
}
    ());
```

```html
<html>
  <head>
      <title>chart.js basic</title>
  </head>
  <body>
    <div style="width:320px;">
      <canvas id="chart-demo-1"></canvas>
    </div>
    <script src="drawlinechart.js"></script>
    <script>
var canvas = document.getElementById('chart-demo-1'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
drawLineChart(canvas, {
  colors: ['blue', 'red'],
  data:{
    clicks: [12,30,24,250, 200],
    impres: [120,60,50,400, 375]
  }
});
    </script>
  </body>
</html>
```

## 5 - Conclusion

Chart.js is pretty cool for doing anything with charts. I just wanted to put together a quick post on this one, I will likely write more about it in the future.
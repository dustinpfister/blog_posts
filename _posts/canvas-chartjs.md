---
title: Using Chart.js to make and work with Canvas Charts with javaScript
tags: [js, canvas]
categories: canvas
date: 2017-12-01 11:48:00
id: 102
updated: 2020-04-17 08:26:03
version: 1.18
---

These days I am working out some projects that have to do with analyzing text, and it would be nice to find a way to visualize that data with canvas elements. I was thinking of making my own solution, but I am glad that I have found [charts.js](http://www.chartjs.org/docs/latest/) as it is pretty much just what I had in mind, and seems to work great when  it comes to quickly getting up and running with basic charts. 

Still it is not to hard to work out a simple native javaScript solution as well, so in this post I will be taking a quick look at chartjs, and will also be writing about a vanilla js option that I slapped together for the sake of this post.

<!-- more -->

<script src="/js/chart.min.js"></script>

## 1 - Canvas Chart basics

So there is more than one way to make charts with canvas of course as there is doing just about everything that comes to mind when it comes to working out my own solutions for presenting data. However if I just want a simple line or pie graph there are solutions out on the open interment that can be used to get that out of the way in a flash.

In this post I am using a project called chart js that is pretty flashy, but gets the job done never the less. So a canvas chart could be created by adding charts to a project, or it could be just created with methods like line to, move to, and stroke when just working with the plain old canvas 2d drawing context to write my own native javaScript solution for this.

It is not to hard to just work out a chart with just the canvas 2d drawing context by itself. However even so it is still something that can prove to be a little time consuming, and pull attention from the aspects of the project that really matter. In any case I will be going over some char.js examples here, as well as my own copy and past native solution that I worked out for this post on canvas and charts.

## 2 - Basic example of charts.js use

So to get started with chartjs first I need to grab the version of chartjs that I want to use for thus post. In this example I was using [chartjs 2.7.1](https://github.com/chartjs/Chart.js/tree/v2.7.1/dist). Once I have a copy of chartjs to link to with a script tag I can then write some code for a basic line chart.

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

Updating a chart is as simple as just changing the dataset values and calling the chart.update method in the instance of chart that is returned when calling the constructor.

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

Although using chartjs is a great solution for quickly getting a line chart as well as several other types of charts in a project, I often prefer to work out my own solutions for things like this. I might want to make a simple solution that will not eat up less overhead, or do something new when it comes to how to go about presenting data. Another reason that comes to mind is to just simple have control when it comes to things like licensing terms, bugs, coding style and so forth.

Of course it will be a bit time consuming compared to just adding chartjs to a project and moving on. However I have found that it is really not to hard to get a basic working solution up and running, and I also have the option to make the solution more streamlined, with features that I want, and no additional bulk that will slow down site performance.

## 4.1 - The draw Line chart method

So I worked out a simple stand alone method that can be passed a canvas element, and an object that is formated a certain way to produce a line chart. This example is not necessary a done deal, but for the sake of this post alone the basic idea of what I had in mind seems to work okay when it comes to making a simple canvas chart with native client side javaScript.

I have a self executing function expression that returns the method that will be used to draw the line chart and inside the body of the closure I have a single helper function worked out that sets the scale of the data based on the height of the canvas. In addition the width of the canvas stipulates the delta x value that will process of each item in the data set.

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

This single stand alone function is then placed into an external javaScript file to which I then link to in my main html file in which I will be using this method.

### 4.2 - Uisng the Draw line chart method

So here I have an html file example in which I am using the draw line chart method that I worked out.

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

The project works as expected, but there is a bit more that comes to mind. I might want better control over the location and size of the area where the line chart will be placed in the canvas for example. In addition I would also want to add some labeling for the scale and a legend. However there is still only so much more that comes to mind and it still fulfills the most important aspect of such a project.

## 5 - Conclusion

Chart.js is pretty cool for doing anything with charts. I just wanted to put together a quick post on this one, I will likely write more about it in the future.
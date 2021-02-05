---
title: A vuejs example of a simple image edit app
date: 2020-07-27 16:57:00
tags: [vuejs]
layout: post
categories: vuejs
id: 687
updated: 2021-02-05 15:41:20
version: 1.3
---

It has been a long time sense I wrote a post on [vuejs](https://vuejs.org/v2/guide/), so I thought I would make a vuejs example post to help expand that collection. For this [vuejs examples](/2021/02/04/vuejs-example/) the idea of a simple image editor application that will create a json version of the image that I draw with it came to mind. So maybe something like that is in order when it comes to expanding on what can be done with vuejs.

<!-- more -->

## 1 - Edit.js

First off here is the vuejs instance that will serve as the editor that will be used to store the state of the image and can also be used to change the image state.

```js
new Vue({
    el: '#app',
    render: function (createElement) {
        return createElement('div', {
            style: {
                position: 'relative',
                left: '0px'
            }
        }, [this.renderGrid(createElement), this.renderColorSel(createElement)]);
    },
    data: {
        width: 4,
        height: 4,
        currentColorIndex: 0,
        colors: ['white', 'red', 'green', 'blue']
    },
    methods: {
        createStyleObj: function (colorIndex, left, top) {
            var d = this.$data;
            return {
                position: 'absolute',
                width: '32px',
                height: '32px',
                background: d.colors[colorIndex],
                left: left + 'px',
                top: top + 'px',
                textAlign: 'center'
            };
        },
        renderColorSel: function (createElement) {
            var sel = [],
            div,
            cellOpt,
            d = this.$data,
            i = 0,
            len = d.colors.length;
            while (i < len) {
                cellOpt = {
                    style: this.createStyleObj(i, i % d.width * 32, 0),
                    on: {
                        click: this.setColor
                    }
                };
                div = createElement('div', cellOpt, i);
                sel.push(div);
                i += 1;
            }
            return createElement('div', {
                style: {
                    position: 'relative',
                    left: '0px',
                    top: '0px'
                }
            }, sel);
        },
        renderGrid: function (createElement) {
            var grid = [],
            div,
            cellOpt,
            d = this.$data,
            i = 0,
            len = d.width * d.height;
            while (i < len) {
                cellOpt = {
                    style: this.createStyleObj(1, i % d.width * 32, i % d.width * 32),
                    on: {
                        click: this.draw
                    }
                };
                cellOpt.style.top = (Math.floor(i / d.height) * 32) + 'px';
                div = createElement('div', cellOpt, 1);
                grid.push(div);
                i += 1;
            }
            return createElement('div', {
                style: {
                    position: 'relative',
                    left: '0px',
                    top: '64px'
                }
            }, grid);
        },
        setColor: function (e) {
            var div = e.target,
            d = this.$data;
            e.preventDefault();
            d.currentColorIndex = div.innerText;
            console.log(div)
        },
        draw: function (e) {
            var div = e.target,
            d = this.$data;
            e.preventDefault();
            div.innerText = this.$data.currentColorIndex;
            div.style.background = d.colors[d.currentColorIndex];
        }
    }
})
```

```html
<html>
  <head>
    <title>vue calculator example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="app"></div>
  <script src="edit.js"></script>
  </body>
</html>
```

## 2 - Conclusion

I did not get around to finishing everything that i wanted to do with this vuejs example as of this writing. I am not happy with the way things pan out, and will get around to writing the example over again at some point when I get more time to work on this one. I have been getting around to editing some of this vuejs content of mine, and if I keep up with it I should come back to this one again at some point in the future.
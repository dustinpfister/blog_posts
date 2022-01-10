---
title: Unsteady Stars Digital Art javaScript example
date: 2022-01-10 14:10:00
tags: [js]
layout: post
categories: js
id: 950
updated: 2022-01-10 14:54:58
version: 1.5
---

Over the last few days I was working on yet another one of my [javaScript examples](/2021/04/02/js-javascript-example/) this time it is yet another Digital Art Projects based off of [revision 5 of my first Object Pool Reduction digital art example](/2021/12/31/js-javascript-example-digital-art-reduce-pool/) that I started late last year.

<!-- more -->

## 1 - The utilities library

The [utilities library](/2021/08/06/js-javascript-example-utils/) for this example contains a number of methods that I will be using throughout the other files in this over all project. So then many of these methods are usual suspect type methods that I end up using in just about any other javaScript example of mine, but I sill keep the example more or less custom cut for the specific project.

```js
```

## 2 - The star module

The star module that I am suing for this example is based off of what I worked out for my older [canvas example project and drawing stars](/2020/02/12/canvas-example-star/).

```js
```

## 3 - The object pool module

The object pool module was copied over from the other digital art example that I started this out from. It started out with what what I put together with in my [canvas example on object pools](/2020/07/20/canvas-example-object-pool/). Sense then I keep making little changes to it here and there as needed, and over time I slowly but surly have a more solid module for this sort of thing.

```js
```

## 4 - The game module

I then have the main game state module for this example, which is what I make that is typically used to create and update a main game state object.

```js
```

## 5 - The draw module

I then have a draw module that contains all the methods that I will be using to draw the current state of the game object to a canvas element.

```js
```

## 6 - The main javaScript file

Now that I have everything that I need to create a state object, update that state object, and draw it to a canvas element I will just need a little more javaScript to make use of all of this in the form of a main javaScript file.

```js
```


## 7 - Conclusion

So then I am glad that I followed threw with this project and have completed it by working out the core of the idea first, and also completed just the two features that I hand planed out for this. Of course I could just keep going with this project even further adding yet even more features that have come to mind for the project in terms of other movement modes, and well as whole other kinds of modes that have to do with completely different behavior all together. There is more that could be done with how to go about switching between modes, and also more advanced features for the background, colors, and so forth. However I did only want to spend at most a few days on this and then move on to the next project, which is what I will be doing.

So then the current plans with this at the time of this writing at least is to just do a little clean up with the code in order to help make the over all project a little easier to follow. I fixed all the bugs that I know of at this point as of revision 4 of this project, but I am sure there might be at least one or two more maybe. So then for the most part I intended to just maintain what the project all ready is rather than add more to it, unless of course something happens that might change that for me.

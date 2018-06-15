---
title: The express.js top level function for creating app objects, and more.
date: 2018-06-13 16:34:00
tags: [js,express,node.js]
layout: post
categories: express
id: 207
updated: 2018-06-15 11:37:51
version: 1.6
---

When creating an [express.js](https://expressjs.com/) project of any kind the first thing that I work with is the express top level function. It is the function that is exported when grabbing at express with require when making the typical app.js file. This function is used to create instances of an app object, and it also has some additional methods attached to it as well.

<!-- more -->

## What to know

This post will quickly cover some of the most important things to know about with the express.js top level function, but I will not be getting into any of them to an extreme level of detail. In othe words this post acts as an index of sorts for other content that is of greater value. I have my [main mega post on express](/2018/06/12/express/) that acts as the main index of all content on express that might be a good starting point on this site for all things express.


## Calling the express top level method to create an app object

Any express object will often involve calling the top level function that is exported from the express module to create an instance of the app object.

```js
let express = require('express'),
app = express(); // the app object
app.get('*', function(req,res){res.send('hello');});
app.listen(8080);
```

It is also possible to create an express app middle ware by using express.Router as well, more on that later though. Here I am just giving a simple hello world example of the app object, but there is much more to know on it. If you are wondering on how to go about parsing the body of an incoming post request for example you will want to use app.post, and also a body parser as well.

You can read more on the [app object](/2018/06/15/express-app-object/).

## Creating static paths with express.static

One of the useful sttaic methods that are attached to the express top level function is the express.static method that is useful for setting up a simple static server for a public folder. Or to set up one or more static paths for serving up assets link javaScript files, images, and css files when working with a rendering engine.

```js
let express = require('express'),
app = express();
app.use('/', express.static('public'));
app.listen(8080);
```

This is just a basic example that should work at serving up a public folder in the same folder as the script. I will not get into express static in detail here, as this post is more of an overview of everything to be aware of in just the top level function.

However you can read more on [express.static here](/2018/05/24/express-static/) if interested.

## Routers

If you are not aware of routers yet now might be a good idea to give them a try. They are a great way of helping to break your project down into smaller components that can then be used in the main app.js file with app.use.

Be sure to read more about them in [my post on express.Router](/2018/05/22/express-routers/)

## Conclusion

I hope this post has given you a good overview of the express.js top level function. If interested in other express.js related content, you should check out the [main express.js mega post](/2018/06/12/express/) that acts as a central index of all express.js content on this site. It is kind of like this post, only it is the main index of sorts.

The main thing to keep in mide here is that the function that is returned can just be called to create an instance of an express app object, but there are also some additional useful methods attached to it as well. This is because in javaScript a function is also an object, and it is possible to define some additional methods for the function, just like one would with an object. The express.js top level function is a great example of this, and it often comes in handy when writing javaScript.
---
title: Express example of serve index middleware
date: 2021-03-22 13:54:00
tags: [express,node.js]
layout: post
categories: express
id: 828
updated: 2021-09-08 13:46:28
version: 1.13
---

When working out a nodejs project it would be nice to have a way to just quickly create something that will just serve an index of a public html folder and that is it. I could take the time to work out my own solution when it comes to that, but even simple things like this can often prove to be a little time consuming. If I am willing to make [expressjs](https://expressjs.com/) part of the stack, and often that is one npm package that I do not mind using, then there is a middleware for express called [serve index](https://www.npmjs.com/package/serve-index) that can make quick work of this kind of task.

The serve index middleware can be combined with the built in [express static function](https://expressjs.com/en/starter/static-files.html) as a way to serve an index for a path, while serving up files when a full path with file name is given. So then bu just using express and one additional package I can quickly have a system that will work well as a way to serve up and index of files for a path of files some of which might be html files. In addition when a user clicks an html file all the assets will load thanks to the built in express static function.

So then in this post I will be going over a quick simple [expressjs example](/2019/04/30/express-example) that will involve using nodejs, express, and serve-index to create a simple static server that will host a public folder.

<!-- more -->

## 1 - A Basic serve-index express example

In this section I will be going over a quick, simple, example of serve index that I put together in a flash. When I made this I was using nodejs 10.24, with express 4.17.1, and serve-index 1.9.1. If for some reason the code example here breaks, be sure to check the version numbers of the various assets that you are using. I will be going over the process of setting this up from the ground up, but I also have the [source at my test express repo](https://github.com/dustinpfister/test_express/tree/master/demos/express-example-serve-index)

### 1.1 - Setting up the project folder

To set up a project folder I just create a main project folder and then make that the current working dir. Inside the main project folder I then do the usual npm init to create a new npm folder with a package.json file. Once that is done I then make express and serve-index the two dependences of the project and that is all. After I have the node modules installed for this there is then just creating a public folder, and then a nested folder for javaScript files.

```
$ mkdir serve-index-example
$ cd serve-index-example
$ npm init
$ npm install express
$ npm intsall serve-index
$ mkdir public
$ cd public
$ mkdir js
```

### 1.2 - The public folder

Now for the content of the public folder, for this example I am thinking about just having html an html file and just want javaScript file just to test out what I have in mind and make sure that it works as expected. When I go to the root path, or any path for that matter, of the project in my web browser when the server is up and running I would like to see a list of files at that path. Even in the event that there is an index.html file I would like for that to be listed rather then that be what is served up as html rather than a raw text mime type. However if I click on the index.html file I would like for that to be what is serve up to me, and for any javaScript files that I have in the public folder work when I use them in that html.

In the public folder I just have a single index.html file that looks like this.

```html
<html>
  <head>
    <title>Foo html file</title>
  </head>
  <body>
    <h1>Foo Page</h1>
    <script src="/js/foo.js"></script>
  </body>
</html>
```

I am then also using a single javaScript file in the js folder also that looks like this.

```js
var container = document.body;
 
var foo = document.createElement('p');
 
foo.innerText = 'javaScript works';
 
container.appendChild(foo);
```

### 1.3 - The main static.js file

Now for the main event javaScript file that I called static.js that I placed at the main root folder of the project folder. This is the file that I will be starting with node to start the server. Here I of course require in express and create an app instance of express just like that of any other express project. I also of course require in the serve index middleware also, and I am using the nodejs built in path module to create an absolute path to the public folder.

First I use serve index for the root path of the site, and any additional paths. For any url then that is a path to a folder the serve index middleware should work for that. In the event that the path is to a file then the flow should continue to the next middleware function and for this I am using the express built in static function to serve the file. After that I just listen on the port that I want that can be set by environment variable, arguments, or a hard coded default of 8080.

```js
// just a way to serve the html folder
let express = require('express'),
serveIndex = require('serve-index'),
path = require('path'),
app = express(),
PORT = process.env.PORT || process.argv[2] || 8080,
PUBLIC_HTML = path.resolve(__dirname, 'public');
 
// use serve index to nav public folder
app.use('/', serveIndex( path.resolve(PUBLIC_HTML) ));
 
// use express static to serve public folder assets
app.use('/', express.static( path.join(PUBLIC_HTML) ));
 
// listen on PORT
app.listen(PORT, function () {
    console.log('static server up');
    console.log('serving PUBLIC HTML folder at: ' + PUBLIC_HTML);
    console.log('on port: ' + PORT);
});
```

Now that I have everything in place I can start the ever on a given port of say 8000 like this.

```
$ node static 8000
```

Assuming that there is no environment variable the server should start on port 8000, and then I can navigate to it in my browser by going to localhost:8000 for the address. When I do so I get an index for the javaScript folder, and the index.html file, I can then click the index.html file to go to that page, and when I do my javaScript file works just fine. I can then go back to the root path then click on the javaScript folder and then the javaScript file that then serves up the source code of the javaScript file.

So then this basic example of serve-index seems to work as expected, I have to say that this is a nice little solution for this sort of thing and I like to use it in some of my repositories that have to do with collections of examples for frameworks and so forth.

## 3 - Conclusion

Well that is it for now when it comes to the serve index middleware at least for now. There might be a few more things to write about when it comes to other use case examples for this though. What I wanted is to have a way to just always list files for any path, however I might want to have another system worked out for when there is an index.html file in a path. For now it is fine that an index.html file is just listed along with everything else, but there might be situations in which I would like to have the index.html file be what is used for paths where there is such a file, and only use serve index for paths where there is no such file.



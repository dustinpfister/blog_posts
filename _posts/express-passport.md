---
title: Using passport for authentication in express.js apps
date: 2018-05-31 20:00:00
tags: [js,express,node.js]
layout: post
categories: express
id: 199
updated: 2018-06-04 13:40:39
version: 1.5
---

When making a full stack node.js powered application using [express.js](https://expressjs.com/), there will often be a need to set up a way to handle user authentication (aka login in). This process can be a little involved, but there are ways to help make it go a lot faster by using common libraries, and tools to make this process far less painful compared to attempting to do it from scratch. There is a project called [passport](https://www.npmjs.com/package/passport) that can help make authentication a whole word easier.

<!-- more -->

## Basic example

For a Basic example I will be writing about a quick demo that just focus on a very basic use case that does not even involve a client database of any kind, just a single hard coded object.

I will also be using the passport-local strategy, this is a strategy that involves visitors using a username and password with the project itself rather than using a third party like face book to authenticate.

So I stared my passport demo by making a new project folder, making it the current working directory, then do an npm init like always with a node.js project. I then installed express, as well as ejs for rendering views. I then also installed express-session, passport, and the strategy I will be using in this demo called passport-local.

```
$ mkdir passport-demo
$ cd passport-demo
$ npm init
$ npm install express@4.16.3 --save
$ npm install ejs@2.6.1 --save
$ npm install express-session@1.15.6 --save
$ npm install passport@0.4.0 --save
$ npm install passport-local@1.0.0 --save
```

## The /views folder

Because I am using ejs I have a views folder that will house my ejs template files. If you prefer to go with a static solution you might want to look into [express.static](/2018/05/24/express-static/), I also have another post on using [ejs with express](/2018/05/25/express-rendering-with-ejs/), as well as another older post on ejs in which I am [using ejs by iteslf](/2017/12/07/nodejs-ejs-javascript-templates/) without express. So I will not be getting into ejs in detail here, lets keep it with passport.

### /views/index.ejs

The main index.ejs file is what will always be used when rendering a page, and I will always provide an object that will give the current layout to use with that index.

```
<h1>Passport local demo</h1>
 
<div>
    <%- include('./layouts/' + layout) %>
</div>
```

So this index.ejs file will just render "Passport local demo", and then the current layout but in a more advanced project I could also include standard navigation, and footer markup, with of course the usual additional stuff that will make it valid html.

### The /views/layouts folder

This nested folder in the views folder will house the layout options. For the sake of keeping this demo as simple as possible I will just have two layouts, one for the login path, and another for root.

#### /views/layouts/login.ejs

This will give the login form element that will be used to make the post request at the login path.

```
<form action="/login" method="post">
    <div>
    <label>Username:</label>
    <input type="text" name="user"/><br/>
    </div>
    <div>
    <label>Password:</label>
    <input type="password" name="pass"/>
    </div>
    <div>
    <input type="submit" value="Submit"/>
    </div>
</form>
```

### /views/layouts/home.ejs

Here I have another layout file for the root, or home page at path '\/'. Here if user is undefined then a message will show up asking the visitor to log in. If user is defined then the user is loged in, and the name of the user will be displayed.

```
<p>This is home</p>
 
<% if (!user) { %>
    <p>Welcome Home! Please <a href="/login">log in</a>.</p>
<% } else { %>
    <p>Hello <%= user.username %>, welcome home! <a href="/logout">logout</a></p>
<% } %>
```
## The /app.js file

Once everything is installed, and I have my view in place I can get started on the main app.js file of this demo. 


So my app .js file looks like this:

```js
// yes this is an express.js app
let express = require('express'),
 
// I will be using passport, and the local strategy
passport = require('passport'),
Strategy = require('passport-local').Strategy,
 
// my not so secret secret
secret = 'eeeek',
 
// the single user record that is hard
// coded in for the sake of this simple demo
user = {
    username: 'foo',
    id: 0,
    password: '123'
},
 
// will use the PORT environment variable if present,
// else use first argument from command line for PORT,
// else default to a hard coded value of 8080
port = process.env.PORT || process.argv[2] || 8080,
app = express();
 
// using ejs for rendering
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
 
// using body parser to parse the body of incoming post requests
app.use(require('body-parser').urlencoded({
    extended: true // must give a value for extended
}));
 
// using express-session for session cookies
app.use(
 
    require('express-session')(
 
        {
            name: 'site_cookie',
            secret: secret,
            resave: false,
            saveUninitialized: false,
            cookie: {
 
                // make session cookies only last 15 seconds
                // for the sake of this demo
                maxAge: 15000
 
            }
        }
 
    )
 
);
 
// using the local strategy with passport
passport.use(
 
    // calling the constructor given by passport-local
    new Strategy(
 
        // options for passport local
        {
 
            // using custom field names
            usernameField: 'user',
            passwordField: 'pass'
 
        },
 
        // login method
        function (username, password, cb) {
 
            if (username === user.username && password.toString() === user.password) {
 
                return cb(null, user);
 
            }
 
            // null and false for all other cases
            return cb(null, false);
 
        }
 
    )
 
);
 
passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});
 
passport.deserializeUser(function (id, cb) {
 
    cb(null, user);
 
});
 
app.use(passport.initialize());
app.use(passport.session());
 
app.get('/', function (req, res) {
 
    res.render('index', {
        layout: 'home',
        user: req.user
    });
 
});
 
app.get('/login',
 
    function (req, res) {
    res.render('index', {
        layout: 'login',
        user: req.user
    });
});
 
app.post('/login',
    passport.authenticate('local', {
        // redirect back to /login
        // if login fails
        failureRedirect: '/login'
    }),
 
    // end up at / if login works
    function (req, res) {
        res.redirect('/');
    }
);
 
app.get('/logout',
    function (req, res) {
    req.logout();
    res.redirect('/');
});
 
app.listen(port, function () {
 
    console.log('passport-local demo up on port: ' + port);
 
});
```

### Passport local Strategy

A strategy must be used with passport for authentication, in this example I am using [passport-local](https://www.npmjs.com/package/passport-local) which is a strategy involving a user name and password that is local with the application itself rather than depending on something like facebook. However many strategies exist for passport that can also be used to authenticate, making passport a great choice with this aspect of development.

### Body parser

I am using the built in express body parser to parse an incoming post request via bodyParser.urlencoded. Tne body parser module is an important component in full stack development using node.js, and express.js in the stack. It is a way to parse the body of incoming post requests into something that can then be accessed from the request object. 

```js
app.use(require('body-parser').urlencoded({
    extended: true // must give a value for extended
}));
```

For more information and examples of body parser you might want to check out my [post on body parser](/2018/05/27/express-body-parser/) if interested.

### using express-session for session cookies

So express-session is another important module that is often used in express.js powered projects. It is a way to quickly get up and running with sessions cookies, and session data. In this simple demo the session data is stored in memory, but it a more serious project I would want to use an additional storage system for express-session.

```js
app.use(
 
    require('express-session')(
 
        {
            name: 'site_cookie',
            secret: secret,
            resave: false,
            saveUninitialized: false,
            cookie: {
 
                // make session cookies only last 15 seconds
                // for the sake of this demo
                maxAge: 15000
 
            }
        }
 
    )
 
);
```

I made the maxAge of the session cookies only 15 seconds for the sake of just making new users of passport aware that the max age of a cookie is something important to be aware of.

I will not get into every detail about express-session here, but I will say that there is a great deal more to know about it then what is presented here. For more detail on this you might consider reading [my post on express-session](/2018/06/01/express-session/).

## Conclusion

This is my two hundredth blog post here at my [github pages site](https://dustinpfister.github.io), thought I would just throw that in at the end here.

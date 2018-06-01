---
title: Using express-session for session data, and primitive authentication in express.js
date: 2018-06-01 10:00:00
tags: [js,express,node.js]
layout: post
categories: express
id: 200
updated: 2018-06-01 11:03:05
version: 1.1
---

As of late I have been writing some content on [express.js](https://expressjs.com/), and as such it was only a matter of time until I came to a point where it is time to look into how to handle session data, and user authentication. If I want to implement user authentication in a way that I perceive as the right way, I will want to use [passport](/2018/05/31/express-passport/). However so far I often find myself making simple hobby apps, as such I can take a more informal route to handling authentication involving some system that is just assignment of a unique id to each client by way of a cookie file for example. In any case this post is about [express-session](https://www.npmjs.com/package/express-session), a great project for working with session data in an express.js project

<!-- more -->

## Authentication With express-session only?

With authentication in express.js it may be best to go with [passport](/2018/05/31/express-passport/), this is defiantly a professional and versatile way of making quick work of setting up some kind of system that involves user registration and authentication (aka logging in). However if you are just making some simple little hobby app there might be a desire to have some kind of primitive yet effective way of doing this.

Express session involves the use of cookies, and it is possible to have the cookies not expire resulting in a persistent way of setting a unique id to each visitor to the app. The id set in the cookie could be used as a replacement for a user login, and password. Yes there are many draw backs to this, but I see simple games, and projects using this kind of system, and it works for what it is worth.

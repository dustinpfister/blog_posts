---
title: Express Type
date: 2019-04-24 13:53:00
tags: [express,node.js]
layout: post
categories: express
id: 424
updated: 2019-04-24 13:58:09
version: 1.0
---

The [express type](https://expressjs.com/en/api.html#res.type) response object method can be used to quickly set the Content-Type response header to a desired [mime type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types), and in most cases it will work fine, but it might still be better to use the res.set method as a way to set Content-Type to make sure that the correct mime type is set for the content that is being sent to the browser. Never the less this will be a quick post on the express type convenience method as well as some related topics with Content-Type and response headers.

<!-- more -->

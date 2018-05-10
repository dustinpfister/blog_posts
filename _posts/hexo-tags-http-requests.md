---
title: Making a Hexo.io tag that gets JSON data with an httprequest
date: 2017-05-19 15:14:57
tags: [js,node.js,JSON,blog,hexo]
layout: post
categories: hexo
id: 22
updated: 2017-09-30 18:37:20
version: 1.4
---

I have [written a post](/2017/02/13/hexo-readfile/) on [hexo.io](https://hexo.io/) that outlines how to go about making a hexo tag that gets data from an async file read. Sometimes I might want to write a tag that gets data that is to be used to generate content in a page by way of an async http request.

<!-- more -->

## Is it a good Idea

I am on the fence with this. As of late I like the idea of having separate scripts that can be used to update the actual text of my markdown files, rather than writing a hexo tag. Still I have not yet found, or developed a decent software solution for maintaining a large collection of markdown files. For now it would seem that this approach works okay.

So in the scripts folder of my hexo project working tree I have a *.js file called "my-tags.js" which is where I register all the hexo tags for use in my blog posts. In there I have this code that is relevant to this process.

```js
var http = require('https'),
fs = require('fs'),
 
httpRequest = function (params, postData) {
    return new Promise(function (resolve, reject) {
        var req = http.request(params, function (res) {
                // reject on bad status
                if (res.statusCode < 200 || res.statusCode >= 300) {
                    return reject(new Error('statusCode=' + res.statusCode));
                }
                // cumulate data
                var body = [];
                res.on('data', function (chunk) {
                    body.push(chunk);
                });
                // resolve on end
                res.on('end', function () {
                    try {
                        body = JSON.parse(Buffer.concat(body).toString());
                    } catch (e) {
                        reject(e);
                    }
                    resolve(body);
                });
            });
        // reject on request error
        req.on('error', function (err) {
            // This is not a "Second reject", just a different sort of failure
            reject(err);
        });
        if (postData) {
            req.write(postData);
        }
        // IMPORTANT
        req.end();
    });
},
 
// log method for this file
log = function (mess) {
 
    console.log('**********');
    if (typeof mess != 'string') {
 
        console.log('my-tags: non-string: ');
        console.log(mess);
 
    } else {
        console.log('my-tags : ' + mess);
 
    }
    console.log('**********');
 
};
 
// async call to fixer
hexo.extend.tag.register('mytags_fixer', function (args) {
 
    log('making a request...');
 
    return httpRequest({
        host : 'api.fixer.io',
        method : 'GET',
        path : '/latest'
    }).then(function (data) {
 
        log('request is good.');
 
        // just assume the data is good and go for it, because I feel lucky.
 
        var html = '<p>date of rates: ' + data.date + '<\/p>',
        rate;
 
        for (rate in data.rates) {
 
            html += '<p>' + rate + ' : ' + data.rates[rate] + '<\/p>';
 
        }
 
        return html;
 
    }).catch (function (err) {
 
        log('bad request.');
        log(err);
 
        return '<p> Error getting data :( <\/p>';
 
    });
 
}, {
    async : true
});
```

So I am just registering a [hexo tag](/2017/02/04/hexo-tags/), the only difference is that it is going to have to be an async tag because of the latency with making the request.

## The result of the tag use

{% mytags_fixer %}

## conclusion

Be sure to check out my other posts on [hexo](/categories/hexo/)
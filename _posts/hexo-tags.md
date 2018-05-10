---
title: Hexo tags
date: 2017-02-04 18:40:00
tags: [js,hexo,blog]
layout: post
categories: hexo
id: 0
updated: 2017-09-30 18:37:21
version: 1.2
---

{% mytags_postwords js,javaScript,hexo,tags,first,post,github&#34;pages %}

This is my first post for my github pages site blog. Now that I got that out of the way I thought I would start out by writing about [hexo.io](https://hexo.io). Hexo is a [node.js](https://nodejs.org) powered static site generator that can take markdown files and generate a collection of html files with a given theme. It is a very useful tool that can automate a great deal of work that would otherwise be hand coded.


Speaking of hexo I thought I would make my first post about one of the static site generators features called [tags](https://hexo.io/api/tag.html). Hexo tags are a way that I can quickly append generated html content in my blog posts.

<!-- more -->


For example embedding a youtube video into one of my posts is as simple as typing this is my markdown.

```
{% youtube duVq7cXWcYw %}
```

When I generate my site the above is parsed into the following HTML.

```html
<div class="video-container"><iframe src="//www.youtube.com/embed/duVq7cXWcYw" frameborder="0" allowfullscreen></iframe></div>
```

So say I want to embed one of my favortie [cyriak](https://www.youtube.com/channel/UC9Ntx-EF3LzKY1nQ5rTUP2g) videos into a blog post. Doing so is as simple as finding the id of the video I want to post, and then use that id as the single argument given to the tag.

{% youtube duVq7cXWcYw %}

# Writing my own tag.

Say I want to write my own hexo tag, rather then using a built in one. To do so I need to save a js file in my root scripts folder in my hexo project working tree. Maybe call it something like my-tags.js, hexo does not care what the name of the file is that much as long as it is a *.js file. Inside the js file is where I will write my tag.

So for an example why don't I throw together a simple little tag that will inject a random quote from the Simpson's. Well maybe that will be what happens if I don't give an argument actually.

So then I would write something like this in the my-tags.js file:

```js
// write a random message on building
hexo.extend.tag.register('mytags_say', function (args) {
 
    // use the given say type or defaul to simpsons
    var sayType = args[0] || 'simpsons',
 
    data = {
 
        simpsons : {
 
            defaultName : 'The Simpsons',
 
            says : [
 
                ['I’d rather let a thousand guilty men go free than chase after them.', 'Chief Wiggum'],
                ['It’s all over, people! We don’t have a prayer!', 'Reverend Lovejoy'],
                ['Inflammable means flammable? What a country.', 'Dr. Nick Riviera'],
                ['My eyes! The goggles do nothing!', 'Rainer Wolfcastle'],
                ['Oh, loneliness and cheeseburgers are a dangerous mix.', 'Comic Book Guy']
 
            ]
        },
 
        watts : {
 
            defaultName : 'Allen Watts',
 
            says : [
 
                'No valid plans for the future can be made by those who have no capacity for living now. ',
                'You do not play a sonata in order to reach the final chord, and if the meanings of things were simply in ends, composers would write nothing but finales.',
                'Human desire tends to be insatiable.'
            ]
        }
 
    },
 
    len = data[sayType].says.length,
 
    index = Math.floor(Math.random() * len),
 
    text = data[sayType].says[index];
 
    if (typeof text === 'object') {
 
        text = '\"' + text[0] + '\" -' + text[1];
 
    } else {
 
        text = '\"' + text + '\" -' + data[sayType].defaultName;
 
    }
 
    return '<span style="font-weight: bold;">' + text + '</span>';
 
});
```

So then if I put this in my markdown:

```
{% mytags_say %}
```

I get a Simpson's quote:

{% mytags_say %}

I can later on expand this so that I can set a certain style of quote that is maybe a little more meninful by giving it a argument so that:

```
{% mytags_say watts %}
```

gives me an Allen Watts quote:

{% mytags_say watts %}

# Async Tags

Sometimes I might want to grab some data from a server to use in a tag.

Say for whatever the reason I might want to write yesterdays winning Pick 10 numbers from [data.ny.gov](https://data.ny.gov). A poor example I know, but every now and then I might want to grab something from somewhere and use that data in a blog post in some way. 

So to do any kind of Async thing with a hexo tag I will need to use a promise. As such I will want to promisify an http request. To help with that without useing bluebird.js I found [this](http://stackoverflow.com/questions/38533580/nodejs-how-to-promisify-http-request-reject-got-called-two-times) on stackoverflow.

Once I have my httpRequest promise method to make the call to a server I put together this.

```js
// async call to data.ny.gov for pic 10 numbers.
hexo.extend.tag.register('mytags_pickten', function (args) {
 
    log('making a request...');
 
    var daysBack = args[0] || 1,
    now = new Date(new Date().getTime() - 86400000 * daysBack);
 
    return httpRequest({
 
        host : 'data.ny.gov',
        port : 80,
        method : 'GET',
        path : '/resource/bycu-cw7c.json?draw_date=' +
        now.getFullYear() + '-' +
        ('0' + now.getMonth()).slice(-2) + '-' +
        (('0' + now.getDate()).slice(-2)) + 'T00:00:00'
 
    }).then(function (content) {
 
        log('request is good.')
 
        return '<p>The winning NY Pic 10 numbers form ' + daysBack + ' days back from ' + now + ' is: <\/p>' +
        '<p> ' + content[0].winning_numbers + ' ( Draw Date: ' + content[0].draw_date + ' )<\/p>';
 
    }).catch (function (err) {
 
        log('bad request.');
        log(err);
 
        return '<p>Error getting the Data<\/p>';
 
    });
 
}, {
    async : true
});
```

That Will give what I want in this case if all goes well.

{% mytags_pickten %}

# Progressive Enhancement

I am the kind of guy that disables JavaScript, or uses a browser plug in to help manage scripts. I know the owners of sites need to make money, but there are a lot of good reasons why I do it. As such in some cases it might be wise to view the content that is injected during generation of blog post files as a kind of static fall back in case up to date data can not be obtained from a server via an client side request. That way even if someone comes to my site with JavaScript disabled they will still get some kind content. it might be outdated, but at least it is not nothing.

# Future considerations

Tags a very helpful for generating and injecting content into a post. Whats also great about it is that the final content is plain old static html. However if it is a situation in which it is part of the theme that needs to be augmented, helpers will be a wiser choice. In any case I will likely be writing more hexo tags in the future now and then, so this blog post will come in handy. I will update it as needed, as I do with many of my posts so far.

Be sure to check out my other posts on [hexo](/categories/hexo/)

---
title: Reading files in Hexo
date: 2017-02-13 13:00:00
tags: [js,hexo]
layout: post
categories: hexo
id: 2
updated: 2017-09-30 18:37:19
version: 1.1
---

{% mytags_postwords js,javaScript,hexo,read,files,node.js %}

So now and then I might want to read a file in my hexo working tree that contains data that is needed when generating pages. For example I may have a file in my root name space that contains API access keys that are hidden from git with a .gitignore file. I might be using some API that requires an access key to get data that I used in the build process, so I will want to read that file, and fail gracefully if for some reason it's not there.

<!-- more -->

# The Promise.

I will want to use a promise, as this is often what is used within hexo, and it is what is needed to do any kind of async thing such as reading a file or making a request.

```js
// the first promise I wrote myself
readFile = function (path, filename) {
 
    return new Promise(function (resolve, reject) {
 
        fs.readFile(path + filename, 'utf8', function (err, data) {
 
            if (err) {
 
                reject('Error reading file: ' + err);
 
            }
 
            resolve(data);
 
        });
 
    });
 
};
```

# A simple read file tag

So I might want a tag that I can use to inject data from anywhere in my root namespace into a blogpost.

```js
// read a file from the base dir forward.
hexo.extend.tag.register('mytags_readfile', function (args) {
 
    var filename = args[0];
 
    log('reading file : ' + filename);
 
    return readFile(hexo.base_dir, filename).then(function (content) {
 
        log('file read good.');
 
        return '<pre><code>' + content + '</code></pre>';
    }).catch (function (err) {
 
        log('error reading file');
 
        return '<pre>Error reading file ' + filename + '</pre>';
 
    });
 
}, {
    async : true
});
```

Here for example I will use it to inject the package.json file from my hexo project.

```
{% mytags_readfile package.json %}
```

{% mytags_readfile package.json %}

# Geting an access key, or token from my apikeys.json file.

With some api's I must have an access token, or api key of some kind. I would not want to hard code an access key into my source code, and push it to a public reposatory. So I would want to read data from a hidden file to get a key, then use that key to make a request to the api.

To get started with this first I will want a method to get the key from my hidden apikeys.json file. It will make use of the readFile method I just put togeather.

```js
// get an access key, or token from apikeys.json.
getKey = function (apiName) {
 
    apiName = apiName || 'github';
 
    return new Promise(function (resolve, reject) {
 
        readFile(hexo.base_dir, 'apikeys.json').then(function (content) {
 
            resolve(JSON.parse(content)[apiName]);
 
        }).catch (function () {
 
            log('error getting api key for : ' + apiName);
 
            reject('');
        });
 
    });
 
};
```

# The Github tag

This will make a request with a key that I obtained from apikeys.json thanks to my getKey, readFile, and an httpRequest method I found earlier. All of which is in [my-tags.js](https://raw.githubusercontent.com/dustinpfister/hexo_sitesource/master/scripts/my-tags.js) in my hexo scripts folder.

```js
var formatRepos = function (content) {
 
    html = '<pre> Here are my repos at github.<br><br>';
 
    content.forEach(function (repo) {
 
        html += '<a href=\"' + repo.html_url + '\">' + repo.name + '</a><br>';
        html += repo.description + '<br><br>';
 
    });
 
    return html + '</pre>';
 
};
 
// read a file from the base dir forward.
hexo.extend.tag.register('mytags_github', function (args) {
 
    return new Promise(function (resolve, reject) {
 
        getKey('github').then(function (key) {
 
            resolve(key);
 
        }).catch (function () {
 
            reject('');
 
        });
 
    }).then(function (key) {
 
        return httpRequest({
 
            host : 'api.github.com',
            method : 'GET',
            path : '/users/dustinpfister/repos?access_token=' + key,
            headers : {
                'user-agent' : 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)'
            }
 
        }).then(function (content) {
 
            log('request is good.');
 
            return formatRepos(content);
 
        }).catch (function (err) {
 
            log('bad request.');
            log(err);
 
            return '<pre>Error getting the data from github <\/pre>';
 
        });
 
    }).catch (function () {
 
        return '<pre>error with the github</pre>';
 
    });
 
}, {
    async : true
});
```

Here it is in action............

{% mytags_github %}

## conclusion

Be sure to check out my other posts on [hexo](/categories/hexo/)
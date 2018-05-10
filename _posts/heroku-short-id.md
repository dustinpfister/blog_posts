---
title: Making a Heroku with a basic user ID system using shortid
date: 2018-01-27 17:31:00
tags: [heroku, node.js]
layout: post
categories: heroku
id: 137
updated: 2018-01-27 18:03:38
version: 1.0
---

When making some kind of full stack node.js application I will want to have some kind of way to make it so I can have at least something that can work as user accounts. Maybe it would be best to have some kind of system that authenticates by way of doing something with oAuth, but maybe not, maybe I just want some kind of basic user id system, I see some projects that do that.

<!-- more -->

The reason why I just got into doing this is because I have just started making full stack apps that I can host on heroku.

Well I have found a great node.js solution that can be used to generate user ids called [shortid](https://www.npmjs.com/package/shortid).

## Basic short id example

For a basic example of using shortId I just put together something that just responds to a request with a new id each time.

```js
// using the http module
let http = require('http'),
 
shortId = require('shortid'),
 
// look for PORT environment variable,
// else look for CLI argument,
// else use hard coded value for port 8080
port = process.env.PORT || process.argv[2] || 8080,
 
// create a simple server
let server = http.createServer(function (req, res) {
 
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
 
        res.write('id: ' + shortId.generate(), 'utf-8');
 
        res.end();
 
    });
 
// listen on the port
server.listen(port, function () {
 
    console.log('app up on port: ' + port);
 
});
```

## My user system so far

So My actual user account system is a little more advanced.

* A client system is delivered to the client.
* The client system makes a post request to the back end with a user id if stored in local storage
* If the client system does not have a user id is sends a post request with a user id of undefined
* If the back end gets a user id it checks if it has a \*.json file that corresponds to that id.
* If the back end has a *.json file for that id it will update, and respond with that record.
* If it does not have a record that corresponds to the given id, or it is given undefined it will generated and return a new record, and id.


So for now I have this all in one index.js file.

```js
// using the http module
let http = require('http'),
fs = require('fs-extra'),
path = require('path'),
shortId = require('shortid'),
 
// hard coded conf object
conf = {
 
    // look for PORT environment variable,
    // else look for CLI argument,
    // else use hard coded value for port 8080
    port: process.env.PORT || process.argv[2] || 8080,
 
    // max body length for posts
    maxBodyLength: 100
 
},
 
// basic request check
checkReq = function (req) {
 
    return new Promise(function (resolve, reject) {
 
        if (req.method != 'POST') {
 
            reject('not a post request');
 
        }
 
        resolve({
 
            success: true,
            mess: 'request has passed request check'
 
        })
 
    });
 
},
 
// parse body of request
parseReq = function (req) {
 
    return new Promise(function (resolve, reject) {
 
        // the array of buffer chunks
        let body = [];
 
        // as chunks start coming in
        req.on('data', function (chunk) {
 
            // push the next chunk
            body.push(chunk);
 
            // kill the connection if someone is posting a large
            // amount of data for whatever reason
            if (body.length > conf.maxBodyLength) {
 
                req.connection.destroy();
 
                reject('Please do not do that, thank you. ( body length limit: ' +
                    conf.maxBodyLength + ')');
 
            }
 
        });
 
        // when the post is received
        req.on('end', function () {
 
            body = Buffer.concat(body).toString();
 
            try {
 
                body = JSON.parse(body);
 
                resolve({
 
                    mess: 'body parsed',
                    success: true,
                    body: body
 
                });
 
            } catch (e) {
 
                reject('could not parse body.');
 
            }
 
        });
 
    });
 
},
 
// write user to it's file
writeToUser = function (user) {
 
    return new Promise(function (resolve, reject) {
 
        let dir = path.join('./users', 'user_' + user.id + '.json');
 
        fs.writeFile(dir, JSON.stringify(user), 'utf-8').then(function () {
 
            resolve(user);
 
        }).catch (function (e) {
 
            reject(e.message);
 
        });
 
    });
 
},
 
// update users data
updateUser = function (user) {
 
    return new Promise(function (resolve, reject) {
 
        let dir = path.join('./users', 'user_' + user.id + '.json');
 
        fs.readFile(dir, 'utf-8').then(function (user) {
 
            user = JSON.parse(user);
 
            user.visit.count += 1;
            user.visit.last = new Date();
 
            return writeToUser(user);
 
        }).then(function (user) {
 
            resolve(user);
 
        }).catch (function (mess) {
 
            reject(mess);
 
        });
 
    });
},
 
// check for the given id
idCheck = function (id) {
 
    return new Promise(function (resolve, reject) {
 
        fs.ensureDir('./users').then(function () {
 
            let dir = path.join('./users', 'user_' + id + '.json');
 
            fs.readFile(dir, 'utf-8').then(function (user) {
 
                resolve(JSON.parse(user));
 
            }).catch (function (e) {
 
                reject(e.message);
 
            });
 
        }).catch (function (e) {
 
            reject(e.message);
 
        });
 
    });
 
},
 
// check for the given id
idNew = function () {
 
    return new Promise(function (resolve, reject) {
 
        return fs.ensureDir('./users').then(function () {
 
            let id = shortId.generate(),
            now = new Date(),
            user = {
 
                id: id,
                visit: {
 
                    count: 1,
                    first: now,
                    last: now
 
                }
 
            },
            dir = path.join('./users', 'user_' + id + '.json');
 
            return fs.writeFile(dir, JSON.stringify(user), 'utf-8').then(function () {
 
                resolve(user);
 
            }).catch (function (e) {
 
                reject(e.message);
 
            });
 
        }).catch (function (e) {
 
            reject(e.message);
 
        });
 
    });
},
 
// check Body
checkBody = function (body) {
 
    return new Promise(function (resolve, reject) {
 
        if (body.action) {
 
            // if log set action
            if (body.action === 'log-set') {
 
                if (body.id) {
 
                    // check for that id
                    idCheck(body.id).then(function (user) {
 
                        return updateUser(user);
 
                    }).then(function (user) {
 
                        resolve({
 
                            success: true,
                            mess: 'log-set action.',
                            id: user.id,
                            user: user
 
                        });
 
                    }).catch (function (e) {
 
                        // new user
                        idNew().then(function (user) {
 
                            resolve({
 
                                success: true,
                                mess: 'log-set action.',
                                id: user.id,
                                user: user
 
                            });
 
                        }).catch (function (mess) {
 
                            reject(mess);
 
                        });
 
                    });
 
                } else {
 
                    // new user
                    idNew().then(function (user) {
 
                        resolve({
 
                            success: true,
                            mess: 'log-set action.',
                            id: user.id,
                            user: user
 
                        });
 
                    }).catch (function (mess) {
 
                        reject(mess);
 
                    });
 
                }
 
            } else {
 
                reject('unkown action.')
 
            }
 
        } else {
 
            reject('no action given')
 
        }
 
    });
 
},
 
// create a simple server
server = http.createServer(function (req, res) {
 
        if (req.method === 'POST') {
 
            checkReq(req).then(function () {
 
                return parseReq(req);
 
            }).then(function (result) {
 
                return checkBody(result.body);
 
            }).then(function (result) {
 
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
 
                res.write(JSON.stringify(result), 'utf-8');
                res.end();
 
            }).catch (function (mess) {
 
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end(JSON.stringify({
                        success: false,
                        mess: mess,
                        id: '',
                        user: ''
                    }));
 
            });
 
        } else {
 
            if (req.method === 'GET' && req.url === '/') {
 
                fs.readFile('./public/index.html', 'utf-8').then(function (html) {
 
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    res.write(html, 'utf-8');
                    res.end();
 
                }).catch (function (e) {
 
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    });
                    res.end(JSON.stringify({
                            success: false,
                            mess: e.message,
                            id: '',
                            user: ''
                        }));
 
                });
 
            } else {
 
                res.end();
 
            }
 
        }
 
    });
 
// listen on the port
server.listen(conf.port, function () {
 
    console.log('app up on port: ' + conf.port);
 
});
```

I am also making use of a simple client system in a public folder that just consists of a sinle index.html file that makes a post request to the back end.

```html
<!doctype html>
<html>
    <head>
        <title>heroku short id</title>
    </head>
    <body>
 
        <h1>Heroku short id system</h1>
        <textarea id="out" cols="60" rows="15">
        </textarea>
        <script>
 
var postIt = function (argu) {
 
    var xhr = new XMLHttpRequest();
 
    if(typeof argu != 'object'){
 
        argu = {data : argu};
 
    }
 
    argu.url = argu.url || window.location.href;
    argu.data = argu.data || {};
    argu.beforeSend = argu.beforeSend || function(xhr,next){
       next();
    };
    argu.done = argu.done || function (res) {
        console.log(res);
    };
    argu.fail = argu.fail || function (res) {
        console.log(res);
    };
 
    xhr.open('post', argu.url);
 
    xhr.onreadystatechange = function () {
 
        if (this.readyState === 4) {
 
            if (this.status === 200) {
 
                argu.done(this);
 
            } else {
 
                argu.fail(this);
 
            }
 
        }
 
    };
 
    argu.beforeSend(xhr, function(){
 
        xhr.send(argu.data);
 
    });
 
};
 
// login, or setup if no user_id
var logSet = function(){
 
    postIt({
 
        // try to login with the given id, or undefined from local storage
        data : JSON.stringify({
 
            action : 'log-set',
            id : window.localStorage['user_id']
 
        }),
        done : function(res){
 
            var result = JSON.parse(res.response),
            text = '';
 
            text += 'mess : ' + result.mess + '; \n';
            text += 'success : ' + result.success + '; \n';
            text += 'id : ' + result.id + '; \n';
            text += JSON.stringify(result.user) + '; \n';
            text += '********** \n'
 
            document.getElementById('out').innerText += text;
 
            if(result.id){
 
                window.localStorage['user_id'] = result.id;
 
            }
 
        }
 
    });
 
};
 
logSet();
 
         </script>
 
    </body>
</html>
```

So far the system works as expected, but I have not at all put it threw a meat grinder. One thing that bothers me with it so far is that I will end up with thousands of \*.json files in the users folder, but when I think about it a lot of data will have to be stored some how. In any case I am not attached to the way that the user accounts are stored.

## Conclusion

I might work on this more, because I would like a system like this for when making some kind of full stack application, but it might just end up being yet another one of my little prototypes.
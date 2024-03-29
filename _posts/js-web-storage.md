---
title: Web Storage api in client side javaScript
date: 2019-08-20 19:40:00
tags: [js]
layout: post
categories: js
id: 526
updated: 2021-10-12 13:06:26
version: 1.36
---

There are a number of ways to store data on the client side, but in this post I will be mainly writing about the [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API), rather than index db, cookies files, and many other such options for [client side persistence of data](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage) in a front end javaScript environment.

The Web Storage API is easy to use as everything can just simply be stored as key value pairs of the localSorage global variable on clients that support the Web Storage API. However depending on the nature of the project it might not always be the best choice when storing large amounts of data. The indexed db option is a better choice when it comes to storage of large amounts of data on the clients computer, and cookie files will always give better backward compatibility when it comes to supporting older browsers but with a limited size.

There is also the idea of using the [File reader constructor](/2020/03/24/js-filereader/) to have it so the user can save and load files anywhere on their computers local file system. So in some projects the file reader constructor might be be the best choice for handing the saving and loading of state, or other assets in general actually.

Still the Web Storage API is a good option for quickly getting the job done, and most modern browsers support the standard well, any one had to start somewhere when it comes to researching what the options are.

<!-- more -->

## 1 - Web storage API basics and what to know first

Working with the Web Storage API is as easy as working with a plain old javaScript object more or less which makes it one of he reasons why I tend to like using it. The localStoarge global can then be used just like that of any other javaScript Object, whatever you want to save on the client just define it as a property of the localStorage global. 

However there are also setItem and getItem methods that can be used to do get and set properties of the localStoarge global which should be used to do so. Also when saving a value for a local storage api get I will want to always do so in a string format, so there is knowing a thing or two about how to work with the [JSON methods](/2020/02/28/js-json-parse/). Once a property is set then that value will be there again every page load, site wide, serving the purpose of client side persistence of data on top of other options such as cookie files.

### 1.1 - The source code example in this post are on github

The source code examples for the web storage api that I am writing about in this post can be found in by [test vjs Github repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-web-storage). This post is one of many that is still very much a work in progress, so the latest version of the files as well as some notes that have to do with future plans for editing can be found there.

### 1.2 - web storage basic example

So then here I have a basic example of the Web Storage API that just stores a single message that can be set from the value property of a text type input element. 

I have an [event handler](/2019/01/16/js-event-listeners/) that will fire each time a keyboard key is released, or the value changes. So Each time a key is release, or for any reason the value property of the text input element changes I call the set method of my web storage module to set the value for a key that I have set as mess. Then each time the page loads the value of the text element is set to the value in local storage that is obtained by way of the get method of my web storage module.

```html
<html>
    <head>
        <title>web storage</title>
    </head>
    <body>
        <input id="the-text" type="text" placeholder="foo">
        <script>
var ws = {};
// get an item with local storage
ws.get = function(key){
  var mess = localStorage.getItem(key);
  if(mess){
      return mess;
  }else{
      return '';
  }
};
// set an item with local storage
ws.set = function(key, value){
    localStorage.setItem(key, value);
};

// DEMO
var text = document.getElementById('the-text'),
setMessHandler = function(e){
   ws.set('mess', e.target.value);
};
text.addEventListener('change', setMessHandler);
text.addEventListener('keyup', setMessHandler);
var storeText = ws.get('mess');
if(storeText != ''){
   text.value = storeText;
}
        </script>
    </body>
</html>
```

## 2 - Feature testing for web storage API.

One major thing about the web storage api is that I can not always count on it being there. There is the question of it not even being supported the browser at all of course, however more often than not these days it could be disabled. So then it would make sense to have some code that will check if the local storage api is even there to begin with, and on top of that do a quick test even if it is there to make sure that it is working as expected. This way I can first test out the API, and if it is working proceed with the normal flow of things, else I can try something else, or at least inform the user that they will not be able to save any progress, settings, data or whatever the case may be.

### 2.1 - A Web Storage library

So now for this example I am making a [javaScript module](/2019/03/12/js-javascript-module/) following the [IIFE pattern](/2020/02/04/js-iife/) for client side javaScript modules. I then have a single global variable called ws to which I am attaching a number of public methods, with just one private method thus far that is a test function. This test function will preform a number of things such as checking if the local storage API is even there to begin with, in the event that it is not there the function will of course return false. On top of that if the local storage api is here it will not just assume that it is working as expected, so on top of feature testing for the local storage api it will also try to save and get a string value. If local storage is working as expected this test method will of course return true.

On top of having a pubic test method that calls the internal test method I also of course have a get and set methods that are also public. These methods also call the private test method each time they are used, and when doing so the call on on disabled call back in the event that a test fails. It is then in this on disabled call back that I could do something like altering the user that local storage is not working and that they might want to do something to fix that.

```js
(function (ws) {
 
    // private test function
    var test = function () {
        console.log('web sorage test: ');
        if (!localStorage) {
            console.log('window.localStorage object not found, pass is false');
            return false;
        }
        // save a test object for key ws-test
        localStorage.setItem('ws-test', JSON.stringify({
                value: 'foo'
            }));
        // try to now get what we just saved
        var string = localStorage.getItem('ws-test');
        if (string) {
            // so we have a string parse to an object
            try {
                var result = JSON.parse(string);
            } catch (e) {
                console.log('got a dom string, but there was an error parsing JSON some how.');
                return false;
            }
            // so we have an object, is are test value there?
            var pass = result.value === 'foo';
            console.log('Got an object and value test pass is: ' + pass);
            // in any case remove the item
            localStorage.removeItem('ws-test');
            // return result of pass boolean if all is well it should be true
            return pass;
        }
        console.log('No result object pass is false');
        return false;
    }
 
    // public test function
    ws.test = function (opt) {
        opt = opt || {};
        opt.onDisabled = opt.onDisabled || function () {};
        // feature test for local storage
        if (test()) {
            return true;
        }
        opt.onDisabled.call(opt, opt, 'ws-test');
        return false;
 
    };
 
    // get an item with local storage
    ws.get = function (key, opt) {
        opt = opt || {};
        opt.onDisabled = opt.onDisabled || function () {};
        // feature test for local storage
        if (test()) {
            var mess = localStorage.getItem(key);
            if (mess) {
                return mess;
            } else {
                return '';
            }
        } else {
            opt.onDisabled.call(opt, opt, key);
        }
    };
 
    // set an item with local storage
    ws.set = function (key, value, opt) {
        opt = opt || {};
        opt.onDisabled = opt.onDisabled || function () {};
        if (test()) {
            localStorage.setItem(key, value);
        } else {
            opt.onDisabled.call(opt, opt, key);
        }
    };
 
}
    (this['ws'] = {}));
```

### 2.2 - Simple demo of the test method

I will then want to have at least a few demos if this web api library to make sure things work out as expected. For starters I will want to make sure that the test function is working out the way that it should. So then I made a quick simple demo that tests out the test function.

```html
<html>
    <head>
        <title>web storage</title>
    </head>
    <body>
        <div id="out"></div>
        <script src="web-storage.js"></script>
        <script>
var out = document.getElementById('out');
if(ws.test()){
    out.innerText = 'We are good';
}else{
    out.innerText = 'local storage is not working';
}
        </script>
    </body>
</html>
```

When I run this example by way of the file protocol by just opening up the html file in the browser the web API works. However what is strange is that event when I disable it it still seems to work anyway. I assume that this might have something to do with using the web API by way of the file protocol, or for some reason when I go to disable local storage doing so just seems to not work for whatever reason.

I guess I could see about doing the same when it comes to disabling by way of the http protocol, but I did nit get around to testing that out last time I edited this post at least. However this is something that I would like to look into more at one point or another.

## 3 - Save state system from my cross hairs canvas example

So now that I have covered a basic example of using the web storage API I thought I would write a section on the code that I worked out for the save state system that I am using in one of my [canvas examples](/2020/03/23/canvas-example/). The specif example in question is my [cross hairs game example](/2020/07/29/canvas-example-game-crosshairs/) that I spent a fair about of time working on a while back.

There is more to working out some kind of save state system for a game, or some kind of game framework. As there is not just simply saving a state to local storage and being done with it. Do not get me wrong move often than not that will work fine, except for when it will not work fine. There is not just using local storage then, but giving a player more than one option for saving a state to the local file system of there computer. I will not be getting into every little detail here when it comes to those sorts of things, but this is still some code that is one of my starting points for making this kind of system for a game.

Although this example is not so much on making use of additional ways of saving data client side, it is however an example that touches base on some additional topics that come up when it comes to making a save state system. Mainly the topic of how to go about coming up with some kind of format for the save state data, when you are working on a game that is not done yet, and you do not know what more you might want to add to the save state data.

### 3.1 - Striped down game.js module with save state code

Here is a striped down version of the game module for cross hairs that just contains the code that is used to process a save state string. On top of that there is just a method to create a game object. So then I have an object in my game model that contains hard coded default settings, after that I have an array of save string versions that are what the deal is when it comes to the various formates for a game save.

```js
var gameMod = (function () {
 
    // hard coded settings
    var hardSet = {
        // max seconds for sec value used in updates
        maxSecs: 0.25,
        // deltaNext and levelCap for main game.levelObj
        deltaNext: 5000,
        levelCap: 1000,
        // save string
        saveStringVer: 'v1'
    };
 
    var api = {};
 
    // SAVE STATES
 
    // create a save string from a game object
    var saveStringVersions = {
        v0: ['damage'],
        v1: ['damage', 'mapIndex', 'skillPoints']
    };
    var saveStringParts = {
        damage: {
            encode: function (game) {
                var damage = Math.floor(Number(game.totalDamage));
                return damage.toString(36);
            },
            apply: function (game, partString) {
                var damage = parseInt(partString, 36);
                if (damage > 0) {
                    game.totalDamage = damage;
                    console.log('applying damage: ' + game.totalDamage);
                }
            }
        },
        mapIndex: {
            encode: function (game) {
                return Number(game.mapLevelObj.level).toString(36);
            },
            apply: function (game, partString) {
                // apply nothing for map level for now
            }
        },
        skillPoints: {
            encode: function (game) {
                var str = '';
                // skill points
                Object.keys(game.skills).forEach(function (skillKey) {
                    str += game.skills[skillKey].points.toString(36) + '-';
                });
                return str;
            },
            apply: function (game, partString) {
                if (partString) {
                    var match = partString.match(/\w+/g);
                    if (match) {
                        console.log('applying skill point string:');
                        console.log(partString);
                        match.forEach(function (sp, i) {
                            game.skills['weapon_' + i].points = Number(parseInt(sp, 36));
                        });
                    }
                }
            }
        },
    };
    // create a save string from the given game object
    api.createSaveString = function (game, ver) {
        ver = ver || hardSet.saveStringVer;
        var str = '';
        saveStringVersions[ver].forEach(function (partKey) {
            str += saveStringParts[partKey].encode(game) + '.';
        });
        return ver + '.' + str;
    };
    // apply a save string to the given game object
    api.applySaveString = function (game, saveStr) {
        var parts = saveStr.split('.').map(function (part) {
                return part.replace(/\;/, '');
            });
        var ver = parts[0];
        saveStringVersions[ver].forEach(function (partKey, i) {
            saveStringParts[partKey].apply(game, parts[1 + i])
        });
    };
 
    api.create = function (opt) {
        opt = opt || {};
        var game = {
            mapLevelObj: {
                level: 1
            },
            totalDamage: opt.damage || 0,
            maIndex: opt.mapIndex || 0,
            skills: opt.skills || {
                weapon_0: {
                    points: 0
                },
                weapon_1: {
                    points: 0
                },
                weapon_2: {
                    points: 0
                },
                weapon_3: {
                    points: 0
                }
            }
        };
        return game;
    };
 
    return api;
 
}
    ());
```

### 3.2 - basic save state tool that can edit damage

Now to create a simple tool that I can use to edit the save state of a game. So far this tool just edits the damage of a save state that should be there to begin with, but in time I might put more work into this one if I keep working on the cross hairs example.

```html
 <html>
 <head>
 <title> web storage </title>
 </head>
 <body>
 <script src = "xp.js"></script>
     <script src = "game.js"></script>
    total damage:  <input id="input_total_damage" type="text"><br>
    save string: <br><textarea id="input_save_string" cols="30" rows="10"></textarea><br>
    <input id="input_save" type="button" value="save"><br>
     <script>
 
// save a game object at slot of gameName
var saveStateString = function (str, saveSlot, gameName) {
    if (!str || typeof str != 'string') {
        return;
    }
    saveSlot = saveSlot === undefined ? 0 : saveSlot;
    gameName = gameName || 'game-crosshairs-save-';
    //var str = gameMod.createSaveString(game);
    localStorage.setItem(gameName + saveSlot, str);
};
// load a save string slot of gameName and return a gameObject
var loadState = function (saveSlot, gameName) {
    var str = localStorage.getItem(gameName + saveSlot);
    if (str) {
        var game = gameMod.create();
        gameMod.applySaveString(game, str);
        return game;
    }
    return false;
};
 
var game = loadState('0', 'game-crosshairs-save-'),
input_total_damage = document.getElementById('input_total_damage')
input_save_string = document.getElementById('input_save_string');
 
input_total_damage.addEventListener('change', function (e) {
    if (game) {
        game.totalDamage = e.target.value;
        var str = gameMod.createSaveString(game);
        input_save_string.value = str;
    }
});
 
input_save_string.addEventListener('change', function (e) {
    gameMod.applySaveString(game, e.target.value);
    input_total_damage.value = game.totalDamage;
});
input_save.addEventListener('click', function (e) {
    var str = gameMod.createSaveString(game);
    console.log('save string: ' + str);
    saveStateString(str, '0', 'game-crosshairs-save-');
})
 
if (game) {
    input_total_damage.value = game.totalDamage;
    var str = gameMod.createSaveString(game);
    input_save_string.value = str;
}
 
 </script>
 </body>
</html>
```

## 4 - Conclusion

So there are a number of other options when it comes to finding a way to store some data for a user in a web application. Of course there is having a database sever side for example as a way of saving data for a user by posting data to it by way of scripting http. However with many of the applications that I have made thus far I do not care to get into that sort of thing if it is the kind of project where I can avoid doing so. With that said when it comes to just some simple game, or application in which there is no sever of web servers to push data back to, then client side storage must be the way to go about doing so.

Another option for saving and loading some data client side would be using the [File Reader Constructor](/2020/03/24/js-filereader/). This is a way to prop the user to save a file wherever they want on there local system, and it also allows for them to find a file and open it up as a way to load a state also. This is yet another option on top of something like a password system that is like many old Nintendo games where it is not just a password buy also a state that can be copied and pasted.


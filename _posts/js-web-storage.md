---
title: Web Storage api in client side javaScript
date: 2019-08-20 19:40:00
tags: [js]
layout: post
categories: js
id: 526
updated: 2020-09-22 15:27:07
version: 1.14
---

There are a number of ways to store data on the client side, but in this post I will be mainly writing about the [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API), rather than index db, cookies files, and many other such options for [client side persistence of data](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage) in a front end javaScript environment.

The Web Storage API is easy to use as everything can just simply be stored as key value pairs of the localSorage global variable on clients that support the Web Storage API. However depending on the nature of the project it might not always be the best choice when storing large amounts of data. The indexed db option is a better choice when it comes to storage of large amounts of data on the clients computer, and cookie files will always give better backward compatibility when it comes to supporting older browsers but with a limited size.

There is also the idea of using the [File reader constructor](/2020/03/24/js-filereader/) to have it so the user can save and load files anywhere on their computers local file system. So in some projects the file reader constructor might be be the best choice for handing the saving and loading of state, or other assets in general actually.

Still the Web Storage API is a good option for quickly getting the job done, and most modern browsers support the standard well, any one had to start somewhere when it comes to researching what the options are.

<!-- more -->

## 1 - web storage basic example

Working with the Web Storage API is as easy as working with a plain old javaScript object more or less which makes it one of he reasons why I tend to like using it. The localStoarge global can then be used just like that of any other javaScript Object, whatever you want to save on the client just define it as a property of the localStorage global. However there are also setItem and getItem methods that can be used to do get and set properties of the localStoarge global which should be used to do so. Once a property is set then that value will be there again every page load, site wide, serving the purpose of client side persistence of data on top of other options such as cookie files.

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

## 2 - Save state system from my cross hairs canvas example

### 2.1 - striped down game.hs module with save state code


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

### 2.2 - basic save state tool that can edit damage

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

## 3 - Conclusion

So there are a number of other options when it comes to finding a way to store some data for a user in a web application. Of course there is having a database sever side for example as a way of saving data for a user. However with many of the applications that I have made thus far I do not care to get into that sort of thing f it is the kind of project where I can avoid doing so.
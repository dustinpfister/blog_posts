---
title: What to know about the state objects in phaser
date: 2017-10-06 08:38:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 55
updated: 2017-10-22 13:49:04
version: 1.1
---

When getting started with [phaser](http://phaser.io) it is important to have a certain foundational understanding of some of the core features of how phaser works, no matter what the project may be you are going to want to know a thing or two about State Objects.

If you are new to phaser you might want to start with [my getting started post](/2017/10/04/phaser-getting-started/), and also there is the StateManager, and the Main Phaser.Game constructor that is of interest also.

<!-- more -->

{% phaser_top %}

{% phaser_if_new_mess %}

## The Most basic State Object

A state object can often just be a plain old object that is passed to Phaser.Game when creating an instance of that main constructor function. However it must contain at least one method with a certain key named preload, create, update or render. More about those methods later, but for now a simple State object example:

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {
 
        create : function () {
 
            console.log('hello world!');
 
        }
 
    });
```

Here I am passing a state object to Phaser.Game after the id of the container element. When I add a state this way it's key is "default", and it starts automatically. The Other method it is define one or more states with StateManager.add, in which case the above hello world, can also be written like this:

```js

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('default',{

    create : function () {

        console.log('hello world!');

    }

},true);
```

## game.state vs game.state.states

Keep in mind that there is the StateManager, and then one or more State objects. As such game.state is a reference to the StateManager, and game.state.states is the collection of state objects.

## Switching between states

When having more than one state I use game.state.start to switch between them.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('foo',{
 
        create : function () {
 
            console.log('foo!');
 
            // starting foo
            game.state.start('bar');
 
        }
 
    });
 
game.state.add('bar',{
 
        create : function () {
 
            console.log('bar!');
 
        }
 
    });
 
game.state.start('foo'); // foo! bar!
```

All of my states are in the game.state.states collection

```js
console.log(game.state.states.foo); // the foo state
console.log(game.state.states.bar); // the bar state
```

## The core methods

A State object must have at least one core method, lets run over them to know why.

### preload

The preload method is one of the core methods, and it is called before all other methods except init, but init is not a core method that is totally optional. So as far as the core methods of a State object are concerned it is called first.

preload is useful if you want to load an asset or two before moving onto the next method. I will not cover a loader in detail in this post because that is a whole other ball of wax. But I will show a quick example of how I write what I call a Boot State.

```js
var Boot = {
 
    preload : function(){
 
        // load a single small assest that will
        // be used in the main loader State
        game.load.image('loadingbar', '/img/loadingbar.png');
 
    },
 
    create : function(){
 
        // now that the loadingbar asset is loaded
        // I can start my actual load state
        game.state.start('load');
 
    }

};
```

The Boot State is where I am just starting things up, and have not even started the loader yet.

### create

The create method of a State object is called after preload, an before update, and render. This is a good place to create sprites, and do anything else that needs to get done once before proceeding to update.

If a state just needs to do one thing then move on then it can just have a single create method, like it many of the examples I have shown so far.

### update

update is what the name implies, it is any logic that needs to be called on each frame tick.

### render

A render method is sometimes called for, when I want to do some on the fly drawing. Often it is not needed as Phasers game objects render automatically.

## Additional State methods

There are a lot of additional methods to cover, these are optional, but come in handy with some states.

### init

The init method of a State object is useful for defining some code that is to be called before anything is done, even preloading of assets. In addition these kinds of methods have a special importance with the StateManager.start method in which every time to start a new State with StateManager.start I can pass an object that can be used to configure the state.

## Conclusion

I am in the process of writing many posts on phaser, at least ten, but maybe many more than that. The core methods of a State object should have there own posts, and maybe there should even be a post for every method that can be defined for a state object. I have a draft in the works in which I am covering in detail why init State methods are useful. In any case this post Will be revised as my collection of posts grows.

Happy coding.

{% phaser_bottom %}

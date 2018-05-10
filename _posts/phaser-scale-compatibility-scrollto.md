---
title: Fixing the problem of a phaser project causing the browser to jump to the top of a page on mobile.
date: 2017-10-31 10:19:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 78
updated: 2017-10-31 11:15:58
version: 1.0
---

I ran into a pretty annoying issue of my phaser projects causing a page to jump to the top of a page when scrolling down in chrome for android. I found that the problem has to do with phasers scroll manager, and to fix it all I need to do is set a boolean value to false. In addition this post will outline more about why this is.

<!-- more -->

{% phaser_top %}

{% phaser_if_new_mess %}

## What is the scrollTo compatibility value in phasers scrollManager.

The compatibility object in an instance of phasers scale manager, contains a few properties that have to do with things like if the client supports full screen. It also has a property called scrollTo, by default it is set to a value of null, but on some clients it gets sets to a point that will cause the scrollManager to keep scrolling the browser to.

In phaser 2.8.8 the exact code that is causing me trouble seems to be this:

```js
//  We can't do anything about the status bars in iPads, web apps or desktops
if (!this.game.device.iPad && !this.game.device.webApp && !this.game.device.desktop){
 
    if (this.game.device.android && !this.game.device.chrome){
 
        compat.scrollTo = new Phaser.Point(0, 1);
 
    }else{
 
        compat.scrollTo = new Phaser.Point(0, 0);
 
    }
 
}
```

This can be found in the boot method of the prototype of the ScallManager class in the phaser source code.

## What to do if scrollTo causes trouble.

It seems that in the phaser source code there is only a three areas when the value of scrollTo gets set to a value. Once in the constructor of ScallManager where it gets set to it's default value of null, and the two lines mentioned above in the boot method. Becuase the boot method only gets called once, anywhere in the source code of my project I can just put this line of code in:

```js
game.scale.compatibility.scrollTo = false;
```

This might work well being placed in the create method of a boot state, or something to that effect, it just needs to be set once.

## Conclusion

This is the first major issue I ran into phaser, it was a simple fix. However in some cases setting scrollTo to false at run time might cause a regression of sorts. there is the question of why this is going on in the source code to begin with. Judging by the comment put in place, in some situations it might result in undesired behavior.

{% phaser_bottom %}
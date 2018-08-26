---
title: Removing sprites from a Group in phaser
date: 2018-08-26 20:26:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 271
updated: 2018-08-26 19:38:43
version: 1.1
---

Today in this post on [Phaser ce](https://photonstorm.github.io/phaser-ce/) I will be writing about removing Sprites, and other display objects from a group. There is of course the Group.remove method, but by default it will not destroy the sprite. In some cases this is desirable if I want to move the sprite from one Group to another, or just remove it from a group in place it directly in the world. However it other projects, where Sprites are something that are created and destroyed on demand, then it is important to know about the few little pitfalls when it comes to removing sprites from a group in phaser.

<!-- more -->

## 1 - What to know before continuing

## 2 - The basics with Group.remove

### 2.1 - creating two groups

```js
var group1 = game.add.group(),
group2 = game.add.group();
 
// anding a bunch of text objects to group 1
var i = 5;
while (i--) {
    group1.add(game.add.text(0, i * 20, 'foo' + i, {
            fill: 'red'
        }));
}
 
// child length of both groups is as expected
console.log(group1.children.length); // 5
console.log(group2.children.length); // 0
```

### 2.2 - removing from group one, and adding to group two

```js
// grabbing a reference to the third child
// in group1
var text = group1.children[2];
 
// removing the text object from group one
// but the text object will not be destroyed
group1.remove(text, false, false);
 
// adding the text object to group2
group2.add(text);
 
// child length of both groups is as expected
console.log(group1.children.length); // 4
console.log(group2.children.length); // 1
```

### 2.3 - Removing for good

```js
// if I have a reference I can really destroy
// the object this way
text.destroy();
 
// child length of group2 is as expected
console.log(group2.children.length); // 0
 
// I can also destroy objects by passing true
// as the second argument when calling Group.remove
group1.remove(group1.children[0], true);
 
// child length of group1 is as expected
console.log(group1.children.length); // 3
```
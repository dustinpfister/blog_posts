---
title: The basic material in three.js
date: 2018-05-05 10:55:00
tags: [js,three.js]
layout: post
categories: three.js
id: 184
updated: 2021-04-27 15:39:50
version: 1.14
---

In [three.js](https://threejs.org/) The [basic material](https://threejs.org/docs/index.html#api/materials/MeshBasicMaterial) seems to come up a lot, for example it is the default material that is used when creating a Mesh if a material is not specified. Also it is still a decent material if you want to just skin a mesh with a texture and do not want to do anything special involving the reflection of light, and many other maps other than a color map.

Still the basic material does have its draw backs, for example if I want to do anything with light, and many additional texture maps that have to do with light I am going to want to use something like the [standard material](/2021/04/27/threejs-standard-material/). However Still the basic material can often prove to be a good starting point, so today I thought I would continue expanding my [collection of posts on three.js](/categories/three-js/) by writing a post on the basic material, and what it has to offer when making a three.js project.

<!-- more -->

## 1 - What to know

This is a post on the basic material used in three.js, one of several options when it comes to skinning a mesh object. If you are new to three.js, you might want to start with my [getting started post](/2018/04/04/threejs-getting-started/) on three.js. You might also want to check out my post on [three.js materials](/2018/04/30/threejs-materials/) in general for more posts on the various material options in threejs.

## 2 - Basic example of the basic material

The Basic material is the default material used for a mesh so if I just directly add a Mesh to a scene without giving a material, the  mesh will used the basic material with a random color for the color property of the basic material instance.

```js
scene.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1)));
```

Typically I will want to use the MeshBasicMaterial constructor to create an instance of basic material thought. This will be necessary if I want to set at least one property of the material that is not a default value for the property in question. When it comes to property options for the basic material if I just want to set a solid color for the whole material then the color option would be one way to go about doing that.

```js
var redCube = new THREE.Mesh(
 
    new THREE.BoxGeometry(1, 1, 1),
 
    new THREE.MeshBasicMaterial({
 
        color: 0x00ff00
 
}));
redCube.position.set(-2, 0, 0);
scene.add(redCube);
```

This results in a cube that is sold green all over. There is no sense of depth on the cube, and if I add a light nothing will change. That is okay though because if I want to do anything with light I would want to use another material such as the standard material.

If I do not want to use a solid color, but a texture then I can use the map property to do so.With that said lets look at another example of the basic material that does just that.

## 3 - Adding a color map texture to a basic material in three.js using canvas

The Basic material is a good choice if you do not what to do much of anything involving light, but do still want to have some kind of color map texture. A texture can be added in from an external image using a loader, or it can be created with javaScript using the 2d canvas drawing context of a canvas element.

```js
    // CANVAS
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
 
    // set canvas native size
    canvas.width = 32;
    canvas.height = 32;
 
    // draw to canvas
    ctx.fillStyle = '#00ffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
 
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#000000';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 16, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
 
    // CUBE
    var cube = new THREE.Mesh(
 
            // box GEOMETRY
            new THREE.BoxGeometry(1, 1, 1),
 
            new THREE.MeshBasicMaterial({
            map: new THREE.CanvasTexture(canvas)
        }));
    scene.add(cube);
```

I have written a [post on using canvas as a texture]( /2018/04/17/threejs-canvas-texture/) in which I covered this in further detail, but the basic idea is there.

## 4 - Conclusion

The basic material is just as the name suggests, there are other materials to use in three.js if you want to do something more advanced but the basic material gets the job done when it comes to simple projects. There is of course the [Lambert material](/2018/04/08/threejs-lambert-material/) that is a good choice if you want to do something involving light in a real time environment. There are of course many other [materials](/2018/04/30/threejs-materials/) to chose from when working with a [mesh](/2018/05/04/threejs-mesh/) as well that might have better values to offer when it comes to how things look compared to how much resources they eat up. 

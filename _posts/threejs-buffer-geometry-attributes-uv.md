---
title: The uv attribute for buffer geometries in threejs
date: 2021-06-09 09:44:00
tags: [three.js]
layout: post
categories: three.js
id: 885
updated: 2021-06-09 12:52:08
version: 1.17
---

When working out a custom geometry or playing around with a built in geometry in [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene), there are a number of attributes for the geometry. I have wrote posts on the [position](/2021/06/07/threejs-buffer-geometry-attributes-position/) and [normal](/2021/06/08/threejs-buffer-geometry-attributes-normals/) attributes that have to do with the position of points in space, and the direction that those points are facing that is used for lighting. 

Today though I will be getting into the uv attribute that is used to position the textures that are used when skinning the geometry with a material. It is a way to change the locations of where the texture is to be applied for a given face that will be using the texture, by creating an array of values for each vertex. Each vertex have a horizontal and vertical value for it in the array. So if a geometry is a plane that has a vertex count of 4 then there will be two numbers for each vertex that will result in a length of 8 values when it comes to the uvs for that plane.

<!-- more -->

## 1 - The uv attribute of a buffer geometry and what to know first

This is a post on an advanced topic in threejs that has to do with creating, or mutating an array of uv values for an instance of buffer geometry. This is then not a getting started type post with threejs or javaScript in general and I assume that you have logged a fair amount fo time working with threejs before hand. In any case in this section I will be going over some things that you should maybe be aware of before hand, or maybe read up on a bit more before reading the rest of this post.

### 1.1 - One way or another you are going to need a texture to use with a material

The uv attribute has to do with how a texture is to be applied to a face of a geometry in a mesh. So in order to make use of uvs and to play around with them you are going to need a texture to use as a color map of a material. In this post I am creating textures using canvas elements which is one way to go about making some textures with javaScript code rather than an external image.

### 1.2 - There is much more to read about when it comes to buffer geometry in general

The way that I think about it is that learning about the uv attribute of a geometry comes after learning about the normal, and position attributes. those attributes of a geometry are also very important as they define the position of the points in space, and the directions that they are facing which is something that is used when it comes to light or the use of the normal material. However there is even more to a geometry beyond the position, normal, and uv attributes, when it comes to prototype methods of buffer geometry class instance as well as other properties such as groups and material index values.

### 1.3 - Do not confuse uvs with the material index values of groups.

The uvs have to do with how a texture is to be applied to a face when it comes to offsets, and generally more often that not I am going to want to use the whole texture. When it comes to having more than one texture and switching between two or more textures for the same face messing around with uvs might not be the best way to do so. There is having groups in a geometry also, and passing an array of materials to a mesh rather than just one material. There is also just having one material, changing what the texture is for a map, and updating the material. These things might prove to be better options when it comes to switching textures at run time.

### 1.4 - always check your version numbers

When I made this post I was using r127 of threejs, and the examples here where working okay with that version of threejs. In time code breaking changes might be made to the library that will result in these examples no longer working until I get around to editing this post again.

## 2 - Basic uv mutation example using a Plane, and a canvas texture

To get a general idea of what the uvs are for when it comes to textures it might be best to start working with a plane geometry and look at the values of uv attribute of the plane that is created when using the built in geometry constructor. For example if I create a plane geometry that is a size of 1 by 1 and also has a section size of 1 by 1 then that results in a geometry composed of just 4 points, and because there are 2 uv values for each point it will result in just 8 values in the uv attribute. This is then a nice simple starting point when it comes to playing around with these values to gain a sense of what happens when the values are changed.

```js
(function () {
 
    // creating a simple canvas generated texture
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx.fillStyle = '#004040'; // fill
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'red';
    ctx.beginPath(); // draw red and white circle
    ctx.arc(10, 10, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath(); // draw white square
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.stroke();
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
 
    // scene
    var scene = new THREE.Scene();
 
    // GEOMETRY - starting with a plane
    var geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
 
    var uv = geometry.getAttribute('uv'),
    position = geometry.getAttribute('position');
 
    // the position attribute
    console.log(position.count); // 4 ( the are points or vertices )
    console.log(position.array.length); // 12 ( x, y, and z for each point )
 
    // THE UV ATTRIBUTE
    console.log(uv.count); // 4 ( the are points or vertices )
    console.log(uv.array.length); // 8 ( there is a u and v value for each point )
 
    // MUTATING THE UV VALUES
    uv.array[0] = 0.27;
    uv.array[1] = 0.73;
 
    uv.array[2] = 0.73;
    uv.array[3] = 0.73;
 
    uv.array[4] = 0.27;
    uv.array[5] = 0.27;
 
    uv.array[6] = 0.73;
    uv.array[7] = 0.27;
 
    // use the geometry with a mesh
    var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: texture
            }));
    mesh.position.set(1, 0, 0);
    scene.add(mesh);
 
    // another mesh where I am not doing anything to the uv values
    var geometry = new THREE.PlaneGeometry(1, 1);
    var mesh2 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: texture
            }));
    mesh2.position.set(-1, 0, 0);
    scene.add(mesh2);
 
    // camera, render
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    renderer.render(scene, camera);
 
}
    ());
```

The values that I will typically want to use will be just 0, and 1 which is what will happen when I want to use all of the texture for a face. Numbers between 0 and one imply what I am using just some of the image, while numbers above 1 mean that I am using the whole of the image for just part of the face actually.

### 3 - updating uvs at run time in an Animation loop

Just because the array of uvs can be updated at run time that does not mean that doing so is a good idea. I think that generally uvs are something that should be set up once and only once and if I want to do something that involves more than one texture for a face it might be better to think in terms of more than one texture file and material and updating the textures used with materials rather than messing around with uvs.

Still if for some reason I do need to change the state of the uvs over time in a loop I just need to make sure that I keep setting the needs update property of the uv attribute back to true each time.

```js
(function () {
    // creating a simple canvas generated texture
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx.fillStyle = '#004040'; // fill
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'red';
    ctx.beginPath(); // draw red and white circle
    ctx.arc(16, 16, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath(); // draw white square
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.stroke();
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
 
    // scene
    var scene = new THREE.Scene();
 
    // GEOMETRY - using a plane and getting the uv attribute
    var geometry = new THREE.PlaneGeometry(1, 1);
    var uv = geometry.getAttribute('uv');
    var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: texture
            }));
    mesh.position.set(0, 0, 0);
    scene.add(mesh);
 
    // camera, render
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    var frame = 0,
    maxFrame = 300;
    var loop = function(){
        var per = frame / maxFrame,
        bias = 1 - Math.abs(per - 0.5) / 0.5;
        requestAnimationFrame(loop);
        // MUTATING UV VALUES IN THE LOOP MAKING SURE TO SET
        // uv.needsUpdate to true
        uv.array[0] = -2 + 2 * bias;
        uv.array[1] = 2 - 1 * bias;
        uv.needsUpdate = true;
        renderer.render(scene, camera);
        frame += 1;
        frame %= maxFrame;
    };
    loop();
 
}
    ());
```

## 4 - Conclusion

The uvs of a geometry are for setting up the [texture cornets](http://paulyg.f2s.com/uv.htm) of a geometry when it comes to what portions of a texture should be used when applying it to the face of geometry. This array of values should not be confused with other values of a geometry such as the groups that are used when setting material index values. That is that another part of creating a custom geometry would involve also creating an array of groups, and each group object would contain a material index value to use for a given set of triangles when using an array of materials for a mesh object that will be used with a buffer geometry.

That is it for now when it comes to the uv attribute, at some point in the future I might be able to get around to doing some editing for this post as I often do for my threejs content. Some additional examples that have to do with creating a geometry from the ground up might be called for, as well as some other ways of explaining what uvs are all about might help.

---
title: Color in threejs
date: 2021-05-03 12:32:00
tags: [three.js]
layout: post
categories: three.js
id: 858
updated: 2022-07-20 10:01:18
version: 1.47
---

When it comes to [threejs](https://threejs.org/) the [THREE.Color](https://threejs.org/docs/#api/en/math/Color) constructor can be used to work with colors for various object properties that need a color value, as well as to just work with color in general. This [constructor function](/2019/02/27/js-javascript-constructor/) can be used to create a THREE.Color class object instance that represents a specific color that can then be used to set the background color of a scene object, the fog color of a scene object, the color of various properties of a material such as the color and emissive values, and much more.

What is nice about the THREE.Color class is that the class is packed with a number of features that allow for me to create a color in a number of different ways, including just passing three numbers for red, green and blue color channel values in the form of a number between 0 and 1 as arguments when calling the constructor function. Regardless of how I create the color what is returned is an instance of THREE.Color, rather than a string value for a color, and as such there is a red, green, and blue property of the object. There are also a great number of prototype methods that have to do with mutating these values, or returning values based off the state of these properties, or changing the state of the color. For example there is a get hex method that will return a hex string value of the color, and a set RGB method that will change the value of the color by r, g, and b values.

So in this post I will be going over a number of typical use case examples of the THREE.Color constructor, and will also likely touch base on a number of other topics while in the process of doing so when it comes to using this class of the threejs javaScript library.

<!-- more -->

## THREE.Color and what to know first

This is a post on the THREE.Color constructor in the javaScript library three.js, this is not a post on the [basics of getting started with three.js](/2018/04/04/threejs-getting-started/), and client side javaScript in general, so I assume that you have at least some background with these subjects before hand. I will then not be getting into great detail about threejs as well as the subject of color in general when it comes to client side javaScript. Still in this section I will be going over a few key details that you might want to read up more on that are relevant to the rest of the content of this post.

### A Transparent effect is a whole other can of worms

When it comes to working with color in a general client side javaScript environment there are ways of having an alpha channel for a color. In the THREE.Color class there are just properties for red, green, and blue, but not for an alpha channel. It is of course possible to make [materials transparent](/2021/04/21/threejs-materials-transparent/), but doing so involves setting the transparency boolean for the material to true, and then it is the opacity property of a material that will act as the alpha channel value. 

### Check out more on what there is to know about materials

There are a number of reasons as to why I would want to create an instance of threejs, one of which is to create a value to be used with one of the various properties of one or more kinds of materials. However what properties are what when it comes to creating or change a color value will change a little from one material to another. For example when it comes to the basic material it is more or less just the color property that I care about, but when it comes to the standard material there is the color and emissive property that I need to be aware of.

### Creating textures from javaScript code

Another use case for the threejs color class is to use it to create one or more colors that I will then use to create textures by way of javaScript code rather and a static external image asset. There are a number of ways to do this such as with the data texture constructor, or the canvas texture constructor.

### Version Numbers matter with three.js

When I first wrote this post I was using r127 of three.js which was a late version of three.js in April of 2021. The last time I came around to doing a little editing I was then also using r135 of threejs when checking out the source code examples. Code breaking changes are made to three.js all the time, so be sure to always check the version of three.js that you are using relative to the dates of the code examples that you are looking at on the open web.

## The source code examples in this post, and in many others is on Github

The source code examples that I am writing about in this post, as well as for many of my [other posts on threejs](/categories/three-js/), can be found in my [test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-color).

## 1 - Basic color example involving setting the color property of a material

So first things first how about a basic use case example of the THREE.Color constructor where I am just setting the regular color property of a material of a cube created with the Box geometry constructor. When setting the color value of a material it is important to take into consideration what kind of material it is to begin with. In this example I am using the Standard material which is a kind of material that will respond to a light source. So when using this kind of material, and setting a color for it, I need to also add a light to the scene. However if I was using the basic material I would not have to bother with a light, and the color property of that material is used to just set what the basic solid color of the material is.

In this example I am also using the THREE.Color constructor to set the color of the Point Light that I am using for a light source for the box that is skinned with the standard material. When I create a color for a point light I typically will want to keep it white like in this example, but if I make the color of the mesh while I can set the color of the point light to something else. Another cool thing to get into is having an array of point lights, and set different colors to each of them and place them in different areas of a scene, but that might all be a little to much for now. I wanted to keep this example relative basic.

```js
// creating a box mesh with the Box Geometry constructor,
// and the normal material
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: new THREE.Color(1, 0, 0)
        }));
 
// creating a scene
var scene = new THREE.Scene();
 
// add the box mesh to the scene
scene.add(box);
 
// ADD A LIGHT BECUASE THIS IS THE STANDARD MATERIAL
var light = new THREE.PointLight(new THREE.Color(1, 1, 1));
light.position.set(1, 3, 2);
scene.add(light);
 
// camera
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1, 1.2, 1);
camera.lookAt(0, 0, 0);
// renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

So in this example it is just the color property of the standard material that I am setting a solid color for. However when it comes to the standard material it is not just the color property that is of interest as there is also the emissve property also that I can set with the THREE.Color class. So lets look at a few more examples that have to do with the standard material and using the THREE.Color constructor.

## 2 - Setting Color and Emissive Color with THREE.Color

Another property of interest when it comes to setting the color values of a material that responds to light is the emissive property of a material. This property is a color that will be used always regardless of what the situation might be when  it comes to what is going on with light in the scene. Just like with the color property the emissive property can also be set with a color object created with THREE.Color. When doing so I will often want to adjust the emissive intensity of the material as I might now always want the emmisve color to be full bast of course.

```js
// creating a scene
var scene = new THREE.Scene();
 
// Box With a material that uses a color, and emissive color
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: new THREE.Color(1, 1, 1),
            emissiveIntensity: 0.8,
            emissive: new THREE.Color(1, 0, 0)
        }));
 
// add the box mesh to the scene
scene.add(box);
 
// ADD A LIGHT BECUASE THIS IS THE STANDARD MATERIAL
var light = new THREE.PointLight(new THREE.Color(1, 1, 1));
light.position.set(1, 3, 2);
scene.add(light);
 
// camera
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
// renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
renderer.render(scene, camera);
```

There is also creating a texture to use as an emmisive map which can often be used as a way to create cool effects with textures. The use of this emissive map will allow me to set what areas of a face will be effected by the emmisve color and intensity, as well as what areas will not be effected by these values.

## 3 - Using an Emmsive map, canvas textures and the THREE.Color.getStyle method

Getting into emissive maps might be a little off topic from the THREE.Color class, but yet again maybe not as it might prove to serve as a way to demonstrate a use case example for the get style method of THREE.Color. This get style method will return a string value like 'rgb\(255,0,0\)' from an instance of the color class like this new THREE.Color(1, 0, 0). So I can use the THREE.Color class not just for properties of materials and the scene object, but also to set the value of a style for an instance of the 2d drawing context of a canvas when creating a texture with a canvas element.

You see in order to use the emissive map property of a material I will want to have a texture, and when it comes to having textures one way is to load an external file. However when it comes to examples of threejs I like to stick to solutions that just involve javaScript code only and not any more additional external files, so one way to go about creating textures with javaScript code alone would be to use canvas elements. I have wrote a [post on using canvas elements to create textures for materials in threejs](/2018/04/17/threejs-canvas-texture/) in detail, but for this example I am just gong to stick to using them to create a texture to use with the emissive map property.

Anyway when it comes to setting a fill style or stroke style I can not just use the THREE.Color object directly, however I can call the get style method of a THREE.Color instance and then use the resulting string to set such a value.

```js
var createCanvasTexture = function (draw) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    draw(ctx, canvas);
    return new THREE.CanvasTexture(canvas);
};
 
var COLOR_EMISSIVE_MAP_FRONT = new THREE.Color(1, 1, 1);
 
var texture = createCanvasTexture(function (ctx, canvas) {
        ctx.strokeStyle = COLOR_EMISSIVE_MAP_FRONT.getStyle();
        ctx.strokeRect(1, 1, canvas.width - 1, canvas.height - 1);
    });
 
// scene
var scene = new THREE.Scene();
 
// mesh
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: new THREE.Color(0, 1, 0),
            emissiveIntensity: 4,
            emissive: new THREE.Color(1, 0.5, 0),
            emissiveMap: texture
        }));
scene.add(box);
 
// light
var light = new THREE.PointLight(new THREE.Color(1, 1, 1), 1);
light.position.set(1, 3, 2);
scene.add(light);
 
// camera, render
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

## 4 - Background and Fog

Another use case example of the THREE.Color constructor would be to set the background color and or a [fog color](/2018/04/16/threejs-fog/). When doing so I typically will want to make the background color the same as the fog color, and I will also want to use the fog color for the color property of materials also. So it would make sense to have some kind of global, or constant local variable that is a fog color variable and set the color for that once with the THREE.Color Constructor. Then use that values for the scene.background property, as well as the value to pass to THREE.fogExp2 to create the value for scene.fog, and to use the color for mesh materials.

```js
// creating a scene
var scene = new THREE.Scene();
var fogColor = new THREE.Color(0, 1, 0);
scene.background = fogColor;
scene.fog = new THREE.FogExp2(fogColor, 0.4);
 
// Box With a material that uses a color, and emissive color
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: fogColor,
            emissiveIntensity: 0.8,
            emissive: new THREE.Color(1, 0, 0)
        }));
 
// add the box mesh to the scene
scene.add(box);
 
// ADD A LIGHT BECUASE THIS IS THE STANDARD MATERIAL
var light = new THREE.PointLight(new THREE.Color(1, 1, 1));
light.position.set(1, 3, 2);
scene.add(light);
 
// camera
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(0, 0, 1);
camera.lookAt(0, 0, 0);
// renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
var lt = new Date(),
frame = 0,
maxFrame = 100,
fps = 30;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        box.position.set(0, 0, -1 - 4 * bias);
        box.rotation.set(0, Math.PI * 2 * per, Math.PI * 4 * per);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
 
};
loop();
```

In this example I am now making use of a loop that make used of the [requestiAnimationFrame method](/2018/03/13/js-request-animation-frame/) to call the render function of the web gl render over and over again. Each time I do so I update some things when it comes to the position and rotation of the box object. The effect is then that the box will disappear as it moves away from the camera and will gradually appear again as it comes back in range of the camera. When doing so I am using th set method of the [vector3](/2018/04/15/threejs-vector3/) instance when it comes to the position of the box, and a similar set method for the [Euler instance](/2021/04/28/threejs-euler/) when it comes to setting rotation. These classes are also worth checking out in detail if you have not done so before hand.

## 5 - Random Color example

Now for a random color example, for this I made a few helper method one of which is of course a random color helper. In there I just need to call Math.random for red, green and blue values of the THREE.Color Constructor. At least that is all I need to do in order to have a full range of possibles when it comes to random colors.

I also have a similar method when it comes to creating a random position to pace a box object, with this one I am creating an instance of Vector3 and then using the instance of vector three as an argument to be passed to the Vector3 copy method later in the source code when creating a group of box objects.

```js
var randomColor = function () {
    var r = Math.random(),
    g = Math.random(),
    b = Math.random();
    return new THREE.Color(r, g, b);
};
var randomPosition = function () {
    var x = -3 + 4 * Math.random(),
    y = -1 + 2 * Math.random(),
    z = 2 + Math.random() * 5 * -1;
    return new THREE.Vector3(x, y, z);
};
 
// creating a scene
var scene = new THREE.Scene();
 
// creating a group of mesh object with random colors
var group = new THREE.Group();
var i = 0,
len = 15;
while (i < len) {
    var box = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.MeshStandardMaterial({
                color: randomColor(),
                emissiveIntensity: 0.8,
                emissive: randomColor()
            }));
    box.position.copy(randomPosition());
    group.add(box);
    i += 1;
}
scene.add(group);
 
// ADD A LIGHT BECUASE THIS IS THE STANDARD MATERIAL
var light = new THREE.PointLight(new THREE.Color(1, 1, 1));
light.position.set(1, 3, 2);
scene.add(light);
 
// camera
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
// renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
var lt = new Date(),
frame = 0,
maxFrame = 200,
fps = 30;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        group.children.forEach(function (box) {
            box.rotation.set(0, Math.PI * 2 * per, Math.PI * 4 * per);
        });
        group.rotation.y = Math.PI * 2 * per;
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
 
};
loop();
```

When it comes to some kind of simple random color example such as this there are a great number of things that I might want to change when it comes to creating random colors. However for the most part it might be just playing around with the expressions that are used to create a color.

## 6 - Mutation of color value over time

So I have covered some example that have to do with creating an instance of color, and using that color when it comes to things like setting the background color of a scene object, or colors that can be used when drawing to a canvas element to be used for a texture in an emissive map. Now I am thinking that I will wan to make at least one of not more examples that have to do with mutation of a color object instance over time.

```js
// SCENE, CAMERA, RENDERER
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(8,8))
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
// ADD A LIGHT BECUASE THIS IS THE STANDARD MATERIAL
var light = new THREE.PointLight(new THREE.Color(1, 1, 1));
light.position.set(1, 3, 2);
scene.add(light);
// Mesh
var color = new THREE.Color(1, 0, 0);
var material = new THREE.MeshStandardMaterial({
    color: color
})
var mesh = new THREE.Mesh(
    new THREE.SphereGeometry(1, 30, 30),
    material
);
scene.add(mesh);
// LOOP
var lt = new Date(),
frame = 0,
maxFrame = 200,
fps = 30;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        material.color.setRGB(bias, 1 - bias, 0);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }

};
loop();
```

## 7 - Color add and equals methods

In this example I am using the add method of a color class instance of each material or each mesh in a group of mesh objects. I just get a reference to the material that I am using for a mesh, and then I can call the add method of that color to add the values of another instance of THREE.Color to that color. I can also use the equals method to find out of a color is fully white or not, and of so I can set a new random color using a random color helper.

```js
var randomColor = function () {
    var r = Math.random(),
    g = Math.random(),
    b = Math.random();
    return new THREE.Color(r, g, b);
};
var randomPosition = function () {
    var x = -3 + 4 * Math.random(),
    y = -1 + 2 * Math.random(),
    z = 2 + Math.random() * 5 * -1;
    return new THREE.Vector3(x, y, z);
};
 
var createBoxGroup = function(){
    // creating a group of mesh object with random colors
    var group = new THREE.Group();
    var i = 0,
    len = 15;
    while (i < len) {
        var box = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.MeshStandardMaterial({
                color: randomColor()
            }));
        box.position.copy(randomPosition());
        group.add(box);
        i += 1;
    }
    return group;
};
 
// creating a scene
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(8,8))
var group = createBoxGroup();
scene.add(group);
// ADD A LIGHT BECUASE THIS IS THE STANDARD MATERIAL
var light = new THREE.PointLight(new THREE.Color(1, 1, 1));
light.position.set(1, 3, 2);
scene.add(light);
 
// camera
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
// renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
var lt = new Date(),
frame = 0,
maxFrame = 200,
fps = 30;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        group.children.forEach(function (box) {
            var r = 0.05 * per,
            g = r, b = r,
            color = box.material.color;
            color.add( new THREE.Color(r, g, b) );
            color.r = color.r > 1 ? 1 : color.r;
            color.g = color.g > 1 ? 1 : color.g;
            color.b = color.b > 1 ? 1 : color.b;
            if(color.equals(new THREE.Color(1,1,1))){
                box.material.color = randomColor();
            }
        });
        group.rotation.y = Math.PI * 2 * per;
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```

## 8 - For Pix method using Data Textures and THREE.Color

Sense I first wrote this [blog post I wrote a blog post on data textures](/2022/04/15/threejs-data-texture/) which is another option when it comes to making a texture from javaScript code rather an external image asset. When working out what the color values should be for each pixel the THREE.Color class can come in handy for making some kind of abstraction where I can pass a function that will be called for each pixel location in a texture. In this section I am doing just that when making a create data texture helper function that will take a forPix function as one of the options. In the body of this for pix function I am passing an instance of THREE.Color as on eof the arguments, and this is also the value that should be returned by the function.

```js
//******** **********
// DATA TEXTURE HELPER
//******** **********
// create data texture method
let createDataTexture = function(opt){
    opt = opt || {};
    opt.width = opt.width === undefined ? 16: opt.width; 
    opt.height = opt.height === undefined ? 16: opt.height;
    // default for pix method
    opt.forPix = opt.forPix || function(color, x, y, i, opt){
        let v = Math.floor( THREE.MathUtils.seededRandom() * 255 );
        color.r = v;
        color.g = v;
        color.b = v;
        return color;
    };
    let size = opt.width * opt.height;
    let data = new Uint8Array( 4 * size );
    for ( let i = 0; i < size; i ++ ) {
        let stride = i * 4,
        x = i % opt.width,
        y = Math.floor(i / opt.width),
        color = opt.forPix( new THREE.Color(), x, y, i, opt);
        data[ stride ] = color.r;
        data[ stride + 1 ] = color.g;
        data[ stride + 2 ] = color.b;
        data[ stride + 3 ] = 255;
    }
    let texture = new THREE.DataTexture( data, opt.width, opt.height );
    texture.needsUpdate = true;
    return texture;
};
//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(8,8))
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// ADD A LIGHT BECUASE THIS IS THE STANDARD MATERIAL THAT I AM USING
//******** **********
var light = new THREE.PointLight(new THREE.Color(1, 1, 1));
light.position.set(1, 3, 2);
scene.add(light);
//******** **********
// MESH OBJECTS WITH DATA TEXTURES
//******** **********
// default sudo random texture
var tex1 = createDataTexture();
var mesh1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({
        map: tex1
    })
);
scene.add(mesh1);
//******** **********
// LOOP
//******** **********
var lt = new Date(),
frame = 0,
maxFrame = 200,
fps = 20;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // new data texture for mesh1
        mesh1.material.map = createDataTexture();
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```

## Conclusion

Well I think that might be it for now at least when it comes to the THREE.Color constructor in three.js until I get around to editing this post. There is not just setting solid color values though when it comes to everything that has to do with color in three.js though. There is a great deal more to write about when it comes to color and the various types of texture maps there are to work with when ti comes to creating a material for example. With an alpha map for example I want to set the colors of the various pixels to colors that are gray scale rather than solid colors as gray scale colors are what are used to set levels of transparency for the alpha map. When creating a texture for a mesh I might often use a canvas element, so setting the color values for the texture might not make use of the THREE.Color constrictor but that is never the less one of many additional little details that have to do with color in three.js.


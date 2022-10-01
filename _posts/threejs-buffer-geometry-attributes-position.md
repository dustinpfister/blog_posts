---
title: The position attribute for buffer geometries in threejs
date: 2021-06-07 13:00:00
tags: [three.js]
layout: post
categories: three.js
id: 883
updated: 2022-10-01 13:45:41
version: 1.43
---

When getting into the subject of making a custom buffer geometry in [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) there are a lot of various little details to cover. There are a number of attributes that must be created from scratch when it comes to the positions of the points to begin with, normals, and the UV attribute that has to do with texture mapping. However one has to start somewhere when it comes to learning how to do this sort of thing, and with that said maybe a good starting point would be the position attribute. The reason why I say that is that in order to have any kind of geometry at all even one that will work with the THREE.Points or THREE.Line constrictor at a minimum one will need at least a position attribute.

There is taking the time to create a blank instance of a Buffer geometry using the [THREE.BufferGeometry](https://threejs.org/docs/index.html#api/en/core/BufferGeometry) constructor and then create the position attribute from the ground up. However maybe a good starting point would be to study the results of one of the built in geometry constructors such as the [THREE.boxGeometry constructor](/2021/04/26/threejs-box-geometry/) to get an idea of what a position attribute is all about. There is also taking a look at some other features of a built in geometry instance such as the index property of a buffer geometry to gain a sense of what that is for when it comes to working with a set of triangles.

So then this post might get a little involved when it comes to the position property of a geometry in threejs, but still the subject is only so complicated. When it comes to the position property alone as one might guess it is a typed array that holds all the values of each point in space, and that is all there is to it. However things can get a little confusing when it comes to the difference between the count value of a position, and the length of an array. Also there is the relationship between the position array and the index attribute of a buffer geometry instance.

<!-- more -->

## The Attributes of a buffer geometry instance and what to know first

This is a post on the position attribute of a buffer geometry instance in the javaScript library known as three.js. There is a great deal more that you show know at least a little about before hand, or else you might end up finding this post a little hard to follow. So I assume that you have at least some background with client side javaScript, and I also assume that you have worked out at least a few basic examples when it comes to [getting started with threejs](/2018/04/04/threejs-getting-started/). Still in this section I will be going over some things that you might want to read up more on if you find yourself overwhelmed.

<iframe class="youtube_video"  src="https://www.youtube.com/embed/Z4kjKwmCEvo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### Read up more on buffer geometry in general

There is a great deal more to write about when it comes to [buffer geometry](/2021/04/22/threejs-buffer-geometry/) in threejs. It might be best to start out with getting to know the various prototype methods of the buffer geometry class, and how to do simpler tasks such as translating, or [rotating an all ready made geometry](/2021/05/20/threejs-buffer-geometry-rotation/) before getting into a more advanced topic such as this.

### There are the other core attributes that are needed for Mesh objects

The position attribute is the first attribute that I would want to set up when making a custom geometry. However if I want to use the custom geometry with Mesh objects I will also want to set up at least a [normals](/2021/06/08/threejs-buffer-geometry-attributes-normals/) and [uvs](/2021/06/09/threejs-buffer-geometry-attributes-uv/) attributes for it as well. These additional attributes are very important when it comes to making lighting and textures look the way that they should, or to even work at all actually.

### Source is on Github

The examples here, and many others can be [found on my Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-buffer-geometry-attributes-position).

### Version Numbers matter

When I made these source code examples, and first wrote this post I was using revision 127 of threejs. I do come around to doing a little editing of these posts now and then, and the last time I check that everything was working okay I was using r140.

## 1 - Creating a custom triangle geometry from the ground up starting with position

For this section I will be creating an instance of buffer geometry by just using the THREE.BufferGeometry constructor alone rather than one of the built in constructors that will set everything up for me. When doing so the first and foremost attribute that must be added is the position attribute which will have to be set up by creating a float32 array and then pass that when calling the THREE.BufferAttribute constructor that will then be used to set the position attribute for the geometry.

To help keep things simple these examples will just involve three points in space.

### 1.1 - A position attribute only, and the THREE.Points Class

In order to get a geometry to work well with Mesh objects I need more than just a position attribute, however when it comes to using the THREE.Points class all I need is a position attribute. So for this example I will be creating a buffer geometry that just has a position attribute and use that with the Points class rather than that of mesh. 

The fist thing that I would do is call the THREE.BufferGeometry constructor function wit the new keyword, and then store the returned result to a variable that can be called something like geometry. I now have an instance of buffer geometry, but there is no data with it, so I will then need to add the position attribute. To do so I create a Float32 array and then set up numbers for each x, y, and z value for each point in space. Once I have that set up the way I like it I can pass that array as an argument when calling the THREE.BufferAttribite constrictor. The result of the BufferAttribjuute constructor can then be set for the position attribute of the buffer geometry by just using the set Attribute method of the class.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER, GRID
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(3, 3, 3);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    scene.add( new THREE.GridHelper(10, 10));
    //-------- ----------
    // GEOMETRY
    //-------- ----------
    const geometry = new THREE.BufferGeometry();
   // create data as Float32Array
    const data = new Float32Array( [
        -1.0, 0.0,  0.0,
        1.0, 0.0,  0.0,
        0.0, 2.0,  0.0,
    ]);
    // create new instance of BufferAttribute with Float3sArray and set as 'position'
    geometry.setAttribute('position', new THREE.BufferAttribute( data, 3 ));
    // can now call methods like translate, center, rotateX, ect
    geometry.center();
    //-------- ----------
    // POINTS
    //-------- ----------
    const points = new THREE.Points(geometry, new THREE.PointsMaterial({size: 0.5}));
    camera.lookAt(points.position);
    scene.add(points);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}
    ());
```

### 1.2 - Making it a geometry that will work okay with Mesh Objects

Now that I have a basic example that is position only it is now time to work out an example that will also set up a normal and uv attribute so that I can use it with a mesh object. There are a number additional attributes, and properties of interest that may come up also, but the core set of attributes are these three which are once again position, normal, and uv.

One quick way to set up the normal attribute would be to just call the [compute vertex normals method](/2022/04/22/threejs-buffer-geometry-compute-vertex-normals/) of the buffer geometry class. In some cases I will need to create this manually, or mutate the values, however getting deep into that might be outside the scope of this post, or at least this section to say the least. If I want to use textures with one or more of the maps that are used for the material I will also need to set up the uv attribute for the geometry also. The process for this is more or less the same as setting up position, but I will want to think in terms of two values for each vertex rather than three. These two values for each vertex are a kind of x and y offset for a source texture when it comes to mapping each face. Again I will not be getting into this subject in depth here, but I think I should just make a quick example of how to set up these other attributes for a very simple custom geometry like this.

When it comes to setting up a quick texture for one or more of the materials that I will be using for the mesh objects there are a number of ways to do that with a little javaScript code rather than that of an external image file. For this example I am going with [data textures](/2022/04/15/threejs-data-texture/), but another great option would be to use [canvas textures](/2018/04/17/threejs-canvas-texture/).

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER, GRID
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 2);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    scene.add( new THREE.GridHelper(10, 10));
    //-------- ----------
    // GEOMETRY
    //-------- ----------
    const geometry = new THREE.BufferGeometry();
    // ATTRIBUTE 'position' 
    const dataPOS = new Float32Array( [
        -1.0, 0.0,  0.0,
        1.0, 0.0,  0.0,
        0.0, 2.0,  0.0,
    ]);
    geometry.setAttribute('position', new THREE.BufferAttribute( dataPOS, 3 ));
    // ATTRIBUTE 'normal'
    // compute vertex normals method can some times make quick work of setting up the normals attribute
    geometry.computeVertexNormals();
    // ATTRIBUTE 'uv'
    const dataUV = new Float32Array( [
        1.0, 0.0,
        0.0, 1.0,
        1.0, 1.0,
    ]);
    geometry.setAttribute('uv', new THREE.BufferAttribute( dataUV, 2 ));
    geometry.center();
    //-------- ----------
    // LIGHT
    //-------- ----------
    const dl = new THREE.DirectionalLight();
    dl.position.set(0,1,2)
    scene.add(dl);
    //-------- ----------
    // TEXTURE
    //-------- ----------
    // create data texture method
    const createDataTexture = function(opt){
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
    const tex1 = createDataTexture();
    //-------- ----------
    // MESH
    //-------- ----------
    const mesh1 = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({side: THREE.DoubleSide}));
    camera.lookAt(mesh1.position);
    mesh1.position.x = -2;
    scene.add(mesh1);
    const mesh2 = new THREE.Mesh(geometry, 
        new THREE.MeshStandardMaterial({
            side: THREE.DoubleSide,
            map: tex1
    }));
    scene.add(mesh2);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}
    ());
```

## 2 - Mutation of box geometry examples

In this section I will be going over some examples of mutating the position attribute of a built in box geometry. However things can still get a little confusing as the number of points in the array is not what one might expect when it comes to a cube. For example in a way there is only eight points to a cube, so one might think that the length of a position array for a cube would be 24 when it comes to all the axis positions for each point. However that is not the case, the count value of the position property is indeed 24, but the actual length of the position array is 72. This is because the idea here is to not think in the number of sides that are needed, but the number of triangles that are needed.

### 2.1 - Getting started by just moving one point in the box geometry

If you are still a little confused about all this maybe it would be best to just start playing around with an instance of box geometry, and do a little basic math with some things. Also while you are at it you might chose to change one of the values in the position array to see what the effect is.

```js
(function () {
    //******** **********
    // scene, camera, render
    //******** **********
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 2);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //******** **********
    // GEOMETRY, MESH - starting with a cube and looking at position attribute
    //******** **********
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    // check out the position attribute of a cube
    var position = geometry.getAttribute('position');
    console.log( position.count ); // 24
    console.log( position.array.length ); // 72
    console.log( position.count * 3 === position.array.length); // true
    var index = geometry.getIndex();
    console.log( index.count );      // 36
    console.log( 2 * 6 );            // 12 ( number of triangles )
    console.log( index.count / 3);   /* 12 (index.count / 3 === number of triangles ) */
    // mutating a position
    var vertIndex = index.array[0] * 3;
    position.array[vertIndex] = 1;
    position.needsUpdate = true;
    // use the geometry with a mesh
    var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    }));
    scene.add(mesh);
    camera.lookAt(mesh.position);
    //******** **********
    // RENDER
    //******** **********
    renderer.render(scene, camera);
}
    ());
```

### 2.2 -  Set vertex helper example

In this example I worked out a simple set vertex helper where I can just pass a geometry, then a vertex instance, and then a position object or instance of vector 3 that can be used to set the position of the vertex. Once again in this example I am working with a built in geometry that is a basic box geometry, and I want to use this set vertex helper method to move a single point in the cube. However doing so does not involve just moving one point, but three points for each triangle at that point.

```js
(function () {
 
    // set location of a vert given an index value in geometry.index
    var setVert = function(geometry, vertIndex, pos){
        pos = pos || {};
        var posIndex = geometry.index.array[vertIndex] * 3,
        position = geometry.getAttribute('position');
        position.array[posIndex] = pos.x === undefined ? position.array[posIndex]: pos.x;
        position.array[posIndex + 1] = pos.y === undefined ? position.array[posIndex + 1]: pos.y;
        position.array[posIndex + 2] = pos.z === undefined ? position.array[posIndex + 2]: pos.z;
    };
    // scene
    var scene = new THREE.Scene();
 
    // GEOMETRY
    var geometry = new THREE.BoxGeometry(1, 1, 1);
 
    var pos = {
       x: 1,
       y: 0.25,
       z: 1.25
    };
    setVert(geometry, 0, pos);
    setVert(geometry, 16, pos);
    setVert(geometry, 26, pos);
 
    var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    }));
    scene.add(mesh);
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(mesh.position);
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
 
    var loop = function(){
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
    };
    loop();
 
}
    ());
```

### 2.3 -  Set triangle helper

So now that I have a set vertx helper that seems to work okay I thought it might be nice to create another helper that will helper with each triangle in the cube. This way I can call the set triangle method and pass a position object once, and then that position object will be applied for each vertex in for the given triangle index. This example results in each face being moved away from the center of the cube, which is a cool effect that can be archived by a method such as this.

```js
(function () {
 
    // set location of a vert given an index value in geometry.index
    var setVert = function(geometry, vertIndex, pos){
        pos = pos || {};
        var posIndex = geometry.index.array[vertIndex] * 3,
        position = geometry.getAttribute('position');
        position.array[posIndex] = pos.x === undefined ? position.array[posIndex]: pos.x;
        position.array[posIndex + 1] = pos.y === undefined ? position.array[posIndex + 1]: pos.y;
        position.array[posIndex + 2] = pos.z === undefined ? position.array[posIndex + 2]: pos.z;
    };
 
    var setTri = function(geometry, triIndex, pos){
        pos = pos || {};
        var vertIndex = triIndex * 3;
        setVert(geometry, vertIndex, pos);
        setVert(geometry, vertIndex + 1, pos);
        setVert(geometry, vertIndex + 2, pos);
    };
 
    // scene
    var scene = new THREE.Scene();
 
    // GEOMETRY
    var geometry = new THREE.BoxGeometry(1, 1, 1);
 
    // example 2 on set tri helper
    setTri(geometry, 0, {x: 1});
    setTri(geometry, 1, {x: 1});
    setTri(geometry, 2, {x: -1});
    setTri(geometry, 3, {x: -1});
 
    setTri(geometry, 4, {y: 1});
    setTri(geometry, 5, {y: 1});
    setTri(geometry, 6, {y: -1});
    setTri(geometry, 7, {y: -1});
 
    setTri(geometry, 8, {z: 1});
    setTri(geometry, 9, {z: 1});
    setTri(geometry, 10, {z: -1});
    setTri(geometry, 11, {z: -1});
 
    var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    }));
    scene.add(mesh);
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(mesh.position);
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
 
    var loop = function(){
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
    };
    loop();
 
}
    ());
```

## 3 - Vector3 arrays, buffer geometry position attributes, and Points

I really like the vector3 class as there are a whole lot of very useful methods to work with in that class than help with the process of creating, or mutating a geometry. Also when it comes to just creating and mutating a position attribute alone I have the option to use the THREE.Points constructor in place of the usual THREE.Mesh.

In the basic section of this post on the position attribute I covered a basic example of using the THREE.Points constructor all ready. However in this section I will be focusing  more so on how to create  an array of vector3 class instances from a geometry as well as the inverse of this. There is then using the various features of the vector3 class to mutate the state of a portion attribute and much more.

### 3.1 - Geometry with position attribute from a vector3 array

There are a number of ways to go about making a buffer geometry from an array of Vector3 class instances of course. There are many ways of doing it that might prove to be a little complex, and then other ways that just make use of a method in one of the classes and tools to with with in threejs as well as other official files. For this example I am making use of the set from points method of the buffer geometry class to create a buffer geometry with  position attribute from an array of vector3 class instances.

```js
// geo from v3
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // POINTS
    //-------- ----------
    // ARRAY of VECTOR3 CLASS INSTANCES
    const v3Array = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(0, 0, 1),
        new THREE.Vector3(2, 0, 0),
        new THREE.Vector3(0, 2, 0),
        new THREE.Vector3(0, 0, 2),
        new THREE.Vector3(3, 0, 0),
        new THREE.Vector3(0, 3, 0),
        new THREE.Vector3(0, 0, 3)
    ];
    // THREE.Points INSTANCE UISNG THREE.PointsMaterial
    scene.add(
        new THREE.Points(
            new THREE.BufferGeometry().setFromPoints(v3Array),
            new THREE.PointsMaterial({
                color: 0x00afaf,
                size: 0.25
            })));
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
```

### 3.2 - A vector3 array from a geometry

There is having an array of vector3 objects and wanting to create a buffer geometry from it, and then there is also doing the inverse of that. That is to create an array of vectro3 objects from the position attribute of a buffer geometry that was created with one of the built in constructor functions or some other means.

Amway thus far I am not sure of there is any single method that can be used to do this, but thankfully it is not to hard to just create this kind of array with a quick helper method if that is the way it needs to get done. When doing this one way would be to use the count property of the position buffer attribute object and then pass each value of I to the getX, getY, and getZ methods of the attribute class.

```js
// v3 from geo
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // Buffer Geometry from v3Array
    const Vector3ArrayToGeometry = (v3Array) => {
        return new THREE.BufferGeometry().setFromPoints(v3Array);
    };
    // Vector3 array from geometry
    const Vector3ArrayFromGeometry = (geometry) => {
        const pos = geometry.getAttribute('position');
        let i = 0;
        const len = pos.count, v3Array = [];
        while(i < len){
            const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i))
            v3Array.push(v);
            i += 1;
        }
        return v3Array;
    };
    //-------- ----------
    // POINTS
    //-------- ----------
    // Geometry created with the Torus Geometry Constructor
    const geometry = new THREE.TorusGeometry(2, 0.75, 30, 60);
    geometry.rotateX(Math.PI / 180 * 90);
    // array of Vector3 class instances
    const v3Array = Vector3ArrayFromGeometry(geometry);
    // do somehting to the v3 array
    v3Array.forEach((v) => {
        const vd = new THREE.Vector3();
        vd.copy(v).normalize().multiplyScalar(0.75 * THREE.MathUtils.seededRandom())
        v.add(vd);
    });
    // THREE.Points INSTANCE UISNG THREE.PointsMaterial
    scene.add(
        new THREE.Points(
            Vector3ArrayToGeometry(v3Array),
            new THREE.PointsMaterial({
                color: 0x00afaf,
                size: 0.125
            })));
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
```

### 3.3 - Updating a buffer gometry from a Vector3 array

I know that I have covered an example that has to do with creating a buffer geometry from an array of vector3 objects. However I have found that it is not such a good idea to use the method over and over again for a buffer geometry. When doing so I have run into problems, so it would be a good idea to also have another way to not create a new geometry, but update a geometry that is all ready there before hand by mutating the array of the positing attribute.


```js
// update from v3
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // Buffer Geometry from v3Array
    const Vector3ArrayToGeometry = (v3Array) => {
        return new THREE.BufferGeometry().setFromPoints(v3Array);
    };
    // Vector3 array from geometry
    const Vector3ArrayFromGeometry = (geometry) => {
        const pos = geometry.getAttribute('position');
        let i = 0;
        const len = pos.count, v3Array = [];
        while(i < len){
            const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i))
            v3Array.push(v);
            i += 1;
        }
        return v3Array;
    };
    // Vector3 Array to Typed Array
    const Vector3ArrayToTyped = (v3Array) => {
        let i = 0, len = v3Array.length, vertArray = [];
        while(i < len){
            let v = v3Array[i];
            vertArray.push(v.x, v.y, v.z);
            i += 1;
        }
        return vertArray;
        //return new THREE.Float32BufferAttribute(vertArray, 3)
    };
    //-------- ----------
    // GEO AND POINTS
    //-------- ----------
    let geo_sphere = new THREE.SphereGeometry(1.5, 30, 30);
    let geo_torus = new THREE.TorusGeometry(1, 0.5, 30, 30);
    let v3array = Vector3ArrayFromGeometry(geo_torus);
    let points = new THREE.Points( geo_sphere, new THREE.PointsMaterial({ size: 0.1}) );
    scene.add(points);
    let typed = Vector3ArrayToTyped(v3array);
    let pos = geo_sphere.getAttribute('position');
    let alpha = 1;
    pos.array = pos.array.map( (n, i) => {
        let d  = typed[i] === undefined ? 0: typed[i];
        return n + d * alpha;
    });
    pos.needsUpdate = true;
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
```

## 4 - Animation loop example

Now I am going to want to make some kind of animation example of what I have worked out thus far when it comes to mutating the values of a buffer geometry position attribute. In this example I am not suing the set vertex and set triangle helpers to create an update box geometry helper. In this helper method I am doing the same thing that I did for my example on the set tri helper, only I worked out a way to do so in a while loop rather than a whole bunch of lines calling the ti method over and over again. The one major different in this update method beyond that is that I can also pass a percent value that can be used to set the state of an animation in terms of a value between 0 and 1.

When doing anything that involves mutating the geometry over an over again by changing values in the position attribute there is one thing that I must always do and that is to make sure that I always set the needs update boolean of the position attribute to true each time I change the values in the position array. Thus far doing so was not that important because I was just updating the geometry once, and that seems to work okay even if i do not make sure it is set to true. However now if I forget that step the geometry will update only once, and then not again on the next call of the animation function.

```js
(function () {
 
    // set location of a vert given an index value in geometry.index
    var setVert = function(geometry, vertIndex, pos){
        pos = pos || {};
        var posIndex = geometry.index.array[vertIndex] * 3,
        position = geometry.getAttribute('position');
        position.array[posIndex] = pos.x === undefined ? position.array[posIndex]: pos.x;
        position.array[posIndex + 1] = pos.y === undefined ? position.array[posIndex + 1]: pos.y;
        position.array[posIndex + 2] = pos.z === undefined ? position.array[posIndex + 2]: pos.z;
    };
 
    // set pos for tri index
    var setTri = function(geometry, triIndex, pos){
        pos = pos || {};
        var vertIndex = triIndex * 3;
        setVert(geometry, vertIndex, pos);
        setVert(geometry, vertIndex + 1, pos);
        setVert(geometry, vertIndex + 2, pos);
    };
 
    // update method for a box geo
    var updateBoxGeo = function(geometry, per){
        var bias = 1 - Math.abs(per - 0.5) / 0.5;
        var size = 0.5 + 1 * bias,
        position = geometry.getAttribute('position'),
        triCount = geometry.getIndex().count / 3,
        i = 0, pos, axis;
        while(i < triCount){
            axis = ['x', 'y', 'z'][Math.floor(i / 4)];
            pos = {};
            pos[axis] = size * ( i % 4 < 2 ? 1: -1);
            setTri(geometry, i, pos);
            i += 1;
        }
        // MUST SET THE needsUpdate prop of position to true
        position.needsUpdate = true;
    };
 
    // scene
    var scene = new THREE.Scene();
 
    // GEOMETRY
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    }));
    scene.add(mesh);
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(3, 3, 3);
    camera.lookAt(mesh.position);
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    var per = 0,
    lt = new Date(),
    maxFrames = 300,
    FPS = 30;
    var loop = function(){
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / FPS){
            per += 1 / (maxFrames / FPS) * secs;
            per %= 1;
            updateBoxGeo(geometry, per);
            renderer.render(scene, camera);
            lt = now;
        }
    };
    loop();
 
}
    ());
```

So then this animation works out the way that I would more or less expect it to the faces of each side of the cube move out from each other and then back again. There is the a whole bunch of other things that I could do when it comes to creating various other kinds of animations that are just slightly different use case of these basic helper functions.

## Conclusion

This week I think I will be focusing on the buffer geometry class more when it comes to continuing to learn a thing or two about using threejs in a client side javaScript project. There is a great deal more to learn about when it comes to making a custom geometry in threejs, or mutating one that has all ready been created using one of the built in geometry constructors. The position attribute is just one of many attributes that will come into play when creating custom geometry, in addition to position note worthy attributes are normals and uvs just to name a few.

However there might still be a great deal more to cover when it comes to just messing around with the position array, and creating such an array for a custom geometry. So at some point in the future I should come back around to expand this post even more with additional examples of the position attribute.
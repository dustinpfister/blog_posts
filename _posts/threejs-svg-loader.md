---
title: The SVG Loader in threejs
date: 2022-09-16 09:07:00
tags: [three.js]
layout: post
categories: three.js
id: 1005
updated: 2022-09-19 11:43:09
version: 1.13
---

There are a number of options for additional asset loaders in the Github Repository of threejs, one of which is the [SVG Loader](https://threejs.org/docs/index.html#examples/en/loaders/SVGLoader). Which is a way to go about loading a SVG file asset as an external file into a threejs project as a collection of paths that can then in turn be used to make [Shapes](https://threejs.org/docs/index.html#api/en/extras/core/Shape). These shapes can then be used with somehting like the [Shape Geometry](https://threejs.org/docs/#api/en/geometries/ShapeGeometry) or the [Extrude Geometry constructors](https://threejs.org/docs/index.html#api/en/geometries/ExtrudeGeometry).

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/rahl-F8m__Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The SVG Loader and what to know first

There is a lot that one will need to be aware of before hand when it comes to using these source code examples that I am writing about here. As always I assume that you have at least a little experience with client side javaScript and the underlying skills that are needed on top of that with HTML and CSS. However on top of that there are also a great deal of other features in the threejs library alone that you might want to play around with a little first also. I will of course not be getting into great detail with all of this in this post, but I will at least mention a few things in this section before getting into the first SVG Loader example.

### There is also knowing how to go about making an SVG file first

Although it might be best to still use some kind of image editor to create SVG Graphics, it is still possible to edit the values of SVG with just a plain old text editor as well. Whatever the case may be when it comes to making the SVG assets that you will like to load into threejs by way of the SVG loader, getting into every little detail about SVG is outside of the scope of this post. A few years back I wrote a [post on getting started with SVG](/2019/02/11/js-javascript-svg/) from the ground up which might prove to be a good starting point. There is also the [Modzilla Docs on SVG that do a great job covering everything with elements and attributes of SVG](https://developer.mozilla.org/en-US/docs/Web/SVG). 

### More than one file to use beyond just that of threejs alone

In these examples I am using more than one extral file beyond just that of the core threejs library. For one thing the SVG loader itself is not baked into the core of the threejs library, but rather it is an additional optional loader that can be [found in the examples folder of the threejs github repository](https://github.com/mrdoob/three.js/blob/r140/examples/js/loaders/SVGLoader.js). So I am linking to the threejs library and the SVGLoader.js file as well just when it comes to official code from the repo on Github. On top of that I am also linking to my own javaScript files on an example by example basis, and of course I am also loading one or more SVG files as well.

### Source code and SVG assets are up on my Github

The source code examples that I am writing about here, as well as the SVG assets, and additional notes and files [can be found in my test threejs repository up on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-svg-loader).

### Version Numbers Matter

When I first wrote this post I was using r140 of threejs which was released in May of 2022.


## 1 - Basic Shapes example of SVG Loader

Often I will want to use the Shape Geometry constructor as a way to go about adding svg to a threejs project. So then one way or another I will need to crate one or more Shape objects from the SVG data when loading an SVG file. The good news with this is that there is a static method of the SVG loader to help with this process.

So then when I create an instance of the SVG loader and call the load method of it, in the body of the callback function that I give the load method that will fire the file finishes loading I will have a data object. This data object will contain a property called paths that will be an array of [ShapePaths](https://threejs.org/docs/#api/en/extras/core/ShapePath). I can then loop over this paths array then and pass each instance of shapePaths to the THREE.SVGLoader.createShapes method, the returned result of this will then be an array of Shapes. I can then loop over this array of shapes and for each shape object I can use that as a way to create any kind of buffer geometry with a buffer geometry constructor that will take a shape as an argument, such as the THREE.ShapeGeometry constructor.

For this example on making shapes from loaded SVG data then I have a helper function that will create and return an array of shape geometries. I then have another helper function that will create an array of mesh objects by calling this other helper function that creates the array of shape geometries, then making a mesh object for each of them. 

For this example with the create mesh objects helper I am using the [basic material](/2018/05/05/threejs-basic-material/) for starters. Each time I create the instance of the basic material I can use the color data from the svg for each path for setting the defuse color for each basic material. Sense these are 2d shapes that I am adding into threejs I might want to set the [depthWrite](https://threejs.org/docs/#api/en/materials/Material.depthWrite) property to false. Also it would be a good idea to set the side property of the material to the THREE.DocubleSide constant.

```js
// shape SVG DEMO
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER, LIGHT
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(100, 100, 100);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // create an array of shape geometry from SVG data loaded with the SVGLoader
    const createShapeGeosFromSVG = (data, si, ei) => {
        si = si === undefined ? 0 : si;
        ei = ei === undefined ? data.paths.length: ei;
        const paths = data.paths.slice(si, data.paths.length);
        const geoArray = [];
        for ( let i = 0; i < paths.length; i ++ ) {
            const path = paths[ i ];
            // create a shape
            const shapes = THREE.SVGLoader.createShapes( path );
            // for each shape create a shape geometry and push it to the array
            for ( let j = 0; j < shapes.length; j ++ ) {
                const shape = shapes[ j ];
                // when calling the THREE.ShapeGeometry constructor I pass the shape
                // and then if I want the curveSegments to be higher or lower than the
                // default ( 12 ) I can pass that as the second argument.
                geoArray.push( new THREE.ShapeGeometry( shape, 8 ) );
            }
        }
        return geoArray;
    };
    // create mesh group from SVG
    const createMeshGroupFromSVG = (data, si, ei) => {
        si = si === undefined ? 0 : si;
        ei = ei === undefined ? data.paths.length: ei;
        const geoArray = createShapeGeosFromSVG(data, si, ei);
        const group = new THREE.Group();
        geoArray.forEach( (geo, i) => {
            // each mesh gets its own material
            const material = new THREE.MeshBasicMaterial( {
                color: data.paths[si + i].color, // using paths data for color
                side: THREE.DoubleSide,
                depthWrite: false,
                wireframe: false
            });
            const mesh = new THREE.Mesh( geo, material );
            group.add(mesh);
        });
        return group;
    };
    //-------- ----------
    // SVG LOADER
    //-------- ----------
    // instantiate a loader
    const loader = new THREE.SVGLoader();
    // load a SVG resource
    loader.load(
        // resource URL
        '/forpost/threejs-svg-loader/svg/fff2.svg',
        // called when the resource is loaded
        function ( data ) {
            var group = createMeshGroupFromSVG(data, 1);
            scene.add(group);
            // render
            renderer.render(scene, camera);
        },
        // called when loading is in progresses
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
            console.log(error)
        }
    );
}());
```

## 2 - Merge Geometry Example

When it comes to loading in SVG data often I will have more than one shape, that will result in more than one shape geometry. This will also mean that I will need to have a group of mesh objects for each shape. Although in many cases this will work fine, and in some cases it will actually be what I want to happen, there may be some situations in which I will want to merge all these shape geometries into one single geometry.

One way to do this is to use the merge buffer geometries method of the [buffer geometry utils](https://threejs.org/docs/#examples/en/utils/BufferGeometryUtils). This buffer geometry utils is yet another feature that is not baked into the core of threejs itself but must be added by loading an additional external file on top of threejs that can be found in the [threejs Github repo](https://github.com/mrdoob/three.js/blob/r140/examples/js/utils/BufferGeometryUtils.js).

```js
// SVG LOAD demo using THREE.BufferGeometryUtils.mergeBufferGeometries
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER, LIGHT
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // create an array of shape geometry from SVG data loaded with the SVGLoader
    const createShapeGeosFromSVG = (data, si, ei) => {
        si = si === undefined ? 0 : si;
        ei = ei === undefined ? data.paths.length: ei;
        const paths = data.paths.slice(si, data.paths.length);
        const geoArray = [];
        for ( let i = 0; i < paths.length; i ++ ) {
            const path = paths[ i ];
            // create a shape
            const shapes = THREE.SVGLoader.createShapes( path );
            // for each shape create a shape geometry and push it to the array
            for ( let j = 0; j < shapes.length; j ++ ) {
                const shape = shapes[ j ];
                // when calling the THREE.ShapeGeometry constructor I pass the shape
                // and then if I want the curveSegments to be higher or lower than the
                // default ( 12 ) I can pass that as the second argument.
                geoArray.push( new THREE.ShapeGeometry( shape, 16 ) );
            }
        }
        return geoArray;
    };
    // create a single mesh from SVG data
    const createGeoFromSVG = (data, si, ei) => {
        const geoArray = createShapeGeosFromSVG(data, si, ei)
        const geo = THREE.BufferGeometryUtils.mergeBufferGeometries(geoArray);
        return geo;
    };
    //-------- ----------
    // GRID
    //-------- ----------
    const grid = new THREE.GridHelper(10, 10, 0xffffff, 0xff0000);
    grid.material.linewidth = 3;
    grid.material.transparent = true;
    grid.material.opacity = 0.25;;
    scene.add(grid);
    //-------- ----------
    // SVG LOADER
    //-------- ----------
    // instantiate a loader
    const loader = new THREE.SVGLoader();
    // load a SVG resource
    loader.load(
        // resource URL
        '/forpost/threejs-svg-loader/svg/fff2.svg',
        // called when the resource is loaded
        function ( data ) {
            // create a single geo
            const geo = createGeoFromSVG(data, 1);
            geo.center();
            geo.scale(0.1, 0.1, 0.1);
            // create a
            const mesh = new THREE.Mesh( geo, new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide
            }));
            scene.add(mesh);
            renderer.render(scene, camera);
        },
        // called when loading is in progresses
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
            console.log(error)
        }
    );
}());
```

## 3 - Extrude Geometry Example

There are other options for creating a geometry from a shape other than that of the THREE.ShapeGeometry constructor, one of which would be the THREE.ExtrudeGeometry constructor. This allows me to create a geometry that is like that of the 2d plain kind of shape of the shape geometry, but I can add a depth option that will extrude out the 2d shape. I have found that when doing so I want to disable bevel and also adjust the options for curveSegments and steps.

```js
// Extrude Geo
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER, LIGHT
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(100, 100, 100);
    camera.lookAt(0, -0.1, 0);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(2, 1, 3)
    scene.add(dl);
    const al = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(al);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // create an array of Extrude geometry from SVG data loaded with the SVGLoader
    const createExtrudeGeosFromSVG = (data, si, ei) => {
        si = si === undefined ? 0 : si;
        ei = ei === undefined ? data.paths.length: ei;
        //const paths = data.paths;
        const paths = data.paths.slice(si, data.paths.length);
        const geoArray = [];
        for ( let i = 0; i < paths.length; i ++ ) {
            const path = paths[ i ];
            // create a shape
            const shapes = THREE.SVGLoader.createShapes( path );
            // for each shape create a mesh and add it to the group
            for ( let j = 0; j < shapes.length; j ++ ) {
                const shape = shapes[ j ];
                geoArray.push( new THREE.ExtrudeGeometry( shape, {
                    curveSegments: 20,
                    steps: 20,
                    depth: 10,
                    bevelEnabled: false,
                }));
            }
        }
        return geoArray;
    };
    // create mesh group from SVG
    const createMeshGroupFromSVG = (data, si, ei) => {
        const geoArray = createExtrudeGeosFromSVG(data, si, ei);
        const group = new THREE.Group();
        geoArray.forEach( (geo, i) => {
            // each mesh gets its own material
            const material = new THREE.MeshPhongMaterial( {
                color: data.paths[si + i].color // using paths data for color
            });
            const mesh = new THREE.Mesh( geo, material );
            group.add(mesh);
        });
        return group;
    };
    //-------- ----------
    // OBJECTS
    //-------- ----------
    let group;
    //-------- ----------
    // LOOP
    //-------- ----------
    let fps = 30,
    degree = 0,
    lt = new Date();
    const loop = function () {
        let now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            group.rotation.y = Math.PI / 180 * degree;
            degree += 20 * secs;
            degree %= 360;
            // render
            renderer.render(scene, camera);
            lt = now;
        }
    };
    //-------- ----------
    // SVG LOADER
    //-------- ----------
    // instantiate a loader
    const loader = new THREE.SVGLoader();
    // load a SVG resource
    loader.load(
        // resource URL
        '/forpost/threejs-svg-loader/svg/fff2.svg',
        // called when the resource is loaded
        function ( data ) {
            group = createMeshGroupFromSVG(data, 1);
            scene.add(group);
            // start loop
            loop();
        },
        // called when loading is in progresses
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
            console.log(error)
        }
    );
}());
```

## 4 - data textures, and custom uv generator

So at this point I have covered the basics of using the SVG loader, and that there is creating extrude geometry which is one option as to what can be done with the loaded data. I have all ready covered a basic example of using extrude geometry that seems to work okay, but there is just one little problem that comes up when trying to add some texture to the geometry. With that said I will some times need to work out a custom way to generate the [UV attribute](/2021/06/09/threejs-buffer-geometry-attributes-uv/) of the extrude geometry.

Also speaking of textures one way or another I will need to create some textures to use with the materials that will be used for the mesh objects. There are many options for this sort of thing such as also using the [texture loader](/2021/06/21/threejs-texture-loader/) to load in textures that are in the from of external image files. However there is also a few ways to create some texture by way of a little javaScript code such as [canavs textures](/2018/04/17/threejs-canvas-texture/), or for the sake of this example [data textures](/2022/04/15/threejs-data-texture/).

### 4.2 - Data textures module

This is what I have together for a general data texture module that has been serving me well thus far in various projects. I have a few options here that allow for me to create a data texture on a pixle by pixle basis, one such method I can all directly, and another I can give data that is a color index for each pixle location called fromPXDATA. I have another function that uses the THREE.MathUtils.seededRandom method as a way to create a random noise texture.

```js
// ********** **********
// data textures
// module for creating data textures
// ********** **********
var datatex = (function () {
    var api = {};
    // mk data texture helper
    api.mkDataTexture = function (data, w) {
        data = data || [];
        w = w || 0;
        var width = w, //20,
        height = data.length / 4 / w;
        var texture = new THREE.DataTexture(data, width, height);
        texture.needsUpdate = true;
        return texture;
    };
    // create a data texture with a method that will be called for each pix
    api.forEachPix = function (w, h, forEach) {
        var width = w === undefined ? 5 : w,
        height = h === undefined ? 5 : h;
        var size = width * height;
        var data = new Uint8Array(4 * size);
        for (let i = 0; i < size; i++) {
            var stride = i * 4;
            var x = i % width;
            var y = Math.floor(i / width);
            var obj = forEach(x, y, w, h, i, stride, data);
            obj = obj || {};
            data[stride] = obj.r || 0;
            data[stride + 1] = obj.g || 0;
            data[stride + 2] = obj.b || 0;
            data[stride + 3] = obj.a === undefined ? 255: obj.a;
        }
        return api.mkDataTexture(data, width)
    };
    // from px data method
    api.fromPXDATA = function(pxData, width, palette){
        palette = palette || [
            [0,0,0,255],
            [255,255,255,255]
        ];
        var height = Math.floor(pxData.length / width);
        return api.forEachPix(width, height, function(x, y, w, h, i){
            var obj = {};
            var colorIndex = pxData[i];
            var color = palette[colorIndex];
            obj.r = color[0];
            obj.g = color[1];
            obj.b = color[2];
            obj.a = color[3];
            return obj;
        });
    };
    // simple gray scale seeded random texture
    api.seededRandom = function (w, h, rPer, gPer, bPer, range) {
        w = w === undefined ? 5 : w,
        h = h === undefined ? 5 : h;
        rPer = rPer === undefined ? 1 : rPer;
        gPer = gPer === undefined ? 1 : gPer;
        bPer = bPer === undefined ? 1 : bPer;
        range = range || [0, 255]
        var size = w * h;
        var data = new Uint8Array(4 * size);
        for (let i = 0; i < size; i++) {
            var stride = i * 4;
            var v = Math.floor(range[0] + THREE.MathUtils.seededRandom() * (range[1] - range[0]));
            data[stride] = v * rPer;
            data[stride + 1] = v * gPer;
            data[stride + 2] = v * bPer;
            data[stride + 3] = 255;
        }
        return api.mkDataTexture(data, w);
    };
    // return the api
    return api;
}
    ());
```

### 4.1 - Main javaScript file

So the general idea here is to create some textures, and also to come up with a custom UV Generator functions for the extrude geometry that will be used with the SVG data.

```js
// Extrude Geo, Custom UV Generator and data textures
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER, LIGHT
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(0, 0, 3.5);
    camera.lookAt(0, -0.1, 0);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(2, 1, 3)
    scene.add(dl);
    const al = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(al);
    //-------- ----------
    // UVGenerator
    //-------- ----------
    let i = 0;
    const UVGenerator = {
        generateTopUV: function ( geometry, vertices, indexA, indexB, indexC ) {
            const n = 1;
            const a_x = vertices[ indexA * n ];
            const a_y = vertices[ indexA * n + 1 ];
            const b_x = vertices[ indexB * n ];
            const b_y = vertices[ indexB * n + 1 ];
            const c_x = vertices[ indexC * n ];
            const c_y = vertices[ indexC * n + 1 ];
            return [
                new THREE.Vector2( a_x % 1, a_y % 1 ),
                new THREE.Vector2( b_x % 1, b_y % 1 ),
                new THREE.Vector2( c_x % 1, c_y % 1 )
            ];
        },
        generateSideWallUV: function ( geometry, vertices, indexA, indexB, indexC, indexD ) {
            const n = 2;
            const a_x = vertices[ indexA * n ];
            const a_y = vertices[ indexA * n + 1 ];
            const a_z = vertices[ indexA * n + 2 ];
            const b_x = vertices[ indexB * n ];
            const b_y = vertices[ indexB * n + 1 ];
            const b_z = vertices[ indexB * n + 2 ];
            const c_x = vertices[ indexC * n ];
            const c_y = vertices[ indexC * n + 1 ];
            const c_z = vertices[ indexC * n + 2 ];
            const d_x = vertices[ indexD * n ];
            const d_y = vertices[ indexD * n + 1 ];
            const d_z = vertices[ indexD * n + 2 ];
            if ( Math.abs( a_y - b_y ) < Math.abs( a_x - b_x ) ) {
                return [
                    new THREE.Vector2( a_x % 1, (1 - a_z) % 1 ),
                    new THREE.Vector2( b_x % 1, (1 - b_z) % 1 ),
                    new THREE.Vector2( c_x % 1, (1 - c_z) % 1 ),
                    new THREE.Vector2( d_x % 1, (1 - d_z) % 1 )
                ];
            } else {
                return [
                    new THREE.Vector2( a_y % 1, (1 - a_z) % 1 ),
                    new THREE.Vector2( b_y % 1, (1 - b_z) % 1 ),
                    new THREE.Vector2( c_y % 1, (1 - c_z) % 1 ),
                    new THREE.Vector2( d_y % 1, (1 - d_z) % 1 )
                ];
            }
        }
    };
    //-------- ----------
    // HELPERS
    //-------- ----------
    // create an array of Extrude geometry from SVG data loaded with the SVGLoader
    const createExtrudeGeosFromSVG = (data) => {
        const paths = data.paths;
        const geoArray = [];
        for ( let i = 0; i < paths.length; i ++ ) {
            const path = paths[ i ];
            // create a shape
            const shapes = THREE.SVGLoader.createShapes( path );
            // for each shape create a mesh and add it to the group
            for ( let j = 0; j < shapes.length; j ++ ) {
                const shape = shapes[ j ];
                geoArray.push( new THREE.ExtrudeGeometry( shape, {
                    curveSegments: 20,
                    steps: 20,
                    depth: 10,
                    bevelEnabled: false,
                    UVGenerator: UVGenerator
                }));
            }
        }
        return geoArray;
    };
    // create mesh group from SVG
    const createMeshGroupFromSVG = (data) => {
        const geoArray = createExtrudeGeosFromSVG(data);
        const group = new THREE.Group();
        geoArray.forEach( (geo, i) => {
            // each mesh gets its own materials
            const materials = [ 
                new THREE.MeshPhongMaterial({  // face material
                    color: data.paths[i].color,
                    map : datatex.seededRandom(512, 512, 1, 1, 1, [128, 255]),
                    wireframe: false
                }),
                new THREE.MeshPhongMaterial({ // sides material
                    color: new THREE.Color(1, 0, 0.2),
                    map: datatex.fromPXDATA([
                        2,1,0,1,2,1,0,0,
                        0,1,2,0,0,1,2,0,
                        2,1,0,1,2,1,0,0,
                        0,1,2,0,0,1,2,0,
                        2,1,0,1,2,1,0,0,
                        0,1,2,0,0,1,2,0,
                        2,1,0,1,2,1,0,0
                    ], 8, [ [255,255,255,255], [200,200,200,255], [100,100,100,255] ]),
                    wireframe: false
                })
            ];
            const mesh = new THREE.Mesh( geo, materials );
            group.add(mesh);
        });
        return group;
    };
    //-------- ----------
    // OBJECTS
    //-------- ----------
    let group;
    //-------- ----------
    // LOOP
    //-------- ----------
    let fps = 30,
    d1 = -20,
    d2 = 0,
    lt = new Date();
    const loop = function () {
        let now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            group.rotation.x = Math.PI / 180 * d1;
            group.rotation.y = Math.PI / 180 * d2;
            d2 += 20 * secs;
            d2 %= 360;
            // render
            renderer.render(scene, camera);
            lt = now;
        }
    };
    //-------- ----------
    // SVG LOADER
    //-------- ----------
    // instantiate a loader
    const loader = new THREE.SVGLoader();
    // load a SVG resource
    loader.load(
        // resource URL
        '/forpost/threejs-svg-loader/svg/fff.svg',
        // called when the resource is loaded
        function ( data ) {
            group = createMeshGroupFromSVG(data);
            // get min and max of children
            let xMin = Infinity, xMax = -Infinity;
            let yMin = Infinity, yMax = -Infinity;
            let zMin = Infinity, zMax = -Infinity;
            group.children.forEach( (mesh) => {
                const geo = mesh.geometry;
                geo.computeBoundingBox();
                const b = geo.boundingBox;
                xMin = b.min.x < xMin ? b.min.x: xMin;
                xMax = b.max.x > xMax ? b.max.x: xMax;
                yMin = b.min.y < yMin ? b.min.y: yMin;
                yMax = b.max.y > yMax ? b.max.y: yMax;
                zMin = b.min.z < zMin ? b.min.z: zMin;
                zMax = b.max.z > zMax ? b.max.z: zMax;
            });
            const xRange = xMax - xMin;
            const yRange = yMax - yMin;
            const zRange = zMax - zMin;
            group.children.forEach( (mesh) => {
                mesh.geometry.translate(xRange / 2 * -1, yRange / 2 * -1, zRange / 2 * -1);
                mesh.rotateX(Math.PI)
            });
            group.scale.normalize().multiplyScalar(0.025);
            scene.add(group);
            // start loop
            loop();
        },
        // called when loading is in progresses
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
            console.log(error)
        }
    );
}());
```

## 5 - Just working with Paths

In this section I have worked out a number of examples that have to do with just working with the paths data for doing all kinds of various not so typical tasks with SVG data. That is that often I will want to just create a single geometry, or a group of geometries from the SVG data to make one or more mesh objects. However in some cases I might want to do something else with the path data that is not so typical.

### 5.1 - Box3 from Path

One thing that can be done is to create an array of points from the path data by which I mean an array of THREE.Vector3 class instances. After doing so I can use this kind of array to create a buffer geometry by making use of the set from points method of the buffer geometry class. Once I have a buffer geometry class I can do something like call the compute bounding box method to get an instance of Box3 that I can then use with the box3 helper.

```js
// Paths SVG DEMO
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER, LIGHT
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(250, 250, 250);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // SVG LOADER
    //-------- ----------
    // instantiate a loader
    const loader = new THREE.SVGLoader();
    // load a SVG resource
    loader.load(
        // resource URL
        '/forpost/threejs-svg-loader/svg/fff.svg',
        // called when the resource is loaded
        function ( data ) {
            // create box3 for each path as bounding box for Buffer Geometry created from points
            data.paths.forEach((path)=>{
                const points = path.subPaths[0].getPoints();
                const geo = new THREE.BufferGeometry().setFromPoints(points);
                geo.computeBoundingBox();
                const helper = new THREE.Box3Helper(geo.boundingBox);
                scene.add(helper);
            });
            renderer.render(scene, camera);
        },
        // called when loading is in progresses
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
            console.log(error)
        }
    );
}());
```

### 5.2 - create mesh objects for each point

So making a buffer geometry from an array of points and the calling the bound box method of the geometry is one thing. However another thing that comes to mind is to use this array of Vector2 class instances as a way to create a bunch of mesh objects for each point.

```js
// Paths SVG DEMO
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER, LIGHT
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(150, 150, 150);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // SVG LOADER
    //-------- ----------
    // instantiate a loader
    const loader = new THREE.SVGLoader();
    // load a SVG resource
    loader.load(
        // resource URL
        '/forpost/threejs-svg-loader/svg/fff.svg',
        // called when the resource is loaded
        function ( data ) {
            // get minMax value for all paths
            const minMax =  data.paths.reduce( (acc, path)=>{
                path.subPaths[0].getPoints().forEach((v2)=>{
                    if(v2.x < acc.xMin){
                        acc.xMin = v2.x;
                    }
                    if(v2.x > acc.xMax){
                        acc.xMax = v2.x;
                    }
                    if(v2.y < acc.yMin){
                       acc.yMin = v2.y;
                    }
                    if(v2.y > acc.yMax){
                        acc.yMax = v2.y;
                    }
                });
               return acc;
            }, {xMin: Infinity, xMax: -Infinity, yMin: Infinity, yMax: -Infinity});
            // create a group of mesh objects using each Vector2 of eash path
            const group = new THREE.Group();
            data.paths.forEach(function(path){
                //const path = path.subPaths[0];
                const points = path.subPaths[0].getPoints();
                // create a mesh for each point
                points.forEach(function(v2){
                    const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 10), new THREE.MeshNormalMaterial());
                    mesh.position.set(v2.x - minMax.xMax / 2, v2.y - minMax.yMax / 2, 0);
                    group.add(mesh);
                });
            });
            scene.add(group);
            group.rotation.x = Math.PI;
            renderer.render(scene, camera);
        },
        // called when loading is in progresses
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
            console.log(error)
        }
    );
}());
```

## 6 - Points

Yet even another options would be to create an instance of Points rather than the usual Mesh objects. When it comes to this I am limited in terms of materials as there is only one option which is the [Points Material](/2018/05/12/threejs-points-material/). The only options that I might set for this kind of material are size and color. As I covered in the above examples in the paths option there is not using points and points material by rather  running over the array of vector2 class instances and creating a mesh object for each point. When doing things that way I can use any build in geometry constructor and thus any mesh material that I want. 

```js
// Points SVG DEMO
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER, LIGHT
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(100, 100, 100);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // SVG LOADER
    //-------- ----------
    // instantiate a loader
    const loader = new THREE.SVGLoader();
    // load a SVG resource
    loader.load(
        // resource URL
        '/forpost/threejs-svg-loader/svg/fff2.svg',
        // called when the resource is loaded
        function ( data ) {
            const paths = data.paths.slice( 1, data.paths.length);
            // create points for each path
            paths.forEach((path)=>{
                const geo = new THREE.BufferGeometry().setFromPoints( path.subPaths[0].getPoints() );
                const material = new THREE.PointsMaterial({size: 3, color: 0x00ff00});
                const points = new THREE.Points(geo, material);
                scene.add(points);
            });
            renderer.render(scene, camera);
        },
        // called when loading is in progresses
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
            console.log(error)
        }
    );
}());
```

## 7 - Lines

What if I just want to create some [Lines](/2018/04/19/threejs-line/) with the SVG data, for that one option might be to use the THREE.Line constructor in place of mesh. When doing so I have two options in terms of materials, one of which is the Line Basic material which is what I would typically use. When setting options for the line basic material certain options will only work with certain platforms and renderers. For the most part then it is only color and the fog Boolean that will work for most renderers and platforms.

```js
// Lines SVG DEMO
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER, LIGHT
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(120, 120, 120);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // SVG LOADER
    //-------- ----------
    // instantiate a loader
    const loader = new THREE.SVGLoader();
    // load a SVG resource
    loader.load(
        // resource URL
        '/forpost/threejs-svg-loader/svg/fff.svg',
        // called when the resource is loaded
        function ( data ) {
            // create a Line for each path
            data.paths.forEach((path)=>{
                const geo = new THREE.BufferGeometry().setFromPoints( path.subPaths[0].getPoints() );
                geo.translate(-90,-80,0);
                geo.rotateX(Math.PI);
                // setting custom line width, this will not work on some platforms
                const material = new THREE.LineBasicMaterial({ linewidth: 6, color: 0xff0000 });
                const line = new THREE.Line(geo, material);
                scene.add(line);
            });
            renderer.render(scene, camera);
        },
        // called when loading is in progresses
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
            console.log(error)
        }
    );
}());
```

## Conclusion

The SVG loader is then the official file for loading in SVG data and doing something with the 2d path data that is given in the data result object when loading works fine with the SVG. There is then a number of things that can be done with this 2d path data, that are typical of doing so and also maybe not so typical. For one thing I can do something like create a 2d shape geometry, or an extrude geometry. when doing so things can end up getting a little involved when it comes to getting textures to work they way that I want them to though. There is then also doing things that are maybe not so typical such as using SVG path data as a way to define paths in which I would like to move objects over time. There are all kinds of things that I can do with the array of Vector2 class instances beyond just that of simply making shapes.

Still there are limitations to what can be done with SVG, or things prove to be a little to complex compared to other options. There is not just importing SVG into threejs, but rather importing it into a program like that of blender, and then doing what I need to do in order to [create a DAE file](/2021/04/30/threejs-dae-collada-loader/) from there. In blender I can work out what the deal should be not just with extrusion if that is what I am to do with it, but also it is easier to work out what the deal should be with respect to things like UV Mapping.

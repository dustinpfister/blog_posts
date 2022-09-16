---
title: The SVG Loader in threejs
date: 2022-09-16 09:07:00
tags: [three.js]
layout: post
categories: three.js
id: 1005
updated: 2022-09-16 14:50:46
version: 1.6
---

There are a number of options for additional asset loaders in the Github Repository of threejs, one of which is the [SVG Loader](https://threejs.org/docs/index.html#examples/en/loaders/SVGLoader). Which is a way to go about loading a SVG file asset as an external file into a threejs project as a collection of paths that can then in turn be used to make [Shapes](https://threejs.org/docs/index.html#api/en/extras/core/Shape). These shapes can then be used with somehting like the [Shape Geometry](https://threejs.org/docs/#api/en/geometries/ShapeGeometry) or the [Extrude Geometry constructors](https://threejs.org/docs/index.html#api/en/geometries/ExtrudeGeometry).

<!-- more -->


## The SVG Loader and what to know first

There is a lot that one will need to be aware of before hand when it comes to using these source code exmaples that I am wriitng about here. As always I assume that you have at least a little expernce with client side javaScript and the underlaying skills that are needed on top of that with HTML and CSS. However on top of that there are also a great deal of other features in the threejs libray alone that you might want to play around with a little first also. I wil of course not be getting into great detail with all of this in this post, but I will at least mentine a few things in this section before getting into the first SVG Loader example.

### There is also knowing how to go about making an SVG file first

Although it might be best to still use some kind of image editor to create SVG Graphics, it is still possible to edit the values of SVG with just a plain old text editor as well. Whatever the case may be when it comes to making the SVG assets that you will like to load into threejs by way of the SVG loader, getting into every little detail about SVG is outside of the scope of this post. A few years back I wrote a [post on getting started with SVG](/2019/02/11/js-javascript-svg/) from the ground up which might prove to be a good starting point. There is also the [Modzilla Docs on SVG that do a great job covering everything with elements and attributes of SVG](https://developer.mozilla.org/en-US/docs/Web/SVG). 

### More than one file to use beyond just that of threejs alone

In these examples I am using more than one extral file beyond just that of the core threejs librray. For one thing the SVG loader itself is not baked into the core of the threejs librray, but rather it is an addtional optional loader that can be [found in the examples folder of the threejs github reposatory](https://github.com/mrdoob/three.js/blob/r140/examples/js/loaders/SVGLoader.js). So I am linking to the threejs library and the SVGLoader.js file as well just when it comes to offical code from the repo on Github. On top of that I am also linking to my own javaScript files on an example by example basis, and of course I am also loading one or more SVG files as well.

### Source code and SVG assets are up on my Github

The source code examples that I am writing about here, as well as the SVG asssets, and addtonal notes and files [can be found in my test threejs reposatory up on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-svg-loader).

### Version Numbers Matter

When I first wrote this post I was using r140 of threejs which was released in May of 2022.


## 1 - Basic Shapes example of SVG Loader

Often I will want to use the Shape Geometry constructor as a way to go about adding svg to a threejs project. So then one way or another I will need to crate one or more Shape objects from the SVG data when loading an SVG file. The good news with this is that there is a static method of the SVG loader to help with this process.

So then when I create an instance of the SVG loader and call the load method of it, in the body of the callback function that I give the load method that will fire the file finishes loading I will have a data object. This data object will contain a property called paths that will be an array of [ShapePaths](https://threejs.org/docs/#api/en/extras/core/ShapePath). I can then loop over this paths array then and pass each instance of shapePaths to the THREE.SVGLoader.createShapes method, the returned result of this will then be an array of Shapes. I can then loop over this array of shapes and for eahc shape object I can use that as a way to create any kind of buffer geometry with a buffer geomerty constrcuor that will take a shape as an argument, such as the THREE.ShapeGeometry constructor.

For this example on making shapes from loaded SVG data then I have a helper function that will create and return an array of shape geomerties. I then have another helper function that will create an array of mesh objects by calling this other helper function that creates the array of shape geomeries, then making a mesh object for each of them. 

For this example with the create mesh objects helper I am using the [basic material](/2018/05/05/threejs-basic-material/) for starters. Each time I create the instance of the basic material I can use the color data from the svg for each path for setting the defuse color for each basic material. Sense these are 2d shapes that I am addine into threejs I might want to set the [depthWrite](https://threejs.org/docs/#api/en/materials/Material.depthWrite) property to false. Also it would be a good idea to set the side peoperty of the material to the THREE.DocubleSide constant.

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

When it comes to loading in SVG data often I will have more than one shape, that will result in more than one shape geometry. This will also mean that I will need to have a group of mesh objects for each shape. Although in many cases this will work fine, and in some cases it will actaully be what I want to happen, there may be some situaitons in which I will want to merge all these shape geomeryties into one singel geomerty.

One way to do this is to use the merge buffer geomerties method of the [buffer geometry utils](https://threejs.org/docs/#examples/en/utils/BufferGeometryUtils). This buffer geomety utils is yet another feature that is not baked into the core of threejs istelf but must be added by loading an addtional external file on top of threejs that can be found in the [threejs Github repo](https://github.com/mrdoob/three.js/blob/r140/examples/js/utils/BufferGeometryUtils.js).

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

There are other options for createing a geometry from a shape other than that of the THREE.ShapeGeometry constructor, one of which would be the THREE.ExtrudeGeometry constructor. This allows me to create a geometry that is like that of the 2d plain kind of shape of the shape geometry, but I can add a depth option that will extrdue out the 2d shape. I have found that when doing so I want to disbale bevel and also adjust the options for curveSegments and steps.

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

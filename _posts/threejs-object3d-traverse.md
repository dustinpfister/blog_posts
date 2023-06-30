---
title: Loop over all objects in a threejs scene with the Object3d traverse method
date: 2021-06-03 12:17:00
tags: [three.js]
layout: post
categories: three.js
id: 881
updated: 2023-06-30 08:55:12
version: 1.32
---

If for some reason I want to [loop over all objects](https://discourse.threejs.org/t/to-get-array-of-all-meshes/17458/2) in a [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) scene, or all the objects attached to any single object I can use the [object3d traverse](https://threejs.org/docs/index.html#api/en/core/Object3D.traverse) method. The way this works is I just call the traverse method off of the [scene object](/2018/05/03/threejs-scene/), or any object based off the object3d class for that matter, and pass a [callback function](/2019/02/27/js-javascript-constructor/) as the first argument. This call back function will then be called for every nested child attached to the object that I call traverse off of, including the object itself. A reference to the current object will be passed as the first argument of the given callback function and it is then in the body of this function that I can preform whatever action I want to happen for all nested child objects as well as the root oject itself.

So then in this post I will be going over the use of the traverse method of the object3d class. In the process of doing so I will also be touching base on a wide range of other topics of interest that will branch off from the use of this method. There are things like the [type property](/2022/04/01/threejs-object3d-type/) of the object3d class that come to mind when it comes to checking out what kind of object it is that I am dealing with for example.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/bwvEvFPfwTs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Looping over all objects using Object3d traverse and what to know first

This is a post centered on using just one little method in the object3d class in the javaScript library known as threejs, as well as a whole bunch of other little things that might branch off from this method. This is then not a [getting started type post on threejs](/2018/04/04/threejs-getting-started/) so I assume that you have the basics of the library out of the way so far. However in any case in this section I will be going over some things that you might want to get solid with before continuing to read the rest of this post.

### Take a look at the object3d class in general

There is a lot to write about when it comes to the object3d class, and the traverse method is just one little item of interest. So it would be a good idea to maybe check out [my post on the object3d class in general](/2018/04/23/threejs-object3d/) if you have some time to get into the thick of it with this class. Doing so is called for sooner or later when it comes to gaining a solid understanding of the library as the object3d class is a base class that apples to a lot of objects in the library such as Mesh objects, Groups, and even the main scene object.

### Source code is up on Github

The source code examples here [can also be found on github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-object3d-traverse) in my test threejs repo. This is also where I park the source code for my many other [blog posts on threejs](/categories/three-js/).

### Check the version numbers, always

This is something that I think that I just need to mention in every post I write on threejs, which is the version that I was using when I wrote this post. with that said when I frst wrote this post I was using r127. Sense then I edited this post a number of times here and there and the last time that I came around to do some editing I was [using r146 and thus updated the examples to a style](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md) I set for that revision. Threejs is a library that as of this writing is still moving very fast when it comes to development, and code breaking changes are made to the library often.

## 1 - Basic examples of Object3d.traverse

So first off this will be just a few basic examples of the object3d traverse method just for the sake of getting started with this method. The focus here will be on using the method along of course, but also closely related topics to the use of the methods such as the object3d type property, the user data object, and other ways to find a given kind of object as I loop over all objects from a given starting point such as the scene object.

### 1.1 - Loop Over all objects in a Scene Object checking type

In this example I am creating a main scene object and then I am adding some grid helpers objects to the scene. These grid helper objects are based off of the object3d class so they will show up in the traverse call that I will be using later in the source code. On top of the helpers I am also adding a group, and this group will have a whole bunch of children, each of which will be an instance of a Mesh object. After that I am also adding a camera to the scene when it comes to setting up the camera, and the renderer that I will be using.

So then before I call the render method of my webgl renderer instance I call the traverse method off of the scene object and then pass a function that I want to call for every object attached to the scene object as a child. This will not just call for all the children, but also all the children of children which is the case for the group of mesh objects that I attached. In the body of the function I can preforming an action for each mesh object, but also the group object itself if I want. One way to know what I am dealing with would be to take a look at the type property of each object3d based object as I am doing in this example.

```js
// SCENE, CAMERA, RENDERER
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.1, 1000);
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
scene.add(camera); // ADDING CAMERA OBJECT TO THE SCENE
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ---------
// ADDING GRID HELPERS TO THE SCENE
//-------- ---------
const helper1 = new THREE.GridHelper(10, 10, 'white', '#2a2a2a');
scene.add(helper1);
const helper2 = new THREE.GridHelper(10, 10, 'white', '#2a2a2a');
helper2.rotation.z = Math.PI * 0.5;
scene.add(helper2);
//-------- ---------
// HELPER
//-------- ---------
const getRNDAxisValue = () => {
    return 0.5 + -5 + Math.floor(10 * Math.random());
}
//-------- ---------
// ADDING A GROUP OF MESH OBJECTS
//-------- ---------
const group = new THREE.Group();
let i = 20;
while(i--){
    group.add( new THREE.Mesh( new THREE.BoxGeometry(1,1, 1), new THREE.MeshNormalMaterial() ));
}
scene.add( group );
//-------- ---------
// TRAVERSING ALL OBJECTS IN THE SCENE
//-------- ---------
scene.traverse(function(obj){
    // for all grid helpers in scene
    if(obj.type === 'GridHelper'){
        obj.material.color = new THREE.Color(1, 0, 0);
    }
    // for all mesh objects in scene
    if(obj.type === 'Mesh'){
        obj.position.x = getRNDAxisValue();
        obj.position.z = getRNDAxisValue();
        obj.position.y = getRNDAxisValue();
    }
});
//-------- ---------
// RENDER
//-------- ---------
renderer.render(scene, camera);
```

So then this should help to show the basic idea of what the traverse method is all about. It is a little more advanced than just looping over the children of an object as the traverse method will loop over the children, the children of children, and it will also include the object itself.

### 1.2 - User Data object example

On top of the type property that can be checked to find out what I am dealing with when looking over all the objects of a scene, there is also making use of the [user data object](/2021/02/16/threejs-userdata/) as well. Simply put the user data object of the object3d class is a standard location to park user defined data for objects. In other words data and values that have to do with my javaScript code, rather than the javaScript code of the internal workings of the threejs library.

```js
//-------- ---------
// SCENE, CAMERA, RENDERER
//-------- ---------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.2, 0.2, 0.2);
const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.1, 1000);
camera.position.set(7, 7, 7);
camera.lookAt(0, 0, 0);
scene.add(camera); // ADDING CAMERA OBJECT TO THE SCENE
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ---------
// LIGHT
//-------- ---------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(4, 1, 7);
scene.add(dl);
//-------- ---------
// HELPERS
//-------- ---------
const makeCube = (opt)=> {
    opt = opt || {};
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(opt.size,opt.size,opt.size),
        new THREE.MeshStandardMaterial());
    // USER DATA OF MESH OBJECT
    const mud = mesh.userData;
    mud.color = opt.color || new THREE.Color(1,1,1);
    const a = Math.PI / 180 * 45 + Math.PI / 180 * 90 * Math.random();
    const b = Math.PI * 2 * Math.random();
    mud.dir = new THREE.Vector3(0,0,1).applyEuler( new THREE.Euler(a, b, 0) );
    mud.alpha = 0;
    setCube(mesh);
    return mesh;
};
const setCube = (mesh)=> {
    const mud = mesh.userData;
    // set color and pos
    mesh.material.color = mud.color;
    // set position
    const unitLength = 5 * mud.alpha;
    mesh.position.copy( mud.dir.clone().multiplyScalar(unitLength) );
}
//-------- ---------
// ADDING A OBJECTS
//-------- ---------
const len = 200;
let i = 0;
const colors = [
    new THREE.Color(1, 1, 1),
    new THREE.Color(1, 0, 0),
    new THREE.Color(0, 1, 0),
    new THREE.Color(0, 0, 1),
    new THREE.Color(1, 1, 0),
    new THREE.Color(1, 0, 1)
]
while(i < len){
    const mesh = makeCube({
        size: 0.1 + 0.9 * (i / len),
        color: colors[ i % colors.length]
    });
    scene.add(mesh);
    i += 1;
}
//-------- ---------
// TRAVERSING ALL OBJECTS IN THE SCENE
//-------- ---------
scene.traverse(function(obj){
    const ud = obj.userData;
    if(ud.dir){
        ud.alpha = Math.random();
        setCube(obj);
        obj.lookAt(0, 0, 0);
    }
});
//-------- ---------
// RENDER
//-------- ---------
renderer.render(scene, camera);
```

## 2 - Setting names for objects example

One use case example for traverse that comes to mind is that I can use it as a way to set name values for all objects of interest that are attached to a scene object. In this example I have a create cube method that will create and return a cube object with a cube group type set to the user data object of the mesh object that it is returned. I then have a create cube group helper that creates a collection of these cubes and also has a cube group type value set for the user data object of the group. I can then use these values parked in the user data object as a way to flag this object for the creation of a name. This is then done in the next method that does just that.

I can then get a reference to any of these group objects, or a single mesh of one of the group objects, or a single stand alone method with the get by name method. This get by name method is yet another useful method of the object3d class that is a way to go about getting referenced to objects in a scene by way of a name that is set by the developer. In other worlds a name is like an id when it comes to html elements, I can set a unique value for the object and then use that as a way to get a reference to it later on when needed.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 25);
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const createCube = function(){
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1),new THREE.MeshNormalMaterial());
    mesh.userData.cubeGroupType = 'Mesh';
    return mesh;
};
const createCubeGroup = function(id, count){
    const group = new THREE.Group();
    id = id || group.id;
    count = count || 10;
    let i = count;
    while(i--){
        group.add( createCube() );
    }
    group.userData.id = id;
    group.userData.count = count;
    group.userData.cubeGroupType = 'Group';
    return group;
};
const setNamesForScene = function(scene){
    let standAloneCount = 0;
    // TRAVERSING ALL OBJECTS IN THE SCENE
    scene.traverse(function(obj){        
        // SET NAMES FOR STAND ALONE MESH CUBES
        if(obj.userData.cubeGroupType === 'Mesh'){
            const parent = obj.parent;
            if(parent.type != 'Group'){
                if(obj.userData.cubeGroupType === 'Mesh'){
                    obj.name = 'mesh:' + standAloneCount;
                    standAloneCount += 1;
                    console.log(obj.name);
                }
            }
        }
        // SET NAMES FOR GROUPS AND MESH OBJECTS OF GROUPS
        if(obj.userData.cubeGroupType === 'Group'){
            obj.name = 'cubegroup:' + obj.userData.id;
            console.log(obj.name);
            obj.children.forEach(function(child, i){
                if(child.userData.cubeGroupType === 'Mesh'){
                    child.name = 'mesh:' + i + '_' + obj.name
                    console.log(child.name);
                }
            }); 
        }
    });     
};
const positionGroup = function(scene, groupId, y){
    const group = scene.getObjectByName('cubegroup:' + groupId);
    let i, len;
    y = y === undefined ? 0 : y;
    len = group.userData.count;
    i = len;
    while(i--){
        const mesh = group.getObjectByName('mesh:' + i + '_cubegroup:' + groupId),
        rad = Math.PI * 2 * ( i / len ),
        x = Math.cos(rad) * 5,
        z = Math.sin(rad) * 5;
        if(mesh){
            mesh.position.set(x, y, z);
        }
    }
};
//-------- ----------
// ADDING GRID HELPERS TO THE SCENE
//-------- ----------
const helper1 = new THREE.GridHelper(10, 10, 'white', '#2a2a2a');
scene.add(helper1);
const helper2 = new THREE.GridHelper(10, 10, 'white', '#2a2a2a');
helper2.rotation.z = Math.PI * 0.5;
scene.add(helper2);
//-------- ----------
// ADDING GROUPS
//-------- ----------
const group1 = createCubeGroup('one');
scene.add( group1 );
const group2 = createCubeGroup('two');
scene.add( group2 );
//-------- ----------
// STAND ALONE MESH
//-------- ----------
const mesh = createCube();
scene.add( mesh );
//-------- ----------
// CALLING SET NAMES
//-------- ----------
setNamesForScene(scene);
positionGroup(scene, 'one', -1);
positionGroup(scene, 'two', 1);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

## 3 - DAE loader helper example

One project that I have been using where I make use of the traverse method is with my dae helper that I use on top of the Collada Loader for threejs. The Collada loader is one of many options when it comes to loading external files and parsing them as workable objects in threejs. If you have not got into using external assets yet, the Collada loader might prove to be a good starting point when it comes to options beyond that of the built in buffer geometry loader. The examples in this section are from my [main blog post on the DAE loader](/2021/04/30/threejs-dae-collada-loader/) in general that you might want to check out if you want to learn more about this sort of thing.

### The DAE Loader helper module

Here I have the source code of R0 of my dae helper that I write about in detail in my post on the DAE loader in general. I made just a few quick changes here that have to do with just adding a few comments and passing a url when calling the cloner function. Speaking of the cloner function it is the process of calling this function where the object3d traverse method comes into play actually.

```js
// dae-helper.js - r0 - from threejs-dae-collada-loader
// * added some comments
// * passing url to cloner
(function(global){
    // a hard coded default cloner function
    const DEFAULT_CLONER = function(obj, scene_source, scene_result, result){
        scene_source.add(obj.clone());
    };
    // The public DAE_loader function
    global.DAE_loader = function( opt ){
        opt = opt || {};
        opt.urls_dae = opt.urls_dae || [];
        opt.urls_resource = opt.urls_resource || [];
        // use given cloner or defult to add everything
        opt.cloner = opt.cloner || DEFAULT_CLONER;
        const manager = new THREE.LoadingManager();
        const scene_source = new THREE.Scene();
        return new Promise( (resolve, reject) => {
            manager.onError = function(url){
                reject( new Error( 'error when loading: ' + url ) );
            };
            manager.onLoad = function(){
                resolve(scene_source);
            };
            opt.urls_dae.forEach((url, i) => {
                const loader = new THREE.ColladaLoader( manager );
                if(opt.urls_resource[i]){
                    loader.setResourcePath( opt.urls_resource[i] );
                }
                loader.load(url, function(result){
                    // USING Object3d.traverse off of the scene object of the result
                    result.scene.traverse( (obj) => {
                          opt.cloner(obj, scene_source, result.scene, result, url);
                    });
                });
            });
        });
    };
}( window ));
```

### 3.1 - Basic Demo of the helper

So now I have here just a quick demo where I make use of the dae loader helper method that calls a custom cloner method for each object of each dae file. For this basic example I am just loading one dae file and that is all. When loading the file the dae loader helper will call the traverse method off of the scene object of the resut and call the cloner function for each object in the DAE file. I can then check the type and anything else that I want to check to find out if I want to even make it a source object for an over all project or not. On top of this I can also make new source objects by any means that I want to beyond just calling the clone method as I am doing by default with this dae helper tool. For this example I am making a whole new mesh object and using the geometry from the DAE objects that are mesh objects only. However I am making a whole new material just using the map texture from the source mesh objects in the DAE file.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 120;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
//-------- ----------
// LOADING
//-------- ----------
DAE_loader({
    // custom cloner
    cloner: (obj, scene_source, scene_result, result, url) => {
        // If the current object is a mesh
        if(obj.type === 'Mesh'){
            // use the basic material, but with the same map
            const mat = new THREE.MeshBasicMaterial({
                map: obj.material.map
            });
            // clone by cretaing a whole new mesh object
            const mesh = new THREE.Mesh(obj.geometry, mat);
            mesh.name = obj.name;
            // copy rotation, but not position
            mesh.rotation.copy(obj.rotation);
            // add as a source object
            scene_source.add(mesh);
        }else{
            // log out other kinds of objects just to see what else I am skiping
            console.log('\n\n');
            console.log('Other type of object from DAE file: ' + url);
            console.log(obj.type);
            console.log(obj);
            console.log('\n\n');
        }
    },
    urls_dae: [
        '/dae/house_two/house_2.dae'
    ],
    urls_resource: [
        '/dae/house_two/skins/windows/'
    ]
})
.then( (scene_source) => {
    console.log('done loading');
 
    scene.add( new THREE.GridHelper(10, 40) )
    const mesh_house = scene_source.getObjectByName('house_0').clone();
    scene.add( mesh_house );
 
    camera.position.set(-2, 1, -2);
    camera.lookAt(mesh_house.position);
    loop();
})
.catch( (e) => {
    console.warn(e);
});
```

## 4 - Animation Loop Examples of Object3d traverse

Now that I have the basics of this traverse method out of the way as well as a few more examples about the method out of the way it is not time to make at least one if not more animation loop examples of the method.

### 4.1 - video1 animation loop example

This animation loop example is based off of the source code for the first video that I made for this blog post. The idea was to just use traverse as a way to loop over all the objects of the scene to set certain values for all mesh objects and groups. I am using the traverse method once to set certain things up for each mesh object once with position and scale, and then also using it again when it comes to the update loop.

This is not the best example of the traverse method though as I would prefer to do things differently when it comes to making this kind of project.

```js

// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.1, 1000);
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
scene.add(camera); 
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 10, 3);
scene.add(dl);
// ---------- ----------
// ADDING A GROUP OF MESH OBJECTS
// ---------- ----------
const group = new THREE.Group();
let i = 20;
while(i--){
    group.add( new THREE.Mesh( new THREE.BoxGeometry(1,1, 1), new THREE.MeshStandardMaterial({
        color: 0xffffff
    }) ));
}
scene.add( group );
// ---------- ----------
// TRAVERSING ALL OBJECTS IN THE SCENE
// ---------- ----------
scene.traverse(function(obj){
    if(obj.type === 'Mesh'){
        obj.position.x = -5 + Math.floor(10 * THREE.MathUtils.seededRandom());
        obj.position.z = -5 + Math.floor(10 * THREE.MathUtils.seededRandom());
    }
    if(obj.type === 'Group'){
        const len = obj.children.length;
        obj.children.forEach(function(child, i){
            child.position.y = -5 + Math.floor( 10 * (i / len) );
            const s = 0.25 + 1.75 * (1 - i / len);
            child.scale.set(s, s, s);
        });
    }
});
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = (frame, frameMax) => {
    const alpha = frame / frameMax;
    scene.traverse(function(obj){
        if(obj.type === 'Mesh'){
           obj.rotation.y = Math.PI * 2 * alpha;
        }
        if(obj.type === 'Group'){
            const len = obj.children.length;
            const current = Math.floor(len * alpha);
            obj.children.forEach(function(child, i){
                child.rotation.x = Math.PI / 180 * 90 * i * alpha;
                // default red
                child.material.color = new THREE.Color(1, 0, 0);
                if(i === current){
                    child.material.color = new THREE.Color(0, 1, 0);
                }
            });
        }
    });
};
// loop
 const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
```

## Conclusion

So then the object3d traverse method is a great way to go about looping over every object that is attached to the main scene object, or any other object from which the traverse method is called. There are a whole bunch of various use case examples that come to mind when it comes to suing this method to preform some kind of action that I would want to apply to all objects, or all objects of a given type. 

So it goes without saying that I will likely come up with additional use case examples when I come around to editing this post nest time. There are a whole lot of other ideas that comes to mind such as having methods where I just loop over all objects and return just a collection of objects by a certain type, or objects that meet certain requirements.


---
title: The dae or Collada file loader in threejs
date: 2021-04-30 11:44:00
tags: [three.js]
layout: post
categories: three.js
id: 857
updated: 2023-01-25 15:43:06
version: 1.34
---

I would like to look into the various external file formats more that I can use with [threejs](https://threejs.org/), and maybe a good place to start would be with the dae file, also known as the Collada file format. The [Collada file format](https://en.wikipedia.org/wiki/COLLADA) is a format option that I can use out of the box in [blender](https://www.blender.org/) to export files, so it would seem to be a good choice just for that reason alone for starters. Aside from easy exporting, and importing with blender, this DAE format uses an XML schema as a way to store data for the state of an over all scene export as well. For me that is another good reason why I should go with this one as it is a plain text file format that means that in a pinch I can edit a few things here and there with a plain old text editor if I need to for some reason. Also it allows for me to structure things in a way in which I can reused textures and so forth rather than having everything packed together in a single binary format.

Once I have a Collada file exported from blender it is then just a question of how to load that file into a three.js scene with a little javaScript code. The Collada file loader is not built into three.js itself, but it can be added by way of an external file that can be found in the examples folder of the three.js github repository. The DAE loader is fairly easy to use, but there are still just a few things here and there to be aware of that call for a post on this subject.

<!-- more -->

## DAE AKA Collada files with three.js and what to know first

This is a post on using the ColladaLoader which can be added on top of three.js to load Collada files with a DAE file extension which is the default file format used in blender. So this is not a [getting started post on three.js](/2018/04/04/threejs-getting-started/), and [client side javaScript in general](/2018/11/27/js-getting-started/). It is also not a getting started post with blender also which is what I generally like to use in order to create dae files to begin with. The subject here is just using the Collada file loader in the examples folder of the three.js repository to load an external dae file into a three.js scene object.

### Start Playing around with blender a little at least

In order to create a dea file a program like blender has to be used to create and export such a file. You do not have to learn everything about using it at this point, exporting the default cube that is added when first starting blender will work as a starting file to load. However the whole point of doing this is to get into the swing of creating files in blender that can then be loaded into a three.js project.

### You will need additional javaScript files beyond just that of three.js

On top of loading the usual three.js file, the Collada file loader will also need to be loaded first before any additional javaScript that makes use of three.js and the Collada loader. In many of these examples I am also using the Orbit Controls file which is yet another external files that can be located in the examples folder. On top of all of this there is also the dae files themselves along with any additional texture files that will also need to be loaded along with that f the dae file.

### I am running this example by way of http rather the the file protocol

I am running this example by way of http rather than the file protocol, this should go without saying, but this is something that it would seem that I need to repeat in many posts. One way or another all the assets that I am using when it comes to three.js, additional javaScript files, and dae files are all being hosted by way of http even when I am juts working with thinks locally. If you are trying to get this to work by opening an html file in the browser rather than navigating to a public folder that is being hosted by way of local host you might run into errors. Again this topic and many others are covered in my [getting starred post with three.js post](/2018/04/04/threejs-getting-started/), sometimes it is just called for to take a step backward when trying to work out something.

### There is also my dae tools threejs examples project

This post has to do with a few examples involving working with the dae file loader alone, rather than some kind of additional module built on top of it. As I work with the dae loader there are going to be various tasks that will come up, and things that I will want to do a certain way that results in a need for some kind of additional utility library to park some of these methods that I willw ant to use over and over again. So then I have a [DAE tools threejs project example](/2021/06/25/threejs-examples-dae-tools/) that is my current stadning take on this kind of project that I come around to revising now and then.

### The source code examples in this post are on Github

The source code examples that I am write about in this post can be [found up on github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-dae-collada-loader) in my text threejs repository.

### Version Numbers matter with three.js

When I wrote this post I was using r127 of three.js, and the last time I got around to doing a little editing I was using r146. In the future this code might break on later versions as code breaking changes are made to the library often. So if the code breaks the first thing you should check is what version of three.js you are using, it really matters a lot, more so than other libraries where the code is just more or less being maintained at a fixed state in terms of the state of the public API.

 I try to do a half way decent job of editing files, but I have a lot of pots boiling when it comes to all the other various posts on threejs as well as whole other topics completely. 

### 1.1 - Load a single dae file

In this example I will just be loading a single dae file using the THREE.ColladaLoader constructor to create an instance of such a loader. I then just need to call the load method of this Collada loader instance and pass the url to the dae file that I want to load as the first argument. For the second argument I am going to want to pass a callback function to call when the resource has finished loading. It is then within this call back function that I am going to want to add the whole scene, or a child object of the dae file into the three.js scene, or do whatever it is that needs to be done with what the file contains.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LOADING A DAE FILE
//-------- ----------
const loader = new THREE.ColladaLoader();
loader.load("/dae/obj/obj.dae", function (result) {
    const mesh_source = result.scene.children[2];
    const mesh = new THREE.Mesh(mesh_source.geometry, new THREE.MeshNormalMaterial());
    scene.add(mesh);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
});
```

For this example I am just loading a single file, and I am sure nothing will go wrong when doing so. However when it comes to making something that is ready for production, or is staring to go in the direction of a full bug time project of some kind I am going to want to pass a few more functions to the loader method that have to do with tracking load progress, and handing errors.
Still for this basic example I just wanted to load a single object in the dae file, to do so there is the scene object of the result. In this scene object there are all the children in the scene loaded from the dae file, with the file I used there where three children and I just happen to know which child it is that I wanted to load. Alternatively I could also just load the full scene rather than just the single child object that I wanted. 

After I  have what I wanted from the file added to my main three.js scene, I just started my main app loop function in which I am rendering the scene, and updating the orbit controls that i am also making use of that I can then use to look at the module that I have loaded.

### 1.2 - Setting the resource URL and using a Custom Loading Manager

Loading just a single dae file where I just care about the geometry and nothing else is one thing, but then there are dae files where I also care about the uvs, and also some additional textures files to use to skin the dae file geometry. To make matters worse in some cases the dae file that I want to load is in one location and the texture files that I want to skin it with are located in another. For example I might have one dae file, but then a few folders with different skins for the same dae file. With that said there should be a way to change what the resource URL is for a loader, for this there is the [setResourcePath method of the loader class](https://threejs.org/docs/#api/en/loaders/Loader.setResourcePath) that can be used to do just that.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const pl = new THREE.PointLight(0xffffff);
pl.position.set(2, 5, 3);
scene.add(pl);
//-------- ----------
// LOAD MANAGER
//-------- ----------
const manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
    console.log('manager.onStart');
};
manager.onLoad = function ( ) {
    console.log('manager.onLoad: Dae and textures now loaded.');
    camera.position.set(5,5,5);
    camera.lookAt(0,0,0);
    renderer.render(scene, camera);
};
manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
    console.log('manager.onProgress: ' + itemsLoaded + '/' + itemsTotal);
};
manager.onError = function ( url ) {};
//-------- ----------
// DAE LOADER
//-------- ----------
// CREATE A COLLADALOADER INSTANCE
const loader = new THREE.ColladaLoader(manager);
// SETTING THE BASE RESOURCE URL FOR TEXTTURES
loader.setResourcePath('/dae/guy2/guy2-skin-mrg1/');
// THEN LOADING AS USHUAL
loader.load('/dae/guy2/guy2.dae', function (result) {
    console.log('cb of loader.load');
    // adding the child that I want to the scene
    scene.add(result.scene.children[2]);
});
```

One additional thing that I thought I should start to look into at least with this example is to use a custom loader manager along with the single instance of the dae loader. One major reason why is that the callback for the load method of the dae loader will fore when the dae file is loaded, but not when all the textures are loaded. So then I have found that I want to start the loop when all the textures are loaded also, not just the dae file alone.

## 2 - Loading more than one file

This is where things will start to get a little involve as in this section I will be focusing on code examples that have to do with loading more than one DAE file. There is a lot to take in when it comes to this sort of thing, and I still do not have a solution that I am truly happy with as well for that matter. What makes this a little involved is that there is not just having  an array of urls for each DAE file but I will also want to have urls for the base resource urls for the images that I will use for each file. On top of that there is also the question of how which objects from the dae exports to I want, and also how to go about making clones of them. There are a whole lot of other little tasks such as how to go about making a progress bar of I feel as though I may need on, and so forth.

### 2.1 - Basic helper function that returns a promise

Although loading a whole bunch of DAE files will prove to be a little hard, it is still only so hard. Also as always it helps to start out with a very simple hello world type example of something, and with this example at least I will be starting out with just that. For this example I have a single helper function that will return a promise that will resolve when the on load event happens for the main loading manager, and the promise will reject if there is a single error with the main manager.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(1, 3, 2);
scene.add(dl);
//-------- ----------
// HELPERS
//-------- ----------
const DAE_loader = function( dae_urls, resource_urls){
    resource_urls = resource_urls || [];
    const manager = new THREE.LoadingManager();
    const scene_source = new THREE.Scene();
    return new Promise( (resolve, reject) => {
        manager.onError = function(url){
            reject(new Error( 'error when loading: ' + url ));
        };
        manager.onLoad = function(){
            resolve(scene_source);
        };
        dae_urls.forEach((url, i) => {
            const loader = new THREE.ColladaLoader(manager);
            if(resource_urls[i]){
                loader.setResourcePath(resource_urls[i]);
            }
            loader.load(url, function(result){
                result.scene.traverse((obj) => {
                    if(obj.type === 'Mesh'){
                        scene_source.add( obj.clone() );
                    }
                });
            });
        });
    });
};
//-------- ----------
// LOADING
//-------- ----------
DAE_loader(
    // DAE FILES
    ['/dae/count_down_basic/cd4-nums.dae',
     '/dae/rpi4/rpi4_start_box.dae'],
    // RESOURCE PATHS
    ['/dae/count_down_basic/',
     '/dae/rpi4/']
)
.then( (scene_source) => {
    console.log('Done loading.');
    scene.add( scene_source)
    camera.position.set(10, 10, 10);
    camera.lookAt(0,0,0);
    renderer.render(scene, camera);
})
.catch( (e) => {
    console.warn(e);
});
```

## Conclusion

The dae format seems to work okay thus far, in order to really know what I can do with the Collada format I am going to need to look into how to use blender more. I am thinking for now I will want to just focus on making simple static models, but there is also looking into how to go about create animations for a dae file also that can then be used in three.js with the Animation mixer. However maybe all of that is a matter for a whole other post, for now I just waned to work out just a few quick examples that have to do with loading what i make in blender into a threejs project.

The alternative to getting into the various external file formats is to just make crude yet effective models using just three.js, and javaScript alone which I have done before getting into use blender. I have wrote a few posts on this kind of thing when it comes to [my post on my first guy model](/2021/04/29/threejs-examples-guy-one/) that I made that is just a bunch of [box geometries](/2021/04/26/threejs-box-geometry/) grouped together by way of the [threejs group class](/2018/05/16/threejs-grouping-mesh-objects/). This might actually be a decent starting point when it comes to making assets for three.js actually as thus far I find it to be the easiest way to go about making them. However there is a draw back to this sort of thing when it comes to making something that can be shared between three.js, blender, and other applications. So with that said it makes sense to look into what the options are with external file formats that are fairly open and a well supported standard when it comes to things outside that of three.js.  For me so far it would seem that the Collada format seems to be just what it is that I want.

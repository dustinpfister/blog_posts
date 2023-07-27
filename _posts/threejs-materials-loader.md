---
title: The Matheral Loader in threejs
date: 2023-07-27 12:28:00
tags: [three.js]
layout: post
categories: three.js
id: 1063
updated: 2023-07-27 13:13:03
version: 1.0
---

There are a number of loaders built into the core of threejs that extend from the common base loader class, one such option is the materials loader which will be the main theme of this post. There might be a situation or two in which I might want to use the material loader in conjunction with the texture loader, and buffer geometry loader, then create the final scene object with all of these assets. However I have found that I might prefer to go with the Object Loader as a way to bake everything into a single JSON file format and just start creating assets that way.

There is also of course starting to look into the long list of options when it comes to the additional loaders there are to work with in the JSM folder of the examples folder of the threejs Github Repository. There is also the js folder of the examples folder if you are using r147 or older, but getting into all of that is a whole other matter. The main point here I think is to maybe start by looking into what there is to work with that is baked into the core of the threejs library itself first. In some cases it might be possible to just go with these standards and then move on with ones life, and with that said this post will center on the use of one of these options for materials at least.

<!-- more -->


## 1 - Some Basic Examples of the Material Loader

As always with these posts on threejs I like to start out with just a few very basic getting started type examples of something. So when it comes to using the Material loader there is the question of how to go about creating the raw JSON data to begin with in the from of an external file, or a hard coded string in a javaScript file. After that there is just working out how to go about loading that external file, or to parse a string form of the same data coded into the javaScript code itself, or obtained by some other means.

### 1.1 - Parse a Hand Coded JSON String

For this first example I am going to start out by just making a hand coded form of the JSON data to the use with the parse method of the material loader.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// MATERIAL LOADER - parse a material in the form of a hard coded string
// ---------- ----------
const str_material = `
{
    "metadata": {
        "version": 4.5,
        "type": "Material",
        "generator": "Hand Coded"
    },
    "type": "MeshNormalMaterial"
}
`
const material = new THREE.MaterialLoader().parse( JSON.parse(str_material) );
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material );
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.2 - Create A JSON string from a Material Object

For this example I am going to touch base on how to go about generating JSON data of a material object that you all ready have to work with in code.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// MATERIAL LOADER - creating a JSON string from a material
// ---------- ----------
const obj_material = new THREE.MeshNormalMaterial().toJSON();
const str_material = JSON.stringify(obj_material);
console.log(str_material);
const material = new THREE.MaterialLoader().parse( JSON.parse(str_material) );
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material );
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.3 - Load a Material in JSON file form

Now that I have covered a number of examples that have to do with using the parse method with a JSON string, I think I should have at least one example of using the load method of the loader to pull in material data stored in an external JSON file.

```json
{
    "metadata": {
        "version": 4.5,
        "type": "Material",
        "generator": "Material.toJSON"
    },
    "uuid": "beb0f098-1561-467e-a207-b577a6f5e1da",
    "type": "MeshNormalMaterial",
    "depthFunc": 3,
    "depthTest": true,
    "depthWrite": true,
    "colorWrite": true,
    "stencilWrite": false,
    "stencilWriteMask": 255,
    "stencilFunc": 519,
    "stencilRef": 0,
    "stencilFuncMask": 255,
    "stencilFail": 7680,
    "stencilZFail": 7680,
    "stencilZPass": 7680
}
```

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// MATERIAL LOADER
// ---------- ----------
const loader = new THREE.MaterialLoader();
loader.load('/forpost/threejs-materials-loader/s1-3-basic-load/material.json', (material) => {
    scene.add( new THREE.GridHelper( 10,10 ) );
    const mesh = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material );
    scene.add(mesh);
    // RENDER
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
});
```

## 2 - Loading Shader Materials

I have wrote a main blog post on the subject of using the [shader material](/2023/01/13/) as a way to create custom materials by writing a little GLSL code on top of what there is to work with in the shader library baked into the core of threejs. If I am going to ever use the material loader in any capacity in a real project I am fairly sure that I am going to want to make sure that I can use it to load these kinds of materials. Also I am sure that working out what I am doing here will also apply to the materials key of the JSON data that I use with the object loader as well.

### 2.1 - Very simple getting started parse string example

So then one will need to start somewhere when it comes to just testing things out with this to begin with and that will be what this example is about. So then I am starting out with making an example where I can just start creating a JSON string and see if parsing it into a material will work okay. I could also just start with what I did in the single load of an external file demo, but this way I can have everything together in one nice neat little demo.

Sense this is just a getting started type demo of this I will just want to have a solid mass of color for the object I use it with and that is it. This will help make the GLSL code for the vertex and fragment shaders fairly simple, but still only so simple if you are new to this sort of thing. The vertex shader as the name suggests is used to find out what the deal is when it comes to setting the current position of a fragment, and then the fragment shader is then used to set the style of that fragment such as the color. When it comes to setting the gl\_FragColor value this will need to be an instance of vec4 which is a vector of 4 values, red, green, blue, and alpha opacity.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// SHADER MATERIAL JSON AS HARD CODED STRING
// ---------- ----------
const str_material = `{
  "metadata":{
    "version": 4.5,
    "type": "Material",
    "generator": "Hacked-Over-Material.toJSON-Export"
  },
  "uuid": "15d8e01f-af72-4a5e-9188-b009814b7496",
  "type": "ShaderMaterial",
  "uniforms":{
    "diffuse":{
      "type":"c",
      "value": 65535
    }
  },
  "vertexShader": "void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);}",
  "fragmentShader": "uniform vec3 diffuse;void main(){gl_FragColor = vec4(diffuse,1);}"
}`;
const material = new THREE.MaterialLoader().parse( JSON.parse(str_material) );
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material );
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## Conclusion

I have a whole lot more that I would like to write about when it comes to this topic, however I can only get to so much of what I want to do of course. I will come around to edit this post again at some point in the future I am sure, and with that said I do have a number of things on the todo list with this one which is almost always the case with threejs topics. However I am thinking that my content on the object loader will need to take higher priority with this subject as it seems that kind of loader is just want I am going to want to use in order to address some if the issues that come up when using the material loader. The other way of addressing most of the concerns often seems to involve having to also use the texture loader, buffer geometry loader and so forth.




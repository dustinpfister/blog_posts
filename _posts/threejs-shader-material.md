---
title: The shader material in threejs and getting started with a little GLSL
date: 2023-01-13 09:41:00
tags: [three.js]
layout: post
categories: three.js
id: 1023
updated: 2023-01-13 11:22:16
version: 1.2
---

The [Shader material](https://threejs.org/docs/#api/en/materials/ShaderMaterial) in threejs is one way to go about getting started with custom shaders in threejs, the other general option would be to look into the [raw shader material](https://threejs.org/docs/#api/en/materials/RawShaderMaterial). The main difference between the two has to do with built-in uniforms and attributes when it comes to the starting state of the GLSL \( [OpenGL Shader Language](https://en.wikipedia.org/wiki/OpenGL_Shading_Language) \) code. For this reason it might be best to start out with the Shader material rather than the raw shdaer material as there are some built in values that I will not have to worry about setting up myself when it comes to the raw shader material. Yet again it is a bit of a toss up with that as if one wants to learn a thing or two about GLSL alone then the raw material might prove to be a better starting point actually.

In any case the Shader material is what I am starting with, and that will be the main topic of this post today. Using the shader material alone is simple enough, but what is not so simple is coming up with custom GLSL code to use with this material. However one has to start somewhere so this post will start out with some very simply hello world style examples, before moving on into one or more real examples when it comes to the topic of custom shaders.

<!-- more -->

## The Shader Material in threejs


## 1 - Basic, hello world exmaples of THREE.ShaderMaterial in threejs

There is a lot to take in when it comes to even just simply getting started with the THREE.ShaderMaterial. However this is to be expected as this is without question one of the most, if not the most advaced topics there is when it comes to threejs. I have been working with threejs on and off for years and even I still find this to be a little intense for me, however I started taking a swing or two at it now and then because there is not much that remains when it comes to more ground to cover with threejs for me.

Anyway not just for your sake, but very much for my own sake as well, this will be a collection of very basic, getting started type examples of custom shaders in threejs by way of THREE.ShaderMaterial. This might prove to be an easier alternative to that of the THREE.RawShaderMaterial but that will only help so much of course. Still I have found that if I just want to reproduce the functionally of the THREE.MeshBasicMatreial with just the color option, that is not so hard of a starting point. With that said these examples will just be focusing one various ways to go about doing that which will just result in a solid blob of color for the object rendered in the scene. Everything else should be something that I get to in more advanced sections.

### 1.1 - Custom Shader hello world with gl_Position and gl_FragColor

To create an instance of the Shader material I will need to pass an object that contains three properties, unifroms, vertexShader, and fragmentShader. The uniforms property contains a set of values that will be the same for for all vertices, for this getting started exmaple I am dealing with just one uniform value that is a diffuse color. Each value of the uniforms object should itself be an object and the value property of this nested object is how to go about setting a value for the uniform value. The vertexShader and fragmentShader properties should both contain string values, and each string value should contain GLSL code for the vertex and fragment shaders that will provide the cusotm rendering logic.

The vertex shader runs first and the main job of this shader is to set the value of gl\_Position. After the vertex shader there is the fragment shader there is the fragment shdaer which is what is used to set what the color should be for each pixel location. The main job of this fragment shader then is to set what the color should be for the gl\_FragColor value.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// SHADER MATERIAL
// ---------- ----------
const shader_basic = {};
// unifrom values for basic shader
shader_basic.uniforms = {
    diffuse: { value: new THREE.Color(0x1a1a1a) }
};
// vertex shader for basic shader
shader_basic.vertexShader = [
    'void main() {',
    '    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
    '}'
].join('\n');
// fragment shader for hatching shader
shader_basic.fragmentShader = [
    'uniform vec3 diffuse;',
    'void main() {',
    '    gl_FragColor = vec4( diffuse, 1.0 );',
    '}'
].join('\n');
// ---------- ----------
// SHADER MATERIAL
// ---------- ----------
const material1 = new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.clone(shader_basic.uniforms),
    vertexShader: shader_basic.vertexShader,
    fragmentShader: shader_basic.fragmentShader
});
material1.uniforms.diffuse.value = new THREE.Color(0,1,0);
// ---------- ----------
// GEOMETRY, MESH
// ---------- ----------
const geo = new THREE.TorusGeometry( 3, 1, 100, 100);
geo.rotateX(Math.PI * 0.5);
const mesh = new THREE.Mesh(geo, material1);
mesh.position.y = 1;
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);
```

So then the end result of this custom shader is that I have just a solid blob of color in the location of the mesh object that contains a Torus geometry. This is then just a very complex way to go about getting the same effect as just using the basic material and setting the color option to what I want for the solid diffuse color value. However there is of course expanding on this to do soomehting else that can not be done with the basic material, or any other material for that matter. It is just that this seems like a good starting point for me wheh it comes to getting into doing this sort of thing. However before getting into more advadnaced examples of this kind of cusotm matreial I will want to cover at least a few more options when it comes to just a basic getting started type point for this sort of thing.




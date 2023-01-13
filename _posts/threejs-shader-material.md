---
title: The shader material in threejs and getting started with a little GLSL
date: 2023-01-13 09:41:00
tags: [three.js]
layout: post
categories: three.js
id: 1023
updated: 2023-01-13 12:24:53
version: 1.7
---

The [Shader material](https://threejs.org/docs/#api/en/materials/ShaderMaterial) in threejs is one way to go about getting started with custom shaders in threejs, the other general option would be to look into the [raw shader material](https://threejs.org/docs/#api/en/materials/RawShaderMaterial). The main difference between the two has to do with built-in uniforms and attributes when it comes to the starting state of the GLSL \( [openGL Shader Language](https://en.wikipedia.org/wiki/OpenGL_Shading_Language) \) code. For this reason it might be best to start out with the Shader material rather than the raw shdaer material as there are some built in values that I will not have to worry about setting up myself when it comes to the raw shader material. Yet again it is a bit of a toss up with that as if one wants to learn a thing or two about GLSL alone then the raw material might prove to be a better starting point actually.

In any case the Shader material is what I am starting with, and that will be the main topic of this post today. Using the shader material alone is simple enough, but what is not so simple is coming up with custom GLSL code to use with this material. However one has to start somewhere so this post will start out with some very simply hello world style examples, before moving on into one or more real examples when it comes to the topic of custom shaders.

<!-- more -->

## The Shader Material in threejs and what to know first

This is a post on getting started with making custom GLSL shaders in threejs by way of the THREE.ShaderMaterial class as well as many other core threejs features. This is then not in any way a kind of [getting started post with threejs](/2018/04/04/threejs-getting-started/), [client side javaScript](/2018/11/27/js-getting-started/), and many other skills that are needed before hand. Also on top of the usual set of skills that are needed for doing just about anything with threejs there is one new additional skill that one is going to need to start to scratch the surface with at least which as I mentioned in the opening of this post GLSL or openGL Shader Language.

### Source code examples are also on Github

I also have the source code examples that I am writing about here up on [my Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-shader-material).

### Version Numbers matter

When I was first writing this post I was using r146 of threejs.

## 1 - Basic, hello world exmaples of THREE.ShaderMaterial in threejs

There is a lot to take in when it comes to even just simply getting started with the THREE.ShaderMaterial. However this is to be expected as this is without question one of the most, if not the most advanced topics there is when it comes to threejs. I have been working with threejs on and off for years and even I still find this to be a little intense for me, however I started taking a swing or two at it now and then because there is not much that remains when it comes to more ground to cover with threejs for me.

Anyway not just for your sake, but very much for my own sake as well, this will be a collection of very basic, getting started type examples of custom shaders in threejs by way of THREE.ShaderMaterial. This might prove to be an easier alternative to that of the THREE.RawShaderMaterial but that will only help so much of course. Still I have found that if I just want to reproduce the functionally of the [THREE.MeshBasicMatreial](/2018/05/05/threejs-basic-material/) with just the color option, that is not so hard of a starting point. With that said these examples will just be focusing one various ways to go about doing that which will just result in a solid blob of color for the object rendered in the scene. Everything else should be something that I get to in more advanced sections.

### 1.1 - Custom Shader hello world with gl_Position and gl_FragColor

To create an instance of the Shader material I will need to pass an object that contains three properties, unifroms, vertexShader, and fragmentShader. The uniforms property contains a set of values that will be the same for for all vertices, for this getting started example I am dealing with just one uniform value that is a diffuse color. Each value of the uniforms object should itself be an object and the value property of this nested object is how to go about setting a value for the uniform value. The vertexShader and fragmentShader properties should both contain string values, and each string value should contain GLSL code for the vertex and fragment shaders that will provide the custom rendering logic.

The vertex shader runs first and the main job of this shader is to set the value of gl\_Position. After the vertex shader there is the fragment shader there is the fragment shader which is what is used to set what the color should be for each pixel location. The main job of this fragment shader then is to set what the color should be for the gl\_FragColor value.

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

So then the end result of this custom shader is that I have just a solid blob of color in the location of the mesh object that contains a Torus geometry. This is then just a very complex way to go about getting the same effect as just using the basic material and setting the color option to what I want for the solid diffuse color value. However there is of course expanding on this to do somersetting else that can not be done with the basic material, or any other material for that matter. It is just that this seems like a good starting point for me when it comes to getting into doing this sort of thing. However before getting into more advanced examples of this kind of custom material I will want to cover at least a few more options when it comes to just a basic getting started type point for this sort of thing.

### 1.2 - THREE.ShaderChunk

Although a big part of getting into this sort of thing is to write at least a little custom GLSL code, there are a lot of tools built into the core of threejs to help speed things along when using the THREE.ShaderMaterial class. One feature of threejs that I think I should cover right away that I have found is the THREE.ShaderChunk object. In this shader chunk object there is a meshbasic\_vert, and meshbasic\_frag properties that as you might guess contains GLSL code for the vertex shader, and fragment shader of the mesh basic material. So then another way to create a Shader material hello world would be to just use those values for the shaders.

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
// SHADER OBJECT - Using THREE.ShaderChunk for the vertex and fragment shaders
// ---------- ----------
const shdaer_basic =  {
    // just a default diffuse color of cyan for uniforms
    uniforms: { 
        diffuse: { value: new THREE.Color(0.5, 1, 1) }
    },
    // just using the same code from 'MeshBasicMaterial' for
    // vertex and fragment shaders
    vertexShader: THREE.ShaderChunk[ 'meshbasic_vert' ],
    fragmentShader: THREE.ShaderChunk[ 'meshbasic_frag' ],
};
// ---------- ----------
// SHADER MATERIAL
// ---------- ----------
const material = new THREE.ShaderMaterial(shdaer_basic);
// ---------- ----------
// GEOMETRY, MESH
// ---------- ----------
const geo = new THREE.BoxGeometry( 2, 2, 2);
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);
```

That makes things for more concise, but it also totally defeats the purpose of bothering with the shader material because I could just use the basic material. Again the goal here is to just be aware fo what there is to work with to just get started with this sort of thing, and the THREE.ShaderChunk is just one thing to be aware of. Also in some cases I might want to start with functionality that is not all to different from that of the basic material, [phong material](/2022/12/29/threejs-phong-material/), [normal material](/2021/06/23/threejs-normal-material/) and so forth. It is just that typically I will not want to do something like this, but rather start with the actual code rather than a reference to it as a start point.

### 1.3 - Full code from THREE.ShaderChunk example

So then in the last basic example I made use of the THREE.ShaderChunk object to create a material that is more or less about the same as the basic material. However I did so by just simply referencing the GLSL code. In this example I am doing the same thing, but now I am passing the GLSL code into the actually code of the example, rather than just referencing what is there.

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
// SHADER OBJECT - Using GLSL code from THREE.ShaderChunk
// ---------- ----------
const shdaer_basic =  {
    // just a default diffuse color of cyan for uniforms
    uniforms: { 
        diffuse: { value: new THREE.Color(1, 1, 1) }
    },
    // just using the same code from 'MeshBasicMaterial' for
    // vertex and fragment shaders but now I am puling the actual shader code in
    vertexShader: [
        '#include <common>',
        '#include <uv_pars_vertex>', 
        '#include <uv2_pars_vertex>', 
        '#include <envmap_pars_vertex>', 
        '#include <color_pars_vertex>', 
        '#include <fog_pars_vertex>',
        '#include <morphtarget_pars_vertex>', 
        '#include <skinning_pars_vertex>',
        '#include <logdepthbuf_pars_vertex>', 
        '#include <clipping_planes_pars_vertex>', 
        'void main() {',
        '    #include <uv_vertex>', 
        '    #include <uv2_vertex>', 
        '    #include <color_vertex>', 
        '    #include <morphcolor_vertex>',
        '    #if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )', 
        '        #include <beginnormal_vertex>',
        '        #include <morphnormal_vertex>', 
        '        #include <skinbase_vertex>',
        '        #include <skinnormal_vertex>', 
        '        #include <defaultnormal_vertex>', 
        '    #endif',
        '    #include <begin_vertex>', 
        '    #include <morphtarget_vertex>', 
        '    #include <skinning_vertex>',
        '    #include <project_vertex>', 
        '    #include <logdepthbuf_vertex>', 
        '    #include <clipping_planes_vertex>', 
        '    #include <worldpos_vertex>',
        '    #include <envmap_vertex>',
        '    #include <fog_vertex>',
        '}'
    ].join('\n'),
    fragmentShader: [
        'uniform vec3 diffuse;',
        'uniform float opacity;',
        '#ifndef FLAT_SHADED',
        '    varying vec3 vNormal;',
        '#endif',
        '#include <common>',
        '#include <dithering_pars_fragment>',
        '#include <color_pars_fragment>',
        '#include <uv_pars_fragment>',
        '#include <uv2_pars_fragment>',
        '#include <map_pars_fragment>',
        '#include <alphamap_pars_fragment>',
        '#include <alphatest_pars_fragment>',
        '#include <aomap_pars_fragment>',
        '#include <lightmap_pars_fragment>',
        '#include <envmap_common_pars_fragment>',
        '#include <envmap_pars_fragment>',
        '#include <fog_pars_fragment>',
        '#include <specularmap_pars_fragment>',
        '#include <logdepthbuf_pars_fragment>',
        '#include <clipping_planes_pars_fragment>',
        'void main() {',
        '    #include <clipping_planes_fragment>',
        '    vec4 diffuseColor = vec4( diffuse, opacity );',
        '    #include <logdepthbuf_fragment>',
        '    #include <map_fragment>',
        '    #include <color_fragment>',
        '    #include <alphamap_fragment>',
        '    #include <alphatest_fragment>',
        '    #include <specularmap_fragment>',
        '    ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );',
        '    #ifdef USE_LIGHTMAP',
        '        vec4 lightMapTexel = texture2D( lightMap, vUv2 );',
        '        reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;',
        '    #else',
        '        reflectedLight.indirectDiffuse += vec3( 1.0 );',
        '    #endif',
        '    #include <aomap_fragment>',
        '    reflectedLight.indirectDiffuse *= diffuseColor.rgb;',
        '    vec3 outgoingLight = reflectedLight.indirectDiffuse;',
        '    #include <envmap_fragment>',
        '    #include <output_fragment>',
        '    #include <tonemapping_fragment>',
        '    #include <encodings_fragment>',
        '    #include <fog_fragment>',
        '    #include <premultiplied_alpha_fragment>',
        '    #include <dithering_fragment>',
        '}'
    ].join('\n')
};
//console.log(THREE.ShaderChunk[ 'meshbasic_frag' ])
// ---------- ----------
// SHADER MATERIAL
// ---------- ----------
const material = new THREE.ShaderMaterial(shdaer_basic);
console.log(material.vertexShader);
// ---------- ----------
// GEOMETRY, MESH
// ---------- ----------
const geo = new THREE.BoxGeometry( 2, 2, 2);
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);
```

Notice all the include statements that begin with a hashtag, followed by a name for what is some additional GLSL code? This is a way to include one or more parts of the THREE.ShaderChunk object in the GLSL code. So say that I quickly just want to add alpha map functionally to a material of mine. I could go threw the time consuming process of trying how to go about writing something like that from the ground up with GLSL code, but why other with that when I can just include what is baked into threejs to begin with?

This is still just a very complex way of just reproducing the functionally of the basic material, but the goal here was not to make a custom material to begin with, but rather to just get started with this. With these three examples I am not somewhat ready to start to move on to some real examples in which I am just hacking over and expanding from one of these kinds of start points.

## 2 - A crosshatching example

One of the first real examples of a custom shader material that I have made thus far is actually a hacked over version of one [that I found on line](https://codepen.io/EvanBacon/pen/xgEBPX). That is that I just did some quick google work to find a shader that does more or less what I wanted and found something that was close at least. I then hacked over it a lot, removing code that I did not want or need for the simple black and white look that I wanted and ended up with this.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.2,0.2, 0.2);
//scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(0.8, 1, 0.5);
scene.add(dl);
// ---------- ----------
// SHADER OBJECT
// ---------- ----------
// based on what as found at: https://codepen.io/EvanBacon/pen/xgEBPX
// by EvanBacon ( https://codepen.io/EvanBacon , https://twitter.com/baconbrix )
// * made it so that there are just two colors
// * figured out how to make the lines thicker
// * figured out how to mutate color
const shader_hatch = {};
// unifrom values for hatching shader
shader_hatch.uniforms = {
    uDirLightPos: { type: 'v3', value: new THREE.Vector3() },
    uDirLightColor: { type: 'c', value: new THREE.Color(0xeeeeee) },
    uAmbientLightColor: { type: 'c', value: new THREE.Color(0x050505) },
    uBaseColor: { type: 'c', value: new THREE.Color(0xffffff) },
    uLineColor1: { type: 'c', value: new THREE.Color(0x000000) }
};
// vertex shader for hatching shader
shader_hatch.vertexShader = [
    'varying vec3 vNormal;',
    'void main() {',
    '     gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
    '     vNormal = normalize( normalMatrix * normal );',
    '}'
].join('\n');
// fragment shader for hatching shader
shader_hatch.fragmentShader = [
    //'uniform vec3 uBaseColor;',
    'uniform vec3 uLineColor1;',
    'uniform vec3 uDirLightPos;',
    'uniform vec3 uDirLightColor;',
    'uniform vec3 uAmbientLightColor;',
    'varying vec3 vNormal;',
    'const float fSpace = 10.0;',    // added an fSpace Float
    '',
    'void main() {',
    '    float directionalLightWeighting = max( dot( vNormal, uDirLightPos ), 0.0);',
    '    vec3 lightWeighting = uAmbientLightColor + uDirLightColor * directionalLightWeighting;',
    '    float len = length(lightWeighting);',     // added a len Float
    //'    gl_FragColor = vec4( uBaseColor, 1.0 );',
    '    vec3 color = vec3(len * 0.50);', // figured out how to mutate color
    //'    color[0] = len * 0.40;',
    '    gl_FragColor = vec4(color, 1.0);',
    '    if ( len < 1.00 ) {',
    '        float n = mod(gl_FragCoord.x + gl_FragCoord.y, fSpace);', // added a n Float for each of these
    '        if ( n < 4.0 ) {', // new expression that allows for thicker lines
    '            gl_FragColor = vec4( uLineColor1, 1.0 );',
    '        }',
    '    }',
    '    if ( len < 0.75 ) {',
    '        float n = mod(gl_FragCoord.x - gl_FragCoord.y, fSpace);',
    '        if ( n < 4.0 ) {',
    '            gl_FragColor = vec4( uLineColor1, 1.0 );',
    '        }',
    '    }',
    '    if ( len < 0.50 ) {',
    '        float n = mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, fSpace);',
    '        if ( n < 4.0 ) {',
    '            gl_FragColor = vec4( uLineColor1, 1.0 );',
    '        }',
    '    }',
    '    if ( len < 0.25 ) {',
    '        float n = mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, fSpace);',
    '        if ( n < 4.0 ) {',
    '            gl_FragColor = vec4( uLineColor1, 1.0 );',
    '        }',
    '    }',
    '}'
].join('\n');
// ---------- ----------
// SHADER MATERIAL
// ---------- ----------
const material1 = new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.clone(shader_hatch.uniforms),
    vertexShader: shader_hatch.vertexShader,
    fragmentShader: shader_hatch.fragmentShader
});
material1.uniforms.uDirLightColor.value = dl.color;
material1.uniforms.uDirLightPos.value = dl.position;
//const lineColor1 = 0xff0000;
//material1.uniforms.uBaseColor.value.setHex(0xff0000);
//material1.uniforms.uLineColor1.value.setHex(lineColor1);
// ---------- ----------
// GEOMETRY, MESH
// ---------- ----------
const geo = new THREE.TorusGeometry( 3, 1, 100, 100);
geo.rotateX(Math.PI * 0.5);
const mesh = new THREE.Mesh(geo, material1);
mesh.position.y = 1;
scene.add(mesh);
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
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const v = new THREE.Vector3();
    const e = new THREE.Euler();
    e.x = Math.PI * 4 * a1;
    e.z = Math.PI * 2 * a1;
    v.set(0,1,0).applyEuler(e);
    dl.position.copy(v);
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

The code that is was based on was made for a very old revision of threejs \( r57 \), so many of the changes had to do with having to just do things the way that they are done now. I also did not make use of additional shaders that where used in the example, and made a few more changes that allowed for things like thicker lines. Thus far this material works more or less the way that I would like it to, but I still would like to add at least a few more features to this such as transparency.


## Conclusion

That will be it for now at least when it comes to custom shaders in threejs, not because there is not anything more to write about, but indeed very much the opposite. I have a lot more to look into when it comes to this sort of thing myself as there is a great deal more to learn about when it comes to working with the THREE.ShaderChunk library, as well as [GLSL itself](https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language). 

This was a kind of just getting started type post though, so maybe there is still only so much more to write about in terms of future edits of this post at least. However I am going to want to write additional blog posts on more examples for custom shaders, the shader chunk object, GLSL, and much more. There is just no way to do justice with this in the form of a single blog post, unless it is a real serious long form content piece that just goes on war and peace style maybe.


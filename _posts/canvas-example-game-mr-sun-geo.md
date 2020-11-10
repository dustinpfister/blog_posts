---
title: Mr Sun Geo.js and additional plug-ins
date: 2020-11-06 15:18:00
tags: [canvas]
layout: post
categories: canvas
id: 737
updated: 2020-11-10 11:10:36
version: 1.9
---

Today I started yet another [canvas example](/2020/03/23/canvas-example/) based off the Mr Sun source code that I started recently. This time I started out with the source code, and plug-ins that I worked out for my Mr Sun Temp example. So when Mr Sun Geo as I have come to call it thus far is yet even more on top of that example. 

In the previous fork Mr Sun Temp I made just a few minor improvements to the source code itself, and the real additions where in the form of a few plug-ins. The main focus there was the temp.js plug-in for this project that just contained the logic that sets temperature for the sun object, and all the world section objects. In this fork I am focusing on Creating additional plug-ins that will have to do with the Geology, Hydrosphere, and Atmosphere of the Game World in what I am just calling Mr Sun. All of these plug-ins depend on the previous plug-ins worked out in Mr Sun Temp, when it comes to temp.js and also fusion.js.

So then Mr Sun Geo is just the next step forward when it comes to working out game logic that will create a cool little simulated world.

<!-- more -->

<div id="canvas-app" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
<script>var utils={};utils.mod=function(x,m){return(x%m+m)%m};utils.getCanvasRelative=function(e){var canvas=e.target,bx=canvas.getBoundingClientRect();return{x:(e.changedTouches?e.changedTouches[0].clientX:e.clientX)-bx.left,y:(e.changedTouches?e.changedTouches[0].clientY:e.clientY)-bx.top,bx:bx}};utils.distance=function(x1,y1,x2,y2){return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2))};utils.logPer=function(per,a,b){a=a===undefined?2:a;b=b===undefined?a:b;per=per<0?0:per;per=per>1?1:per;return Math.log(1+a-2+per)/Math.log(b)};utils.createLogPerObject=function(i,len,base,max,a,b){a=a===undefined?2:a;b=b===undefined?a:b;base=base===undefined?0:base;max=max===undefined?1:max;var per=i/len,logPer=utils.logPer(per,a,b);return{i:i,len:len,per:per,logPer:logPer,n:base+logPer*(max-base),valueOf:function(){return this.n}}};utils.createLogPerCollection=function(opt){opt=opt||{};opt.len=opt.len===undefined?100:opt.len;opt.base=opt.base===undefined?0:opt.base;opt.max=opt.max===undefined?50:opt.max;opt.a=opt.a===undefined?2:opt.a;opt.b=opt.b===undefined?opt.a:opt.b;var i=0,obj,collection={len:opt.len,base:opt.base,max:opt.max,a:opt.a,b:opt.b};collection.data=[];while(i<opt.len){obj=utils.createLogPerObject(i,opt.len,opt.base,opt.max,opt.a,opt.b);collection.data.push(obj);i+=1}return collection};var gameMod=function(){var plugs={};var getCallPrioritySorted=function(){var keys=Object.keys(plugs);return keys.sort(function(a,b){var plugObjA=plugs[a],plugObjB=plugs[b];if(plugObjA.callPriority>plugObjB.callPriority){return 1}if(plugObjA.callPriority<plugObjB.callPriority){return-1}return 0})};var usePlugs=function(game,methodName,args){methodName=methodName||"create";args=args||[game];var keys=getCallPrioritySorted();keys.forEach(function(plugKey){var plugObj=plugs[plugKey],method=plugObj[methodName];if(method){method.apply(plugObj,args)}})};var api={};api.create=function(opt){opt=opt||{};opt.canvas=opt.canvas||{width:320,height:240};var game={};game.centerX=opt.centerX||opt.canvas.width/2;game.centerY=opt.centerY||opt.canvas.height/2;game.sectionRadius=opt.sectionRadius||16;game.worldRadius=opt.worldRadius||100;game.secs=0;game.year=opt.year||0;game.yearRate=opt.yearRate||1;game.sun={radius:16,x:game.centerX,y:game.centerY,sunGrid:{}};var i=0,sections=[],total=opt.sectionCount||20,radian,cx=game.centerX,cy=game.centerY;while(i<total){radian=Math.PI*2/total*i;sections.push({i:i,x:Math.cos(radian)*game.worldRadius+cx,y:Math.sin(radian)*game.worldRadius+cy,radius:game.sectionRadius,per:1});i+=1}game.sections=sections;usePlugs(game,"create",[game,opt]);gameMod.updateSections(game);return game};api.updateSections=function(game){var sun=game.sun;game.sections.forEach(function(section){var ajust=section.radius+sun.radius;var d=utils.distance(section.x,section.y,sun.x,sun.y)-ajust;var per=d/(game.worldRadius*2-ajust*2);per=per>1?1:per;per=per<0?0:per;per=1-per;section.per=per})};api.getSectionByPos=function(game,x,y){var section,i=game.sections.length;while(i--){section=game.sections[i];if(utils.distance(section.x,section.y,x,y)<=section.radius){return section}}return false};var boundToCircle=function(obj,cx,cy,radius){if(utils.distance(obj.x,obj.y,cx,cy)>radius){var a=Math.atan2(obj.y-cy,obj.x-cx);obj.x=cx+Math.cos(a)*radius;obj.y=cy+Math.sin(a)*radius}};api.moveSun=function(game,pos){var ajust=game.sun.radius+game.sectionRadius;game.sun.x=pos.x;game.sun.y=pos.y;boundToCircle(game.sun,game.centerX,game.centerY,game.worldRadius-ajust);api.updateSections(sm.game)};api.update=function(game,secs){game.secs+=secs;var deltaYears=Math.floor(game.secs/game.yearRate);if(deltaYears>=1){game.year+=deltaYears;game.secs%=game.yearRate;usePlugs(game,"onDeltaYear",[game,deltaYears])}};api.load=function(plugObj){var len=Object.keys(plugs).length;plugObj.name=plugObj.name||len;plugObj.callPriority=plugObj.callPriority||len;plugs[plugObj.name]=plugObj};return api}();var draw=function(){var api={};var drawMineralList=function(ctx,obj,startY,fontSize){startY=startY===undefined?0:startY;fontSize=fontSize||10;if(obj.minerals){ctx.font=fontSize+"px arial";Object.keys(obj.minerals).forEach(function(min,i){ctx.fillText(min+": "+obj.minerals[min].toFixed(2),10,startY+i*fontSize)})}};api.sectionData=function(sm,section){ctx.fillStyle="white";ctx.textAlign="left";ctx.textBaseline="top";ctx.font="15px arial";ctx.fillText("section "+section.i,10,10);ctx.font="10px arial";ctx.fillText("temp: "+section.temp.toFixed(2),10,30);ctx.fillText("groundTemp: "+section.groundTemp.toFixed(2),10,40);ctx.fillText("magmatism: "+section.magmatism.toFixed(2),10,50);ctx.fillText("elevation: "+section.elevation.total,10,70);drawMineralList(ctx,section,90,10)};var drawSectionElevationMark=function(sm,section){var ctx=sm.ctx,a=Math.PI*2*(section.i/sm.game.sections.length)+Math.PI,el=section.radius+section.elevation.total/sm.game.geoData.maxElevation*32,cx=section.x+Math.cos(a)*el,cy=section.y+Math.sin(a)*el,sx=cx+Math.cos(a-Math.PI/2)*10,sy=cy+Math.sin(a-Math.PI/2)*10,ex=cx+Math.cos(a+Math.PI/2)*10,ey=cy+Math.sin(a+Math.PI/2)*10;ctx.strokeStyle="red";ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(ex,ey);ctx.stroke()};var drawSectionCircle=function(sm,section){var ctx=sm.ctx;ctx.fillStyle="blue";if(section.elevation.total>sm.game.geoData.seaLevel){ctx.fillStyle="brown"}ctx.strokeStyle="white";ctx.lineWidth=.25+2.75*section.per;ctx.beginPath();ctx.arc(section.x,section.y,section.radius,0,Math.PI*2);ctx.fill();ctx.globalAlpha=section.per.toFixed(2);ctx.stroke();ctx.globalAlpha=1};var drawAtmoWaterCircle=function(sm,section){var ctx=sm.ctx,a=Math.PI*2*(section.i/sm.game.sections.length)+Math.PI,x=section.x+Math.cos(a)*section.radius*2,y=section.y+Math.sin(a)*section.radius*2;ctx.strokeStyle="rgba(255,255,255,0.3)";ctx.lineWidth=1;ctx.beginPath();ctx.arc(x,y,section.radius/4,0,Math.PI*2);ctx.stroke();ctx.fillStyle="white";if(section.atmo.water.rainCount>0){ctx.fillStyle="gray"}ctx.beginPath();ctx.arc(x,y,section.radius/4*section.atmo.water.per,0,Math.PI*2);ctx.fill();ctx.fillStyle="rgba(0,255,0,1)"};api.sections=function(sm){var ctx=sm.ctx;sm.game.sections.forEach(function(section){drawSectionCircle(sm,section);drawSectionElevationMark(sm,section);drawAtmoWaterCircle(sm,section);ctx.fillStyle="white";ctx.textAlign="center";ctx.textBaseline="middle";ctx.font="8px arial";var w=section.water;ctx.fillText(w.evaporation.toFixed(2),section.x,section.y-5);ctx.fillText(w.amount,section.x,section.y+5)})};api.sunData=function(sm,sun){var game=sm.game;ctx.fillStyle="white";ctx.textAlign="left";ctx.textBaseline="top";ctx.font="15px arial";ctx.fillText("Sun Status: ",10,10);ctx.font="10px arial";ctx.fillText("status: "+game.sun.state,10,30);ctx.fillText("years: "+game.tempData.years,10,40);ctx.fillText("temp: "+sun.temp.toFixed(2),10,50);ctx.fillText("tempLevel: "+game.tempData.i+"/"+Number(game.tempData.len-1),10,60);drawMineralList(ctx,sun,70,10);var h=100,w=100,sy=150,sx=200;ctx.fillStyle="#5f5f5f";ctx.fillRect(sx,sy-h,w,h);ctx.beginPath();sun.sunGrid.data.forEach(function(tempObj){ctx.strokeStyle="white";ctx.fillStyle="black";var temp=tempObj.valueOf(),y=sy-h*(temp/sun.sunGrid.max),x=sx+w*tempObj.per;if(tempObj.i===0){ctx.moveTo(x,y)}else{ctx.lineTo(x,y)}if(tempObj.i===game.tempData.i){ctx.stroke();ctx.beginPath();ctx.arc(x,y,2,0,Math.PI*2);ctx.stroke();ctx.fill();ctx.beginPath()}});ctx.stroke()};api.sun=function(sm){var sun=sm.game.sun,color="yellow",textColor="black",ctx=sm.ctx;if(sun.state==="dead"){color="black";textColor="white"}ctx.fillStyle=color;ctx.beginPath();ctx.arc(sun.x,sun.y,sun.radius,0,Math.PI*2);ctx.fill();ctx.fillStyle=textColor;ctx.font="10px arial";if(sun.state==="alive"){ctx.fillText(Math.round(sun.temp),sun.x,sun.y)}if(sun.state==="dead"){ctx.fillText(Math.round(sun.toAlivePer*100),sun.x,sun.y)}};api.back=function(sm){sm.ctx.fillStyle="#202020";sm.ctx.fillRect(0,0,sm.canvas.width,sm.canvas.height)};api.disp=function(sm){var ctx=sm.ctx;ctx.fillStyle="white";ctx.textAlign="left";ctx.textBaseline="top";ctx.font="10px courier";ctx.fillText("year: "+sm.game.year,3,5);ctx.fillText("totalMass: "+sm.game.geoData.totalMass,3,15)};api.ver=function(sm){var ctx=sm.ctx;ctx.fillStyle="white";ctx.textAlign="left";ctx.textBaseline="top";ctx.font="10px courier";ctx.fillText("v"+sm.ver,10,sm.canvas.height-15)};return api}();gameMod.load({name:"sun",callPriority:"0",create:function(game,opt){var sun=game.sun;sun.state="dead";sun.spawnRate=20;sun.deadYears=0;sun.toAlivePer=0;sun.lifeSpan=0},onDeltaYear:function(game,deltaYears){var sun=game.sun;if(sun.state==="explode"){sun.deadYears=0;sun.toAlivePer=0;sun.state="dead"}if(sun.state==="dead"){sun.deadYears+=deltaYears;sun.deadYears=sun.deadYears>sun.spawnRate?sun.spawnRate:sun.deadYears;sun.toAlivePer=sun.deadYears/sun.spawnRate;if(sun.toAlivePer>=1){sun.state="alive";sun.lifeSpan=1e4}}if(sun.state==="alive"){sun.lifeSpan-=deltaYears;sun.lifeSpan=sun.lifeSpan<0?0:sun.lifeSpan;if(sun.lifeSpan===0){sun.state="explode"}}}});gameMod.load(function(){var updateSun=function(game,deltaYears){var td=game.tempData;if(game.sun.state==="dead"){game.sun.temp=0;td.years=0;td.i=0;td.globalMaxGroundTemp=game.tempData.max}if(game.sun.state==="alive"){updateLiveSun(game,deltaYears)}};var updateLiveSun=function(game,deltaYears){var td=game.tempData;td.years+=deltaYears;td.i=Math.floor(td.years/td.iAtYears);td.i=td.i>=td.len?td.len-1:td.i;td.temp=utils.createLogPerObject(td.i,td.len,td.base,td.max);game.sun.temp=td.temp.valueOf();td.globalMaxGroundTemp=game.sun.temp/10};var updateTempSections=function(game,deltaYears){var i=game.sections.length,td=game.tempData,section;while(i--){section=game.sections[i];if(Math.floor(section.per*100)>=49){section.groundTemp+=game.sun.temp/10*section.per}else{section.groundTemp-=section.groundTemp/100}section.maxGroundTemp=td.globalMaxGroundTemp*section.per;section.groundTemp=section.groundTemp<.25?0:section.groundTemp;section.groundTemp=section.groundTemp>section.maxGroundTemp?section.maxGroundTemp:section.groundTemp;section.temp=section.groundTemp+game.sun.temp*section.per}};return{name:"temp",callPriority:"1.0",create:function(game,opt){var td=game.tempData={i:0,len:100,base:10,max:500,years:0,iAtYears:100,temp:{},globalMaxGroundTemp:0};updateSun(game,0);game.sections=game.sections.map(function(section){section.temp=0;section.groundTemp=0;return section})},onDeltaYear:function(game,deltaYears){updateSun(game,deltaYears);updateTempSections(game,deltaYears)}}}());gameMod.load(function(){var getMinDelta=function(sun,rate,temp,deltaYears){return rate*Math.floor(sun.temp/temp)*deltaYears};var createMineralsObj=function(){return{copper:0,iron:0}};return{name:"fusion",callPriority:"1.1",create:function(game,opt){game.sun.minerals=createMineralsObj();var i=game.sections.length,section;while(i--){section=game.sections[i];section.minerals=createMineralsObj()}},onDeltaYear:function(game,deltaYears){var sun=game.sun;if(sun.state==="alive"){if(sun.temp>=10){sun.minerals.iron+=getMinDelta(sun,1,10,deltaYears)}if(sun.temp>=25){sun.minerals.copper+=getMinDelta(sun,.5,25,deltaYears)}var i=game.sections.length,section;while(i--){section=game.sections[i];if(section.per>.95){Object.keys(sun.minerals).forEach(function(minKey){var minCount=sun.minerals[minKey];var transferAmount=1*deltaYears;if(minCount>=transferAmount){section.minerals[minKey]+=transferAmount;sun.minerals[minKey]-=transferAmount}})}}}if(sun.state==="explode"){Object.keys(sun.minerals).forEach(function(minKey){var minCount=sun.minerals[minKey],i=game.sections.length,section;if(minCount>0){while(i--){section=game.sections[i];section.minerals[minKey]+=Math.floor(minCount/game.sections.length*section.per)}sun.minerals[minKey]=0}})}}}}());gameMod.load(function(){var tabulateObjectMass=function(obj){var i=0,len=Object.keys(obj.minerals).length,minKey,min,mass=0;while(i<len){minKey=Object.keys(obj.minerals)[i];min=obj.minerals[minKey];mass+=min;i+=1}return mass};var setTotalMass=function(game){var gd=game.geoData,i=0,len=game.sections.length,mass,section;gd.totalMass=0;while(i<len){section=game.sections[i];section.totalMass=tabulateObjectMass(section);gd.totalMass+=section.totalMass;i+=1}};var updateSectionValues=function(game,deltaYears){var gd=game.geoData,i=0,len=game.sections.length,mass,section;while(i<len){section=game.sections[i];section.massPer=0;if(section.totalMass>0){section.massPer=section.totalMass/gd.totalMass;section.magmatism=section.massPer*(section.groundTemp/game.tempData.globalMaxGroundTemp);var elObj=section.elevation;elObj.base=elObj.max*.25*section.massPer;if(section.per<.4||section.per>.6){elObj.magma=elObj.magma+section.magmatism*deltaYears*gd.maxElevationPerYear;elObj.magma=elObj.magma-section.erosion*deltaYears*gd.maxErosionPerYear;elObj.magma=elObj.magma>elObj.max*.75?elObj.max*.75:elObj.magma;elObj.magma=elObj.magma<0?0:elObj.magma}section.elevation.total=section.elevation.base+section.elevation.magma}i+=1}};return{name:"geo",callPriority:"2",create:function(game,opt){game.geoData={totalMass:0,maxElevation:1e3,maxElevationPerYear:10,maxErosionPerYear:1,seaLevel:30};var gd=game.geoData;game.sections.forEach(function(section){section.totalMass=0;section.massPer=0;section.magmatism=0;section.erosion=.5;section.elevation={max:1e3,base:0,magma:0,total:0}})},onDeltaYear:function(game,deltaYears){setTotalMass(game);updateSectionValues(game,deltaYears)}}}());gameMod.load(function(){var distributeWater=function(game){var hd=game.hydroData;var perSection=Math.floor(hd.water.total/game.sections.length),oddWater=hd.water.total%game.sections.length;game.sections.forEach(function(section){section.water.amount=perSection});game.sections[0].water.amount+=oddWater};var transferElevation=function(game,section){var len=game.sections.length;var n1=game.sections[utils.mod(section.i-1,len)];var n2=game.sections[utils.mod(section.i+1,len)];if(section.elevation.total+section.water.amount>n1.elevation.total+n1.water.amount&&section.water.amount>=1){section.water.amount-=1;n1.water.amount+=1}if(section.elevation.total+section.water.amount>n2.elevation.total+n2.water.amount&&section.water.amount>=1){section.water.amount-=1;n2.water.amount+=1}};var updateSectionValues=function(game,deltaYears){var hd=game.hydroData,i=0,len=game.sections.length,section;while(i<len){section=game.sections[i];transferElevation(game,section);section.water.evaporation=section.temp/100;section.water.evaporation=section.water.evaporation>1?1:section.water.evaporation;section.water.per=section.water.amount/hd.water.total;i+=1}};return{name:"hydro",callPriority:"2.1",create:function(game,opt){console.log(this.name);game.hydroData={water:{total:1e3}};game.sections.forEach(function(section){section.water={amount:0,evaporation:0,per:0}});distributeWater(game)},onDeltaYear:function(game,deltaYears){updateSectionValues(game,deltaYears)}}}());gameMod.load(function(){var evaporation=function(section){if(section.water.evaporation>.1&&section.water.amount>=1){section.atmo.water.amount+=1;section.water.amount-=1}};var transferAtmo=function(game,section){var len=game.sections.length,n1=game.sections[utils.mod(section.i-1,len)],n2=game.sections[utils.mod(section.i+1,len)];if(section.atmo.water.amount>n1.atmo.water.amount&&section.atmo.water.amount>=1){section.atmo.water.amount-=1;n1.atmo.water.amount+=1}if(section.atmo.water.amount>n2.atmo.water.amount&&section.atmo.water.amount>=1){section.atmo.water.amount-=1;n2.atmo.water.amount+=1}};var rain=function(game,section){var roll=Math.random(),delta,secAtmo=section.atmo;if(secAtmo.water.rainCount<=0){if(roll<secAtmo.water.rainPer){secAtmo.water.rainCount=Math.round(game.atmoData.rainCountMax*Math.random())}}if(secAtmo.water.amount>=1&&secAtmo.water.rainCount>0){delta=Math.floor(secAtmo.water.amount*game.atmoData.maxWaterPercent);delta=delta>1?delta:1;secAtmo.water.amount-=delta;section.water.amount+=delta;secAtmo.water.rainCount-=1}};var setPerValues=function(game){var highAtmoWaterAmount=Math.max.apply(null,game.sections.map(function(section){return section.atmo.water.amount}));game.sections.forEach(function(section){section.atmo.water.per=section.atmo.water.amount/(highAtmoWaterAmount||1)})};var updateSectionValues=function(game,deltaYears){var hd=game.hydroData,i=0,len=game.sections.length,section;while(i<len){section=game.sections[i];evaporation(section);transferAtmo(game,section);rain(game,section);i+=1}setPerValues(game)};return{name:"atmo",callPriority:"2.2",create:function(game,opt){console.log(this.name);game.atmoData={rainCountMax:10,maxWaterPercent:.2};game.sections.forEach(function(section){section.atmo={water:{rainPer:.05,rainCount:0,amount:0,per:0}}})},onDeltaYear:function(game,deltaYears){updateSectionValues(game,deltaYears)}}}());var canvas=document.createElement("canvas"),ctx=canvas.getContext("2d"),container=document.getElementById("canvas-app")||document.body;container.appendChild(canvas);canvas.width=320;canvas.height=240;ctx.translate(.5,.5);var changeState=function(sm,stateKey,opt){opt=opt||{};var newState=sm.states[stateKey];if(newState.start){newState.start(sm,opt)}sm.currentState=stateKey};var states={game:{init:function(sm){sm.game=gameMod.create({canvas:sm.canvas,sectionCount:19,worldRadius:100,yearRate:.25,year:0})},update:function(sm,secs){gameMod.update(sm.game,secs);draw.back(sm);draw.sections(sm);draw.sun(sm);draw.disp(sm);draw.ver(sm)},pointerStart:function(sm,pos,e){},pointerMove:function(sm,pos,e){var sun=sm.game.sun;if(sm.input.pointerDown){gameMod.moveSun(sm.game,pos)}},pointerEnd:function(sm,pos){if(sm.input.d<3){var section=gameMod.getSectionByPos(sm.game,pos.x,pos.y);if(section){changeState(sm,"observe_section",{section:section})}if(utils.distance(sm.game.sun.x,sm.game.sun.y,pos.x,pos.y)<=sm.game.sun.radius){changeState(sm,"observe_sun",{})}}}},observe_section:{data:{section:{}},start:function(sm,opt){sm.states["observe_section"].data.section=opt.section},update:function(sm,secs){gameMod.update(sm.game,secs);draw.back(sm);draw.sectionData(sm,sm.states["observe_section"].data.section)},pointerEnd:function(sm){changeState(sm,"game",{})}},observe_sun:{data:{},start:function(sm,opt){},update:function(sm,secs){var state=sm.states["observe_sun"],td=sm.game.tempData;gameMod.update(sm.game,secs);sm.game.sun.sunGrid=utils.createLogPerCollection({len:td.len,base:td.base,max:td.max});draw.back(sm);draw.sunData(sm,sm.game.sun)},pointerEnd:function(sm){changeState(sm,"game",{})}}};var sm={ver:"0.3.0",canvas:canvas,currentState:"game",ctx:ctx,game:{},states:states,input:{pointerDown:false,d:0,startPos:{x:0,y:0},pos:{x:0,y:0}}};var pointerHanders={start:function(sm,pos,e){var pos=sm.input.pos;sm.input.pointerDown=true;sm.input.startPos={x:pos.x,y:pos.y};sm.input.d=0;var method=states[sm.currentState].pointerStart;if(method){method(sm,pos,e)}},move:function(sm,pos,e){var method=states[sm.currentState].pointerMove,startPos=sm.input.startPos;sm.input.d=utils.distance(startPos.x,startPos.y,pos.x,pos.y);if(method){method(sm,pos,e)}},end:function(sm,pos,e){sm.input.pointerDown=false;var method=states[sm.currentState].pointerEnd;if(method){method(sm,pos,e)}}};var createPointerHandler=function(sm,type){return function(e){var pos=utils.getCanvasRelative(e);sm.input.pos=pos;e.preventDefault();pointerHanders[type](sm,pos,e)}};canvas.addEventListener("mousedown",createPointerHandler(sm,"start"));canvas.addEventListener("mousemove",createPointerHandler(sm,"move"));canvas.addEventListener("mouseup",createPointerHandler(sm,"end"));canvas.addEventListener("touchstart",createPointerHandler(sm,"start"));canvas.addEventListener("touchmove",createPointerHandler(sm,"move"));canvas.addEventListener("touchend",createPointerHandler(sm,"end"));states[sm.currentState].init(sm);var lt=new Date,FPS_target=30;var loop=function(){var now=new Date,t=now-lt,secs=t/1e3;requestAnimationFrame(loop);if(t>=1e3/FPS_target){states[sm.currentState].update(sm,secs);lt=now}};loop();</script>

## 1 - The geo.js plug-in

The very first version of Mr Sun Geo is just the addition of one plug-in on top of what I worked out in Mr Sun Temp 0.5.0. Geo stands for Geology, and as such this plug-in adds properties such as magmatism, and elevation to the game world section objects. 

The plug-in alone proved to be a little time consuming just to get some of the basics worked out with how the position of the sun object effects the increase of elevation. Values that are added in by way of the temp.js plug-in are used to set magmatimsm, and magmatism is used to find the rate at which elevation will go up for each game year. There is also an erosion property that is part of this module, the additional plug-ins that have to do with the hydrosphere, and the atmosphere will have will have an impact on that value.

```js
// geo.js plug-in
gameMod.load((function () {
        // tabulate the mass of an object
        var tabulateObjectMass = function (obj) {
            var i = 0,
            len = Object.keys(obj.minerals).length,
            minKey,
            min,
            mass = 0;
            while (i < len) {
                minKey = Object.keys(obj.minerals)[i];
                min = obj.minerals[minKey];
                mass += min;
                i += 1;
            }
            return mass;
        };
        // set total mass by tabulating all sections
        var setTotalMass = function (game) {
            var gd = game.geoData,
            i = 0,
            len = game.sections.length,
            mass,
            section;
            gd.totalMass = 0;
            while (i < len) {
                section = game.sections[i];
                section.totalMass = tabulateObjectMass(section);
                gd.totalMass += section.totalMass;
                i += 1;
            }
        };
        // set massPer prop for all sections
        var updateSectionValues = function (game, deltaYears) {
            var gd = game.geoData,
            i = 0,
            len = game.sections.length,
            mass,
            section;
            while (i < len) {
                section = game.sections[i];
                section.massPer = 0;
                if (section.totalMass > 0) {
                    // set mass percentage
                    section.massPer = section.totalMass / gd.totalMass;
                    // set magmatism
                    section.magmatism = section.massPer * (section.groundTemp / game.tempData.globalMaxGroundTemp);
                    // elevation
                    section.elevation = section.elevation + section.magmatism * deltaYears * gd.maxElevationPerYear;
                    section.elevation = section.elevation - section.erosion * deltaYears * gd.maxErosionPerYear;
                    section.elevation = section.elevation > gd.maxElevation ? gd.maxElevation: section.elevation;
                    section.elevation = section.elevation < 0 ? 0: section.elevation;
                }
                i += 1;
            }
        };
        return {
            name: 'geo',
            callPriority: '2',
            create: function (game, opt) {
                game.geoData = {
                    totalMass: 0,
                    maxElevation: 1000,
                    maxElevationPerYear: 10,
                    maxErosionPerYear: 1,
                    seaLevel: 0
                };
                var gd = game.geoData;
 
                game.sections.forEach(function(section){
                    section.totalMass = 0;
                    section.massPer = 0;
                    section.magmatism = 0;
                    section.erosion = 0.5;
                    section.elevation = 0;
                });
 
            },
            onDeltaYear: function (game, deltaYears) {
                setTotalMass(game);
                updateSectionValues(game, deltaYears);
            }
        };
 
    }
        ()));
```

## 2 - The hydo.js plug-in

Another addition in terms of plug-ins here is the introduction of a plug in that will handle aspects of the hydosphere of the game world. For now as of 0.3.0 at least this hydo.js plug-in will just define the total amount of game water to work with, and how it will transfer from one section to another. For the most part this is just an exercise of a plug-in working on top of another plug-in which in this case is geo.js.

```js
// hydro.js plug-in
gameMod.load((function () {
        
        // distribute total water to world sections
        var distributeWater = function(game){
            var hd = game.hydroData;
            var perSection = Math.floor(hd.water.total / game.sections.length),
            oddWater = hd.water.total % game.sections.length;
            game.sections.forEach(function(section){
                section.water.amount = perSection;
            });
            game.sections[0].water.amount += oddWater;
        };
        // transfer water from one section to another based on elevation
        var transferElevation = function(game, section){
             var len = game.sections.length;
             var n1 = game.sections[utils.mod(section.i - 1, len)];
             var n2 = game.sections[utils.mod(section.i + 1, len)];
             if(section.elevation.total + section.water.amount > (n1.elevation.total + n1.water.amount) && section.water.amount >= 1){
                 section.water.amount -= 1;
                 n1.water.amount += 1;
             }
             if(section.elevation.total + section.water.amount > (n2.elevation.total + n2.water.amount) && section.water.amount >= 1){
                 section.water.amount -= 1;
                 n2.water.amount += 1;
             }
        };
        var updateSectionValues = function (game, deltaYears) {
            var hd = game.hydroData,
            i = 0,
            len = game.sections.length,
            section;
            while (i < len) {
                section = game.sections[i];
                // transfer water by elevation
                transferElevation(game, section);
                // set evaporation
                section.water.evaporation = section.temp / 100;
                section.water.evaporation = section.water.evaporation > 1 ? 1 : section.water.evaporation;
                // water per
                section.water.per = section.water.amount / hd.water.total;
 
                i += 1;
            }
        };
        // plugObj for hydro.js
        return {
            name: 'hydro',
            callPriority: '2.1',
            create: function (game, opt) {
                console.log(this.name);
                // create hydroData Object
                game.hydroData = {
                    water:{
                        total : 1000
                    }
                };
                // set defaults for section.water
                game.sections.forEach(function(section){
                    section.water = {
                        amount: 0,
                        evaporation: 0,
                        per: 0
                    };
                });
                distributeWater(game);
            },
            onDeltaYear: function (game, deltaYears) {
                updateSectionValues(game, deltaYears);
            }
        };
 
    }
        ()));
```

## 3 - The atmo.js plug-in for a starting plug-in that has to do with the atmosphere.

There is now a geo.js plug-in that has to do with increases in elevation, and a hydo.js that has to do with water, bit that brings up the question of evaporation and rain. Should that all be part of hydro.js, or should it be part of another plug-in that has to do with the atmosphere? In any case I am going to want a plug-in that has to do with the creating and updatng of state that has to do with the atmosphere of the game world.

```js
// atmo.js plug-in
gameMod.load((function () {
 
        // evaporation
        var evaporation = function (section) {
            // transfer water from water object to atmo object
            if (section.water.evaporation > 0.10 && section.water.amount >= 1) {
                section.atmo.water.amount += 1;
                section.water.amount -= 1;
            }
        };
        // transfer water between atmo objects
        var transferAtmo = function (game, section) {
            var len = game.sections.length,
            n1 = game.sections[utils.mod(section.i - 1, len)],
            n2 = game.sections[utils.mod(section.i + 1, len)];
            if (section.atmo.water.amount > n1.atmo.water.amount && section.atmo.water.amount >= 1) {
                section.atmo.water.amount -= 1;
                n1.atmo.water.amount += 1;
            }
            if (section.atmo.water.amount > n2.atmo.water.amount && section.atmo.water.amount >= 1) {
                section.atmo.water.amount -= 1;
                n2.atmo.water.amount += 1;
            }
        };
        // rain water down back to the section water object
        var rain = function (game, section) {
            var roll = Math.random(),
            delta,
            secAtmo = section.atmo;
            if (secAtmo.water.rainCount <= 0) {
                if (roll < secAtmo.water.rainPer) {
                    //secAtmo.water.rainCount = 2;
                    secAtmo.water.rainCount = Math.round(game.atmoData.rainCountMax * Math.random());
                }
            }
            if (secAtmo.water.amount >= 1 && secAtmo.water.rainCount > 0) {
                delta = Math.floor(secAtmo.water.amount * game.atmoData.maxWaterPercent);
                delta = delta > 1 ? delta : 1;
                secAtmo.water.amount -= delta;
                section.water.amount += delta;
                secAtmo.water.rainCount -= 1;
            }
        };
        // set per values
        var setPerValues = function (game) {
            var highAtmoWaterAmount = Math.max.apply(null, game.sections.map(function (section) {
                        return section.atmo.water.amount;
                    }));
            game.sections.forEach(function (section) {
                section.atmo.water.per = section.atmo.water.amount / (highAtmoWaterAmount || 1);
            });
        };
        // update section objects
        var updateSectionValues = function (game, deltaYears) {
            var hd = game.hydroData,
            i = 0,
            len = game.sections.length,
            section;
            while (i < len) {
                section = game.sections[i];
 
                // water evaporation, transfer, and rain
                evaporation(section);
                transferAtmo(game, section);
                rain(game, section);
 
                i += 1;
            }
 
            setPerValues(game);
 
        };
        // plugObj for hydro.js
        return {
            name: 'atmo',
            callPriority: '2.2',
            create: function (game, opt) {
                console.log(this.name);
                // create hydroData Object
                game.atmoData = {
                    rainCountMax: 10,
                    maxWaterPercent: 0.20 // percentage of water per rainCount
                };
                // set defaults for section.water
                game.sections.forEach(function (section) {
                    section.atmo = {
                        water: {
                            //rain: false,
                            rainPer: 0.05,
                            rainCount: 0,
                            amount: 0,
                            per: 0
                        }
                    };
                });
            },
            onDeltaYear: function (game, deltaYears) {
                updateSectionValues(game, deltaYears);
            }
        };
 
    }
        ()));
```

## 4 - Conclusion

So far I am happy with how this project is coming along, but there is still much more work ended until this will start to look like an actual game. I am going to want to add additional plug-ins that will have to do with life and civilization at some point, however maybe there are a few more that naaed to be worked out before I get to that point.

I am going to want to add some additional plug-ins that have to do with graphics, and
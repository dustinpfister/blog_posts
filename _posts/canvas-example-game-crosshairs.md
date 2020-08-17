---
title: Canvas example of a cross hairs game
date: 2020-07-29 15:44:00
tags: [canvas]
layout: post
categories: canvas
id: 689
updated: 2020-08-17 15:44:23
version: 1.24
---

For this weeks [canvas example](/2020/03/23/canvas-example/) post I made a quick little cross hairs type game idea that just popped into my head one day. This is a game where I just use the mouse or touch events to move a cross hairs around the canvas, and depending on where the cross hairs is located will result in panning movement around a map, or firing of the current weapon at some map cells. That is the basic idea at least, but I have added much more to it then just that at this point when it comes to choosing this example as something to continue working on at least a little each day, or at least fairly often.

At the time that I started this not much thought went into the other aspects of this that can help turn the game into something that is a little fun, interesting, or just simply addictive. I think that it might be fun to have a game where you just go around and shoot at stuff below me, and just rack up a whole lot of damage on what there is below in a top down perspective. So far that is more or less what this is, but it could still use a little something more that I have not yet hammered down thus far I think. Maybe put some things in the map that fire back for one thing, so that it is a kind of game where it is possible to, you know, loose. 

However another thought was to make this just some kind of idle game where there are no such enemies that fight back, I am just blowing stuff up, and it keeps growing back. I all ready have some code worked out that automates the process of playing that I have enabled by default that will kick in after a moment of inactivity, but at any time the player can just take over and start playing. This is a kind of feature that I find myself enjoying when it comes to where I am at when it comes to playing video games, I can not say that I am that interested in playing them any more, but I sure have not lost interest in making them. The act of making the game has become the game sort of speak. So I seem to like games that involve things like away production, and games that to one extent or another play themselves.

I made [another canvas example that is like this one that I called just simply pointer movement](/2020/01/26/canvas-example-pointer-movement/). That one was programed a little differently from this one as that was just simply a means to move around a map by clicking and dragging away from the point that was clicked. Here I have a set of circles fixed at the center of the canvas, or any other location that I choose to fix these circle areas to.There is an outer circle area that is used to move around based on the distance from the end of the inner circle rather than the center point. In addition the inner circle area will not result in any movement, but is used as an array where you can shoot at things, but not move. So I guess this kind of interface can be programed a whole bunch of different ways, but it is still more or less the same basic thing.

<!-- more -->

<div id="canvas-app"style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
<script>var utils={};utils.distance=function(x1,y1,x2,y2){return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));};utils.getCanvasRelative=function(e){var canvas=e.target,bx=canvas.getBoundingClientRect();return{x:(e.changedTouches?e.changedTouches[0].clientX:e.clientX)-bx.left,y:(e.changedTouches?e.changedTouches[0].clientY:e.clientY)-bx.top,bx:bx};};utils.logPer=function(per,high){high=high===undefined?2:high;per=per<0?0:per;per=per>1?1:per;return Math.log((1+high-2)+per)/Math.log(high);};var XP=(function(){var DEFAULTS={level:1,xp:0,cap:30,deltaNext:50};var set=function(xp,deltaNext){return(1+Math.sqrt(1+8*xp/deltaNext))/2;};var getXPtoLevel=function(level,deltaNext){return((Math.pow(level,2)-level)*deltaNext)/2;};var parseByXP=function(xp,cap,deltaNext){xp=xp===undefined?DEFAULTS.xp:xp;cap=cap===undefined?DEFAULTS.cap:cap;deltaNext=deltaNext===undefined?DEFAULTS.deltaNext:deltaNext;var l=set(xp,deltaNext);l=l>cap?cap:l;var level=Math.floor(l),forNext=getXPtoLevel(level+1,deltaNext);forNext=l===cap?Infinity:forNext;var toNext=l===cap?Infinity:forNext-xp;var forLast=getXPtoLevel(level,deltaNext);return{level:level,levelFrac:l,xp:xp,per:(xp-forLast)/(forNext-forLast),forNext:forNext,toNext:toNext,forLast:forLast};};return{parseByLevel:function(l,cap,deltaNext){l=l===undefined?DEFAULTS.level:l;deltaNext=deltaNext===undefined?DEFAULTS.deltaNext:deltaNext;var xp=getXPtoLevel(l,deltaNext);console.log(xp);return parseByXP(xp,cap,deltaNext);},parseByXP:parseByXP};} ());var crossMod=(function(){var isInInner=function(cross){var ch=cross.crosshairs,center=cross.center;return utils.distance(ch.x,ch.y,center.x,center.y)<cross.radiusInner;};var isInOuter=function(cross){var ch=cross.crosshairs,center=cross.center;return utils.distance(ch.x,ch.y,center.x,center.y)>=cross.radiusInner;};var isOutOfBounds=function(cross){var ch=cross.crosshairs,center=cross.center;return utils.distance(ch.x,ch.y,center.x,center.y)>=cross.radiusOuter;};var moveOffset=function(cross,secs){var ch=cross.crosshairs,center=cross.center,per={min:0.1,max:1,current:0.1},d=utils.distance(ch.x,ch.y,center.x,center.y)-cross.radiusInner;per.current=per.min+(per.max-per.min)*(d/cross.radiusDiff);cross.offset.x+=Math.cos(ch.heading)*cross.offset.pps*per.current*secs;cross.offset.y+=Math.sin(ch.heading)*cross.offset.pps*per.current*secs;};return{isInInner:isInInner,isInOuter:isInOuter,create:function(opt){opt=opt||{};var cross={userDown:false,moveBackEnabled:false,pps:opt.pps||128,radiusInner:opt.radiusInner||(240/4),radiusOuter:opt.radiusOuter||(240/2.125),radiusDiff:0,center:{x:opt.cx||(320/2),y:opt.cy||(240/2)},crosshairs:{x:320/2,y:240/2,heading:0,radius:16},offset:{x:opt.offsetX||0,y:opt.offsetY||0,pps:256}};cross.radiusDiff=cross.radiusOuter-cross.radiusInner;return cross;},update:function(cross,secs){secs=secs||0;var ch=cross.crosshairs,center=cross.center;ch.heading=Math.atan2(center.y-ch.y,center.x-ch.x);if(isOutOfBounds(cross)){ch.x=center.x;ch.y=center.y;cross.userDown=false;} if(isInOuter(cross)){if(!cross.userDown&&cross.moveBackEnabled){ch.x+=Math.cos(ch.heading)*cross.pps*secs;ch.y+=Math.sin(ch.heading)*cross.pps*secs;} moveOffset(cross,secs);}},userAction:function(cross,eventType,e){var pos=utils.getCanvasRelative(e),ch=cross.crosshairs;if(eventType==='start'){cross.userDown=true;ch.x=pos.x;ch.y=pos.y;} if(eventType==='end'){cross.userDown=false;} if(eventType==='move'){if(cross.userDown){ch.x=pos.x;ch.y=pos.y;}}}}} ());var mapMod=(function(){var cellTypes=[{i:0,type:'grass',HP:{min:5,max:10,base:1.05},autoHeal:{rate:0.5,amount:1}},{i:1,type:'tree',HP:{min:20,max:30,base:1.08},autoHeal:{rate:1,amount:5}},{i:2,type:'rock',HP:{min:35,max:50,base:1.15},autoHeal:{rate:3,amount:50}},];var setCellType=function(cell,typeIndex,opt){var level=cell.levelObj.level,min,max;opt=opt||{};cell.type=cellTypes[typeIndex];cell.typeIndex=typeIndex;cell.active=opt.active===undefined?true:opt.active;min=Math.pow(level,cell.type.HP.base)*cell.type.HP.min;max=Math.pow(level,cell.type.HP.base)*cell.type.HP.max;cell.maxHP=min+Math.round((max-min)*Math.random());cell.HP=opt.HP===undefined?cell.maxHP:opt.HP;cell.autoHeal.rate=cell.type.autoHeal.rate;cell.autoHeal.amount=cell.type.autoHeal.amount;};var getHighestDamageCell=function(map){return Math.max.apply(null,map.cells.map(function(cell){return cell.damage;}));};var get=function(map,x,y){if(x<0||y<0){return undefined;} if(x>=map.cellWidth||y>=map.cellHeight){return undefined;} return map.cells[y*map.cellWidth+x];};var autoHeal=function(cell,secs){cell.autoHeal.secs+=secs;if(cell.autoHeal.secs>=cell.autoHeal.rate){cell.autoHeal.secs%=cell.autoHeal.rate;cell.HP+=cell.autoHeal.amount;cell.HP=cell.HP>cell.maxHP?cell.maxHP:cell.HP;}};var getBorderCells=function(map,cell){var i=8,borderCell,cells=[],r,x,y;if(!cell){return[];} while(i--){r=Math.PI*2/8*i;x=Math.round(cell.x+Math.cos(r));y=Math.round(cell.y+Math.sin(r));borderCell=get(map,x,y);if(borderCell){cells.push(borderCell);}} return cells;};var getBorderCellsActiveCount=function(map,cell,active){active===undefined?true:active;var borderCells=getBorderCells(map,cell);return borderCells.reduce(function(acc,cell){acc=typeof acc==='object'?Number(acc.active===active):acc;return acc+=Number(cell.active==active);});};var getAllCellActiveState=function(map,active,condition){active=active===undefined?true:active;condition=condition===undefined?function(cell){return true;}:condition;return map.cells.filter(function(cell){if(cell.active===active&&condition(map,cell)){return true;} return false;});};var condition_gen_cell=function(map,cell){var borderCells=getBorderCells(map,cell);return getBorderCellsActiveCount(map,cell,true)>=1;};var getGenCells=function(map){return getAllCellActiveState(map,false,condition_gen_cell);};var popRandomCell=function(cells){var i=Math.floor(Math.random()*cells.length);return cells.splice(i,1)[0];};var gen=function(map,secs){var cells,cell,i;map.gen.secs+=secs;if(map.gen.secs>=map.gen.rate){map.gen.secs%=map.gen.rate;cells=getGenCells(map);i=map.gen.count;if(cells.length-i<0){i=cells.length;} if(i>0){while(i--){cell=popRandomCell(cells);setCellType(cell,Math.round(cell.damagePer*(cellTypes.length-1)));}}else{cells=getAllCellActiveState(map,true);if(cells.length===0){cell=map.cells[map.gen.startCells[Math.floor(Math.random()*map.gen.startCells.length)]];setCellType(cell,0);}}}};return{getAllCellActiveState:getAllCellActiveState,create:function(){var map={cellSize:32,cellWidth:8,cellHeight:8,cells:[],cellLevel:{cap:5,deltaNext:200},percentRemain:1,gen:{rate:1,secs:0,count:2,startCells:[27,28,35,36,0,63,56,7]},highDamageCell:0};var i=0,cell,x,y,len=map.cellWidth*map.cellHeight;while(i<len){cell={i:i,x:i%map.cellWidth,y:Math.floor(i/map.cellWidth),HP:50,maxHP:100,active:true,typeIndex:0,typeName:cellTypes[0].name,type:cellTypes[0],autoHeal:{rate:1,amount:5,secs:0},damage:0,damagePer:0,levelObj:XP.parseByXP(0,map.cellLevel.cap,map.cellLevel.deltaNext)};setCellType(cell,0);map.cells.push(cell);i+=1;} return map;},clampOffset:function(map,offset){offset.x=offset.x>0?0:offset.x;offset.y=offset.y>0?0:offset.y;offset.x=offset.x<map.cellWidth*map.cellSize* -1?map.cellWidth*map.cellSize* -1:offset.x;offset.y=offset.y<map.cellHeight*map.cellSize* -1?map.cellHeight*map.cellSize* -1:offset.y;},getAllFromPointAndRadius:function(map,x,y,r){var i=map.cells.length,d,cell,cells=[],dists=[];while(i--){cell=map.cells[i];d=utils.distance(cell.x,cell.y,x,y);if(d<=r){cells.push(cell);dists.push(d);}} return{cells:cells,dists:dists};},getWithCanvasPointAndOffset:function(map,canvasX,canvasY,offsetX,offsetY){var x=canvasX-160+Math.abs(offsetX),y=canvasY-120+Math.abs(offsetY);return get(map,Math.floor(x/map.cellSize),Math.floor(y/map.cellSize));},update:function(map,secs){var i,cell;map.highDamageCell=getHighestDamageCell(map);map.percentRemain=0;i=map.cells.length;while(i--){cell=map.cells[i];if(cell.HP<=0){cell.active=false;} if(cell.active){autoHeal(cell,secs);map.percentRemain+=cell.HP/cell.maxHP;} if(cell.damage!=0){cell.damagePer=cell.damage/map.highDamageCell;} cell.levelObj=XP.parseByXP(cell.damage,map.cellLevel.cap,map.cellLevel.deltaNext);} map.percentRemain/=map.cells.length;gen(map,secs);}}} ());var poolMod=(function(){return{create:function(opt){opt=opt||{};opt.count=opt.count||10;var i=0,pool=[];while(i<opt.count){pool.push({active:false,x:0,y:0,radius:8,heading:0,pps:32,lifespan:opt.lifespan||3,data:{},spawn:opt.spawn||function(obj,state){obj.active=true;},purge:opt.purge||function(obj,state){},update:opt.update||function(obj,state,secs){obj.x+=obj.pps*secs;obj.lifespan-=secs;}});i+=1;} return pool;},spawn:function(pool,game,opt){var i=pool.length,obj;while(i--){obj=pool[i];if(!obj.active){obj.active=true;obj.spawn.call(obj,obj,game,opt);break;}}},update:function(pool,state,secs){var i=pool.length,obj;while(i--){obj=pool[i];if(obj.active){obj.update(obj,state,secs);obj.lifespan=obj.lifespan<0?0:obj.lifespan;if(obj.lifespan===0){obj.active=false;obj.purge.call(obj,obj,state);}}}}}} ());var gameMod=(function(){var hardSet={maxSecs:0.25,deltaNext:10000,levelCap:100};var Weapons=[{name:'Blaster',pps:256,shotRate:0.125,blastRadius:1,maxDPS:10,accuracy:0.75,hitRadius:64,gunCount:1,level:{maxDPS_base:10,maxDPS_perLevel:5}},{name:'Assault Blaster',pps:512,shotRate:0.125,blastRadius:2,maxDPS:5,accuracy:0.5,hitRadius:64,gunCount:4,level:{maxDPS_base:5,maxDPS_perLevel:6}},{name:'Cannon',pps:256,shotRate:0.5,blastRadius:3,maxDPS:20,accuracy:0.25,hitRadius:32,gunCount:2,level:{maxDPS_base:15,maxDPS_perLevel:10}},{name:'Atom',pps:256,shotRate:1,blastRadius:10,maxDPS:75,accuracy:0.9,hitRadius:64,gunCount:1,level:{maxDPS_base:75,maxDPS_perLevel:50}}];var setWeaponsToLevel=function(game){var level=game.levelObj.level;Weapons.forEach(function(weapon){var lv=weapon.level;weapon.maxDPS=lv.maxDPS_base+lv.maxDPS_perLevel*level;weapon.accuracy=0.95-0.9*(1-level/hardSet.levelCap);});};var shotOptions={count:20,spawn:function(shot,game,radian){var offset=game.cross.offset,w=Weapons[game.weaponIndex],ch=game.cross.crosshairs,r=Math.random()*(Math.PI*2),d=w.hitRadius*(1-w.accuracy)*Math.random(),x=ch.x+Math.cos(r)*d,y=ch.y+Math.sin(r)*d,d;shot.x=x+Math.cos(radian)*game.canvas.width;shot.y=y+Math.sin(radian)*game.canvas.width;shot.heading=Math.atan2(y-shot.y,x-shot.x);d=utils.distance(shot.x,shot.y,x,y);shot.pps=w.pps;shot.lifespan=d/shot.pps;shot.offset=offset;},purge:function(shot,game){poolMod.spawn(game.explosions,game,shot);},update:function(shot,game,secs){shot.x+=Math.cos(shot.heading)*shot.pps*secs;shot.y+=Math.sin(shot.heading)*shot.pps*secs;shot.lifespan-=secs;}};var explosionOptions={count:20,spawn:function(ex,game,shot){var w=Weapons[game.weaponIndex];ex.x=shot.x;ex.y=shot.y;ex.data.offset={x:shot.offset.x,y:shot.offset.y};ex.data.radiusEnd=game.map.cellSize*w.blastRadius;ex.data.explosionTime=0.6;ex.data.maxDPS=w.maxDPS;;ex.lifespan=ex.data.explosionTime;ex.per=0;},purge:function(ex,game){},update:function(ex,game,secs){ex.per=(ex.data.explosionTime-ex.lifespan)/ex.data.explosionTime;ex.radius=ex.data.radiusEnd*ex.per;var cell=mapMod.getWithCanvasPointAndOffset(game.map,ex.x,ex.y,ex.data.offset.x,ex.data.offset.y),blastRadius=Math.ceil((ex.radius+0.01)/game.map.cellSize);if(cell){var targets=mapMod.getAllFromPointAndRadius(game.map,cell.x,cell.y,blastRadius);targets.cells.forEach(function(cell,i){var damage=ex.data.maxDPS*(1-(targets.dists[i]/blastRadius))*secs;if(cell.active){game.totalDamage+=damage;cell.HP-=damage;cell.HP=cell.HP<0?0:cell.HP;} cell.damage+=damage;});} ex.lifespan-=secs;}};var shoot=function(game){var w=Weapons[game.weaponIndex];if(game.shotSecs>=game.shotRate){var i=0,radian;while(i<w.gunCount){radian=Math.PI*2/4*i+Math.PI/4;poolMod.spawn(game.shots,game,radian);i+=1;} game.shotSecs=0;}};var autoPlay={setRandomTarget:function(game){var ch=game.cross.crosshairs,os=game.cross.offset,ap=game.autoPlay,map=game.map,activeCells=mapMod.getAllCellActiveState(map,true),x=Math.floor(map.cellWidth*Math.random()),y=Math.floor(map.cellHeight*Math.random());if(activeCells.length>=1){var cell=activeCells[Math.floor(activeCells.length*Math.random())];x=cell.x;y=cell.y;} ap.target.x=(map.cellSize/2+(map.cellSize*x))* -1;ap.target.y=(map.cellSize/2+(map.cellSize*y))* -1;},setByPercentRemain:function(game){var map=game.map,ap=game.autoPlay;game.weaponIndex=0;if(ap.behavior==='cannon'){game.weaponIndex=2;ap.maxShootTime=3;} if(ap.behavior==='total-kill'){game.weaponIndex=Weapons.length-1;ap.stopAtPercentRemain=0;} if(ap.behavior==='weapon-switch'){game.weaponIndex=Math.floor((Weapons.length)*utils.logPer(map.percentRemain,2));} game.weaponIndex=game.weaponIndex>=Weapons.length?Weapons.length-1:game.weaponIndex;if(map.percentRemain<ap.stopAtPercentRemain){ap.mode='move';}},modes:{move:function(game,secs){var ch=game.cross.crosshairs,os=game.cross.offset,ap=game.autoPlay,map=game.map,a=Math.atan2(os.y-ap.target.y,os.x-ap.target.x),cross=game.cross,d=utils.distance(os.x,os.y,ap.target.x,ap.target.y),delta=game.cross.radiusOuter-1;maxDelta=cross.radiusInner+cross.radiusDiff-1,minDelta=cross.radiusInner+5,slowDownDist=map.cellSize*4,minDist=map.cellSize/2,per=0;if(d<slowDownDist){per=1-d/slowDownDist;} ap.target.d=d;delta=maxDelta-(maxDelta-minDelta)*per;if(d<minDist){os.x=ap.target.x;os.y=ap.target.y;ap.shootTime=ap.maxShootTime;autoPlay.setRandomTarget(game);ap.mode='shoot';}else{ch.x=game.cross.center.x+Math.cos(a)*delta;ch.y=game.cross.center.y+Math.sin(a)*delta;}},shoot:function(game,secs){var ch=game.cross.crosshairs,os=game.cross.offset,ap=game.autoPlay,map=game.map;ch.x=game.cross.center.x;ch.y=game.cross.center.y;shoot(game);ap.shootTime-=secs;if(ap.shootTime<=0){ap.mode='move';autoPlay.setRandomTarget(game);}}},update:function(game,secs){if(game.autoPlay.enabled){var ch=game.cross.crosshairs,os=game.cross.offset,ap=game.autoPlay,map=game.map;game.autoPlay.delay-=secs;if(game.userDown){game.autoPlay.delay=game.autoPlay.maxDelay;} game.autoPlay.delay=game.autoPlay.delay<0?0:game.autoPlay.delay;if(game.autoPlay.delay===0){game.cross.moveBackEnabled=false;autoPlay.setByPercentRemain(game);autoPlay.modes[ap.mode](game,secs);}}}};return{Weapons:Weapons,create:function(opt){opt=opt||{};var game={levelObj:{},canvas:opt.canvas,map:mapMod.create(),cross:{},shots:poolMod.create(shotOptions),explosions:poolMod.create(explosionOptions),shotRate:1,shotSecs:0,weaponIndex:3,totalDamage:0,userDown:false,autoPlay:{enabled:true,behavior:'cannon',stopAtPercentRemain:0,delay:5,maxDelay:5,mode:'move',shootTime:5,maxShootTime:5,target:{x:-16,y:-16,d:0}}};game.levelObj=XP.parseByXP(game.totalDamage,hardSet.levelCap,hardSet.deltaNext);autoPlay.setRandomTarget(game);game.cross=crossMod.create({offsetX:game.map.cellWidth*game.map.cellSize/2* -1,offsetY:game.map.cellHeight*game.map.cellSize/2* -1,});return game;},update:function(game,secs){secs=secs>hardSet.maxSecs?hardSet.maxSecs:secs;game.shotRate=Weapons[game.weaponIndex].shotRate;crossMod.update(game.cross,secs);mapMod.clampOffset(game.map,game.cross.offset);mapMod.update(game.map,secs);poolMod.update(game.shots,game,secs);poolMod.update(game.explosions,game,secs);game.shotSecs+=secs;game.shotSecs=game.shotSecs>=game.shotRate?game.shotRate:game.shotSecs;if(crossMod.isInInner(game.cross)&&game.cross.userDown){shoot(game);} autoPlay.update(game,secs);game.levelObj=XP.parseByXP(game.totalDamage,hardSet.levelCap,hardSet.deltaNext);setWeaponsToLevel(game);}}} ());var genSheets=(function(){var createSheet=function(cellSize,cw,ch){var sheet={},canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');canvas.width=cellSize*cw;canvas.height=cellSize*ch;ctx.translate(0.5,0.5);sheet.canvas=canvas;sheet.ctx=ctx;sheet.cellWidth=cw;sheet.cellHeight=ch;sheet.cellSize=cellSize;return sheet;};var drawBasicBox=function(sheet,fill,stroke){var canvas=sheet.canvas,ctx=sheet.ctx;ctx.fillStyle=fill||'#008800';ctx.fillRect(-1,-1,canvas.width+1,canvas.height+1);ctx.strokeStyle=stroke||'lime';var i=0,s;while(i<sheet.cellWidth){ctx.save();ctx.translate(16+32*i,16);s=28-14*(i/sheet.cellWidth);ctx.beginPath();ctx.rect(-14,-14,s,s);ctx.stroke();ctx.restore();i+=1;}};var sheets=[];['#005500','#000088','#880000'].forEach(function(fill){var sheet=createSheet(32,10,1),canvas=sheet.canvas,ctx=sheet.ctx;drawBasicBox(sheet,fill,'#000000');sheets.push(sheet);});return{sheets:sheets};} ());var draw=(function(){var hpColors=['red','orange','lime'];var getHpColor=function(per){return hpColors[Math.floor((hpColors.length-0.01)*per)];};var drawBar=function(ctx,game,per,rStart,rLength,fill){var cross=game.cross,center=cross.center;ctx.lineWidth=3;ctx.strokeStyle='gray';ctx.beginPath();ctx.arc(center.x,center.y,cross.radiusInner+5,rStart,rStart+rLength);ctx.stroke();ctx.strokeStyle=fill||'lime';ctx.beginPath();ctx.arc(center.x,center.y,cross.radiusInner+5,rStart,rStart+rLength*per);ctx.stroke();};var drawCrossCircles=function(ctx,cross){ctx.strokeStyle='rgba(255,255,255,0.4)';ctx.fillStyle='rgba(255,0,0,0.4)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(cross.center.x,cross.center.y,cross.radiusInner,0,Math.PI*2);ctx.stroke();ctx.fill();ctx.fillStyle='rgba(0,0,0,0.2)';ctx.beginPath();ctx.arc(cross.center.x,cross.center.y,cross.radiusOuter,0,Math.PI*2);ctx.stroke();ctx.fill();ctx.beginPath();ctx.arc(cross.crosshairs.x,cross.crosshairs.y,cross.crosshairs.radius,0,Math.PI*2);ctx.stroke();};var drawCrossHairs=function(ctx,cross){var ch=cross.crosshairs;ctx.strokeStyle='rgba(200,0,0,0.5)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(ch.x,ch.y-ch.radius*1.5);ctx.lineTo(ch.x,ch.y+ch.radius*1.5);ctx.stroke();ctx.beginPath();ctx.moveTo(ch.x-ch.radius*1.5,ch.y);ctx.lineTo(ch.x+ch.radius*1.5,ch.y);ctx.stroke();};var drawPercentRemainBar=function(ctx,game){var cross=game.cross,center=cross.center,map=game.map;drawBar(ctx,game,map.percentRemain,Math.PI,Math.PI/2,getHpColor(map.percentRemain));};var drawAutoPlayDelayBar=function(ctx,game){var ap=game.autoPlay;drawBar(ctx,game,ap.delay/ap.maxDelay,0,Math.PI/4,'cyan');};var drawWeaponInfo=function(ctx,game){var center=game.cross.center;var w=gameMod.Weapons[game.weaponIndex];ctx.fillStyle='#ff6060';ctx.font='10px courier';ctx.textAlign='center';ctx.fillText('Weapon: '+w.name,center.x,center.y+75);ctx.fillText('maxDPS: '+w.maxDPS,center.x,center.y+85);};var drawCellHealthBar=function(ctx,map,cell,cross){var x=cell.x*map.cellSize+cross.offset.x+(320/2),y=cell.y*map.cellSize+cross.offset.y+(240/2);ctx.fillStyle=getHpColor(cell.HP/cell.maxHP);ctx.globalAlpha=0.5;ctx.fillRect(x,y,map.cellSize*(cell.HP/cell.maxHP),5);ctx.globalAlpha=1;};var setupDebug=function(ctx,game){ctx.fillStyle='rgba(0,0,0,0.4)';ctx.textBaseline='top';ctx.textAlign='left';ctx.fillRect(0,0,game.canvas.width,game.canvas.height);ctx.fillStyle='yellow';ctx.textBaseline='top';ctx.font='10px courier';};var cellLevel=function(ctx,cell,x,y){if(cell.active){ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='7px courier';ctx.fillText('L'+Math.floor(cell.levelObj.level),x+3,y+3);}};var debugModes={none:function(sm){},general:function(sm){var ctx=sm.ctx,canvas=sm.canvas,game=sm.game;setupDebug(ctx,sm.game);ctx.fillText('pos: '+game.cross.offset.x.toFixed(2)+','+game.cross.offset.y.toFixed(2),10,10);ctx.fillText('percent remain: '+Number(game.map.percentRemain*100).toFixed(2),10,20);ctx.fillText('weapon: '+gameMod.Weapons[game.weaponIndex].name,10,30);ctx.fillText('damage: '+Math.floor(game.totalDamage),10,40);ctx.fillText('high damage cell: '+Math.floor(game.map.highDamageCell),10,50);},weapon:function(sm){var ctx=sm.ctx;setupDebug(ctx,sm.game);var w=gameMod.Weapons[sm.game.weaponIndex];ctx.fillText('Current weapon: ',10,10);ctx.fillText('name: '+w.name,10,20);ctx.fillText('maxDPS: '+w.maxDPS,10,30);ctx.fillText('accuracy: '+w.accuracy.toFixed(2),10,40);},level:function(sm){var ctx=sm.ctx,lv=sm.game.levelObj;setupDebug(ctx,sm.game);ctx.fillText('Current level: '+lv.level,10,10);ctx.fillText('xp: '+lv.xp,10,20);ctx.fillText('forNext level: '+lv.forNext,10,30);ctx.fillText('toNext level: '+lv.toNext,10,40);ctx.fillText('per: '+lv.per.toFixed(2),10,50);ctx.fillText('forLast: '+lv.forLast,10,60);},map:function(sm){var ctx=sm.ctx,map=sm.game.map;setupDebug(ctx,sm.game);ctx.fillText('map.percentRemain: '+map.percentRemain,10,10);}};var cellTypeColors=['green','blue','red'],sheets=genSheets.sheets;return{back:function(ctx,canvas){ctx.fillStyle='black';ctx.fillRect(0,0,canvas.width,canvas.height);},cross:function(ctx,game){drawCrossCircles(ctx,game.cross);drawPercentRemainBar(ctx,game);drawAutoPlayDelayBar(ctx,game);drawBar(ctx,game,game.shotSecs/game.shotRate,Math.PI*0.33,Math.PI*0.33,'red');drawBar(ctx,game,game.levelObj.per,Math.PI*1.69,Math.PI*0.3,'blue');drawWeaponInfo(ctx,game);var cross=game.cross,map=game.map,ch=game.cross.crosshairs,cell=mapMod.getWithCanvasPointAndOffset(game.map,ch.x,ch.y,cross.offset.x,cross.offset.y),x=cross.center.x+cross.radiusOuter-45,y=cross.center.y;ctx.fillStyle='white';ctx.textBaseline='top';ctx.textAlign='left';ctx.font='8px arial';ctx.fillText('level: '+game.levelObj.level,x,y-40);ctx.fillText('xp: '+Math.floor(game.levelObj.xp),x,y-30);ctx.fillText('next: '+Math.floor(game.levelObj.toNext),x,y-20);if(cell){ctx.fillText('pos: '+cell.i+' ('+cell.x+','+cell.y+')',x,y);ctx.fillText('lv:'+cell.levelObj.level,x,y+10);ctx.fillText('hp:'+Math.floor(cell.HP)+'/'+Math.floor(cell.maxHP),x,y+20);ctx.fillText('dam: '+Math.floor(cell.damage)+' ('+Math.round(cell.damagePer*100)+'%)',x,y+30);ctx.strokeStyle='rgba(255,255,255,0.4)';ctx.lineWidth=3;ctx.strokeRect(cell.x*map.cellSize+cross.offset.x+(320/2),cell.y*map.cellSize+cross.offset.y+(240/2),map.cellSize,map.cellSize);} drawCrossHairs(ctx,game.cross);},map:function(ctx,map,cross){ctx.strokeStyle='grey';ctx.lineWidth=3;map.cells.forEach(function(cell){var x=cell.x*map.cellSize+cross.offset.x+(320/2),y=cell.y*map.cellSize+cross.offset.y+(240/2),per=cell.HP/cell.maxHP;if(cell.active){ctx.drawImage(sheets[cell.typeIndex].canvas,32*Math.floor(9-cell.HP/cell.maxHP*9),0,32,32,x,y,map.cellSize,map.cellSize);if(per<1){drawCellHealthBar(ctx,map,cell,cross);}}else{ctx.lineWidth=1;var c=50+Math.round(200*cell.damagePer);ctx.strokeStyle='rgba(0,128,128, 0.4)';ctx.fillStyle='rgba(0,'+c+','+c+', 0.7)';ctx.beginPath();ctx.rect(x,y,map.cellSize,map.cellSize);ctx.fill();ctx.stroke();} cellLevel(ctx,cell,x,y);});},shots:function(ctx,game){var shots=game.shots,i=shots.length,shot;while(i--){shot=shots[i];ctx.fillStyle='white';ctx.strokeStyle='black';if(shot.active){ctx.beginPath();ctx.arc(shot.x,shot.y,shot.radius,0,Math.PI*2);ctx.fill();ctx.stroke();}}},explosions:function(ctx,game){var exps=game.explosions,i=exps.length,alpha=0.5,ex;while(i--){ex=exps[i];alpha=1-ex.per;ctx.fillStyle='rgba(255,255,0,'+alpha+')';ctx.strokeStyle='rgba(0,0,0,'+alpha+')';if(ex.active){ctx.beginPath();ctx.arc(ex.x,ex.y,ex.radius,0,Math.PI*2);ctx.fill();ctx.stroke();}}},buttons:function(ctx,buttons){Object.keys(buttons).forEach(function(key){var b=buttons[key];ctx.fillStyle='red';if(b.type==='toggle'&&b.bool){ctx.fillStyle='lime';} ctx.strokeStyle='gray';ctx.lineWidth=1;ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.textBaseline='middle';ctx.textAlign='center';ctx.fillStyle='white';ctx.font=(b.fontSize||10)+'px arial';if(b.type==='options'){var str=b.options[b.currentOption||0];ctx.fillText(str,b.x,b.y);} if(b.type==='basic'){ctx.fillText(b.label,b.x,b.y);} if(b.type==='toggle'){ctx.fillText(b.label,b.x,b.y);}});},debug:function(sm){debugModes[sm.debugMode](sm,sm.ctx,sm.canvas);},ver:function(ctx,sm){ctx.fillStyle='#dfdfdf';ctx.textAlign='left';ctx.fillText('v'+sm.ver,10,sm.canvas.height-15);}}} ());var buttonMod=(function(){var setupType=function(button,opt){if(button.type==='options'){button.options=opt.options||[];button.currentOption=0;button.label=button.options[0];} if(button.type==='toggle'){button.bool=opt.bool||false;button.onActive=opt.onActive||function(){};button.onInactive=opt.onInactive||function(){};}};var beforeOnClick={basic:function(button,api){},options:function(button,api){button.currentOption+=1;button.currentOption=button.currentOption>=button.options.length?0:button.currentOption;},toggle:function(button,api){button.bool=!button.bool;}};var afterOnClick={basic:function(button,api){},options:function(button,api){},toggle:function(button,api){if(button.bool){button.onActive(button,api);}else{button.onInactive(button,api);}}};return{create:function(opt){opt=opt||{};var button={x:opt.x===undefined?0:opt.x,y:opt.y===undefined?0:opt.y,r:opt.r===undefined?16:opt.r,label:opt.label||'',type:opt.type||'basic',onClick:opt.onClick||function(){}};setupType(button,opt);return button;},pointerCheckCollection:function(collection,point,api){var keys=Object.keys(collection),i=keys.length,button,d;while(i--){button=collection[keys[i]];d=utils.distance(point.x,point.y,button.x,button.y);if(d<button.r){beforeOnClick[button.type](button,api);button.onClick(button,api);afterOnClick[button.type](button,api)}}}};} ());(function(){var canvas=document.createElement('canvas'),ctx=canvas.getContext('2d'),container=document.getElementById('canvas-app')||document.body;container.appendChild(canvas);canvas.width=320;canvas.height=240;ctx.translate(0.5,0.5);var states={options:{buttons:{toGame:buttonMod.create({label:'game',x:25,y:200,r:10,onClick:function(button,sm){sm.currentState='game';}}),debugMode:buttonMod.create({x:100,y:120,r:16,type:'options',options:['none','general','weapon','level','map'],onClick:function(button,sm){sm.debugMode=button.options[button.currentOption];}})},update:function(sm,secs){var state=states[sm.currentState];draw.back(ctx,canvas);draw.buttons(ctx,state.buttons);draw.debug(sm);},pointerStart:function(sm,e){var state=states[sm.currentState],buttons=state.buttons,pos=utils.getCanvasRelative(e);buttonMod.pointerCheckCollection(state.buttons,pos,sm);},pointerMove:function(){},pointerEnd:function(){}},game:{buttons:{options:buttonMod.create({label:'options',fontSize:10,x:25,y:200,r:10,onClick:function(button,sm){sm.currentState='options';}}),changeWeapon:buttonMod.create({label:'Next Weapon',fontSize:8,x:280,y:210,r:16,onClick:function(button,sm){sm.game.weaponIndex+=1;sm.game.weaponIndex%=gameMod.Weapons.length;}}),autoPlay:buttonMod.create({label:'Auto Play',type:'toggle',fontSize:8,x:25,y:175,r:10,bool:true,onClick:function(button,sm){var ap=sm.game.autoPlay;ap.delay=ap.maxDelay;},onActive:function(button,sm){sm.game.autoPlay.enabled=button.bool;},onInactive:function(button,sm){sm.game.autoPlay.enabled=button.bool;}})},update:function(sm,secs){var state=states[sm.currentState];gameMod.update(sm.game,secs);draw.back(ctx,canvas);draw.map(ctx,sm.game.map,sm.game.cross);draw.explosions(ctx,sm.game);draw.cross(ctx,sm.game);draw.shots(ctx,sm.game);draw.buttons(ctx,state.buttons);draw.ver(ctx,sm);draw.debug(sm);},pointerStart:function(sm,e){var state=states[sm.currentState],buttons=state.buttons,pos=utils.getCanvasRelative(e);sm.game.cross.moveBackEnabled=true;crossMod.userAction(sm.game.cross,'start',e);sm.game.userDown=true;buttonMod.pointerCheckCollection(state.buttons,pos,sm);},pointerEnd:function(em,e){crossMod.userAction(sm.game.cross,'end',e);sm.game.userDown=false;},pointerMove:function(sm,e){crossMod.userAction(sm.game.cross,'move',e);}}};var sm={ver:'0.13.0',canvas:canvas,debugMode:'none',currentState:'game',ctx:ctx,game:gameMod.create({canvas:canvas}),input:{pointerDown:false,pos:{x:0,y:0}}};var pointerHanders={start:function(sm,e){var pos=sm.input.pos;sm.input.pointerDown=true;states[sm.currentState].pointerStart(sm,e);},move:function(sm,e){states[sm.currentState].pointerMove(sm,e);},end:function(sm,e){sm.input.pointerDown=false;states[sm.currentState].pointerEnd(sm,e);}};var createPointerHandler=function(sm,type){return function(e){sm.input.pos=utils.getCanvasRelative(e);e.preventDefault();pointerHanders[type](sm,e);};};canvas.addEventListener('mousedown',createPointerHandler(sm,'start'));canvas.addEventListener('mousemove',createPointerHandler(sm,'move'));canvas.addEventListener('mouseup',createPointerHandler(sm,'end'));canvas.addEventListener('touchstart',createPointerHandler(sm,'start'));canvas.addEventListener('touchmove',createPointerHandler(sm,'move'));canvas.addEventListener('touchend',createPointerHandler(sm,'end'));var lt=new Date(),FPS_target=30;var loop=function(){var now=new Date(),t=now-lt,secs=t/1000;requestAnimationFrame(loop);if(t>=1000/FPS_target){states[sm.currentState].update(sm,secs);lt=now;}};loop();} ());</script>

## 1 - The utility module

For like with many of these canvas examples this one has a utility library. In this one I am just using the distance formula, and a method that will help me to get a canvas relative position when it comes to working with event handers for pointer events. There always seems a need for this kind of utility library that can be described as a kind of application specific custom tailors lodash of sorts. That is a collection of utility methods that I am actually going to use in one or more of the module that compose the project.

```js
// UTILS
var utils = {};
// get distance between two points
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
// get a canvas relative point
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    return {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
};
// return a percent value from another percent value
utils.logPer = function (per, high) {
    high = high === undefined ? 2 : high;
    per = per < 0 ? 0 : per;
    per = per > 1 ? 1 : per;
    return Math.log((1 + high - 2) + per) / Math.log(high);
};
```

So now that I have the basic utility library out of the way lets move on to the actual modules that make this project different from all the others.

## 2 - The experience point system

So for this canvas example I want to have an experience point system. I did not work out anything that original for this project at least not of this writing, in fact i just copied over what I [workout out in another post that has to do with, you guessed it, experience point systems](/2020/04/27/js-javascript-example-exp-system/).

The module provided two public methods, one that can be used to create a level object by giving and experience point value, and another that does the inversion of that by giving a level value.

```js
var XP = (function () {
    var DEFAULTS = {
        level: 1,
        xp: 0,
        cap: 30,
        deltaNext: 50
    };
    // set level with given xp
    var set = function (xp, deltaNext) {
        return (1 + Math.sqrt(1 + 8 * xp / deltaNext)) / 2;
    };
    // get exp to the given level with given current_level and xp
    var getXPtoLevel = function (level, deltaNext) {
        return ((Math.pow(level, 2) - level) * deltaNext) / 2;
    };
    var parseByXP = function (xp, cap, deltaNext) {
        xp = xp === undefined ? DEFAULTS.xp : xp;
        cap = cap === undefined ? DEFAULTS.cap : cap;
        deltaNext = deltaNext === undefined ? DEFAULTS.deltaNext : deltaNext;
        var l = set(xp, deltaNext);
        l = l > cap ? cap : l;
        var level = Math.floor(l),
        forNext = getXPtoLevel(level + 1, deltaNext);
        forNext = l === cap ? Infinity : forNext;
        var toNext = l === cap ? Infinity : forNext - xp;
        var forLast = getXPtoLevel(level, deltaNext);
        return {
            level: level,
            levelFrac: l,
            xp: xp,
            per: (xp - forLast) / (forNext - forLast),
            forNext: forNext,
            toNext: toNext,
            forLast: forLast
        };
    };
    return {
        parseByLevel: function (l, cap, deltaNext) {
            l = l === undefined ? DEFAULTS.level : l;
            deltaNext = deltaNext === undefined ? DEFAULTS.deltaNext : deltaNext;
            var xp = getXPtoLevel(l, deltaNext);
            console.log(xp);
            return parseByXP(xp, cap, deltaNext);
        },
        parseByXP: parseByXP
    };
}
    ());
```

I might get around to changing things around with this kind of system at a later point as I keep working on this example. However for now it is working okay as a place holder of sorts until I get around to investing more time into developing not just this system, but maybe a few additional systems.

In any case this experience point system is used in both the main game.js module, as well as the map.js module, and it goes without saying that this system will problem be used in a few more modules here and there as i keep working on additional minor releases of this project.

## 3 - The cross.js file

So now for the module that will be used to create and update a state object for a cross hairs state object. This main cross hairs state object contains a bunch of additional objects and properties that contain many points of interest in the canvas matrix. One point of interest is the center point of the cross hairs area, another is the actual cross hairs cursor position, and yet another is an offset point that can be used as a way to navigate a map. 

The idea of this module is when the cross hairs point object is within an inner radius that cross hairs object is just used as a way to set the position of where a weapon is going to fire. While the difference between the inner and outer radius is then used as a zone to define angle and rate of movement when it comes to moving around that map. So when the cross hairs object is in the zone between inner and outer radius value that will effect another offset point in the main cross state object. This offset value can then be used as a map offset value when it comes to navigating the map. When it comes to the map module that is another matter that I will be getting to later, but for now in this section I will just be going over the cross hairs module.

SO with that said the module contains a number of private helper methods. There are helper methods that will return true or false if the cross hairs object is in the fire area, or in the movement area. There is also a helper method that has to do with moving the offset object based on the current values of the cross hairs object and a given value that is the number of seconds sense the last frame tick update.

```js
var crossMod = (function () {
 
    var isInInner = function (cross) {
        var ch = cross.crosshairs,
        center = cross.center;
        return utils.distance(ch.x, ch.y, center.x, center.y) < cross.radiusInner;
    };
 
    var isInOuter = function (cross) {
        var ch = cross.crosshairs,
        center = cross.center;
        return utils.distance(ch.x, ch.y, center.x, center.y) >= cross.radiusInner;
    };
 
    var isOutOfBounds = function (cross) {
        var ch = cross.crosshairs,
        center = cross.center;
        return utils.distance(ch.x, ch.y, center.x, center.y) >= cross.radiusOuter;
    };
 
    var moveOffset = function (cross, secs) {
        var ch = cross.crosshairs,
        center = cross.center,
        per = {
            min: 0.1,
            max: 1,
            current: 0.1
        },
        d = utils.distance(ch.x, ch.y, center.x, center.y) - cross.radiusInner;
        per.current = per.min + (per.max - per.min) * (d / cross.radiusDiff);
        cross.offset.x += Math.cos(ch.heading) * cross.offset.pps * per.current * secs;
        cross.offset.y += Math.sin(ch.heading) * cross.offset.pps * per.current * secs;
    };
 
    return {
        isInInner: isInInner,
        isInOuter: isInOuter,
        create: function (opt) {
            opt = opt || {};
            var cross = {
                userDown: false,
                moveBackEnabled: false,
                pps: opt.pps || 128,
                radiusInner: opt.radiusInner || (240 / 4),
                radiusOuter: opt.radiusOuter || (240 / 2.125),
                radiusDiff: 0,
                center: {
                    x: opt.cx || (320 / 2),
                    y: opt.cy || (240 / 2)
                },
                crosshairs: {
                    x: 320 / 2,
                    y: 240 / 2,
                    heading: 0,
                    radius: 16
                },
                offset: {
                    x: opt.offsetX || 0,
                    y: opt.offsetY || 0,
                    pps: 256
                }
            };
            cross.radiusDiff = cross.radiusOuter - cross.radiusInner;
            return cross;
        },
 
        update: function (cross, secs) {
            secs = secs || 0;
            var ch = cross.crosshairs,
            center = cross.center;
            ch.heading = Math.atan2(center.y - ch.y, center.x - ch.x);
 
            // set bounds
            if (isOutOfBounds(cross)) {
                ch.x = center.x;
                ch.y = center.y;
                cross.userDown = false;
            }
 
            if (isInOuter(cross)) {
                // move back to innerRdaius if in outer area and userDown is false
                if (!cross.userDown && cross.moveBackEnabled) {
                    ch.x += Math.cos(ch.heading) * cross.pps * secs;
                    ch.y += Math.sin(ch.heading) * cross.pps * secs;
                }
                // apply changes to offset
                moveOffset(cross, secs);
            }
        },
 
        userAction: function (cross, eventType, e) {
            var pos = utils.getCanvasRelative(e),
            ch = cross.crosshairs;
            //e.preventDefault();
            if (eventType === 'start') {
                cross.userDown = true;
                ch.x = pos.x;
                ch.y = pos.y;
            }
            if (eventType === 'end') {
                cross.userDown = false;
            }
            if (eventType === 'move') {
                if (cross.userDown) {
                    ch.x = pos.x;
                    ch.y = pos.y;
                }
            }
        }
 
    }
}
    ());
```

I then have my public API of this module that contains methods for both creating and updating a cross state object. In addition I have a method that can be used as a way to create event handers for a cross object that can be used for both mouse and touch events. this is where by utility method that has to do with getting a canvas relative position comes into play.

## 4 - The map.js file

So now that I have my cross hairs module I am also going to want to have a map file that will be used to create a map of cells. I can then move around the map with the state of a cross object created with the cross hairs module. I went with having the offset values in the cross object rather than the map object, so I will be using a public method in this map module to get at cells by passing a cross object along with the map and canvas relative position values.

```js
var mapMod = (function () {
 
    var cellTypes = [{
            i: 0,
            type: 'grass',
            HP: {
                min: 5,
                max: 10,
                base: 1.05
            },
            autoHeal: {
                rate: 0.5,
                amount: 1
            }
        }, {
            i: 1,
            type: 'tree',
            HP: {
                min: 20,
                max: 30,
                base: 1.08
            },
            autoHeal: {
                rate: 1,
                amount: 5
            }
        }, {
            i: 2,
            type: 'rock',
            HP: {
                min: 35,
                max: 50,
                base: 1.15
            },
            autoHeal: {
                rate: 3,
                amount: 50
            }
        },
 
    ];
 
    // set a cell as a given type index
    var setCellType = function (cell, typeIndex, opt) {
 
        var level = cell.levelObj.level,
        min,
        max;
 
        opt = opt || {};
 
        // set type and type index by way o given type index
        cell.type = cellTypes[typeIndex];
        cell.typeIndex = typeIndex;
 
        // active flag should typically be set to true
        cell.active = opt.active === undefined ? true : opt.active;
 
        // HP
        //cell.maxHP = cell.type.HP.min + Math.round((cell.type.HP.max - cell.type.HP.min) * Math.random());
        min = Math.pow(level, cell.type.HP.base) * cell.type.HP.min;
        max = Math.pow(level, cell.type.HP.base) * cell.type.HP.max;
        cell.maxHP = min + Math.round((max - min) * Math.random());
        cell.HP = opt.HP === undefined ? cell.maxHP : opt.HP;
 
        // autoHeal
        cell.autoHeal.rate = cell.type.autoHeal.rate;
        cell.autoHeal.amount = cell.type.autoHeal.amount;
    };
 
    var getHighestDamageCell = function (map) {
        return Math.max.apply(null, map.cells.map(function (cell) {
                return cell.damage;
            }));
    };
 
    // get cell method
    var get = function (map, x, y) {
        if (x < 0 || y < 0) {
            return undefined;
        }
        if (x >= map.cellWidth || y >= map.cellHeight) {
            return undefined;
        }
        return map.cells[y * map.cellWidth + x];
    };
 
    // auto heal a cell
    var autoHeal = function (cell, secs) {
        cell.autoHeal.secs += secs;
        if (cell.autoHeal.secs >= cell.autoHeal.rate) {
            cell.autoHeal.secs %= cell.autoHeal.rate;
            cell.HP += cell.autoHeal.amount;
            cell.HP = cell.HP > cell.maxHP ? cell.maxHP : cell.HP;
        }
    };
 
    // get border cells helper
    var getBorderCells = function (map, cell) {
        var i = 8,
        borderCell,
        cells = [],
        r,
        x,
        y;
        if (!cell) {
            return [];
        }
        while (i--) {
            r = Math.PI * 2 / 8 * i;
            x = Math.round(cell.x + Math.cos(r));
            y = Math.round(cell.y + Math.sin(r));
            borderCell = get(map, x, y);
            if (borderCell) {
                cells.push(borderCell);
            }
 
        }
        return cells;
    };
 
    // get the count of active border cells for the given cell and active status
    var getBorderCellsActiveCount = function (map, cell, active) {
        active === undefined ? true : active;
        var borderCells = getBorderCells(map, cell);
        return borderCells.reduce(function (acc, cell) {
            acc = typeof acc === 'object' ? Number(acc.active === active) : acc;
            return acc += Number(cell.active == active);
        });
    };
 
    // get all cells with an active state of true or false, and also filter farther with an
    // optional condition
    var getAllCellActiveState = function (map, active, condition) {
        active = active === undefined ? true : active;
        condition = condition === undefined ? function (cell) {
            return true;
        }
         : condition;
        return map.cells.filter(function (cell) {
            if (cell.active === active && condition(map, cell)) {
                return true;
            }
            return false;
        });
    };
 
    // condition for gen cells
    var condition_gen_cell = function (map, cell) {
        var borderCells = getBorderCells(map, cell);
        return getBorderCellsActiveCount(map, cell, true) >= 1;
    };
 
    // get all potential gen cells
    var getGenCells = function (map) {
        return getAllCellActiveState(map, false, condition_gen_cell);
    };
 
    var popRandomCell = function (cells) {
        var i = Math.floor(Math.random() * cells.length);
        return cells.splice(i, 1)[0];
    };
 
    // generate new cells by way of given secs amount
    var gen = function (map, secs) {
        var cells,
        cell,
        i;
        map.gen.secs += secs;
        if (map.gen.secs >= map.gen.rate) {
            map.gen.secs %= map.gen.rate;
            cells = getGenCells(map);
            i = map.gen.count;
            if (cells.length - i < 0) {
                i = cells.length;
            }
            if (i > 0) {
                // activate 1 to map.gen.count cells
                while (i--) {
                    cell = popRandomCell(cells);
                    setCellType(cell, Math.round(cell.damagePer * (cellTypes.length - 1)));
                }
            } else {
                // if no active cells
                cells = getAllCellActiveState(map, true);
                if (cells.length === 0) {
                    cell = map.cells[map.gen.startCells[Math.floor(Math.random() * map.gen.startCells.length)]];
                    setCellType(cell, 0);
                }
            }
        }
    };
 
    // PUBLIC API
    return {
 
        getAllCellActiveState: getAllCellActiveState,
 
        create: function () {
 
            // create map object
            var map = {
                cellSize: 32,
                cellWidth: 8,
                cellHeight: 8,
                cells: [],
                cellLevel: {
                    cap: 5,
                    deltaNext: 200
                },
                percentRemain: 1,
                gen: { // global cell generate values
                    rate: 1,
                    secs: 0,
                    count: 2,
                    // start cells for 32 x 16
                    // startCells: [0, 31, 480, 511] // corner cells
                    // startCells: [239, 240, 271, 272]// center cells
                    // startCells: [239, 240, 271, 272]
                    // 8 * 8 start cells
                    startCells: [27, 28, 35, 36, 0, 63, 56, 7]
                },
                highDamageCell: 0
            };
 
            // setup cells for first time
            var i = 0,
            cell,
            x,
            y,
            len = map.cellWidth * map.cellHeight;
            while (i < len) {
                cell = {
                    i: i,
                    x: i % map.cellWidth,
                    y: Math.floor(i / map.cellWidth),
                    HP: 50,
                    maxHP: 100,
                    active: true,
                    typeIndex: 0,
                    typeName: cellTypes[0].name,
                    type: cellTypes[0],
                    autoHeal: {
                        rate: 1,
                        amount: 5,
                        secs: 0
                    },
                    damage: 0,
                    damagePer: 0, // damage relative to highest damaged cell
                    levelObj: XP.parseByXP(0, map.cellLevel.cap, map.cellLevel.deltaNext)
                };
                setCellType(cell, 0);
                map.cells.push(cell);
                i += 1;
            }
 
            return map;
        },
 
        clampOffset: function (map, offset) {
            offset.x = offset.x > 0 ? 0 : offset.x;
            offset.y = offset.y > 0 ? 0 : offset.y;
            offset.x = offset.x < map.cellWidth * map.cellSize * -1 ? map.cellWidth * map.cellSize * -1 : offset.x;
            offset.y = offset.y < map.cellHeight * map.cellSize * -1 ? map.cellHeight * map.cellSize * -1 : offset.y;
        },
 
        // get all cells from a given cell position, and radius from that position
        getAllFromPointAndRadius: function (map, x, y, r) {
            //??? just do it the stupid way for now
            var i = map.cells.length,
            d,
            cell,
            cells = [],
            dists = [];
            while (i--) {
                cell = map.cells[i];
                d = utils.distance(cell.x, cell.y, x, y);
                if (d <= r) {
                    cells.push(cell);
                    dists.push(d);
                }
            }
            return {
                cells: cells,
                dists: dists
            };
        },
 
        getWithCanvasPointAndOffset: function (map, canvasX, canvasY, offsetX, offsetY) {
            var x = canvasX - 160 + Math.abs(offsetX),
            y = canvasY - 120 + Math.abs(offsetY);
            return get(map, Math.floor(x / map.cellSize), Math.floor(y / map.cellSize));
        },
 
        update: function (map, secs) {
 
            var i,
            cell;
 
            map.highDamageCell = getHighestDamageCell(map);
            map.percentRemain = 0;
 
            // update cells
            i = map.cells.length;
            while (i--) {
                cell = map.cells[i];
 
                // if HP is bellow or equal to zero set cell inactive
                if (cell.HP <= 0) {
                    cell.active = false;
                }
 
                // if cell is active
                if (cell.active) {
                    // apply auto heal
                    autoHeal(cell, secs);
                    // update percentRemain
                    map.percentRemain += cell.HP / cell.maxHP;
                }
 
                // figure damage percent
                if (cell.damage != 0) {
                    cell.damagePer = cell.damage / map.highDamageCell;
                }
                // update level
                cell.levelObj = XP.parseByXP(cell.damage, map.cellLevel.cap, map.cellLevel.deltaNext);
 
            }
            // figure percentRemain by diving tabulated total by total cells
            map.percentRemain /= map.cells.length;
 
            gen(map, secs);
        }
    }
 
}
    ());
```

## 5 - A pool.js module for creating an object pool to be used for shots amd any other future display object pools

I made a another post in which I touched base on [object pools](/2020/07/20/canvas-example-object-pool/). I decided to include such a module in this project that for starters will be used to create shot objects that will move from the side of the canvas to the target area where an attack was made on the map. In future versions of the canvas example display object pools could be used for all kinds of additional things where a display object would be called for such as explosions, enemies, and power ups.

The module for now just has three public methods, one to create an object pool, one to update an object pool, and another that will call the spawn method of a display object that is inactive if any is available.

```js
var poolMod = (function () {
 
    return {
 
        create: function (opt) {
            opt = opt || {};
            opt.count = opt.count || 10;
            var i = 0,
            pool = [];
            while (i < opt.count) {
                pool.push({
                    active: false,
                    x: 0,
                    y: 0,
                    radius: 8,
                    heading: 0,
                    pps: 32,
                    lifespan: opt.lifespan || 3,
                    data: {},
                    spawn: opt.spawn || function (obj, state) {
                        obj.active = true;
                    },
                    purge: opt.purge || function (obj, state) {},
                    update: opt.update || function (obj, state, secs) {
                        obj.x += obj.pps * secs;
                        obj.lifespan -= secs;
                    }
                });
                i += 1;
            }
            return pool;
        },
 
        spawn: function (pool, game, opt) {
            var i = pool.length,
            obj;
            while (i--) {
                obj = pool[i];
                if (!obj.active) {
                    obj.active = true;
                    obj.spawn.call(obj, obj, game, opt);
                    break;
                }
            }
        },
 
        update: function (pool, state, secs) {
            var i = pool.length,
            obj;
            while (i--) {
                obj = pool[i];
                if (obj.active) {
                    obj.update(obj, state, secs);
                    obj.lifespan = obj.lifespan < 0 ? 0 : obj.lifespan;
                    if (obj.lifespan === 0) {
                        obj.active = false;
                        obj.purge.call(obj, obj, state);
                    }
                }
            }
        }
 
    }
 
}
    ());
```

As of this writing I am using the pool module to create a pool of display objects for shots that the player can fire by clicking in the inner circle area of the cross object. So I need a way to have a pool of objects that can be reused for the display objects that will represent these shots, and this is for starters what the pool.js module is for.

## 6 - The game.js file for creating a main game state object

So I ending up working out a main game module that will serve as a way to create and set up a main game state module for this canvas example. This module will create a main game state object that will contain an instance of the cross module object, along with a map object, and at least a single object pool for shot objects. This module will also attach a whole bunch of event handers for the canvas element.

```js
var gameMod = (function () {
 
    // hard coded settings
    var hardSet = {
        maxSecs: 0.25, // max seconds for sec value used in updates
        deltaNext: 10000, // deltaNext and levelCap
        levelCap: 100
    };
 
    var Weapons = [{
            name: 'Blaster',
            pps: 256,
            shotRate: 0.125,
            blastRadius: 1,
            maxDPS: 10,
            accuracy: 0.75,
            hitRadius: 64,
            gunCount: 1,
            level: {
                maxDPS_base: 10,
                maxDPS_perLevel: 5
            }
        }, {
            name: 'Assault Blaster',
            pps: 512,
            shotRate: 0.125,
            blastRadius: 2,
            maxDPS: 5,
            accuracy: 0.5,
            hitRadius: 64,
            gunCount: 4,
            level: {
                maxDPS_base: 5,
                maxDPS_perLevel: 6
            }
        }, {
            name: 'Cannon',
            pps: 256,
            shotRate: 0.5,
            blastRadius: 3,
            maxDPS: 20,
            accuracy: 0.25,
            hitRadius: 32,
            gunCount: 2,
            level: {
                maxDPS_base: 15,
                maxDPS_perLevel: 10
            }
        }, {
            name: 'Atom',
            pps: 256,
            shotRate: 1,
            blastRadius: 10,
            maxDPS: 75,
            accuracy: 0.9,
            hitRadius: 64,
            gunCount: 1,
            level: {
                maxDPS_base: 75,
                maxDPS_perLevel: 50
            }
        }
    ];
 
    var setWeaponsToLevel = function (game) {
        var level = game.levelObj.level;
        Weapons.forEach(function (weapon) {
            var lv = weapon.level;
            weapon.maxDPS = lv.maxDPS_base + lv.maxDPS_perLevel * level;
            weapon.accuracy = 0.95 - 0.9 * (1 - level / hardSet.levelCap);
        });
    };
 
    // SHOT Object Options
    var shotOptions = {
        count: 20,
        // when a shot becomes active
        spawn: function (shot, game, radian) {
            var offset = game.cross.offset,
            w = Weapons[game.weaponIndex],
            ch = game.cross.crosshairs,
            r = Math.random() * (Math.PI * 2),
            d = w.hitRadius * (1 - w.accuracy) * Math.random(),
            x = ch.x + Math.cos(r) * d,
            y = ch.y + Math.sin(r) * d,
            d;
            //shot.x = game.canvas.width;
            //shot.y = game.canvas.height;
            shot.x = x + Math.cos(radian) * game.canvas.width;
            shot.y = y + Math.sin(radian) * game.canvas.width;
            shot.heading = Math.atan2(y - shot.y, x - shot.x);
            d = utils.distance(shot.x, shot.y, x, y);
            shot.pps = w.pps;
            shot.lifespan = d / shot.pps;
            shot.offset = offset;
        },
        // when a shot becomes inactive
        purge: function (shot, game) {
            poolMod.spawn(game.explosions, game, shot);
        },
        // update method for a shot
        update: function (shot, game, secs) {
            shot.x += Math.cos(shot.heading) * shot.pps * secs;
            shot.y += Math.sin(shot.heading) * shot.pps * secs;
            shot.lifespan -= secs;
        }
    };
 
    // Explosion Options
    var explosionOptions = {
        count: 20,
        spawn: function (ex, game, shot) {
            var w = Weapons[game.weaponIndex];
            ex.x = shot.x;
            ex.y = shot.y;
            ex.data.offset = {
                x: shot.offset.x,
                y: shot.offset.y
            };
            ex.data.radiusEnd = game.map.cellSize * w.blastRadius;
            ex.data.explosionTime = 0.6;
            ex.data.maxDPS = w.maxDPS; ;
            ex.lifespan = ex.data.explosionTime;
            ex.per = 0;
        },
        purge: function (ex, game) {},
        update: function (ex, game, secs) {
            ex.per = (ex.data.explosionTime - ex.lifespan) / ex.data.explosionTime;
            ex.radius = ex.data.radiusEnd * ex.per;
            var cell = mapMod.getWithCanvasPointAndOffset(game.map, ex.x, ex.y, ex.data.offset.x, ex.data.offset.y),
            blastRadius = Math.ceil((ex.radius + 0.01) / game.map.cellSize);
            if (cell) {
                var targets = mapMod.getAllFromPointAndRadius(game.map, cell.x, cell.y, blastRadius);
                targets.cells.forEach(function (cell, i) {
                    // apply damage
                    var damage = ex.data.maxDPS * (1 - (targets.dists[i] / blastRadius)) * secs;
                    if (cell.active) {
                        game.totalDamage += damage;
                        cell.HP -= damage;
                        cell.HP = cell.HP < 0 ? 0 : cell.HP;
                    }
                    cell.damage += damage;
                });
            }
            ex.lifespan -= secs;
        }
    };
 
    var shoot = function (game) {
        var w = Weapons[game.weaponIndex];
        if (game.shotSecs >= game.shotRate) {
            var i = 0,
            radian;
            while (i < w.gunCount) {
                radian = Math.PI * 2 / 4 * i + Math.PI / 4;
                poolMod.spawn(game.shots, game, radian);
                i += 1;
            }
            game.shotSecs = 0;
        }
    };
 
    // AUTOPLAY
    var autoPlay = {
        setRandomTarget: function (game) {
            var ch = game.cross.crosshairs,
            os = game.cross.offset,
            ap = game.autoPlay,
            map = game.map,
            activeCells = mapMod.getAllCellActiveState(map, true),
            x = Math.floor(map.cellWidth * Math.random()),
            y = Math.floor(map.cellHeight * Math.random());
            if (activeCells.length >= 1) {
                var cell = activeCells[Math.floor(activeCells.length * Math.random())];
                x = cell.x;
                y = cell.y;
            }
            ap.target.x = (map.cellSize / 2 + (map.cellSize * x)) * -1;
            ap.target.y = (map.cellSize / 2 + (map.cellSize * y)) * -1;
        },
 
        setByPercentRemain: function (game) {
            var map = game.map,
            ap = game.autoPlay;
 
            // hard coded default for weapon index
            game.weaponIndex = 0;
 
            // set AI values based on ap.behavior value
            if (ap.behavior === 'cannon') {
                game.weaponIndex = 2;
                ap.maxShootTime = 3;
            }
            if (ap.behavior === 'total-kill') {
                game.weaponIndex = Weapons.length - 1;
                ap.stopAtPercentRemain = 0;
            }
            if (ap.behavior === 'weapon-switch') {
                game.weaponIndex = Math.floor((Weapons.length) * utils.logPer(map.percentRemain, 2));
            }
            game.weaponIndex = game.weaponIndex >= Weapons.length ? Weapons.length - 1 : game.weaponIndex;
            // stay on move mode if
            if (map.percentRemain < ap.stopAtPercentRemain) {
                ap.mode = 'move';
            }
        },
 
        modes: {
 
            // AI Move mode
            move: function (game, secs) {
 
                var ch = game.cross.crosshairs,
                os = game.cross.offset,
                ap = game.autoPlay,
                map = game.map,
                a = Math.atan2(os.y - ap.target.y, os.x - ap.target.x),
                cross = game.cross,
                d = utils.distance(os.x, os.y, ap.target.x, ap.target.y),
                delta = game.cross.radiusOuter - 1;
                maxDelta = cross.radiusInner + cross.radiusDiff - 1,
                minDelta = cross.radiusInner + 5,
                slowDownDist = map.cellSize * 4,
                // !!! know bug where AI movement does not work as desired might
                // is temp fixed by setting a minDist, might still cause problems
                // with very low frame rates
                minDist = map.cellSize / 2,
                per = 0;
 
                if (d < slowDownDist) {
                    per = 1 - d / slowDownDist;
                }
 
                ap.target.d = d;
 
                delta = maxDelta - (maxDelta - minDelta) * per;
 
                if (d < minDist) {
                    // set right to target
                    os.x = ap.target.x;
                    os.y = ap.target.y;
                    // done
                    ap.shootTime = ap.maxShootTime;
                    autoPlay.setRandomTarget(game);
                    ap.mode = 'shoot';
                } else {
                    // !!! know bug where AI movement does not work as desired might
                    // be fixed here by way of a tempX and Y maybe
                    ch.x = game.cross.center.x + Math.cos(a) * delta;
                    ch.y = game.cross.center.y + Math.sin(a) * delta;
                }
 
            },
 
            shoot: function (game, secs) {
 
                var ch = game.cross.crosshairs,
                os = game.cross.offset,
                ap = game.autoPlay,
                map = game.map;
 
                ch.x = game.cross.center.x;
                ch.y = game.cross.center.y;
                shoot(game);
                ap.shootTime -= secs;
                if (ap.shootTime <= 0) {
                    ap.mode = 'move';
                    autoPlay.setRandomTarget(game);
                }
 
            }
 
        },
 
        update: function (game, secs) {
 
            // if autoplay
            if (game.autoPlay.enabled) {
                var ch = game.cross.crosshairs,
                os = game.cross.offset,
                ap = game.autoPlay,
                map = game.map;
                game.autoPlay.delay -= secs;
                if (game.userDown) {
                    game.autoPlay.delay = game.autoPlay.maxDelay;
                }
                game.autoPlay.delay = game.autoPlay.delay < 0 ? 0 : game.autoPlay.delay;
                if (game.autoPlay.delay === 0) {
                    // disable cross move back
                    game.cross.moveBackEnabled = false;
                    // set by percent remain?
                    autoPlay.setByPercentRemain(game);
                    // apply current mode
                    autoPlay.modes[ap.mode](game, secs);
                }
            }
        }
    };
 
    return {
        Weapons: Weapons,
        create: function (opt) {
            opt = opt || {};
            var game = {
                levelObj: {},
                canvas: opt.canvas,
                map: mapMod.create(),
                cross: {},
                shots: poolMod.create(shotOptions),
                explosions: poolMod.create(explosionOptions),
                shotRate: 1,
                shotSecs: 0,
                weaponIndex: 3,
                totalDamage: 0,
                userDown: false,
                autoPlay: {
                    enabled: true,
                    behavior: 'cannon',
                    stopAtPercentRemain: 0,
                    delay: 5,
                    maxDelay: 5,
                    mode: 'move',
                    shootTime: 5,
                    maxShootTime: 5,
                    target: {
                        x: -16,
                        y: -16,
                        d: 0
                    }
                }
            };
            // set game level object for first time
            game.levelObj = XP.parseByXP(game.totalDamage, hardSet.levelCap, hardSet.deltaNext);
            // first autoPlay target
            autoPlay.setRandomTarget(game);
            // create cross object
            game.cross = crossMod.create({
                    offsetX: game.map.cellWidth * game.map.cellSize / 2 * -1,
                    offsetY: game.map.cellHeight * game.map.cellSize / 2 * -1,
                });
            return game;
        },
 
        update: function (game, secs) {
 
            // do not let secs go over hard coded max secs value
            secs = secs > hardSet.maxSecs ? hardSet.maxSecs : secs;
 
            game.shotRate = Weapons[game.weaponIndex].shotRate;
 
            // cross object
            crossMod.update(game.cross, secs);
 
            // map
            mapMod.clampOffset(game.map, game.cross.offset);
            mapMod.update(game.map, secs);
 
            // update pools
            poolMod.update(game.shots, game, secs);
            poolMod.update(game.explosions, game, secs);
 
            game.shotSecs += secs;
            game.shotSecs = game.shotSecs >= game.shotRate ? game.shotRate : game.shotSecs;
 
            // shoot
            if (crossMod.isInInner(game.cross) && game.cross.userDown) {
                shoot(game);
            }
 
            // AutoPlay
            autoPlay.update(game, secs);
 
            // update level object
            game.levelObj = XP.parseByXP(game.totalDamage, hardSet.levelCap, hardSet.deltaNext);
            setWeaponsToLevel(game);
 
        }
 
    }
 
}
    ());
```

## 7 - generate sprite sheets

I wanted to at east start some kind of system that will be used to create sprite sheets. For now I just work out this genSheets module that creates sheets just for map cells. I am not happy with it thus far, and will get around to making a lot of changes here at a point in the future so I do not want to write to much about it.

```js
var genSheets = (function () {
 
    var createSheet = function (cellSize, cw, ch) {
        var sheet = {},
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = cellSize * cw;
        canvas.height = cellSize * ch;
        ctx.translate(0.5, 0.5);
        sheet.canvas = canvas;
        sheet.ctx = ctx;
        sheet.cellWidth = cw;
        sheet.cellHeight = ch;
        sheet.cellSize = cellSize;
        return sheet;
    };
 
    var drawBasicBox = function (sheet, fill, stroke) {
        var canvas = sheet.canvas,
        ctx = sheet.ctx;
        ctx.fillStyle = fill || '#008800';
        ctx.fillRect(-1, -1, canvas.width + 1, canvas.height + 1);
        ctx.strokeStyle = stroke || 'lime';
        var i = 0,
        s;
        while (i < sheet.cellWidth) {
            ctx.save();
            ctx.translate(16 + 32 * i, 16);
            s = 28 - 14 * (i / sheet.cellWidth);
            ctx.beginPath();
            ctx.rect(-14, -14, s, s);
            ctx.stroke();
            ctx.restore();
            i += 1;
        }
    };
 
    var sheets = [];
 
    ['#005500', '#000088', '#880000'].forEach(function (fill) {
        var sheet = createSheet(32, 10, 1),
        canvas = sheet.canvas,
        ctx = sheet.ctx;
        drawBasicBox(sheet, fill, '#000000');
        sheets.push(sheet);
    });
 
    return {
        sheets: sheets
    };
 
}
    ());
```

## 8 - The draw.js file

So now that I have mt modules for creating state objects, I will now want a module with methods that are used to draw aspects of these state objects to a canvas element.

```js
var draw = (function () {
 
    var hpColors = ['red', 'orange', 'lime'];
 
    var getHpColor = function (per) {
        return hpColors[Math.floor((hpColors.length - 0.01) * per)];
    };
 
    var drawBar = function (ctx, game, per, rStart, rLength, fill) {
        var cross = game.cross,
        center = cross.center;
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'gray';
        ctx.beginPath();
        ctx.arc(center.x, center.y, cross.radiusInner + 5, rStart, rStart + rLength);
        ctx.stroke();
        ctx.strokeStyle = fill || 'lime';
        ctx.beginPath();
        ctx.arc(center.x, center.y, cross.radiusInner + 5, rStart, rStart + rLength * per);
        ctx.stroke();
    };
 
    // draw the inner and outer cross circles
    var drawCrossCircles = function (ctx, cross) {
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.fillStyle = 'rgba(255,0,0,0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cross.center.x, cross.center.y, cross.radiusInner, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.beginPath();
        ctx.arc(cross.center.x, cross.center.y, cross.radiusOuter, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cross.crosshairs.x, cross.crosshairs.y, cross.crosshairs.radius, 0, Math.PI * 2);
        ctx.stroke();
    };
 
    var drawCrossHairs = function (ctx, cross) {
        var ch = cross.crosshairs;
        ctx.strokeStyle = 'rgba(200,0,0,0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ch.x, ch.y - ch.radius * 1.5);
        ctx.lineTo(ch.x, ch.y + ch.radius * 1.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(ch.x - ch.radius * 1.5, ch.y);
        ctx.lineTo(ch.x + ch.radius * 1.5, ch.y);
        ctx.stroke();
    };
 
    var drawPercentRemainBar = function (ctx, game) {
        var cross = game.cross,
        center = cross.center,
        map = game.map;
        drawBar(ctx, game, map.percentRemain, Math.PI, Math.PI / 2, getHpColor(map.percentRemain));
    };
 
    var drawAutoPlayDelayBar = function (ctx, game) {
        var ap = game.autoPlay;
        drawBar(ctx, game, ap.delay / ap.maxDelay, 0, Math.PI / 4, 'cyan');
    };
 
    // draw the current weapon info
    var drawWeaponInfo = function (ctx, game) {
        var center = game.cross.center;
        var w = gameMod.Weapons[game.weaponIndex];
        ctx.fillStyle = '#ff6060';
        ctx.font = '10px courier';
        ctx.textAlign = 'center';
        ctx.fillText('Weapon: ' + w.name, center.x, center.y + 75);
        ctx.fillText('maxDPS: ' + w.maxDPS, center.x, center.y + 85);
 
    };
 
    // draw a health bar for a cell
    var drawCellHealthBar = function (ctx, map, cell, cross) {
        var x = cell.x * map.cellSize + cross.offset.x + (320 / 2),
        y = cell.y * map.cellSize + cross.offset.y + (240 / 2);
        //ctx.fillStyle = 'rgba(0,255,0,0.4)';
        ctx.fillStyle = getHpColor(cell.HP / cell.maxHP);
        ctx.globalAlpha = 0.5;
        ctx.fillRect(x, y, map.cellSize * (cell.HP / cell.maxHP), 5);
        ctx.globalAlpha = 1;
    };
 
    var setupDebug = function (ctx, game) {
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
        ctx.fillStyle = 'yellow';
        ctx.textBaseline = 'top';
        ctx.font = '10px courier';
    };
 
    var cellLevel = function (ctx, cell, x, y) {
        if (cell.active) {
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.font = '7px courier';
            ctx.fillText('L' + Math.floor(cell.levelObj.level), x + 3, y + 3);
        }
    };
    /*
    var cellDebug = function (ctx, cell, x, y) {
    ctx.fillStyle = '#00ff00';
    ctx.font = '8px courier';
    ctx.fillText('L' + Math.floor(cell.levelObj.level), x, y);
    ctx.fillText(Math.floor(cell.damagePer * 100) + '%', x, y + 8);
    ctx.fillText(Math.floor(cell.damage), x, y + 16);
    ctx.fillText(Math.floor(cell.maxHP), x, y + 24);
    };
     */
    var debugModes = {
        none: function (sm) {},
        general: function (sm) {
            var ctx = sm.ctx,
            canvas = sm.canvas,
            game = sm.game;
            setupDebug(ctx, sm.game);
            ctx.fillText('pos: ' + game.cross.offset.x.toFixed(2) + ',' + game.cross.offset.y.toFixed(2), 10, 10);
            ctx.fillText('percent remain: ' + Number(game.map.percentRemain * 100).toFixed(2), 10, 20);
            ctx.fillText('weapon: ' + gameMod.Weapons[game.weaponIndex].name, 10, 30);
            ctx.fillText('damage: ' + Math.floor(game.totalDamage), 10, 40);
            ctx.fillText('high damage cell: ' + Math.floor(game.map.highDamageCell), 10, 50);
        },
        weapon: function (sm) {
            var ctx = sm.ctx;
            setupDebug(ctx, sm.game);
            var w = gameMod.Weapons[sm.game.weaponIndex];
            ctx.fillText('Current weapon: ', 10, 10);
            ctx.fillText('name: ' + w.name, 10, 20);
            ctx.fillText('maxDPS: ' + w.maxDPS, 10, 30);
            ctx.fillText('accuracy: ' + w.accuracy.toFixed(2), 10, 40);
        },
        level: function (sm) {
            var ctx = sm.ctx,
            lv = sm.game.levelObj;
            setupDebug(ctx, sm.game);
            ctx.fillText('Current level: ' + lv.level, 10, 10);
            ctx.fillText('xp: ' + lv.xp, 10, 20);
            ctx.fillText('forNext level: ' + lv.forNext, 10, 30);
            ctx.fillText('toNext level: ' + lv.toNext, 10, 40);
            ctx.fillText('per: ' + lv.per.toFixed(2), 10, 50);
            ctx.fillText('forLast: ' + lv.forLast, 10, 60);
        },
        map: function (sm) {
            var ctx = sm.ctx,
            map = sm.game.map;
            setupDebug(ctx, sm.game);
            ctx.fillText('map.percentRemain: ' + map.percentRemain, 10, 10);
        }
    };
 
    var cellTypeColors = ['green', 'blue', 'red'],
    sheets = genSheets.sheets;
 
    return {
        // draw background
        back: function (ctx, canvas) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },
        // draw cross hairs
        cross: function (ctx, game) {
 
            // draw basic circles
            drawCrossCircles(ctx, game.cross);
 
            // bars
            drawPercentRemainBar(ctx, game); // percentRemain
            drawAutoPlayDelayBar(ctx, game); // autoPlay delay
            drawBar(ctx, game, game.shotSecs / game.shotRate, Math.PI * 0.33, Math.PI * 0.33, 'red'); // shotRate
            drawBar(ctx, game, game.levelObj.per, Math.PI * 1.69, Math.PI * 0.3, 'blue'); // next level
 
            // weapon info
            drawWeaponInfo(ctx, game);
 
            // draw cell and level info
            var cross = game.cross,
            map = game.map,
            ch = game.cross.crosshairs,
            cell = mapMod.getWithCanvasPointAndOffset(game.map, ch.x, ch.y, cross.offset.x, cross.offset.y),
            x = cross.center.x + cross.radiusOuter - 45,
            y = cross.center.y;
 
            // text atyle for info
            ctx.fillStyle = 'white';
            ctx.textBaseline = 'top';
            ctx.textAlign = 'left';
            ctx.font = '8px arial';
 
            // level info
            ctx.fillText('level: ' + game.levelObj.level, x, y - 40);
            ctx.fillText('xp: ' + Math.floor(game.levelObj.xp), x, y - 30);
            ctx.fillText('next: ' + Math.floor(game.levelObj.toNext), x, y - 20);
 
            // cell info
            if (cell) {
                ctx.fillText('pos: ' + cell.i + ' (' + cell.x + ',' + cell.y + ')', x, y);
                ctx.fillText('lv:' + cell.levelObj.level, x, y + 10);
                ctx.fillText('hp:' + Math.floor(cell.HP) + '/' + Math.floor(cell.maxHP), x, y + 20);
                ctx.fillText('dam: ' + Math.floor(cell.damage) + ' (' + Math.round(cell.damagePer * 100) + '%)', x, y + 30);
 
                // draw target cell
                ctx.strokeStyle = 'rgba(255,255,255,0.4)';
                ctx.lineWidth = 3;
                ctx.strokeRect(cell.x * map.cellSize + cross.offset.x + (320 / 2), cell.y * map.cellSize + cross.offset.y + (240 / 2), map.cellSize, map.cellSize);
            }
 
            // draw the cross hairs
            drawCrossHairs(ctx, game.cross);
 
        },
        // draw map
        map: function (ctx, map, cross) {
            ctx.strokeStyle = 'grey';
            ctx.lineWidth = 3;
            map.cells.forEach(function (cell) {
                var x = cell.x * map.cellSize + cross.offset.x + (320 / 2),
                y = cell.y * map.cellSize + cross.offset.y + (240 / 2),
                per = cell.HP / cell.maxHP;
                if (cell.active) {
                    // for active cell
                    ctx.drawImage(sheets[cell.typeIndex].canvas, 32 * Math.floor(9 - cell.HP / cell.maxHP * 9), 0, 32, 32, x, y, map.cellSize, map.cellSize);
                    if (per < 1) {
                        drawCellHealthBar(ctx, map, cell, cross);
                    }
                } else {
                    // for inactive cell
                    ctx.lineWidth = 1;
                    var c = 50 + Math.round(200 * cell.damagePer);
                    ctx.strokeStyle = 'rgba(0,128,128, 0.4)';
                    ctx.fillStyle = 'rgba(0,' + c + ',' + c + ', 0.7)';
                    ctx.beginPath();
                    ctx.rect(x, y, map.cellSize, map.cellSize);
                    ctx.fill();
                    ctx.stroke();
                }
                cellLevel(ctx, cell, x, y);
                //cellDebug(ctx, cell, x, y);
            });
        },
        shots: function (ctx, game) {
            var shots = game.shots,
            i = shots.length,
            shot;
            while (i--) {
                shot = shots[i];
                ctx.fillStyle = 'white';
                ctx.strokeStyle = 'black';
                if (shot.active) {
                    ctx.beginPath();
                    ctx.arc(shot.x, shot.y, shot.radius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                }
            }
        },
        explosions: function (ctx, game) {
            var exps = game.explosions,
            i = exps.length,
            alpha = 0.5,
            ex;
            while (i--) {
                ex = exps[i];
                alpha = 1 - ex.per;
                ctx.fillStyle = 'rgba(255,255,0,' + alpha + ')';
                ctx.strokeStyle = 'rgba(0,0,0,' + alpha + ')';
 
                if (ex.active) {
                    ctx.beginPath();
                    ctx.arc(ex.x, ex.y, ex.radius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                }
            }
        },
        buttons: function (ctx, buttons) {
            Object.keys(buttons).forEach(function (key) {
                var b = buttons[key];
                ctx.fillStyle = 'red';
                if (b.type === 'toggle' && b.bool) {
                    ctx.fillStyle = 'lime';
                }
                ctx.strokeStyle = 'gray';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                ctx.textBaseline = 'middle';
                ctx.textAlign = 'center';
                ctx.fillStyle = 'white';
                ctx.font = (b.fontSize || 10) + 'px arial';
                if (b.type === 'options') {
                    var str = b.options[b.currentOption || 0];
                    ctx.fillText(str, b.x, b.y);
                }
                if (b.type === 'basic') {
                    ctx.fillText(b.label, b.x, b.y);
                }
                if (b.type === 'toggle') {
                    ctx.fillText(b.label, b.x, b.y);
                }
            });
        },
        debug: function (sm) {
            debugModes[sm.debugMode](sm, sm.ctx, sm.canvas);
        },
        ver: function (ctx, sm) {
            ctx.fillStyle = '#dfdfdf';
            ctx.textAlign = 'left';
            ctx.fillText('v' + sm.ver, 10, sm.canvas.height - 15);
        }
    }
}
    ());
```

## 9 - Buttons

I have a module that helps me with creating button objects that I place in the canvas to preform certain actions. This way I can pull a lot of code that has to do with checking if a pointer position is over a button display object, or common button tasks like looping an index value for an option and so forth away from the main state machine and into its own module.

As of this writing I have just three button types, but in future releases I intend to add additional types that have to do with contorting settings of things like an upgrades menu and so forth.

```js
var buttonMod = (function () {
 
    // setup a button object depending on type
    var setupType = function (button, opt) {
        // setup for 'options' type
        if (button.type === 'options') {
            button.options = opt.options || [];
            button.currentOption = 0;
            button.label = button.options[0];
        }
        // setup a 'toggle' type
        if (button.type === 'toggle') {
            button.bool = opt.bool || false;
            button.onActive = opt.onActive || function () {};
            button.onInactive = opt.onInactive || function () {};
        }
    };
 
    var beforeOnClick = {
        basic: function (button, api) {},
        options: function (button, api) {
            button.currentOption += 1;
            button.currentOption = button.currentOption >= button.options.length ? 0 : button.currentOption;
        },
        toggle: function (button, api) {
            button.bool = !button.bool;
        }
    };
 
    var afterOnClick = {
        basic: function (button, api) {},
        options: function (button, api) {},
        toggle: function (button, api) {
            if (button.bool) {
                button.onActive(button, api);
            } else {
                button.onInactive(button, api);
            }
        }
    };
 
    return {
 
        // create a single button
        create: function (opt) {
            opt = opt || {};
            var button = {
                x: opt.x === undefined ? 0 : opt.x,
                y: opt.y === undefined ? 0 : opt.y,
                r: opt.r === undefined ? 16 : opt.r,
                label: opt.label || '',
                type: opt.type || 'basic',
                onClick: opt.onClick || function () {}
            };
            setupType(button, opt);
            return button;
        },
 
        // check the given button collection
        pointerCheckCollection: function (collection, point, api) {
            var keys = Object.keys(collection),
            i = keys.length,
            button,
            d;
            while (i--) {
                button = collection[keys[i]];
                d = utils.distance(point.x, point.y, button.x, button.y);
                if (d < button.r) {
                    beforeOnClick[button.type](button, api);
                    button.onClick(button, api);
                    afterOnClick[button.type](button, api)
                }
            }
        }
    };
}
    ());
```

## 10 - Now for a Main.js file along with a main app loop

So now I need some additional code to pull everything together here in a main.js file that will be used after everything else is in place to work with. Here I create and inject a canvas element into a hard coded container element that I have in my html. I create instances of a map and cross state objects, and attach a whole bunch of event handers for mouse and touch events using the create event method of the cross module.

I then have an attack method that I will likely work into the map module, or some kind of future module that has to do with a weapons or something to that effect. I do not want to get into to much detail with that because at some point in the future I will just have to re write what I have to say about it when it comes to putting a little more time into this canvas example, because I think this one needs and deserve more work.

```js
// MAIN file including state machine
(function () {
 
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('canvas-app') || document.body;
    container.appendChild(canvas);
    canvas.width = 320;
    canvas.height = 240;
    ctx.translate(0.5, 0.5);
 
    var states = {
 
        options: {
 
            // button objects for the state
            buttons: {
                toGame: buttonMod.create({
                    label: 'game',
                    x: 25,
                    y: 200,
                    r: 10,
                    onClick: function (button, sm) {
                        // set state to game
                        sm.currentState = 'game';
                    }
                }),
                debugMode: buttonMod.create({
                    x: 100,
                    y: 120,
                    r: 16,
                    type: 'options',
                    options: ['none', 'general', 'weapon', 'level', 'map'],
                    onClick: function (button, sm) {
                        sm.debugMode = button.options[button.currentOption];
                    }
                })
            },
 
            // for each update tick
            update: function (sm, secs) {
                var state = states[sm.currentState];
                draw.back(ctx, canvas);
                draw.buttons(ctx, state.buttons);
                draw.debug(sm);
            },
 
            // events
            pointerStart: function (sm, e) {
                var state = states[sm.currentState],
                buttons = state.buttons,
                pos = utils.getCanvasRelative(e);
                // check buttons for options state
                buttonMod.pointerCheckCollection(state.buttons, pos, sm);
 
            },
            pointerMove: function () {},
            pointerEnd: function () {}
        },
 
        game: {
 
            buttons: {
                options: buttonMod.create({
                    label: 'options',
                    fontSize: 10,
                    x: 25,
                    y: 200,
                    r: 10,
                    onClick: function (button, sm) {
                        sm.currentState = 'options';
                    }
                }),
                changeWeapon: buttonMod.create({
                    label: 'Next Weapon',
                    fontSize: 8,
                    x: 280,
                    y: 210,
                    r: 16,
                    onClick: function (button, sm) {
                        sm.game.weaponIndex += 1;
                        sm.game.weaponIndex %= gameMod.Weapons.length;
                    }
                }),
                autoPlay: buttonMod.create({
                    label: 'Auto Play',
                    type: 'toggle',
                    fontSize: 8,
                    x: 25,
                    y: 175,
                    r: 10,
                    bool: true,
                    onClick: function (button, sm) {
                        var ap = sm.game.autoPlay;
                        ap.delay = ap.maxDelay;
                    },
                    onActive: function (button, sm) {
                        sm.game.autoPlay.enabled = button.bool;
                    },
                    onInactive: function (button, sm) {
                        sm.game.autoPlay.enabled = button.bool;
                    }
                })
            },
 
            update: function (sm, secs) {
                var state = states[sm.currentState];
                // update game state
                gameMod.update(sm.game, secs);
 
                // draw
                draw.back(ctx, canvas);
                draw.map(ctx, sm.game.map, sm.game.cross);
                draw.explosions(ctx, sm.game);
                draw.cross(ctx, sm.game);
                draw.shots(ctx, sm.game);
                //draw.damageBar(ctx, sm.game);
                draw.buttons(ctx, state.buttons);
                draw.ver(ctx, sm);
                draw.debug(sm);
            },
            pointerStart: function (sm, e) {
 
                var state = states[sm.currentState],
                buttons = state.buttons,
                pos = utils.getCanvasRelative(e);
                // enable cross move back feature
                sm.game.cross.moveBackEnabled = true;
                crossMod.userAction(sm.game.cross, 'start', e);
                sm.game.userDown = true;
 
                // check buttons for game state
                buttonMod.pointerCheckCollection(state.buttons, pos, sm);
 
            },
            pointerEnd: function (em, e) {
                crossMod.userAction(sm.game.cross, 'end', e);
                sm.game.userDown = false;
            },
            pointerMove: function (sm, e) {
                crossMod.userAction(sm.game.cross, 'move', e);
            }
        }
 
    };
 
    var sm = {
        ver: '0.13.0',
        canvas: canvas,
        debugMode: 'none',
        currentState: 'game',
        ctx: ctx,
        game: gameMod.create({
            canvas: canvas
        }),
        input: {
            pointerDown: false,
            pos: {
                x: 0,
                y: 0
            }
        }
    };
 
    var pointerHanders = {
        start: function (sm, e) {
            var pos = sm.input.pos;
            sm.input.pointerDown = true;
            //console.log('start');
            states[sm.currentState].pointerStart(sm, e);
        },
        move: function (sm, e) {
            //console.log('move');
            states[sm.currentState].pointerMove(sm, e);
        },
        end: function (sm, e) {
            sm.input.pointerDown = false;
            //console.log('end');
            states[sm.currentState].pointerEnd(sm, e);
        }
    };
 
    var createPointerHandler = function (sm, type) {
        return function (e) {
            sm.input.pos = utils.getCanvasRelative(e);
            e.preventDefault();
            pointerHanders[type](sm, e);
        };
    };
 
    // attach for mouse and touch
    canvas.addEventListener('mousedown', createPointerHandler(sm, 'start'));
    canvas.addEventListener('mousemove', createPointerHandler(sm, 'move'));
    canvas.addEventListener('mouseup', createPointerHandler(sm, 'end'));
    canvas.addEventListener('touchstart', createPointerHandler(sm, 'start'));
    canvas.addEventListener('touchmove', createPointerHandler(sm, 'move'));
    canvas.addEventListener('touchend', createPointerHandler(sm, 'end'));
 
    var lt = new Date(),
    FPS_target = 30;
    var loop = function () {
        var now = new Date(),
        t = now - lt,
        secs = t / 1000;
        requestAnimationFrame(loop);
        if (t >= 1000 / FPS_target) {
            states[sm.currentState].update(sm, secs);
            lt = now;
        }
    };
    loop();
 
}
    ());
```

I then of course have my main app loop where I am using the requestAnimationFrame method, inside the loop method. In this loop method I am updating the state of the cross object and drawing the state of the cross and map objects.


I then have just a little HTML and inline css for the container for the canvas element, or elements at some point in the future if I get into layering with this one.

```html
<html>
    <head>
        <title>canvas example game crosshairs</title>
    </head>
    <body>
        <div id="canvas-app" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
        <script src="./lib/utils.js"></script>
        <script src="./lib/exp_system.js"></script>
        <script src="./lib/cross.js"></script>
        <script src="./lib/map.js"></script>
        <script src="./lib/pool.js"></script>
        <script src="./lib/game.js"></script>
        <script src="./lib/gen_sheets.js"></script>
        <script src="./lib/draw.js"></script>
        <script src="./lib/buttons.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

So that is it when this canvas example is up and running I am able to move around and when I click on the map I cause damage to the areas that I click. Nothing to interesting at the point of this writing at least, but I think that this one has some decent potential when it comes to putting a little more time into it. I do have many other canvas examples in a state like this also that need more attention, but I am sure I will come back around to this one at some point.

## 11 - Conclusion

So now I have the basic idea of what I had in mind together at least, now it is just a question of what more I can do to it to make it more interesting. There is making it so that each time the player clicks or touches an area in the inner circle that casues a shot to fire from one side of the canvas or another to the point where such an event happened. So there is adding much more when it comes to weapons and what it is that we are shooting at. In addition there is doing something so that there are units in the map the shoot back at the player also.
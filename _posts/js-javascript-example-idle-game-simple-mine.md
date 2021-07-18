---
title: Simple mine idle game javaScript examples
date: 2021-07-16 14:25:00
tags: [js]
layout: post
categories: js
id: 912
updated: 2021-07-18 13:39:29
version: 1.13
---

It has been a while sense the last time I made a simple [javaScript project examples](/2021/04/02/js-javascript-example/) type post, so today I thought I would put something together real fast that I might put some more time into if I think it is something that is worth more time. The aim here is to not do anything fancy, just get together some javaScript code that will serve as a basic starting point for a simple idle game type project. This is not the first time I have made such a project, but maybe this time I will finally break old habits and continue working on this as a separate stand alone project rather than just a little javaScript code.

The main feature that I have in mine here is to just have a module that will create an instance of a kind of standard mine object. Each mine object will contain properties that defile what ores there are to obtain at the mine, and also the current state of a ship that will move back and forth from the mine. So the mine module is then use to create one of these mine objects, and update the state of the object when it comes to the position of the ship, the rate at which resources are mined, and create to a main home object. Speaking of the main home object I will also want at least that kind of module also that will be used to create and update that also.

<!-- more -->


## 1 - The mine module

First off I have my mine module that I will be using to create an object that will represents a single mine. Each mine in the game will have a single space ship that moves from the location of the mine to a home base location and back again over and over again. Each time it will end up at the mine it will load some some ore, and each time it comes back home it will unload that ore.

```js
(function (api) {
 
    api.create = function (home, opt) {
        home = home || homeMod.create();
        opt = opt || {};
        opt.name = opt.name || 'fooMine';
        opt.ores = opt.ores || [];
        var mine = {};
        mine.name = opt.name;
        mine.index = opt.index;
        mine.distance = opt.distance || 100;
        mine.oreRate = opt.oreRate || 10;
        // set up ore objects for the mine
        mine.ores = [];
        var totalOrePoints = opt.ores.reduce(function (total, oreProps) {
                return total + oreProps.points;
            }, 0);
        opt.ores.forEach(function (oreProps, i) {
            var oreData = home.OREDATA[oreProps.index];
            mine.ores.push({
                name: oreData.name,
                index: oreProps.index,
                yeild: oreProps.points / totalOrePoints, // the ratio of ore rate to credit to amount on each update
                loadPriority: i,
                amount: 0 // current amount of this ore
            });
        });
        // create ship object for the mine
        mine.ship = {};
        // start at home heading out
        mine.ship.distance = 0;
        mine.ship.dir = 1;
        // speed
        mine.ship.speed = opt.shipSpeed || 10;
        // cargo
        mine.ship.cargoMax = opt.shipCargoMax || 5;
        mine.ship.cargo = [];
        // over object used to figure state of credits, and cargo
        // when the ship goes out of bounds as a result of a large time
        // delta from that last update.
        mine.ship.over = {
            distance: 0,
            trips: 0,
            roundTrips: 0,
            credits: 0,
            load: false
        };
        return mine;
    };
 
    // ship distance correction
    var shipDistanceCorrection = function (ship, trips) {
        if (ship.dir === -1) {
            ship.distance = mine.distance - mine.distance * (trips % 1);
        } else {
            ship.distance = mine.distance * (trips % 1);
        }
    };
 
    // sort an array of ore objects by the loadPriorty prop
    var sortPriority = function (ore1, ore2) {
        if (ore1.loadPriority < ore2.loadPriority) {
            return 1;
        }
        if (ore1.loadPriority > ore2.loadPriority) {
            return -1;
        }
        return 0;
    };
 
    // credit cargo helper
    var creditCargo = function (home, mine) {
        mine.ship.cargo.forEach(function (cargo) {
            var homeOre = home.oreCollection[cargo.index];
            homeOre.amount += cargo.amount;
        });
        mine.ship.cargo = [];
    };
 
    // process credits in the over object
    var processOverCredits = function(home, mine){
        var i = 0,
        ship = mine.ship,
        over = ship.over,
        delta,
        freeSpace = ship.cargoMax * over.credits,
        ore,
        homeOre,
        mineOres = mine.ores.sort(sortPriority);
        if(over.credits >= 1){
            while(i < mine.ores.length){
                ore = mineOres[i];
                // full?
                delta = ore.amount;
                if(delta <= ore.amount && freeSpace >= delta){
                    freeSpace -= delta;
                    ore.amount -= delta;
                    homeOre = home.oreCollection[ore.index];
                    homeOre.amount += delta;
                }
                // fill free space
                delta = freeSpace;
                if(delta <= ore.amount && freeSpace >= delta){
                    freeSpace -= delta;
                    ore.amount -= delta;
                    homeOre = home.oreCollection[ore.index];
                    homeOre.amount += delta;
                }  
                i += 1;
            }
        }
    };
 
    // process cargo for the mine with given credits and load boolean values
    var processOver = function (home, mine) {
        var ship = mine.ship,
        over = ship.over;
        // if the ship has cargo add the cargo to home, and clear out the cargo
        creditCargo(home, mine);
        // add any and all credits to home
        processOverCredits(home, mine);
        // load cargo
        if(over.load){
            var i = 0,
            delta,
            freeSpace = ship.cargoMax;
            var mineOres = mine.ores.sort(sortPriority),
            ore;
            while (i < mine.ores.length) {
                ore = mineOres[i];
                // if ore amount is greater than or equal to feeSpace
                // then I can just fill the free space with the ore
                // and break out of this loop
                if (ore.amount >= freeSpace) {
                    delta = freeSpace;
                    freeSpace = 0;
                    ore.amount -= delta;
                    ship.cargo.push({
                        index: ore.index,
                        amount: delta
                    });
                    break;
                }
                // if ore amount is less than freeSpace
                // then load what there is for that ore
                // and continue
                delta = ore.amount;
                freeSpace -= ore.amount;
                ore.amount = 0;
                ship.cargo.push({
                    index: ore.index,
                    amount: delta
                });
                i += 1;
            }
        }
        // heading away from home with cargo!? credit it to home.
        if (ship.cargo.length > 0 && ship.dir === 1) {
            creditCargo(home, mine);
        }
    };
 
    // update the state of the ship, and also the given home object
    var updateShip = function (home, mine, secs) {
        var ship = mine.ship;
        // reset over values
        ship.over.distance = 0;
        ship.over.trips = 0;
        ship.over.roundTrips = 0;
        // update fistance
        ship.distance += ship.speed * ship.dir * secs;
        // when past home out in space?
        if (ship.distance <= 0) {
            ship.over.diststance = Math.abs(ship.distance);
            ship.over.trips = 1 + ship.over.distance / mine.distance;
            ship.over.roundTrips = ship.over.trips / 2;
            // update dir, and correct ship.distance
            ship.dir = -1 + 2 * Math.floor(ship.over.trips % 2);
            shipDistanceCorrection(ship, ship.over.trips);
        }
        // reached the mine?
        if (ship.distance >= mine.distance) {
            ship.over.distance = ship.distance - mine.distance;
            ship.over.trips = 1 + ship.over.distance / mine.distance;
            ship.over.roundTrips = ship.over.trips / 2;
            // update dir, and correct ship.distance
            ship.dir = 1 - 2 * Math.floor(ship.over.trips % 2);
            shipDistanceCorrection(ship, ship.over.trips);
        }
        // credit / load cargo values
        //var credits = 0,
        //loadCargo = false;
        ship.over.credits = 0;
        ship.over.load = false;
        if (ship.over.roundTrips >= 0.5) {
            if (ship.over.roundTrips >= 1) {
                ship.over.credits = Math.floor(ship.over.roundTrips);
            }
            // load cargo bool?
            if (ship.over.roundTrips % 1 >= 0.5 && ship.dir === -1) {
                ship.over.load = true;
            }
            processOver(home, mine);
        }
    };
 
    // update the ore prop of the mine object
    var updateOres = function (home, mine, secs) {
        // update amounts ready for pick up by the ship
        mine.ores.forEach(function (ore) {
            var amountDelta = ore.yeild * mine.oreRate * secs;
            ore.amount += amountDelta;
        });
    };
 
    // update a mine object by a secs time delta
    api.update = function (home, mine, secs) {
        // update ores
        updateOres(home, mine, secs);
        // update the ship, as well as the state of the home object
        updateShip(home, mine, secs);
    };
 
}
    (this['mineMod'] = {}));
```

## 2 - The home object module

I will want to have some kind of main game state object, for this I have a module that will create and return that object. So then this module has a main create method that I will use in the main javaScript file to create a new main home object with the create method of this module. When I do so I can pass some data that will serve as a way to set up what all the ores are for the game.

```js
(function (api) {
 
    var ORE_DATA_DEFAULT = [
        // ore 0 - copper
        {
            name: 'Copper',
            baseValue: 1
        },
        // ore 1 - iron
        {
            name: 'Iron',
            baseValue: 3
        }
    ];
 
    var newOreCollection = function (home) {
        var oreCollection = [];
        home.OREDATA.forEach(function (oreProps) {
            oreCollection.push({
                name: oreProps.name,
                amount: 0
            });
        });
        return oreCollection;
    };
 
    api.create = function (opt) {
        opt = opt || {};
        var home = {};
        home.OREDATA = opt.OREDATA || ORE_DATA_DEFAULT;
        home.oreCollection = opt.oreCollection || newOreCollection(home);
        return home;
 
    };
 
}
    (this['homeMod'] = {}));
```

## 3 - Conclusion

That will be it for now when it comes to this javaScript example, at least until I get around to editing this post and when I do so maybe I will put a little more time into the source code also while I am at it. I can not say that I get around to doing that with all of these posts, but some are more deserve of more time and energy than others. This one might be different if I do manage to break the cycle of starting projects like this but never really finishing them. There are a lot more things that I would like to get done with this one, but still only so many, I would like to keep this one fairly simple.

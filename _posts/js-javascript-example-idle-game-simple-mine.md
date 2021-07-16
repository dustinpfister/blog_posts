---
title: Simple mine idle game javaScript examples
date: 2021-07-16 14:25:00
tags: [js]
layout: post
categories: js
id: 912
updated: 2021-07-16 14:43:26
version: 1.7
---

It has been a while sense the last time I made a simple [javaScript project examples](/2021/04/02/js-javascript-example/) type post, so today I thought I would put something together real fast that I might put some more time into if I think it is something that is worth more time. The aim here is to not do anything fancy, just get together some javaScript code that will serve as a basic starting point for a simple idle game type project. This is not the first time I have made such a project, but maybe this time I will finally break old habits and continue working on this as a separate stand alone project rather than just a little javaScript code.

<!-- more -->


## 1 - The mine module

First off I have my mine module that I will be using to create an object that will represents a single mine. Each mine in the game will have a single space ship that moves from the location of the mine to a home base location and back again over and over again. Each time it will end up at the mine it will load some some ore, and each time it comes back home it will unload that ore.

```js
(function (api) {
 
    var debug_ship = function (ship, overDist, trips, roundTrips) {
        console.log('ship distance: ', ship.distance);
        console.log('ship dir', ship.dir);
        console.log('over dist: ', overDist);
        console.log('trips: ', trips);
        console.log('round trips: ', roundTrips);
    }
 
    api.create = function (home, opt) {
        home = home || homeMod.create();
        opt = opt || {};
        opt.name = opt.name || 'fooMine';
        opt.ores = opt.ores || [];
        var mine = {};
        mine.name = opt.name;
        mine.distance = opt.distance || 100;
        // set up ore objects for the mine
        mine.ores = [];
        var totalOrePoints = opt.ores.reduce(function (total, oreProps) {
                return total + oreProps.points;
            }, 0);
        opt.ores.forEach(function (oreProps) {
            var oreData = home.OREDATA[oreProps.index];
            mine.ores.push({
                name: oreData.name,
                yeild: oreProps.points / totalOrePoints,
                amount: 0
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
        mine.ship.cargo = 0;
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
 
    // process cargo for the mine with given credits and load boolean values
    var processCargo = function (home, mine, credits, loadCargo) {
 
        // if the ship has cargo add that to home
 
        // add any and all credits to home
 
        // load cargo
 
        console.log('credits: ', credits);
        console.log('load cargo: ', loadCargo);
    };
 
    var updateShip = function (home, mine, secs) {
        var ship = mine.ship,
        overDist = 0,
        trips = 0,
        roundTrips = 0;
        ship.distance += ship.speed * ship.dir * secs;
        // when past home out in space?
        if (ship.distance <= 0) {
            overDist = Math.abs(ship.distance);
            trips = 1 + overDist / mine.distance;
            roundTrips = trips / 2;
            // update dir, and correct ship.distance
            ship.dir = -1 + 2 * Math.floor(trips % 2);
            shipDistanceCorrection(ship, trips);
        }
        // reached the mine?
        if (ship.distance >= mine.distance) {
            overDist = ship.distance - mine.distance;
            trips = 1 + overDist / mine.distance;
            roundTrips = trips / 2;
            // update dir, and correct ship.distance
            ship.dir = 1 - 2 * Math.floor(trips % 2);
            shipDistanceCorrection(ship, trips);
        }
        // credit / load cargo values
        var credits = 0,
        loadCargo = false;
        if (roundTrips >= 0.5) {
            if (roundTrips >= 1) {
                credits = Math.floor(roundTrips);
            }
            // load cargo bool?
            if (roundTrips % 1 >= 0.5) {
                loadCargo = true;
            }
            processCargo(home, mine, credits, loadCargo);
        }
        // debug info
        console.log('\n\n');
        debug_ship(ship, overDist, trips, roundTrips);
    };
 
    // update a mine object by a secs time delta
    api.update = function (home, mine, secs) {
        updateShip(home, mine, secs);
    };
 
}
    (this['mineMod'] = {}));
```

## 2 - The home object module

I will want to have some kind of main game state object, for this I have a module that will create and return that object.

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

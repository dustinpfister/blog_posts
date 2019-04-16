let klawFiles = require('../../klaw.js').klawFiles;

let yearHigh = 2017,
yearLow = 0,
monthHigh = 12,
monthLow = 01;

klawFiles({

    dir_posts: '../../../_posts',
    forFile: (item, next) => {

        let lastUpdate = new Date(item.header.updated),
        luY = lastUpdate.getFullYear(),
        luM = lastUpdate.getMonth() + 1;

        // if the date at which the post was last updated falls
        // between the set range.
        if (luY <= yearHigh && luY >= yearLow && luM <= monthHigh && luM >= monthLow) {
            // then log
            console.log(item.fn, '(' + luY + '/' + luM + ')');
        }

        next();

    }

});

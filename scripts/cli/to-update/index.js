let klawFiles = require('../../klaw.js').klawFiles;

let argv = process.argv,

yearHigh = argv[2] || new Date().getFullYear() - 1,
monthHigh = argv[3] || 12,

yearLow = argv[4] || 1970,
monthLow = argv[5] || 1;

let dateHigh = new Date(yearHigh, monthHigh - 1, new Date(yearHigh, monthHigh, 0).getDate()),
dateLow = new Date(yearLow, monthLow - 1, 1);

// klaw files
klawFiles({

    //dir_posts: '../../../_posts',
    forFile: (item, next) => {

        let lu = new Date(item.header.updated),
        luY = lu.getFullYear(),
        luM = lu.getMonth() + 1;

        // if the date at which the post was last updated falls
        // between the set range.
        if (lu.getTime() <= dateHigh.getTime() && lu.getTime() >= dateLow.getTime()) {
            // then log
            console.log(item.fn, '(' + luY + '/' + luM + '/' + lu.getDate() + ')');
        }

        next();

    }

});

let klawFiles = require('../../klaw.js').klawFiles;

let argv = process.argv;
let opt_defaults = {
    yearHigh: argv[2] || new Date().getFullYear() - 1,
    monthHigh: argv[3] || 12,
    yearLow: argv[4] || 1970,
    monthLow: argv[5] || 1,
    forPost: function (item) {
        let u = item.header.updated;
        console.log(item.fn, ' : ' + u.getFullYear() + '/' + u.getMonth() + '/' + u.getDate());
    }
}

let toUpdate = (opt) => {

    opt = Object.assign({}, opt_defaults, opt || {});

    let dateHigh = new Date(opt.yearHigh, opt.monthHigh - 1, new Date(opt.yearHigh, opt.monthHigh, 0).getDate()),
    dateLow = new Date(opt.yearLow, opt.monthLow - 1, 1);

    // klaw files
    klawFiles({

        forFile: (item, next) => {

            let lu = new Date(item.header.updated),
            luY = lu.getFullYear(),
            luM = lu.getMonth() + 1;

            // if the date at which the post was last updated falls
            // between the set range.
            if (lu.getTime() <= dateHigh.getTime() && lu.getTime() >= dateLow.getTime()) {
                // then call forPost
                opt.forPost(item);
            }

            next();

        }

    });

};

// if called from CLI
if (require.main === module) {

    toUpdate();

} else {

    // else export
    exports.toUpdate = toUpdate;

}

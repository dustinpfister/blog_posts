let klawFiles = require('../../klaw.js').klawFiles;

let argv = process.argv;
let opt_defaults = {
    yearHigh: argv[2] || new Date().getFullYear() - 1,
    monthHigh: argv[3] || 12,
    yearLow: argv[4] || 1970,
    monthLow: argv[5] || 1,
    forPost: function (item) {
        console.log(item.fn, ' : ' + item.luY + '/' + item.luM + '/' + item.lu.getDate());
    }
}

let toUpdate = (opt) => {

    opt = Object.assign({}, opt_defaults, opt || {});

    let dateHigh = new Date(opt.yearHigh, opt.monthHigh - 1, new Date(opt.yearHigh, opt.monthHigh, 0).getDate()),
    dateLow = new Date(opt.yearLow, opt.monthLow - 1, 1);

    // klaw files
    klawFiles({

        forFile: (item, next) => {

            item.lu = new Date(item.header.updated);
            item.luY = item.lu.getFullYear();
            item.luM = item.lu.getMonth() + 1;

            // if the date at which the post was last updated falls
            // between the set range.
            if (item.lu.getTime() <= dateHigh.getTime() && item.lu.getTime() >= dateLow.getTime()) {
                // then call forPost
                opt.forPost(item);
            }

            next();

        }

    });

};


// if called from CLI
if (require.main === module) {

    //let argv = process.argv;
    //toUpdate(argv[2] || new Date().getFullYear() - 1, argv[3] || 12, argv[4] || 1970, argv[5] || 1);

    toUpdate();

} else {

    // else export
    exports.toUpdate = toUpdate;

}

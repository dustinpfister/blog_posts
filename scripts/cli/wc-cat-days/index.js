let klawFiles = require('../../old/klaw.js').klawFiles,
argv = process.argv,
opt_defaults = {
    year: argv[2] || 2019,
    month: argv[3] || 1
};

let wcCatDays = function (opt) {

    opt = Object.assign({}, opt_defaults, opt || {});

    klawFiles({
        getText: true,
        forFile: (item, next) => {

            let d = new Date(item.header.date);

            if (d.getFullYear() == opt.year && d.getMonth() + 1 == opt.month) {
                console.log(item.header.id, d.getFullYear() + '/' + (d.getMonth()+1), item.header.categories, item.fn, item.wc);
            }

            next();
        }
    });

};

wcCatDays();

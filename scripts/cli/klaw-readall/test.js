let klawAll = require('./index').klawAll;

total = 0, ct = 0;
klawAll({

    forPost: (item, next) => {

        console.log(ct, total);

        total += item.wc;
        ct += 1;

        next();

    },

    onDone: () => {

        console.log(total);

    }

});

// testing out toUpdate
let toUpdate = require('./index').toUpdate;

toUpdate({
    yearHigh: process.argv[2] || 2017,
    forPost: (item) => {
        console.log('#' + item.header.id, item.fn);
    }
});

let klawFiles = require('../../klaw.js').klawFiles;

let sY = 2017,
sM = 12;

klawFiles({

    forFile: (item, next) => {

        let lastUpdate = new Date(item.header.updated),
        luY = lastUpdate.getFullYear(),
        luM = lastUpdate.getMonth() + 1;

        if (luY <= sY && luM <= sM) {
            console.log('**********');
            console.log(item.fn);
            console.log(item.header.updated, luY, luM);
            console.log('**********');
        }

    }

});

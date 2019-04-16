let klawFiles = require('../../klaw.js').klawFiles;

klawFiles({
    getText: true,
    forFile: (item, next) => {

        let date = new Date(item.header.date);

        if (date.getFullYear() === 2019 && date.getMonth() + 1 === 1) {
            console.log(item.text);
        }

        next();
    }
});

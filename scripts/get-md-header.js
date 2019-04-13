let yaml = require('js-yaml');

// get the header from markdown text
exports.getHeader = function (text) {

    let head = text.match(/---[\s|\S]*---/);

    if (!head) {

        return {};

    }

    try {

        return yaml.safeLoad(head[0].replace(/---/g, ''));

    } catch (e) {

        console.log('ERROR loading yaml:');
        console.log(e.message);
        return {};

    }

};

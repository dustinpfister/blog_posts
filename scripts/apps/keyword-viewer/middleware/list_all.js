let express = require('express'),
fs = require('fs'),
dir_keywords = '../../../keywords';

// create a router, and use body-parser
router = module.exports = express.Router();

router.get('*', (req, res, next) => {

    req.filenames = ['lodash-find'];

    next();
});

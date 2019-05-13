let express = require('express'),
path = require('path'),
fs = require('fs');

// if action : 'list' - to list files in current dir
module.exports = (req, res, next) => {

    fs.readdir(path.resolve(res.app.get('dir')), (e, files) => {
        if (e) {
            res.reply.mess = e.message;
            res.status(400).json(res.reply);
        } else {
            res.reply.success = true;
            res.reply.mess = 'list sent';
            res.reply.data = files;
            res.status(200).json(res.reply);
        }
    });

};

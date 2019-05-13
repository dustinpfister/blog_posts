let express = require('express'),
path = require('path'),
fs = require('fs');

module.exports = (req, res, next) => {

    // if we have data
    if (req.body.data) {
        // try to save the data
        fs.writeFile(path.join(res.app.get('dir'), res.app.get('fn')), req.body.data, (e) => {
            if (e) {
                res.reply.mess = e.message;
                res.status(400).json(res.reply);
            } else {
                res.reply.success = true;
                res.reply.mess = 'save file success';
                res.reply.data = req.body.data;
                res.status(200).json(res.reply);
            }
        })
    } else {
        // else we do not have data to save
        res.reply.mess = 'must have data to save';
        res.status(400).json(res.reply);
    }

};

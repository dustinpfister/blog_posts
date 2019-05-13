let express = require('express'),
path = require('path'),
fs = require('fs');

module.exports = (req, res) =>
{

    if (!res.app.get('fn'))
    {

        res.reply.success = true;
        res.reply.mess = 'No file name sent empty string';
        res.reply.data = '';
        res.status(200).json(res.reply);
    }
    else
    {

        // try to open the current filename at the current dir
        fs.readFile(path.join(res.app.get('dir'), res.app.get('fn')), res.app.get('encode'), (e, data) =>
        {
            if (e)
            {
                res.reply.mess = e.message;
                res.status(400).json(res.reply);
            }
            else
            {
                res.reply.success = true;
                res.reply.mess = 'opened and sent file data';
                res.reply.data = data;
                res.status(200).json(res.reply);
            }
        }
        );

    }

}

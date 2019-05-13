let express = require('express'),
path = require('path'),

router = module.exports = express.Router();

router.use((req, res, next) =>
{

    try
    {

        let action = require(path.join(res.app.get('dir_mw'), './action_' + req.body.action + '.js'));

        action = action.constructor.name === 'Array' ? action[0] : action;

        action(req, res, next);

    }
    catch (e)
    {

        res.reply.mess = e.message;
        res.status(400).send(res.reply)

    }

}
);

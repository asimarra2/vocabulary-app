const { Router } = require('express');
const route = Router();

module.exports = app => {
    app.use('/vocabulary', route);

    route.get('/',  (req, res) => {
        return res.json({ user: 1 }).status(200);
    });
};
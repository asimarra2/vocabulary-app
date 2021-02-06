const { Router } = require('express');
const userModel = require('./vocabularyModel')
const vocabularyHandlers = require('./vocabularyEndpoints')
const route = Router();

module.exports = app => {
    app.use('/vocabulary', route);

    const vocabularyHandler = vocabularyHandlers({ Model: userModel })

    route.get('/',  async (req, res, next) => {
        try {
            let vocabularies = await vocabularyHandler.list()
            return res.json({ vocabularies }).status(200);
        } catch (err) {
            next(err)
        }
    });

    route.post('/',  async (req, res, next) => {
        try {
            let vocabulary = await vocabularyHandler.add(req.body)
            return res.json({ vocabulary }).status(200);
        } catch (err) {
            next(err)
        }
    });

};
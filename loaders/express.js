const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { handleError } = require('../helpers/error')
const { app: { API_PREFIX }} = require('../config/constants')
const routes = require('../routes/index')

module.exports = ({ app }) => {
    app.get('/status', (req, res) => {
        res.status(200).end();
    });

    // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // It shows the real origin IP in the heroku or Cloudwatch logs
    app.enable('trust proxy');

    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors())

    // Middleware that transforms the raw string of req.body into json
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }));

    // Load API routes
    app.use(API_PREFIX, routes());

    app.use(express.static(('public')));

    app.use((err, req, res, next) => {
        handleError(err, res)
    })

    return app
}
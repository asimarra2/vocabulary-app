const { Router } = require('express')

const vocabularyRoutes = require('../services/vocabulary/vocabularyRoutes')

module.exports = () => {
    const app = Router()

    vocabularyRoutes(app)

    return app
}
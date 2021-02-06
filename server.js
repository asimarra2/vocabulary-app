const express = require('express')
const loaders = require('./loaders')
const { app: { PORT } } = require('./config/constants')

async function startServer() {
    try {
        const app = express()

        await loaders.init({ expressApp: app })

        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`)
        })
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

(async () => {
    await startServer()
})()
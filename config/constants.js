require('dotenv').config();

module.exports = {
    app: {
        PORT: parseInt(process.env.PORT) || 3001,
        DEBUG: Boolean(process.env.DEBUG) || false,
        API_PREFIX: '/api'
    },
    dbConfig: {
        DATABASE_URL: process.env.DATABASE_URL
    },
    models: {
        vocabulary: {
            WORD_EXIST: 'WORD_EXIST'
        }
    }
}
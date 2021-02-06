const mongoose = require('mongoose')
const { dbConfig: { DATABASE_URL } } = require('../config/constants')

module.exports = async () => {
    let options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
    const con = await mongoose.connect(DATABASE_URL, options)
    return con.connection.db
}
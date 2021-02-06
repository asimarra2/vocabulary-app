const expressLoader = require('./express')
const mongooseLoader = require('./moongose')

module.exports.init = async ({ expressApp }) => {
    await mongooseLoader();
    console.log('MongoDB Initialized');

    await expressLoader({ app: expressApp });
    console.log('Express Initialized');

    // ... more loader here

    // ... o Redis, o whatever
}
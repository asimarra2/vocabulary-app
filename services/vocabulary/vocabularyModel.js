const mongoose = require("mongoose")
const random = require('mongoose-simple-random')
const Schema = mongoose.Schema

const vocabulary = new Schema(
    {
        english: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
        },
        spanish: {
            type: String,
            required: true,
            lowercase: true,
            index: true,
        },
        pronunciation: {
            type: String,
            required: true,
            lowercase: true,
            index: true,
        },
    },
    { timestamps: true },
);

// Plugins
vocabulary.plugin(random)

module.exports = mongoose.model("vocabulary", vocabulary)

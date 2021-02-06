const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vocabulary = new Schema(
    {
        english: {
            type: String,
            required: true,
            index: true,
        },
        spanish: {
            type: String,
            lowercase: true,
            index: true,
        },
        pronunciation: {
            type: String,
            lowercase: true,
            index: true,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("vocabulary", vocabulary)

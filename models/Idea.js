const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schame({
    title: {type: String, required: true},
    details: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.Model(IdeaSchema);
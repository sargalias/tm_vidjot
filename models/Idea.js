const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({
    title: {type: String, required: true},
    details: {type: String, required: true},
    date: {type: Date, default: Date.now},
    userId: {type: String, required: true}
});

module.exports = mongoose.model('Idea', IdeaSchema);
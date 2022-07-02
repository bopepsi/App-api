const mongoose = require('mongoose');
const { Schema } = require('mongoose');

// Blue print for collection document data
const commentSchema = new Schema({
    text: { type: String, required: true },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    replies: [{ type: mongoose.Types.ObjectId, required: true, ref: "Comment" }]
});

module.exports = mongoose.model('Comment', commentSchema);
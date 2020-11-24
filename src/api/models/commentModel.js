const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let commentSchema = new Schema({
    title: {
        type: String,
        required: "Le titre est requis"
    },
    content: {
        type: String,
        required: "Le contenu est requis"
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    post_id: {
        type: String
    }
});

module.exports = mongoose.model('Comment', commentSchema);